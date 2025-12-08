import torch
import os
import cv2
import argparse
import numpy as np
import time
import json
import sys
import subprocess
import shutil
from core.utils import *
from core.options import parse_args
from models.model import Model
from core.IP import reconstructFloorplan
from core.constants import iconNumberNameMap
from opening_matcher import match_openings

# Import timing estimation functionality from separate module
from timing_estimator import (
    create_timing_predictor,
    create_milp_predictor,
    PhaseTimeLogger,
    get_hardware_info
)

# Create global MILP predictor instance for use in IP.py
milp_predictor = create_milp_predictor()

def get_python_executable():
    """
    Get the appropriate Python executable for running subprocesses.
    This function provides cross-platform compatibility

    Returns:
        str: Path to the Python executable
    """
    # Always start with the current Python executable as fallback
    python_exe = sys.executable

    # On Unix-like systems (Linux, macOS), try to find specific Python versions
    if os.name != 'nt':
        # Try to find python3.11 first (as originally intended)
        python3_11 = shutil.which('python3.11')
        if python3_11:
            return python3_11

        # Fallback to other common Python 3 executables
        for py_name in ['python3', 'python']:
            py_path = shutil.which(py_name)
            if py_path:
                return py_path

    # On Windows or if no specific version found, use current executable
    return python_exe

