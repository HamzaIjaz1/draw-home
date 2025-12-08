import PIL
import pandas as pd
import json

def count_detected_objects(model, filtered_boxes):
    """
    Count detected objects and return a dictionary of counts.
    """
    object_counts = {}
    for box in filtered_boxes:
        # Extract class label of detected object
        label = model.names[int(box.cls)]
        # Update count in dictionary
        object_counts[label] = object_counts.get(label, 0) + 1
    return object_counts

def generate_csv(object_counts):
    """
    Generate CSV data from detected object counts.
    """
    csv_data = pd.DataFrame(list(object_counts.items()), columns=['Label', 'Count'])
    csv_file = csv_data.to_csv(index=False)
    return csv_file

def generate_json(filtered_boxes, model):
    """
    Generate JSON data with detailed bounding box information.
    """
    detections = []

    for box in filtered_boxes:
        # Extract bounding box coordinates (YOLO format: xyxy)
        bbox = box.xyxy[0].cpu().numpy()  # Get the first (and only) bounding box
        confidence_score = float(box.conf[0].cpu().numpy())
        class_id = int(box.cls[0].cpu().numpy())
        class_name = model.names[class_id]

        detection_info = {
            'class': class_name,
            'confidence': confidence_score,
            'x1': float(bbox[0]),  # Left
            'y1': float(bbox[1]),  # Top
            'x2': float(bbox[2]),  # Right
            'y2': float(bbox[3]),  # Bottom
            'width': float(bbox[2] - bbox[0]),
            'height': float(bbox[3] - bbox[1]),
            'center_x': float((bbox[0] + bbox[2]) / 2),
            'center_y': float((bbox[1] + bbox[3]) / 2)
        }
        detections.append(detection_info)

    json_output = {
        'detections': detections,
        'total_detections': len(detections),
        'object_counts': count_detected_objects(model, filtered_boxes)
    }

    return json.dumps(json_output, indent=2)
