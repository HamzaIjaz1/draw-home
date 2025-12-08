import json
import os
import math
from typing import List, Dict, Tuple, Optional

def calculate_distance(point1: Tuple[float, float], point2: Tuple[float, float]) -> float:
    """Calculate Euclidean distance between two points"""
    return math.sqrt((point1[0] - point2[0])**2 + (point1[1] - point2[1])**2)

def get_opening_center(opening_data: List) -> Tuple[float, float]:
    """Get the center point of an opening from floorplan data"""
    x1, y1, x2, y2 = opening_data[0], opening_data[1], opening_data[2], opening_data[3]
    center_x = (x1 + x2) / 2
    center_y = (y1 + y2) / 2
    return (center_x, center_y)

def get_detection_center(detection: Dict) -> Tuple[float, float]:
    """Get the center point of a detection from classification results"""
    return (detection['center_x'], detection['center_y'])

def calculate_line_to_point_distance(line_start: Tuple[float, float], line_end: Tuple[float, float],
                                   point: Tuple[float, float]) -> float:
    """
    Calculate the minimum distance from a point to a line segment
    This is more accurate than just comparing center points
    """
    x1, y1 = line_start
    x2, y2 = line_end
    px, py = point

    # Calculate the squared length of the line segment
    line_length_sq = (x2 - x1) ** 2 + (y2 - y1) ** 2

    # If the line segment has zero length, return distance to the point
    if line_length_sq == 0:
        return math.sqrt((px - x1) ** 2 + (py - y1) ** 2)

    # Calculate the parameter t that represents the closest point on the line segment
    t = max(0, min(1, ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / line_length_sq))

    # Calculate the closest point on the line segment
    closest_x = x1 + t * (x2 - x1)
    closest_y = y1 + t * (y2 - y1)

    # Return the distance from the point to the closest point on the line segment
    return math.sqrt((px - closest_x) ** 2 + (py - closest_y) ** 2)

def is_opening_compatible_with_detection(opening_data: List, detection: Dict,
                                       distance_threshold: float = 30.0) -> Tuple[bool, float]:
    """
    Check if an opening is compatible with a detection
    Returns (is_compatible, distance)
    """
    # Get opening line segment endpoints
    x1, y1, x2, y2 = opening_data[0], opening_data[1], opening_data[2], opening_data[3]
    opening_start = (x1, y1)
    opening_end = (x2, y2)

    # Get detection center point
    detection_center = get_detection_center(detection)

    # Calculate distance from detection center to opening line segment
    distance = calculate_line_to_point_distance(opening_start, opening_end, detection_center)

    # Also check if the detection bounding box overlaps with the opening line area
    det_x1, det_y1 = detection['x1'], detection['y1']
    det_x2, det_y2 = detection['x2'], detection['y2']

    # Expand the opening line to create a small rectangular area around it
    line_buffer = 10  # pixels buffer around the line

    if x1 == x2:  # Vertical line
        opening_rect = (x1 - line_buffer, min(y1, y2), x1 + line_buffer, max(y1, y2))
    elif y1 == y2:  # Horizontal line
        opening_rect = (min(x1, x2), y1 - line_buffer, max(x1, x2), y1 + line_buffer)
    else:  # Diagonal line
        opening_rect = (min(x1, x2) - line_buffer, min(y1, y2) - line_buffer,
                       max(x1, x2) + line_buffer, max(y1, y2) + line_buffer)

    # Check for overlap between detection bounding box and opening area
    overlap = not (det_x2 < opening_rect[0] or det_x1 > opening_rect[2] or
                  det_y2 < opening_rect[1] or det_y1 > opening_rect[3])

    # Consider it compatible if either distance is small OR there's overlap
    is_compatible = distance <= distance_threshold or overlap

    return is_compatible, distance

def parse_floorplan_data(floorplan_path: str) -> Tuple[List, List]:
    """
    Parse floorplan.txt file and separate structural elements from openings
    Returns: (structural_elements, openings)
    """
    structural_elements = []
    openings = []

    with open(floorplan_path, 'r') as f:
        lines = f.readlines()

    # Skip first two lines (dimensions and count)
    for i in range(2, len(lines)):
        line = lines[i].strip()
        if not line:
            continue

        parts = line.split()
        if len(parts) >= 7 and parts[4] == 'empty':
            # This is an opening marked as 'empty'
            opening = [float(parts[0]), float(parts[1]), float(parts[2]), float(parts[3]),
                      parts[4], int(parts[5]), int(parts[6])]
            openings.append(opening)
        elif len(parts) >= 7 and parts[4] not in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']:
            # This is a labeled element (like cooking_counter, entrance) - skip for now
            continue
        elif len(parts) >= 6:
            # This is a structural element (wall, etc.) with numeric values
            try:
                element = [float(parts[0]), float(parts[1]), float(parts[2]), float(parts[3]),
                          int(parts[4]), int(parts[5])]
                structural_elements.append(element)
            except ValueError:
                # Skip lines that can't be parsed as structural elements
                continue

    return structural_elements, openings