def process_image(image_path, output_dir='results', model_args=None, wall_threshold=500, door_threshold=500, icon_threshold=500, gap=-1, distance_threshold=-1, length_threshold=-1, disable_augmentation=False):
    """
    Process a single floorplan image and generate the results
    Args:
        image_path: Path to the input image
        output_dir: Output directory for results
        model_args: Model arguments
        wall_threshold: Wall detection threshold (1-1000)
        door_threshold: Door detection threshold (1-1000)
        icon_threshold: Icon detection threshold (1-1000)
        gap: Gap parameter for element spacing (-1 for default)
        distance_threshold: Distance threshold for proximity detection (-1 for default)
        length_threshold: Length threshold for minimum element sizes (-1 for default)
        disable_augmentation: Disable corner detection augmentation

    Returns:
        Dictionary containing result data or None on failure
    """
    # Convert thresholds from 1-1000 range to 0.005-1 range
    wall_threshold_conv = max(0.001, min(1.0, wall_threshold / 1000.0))
    door_threshold_conv = max(0.001, min(1.0, door_threshold / 1000.0))
    icon_threshold_conv = max(0.001, min(1.0, icon_threshold / 1000.0))

    # Create output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Use provided model args or get defaults
    if model_args is None:
        model_args = parse_args(['--task', 'test',
                               '--restore', '1',
                               '--width', '256',
                               '--height', '256'])
        model_args.checkpoint_dir = 'checkpoint'
        model_args.visualizeMode = ''

    # Load model
    model = Model(model_args)
    device = torch.device('cpu')
    model.to(device)

    # Load checkpoint
    checkpoint_path = os.path.join(model_args.checkpoint_dir, 'checkpoint.pth')
    if os.path.exists(checkpoint_path):
        model.load_state_dict(torch.load(checkpoint_path, map_location=device))

    model.eval()

    # Load and preprocess image
    image = cv2.imread(image_path)
    if image is None:
        return None

    # Calculate padding to maintain aspect ratio
    h, w = image.shape[:2]
    target_size = model_args.width
    ratio = target_size / max(h, w)
    new_h, new_w = int(h * ratio), int(w * ratio)

    # Resize image maintaining aspect ratio
    image_resized = cv2.resize(image, (new_w, new_h))

    # Create a square black canvas
    square_image = np.zeros((target_size, target_size, 3), dtype=np.uint8)

    # Calculate padding
    pad_h = (target_size - new_h) // 2
    pad_w = (target_size - new_w) // 2

    # Place the resized image in the center
    square_image[pad_h:pad_h+new_h, pad_w:pad_w+new_w] = image_resized

    # Convert to tensor and normalize
    image_tensor = torch.from_numpy(square_image.transpose((2, 0, 1)) / 255.0 - 0.5).float().unsqueeze(0).to(device)

    # Store original dimensions and padding info for later use
    original_dims = {
        'height': h,
        'width': w,
        'pad_h': pad_h,
        'pad_w': pad_w,
        'new_h': new_h,
        'new_w': new_w
    }

    # Run inference
    with torch.no_grad():
        corner_pred, icon_pred, room_pred = model(image_tensor)

    # Process predictions
    corner_heatmaps = corner_pred[0].cpu().numpy()
    icon_heatmaps = torch.nn.functional.softmax(icon_pred[0], dim=-1).cpu().numpy()
    room_heatmaps = torch.nn.functional.softmax(room_pred[0], dim=-1).cpu().numpy()

    # Scale coordinates back to original dimensions before saving
    scale_x = original_dims['width'] / original_dims['new_w']
    scale_y = original_dims['height'] / original_dims['new_h']

    # Reconstruct floorplan
    result_dict = reconstructFloorplan(
        corner_heatmaps[:, :, :NUM_WALL_CORNERS],
        corner_heatmaps[:, :, NUM_WALL_CORNERS:NUM_WALL_CORNERS + 4],
        corner_heatmaps[:, :, -4:],
        icon_heatmaps,
        room_heatmaps,
        output_prefix=os.path.join(output_dir, ''),
        densityImage=None,
        gt_dict=None,
        gt=False,
        gap=gap,
        distanceThreshold=distance_threshold,
        lengthThreshold=length_threshold,
        debug_prefix=output_dir,
        enableAugmentation=not disable_augmentation,
        heatmapValueThresholdWall=wall_threshold_conv,
        heatmapValueThresholdDoor=door_threshold_conv,
        heatmapValueThresholdIcon=icon_threshold_conv,
        padding_info={
            'pad_w': pad_w,
            'pad_h': pad_h,
            'scale_x': scale_x,
            'scale_y': scale_y,
            'orig_width': original_dims['width'],
            'orig_height': original_dims['height']
        }
    )

    # Generate TypeScript export for initial data
    floorplan_initial_txt = os.path.join(output_dir, 'floorplan_initial.txt')
    if os.path.exists(floorplan_initial_txt):
        floorplan_initial_ts = os.path.join(output_dir, 'floorplan_initial.ts')

        with open(floorplan_initial_txt, 'r') as f:
            lines = f.readlines()

        ts_content = []
        ts_content.append("// Initial model data before opening matching")
        ts_content.append("export const initialFloorplanData: Array<[number] | [number, number] | [number, number, number, number, number, number] | [number, number, number, number, string, number, number]> = [")

        # First line contains dimensions
        dimensions = lines[0].strip().split()
        ts_content.append(f"  [{dimensions[0]}, {dimensions[1]}], // Width, Height")

        # Second line contains count
        count = int(lines[1].strip())
        ts_content.append(f"  [{count}], // Number of elements")

        # Process the remaining lines
        for i in range(2, len(lines)):
            line = lines[i].strip()
            if not line:
                continue

            parts = line.split()
            if len(parts) >= 7 and parts[4] not in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']:
                ts_content.append(f"  [{parts[0]}, {parts[1]}, {parts[2]}, {parts[3]}, '{parts[4]}', {parts[5]}, {parts[6]}],")
            elif len(parts) >= 6:
                ts_content.append(f"  [{parts[0]}, {parts[1]}, {parts[2]}, {parts[3]}, {parts[4]}, {parts[5]}],")

        ts_content.append("];")

        with open(floorplan_initial_ts, 'w') as f:
            f.write('\n'.join(ts_content))

    return result_dict

