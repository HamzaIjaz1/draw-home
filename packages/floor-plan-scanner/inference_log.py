# Start timing immediately when script loads (before heavy imports)
import time
SCRIPT_START_TIME = time.time()

import torch
import os
import cv2
import argparse
import numpy as np
import subprocess
import json
import sys
import platform
import psutil
from datetime import datetime
from core.utils import *
from core.options import parse_args
from models.model import Model
from core.IP import reconstructFloorplan
from core.constants import iconNumberNameMap  # Add import for iconNumberNameMap
from opening_matcher import match_openings  # Import the opening matcher

# Try to import GPUtil for GPU information
try:
    import GPUtil # type: ignore
    GPUTIL_AVAILABLE = True
except ImportError:
    GPUTIL_AVAILABLE = False
    print("Warning: GPUtil not available. GPU information will be limited.")

# Calculate import overhead time
IMPORT_END_TIME = time.time()
IMPORT_OVERHEAD_TIME = IMPORT_END_TIME - SCRIPT_START_TIME

def get_system_info():
    """
    Collect comprehensive system information for performance comparison
    Returns:
        Dictionary containing system specifications
    """
    system_info = {}

    try:
        # Basic system information
        system_info['timestamp'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        system_info['platform'] = platform.platform()
        system_info['system'] = platform.system()
        system_info['machine'] = platform.machine()
        system_info['processor'] = platform.processor()
        system_info['architecture'] = platform.architecture()[0]

        # CPU information
        system_info['cpu_count_logical'] = psutil.cpu_count(logical=True)
        system_info['cpu_count_physical'] = psutil.cpu_count(logical=False)
        system_info['cpu_freq_max'] = f"{psutil.cpu_freq().max:.2f} MHz" if psutil.cpu_freq() else "Unknown"
        system_info['cpu_freq_current'] = f"{psutil.cpu_freq().current:.2f} MHz" if psutil.cpu_freq() else "Unknown"

        # Memory information
        memory = psutil.virtual_memory()
        system_info['total_memory'] = f"{memory.total / (1024**3):.2f} GB"
        system_info['available_memory'] = f"{memory.available / (1024**3):.2f} GB"
        system_info['memory_percent_used'] = f"{memory.percent:.1f}%"

        # Disk information for the current directory
        disk = psutil.disk_usage('.')
        system_info['disk_total'] = f"{disk.total / (1024**3):.2f} GB"
        system_info['disk_free'] = f"{disk.free / (1024**3):.2f} GB"
        system_info['disk_percent_used'] = f"{(disk.used / disk.total) * 100:.1f}%"

        # PyTorch and CUDA information
        system_info['pytorch_version'] = torch.__version__
        system_info['cuda_available'] = torch.cuda.is_available()

        if torch.cuda.is_available():
            system_info['cuda_version'] = torch.version.cuda
            system_info['cudnn_version'] = torch.backends.cudnn.version()
            system_info['cuda_device_count'] = torch.cuda.device_count()

            # Get information for each CUDA device
            for i in range(torch.cuda.device_count()):
                device_name = torch.cuda.get_device_name(i)
                device_capability = torch.cuda.get_device_capability(i)
                memory_allocated = torch.cuda.memory_allocated(i) / (1024**3)
                memory_cached = torch.cuda.memory_reserved(i) / (1024**3)

                system_info[f'cuda_device_{i}_name'] = device_name
                system_info[f'cuda_device_{i}_capability'] = f"{device_capability[0]}.{device_capability[1]}"
                system_info[f'cuda_device_{i}_memory_allocated'] = f"{memory_allocated:.2f} GB"
                system_info[f'cuda_device_{i}_memory_cached'] = f"{memory_cached:.2f} GB"
        else:
            system_info['cuda_reason'] = "CUDA not available"

        # Additional GPU information using GPUtil if available
        if GPUTIL_AVAILABLE:
            try:
                gpus = GPUtil.getGPUs()
                for i, gpu in enumerate(gpus):
                    system_info[f'gpu_{i}_name'] = gpu.name
                    system_info[f'gpu_{i}_memory_total'] = f"{gpu.memoryTotal} MB"
                    system_info[f'gpu_{i}_memory_used'] = f"{gpu.memoryUsed} MB"
                    system_info[f'gpu_{i}_memory_util'] = f"{gpu.memoryUtil * 100:.1f}%"
                    system_info[f'gpu_{i}_load'] = f"{gpu.load * 100:.1f}%"
                    system_info[f'gpu_{i}_temperature'] = f"{gpu.temperature}°C"
            except Exception as e:
                system_info['gpu_info_error'] = f"Error getting GPU info: {str(e)}"

        # Python version
        system_info['python_version'] = platform.python_version()

        # Try to get CPU model name from /proc/cpuinfo on Linux
        if platform.system() == 'Linux':
            try:
                with open('/proc/cpuinfo', 'r') as f:
                    for line in f:
                        if line.startswith('model name'):
                            system_info['cpu_model'] = line.split(':')[1].strip()
                            break
            except:
                pass

        # Load average (Linux/Unix only)
        if hasattr(os, 'getloadavg'):
            load_avg = os.getloadavg()
            system_info['load_average_1min'] = f"{load_avg[0]:.2f}"
            system_info['load_average_5min'] = f"{load_avg[1]:.2f}"
            system_info['load_average_15min'] = f"{load_avg[2]:.2f}"

    except Exception as e:
        system_info['system_info_error'] = f"Error collecting system info: {str(e)}"

    return system_info

def save_timing_info(output_dir, timing_data):
    """
    Save timing information with system specs to a separate text file
    Args:
        output_dir: Output directory where timing file will be saved
        timing_data: Dictionary containing timing information
    """
    timing_file_path = os.path.join(output_dir, 'processing_times.txt')

    try:
        # Collect system information
        system_info = get_system_info()

        with open(timing_file_path, 'w') as f:
            f.write("Processing Times and System Information Report\n")
            f.write("============================================\n")
            f.write(f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")

            # Write system information section
            f.write("SYSTEM SPECIFICATIONS\n")
            f.write("====================\n")

            # Basic system info
            f.write("Basic Information:\n")
            f.write(f"  Platform: {system_info.get('platform', 'Unknown')}\n")
            f.write(f"  System: {system_info.get('system', 'Unknown')}\n")
            f.write(f"  Architecture: {system_info.get('architecture', 'Unknown')}\n")
            f.write(f"  Machine: {system_info.get('machine', 'Unknown')}\n")
            if 'cpu_model' in system_info:
                f.write(f"  CPU Model: {system_info['cpu_model']}\n")
            else:
                f.write(f"  Processor: {system_info.get('processor', 'Unknown')}\n")
            f.write(f"  Python Version: {system_info.get('python_version', 'Unknown')}\n")
            f.write(f"  PyTorch Version: {system_info.get('pytorch_version', 'Unknown')}\n")

            # CPU information
            f.write("\nCPU Information:\n")
            f.write(f"  Physical Cores: {system_info.get('cpu_count_physical', 'Unknown')}\n")
            f.write(f"  Logical Cores: {system_info.get('cpu_count_logical', 'Unknown')}\n")
            f.write(f"  Max Frequency: {system_info.get('cpu_freq_max', 'Unknown')}\n")
            f.write(f"  Current Frequency: {system_info.get('cpu_freq_current', 'Unknown')}\n")

            # Load average if available
            if 'load_average_1min' in system_info:
                f.write(f"  Load Average (1min): {system_info['load_average_1min']}\n")
                f.write(f"  Load Average (5min): {system_info['load_average_5min']}\n")
                f.write(f"  Load Average (15min): {system_info['load_average_15min']}\n")

            # Memory information
            f.write("\nMemory Information:\n")
            f.write(f"  Total Memory: {system_info.get('total_memory', 'Unknown')}\n")
            f.write(f"  Available Memory: {system_info.get('available_memory', 'Unknown')}\n")
            f.write(f"  Memory Usage: {system_info.get('memory_percent_used', 'Unknown')}\n")

            # GPU/CUDA information
            f.write("\nGPU/CUDA Information:\n")
            f.write(f"  CUDA Available: {system_info.get('cuda_available', 'Unknown')}\n")

            if system_info.get('cuda_available', False):
                f.write(f"  CUDA Version: {system_info.get('cuda_version', 'Unknown')}\n")
                f.write(f"  cuDNN Version: {system_info.get('cudnn_version', 'Unknown')}\n")
                f.write(f"  CUDA Device Count: {system_info.get('cuda_device_count', 'Unknown')}\n")

                # Write information for each CUDA device
                device_count = system_info.get('cuda_device_count', 0)
                for i in range(device_count):
                    if f'cuda_device_{i}_name' in system_info:
                        f.write(f"  CUDA Device {i}:\n")
                        f.write(f"    Name: {system_info[f'cuda_device_{i}_name']}\n")
                        f.write(f"    Capability: {system_info.get(f'cuda_device_{i}_capability', 'Unknown')}\n")
                        f.write(f"    Memory Allocated: {system_info.get(f'cuda_device_{i}_memory_allocated', 'Unknown')}\n")
                        f.write(f"    Memory Cached: {system_info.get(f'cuda_device_{i}_memory_cached', 'Unknown')}\n")

                # Additional GPU info from GPUtil if available
                i = 0
                while f'gpu_{i}_name' in system_info:
                    if i == 0:
                        f.write("\nGPU Runtime Information (GPUtil):\n")
                    f.write(f"  GPU {i}:\n")
                    f.write(f"    Name: {system_info[f'gpu_{i}_name']}\n")
                    f.write(f"    Total Memory: {system_info.get(f'gpu_{i}_memory_total', 'Unknown')}\n")
                    f.write(f"    Used Memory: {system_info.get(f'gpu_{i}_memory_used', 'Unknown')}\n")
                    f.write(f"    Memory Utilization: {system_info.get(f'gpu_{i}_memory_util', 'Unknown')}\n")
                    f.write(f"    GPU Load: {system_info.get(f'gpu_{i}_load', 'Unknown')}\n")
                    f.write(f"    Temperature: {system_info.get(f'gpu_{i}_temperature', 'Unknown')}\n")
                    i += 1
            else:
                f.write(f"  Reason: {system_info.get('cuda_reason', 'Not specified')}\n")

            # Disk information
            f.write("\nDisk Information (Current Directory):\n")
            f.write(f"  Total Space: {system_info.get('disk_total', 'Unknown')}\n")
            f.write(f"  Free Space: {system_info.get('disk_free', 'Unknown')}\n")
            f.write(f"  Disk Usage: {system_info.get('disk_percent_used', 'Unknown')}\n")

            # Add any error information
            if 'system_info_error' in system_info:
                f.write(f"\nSystem Info Errors: {system_info['system_info_error']}\n")
            if 'gpu_info_error' in system_info:
                f.write(f"GPU Info Errors: {system_info['gpu_info_error']}\n")

            # Performance timing section
            f.write("\n" + "="*60 + "\n")
            f.write("PERFORMANCE TIMING RESULTS\n")
            f.write("==========================\n\n")

            # Add startup overhead section
            startup_overhead = timing_data.get('Python Import and Startup Overhead', 0)
            if startup_overhead > 0:
                f.write("STARTUP OVERHEAD\n")
                f.write("================\n")
                f.write(f"  Python Import and Library Loading: {startup_overhead:.3f} seconds\n")
                f.write(f"  → STARTUP SUBTOTAL: {startup_overhead:.3f} seconds\n\n")

            # Categorize timing phases for better understanding
            core_ai_phases = [
                '1. Neural Network Model Loading',
                '2. Image Resize and Tensor Preparation',
                '3. Neural Network Inference (Core AI)',
                '4. Neural Network Output Processing'
            ]

            reconstruction_phases = [
                '5. Floorplan Reconstruction Algorithm (IP)',
                '6. Output File Generation'
            ]

            additional_phases = [
                'Classification Processing',
                'Opening Matching Processing'
            ]

            # Calculate phase group totals
            core_ai_total = sum(timing_data.get(phase, 0) for phase in core_ai_phases if timing_data.get(phase) is not None)
            reconstruction_total = sum(timing_data.get(phase, 0) for phase in reconstruction_phases if timing_data.get(phase) is not None)
            additional_total = sum(timing_data.get(phase, 0) for phase in additional_phases if timing_data.get(phase) is not None)

            # Get actual total times
            total_processing_time = timing_data.get('Total Processing Time', 0)
            true_end_to_end_time = timing_data.get('True End-to-End Time', 0)

            # Calculate overhead (startup, coordination, file I/O etc.)
            calculated_sum = startup_overhead + core_ai_total + reconstruction_total + additional_total
            processing_overhead = max(0, true_end_to_end_time - calculated_sum)

            # Write detailed timing breakdown
            f.write("CORE AI PROCESSING (Neural Network)\n")
            f.write("===================================\n")
            for phase in core_ai_phases:
                phase_time = timing_data.get(phase)
                if phase_time is not None:
                    f.write(f"  {phase}: {phase_time:.3f} seconds\n")
                else:
                    f.write(f"  {phase}: Failed or skipped\n")
            f.write(f"  → CORE AI SUBTOTAL: {core_ai_total:.3f} seconds\n\n")

            f.write("FLOORPLAN RECONSTRUCTION\n")
            f.write("========================\n")
            for phase in reconstruction_phases:
                phase_time = timing_data.get(phase)
                if phase_time is not None:
                    f.write(f"  {phase}: {phase_time:.3f} seconds\n")
                else:
                    f.write(f"  {phase}: Failed or skipped\n")
            f.write(f"  → RECONSTRUCTION SUBTOTAL: {reconstruction_total:.3f} seconds\n\n")

            if additional_total > 0:
                f.write("ADDITIONAL PROCESSING\n")
                f.write("====================\n")
                for phase in additional_phases:
                    phase_time = timing_data.get(phase)
                    if phase_time is not None:
                        f.write(f"  {phase}: {phase_time:.3f} seconds\n")
                    else:
                        f.write(f"  {phase}: Failed or skipped\n")
                f.write(f"  → ADDITIONAL PROCESSING SUBTOTAL: {additional_total:.3f} seconds\n\n")

            # Show calculation formula and results
            f.write("TIMING CALCULATION FORMULA\n")
            f.write("==========================\n")
            if startup_overhead > 0:
                f.write(f"Startup Overhead: {startup_overhead:.3f}s\n")
            f.write(f"+ Core AI Time: {core_ai_total:.3f}s\n")
            f.write(f"+ Reconstruction Time: {reconstruction_total:.3f}s\n")
            if additional_total > 0:
                f.write(f"+ Additional Processing: {additional_total:.3f}s\n")
            if processing_overhead > 0.01:  # Only show if significant
                f.write(f"+ Processing Overhead: {processing_overhead:.3f}s\n")
            f.write("= " + "="*40 + "\n")
            if true_end_to_end_time > 0:
                f.write(f"TRUE END-TO-END TIME: {true_end_to_end_time:.3f} seconds\n")
                f.write(f"PROCESSING-ONLY TIME: {total_processing_time:.3f} seconds\n\n")
            else:
                f.write(f"TOTAL PROCESSING TIME: {total_processing_time:.3f} seconds\n\n")

            # Verification
            f.write("CALCULATION VERIFICATION\n")
            f.write("========================\n")
            f.write(f"Sum of Individual Phases: {calculated_sum:.3f} seconds\n")
            if true_end_to_end_time > 0:
                f.write(f"Actual Measured End-to-End: {true_end_to_end_time:.3f} seconds\n")
                f.write(f"Processing-Only Time: {total_processing_time:.3f} seconds\n")
                if abs(true_end_to_end_time - calculated_sum) > 0.01:
                    f.write(f"Unaccounted Overhead: {processing_overhead:.3f} seconds\n")
                    f.write("(Includes system coordination, argument parsing, and other overhead)\n")
                else:
                    f.write("Excellent timing accuracy - minimal unaccounted overhead\n")
            else:
                f.write(f"Actual Measured Total: {total_processing_time:.3f} seconds\n")
                if abs(total_processing_time - calculated_sum) > 0.01:
                    f.write(f"Processing Overhead: {processing_overhead:.3f} seconds\n")
                    f.write("(Includes program startup, coordination between phases, and I/O operations)\n")
                else:
                    f.write("Excellent timing accuracy - minimal overhead detected\n")

            # Add human-readable breakdown percentages
            reference_time = true_end_to_end_time if true_end_to_end_time > 0 else total_processing_time
            if reference_time > 0:
                f.write("\nTIME BREAKDOWN (Human-Readable)\n")
                f.write("===============================\n")
                if startup_overhead > 0:
                    startup_percent = (startup_overhead / reference_time) * 100
                    f.write(f"🚀 Startup Overhead: {startup_percent:.1f}% ({startup_overhead:.2f}s)\n")

                core_ai_percent = (core_ai_total / reference_time) * 100
                reconstruction_percent = (reconstruction_total / reference_time) * 100
                f.write(f"🧠 Core AI Processing: {core_ai_percent:.1f}% ({core_ai_total:.2f}s)\n")
                f.write(f"🏗️  Floorplan Reconstruction: {reconstruction_percent:.1f}% ({reconstruction_total:.2f}s)\n")

                if additional_total > 0:
                    additional_percent = (additional_total / reference_time) * 100
                    f.write(f"🔍 Additional Processing: {additional_percent:.1f}% ({additional_total:.2f}s)\n")

                if processing_overhead > 0.01:
                    overhead_percent = (processing_overhead / reference_time) * 100
                    f.write(f"⚙️  Other Overhead: {overhead_percent:.1f}% ({processing_overhead:.2f}s)\n")

                f.write(f"\nDominant Phase: ")
                if startup_overhead >= max(core_ai_total, reconstruction_total, additional_total):
                    f.write("🚀 Startup Overhead (Python/Library Loading)\n")
                elif core_ai_total >= reconstruction_total and core_ai_total >= additional_total:
                    f.write("🧠 Core AI Processing (Neural Network)\n")
                elif reconstruction_total >= additional_total:
                    f.write("🏗️ Floorplan Reconstruction (Algorithm)\n")
                else:
                    f.write("🔍 Additional Processing (Classification/Matching)\n")

            # Add performance summary for quick comparison
            f.write("\n" + "="*60 + "\n")
            f.write("QUICK COMPARISON SUMMARY\n")
            f.write("========================\n")
            f.write(f"Machine: {system_info.get('cpu_model', system_info.get('processor', 'Unknown'))}\n")
            f.write(f"Cores: {system_info.get('cpu_count_physical', 'Unknown')} physical / {system_info.get('cpu_count_logical', 'Unknown')} logical\n")
            f.write(f"Memory: {system_info.get('total_memory', 'Unknown')}\n")
            if system_info.get('cuda_available', False):
                device_count = system_info.get('cuda_device_count', 0)
                if device_count > 0 and f'cuda_device_0_name' in system_info:
                    f.write(f"GPU: {system_info['cuda_device_0_name']}\n")
                else:
                    f.write("GPU: CUDA available but no device info\n")
            else:
                f.write("GPU: CPU only\n")

            if true_end_to_end_time > 0:
                f.write(f"📊 TRUE END-TO-END TIME: {true_end_to_end_time:.2f} seconds\n")
                f.write(f"📊 PROCESSING-ONLY TIME: {total_processing_time:.2f} seconds\n")
                if startup_overhead > 0:
                    f.write(f"🚀 Startup Time: {startup_overhead:.2f}s ({(startup_overhead/true_end_to_end_time)*100:.1f}%)\n")
                f.write(f"🧠 Core AI Time: {core_ai_total:.2f}s ({(core_ai_total/true_end_to_end_time)*100:.1f}%)\n")
                f.write(f"🏗️ Reconstruction Time: {reconstruction_total:.2f}s ({(reconstruction_total/true_end_to_end_time)*100:.1f}%)\n")
            else:
                f.write(f"📊 TOTAL PROCESSING TIME: {total_processing_time:.2f} seconds\n")
                f.write(f"🧠 Core AI Time: {core_ai_total:.2f}s ({(core_ai_total/total_processing_time)*100:.1f}%)\n")
                f.write(f"🏗️ Reconstruction Time: {reconstruction_total:.2f}s ({(reconstruction_total/total_processing_time)*100:.1f}%)\n")

            # Add comparison with user's stopwatch
            if true_end_to_end_time > 0:
                f.write(f"\n🕐 TIMING COMPARISON:\n")
                f.write(f"Your stopwatch measurement: ~40 seconds\n")
                f.write(f"Script's end-to-end measurement: {true_end_to_end_time:.1f} seconds\n")
                f.write(f"Difference: {abs(40 - true_end_to_end_time):.1f} seconds\n")
                if abs(40 - true_end_to_end_time) > 5:
                    f.write(f"Note: Remaining difference may be due to terminal startup,\n")
                    f.write(f"      system process initialization, or measurement precision.\n")
                else:
                    f.write(f"Excellent correlation with manual timing!\n")

        print(f"Comprehensive timing and system information saved to: {timing_file_path}")
        return True

    except Exception as e:
        print(f"Error saving timing information: {str(e)}")
        return False

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
        Tuple of (result_dict, timing_info)
    """
    start_total = time.time()
    timing_info = {}

    # Convert thresholds from 1-1000 range to 0.005-1 range
    wall_threshold_conv = max(0.001, min(1.0, wall_threshold / 1000.0))
    door_threshold_conv = max(0.001, min(1.0, door_threshold / 1000.0))
    icon_threshold_conv = max(0.001, min(1.0, icon_threshold / 1000.0))

    # Create output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Use provided model args or get defaults
    if model_args is None:
        # Get default arguments and override with test settings
        model_args = parse_args(['--task', 'test',
                               '--restore', '1',
                               '--width', '256',
                               '--height', '256'])
        model_args.checkpoint_dir = 'checkpoint'
        model_args.visualizeMode = ''

    # Measure model loading time
    start_model = time.time()
    model = Model(model_args)
    device = torch.device('cpu')
    model.to(device)

    # Load checkpoint
    checkpoint_path = os.path.join(model_args.checkpoint_dir, 'checkpoint.pth')
    if os.path.exists(checkpoint_path):
        model.load_state_dict(torch.load(checkpoint_path, map_location=device))
        print(f"Loaded model checkpoint from {checkpoint_path}")
    else:
        print(f"Warning: Checkpoint not found at {checkpoint_path}. Using untrained model.")

    # Set model to evaluation mode
    model.eval()
    timing_info['1. Neural Network Model Loading'] = time.time() - start_model

    # Measure image preprocessing time
    start_preprocess = time.time()
    print(f"Processing image: {image_path}")
    image = cv2.imread(image_path)
    if image is None:
        print(f"Error: Could not load image from {image_path}")
        return None, timing_info

    # Calculate padding to maintain aspect ratio
    h, w = image.shape[:2]
    target_size = model_args.width  # Since width == height for the model
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
    timing_info['2. Image Resize and Tensor Preparation'] = time.time() - start_preprocess

    # Measure inference time
    start_inference = time.time()
    with torch.no_grad():
        corner_pred, icon_pred, room_pred = model(image_tensor)
    timing_info['3. Neural Network Inference (Core AI)'] = time.time() - start_inference

    # Measure post-processing time (convert predictions to usable format)
    start_tensor_processing = time.time()
    corner_heatmaps = corner_pred[0].cpu().numpy()
    icon_heatmaps = torch.nn.functional.softmax(icon_pred[0], dim=-1).cpu().numpy()
    room_heatmaps = torch.nn.functional.softmax(room_pred[0], dim=-1).cpu().numpy()
    timing_info['4. Neural Network Output Processing'] = time.time() - start_tensor_processing

    # Measure floorplan reconstruction time (the IP algorithm)
    start_reconstruction = time.time()
    print("Reconstructing floorplan...")

    # Scale coordinates back to original dimensions before saving
    scale_x = original_dims['width'] / original_dims['new_w']
    scale_y = original_dims['height'] / original_dims['new_h']

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

    print(f"Results saved to {output_dir}")
    timing_info['5. Floorplan Reconstruction Algorithm (IP)'] = time.time() - start_reconstruction

    # Measure file generation time
    start_file_generation = time.time()

    # Check if floorplan_initial.txt was created and format it into a TypeScript export
    floorplan_initial_txt = os.path.join(output_dir, 'floorplan_initial.txt')
    if os.path.exists(floorplan_initial_txt):
        # Create initial TypeScript file for debugging/reference
        floorplan_initial_ts = os.path.join(output_dir, 'floorplan_initial.ts')

        # Read the floorplan_initial.txt content
        with open(floorplan_initial_txt, 'r') as f:
            lines = f.readlines()

        # Format the content as TypeScript export
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
                # This is a line with a label (door, cooking_counter, etc.)
                ts_content.append(f"  [{parts[0]}, {parts[1]}, {parts[2]}, {parts[3]}, '{parts[4]}', {parts[5]}, {parts[6]}],")
            elif len(parts) >= 6:
                # This is a line segment (wall or other structural element)
                ts_content.append(f"  [{parts[0]}, {parts[1]}, {parts[2]}, {parts[3]}, {parts[4]}, {parts[5]}],")

        # Close the array
        ts_content.append("];")

        # Write to floorplan_initial.ts
        with open(floorplan_initial_ts, 'w') as f:
            f.write('\n'.join(ts_content))

        print(f"Created initial TypeScript export at {floorplan_initial_ts}")

    timing_info['6. Output File Generation'] = time.time() - start_file_generation

    # Calculate total scanning time (excluding overall processing overhead)
    scanning_total = sum([
        timing_info.get('1. Neural Network Model Loading', 0),
        timing_info.get('2. Image Resize and Tensor Preparation', 0),
        timing_info.get('3. Neural Network Inference (Core AI)', 0),
        timing_info.get('4. Neural Network Output Processing', 0),
        timing_info.get('5. Floorplan Reconstruction Algorithm (IP)', 0),
        timing_info.get('6. Output File Generation', 0)
    ])
    timing_info['Total Scanning Phase'] = scanning_total

    return result_dict, timing_info

def run_classification(image_path, output_dir, confidence=0.4):
    """
    Run classification using direct integration instead of subprocess
    Args:
        image_path: Path to the input image
        output_dir: Output directory where results will be saved
        confidence: Detection confidence threshold (default: 0.4)

    Returns:
        Tuple of (classification_results, processing_time)
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
                processing_time = time.time() - start_time
                return None, processing_time

            run_classification._detector = FloorPlanDetector(model_path)

        detector = run_classification._detector

        if detector.model is None:
            print("Failed to load YOLO model")
            processing_time = time.time() - start_time
            return None, processing_time

        # Run detection directly
        labels_to_detect = ['Door', 'Window', 'Sliding Door']
        results = detector.detect_objects(
            image_path=image_path,
            labels_to_detect=labels_to_detect,
            confidence=confidence
        )

        if "error" in results:
            print(f"Classification error: {results['error']}")
            processing_time = time.time() - start_time
            return None, processing_time

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

        print(f"Classification summary saved to: {classification_txt_path}")

        # Print summary
        print(f"Classification completed. Total objects detected: {results['total_objects']}")
        for label, count in results['object_counts'].items():
            print(f"  {label}: {count}")

        if detailed_results and 'detections' in detailed_results:
            print(f"Detailed bounding boxes saved for {len(detailed_results['detections'])} objects")

        processing_time = time.time() - start_time
        print(f"Classification completed in {processing_time:.3f} seconds")

        return {
            "success": True,
            "object_counts": results['object_counts'],
            "total_objects": results['total_objects'],
            "detailed_results": detailed_results
        }, processing_time

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
        processing_time = time.time() - start_time
        return None, processing_time

    except Exception as e:
        print(f"Error during classification: {str(e)}")
        import traceback
        traceback.print_exc()
        processing_time = time.time() - start_time
        return None, processing_time

def main():
    """
    Main function to handle command line interface
    """
    # Calculate true end-to-end time from script start
    true_start_time = SCRIPT_START_TIME
    overall_start_time = time.time()

    parser = argparse.ArgumentParser(description='Floorplan Detection - Inference Only')
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

    # Validate threshold ranges
    for threshold_name in ['wall_threshold', 'door_threshold', 'icon_threshold']:
        threshold_value = getattr(args, threshold_name)
        if threshold_value < 1 or threshold_value > 1000:
            print(f"Warning: {threshold_name} should be between 1 and 1000. Using default value of 500.")
            setattr(args, threshold_name, 500)

    # Create an output directory based on the image filename if not specified
    if not args.output:
        base_name = os.path.splitext(os.path.basename(args.image_path))[0]
        output_dir = os.path.join('results', base_name)
    else:
        output_dir = args.output

    # Process the image with thresholds and collect timing information
    result_dict, floorplan_timing = process_image(
        args.image_path,
        output_dir,
        wall_threshold=args.wall_threshold,
        door_threshold=args.door_threshold,
        icon_threshold=args.icon_threshold,
        gap=args.gap,
        distance_threshold=args.distance_threshold,
        length_threshold=args.length_threshold,
        disable_augmentation=args.disable_augmentation
    )

    # Print summary of detected elements
    if result_dict:
        print("\nDetection Summary:")
        if 'wall' in result_dict:
            print(f"Walls: {len(result_dict['wall'][1])}")
        if 'door' in result_dict:
            print(f"Doors: {len(result_dict['door'][1])}")
        if 'icon' in result_dict:
            print(f"Icons: {len(result_dict['icon'][1])}")
    else:
        print("No results were generated. Check for errors above.")

    # Run classification after scanning is complete
    print("\n" + "="*60)
    print("STARTING CLASSIFICATION PHASE")
    print("="*60)

    classification_results, classification_time = run_classification(args.image_path, output_dir)

    if classification_results:
        print("\nBoth scanning and classification completed successfully!")

        # Run opening matching to update floorplan.ts with correct door/window types
        print("\n" + "="*60)
        print("STARTING OPENING MATCHING PHASE")
        print("="*60)

        matching_start_time = time.time()
        matching_success = match_openings(output_dir, distance_threshold=30.0)
        matching_time = time.time() - matching_start_time

        if matching_success:
            print("\nAll phases completed successfully!")
            print(f"Final results saved to: {output_dir}")
            print("floorplan.ts has been updated with matched door/window types")
        else:
            print("\nOpening matching failed, but other results are available.")
            print(f"Results saved to: {output_dir}")
    else:
        print("\nScanning completed. Classification failed or was skipped.")
        print(f"Scanning results saved to: {output_dir}")
        matching_time = None

    # Compile all timing information
    overall_time = time.time() - overall_start_time
    true_end_to_end_time = time.time() - true_start_time

    all_timing_data = {}

    # Add startup overhead timing
    all_timing_data['Python Import and Startup Overhead'] = IMPORT_OVERHEAD_TIME

    # Add floorplan processing timing
    if floorplan_timing:
        all_timing_data.update(floorplan_timing)

    # Add classification timing
    if classification_time is not None:
        all_timing_data['Classification Processing'] = classification_time

    # Add opening matching timing
    if matching_time is not None:
        all_timing_data['Opening Matching Processing'] = matching_time

    # Add both timing measurements
    all_timing_data['Total Processing Time'] = overall_time
    all_timing_data['True End-to-End Time'] = true_end_to_end_time

    # Save comprehensive timing information
    save_timing_info(output_dir, all_timing_data)

    # Print timing summary to console
    print(f"\n" + "="*60)
    print("TIMING SUMMARY")
    print("="*60)

    # Show import overhead first
    print(f"🚀 STARTUP OVERHEAD:")
    print(f"   Python Import and Library Loading: {IMPORT_OVERHEAD_TIME:.3f}s")

    # Categorize phases for console output too
    core_ai_phases = [
        '1. Neural Network Model Loading',
        '2. Image Resize and Tensor Preparation',
        '3. Neural Network Inference (Core AI)',
        '4. Neural Network Output Processing'
    ]

    reconstruction_phases = [
        '5. Floorplan Reconstruction Algorithm (IP)',
        '6. Output File Generation'
    ]

    additional_phases = [
        'Classification Processing',
        'Opening Matching Processing'
    ]

    # Calculate phase group totals for console
    startup_total = IMPORT_OVERHEAD_TIME
    core_ai_total = sum(all_timing_data.get(phase, 0) for phase in core_ai_phases if all_timing_data.get(phase) is not None)
    reconstruction_total = sum(all_timing_data.get(phase, 0) for phase in reconstruction_phases if all_timing_data.get(phase) is not None)
    additional_total = sum(all_timing_data.get(phase, 0) for phase in additional_phases if all_timing_data.get(phase) is not None)

    total_processing_time = all_timing_data.get('Total Processing Time', 0)
    true_end_to_end_time = all_timing_data.get('True End-to-End Time', 0)
    calculated_sum = startup_total + core_ai_total + reconstruction_total + additional_total
    processing_overhead = max(0, true_end_to_end_time - calculated_sum)

    # Print organized timing breakdown
    print("\n🧠 CORE AI PROCESSING (Neural Network):")
    for phase in core_ai_phases:
        phase_time = all_timing_data.get(phase)
        if phase_time is not None:
            print(f"   {phase}: {phase_time:.3f}s")
    print(f"   → Core AI Subtotal: {core_ai_total:.3f}s")

    print("\n🏗️ FLOORPLAN RECONSTRUCTION:")
    for phase in reconstruction_phases:
        phase_time = all_timing_data.get(phase)
        if phase_time is not None:
            print(f"   {phase}: {phase_time:.3f}s")
    print(f"   → Reconstruction Subtotal: {reconstruction_total:.3f}s")

    if additional_total > 0:
        print("\n🔍 ADDITIONAL PROCESSING:")
        for phase in additional_phases:
            phase_time = all_timing_data.get(phase)
            if phase_time is not None:
                print(f"   {phase}: {phase_time:.3f}s")
        print(f"   → Additional Subtotal: {additional_total:.3f}s")

    # Show formula calculation
    print(f"\n📊 TIMING BREAKDOWN:")
    print(f"🚀 Startup: {startup_total:.3f}s")
    print(f"🧠 Core AI: {core_ai_total:.3f}s")
    print(f"🏗️ Reconstruction: {reconstruction_total:.3f}s")
    if additional_total > 0:
        print(f"🔍 Additional: {additional_total:.3f}s")
    if processing_overhead > 0.01:
        print(f"⚙️ Other Overhead: {processing_overhead:.3f}s")
    print(f"= TRUE END-TO-END TIME: {true_end_to_end_time:.3f}s")
    print(f"  (vs {total_processing_time:.3f}s without startup)")

    # Show percentages based on true end-to-end time
    if true_end_to_end_time > 0:
        print(f"\n📈 TRUE BREAKDOWN:")
        print(f"🚀 Startup: {(startup_total/true_end_to_end_time)*100:.1f}%")
        print(f"🧠 Core AI: {(core_ai_total/true_end_to_end_time)*100:.1f}%")
        print(f"🏗️ Reconstruction: {(reconstruction_total/true_end_to_end_time)*100:.1f}%")
        if additional_total > 0:
            print(f"🔍 Additional: {(additional_total/true_end_to_end_time)*100:.1f}%")
        if processing_overhead > 0.01:
            print(f"⚙️ Other Overhead: {(processing_overhead/true_end_to_end_time)*100:.1f}%")

    print(f"\n🕐 COMPARISON:")
    print(f"   Your stopwatch time: ~40 seconds")
    print(f"   True end-to-end time: {true_end_to_end_time:.1f} seconds")
    print(f"   Difference: {abs(40 - true_end_to_end_time):.1f} seconds")
    if abs(40 - true_end_to_end_time) > 5:
        print(f"   Note: Remaining difference may be due to terminal startup,")
        print(f"         system process initialization, or timing measurement precision.")

    print(f"\nDetailed timing report saved to: {os.path.join(output_dir, 'processing_times.txt')}")

if __name__ == '__main__':
    main()