def match_openings_with_detections(openings: List, detections: List,
                                 distance_threshold: float = 30.0) -> List:
    """
    Match openings with classification detections using improved line-to-point distance calculation

    Args:
        openings: List of opening data from floorplan
        detections: List of detection data from classification
        distance_threshold: Maximum distance for considering a match

    Returns:
        List of matched openings with updated types
    """
    matched_openings = []
    used_detections = set()

    print("\nDetailed matching process:")
    print("-" * 50)

    for i, opening in enumerate(openings):
        opening_center = get_opening_center(opening)
        x1, y1, x2, y2 = opening[0], opening[1], opening[2], opening[3]

        print(f"\nOpening {i+1}: Line from ({x1:.1f}, {y1:.1f}) to ({x2:.1f}, {y2:.1f})")
        print(f"  Center: ({opening_center[0]:.1f}, {opening_center[1]:.1f})")

        best_match = None
        best_distance = float('inf')
        best_detection_idx = -1
        best_is_compatible = False

        # Check all detections for compatibility
        for idx, detection in enumerate(detections):
            if idx in used_detections:
                continue

            is_compatible, distance = is_opening_compatible_with_detection(
                opening, detection, distance_threshold)

            detection_center = get_detection_center(detection)
            print(f"    vs {detection['class']} at ({detection_center[0]:.1f}, {detection_center[1]:.1f})")
            print(f"       Distance: {distance:.1f}, Compatible: {is_compatible}")

            if is_compatible and distance < best_distance:
                best_distance = distance
                best_match = detection
                best_detection_idx = idx
                best_is_compatible = True

        # Update opening type based on best match
        updated_opening = opening.copy()
        if best_match and best_is_compatible:
            # Map classification class to our opening type
            class_name = best_match['class'].lower()
            if class_name == 'door':
                updated_opening[4] = 'door'
            elif class_name == 'sliding door':
                updated_opening[4] = 'sliding_door'
            elif class_name == 'window':
                updated_opening[4] = 'window'
            else:
                updated_opening[4] = 'empty'  # Keep as empty if unknown class

            used_detections.add(best_detection_idx)
            detection_center = get_detection_center(best_match)
            print(f"  [OK] MATCHED with {class_name} (distance: {best_distance:.1f})")
        else:
            # No match found, keep as empty
            updated_opening[4] = 'empty'
            print(f"  [--] No compatible match found - keeping as empty")

        matched_openings.append(updated_opening)

    return matched_openings

def update_floorplan_txt(floorplan_txt_path: str, matched_openings: List, structural_elements: List):
    """
    Update the floorplan.txt file with matched opening types
    """
    # Read dimensions and count from original file
    with open(floorplan_txt_path, 'r') as f:
        lines = f.readlines()

    dimensions = lines[0].strip().split()
    count_line = lines[1].strip()

    # Prepare new content
    new_content = []

    # Add dimensions
    new_content.append(f"{dimensions[0]} {dimensions[1]}")

    # Add count
    new_content.append(count_line)

    # Add structural elements
    for element in structural_elements:
        if len(element) == 6:
            new_content.append(f"{int(element[0])} {int(element[1])} {int(element[2])} {int(element[3])} {int(element[4])} {int(element[5])}")

    # Add matched openings
    for opening in matched_openings:
        new_content.append(f"{int(opening[0])} {int(opening[1])} {int(opening[2])} {int(opening[3])} {opening[4]} {opening[5]} {opening[6]}")

    # Add any remaining non-opening elements from original file (like furniture)
    for i in range(2, len(lines)):
        line = lines[i].strip()
        if not line:
            continue

        parts = line.split()
        if len(parts) >= 7 and parts[4] != 'empty':
            # This is a non-empty labeled element (like cooking_counter, entrance)
            new_content.append(f"{parts[0]} {parts[1]} {parts[2]} {parts[3]} {parts[4]} {parts[5]} {parts[6]}")

    # Write back to floorplan.txt
    with open(floorplan_txt_path, 'w') as f:
        f.write('\n'.join(new_content) + '\n')

    print(f"Updated floorplan.txt saved to: {floorplan_txt_path}")