def run_classification(image_path, output_dir, confidence=0.4):
    """
    Run classification using direct integration instead of subprocess
    Args:
        image_path: Path to the input image
        output_dir: Output directory where results will be saved
        confidence: Detection confidence threshold (default: 0.4)

    Returns:
        Dictionary containing classification results or None on failure
    """
    start_time = time.time()
    print("Running classification for doors and windows...")

    try:
        # Add the classification directory to Python path if not already added
        script_dir = os.path.dirname(os.path.abspath(__file__))
        classification_dir = os.path.join(script_dir, 'classification')

        if classification_dir not in sys.path:
            sys.path.insert(0, classification_dir)

        # Import detector class directly
        from detect import FloorPlanDetector # type: ignore
        import helper # type: ignore

        # Initialize detector (cache it as function attribute for reuse)
        if not hasattr(run_classification, '_detector'):
            print("Loading YOLO model for classification...")
            # Try different possible model paths
            possible_model_paths = [
                os.path.join(script_dir, 'checkpoint', 'best.pt'),  # Most likely location
                os.path.join(classification_dir, 'best.pt'),
                os.path.join(script_dir, 'best.pt'),
                'best.pt'
            ]

            model_path = None
            for path in possible_model_paths:
                if os.path.exists(path):
                    model_path = path
                    print(f"Found model at: {model_path}")
                    break

            if model_path is None:
                print("Error: Could not find YOLO model file (best.pt)")
                print("Searched in:")
                for path in possible_model_paths:
                    print(f"  - {path}")
                return None

            run_classification._detector = FloorPlanDetector(model_path)

        detector = run_classification._detector

        if detector.model is None:
            print("Failed to load YOLO model")
            return None

        # Run detection directly
        labels_to_detect = ['Door', 'Window', 'Sliding Door']
        results = detector.detect_objects(
            image_path=image_path,
            labels_to_detect=labels_to_detect,
            confidence=confidence
        )

        if "error" in results:
            print(f"Classification error: {results['error']}")
            return None

        # Prepare output paths
        classification_output_path = os.path.join(output_dir, 'classification_result.png')
        classification_json_path = os.path.join(output_dir, 'classification_details.json')

        # Save annotated image (optional - can be removed for even faster processing)
        if detector.save_detected_image(results, classification_output_path):
            print(f"Classification image saved to: {classification_output_path}")

        # Prepare detailed results for JSON
        detailed_results = {
            'detections': [
                {
                    'class': detector.model.names[int(box.cls)],
                    'confidence': float(box.conf),
                    'x1': float(box.xyxy[0][0]),
                    'y1': float(box.xyxy[0][1]),
                    'x2': float(box.xyxy[0][2]),
                    'y2': float(box.xyxy[0][3]),
                    'center_x': float((box.xyxy[0][0] + box.xyxy[0][2]) / 2),
                    'center_y': float((box.xyxy[0][1] + box.xyxy[0][3]) / 2)
                }
                for box in results['filtered_boxes']
            ],
            'total_detections': results['total_objects'],
            'object_counts': results['object_counts']
        }

        # Save JSON details
        with open(classification_json_path, 'w') as f:
            json.dump(detailed_results, f, indent=2)

        # Save classification results to text file (maintaining compatibility)
        classification_txt_path = os.path.join(output_dir, 'classification_results.txt')
        with open(classification_txt_path, 'w') as f:
            f.write("Classification Results\n")
            f.write("====================\n")
            f.write(f"Total objects detected: {results['total_objects']}\n\n")
            f.write("Object counts:\n")
            for label, count in results['object_counts'].items():
                f.write(f"  {label}: {count}\n")

            if detailed_results and 'detections' in detailed_results:
                f.write("\nDetailed Detection Results:\n")
                f.write("===========================\n")
                f.write("Format: [Object_Type] - Confidence: X.XX - Bounding Box: (x1, y1, x2, y2)\n")
                f.write("Note: Coordinates are in image pixel space (top-left origin)\n\n")

                for detection in detailed_results['detections']:
                    f.write(f"[{detection['class']}] - Confidence: {detection['confidence']:.3f} - "
                           f"Bounding Box: ({detection['x1']:.1f}, {detection['y1']:.1f}, "
                           f"{detection['x2']:.1f}, {detection['y2']:.1f})\n")

        processing_time = time.time() - start_time
        print(f"Classification completed in {processing_time:.3f} seconds")

        return {
            "success": True,
            "object_counts": results['object_counts'],
            "total_objects": results['total_objects'],
            "detailed_results": detailed_results
        }

    except ImportError as e:
        print(f"Import error during classification: {str(e)}")
        print("Make sure the classification directory is accessible")
        print(f"Classification directory: {classification_dir}")
        print("Trying to install ultralytics...")
        try:
            import subprocess
            subprocess.check_call([sys.executable, "-m", "pip", "install", "ultralytics==8.2.8"])
            print("Ultralytics installed successfully. Please run the script again.")
        except Exception as install_error:
            print(f"Failed to install ultralytics: {install_error}")
        return None

    except Exception as e:
        print(f"Error during classification: {str(e)}")
        import traceback
        traceback.print_exc()
        return None

