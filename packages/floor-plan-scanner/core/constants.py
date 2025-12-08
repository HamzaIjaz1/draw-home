import numpy as np
from .utils import ColorPalette, getOrientationRanges, getIconNames, NUM_ICONS, NUM_ROOMS, POINT_ORIENTATIONS

# Gaps for various operations
GAPS = {
    'wall_extraction': 5,
    'door_extraction': 5,
    'icon_extraction': 5,
    'wall_neighbor': 5,
    'door_neighbor': 5,
    'icon_neighbor': 5,
    'wall_conflict': 5,
    'door_conflict': 5,
    'icon_conflict': 5,
    'wall_icon_neighbor': 5,
    'wall_icon_conflict': 5,
    'wall_door_neighbor': 5,
    'door_point_conflict': 5
}

# Distance thresholds
DISTANCES = {
    'wall_icon': 5,
    'point': 5,
    'wall': 10,
    'door': 5,
    'icon': 5
}

# Length thresholds
LENGTH_THRESHOLDS = {
    'wall': 5,
    'door': 5,
    'icon': 5
}

# Weights for optimization
junctionWeight = 100
augmentedJunctionWeight = 50
labelWeight = 1

wallWeight = 10
doorWeight = 10
iconWeight = 10

iconTypeWeight = 10

wallLineWidth = 3
doorLineWidth = 2

# Type counts
NUM_WALL_TYPES = 1
NUM_DOOR_TYPES = 2
NUM_LABELS = None  # Will be set after NUM_ICONS and NUM_ROOMS are defined

# Label offsets
WALL_LABEL_OFFSET = None
DOOR_LABEL_OFFSET = None
ICON_LABEL_OFFSET = 0
ROOM_LABEL_OFFSET = None

# Display dimensions
width = 256
height = 256
maxDim = max(width, height)
sizes = None  # Will be initialized later

# Orientation ranges for different directions
ORIENTATION_RANGES = None

# Icon names and mappings
iconNames = None
iconNameNumberMap = None
iconNumberNameMap = None

# Initialize after importing from utils
def initialize():
    global NUM_LABELS, WALL_LABEL_OFFSET, DOOR_LABEL_OFFSET, ROOM_LABEL_OFFSET
    global sizes, ORIENTATION_RANGES, iconNames, iconNameNumberMap, iconNumberNameMap

    NUM_LABELS = NUM_ICONS + NUM_ROOMS
    WALL_LABEL_OFFSET = NUM_ROOMS + 1
    DOOR_LABEL_OFFSET = NUM_ICONS + 1
    ROOM_LABEL_OFFSET = NUM_ICONS

    sizes = np.array([width, height])
    ORIENTATION_RANGES = getOrientationRanges(width, height)

    iconNames = getIconNames()
    iconNameNumberMap = dict(zip(iconNames, range(len(iconNames))))
    iconNumberNameMap = dict(zip(range(len(iconNames)), iconNames))

# Initialize values that depend on other modules
initialize()
