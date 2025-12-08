# Floorplan Detection - Inference Only

This repository contains code for detecting and reconstructing floorplans from images. This is a simplified inference-only version of the original implementation.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt --extra-index-url https://download.pytorch.org/whl/cpu
```

Or from root:
```bash
pip install -r packages/floor-plan-scanner/requirements.txt --extra-index-url https://download.pytorch.org/whl/cpu
```

2. Download the pretrained model [checkpoint](https://drive.google.com/file/d/1e5c7308fdoCMRv0w-XduWqyjYPV4JWHS/view) and place it in the `checkpoint` directory:
- checkpoint/checkpoint.pth

## Usage

To run inference on a floorplan image:

```bash
python test_inference.py path/to/your/floorplan.jpg
```

Optional arguments:
- `--output`: Specify output directory (default: results/[image_name])
- `--wall-threshold`: Wall detection threshold (range: 1-1000, default: 500)
- `--door-threshold`: Door detection threshold (range: 1-1000, default: 500)
- `--icon-threshold`: Icon detection threshold (range: 1-1000, default: 500)
- `--gap`: Gap parameter for element spacing (-1 for default)
- `--distance-threshold`: Distance threshold for proximity detection (-1 for default)
- `--length-threshold`: Length threshold for minimum element sizes (-1 for default)
- `--disable-augmentation`: Disable corner detection augmentation (flag, default: augmentation enabled)

### Threshold Options

The threshold parameters control the sensitivity of detection:
- Lower values (closer to 1): More features detected, but may include false positives
- Higher values (closer to 1000): Only high-confidence features detected, may miss some features
- The expanded 1-1000 scale provides finer control than the previous 1-100 scale

Example with custom thresholds:
```bash
python test_inference.py examples/00.png --wall-threshold 50 --door-threshold 600 --icon-threshold 400
```

### Advanced Parameters

The advanced parameters provide fine-grained control over the reconstruction algorithm:

- **Gap Parameter** (`--gap`): Controls the spacing between elements. A higher value increases the minimum distance required between elements during extraction. Default is optimized for most floorplans (-1).

- **Distance Threshold** (`--distance-threshold`): Controls proximity detection between elements. A higher value makes the algorithm more tolerant of gaps between elements that should be connected. Default is optimized for most floorplans (-1).

- **Length Threshold** (`--length-threshold`): Controls the minimum size of elements. A higher value filters out smaller elements that might be noise. Default is optimized for most floorplans (-1).

- **Augmentation** (`--disable-augmentation`): By default, the algorithm uses augmentation techniques to improve corner detection. Use this flag to disable augmentation if it's producing unwanted results.

Example with advanced parameters:
```bash
python test_inference.py examples/00.png --gap 3 --distance-threshold 5 --length-threshold 10 --disable-augmentation
```

## Output

The script will generate several visualization files in the output directory:
- input.png: Original input image
- corner_heatmap.png: Detected corner points
- icon_heatmap.png: Detected icons (bathroom fixtures, cooking counters, etc.)
- room_heatmap.png: Room segmentation
- result_line.png: Detected wall lines
- result_door.png: Detected doors
- result_icon.png: Detected icons
- floorplan.txt: Structured representation of the detected floorplan
- floorplan.ts: The file that takes floorplan.txt and prepares them to be used on the frontend

## Example Images

Sample floorplan images are provided in the `examples/` directory.