def scan_floorplan(image_path, output_dir='', wall_threshold=500, door_threshold=500, icon_threshold=500, gap=-1, distance_threshold=-1, length_threshold=-1, disable_augmentation=False, confidence=0.4):
    """
    Complete floorplan scanning pipeline
    Args:
        image_path: Path to the input image
        output_dir: Output directory (default: based on image name)
        wall_threshold: Wall detection threshold (1-1000, default: 500)
        door_threshold: Door detection threshold (1-1000, default: 500)
        icon_threshold: Icon detection threshold (1-1000, default: 500)
        gap: Gap parameter for element spacing (-1 for default)
        distance_threshold: Distance threshold for proximity detection (-1 for default)
        length_threshold: Length threshold for minimum element sizes (-1 for default)
        disable_augmentation: Disable corner detection augmentation
        confidence: Classification confidence threshold (default: 0.4)

    Returns:
        Dictionary with results and success status
    """
    # Create output directory if not specified
    if not output_dir:
        base_name = os.path.splitext(os.path.basename(image_path))[0]
        output_dir = os.path.join('results', base_name)

    # Validate threshold ranges
    wall_threshold = max(1, min(1000, wall_threshold))
    door_threshold = max(1, min(1000, door_threshold))
    icon_threshold = max(1, min(1000, icon_threshold))

    # Get initial timing estimates using the new module
    timing_predictor = create_timing_predictor()
    step_estimates = timing_predictor.get_step_estimates(image_path)

    # Use the new logging functions
    print("Info: Starting floorplan scan")
    startup_time = PhaseTimeLogger.log_step_start("Startup", step_estimates['startup'])

    # Process floorplan
    result_dict = process_image(
        image_path,
        output_dir,
        wall_threshold=wall_threshold,
        door_threshold=door_threshold,
        icon_threshold=icon_threshold,
        gap=gap,
        distance_threshold=distance_threshold,
        length_threshold=length_threshold,
        disable_augmentation=disable_augmentation
    )

    if not result_dict:
        PhaseTimeLogger.log_step_complete("Process Image", startup_time, success=False)
        return {"success": False, "error": "Floorplan processing failed"}

    # Continue with other phases using the new logging system
    ai_detection_time = PhaseTimeLogger.log_step_start("AI Detection", step_estimates['ai_detection'])
    classification_results = run_classification(image_path, output_dir, confidence)
    classification_time = PhaseTimeLogger.log_step_start("Classification", step_estimates['classification'])
    matching_success = match_openings(output_dir, distance_threshold=30.0)
    opening_matching_time = PhaseTimeLogger.log_step_start("Opening Matching", step_estimates['opening_matching'])

    # Finalize logs
    PhaseTimeLogger.log_step_complete("Startup", startup_time)
    PhaseTimeLogger.log_step_complete("AI Detection", ai_detection_time)
    PhaseTimeLogger.log_step_complete("Process Image", startup_time)
    PhaseTimeLogger.log_step_complete("Classification", classification_time)
    PhaseTimeLogger.log_step_complete("Opening Matching", opening_matching_time)

    return {
        "success": True,
        "output_dir": output_dir,
        "floorplan_results": result_dict,
        "classification_results": classification_results,
        "opening_matching_success": matching_success
    }