def update_floorplan_ts(floorplan_txt_path: str, floorplan_ts_path: str,
                       matched_openings: List, structural_elements: List):
    """
    Update the floorplan.ts file with matched opening types
    """
    # Read dimensions and count from original file
    with open(floorplan_txt_path, 'r') as f:
        lines = f.readlines()

    dimensions = lines[0].strip().split()
    count_line = lines[1].strip()

    # Prepare TypeScript content
    ts_content = []
    ts_content.append("// Model data imported from floorplan.txt")
    ts_content.append("export const floorplanData: Array<[number] | [number, number] | [number, number, number, number, number, number] | [number, number, number, number, string, number, number]> = [")

    # Add dimensions
    ts_content.append(f"  [{dimensions[0]}, {dimensions[1]}], // Width, Height")

    # Add count
    ts_content.append(f"  [{count_line}], // Number of elements")

    # Add structural elements
    for element in structural_elements:
        if len(element) == 6:
            ts_content.append(f"  [{int(element[0])}, {int(element[1])}, {int(element[2])}, {int(element[3])}, {int(element[4])}, {int(element[5])}],")

    # Add matched openings
    for opening in matched_openings:
        ts_content.append(f"  [{int(opening[0])}, {int(opening[1])}, {int(opening[2])}, {int(opening[3])}, '{opening[4]}', {opening[5]}, {opening[6]}],")

    # Add any remaining non-opening elements from original file (like furniture)
    for i in range(2, len(lines)):
        line = lines[i].strip()
        if not line:
            continue

        parts = line.split()
        if len(parts) >= 7 and parts[4] != 'empty':
            # This is a non-empty labeled element (like cooking_counter, entrance)
            ts_content.append(f"  [{parts[0]}, {parts[1]}, {parts[2]}, {parts[3]}, '{parts[4]}', {parts[5]}, {parts[6]}],")

    # Close the array
    ts_content.append("];")

    # Write to floorplan.ts
    with open(floorplan_ts_path, 'w') as f:
        f.write('\n'.join(ts_content))

    print(f"Updated floorplan.ts saved to: {floorplan_ts_path}")

def match_openings(output_dir: str, distance_threshold: float = 30.0) -> bool:
    """
    Main function to match openings with classification results

    Args:
        output_dir: Directory containing floorplan_initial.txt and classification_details.json
        distance_threshold: Maximum distance for considering a match (default: 30.0)

    Returns:
        True if matching was successful, False otherwise
    """
    print(f"Starting opening matching for directory: {output_dir}")

    # Define file paths - read from initial file, write to final file
    floorplan_initial_txt_path = os.path.join(output_dir, 'floorplan_initial.txt')
    floorplan_final_txt_path = os.path.join(output_dir, 'floorplan.txt')
    classification_json_path = os.path.join(output_dir, 'classification_details.json')
    floorplan_ts_path = os.path.join(output_dir, 'floorplan.ts')

    # Check if required files exist
    if not os.path.exists(floorplan_initial_txt_path):
        print(f"Error: floorplan_initial.txt not found at {floorplan_initial_txt_path}")
        return False

    if not os.path.exists(classification_json_path):
        print(f"Error: classification_details.json not found at {classification_json_path}")
        return False

    try:
        # Load classification results
        with open(classification_json_path, 'r') as f:
            classification_data = json.load(f)

        detections = classification_data.get('detections', [])
        print(f"Loaded {len(detections)} detections from classification results")

        # Parse floorplan data from initial file
        structural_elements, openings = parse_floorplan_data(floorplan_initial_txt_path)
        print(f"Found {len(openings)} empty openings in floorplan data")
        print(f"Found {len(structural_elements)} structural elements in floorplan data")

        if not openings:
            print("No empty openings found to match")
            # Still create final files to ensure consistency
            create_final_floorplan_files(floorplan_initial_txt_path, floorplan_final_txt_path,
                                       floorplan_ts_path, openings, structural_elements)
            return True

        if not detections:
            print("No detections found to match with")
            # Still create final files to ensure consistency
            create_final_floorplan_files(floorplan_initial_txt_path, floorplan_final_txt_path,
                                       floorplan_ts_path, openings, structural_elements)
            return True

        # Match openings with detections
        print(f"\nMatching openings with detections (distance threshold: {distance_threshold})...")
        matched_openings = match_openings_with_detections(openings, detections, distance_threshold)

        # Create final floorplan files with matched openings
        create_final_floorplan_files(floorplan_initial_txt_path, floorplan_final_txt_path,
                                   floorplan_ts_path, matched_openings, structural_elements)

        # Print summary
        door_count = sum(1 for opening in matched_openings if opening[4] == 'door')
        window_count = sum(1 for opening in matched_openings if opening[4] == 'window')
        empty_count = sum(1 for opening in matched_openings if opening[4] == 'empty')

        print(f"\nMatching completed successfully!")
        print(f"Summary of matched openings:")
        print(f"  Doors: {door_count}")
        print(f"  Windows: {window_count}")
        print(f"  Remaining empty: {empty_count}")
        print(f"Final floorplan.txt created at: {floorplan_final_txt_path}")

        return True

    except Exception as e:
        print(f"Error during opening matching: {str(e)}")
        return False

