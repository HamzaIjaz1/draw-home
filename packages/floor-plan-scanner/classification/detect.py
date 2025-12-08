#!/usr/bin/env python3
"""
Floor Plan Object Detection Command Line Script

Usage:
    python detect.py image_path.png --doors --windows
    python detect.py image_path.png --all
    python detect.py image_path.png --doors --confidence 0.6
"""

import argparse
import sys
import os
from ultralytics import YOLO
import PIL
import helper
import torch

class FloorPlanDetector:
    def __init__(self, model_path=None):
        """Initialize the detector with a YOLO model"""
        if model_path is None:
            # Default to checkpoint/best.pt relative to the script's parent directory
            script_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            model_path = os.path.join(script_dir, 'checkpoint', 'best.pt')

        self.model = self._load_model_safely(model_path)
        self.available_labels = {
            'columns': 'Column',
            'curtain-walls': 'Curtain Wall',
            'dimensions': 'Dimension',
            'doors': 'Door',
            'railings': 'Railing',
            'sliding-doors': 'Sliding Door',
            'stairs': 'Stair Case',
            'walls': 'Wall',
            'windows': 'Window'
        }

    def _load_model_safely(self, model_path):
        """Load YOLO model with PyTorch 2.6 compatibility fix"""
        try:
            import torch.serialization
            original_load = torch.load

            def patched_load(*args, **kwargs):
                if 'weights_only' not in kwargs:
                    kwargs['weights_only'] = False
                return original_load(*args, **kwargs)

            torch.load = patched_load
            model = YOLO(model_path)
            torch.load = original_load
            return model
        except Exception as e:
            print(f"Error loading model: {str(e)}")
            return None

    def detect_objects(self, image_path, labels_to_detect=None, confidence=0.4):
        """Detect objects in an image"""
        if self.model is None:
            return {"error": "Model not loaded"}

        if not os.path.exists(image_path):
            return {"error": f"Image file not found: {image_path}"}

        if labels_to_detect is None:
            labels_to_detect = list(self.available_labels.values())

        try:
            # Load image
            image = PIL.Image.open(image_path)

            # Run prediction
            results = self.model.predict(image, conf=confidence)

            # Filter boxes based on selected labels
            filtered_boxes = [
                box for box in results[0].boxes
                if self.model.names[int(box.cls)] in labels_to_detect
            ]

            # Count detected objects
            object_counts = helper.count_detected_objects(self.model, filtered_boxes)

            return {
                "success": True,
                "object_counts": object_counts,
                "total_objects": sum(object_counts.values()),
                "filtered_boxes": filtered_boxes,
                "results": results[0]
            }

        except Exception as e:
            return {"error": f"Detection failed: {str(e)}"}

    def save_detected_image(self, results, output_path):
        """Save the image with detection boxes drawn"""
        try:
            if "results" in results and results["results"]:
                # Set the filtered boxes back to the results
                results["results"].boxes = results["filtered_boxes"]
                # Plot and save
                plotted = results["results"].plot()[:, :, ::-1]
                PIL.Image.fromarray(plotted).save(output_path)
                return True
        except Exception as e:
            print(f"Error saving image: {str(e)}")
            return False

def parse_arguments():
    """Parse command line arguments"""
    parser = argparse.ArgumentParser(
        description='Detect objects in floor plan images',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python detect.py floor_plan.png --doors --windows
  python detect.py floor_plan.png --all
  python detect.py floor_plan.png --doors --confidence 0.6 --output-image result.png
        """
    )

    parser.add_argument('image_path',
                       help='Path to the input image')

    # Object type arguments
    parser.add_argument('--doors', action='store_true',
                       help='Detect doors')
    parser.add_argument('--windows', action='store_true',
                       help='Detect windows')
    parser.add_argument('--walls', action='store_true',
                       help='Detect walls')
    parser.add_argument('--columns', action='store_true',
                       help='Detect columns')
    parser.add_argument('--curtain-walls', action='store_true',
                       help='Detect curtain walls')
    parser.add_argument('--dimensions', action='store_true',
                       help='Detect dimensions')
    parser.add_argument('--railings', action='store_true',
                       help='Detect railings')
    parser.add_argument('--sliding-doors', action='store_true',
                       help='Detect sliding doors')
    parser.add_argument('--stairs', action='store_true',
                       help='Detect staircases')
    parser.add_argument('--all', action='store_true',
                       help='Detect all available objects')

    # Optional arguments
    parser.add_argument('--confidence', type=float, default=0.4,
                       help='Detection confidence threshold (0.0-1.0, default: 0.4)')
    parser.add_argument('--output-image', type=str,
                       help='Save annotated image to this path')
    parser.add_argument('--output-csv', type=str,
                       help='Save detection results to CSV file')
    parser.add_argument('--output-json', type=str,
                       help='Save detailed detection results with bounding boxes to JSON file')
    parser.add_argument('--quiet', action='store_true',
                       help='Suppress output messages')

    return parser.parse_args()

def main():
    """Main function"""
    args = parse_arguments()

    # Initialize detector
    detector = FloorPlanDetector()

    if detector.model is None:
        print("Failed to load YOLO model. Please check that 'best.pt' exists.")
        sys.exit(1)

    # Determine which labels to detect
    labels_to_detect = []

    if args.all:
        labels_to_detect = list(detector.available_labels.values())
    else:
        # Check which object types were requested
        for arg_name, label_name in detector.available_labels.items():
            if getattr(args, arg_name.replace('-', '_'), False):
                labels_to_detect.append(label_name)

    # If no specific objects were requested, detect all
    if not labels_to_detect:
        if not args.quiet:
            print("No specific objects requested. Detecting all available objects.")
        labels_to_detect = list(detector.available_labels.values())

    if not args.quiet:
        print(f"Detecting: {', '.join(labels_to_detect)}")
        print(f"Confidence threshold: {args.confidence}")
        print(f"Processing image: {args.image_path}")

    # Run detection
    results = detector.detect_objects(
        image_path=args.image_path,
        labels_to_detect=labels_to_detect,
        confidence=args.confidence
    )

    if "error" in results:
        print(f"Error: {results['error']}")
        sys.exit(1)

    # Display results
    if not args.quiet:
        print("\n" + "="*50)
        print("DETECTION RESULTS")
        print("="*50)
        print(f"Total objects detected: {results['total_objects']}")
        print("\nObject counts:")

    for label, count in results['object_counts'].items():
        print(f"  {label}: {count}")

    # Save annotated image if requested
    if args.output_image:
        if detector.save_detected_image(results, args.output_image):
            if not args.quiet:
                print(f"\nAnnotated image saved to: {args.output_image}")
        else:
            print(f"Failed to save annotated image to: {args.output_image}")

    # Save CSV if requested
    if args.output_csv:
        try:
            csv_data = helper.generate_csv(results['object_counts'])
            with open(args.output_csv, 'w') as f:
                f.write(csv_data)
            if not args.quiet:
                print(f"CSV report saved to: {args.output_csv}")
        except Exception as e:
            print(f"Failed to save CSV: {str(e)}")

    # Save JSON if requested
    if args.output_json:
        try:
            json_data = helper.generate_json(results['filtered_boxes'], detector.model)
            with open(args.output_json, 'w') as f:
                f.write(json_data)
            if not args.quiet:
                print(f"JSON report saved to: {args.output_json}")
        except Exception as e:
            print(f"Failed to save JSON: {str(e)}")

    if not args.quiet:
        print("="*50)

if __name__ == "__main__":
    main()