def main():
    """
    Main function with clear phase separation including MILP optimization
    """
    parser = argparse.ArgumentParser(description='Floorplan Detection - Inference with Time Prediction')
    parser.add_argument('image_path', type=str, help='Path to the input image')
    parser.add_argument('--output', type=str, default='', help='Output directory (default: based on image name)')
    parser.add_argument('--wall-threshold', type=int, default=500, help='Wall detection threshold (1-1000, default: 500)')
    parser.add_argument('--door-threshold', type=int, default=500, help='Door detection threshold (1-1000, default: 500)')
    parser.add_argument('--icon-threshold', type=int, default=500, help='Icon detection threshold (1-1000, default: 500)')
    parser.add_argument('--gap', type=int, default=-1, help='Gap parameter for element spacing (-1 for default)')
    parser.add_argument('--distance-threshold', type=int, default=-1, help='Distance threshold for proximity detection (-1 for default)')
    parser.add_argument('--length-threshold', type=int, default=-1, help='Length threshold for minimum element sizes (-1 for default)')
    parser.add_argument('--disable-augmentation', action='store_true', help='Disable corner detection augmentation')

    args = parser.parse_args()

    # Initialize timing predictors
    timing_predictor = create_timing_predictor()
    milp_predictor = create_milp_predictor()

    # Validate threshold ranges
    for threshold_name in ['wall_threshold', 'door_threshold', 'icon_threshold']:
        threshold_value = getattr(args, threshold_name)
        if threshold_value < 1 or threshold_value > 1000:
            print(f"Warning: {threshold_name} should be between 1 and 1000. Using default value of 500.")
            setattr(args, threshold_name, 500)

    # Create output directory
    if not args.output:
        base_name = os.path.splitext(os.path.basename(args.image_path))[0]
        output_dir = os.path.join('results', base_name)
    else:
        output_dir = args.output

    # Get basic time estimates
    step_estimates = timing_predictor.get_step_estimates(args.image_path)

    # PHASE 1: Startup and Model Loading
    print(f"DrawHouse: Phase 1 - Startup and Model Loading - Estimated {step_estimates['startup']:.1f}s")
    phase1_start = time.time()

    # Create output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Load model args
    model_args = parse_args(['--task', 'test', '--restore', '1', '--width', '256', '--height', '256'])
    model_args.checkpoint_dir = 'checkpoint'
    model_args.visualizeMode = ''

    # Load AI model
    model = Model(model_args)
    device = torch.device('cpu')
    model.to(device)

    # Load checkpoint
    checkpoint_path = os.path.join(model_args.checkpoint_dir, 'checkpoint.pth')
    if os.path.exists(checkpoint_path):
        model.load_state_dict(torch.load(checkpoint_path, map_location=device))
    model.eval()

    # Load and preprocess image
    image = cv2.imread(args.image_path)
    if image is None:
        print("Error: Could not load image")
        return 1

    phase1_actual = time.time() - phase1_start

    # PHASE 2: AI Detection and Feature Recognition
    print(f"DrawHouse: Phase 2 - AI Detection and Feature Recognition - Estimated {step_estimates['ai_detection']:.1f}s")
    phase2_start = time.time()

    # Preprocess image for AI model
    h, w = image.shape[:2]
    target_size = model_args.width
    ratio = target_size / max(h, w)
    new_h, new_w = int(h * ratio), int(w * ratio)

    image_resized = cv2.resize(image, (new_w, new_h))
    square_image = np.zeros((target_size, target_size, 3), dtype=np.uint8)
    pad_h = (target_size - new_h) // 2
    pad_w = (target_size - new_w) // 2
    square_image[pad_h:pad_h+new_h, pad_w:pad_w+new_w] = image_resized

    image_tensor = torch.from_numpy(square_image.transpose((2, 0, 1)) / 255.0 - 0.5).float().unsqueeze(0).to(device)

    # Run AI inference
    with torch.no_grad():
        corner_pred, icon_pred, room_pred = model(image_tensor)

    # Process predictions
    corner_heatmaps = corner_pred[0].cpu().numpy()
    icon_heatmaps = torch.nn.functional.softmax(icon_pred[0], dim=-1).cpu().numpy()
    room_heatmaps = torch.nn.functional.softmax(room_pred[0], dim=-1).cpu().numpy()

    phase2_actual = time.time() - phase2_start

    # Now calculate the ACTUAL MILP estimate based on AI detection results
    # This happens BEFORE Phase 3 starts so we can show the real estimate
    try:
        # Import necessary functions for problem analysis
        from core.IP_utils import extractCorners, findIconsFromLines
        from core.utils import NUM_WALL_CORNERS

        # Convert thresholds for analysis
        wall_threshold_conv = max(0.001, min(1.0, args.wall_threshold / 1000.0))
        door_threshold_conv = max(0.001, min(1.0, args.door_threshold / 1000.0))
        icon_threshold_conv = max(0.001, min(1.0, args.icon_threshold / 1000.0))

        # Extract basic problem structure (lightweight version of what IP.py does)
        wallPoints, wallLines, _, _, _ = extractCorners(
            corner_heatmaps[:, :, :NUM_WALL_CORNERS],
            wall_threshold_conv, gap=10, augment=not args.disable_augmentation, gt=False
        )
        doorPoints, doorLines, _, _, _ = extractCorners(
            corner_heatmaps[:, :, NUM_WALL_CORNERS:NUM_WALL_CORNERS + 4],
            door_threshold_conv, gap=10, cornerType='door', gt=False
        )
        iconPoints, iconLines, _, _, _ = extractCorners(
            corner_heatmaps[:, :, -4:],
            icon_threshold_conv, gap=10, cornerType='icon', gt=False
        )

        # Find icons from lines
        icons = findIconsFromLines(iconPoints, iconLines)

        # Get actual problem size
        wall_count = len(wallLines) if wallLines else 0
        door_count = len(doorLines) if doorLines else 0
        icon_count = len(icons) if icons else 0

        # Estimate conflicts (rough approximation for timing prediction)
        estimated_conflicts = min(wall_count * 15, 3000)  # Reasonable estimate

        # Create MILP problem data for timing prediction
        milp_problem_data = {
            'wall_count': wall_count,
            'door_count': door_count,
            'icon_count': icon_count,
            'conflict_pairs': estimated_conflicts,
            'wall_neighbors': wall_count * 3  # Rough estimate
        }

        # Threshold information for the predictor
        threshold_info = {
            'wall_threshold': args.wall_threshold,
            'door_threshold': args.door_threshold,
            'icon_threshold': args.icon_threshold
        }

        # Get the actual sophisticated MILP timing prediction
        milp_prediction = milp_predictor.predict_milp_time_pre_solve(milp_problem_data, threshold_info)
        milp_estimated_time = milp_prediction['predicted_time']

    except Exception as e:
        # Fallback to basic estimate if analysis fails
        print(f"Warning: Could not pre-analyze MILP problem: {e}")
        milp_estimated_time = step_estimates['lp_optimization']

    # PHASE 3: MILP Optimization (Floor Plan Reconstruction) - NOW WITH REAL ESTIMATE
    # print(f"DrawHouse: Phase 3 - MILP Optimization (Floor Plan Reconstruction) - Estimated {milp_estimated_time:.1f}s")
    phase3_start = time.time()

    # Convert thresholds
    wall_threshold_conv = max(0.001, min(1.0, args.wall_threshold / 1000.0))
    door_threshold_conv = max(0.001, min(1.0, args.door_threshold / 1000.0))
    icon_threshold_conv = max(0.001, min(1.0, args.icon_threshold / 1000.0))

    # Scale coordinates back to original dimensions
    scale_x = w / new_w
    scale_y = h / new_h

    # Import NUM_WALL_CORNERS for the reconstructFloorplan call
    from core.utils import NUM_WALL_CORNERS

    # Run the MILP optimization (this is where the heavy computation happens)
    result_dict = reconstructFloorplan(
        corner_heatmaps[:, :, :NUM_WALL_CORNERS],
        corner_heatmaps[:, :, NUM_WALL_CORNERS:NUM_WALL_CORNERS + 4],
        corner_heatmaps[:, :, -4:],
        icon_heatmaps,
        room_heatmaps,
        output_prefix=os.path.join(output_dir, ''),
        densityImage=None,
        gt_dict=None,
        gt=False,
        gap=args.gap,
        distanceThreshold=args.distance_threshold,
        lengthThreshold=args.length_threshold,
        debug_prefix=output_dir,
        enableAugmentation=not args.disable_augmentation,
        heatmapValueThresholdWall=wall_threshold_conv,
        heatmapValueThresholdDoor=door_threshold_conv,
        heatmapValueThresholdIcon=icon_threshold_conv,
        padding_info={
            'pad_w': pad_w,
            'pad_h': pad_h,
            'scale_x': scale_x,
            'scale_y': scale_y,
            'orig_width': w,
            'orig_height': h
        }
    )

    phase3_actual = time.time() - phase3_start

    if not result_dict:
        print("Error: MILP optimization failed")
        return 1

    # Generate TypeScript export for initial data
    floorplan_initial_txt = os.path.join(output_dir, 'floorplan_initial.txt')
    if os.path.exists(floorplan_initial_txt):
        floorplan_initial_ts = os.path.join(output_dir, 'floorplan_initial.ts')

        with open(floorplan_initial_txt, 'r') as f:
            lines = f.readlines()

        ts_content = []
        ts_content.append("// Initial model data before opening matching")
        ts_content.append("export const initialFloorplanData: Array<[number] | [number, number] | [number, number, number, number, number, number] | [number, number, number, number, string, number, number]> = [")

        # First line contains dimensions
        dimensions = lines[0].strip().split()
        ts_content.append(f"  [{dimensions[0]}, {dimensions[1]}], // Width, Height")

        # Second line contains count
        count = int(lines[1].strip())
        ts_content.append(f"  [{count}], // Number of elements")

        # Process the remaining lines
        for i in range(2, len(lines)):
            line = lines[i].strip()
            if not line:
                continue

            parts = line.split()
            if len(parts) >= 7 and parts[4] not in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']:
                ts_content.append(f"  [{parts[0]}, {parts[1]}, {parts[2]}, {parts[3]}, '{parts[4]}', {parts[5]}, {parts[6]}],")
            elif len(parts) >= 6:
                ts_content.append(f"  [{parts[0]}, {parts[1]}, {parts[2]}, {parts[3]}, {parts[4]}, {parts[5]}],")

        ts_content.append("];")

        with open(floorplan_initial_ts, 'w') as f:
            f.write('\n'.join(ts_content))

    # PHASE 4: Door & Window Classification
    print(f"DrawHouse: Phase 4 - Door & Window Classification - Estimated {step_estimates['classification']:.1f}s")
    phase4_start = time.time()

    classification_results = run_classification(args.image_path, output_dir)
    phase4_actual = time.time() - phase4_start

    # PHASE 5: Opening Matching and Integration
    if classification_results:
        print(f"DrawHouse: Phase 5 - Opening Matching and Integration - Estimated {step_estimates['opening_matching']:.1f}s")
        phase5_start = time.time()

        matching_success = match_openings(output_dir, distance_threshold=30.0)
        phase5_actual = time.time() - phase5_start
    else:
        phase5_actual = 0
        matching_success = False

    # PHASE 6: Final Processing & Export
    print(f"DrawHouse: Phase 6 - Final Processing & Export - Estimated 1.0s")
    phase6_start = time.time()

    # Generate final summary
    total_actual = phase1_actual + phase2_actual + phase3_actual + phase4_actual + phase5_actual
    total_estimated = (step_estimates['startup'] + step_estimates['ai_detection'] +
                      milp_estimated_time + step_estimates['classification'] +
                      step_estimates['opening_matching'])

    # Create processing summary
    summary = {
        "total_time": total_actual,
        "estimated_time": total_estimated,
        "phases": {
            "startup": {"actual": phase1_actual, "estimated": step_estimates['startup']},
            "ai_detection": {"actual": phase2_actual, "estimated": step_estimates['ai_detection']},
            "milp_optimization": {"actual": phase3_actual, "estimated": milp_estimated_time},
            "classification": {"actual": phase4_actual, "estimated": step_estimates['classification']},
            "matching": {"actual": phase5_actual, "estimated": step_estimates['opening_matching']}
        },
        "success": result_dict is not None and classification_results is not None and matching_success
    }

    # Save summary to JSON file for frontend
    summary_path = os.path.join(output_dir, 'processing_summary.json')
    with open(summary_path, 'w') as f:
        json.dump(summary, f, indent=2)

    phase6_actual = time.time() - phase6_start

    # PHASE 7: Reconstruction
    print(f"DrawHouse: Phase 7 - Reconstruction - Estimated 25.0s")
    phase7_start = time.time()

    # This phase represents the final reconstruction step that happens after all processing
    # For now, this is a placeholder that immediately completes
    # In the future, this could include additional processing like 3D reconstruction,
    # detailed room analysis, or other post-processing steps

    phase7_actual = time.time() - phase7_start

    # Final status - removed the DrawHouse message as requested
    # total_actual = phase1_actual + phase2_actual + phase3_actual + phase4_actual + phase5_actual + phase6_actual + phase7_actual
    # if summary["success"]:
    #     print(f"DrawHouse: All Phases Complete - Total Time {total_actual:.1f}s - Results saved to {output_dir}")
    # else:
    #     print(f"DrawHouse: Processing Complete with Errors - Total Time {total_actual:.1f}s - Partial results saved to {output_dir}")

    return 0 if summary["success"] else 1

if __name__ == '__main__':
    exit(main())