def create_final_floorplan_files(initial_txt_path: str, final_txt_path: str, ts_path: str,
                                matched_openings: List, structural_elements: List):
    """
    Create the final floorplan.txt and floorplan.ts files with matched opening types
    """
    # Read dimensions and count from initial file
    with open(initial_txt_path, 'r') as f:
        lines = f.readlines()

    dimensions = lines[0].strip().split()
    count_line = lines[1].strip()

    # Prepare final floorplan.txt content
    txt_content = []
    txt_content.append(f"{dimensions[0]} {dimensions[1]}")
    txt_content.append(count_line)

    # Add structural elements
    for element in structural_elements:
        if len(element) == 6:
            txt_content.append(f"{int(element[0])} {int(element[1])} {int(element[2])} {int(element[3])} {int(element[4])} {int(element[5])}")

    # Add matched openings
    for opening in matched_openings:
        txt_content.append(f"{int(opening[0])} {int(opening[1])} {int(opening[2])} {int(opening[3])} {opening[4]} {opening[5]} {opening[6]}")

    # Add any remaining non-opening elements from original file (like furniture)
    for i in range(2, len(lines)):
        line = lines[i].strip()
        if not line:
            continue

        parts = line.split()
        if len(parts) >= 7 and parts[4] != 'empty':
            # This is a non-empty labeled element (like cooking_counter, entrance)
            txt_content.append(f"{parts[0]} {parts[1]} {parts[2]} {parts[3]} {parts[4]} {parts[5]} {parts[6]}")

    # Write final floorplan.txt
    with open(final_txt_path, 'w') as f:
        f.write('\n'.join(txt_content) + '\n')

    print(f"Final floorplan.txt saved to: {final_txt_path}")

    # Prepare TypeScript content
    ts_content = []
    ts_content.append("// Model data imported from floorplan.txt")
    ts_content.append("export const floorplanData: Array<[number] | [number, number] | [number, number, number, number, number, number] | [number, number, number, number, string, number, number]> = [")

    # Add dimensions
    ts_content.append(f"  [{dimensions[0]}, {dimensions[1]}], // Width, Height")

    # Add count
    ts_content.append(f"  [{count_line}], // Number of elements")

    # Add structural elements
    for element in structural_elements:
        if len(element) == 6:
            ts_content.append(f"  [{int(element[0])}, {int(element[1])}, {int(element[2])}, {int(element[3])}, {int(element[4])}, {int(element[5])}],")

    # Add matched openings
    for opening in matched_openings:
        ts_content.append(f"  [{int(opening[0])}, {int(opening[1])}, {int(opening[2])}, {int(opening[3])}, '{opening[4]}', {opening[5]}, {opening[6]}],")

    # Add any remaining non-opening elements from original file (like furniture)
    for i in range(2, len(lines)):
        line = lines[i].strip()
        if not line:
            continue

        parts = line.split()
        if len(parts) >= 7 and parts[4] != 'empty':
            # This is a non-empty labeled element (like cooking_counter, entrance)
            ts_content.append(f"  [{parts[0]}, {parts[1]}, {parts[2]}, {parts[3]}, '{parts[4]}', {parts[5]}, {parts[6]}],")

    # Close the array
    ts_content.append("];")

    # Write to floorplan.ts
    with open(ts_path, 'w') as f:
        f.write('\n'.join(ts_content))

    print(f"Final floorplan.ts saved to: {ts_path}")
