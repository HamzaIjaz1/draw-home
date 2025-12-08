from pulp import *
import numpy as np
import copy
import os
import cv2
from skimage import measure
from .utils import *
from .constants import *

## Extract corners from corner heatmap predictions
def extractCorners(heatmaps, threshold, gap, cornerType = 'wall', augment=False, gt=False):
  if gt:
    orientationPoints = heatmaps
  else:
    orientationPoints = extractCornersFromHeatmaps(heatmaps, threshold)
    pass

  if cornerType == 'wall':
    cornerOrientations = []
    for orientations in POINT_ORIENTATIONS:
      cornerOrientations += orientations
      continue
  elif cornerType == 'door':
    cornerOrientations = POINT_ORIENTATIONS[0]
  else:
    cornerOrientations = POINT_ORIENTATIONS[1]
    pass

  if augment:
    orientationMap = {}
    for pointType, orientationOrientations in enumerate(POINT_ORIENTATIONS):
      for orientation, orientations in enumerate(orientationOrientations):
        orientationMap[orientations] = orientation
        continue
      continue

    for orientationIndex, corners in enumerate(orientationPoints):
      if len(corners) > 3:
        continue #skip aug
      pointType = orientationIndex // 4
      if pointType in [2]:
        orientation = orientationIndex % 4
        orientations = POINT_ORIENTATIONS[pointType][orientation]
        for i in range(len(orientations)):
          newOrientations = list(orientations)
          newOrientations.remove(orientations[i])
          newOrientations = tuple(newOrientations)
          if not newOrientations in orientationMap:
            continue
          newOrientation = orientationMap[newOrientations]
          for corner in corners:
            continue
          continue
      elif pointType in [1]:
        orientation = orientationIndex % 4
        orientations = POINT_ORIENTATIONS[pointType][orientation]
        for orientation in range(4):
          if orientation in orientations:
            continue
          newOrientations = list(orientations)
          newOrientations.append(orientation)
          newOrientations = tuple(newOrientations)
          if not newOrientations in orientationMap:
            continue
          newOrientation = orientationMap[newOrientations]
          for corner in corners:
            continue
          continue
        pass
      continue
    pass

  pointOffset = 0
  pointOffsets = []
  points = []
  pointOrientationLinesMap = []
  for orientationIndex, corners in enumerate(orientationPoints):
    pointOffsets.append(pointOffset)
    orientations = cornerOrientations[orientationIndex]
    for point in corners:
      orientationLines = {}
      for orientation in orientations:
        orientationLines[orientation] = []
        continue
      pointOrientationLinesMap.append(orientationLines)
      continue

    pointOffset += len(corners)

    if cornerType == 'wall':
      points += [[corner[0][0], corner[0][1], orientationIndex // 4, orientationIndex % 4] for corner in corners]
    elif cornerType == 'door':
      points += [[corner[0][0], corner[0][1], 0, orientationIndex] for corner in corners]
    else:
      points += [[corner[0][0], corner[0][1], 1, orientationIndex] for corner in corners]
      pass
    continue

  augmentedPointMask = {}


  lines = []
  pointNeighbors = [[] for point in points]

  for orientationIndex, corners in enumerate(orientationPoints):
    orientations = cornerOrientations[orientationIndex]
    for orientation in orientations:
      if orientation not in [1, 2]:
        continue
      oppositeOrientation = (orientation + 2) % 4
      lineDim = -1
      if orientation == 0 or orientation == 2:
        lineDim = 1
      else:
        lineDim = 0
        pass

      for cornerIndex, corner in enumerate(corners):
        pointIndex = pointOffsets[orientationIndex] + cornerIndex

        if len(corner) > 3:
          augmentedPointMask[pointIndex] = True
          pass

        ranges = copy.deepcopy(ORIENTATION_RANGES[orientation])

        ranges[lineDim] = min(ranges[lineDim], corner[0][lineDim])
        ranges[lineDim + 2] = max(ranges[lineDim + 2], corner[0][lineDim])
        ranges[1 - lineDim] = min(ranges[1 - lineDim], corner[1][1 - lineDim] - gap)
        ranges[1 - lineDim + 2] = max(ranges[1 - lineDim + 2], corner[2][1 - lineDim] + gap)

        for oppositeOrientationIndex, oppositeCorners in enumerate(orientationPoints):
          if oppositeOrientation not in cornerOrientations[oppositeOrientationIndex]:
            continue
          for oppositeCornerIndex, oppositeCorner in enumerate(oppositeCorners):
            if orientationIndex == oppositeOrientationIndex and oppositeCornerIndex == cornerIndex:
              continue

            oppositePointIndex = pointOffsets[oppositeOrientationIndex] + oppositeCornerIndex

            if oppositeCorner[0][lineDim] < ranges[lineDim] or oppositeCorner[0][lineDim] > ranges[lineDim + 2] or ranges[1 - lineDim] > oppositeCorner[2][1 - lineDim] or ranges[1 - lineDim + 2] < oppositeCorner[1][1 - lineDim]:
              continue

            if abs(oppositeCorner[0][lineDim] - corner[0][lineDim]) < LENGTH_THRESHOLDS[cornerType]:
              continue

            lineIndex = len(lines)
            pointOrientationLinesMap[pointIndex][orientation].append(lineIndex)
            pointOrientationLinesMap[oppositePointIndex][oppositeOrientation].append(lineIndex)
            pointNeighbors[pointIndex].append(oppositePointIndex)
            pointNeighbors[oppositePointIndex].append(pointIndex)

            lines.append((pointIndex, oppositePointIndex))
            continue
          continue
        continue
      continue
    continue
  return points, lines, pointOrientationLinesMap, pointNeighbors, augmentedPointMask


## Corner type augmentation to enrich the candidate set (e.g., a T-shape corner can be treated as a L-shape corner)
def augmentPoints(points, decreasingTypes = [2], increasingTypes = [1]):
  orientationMap = {}
  for pointType, orientationOrientations in enumerate(POINT_ORIENTATIONS):
    for orientation, orientations in enumerate(orientationOrientations):
      orientationMap[orientations] = orientation
      continue
    continue

  newPoints = []
  for pointIndex, point in enumerate(points):
    if point[2] not in decreasingTypes:
      continue
    orientations = POINT_ORIENTATIONS[point[2]][point[3]]
    for i in range(len(orientations)):
      newOrientations = list(orientations)
      newOrientations.remove(orientations[i])
      newOrientations = tuple(newOrientations)
      if not newOrientations in orientationMap:
        continue
      newOrientation = orientationMap[newOrientations]
      newPoints.append([point[0], point[1], point[2] - 1, newOrientation])
      continue
    continue

  for pointIndex, point in enumerate(points):
    if point[2] not in increasingTypes:
      continue
    orientations = POINT_ORIENTATIONS[point[2]][point[3]]
    for orientation in range(4):
      if orientation in orientations:
        continue

      oppositeOrientation = (orientation + 2) % 4
      ranges = copy.deepcopy(ORIENTATION_RANGES[orientation])
      lineDim = -1
      if orientation == 0 or orientation == 2:
        lineDim = 1
      else:
        lineDim = 0
        pass
      deltas = [0, 0]

      if lineDim == 1:
        deltas[0] = gap # type: ignore
      else:
        deltas[1] = gap # type: ignore
        pass

      for c in range(2):
        ranges[c] = min(ranges[c], point[c] - deltas[c])
        ranges[c + 2] = max(ranges[c + 2], point[c] + deltas[c])
        continue

      hasNeighbor = False
      for neighborPointIndex, neighborPoint in enumerate(points):
        if neighborPointIndex == pointIndex:
          continue

        neighborOrientations = POINT_ORIENTATIONS[neighborPoint[2]][neighborPoint[3]]
        if oppositeOrientation not in neighborOrientations:
          continue

        inRange = True
        for c in range(2):
          if neighborPoint[c] < ranges[c] or neighborPoint[c] > ranges[c + 2]:
            inRange = False
            break
          continue

        if not inRange or abs(neighborPoint[lineDim] - point[lineDim]) < max(abs(neighborPoint[1 - lineDim] - point[1 - lineDim]), 1):
          continue

        hasNeighbor = True
        break

      if not hasNeighbor:
        continue

      newOrientations = list(orientations)
      newOrientations.append(orientation)
      newOrientations = tuple(newOrientations)
      if not newOrientations in orientationMap:
        continue
      newOrientation = orientationMap[newOrientations]
      newPoints.append([point[0], point[1], point[2] + 1, newOrientation])
      continue
    continue
  return points + newPoints


## Remove invalid walls as preprocessing
def filterWalls(wallPoints, wallLines):
  orientationMap = {}
  for pointType, orientationOrientations in enumerate(POINT_ORIENTATIONS):
    for orientation, orientations in enumerate(orientationOrientations):
      orientationMap[orientations] = orientation
      continue
    continue

  while True:
    pointOrientationNeighborsMap = {}
    for line in wallLines:
      lineDim = calcLineDim(wallPoints, line)
      for c, pointIndex in enumerate(line):
        if lineDim == 0:
          if c == 0:
            orientation = 1
          else:
            orientation = 3
        else:
          if c == 0:
            orientation = 2
          else:
            orientation = 0
            pass
          pass

        if pointIndex not in pointOrientationNeighborsMap:
          pointOrientationNeighborsMap[pointIndex] = {}
          pass
        if orientation not in pointOrientationNeighborsMap[pointIndex]:
          pointOrientationNeighborsMap[pointIndex][orientation] = []
          pass
        pointOrientationNeighborsMap[pointIndex][orientation].append(line[1 - c])
        continue
      continue


    invalidPointMask = {}
    for pointIndex, point in enumerate(wallPoints):
      if pointIndex not in pointOrientationNeighborsMap:
        invalidPointMask[pointIndex] = True
        continue
      orientationNeighborMap = pointOrientationNeighborsMap[pointIndex]
      orientations = POINT_ORIENTATIONS[point[2]][point[3]]
      if len(orientationNeighborMap) < len(orientations):
        if len(orientationNeighborMap) >= 2 and tuple(orientationNeighborMap.keys()) in orientationMap:
          newOrientation = orientationMap[tuple(orientationNeighborMap.keys())]
          wallPoints[pointIndex][2] = len(orientationNeighborMap) - 1
          wallPoints[pointIndex][3] = newOrientation
          continue
        invalidPointMask[pointIndex] = True
        pass
      continue

    if len(invalidPointMask) == 0:
      break

    newWallPoints = []
    pointIndexMap = {}
    for pointIndex, point in enumerate(wallPoints):
      if pointIndex not in invalidPointMask:
        pointIndexMap[pointIndex] = len(newWallPoints)
        newWallPoints.append(point)
        pass
      continue

    wallPoints = newWallPoints

    newWallLines = []
    for lineIndex, line in enumerate(wallLines):
      if line[0] in pointIndexMap and line[1] in pointIndexMap:
        newLine = (pointIndexMap[line[0]], pointIndexMap[line[1]])
        newWallLines.append(newLine)
        pass
      continue
    wallLines = newWallLines
    continue

  pointOrientationLinesMap = [{} for _ in range(len(wallPoints))]
  pointNeighbors = [[] for _ in range(len(wallPoints))]

  for lineIndex, line in enumerate(wallLines):
    lineDim = calcLineDim(wallPoints, line)
    for c, pointIndex in enumerate(line):
      if lineDim == 0:
        if wallPoints[pointIndex][lineDim] < wallPoints[line[1 - c]][lineDim]:
          orientation = 1
        else:
          orientation = 3
          pass
      else:
        if wallPoints[pointIndex][lineDim] < wallPoints[line[1 - c]][lineDim]:
          orientation = 2
        else:
          orientation = 0
          pass
        pass

      if orientation not in pointOrientationLinesMap[pointIndex]:
        pointOrientationLinesMap[pointIndex][orientation] = []
        pass
      pointOrientationLinesMap[pointIndex][orientation].append(lineIndex)
      pointNeighbors[pointIndex].append(line[1 - c])
      continue
    continue

  return wallPoints, wallLines, pointOrientationLinesMap, pointNeighbors

## Write wall points to result file
def writePoints(points, pointLabels, output_prefix='test/'):
  with open(output_prefix + 'points_out.txt', 'w') as points_file:
    for point in points:
      points_file.write(str(point[0] + 1) + '\t' + str(point[1] + 1) + '\t')
      points_file.write(str(point[0] + 1) + '\t' + str(point[1] + 1) + '\t')
      points_file.write('point\t')
      points_file.write(str(point[2] + 1) + '\t' + str(point[3] + 1) + '\n')
  points_file.close()

  with open(output_prefix + 'point_labels.txt', 'w') as point_label_file:
    for point in pointLabels:
      point_label_file.write(str(point[0]) + '\t' + str(point[1]) + '\t' + str(point[2]) + '\t' + str(point[3]) + '\n')
  point_label_file.close()

## Write doors to result file
def writeDoors(points, lines, doorTypes, output_prefix='test/'):
  with open(output_prefix + 'doors_out.txt', 'w') as doors_file:
    for lineIndex, line in enumerate(lines):
      point_1 = points[line[0]]
      point_2 = points[line[1]]

      doors_file.write(str(point_1[0] + 1) + '\t' + str(point_1[1] + 1) + '\t')
      doors_file.write(str(point_2[0] + 1) + '\t' + str(point_2[1] + 1) + '\t')
      doors_file.write('door\t')
      doors_file.write(str(doorTypes[lineIndex] + 1) + '\t1\n')
    doors_file.close()

## Write icons to result file
def writeIcons(points, icons, iconTypes, output_prefix='test/'):
  with open(output_prefix + 'icons_out.txt', 'w') as icons_file:
    for iconIndex, icon in enumerate(icons):
      point_1 = points[icon[0]]
      point_2 = points[icon[1]]
      point_3 = points[icon[2]]
      point_4 = points[icon[3]]

      x_1 = int(round((point_1[0] + point_3[0]) // 2)) + 1
      x_2 = int(round((point_2[0] + point_4[0]) // 2)) + 1
      y_1 = int(round((point_1[1] + point_2[1]) // 2)) + 1
      y_2 = int(round((point_3[1] + point_4[1]) // 2)) + 1

      icons_file.write(str(x_1) + '\t' + str(y_1) + '\t')
      icons_file.write(str(x_2) + '\t' + str(y_2) + '\t')
      icons_file.write(iconNumberNameMap[iconTypes[iconIndex]] + '\t')
      icons_file.write('1\t')
      icons_file.write('1\n')
    icons_file.close()


## Adjust wall corner locations to align with each other after optimization
def adjustPoints(points, lines):
  lineNeighbors = []
  for lineIndex, line in enumerate(lines):
    lineDim = calcLineDim(points, line)
    neighbors = []
    for neighborLineIndex, neighborLine in enumerate(lines):
      if neighborLineIndex <= lineIndex:
        continue
      neighborLineDim = calcLineDim(points, neighborLine)
      point_1 = points[neighborLine[0]]
      point_2 = points[neighborLine[1]]
      lineDimNeighbor = calcLineDim(points, neighborLine)

      if lineDimNeighbor != lineDim:
        continue
      if neighborLine[0] != line[0] and neighborLine[0] != line[1] and neighborLine[1] != line[0] and neighborLine[1] != line[1]:
        continue
      neighbors.append(neighborLineIndex)
      continue
    lineNeighbors.append(neighbors)
    continue

  visitedLines = {}
  for lineIndex in range(len(lines)):
    if lineIndex in visitedLines:
      continue
    lineGroup = [lineIndex]
    while True:
      newLineGroup = lineGroup
      hasChange = False
      for line in lineGroup:
        neighbors = lineNeighbors[line]
        for neighbor in neighbors:
          if neighbor not in newLineGroup:
            newLineGroup.append(neighbor)
            hasChange = True
            pass
          continue
        continue
      if not hasChange:
        break
      lineGroup = newLineGroup
      continue

    for line in lineGroup:
      visitedLines[line] = True
      continue

    pointGroup = []
    for line in lineGroup:
      for index in range(2):
        pointIndex = lines[line][index]
        if pointIndex not in pointGroup:
          pointGroup.append(pointIndex)
          pass
        continue
      continue

    xy = np.concatenate([np.array([points[pointIndex][:2] for pointIndex in lines[lineIndex]]) for lineIndex in lineGroup], axis=0)
    mins = xy.min(0)
    maxs = xy.max(0)
    if maxs[0] - mins[0] > maxs[1] - mins[1]:
      lineDim = 0
    else:
      lineDim = 1
      pass

    fixedValue = 0
    for point in pointGroup:
      fixedValue += points[point][1 - lineDim]
      continue
    fixedValue /= len(pointGroup)

    for point in pointGroup:
      points[point][1 - lineDim] = fixedValue
      continue
    continue
  return

## Merge two close points after optimization
def mergePoints(points, lines):
  validPointMask = {}
  for line in lines:
    validPointMask[line[0]] = True
    validPointMask[line[1]] = True
    continue

  orientationMap = {}
  for pointType, orientationOrientations in enumerate(POINT_ORIENTATIONS):
    for orientation, orientations in enumerate(orientationOrientations):
      orientationMap[orientations] = (pointType, orientation)
      continue
    continue

  for pointIndex_1, point_1 in enumerate(points):
    if pointIndex_1 not in validPointMask:
      continue
    for pointIndex_2, point_2 in enumerate(points):
      if pointIndex_2 <= pointIndex_1:
        continue
      if pointIndex_2 not in validPointMask:
        continue
      if pointDistance(point_1[:2], point_2[:2]) <= DISTANCES['point']:
        orientations = list(POINT_ORIENTATIONS[point_1[2]][point_1[3]] + POINT_ORIENTATIONS[point_2[2]][point_2[3]])
        if len([line for line in lines if pointIndex_1 in line and pointIndex_2 in line]) > 0:
          if abs(point_1[0] - point_2[0]) > abs(point_1[1] - point_2[1]):
            orientations.remove(1)
            orientations.remove(3)
          else:
            orientations.remove(0)
            orientations.remove(2)
            pass
          pass
        orientations = tuple(set(orientations))
        if orientations not in orientationMap:
          for lineIndex, line in enumerate(lines):
            if pointIndex_1 in line and pointIndex_2 in line:
              lines[lineIndex] = (-1, -1)
              pass
            continue

          lineIndices_1 = [(lineIndex, tuple(set(line) - set((pointIndex_1, )))[0]) for lineIndex, line in enumerate(lines) if pointIndex_1 in line and pointIndex_2 not in line]
          lineIndices_2 = [(lineIndex, tuple(set(line) - set((pointIndex_2, )))[0]) for lineIndex, line in enumerate(lines) if pointIndex_2 in line and pointIndex_1 not in line]
          if len(lineIndices_1) == 1 and len(lineIndices_2) == 1:
            lineIndex_1, index_1 = lineIndices_1[0]
            lineIndex_2, index_2 = lineIndices_2[0]
            lines[lineIndex_1] = (index_1, index_2)
            lines[lineIndex_2] = (-1, -1)
            pass
          continue

        pointInfo = orientationMap[orientations]
        newPoint = [(point_1[0] + point_2[0]) // 2, (point_1[1] + point_2[1]) // 2, pointInfo[0], pointInfo[1]]
        points[pointIndex_1] = newPoint
        for lineIndex, line in enumerate(lines):
          if pointIndex_2 == line[0]:
            lines[lineIndex] = (pointIndex_1, line[1])
            pass
          if pointIndex_2 == line[1]:
            lines[lineIndex] = (line[0], pointIndex_1)
            pass
          continue
        pass
      continue
    continue
  return

## Adjust door corner locations to align with each other after optimization
def adjustDoorPoints(doorPoints, doorLines, wallPoints, wallLines, doorWallMap):
  for doorLineIndex, doorLine in enumerate(doorLines):
    lineDim = calcLineDim(doorPoints, doorLine)
    wallLine = wallLines[doorWallMap[doorLineIndex]]
    wallPoint_1 = wallPoints[wallLine[0]]
    wallPoint_2 = wallPoints[wallLine[1]]
    fixedValue = (wallPoint_1[1 - lineDim] + wallPoint_2[1 - lineDim]) // 2
    for endPointIndex in range(2):
      doorPoints[doorLine[endPointIndex]][1 - lineDim] = fixedValue
      continue
    continue

## Generate icon candidates
def findIconsFromLines(iconPoints, iconLines):
  icons = []
  pointOrientationNeighborsMap = {}
  for line in iconLines:
    lineDim = calcLineDim(iconPoints, line)
    for c, pointIndex in enumerate(line):
      if lineDim == 0:
        if c == 0:
          orientation = 1
        else:
          orientation = 3
      else:
        if c == 0:
          orientation = 2
        else:
          orientation = 0
          pass
        pass

      if pointIndex not in pointOrientationNeighborsMap:
        pointOrientationNeighborsMap[pointIndex] = {}
        pass
      if orientation not in pointOrientationNeighborsMap[pointIndex]:
        pointOrientationNeighborsMap[pointIndex][orientation] = []
        pass
      pointOrientationNeighborsMap[pointIndex][orientation].append(line[1 - c])
      continue
    continue

  for pointIndex, orientationNeighborMap in pointOrientationNeighborsMap.items():
    if 1 not in orientationNeighborMap or 2 not in orientationNeighborMap:
      continue
    for neighborIndex_1 in orientationNeighborMap[1]:
      if 2 not in pointOrientationNeighborsMap[neighborIndex_1]:
        continue
      lastCornerCandiates = pointOrientationNeighborsMap[neighborIndex_1][2]
      for neighborIndex_2 in orientationNeighborMap[2]:
        if 1 not in pointOrientationNeighborsMap[neighborIndex_2]:
          continue
        for lastCornerIndex in pointOrientationNeighborsMap[neighborIndex_2][1]:
          if lastCornerIndex not in lastCornerCandiates:
            continue

          point_1 = iconPoints[pointIndex]
          point_2 = iconPoints[neighborIndex_1]
          point_3 = iconPoints[neighborIndex_2]
          point_4 = iconPoints[lastCornerIndex]

          x_1 = int((point_1[0] + point_3[0]) // 2)
          x_2 = int((point_2[0] + point_4[0]) // 2)
          y_1 = int((point_1[1] + point_2[1]) // 2)
          y_2 = int((point_3[1] + point_4[1]) // 2)

          if (x_2 - x_1 + 1) * (y_2 - y_1 + 1) <= LENGTH_THRESHOLDS['icon'] * LENGTH_THRESHOLDS['icon']:
            continue

          icons.append((pointIndex, neighborIndex_1, neighborIndex_2, lastCornerIndex))
          continue
        continue
      continue
    continue
  return icons


## Find two wall lines facing each other and accumuate semantic information in between
def findLineNeighbors(points, lines, labelVotesMap, gap):
  lineNeighbors = [[{}, {}] for lineIndex in range(len(lines))]
  for lineIndex, line in enumerate(lines):
    lineDim = calcLineDim(points, line)
    for neighborLineIndex, neighborLine in enumerate(lines):
      if neighborLineIndex <= lineIndex:
        continue
      neighborLineDim = calcLineDim(points, neighborLine)
      if lineDim != neighborLineDim:
        continue

      minValue = max(points[line[0]][lineDim], points[neighborLine[0]][lineDim])
      maxValue = min(points[line[1]][lineDim], points[neighborLine[1]][lineDim])
      if maxValue - minValue < gap:
        continue
      fixedValue_1 = points[line[0]][1 - lineDim]
      fixedValue_2 = points[neighborLine[0]][1 - lineDim]

      minValue = int(minValue)
      maxValue = int(maxValue)
      fixedValue_1 = int(fixedValue_1)
      fixedValue_2 = int(fixedValue_2)

      if abs(fixedValue_2 - fixedValue_1) < gap:
        continue
      if lineDim == 0:
        if fixedValue_1 < fixedValue_2:
          region = ((minValue, fixedValue_1), (maxValue, fixedValue_2))
          lineNeighbors[lineIndex][1][neighborLineIndex] = region
          lineNeighbors[neighborLineIndex][0][lineIndex] = region
        else:
          region = ((minValue, fixedValue_2), (maxValue, fixedValue_1))
          lineNeighbors[lineIndex][0][neighborLineIndex] = region
          lineNeighbors[neighborLineIndex][1][lineIndex] = region
      else:
        if fixedValue_1 < fixedValue_2:
          region = ((fixedValue_1, minValue), (fixedValue_2, maxValue))
          lineNeighbors[lineIndex][0][neighborLineIndex] = region
          lineNeighbors[neighborLineIndex][1][lineIndex] = region
        else:
          region = ((fixedValue_2, minValue), (fixedValue_1, maxValue))
          lineNeighbors[lineIndex][1][neighborLineIndex] = region
          lineNeighbors[neighborLineIndex][0][lineIndex] = region
          pass
        pass
      continue
    continue

  # remove neighbor pairs which are separated by another line
  while True:
    hasChange = False
    for lineIndex, neighbors in enumerate(lineNeighbors):
      lineDim = calcLineDim(points, lines[lineIndex])
      for neighbor_1, region_1 in neighbors[1].items():
        for neighbor_2, _ in neighbors[0].items():
          if neighbor_2 not in lineNeighbors[neighbor_1][0]:
            continue
          region_2 = lineNeighbors[neighbor_1][0][neighbor_2]
          if region_1[0][lineDim] < region_2[0][lineDim] + gap and region_1[1][lineDim] > region_2[1][lineDim] - gap:
            lineNeighbors[neighbor_1][0].pop(neighbor_2)
            lineNeighbors[neighbor_2][1].pop(neighbor_1)
            hasChange = True
            pass
          continue
        continue
      continue
    if not hasChange:
      break


  for lineIndex, directionNeighbors in enumerate(lineNeighbors):
    for direction, neighbors in enumerate(directionNeighbors):
      for neighbor, region in neighbors.items():
        labelVotes = labelVotesMap[:, region[1][1], region[1][0]] + labelVotesMap[:, region[0][1], region[0][0]] - labelVotesMap[:, region[0][1], region[1][0]] - labelVotesMap[:, region[1][1], region[0][0]]
        neighbors[neighbor] = labelVotes
        continue
      continue
    continue
  return lineNeighbors


## Find neighboring wall line/icon pairs
def findRectangleLineNeighbors(rectanglePoints, rectangles, linePoints, lines, lineNeighbors, gap, distanceThreshold):
  rectangleLineNeighbors = [{} for rectangleIndex in range(len(rectangles))]
  minDistanceLineNeighbors = {}
  for rectangleIndex, rectangle in enumerate(rectangles):
    for lineIndex, line in enumerate(lines):
      lineDim = calcLineDim(linePoints, line)

      minValue = max(rectanglePoints[rectangle[0]][lineDim], rectanglePoints[rectangle[2 - lineDim]][lineDim], linePoints[line[0]][lineDim])
      maxValue = min(rectanglePoints[rectangle[1 + lineDim]][lineDim], rectanglePoints[rectangle[3]][lineDim], linePoints[line[1]][lineDim])

      if maxValue - minValue < gap:
        continue

      rectangleFixedValue_1 = (rectanglePoints[rectangle[0]][1 - lineDim] + rectanglePoints[rectangle[1 + lineDim]][1 - lineDim]) // 2
      rectangleFixedValue_2 = (rectanglePoints[rectangle[2 - lineDim]][1 - lineDim] + rectanglePoints[rectangle[3]][1 - lineDim]) // 2
      lineFixedValue = (linePoints[line[0]][1 - lineDim] + linePoints[line[1]][1 - lineDim]) // 2

      if lineFixedValue < rectangleFixedValue_2 - gap and lineFixedValue > rectangleFixedValue_1 + gap:
        continue

      if lineFixedValue <= rectangleFixedValue_1 + gap:
        index = lineDim * 2 + 0
        distance = rectangleFixedValue_1 - lineFixedValue
        if index not in minDistanceLineNeighbors or distance < minDistanceLineNeighbors[index][1]:
          minDistanceLineNeighbors[index] = (lineIndex, distance, 1 - lineDim)
      else:
        index = lineDim * 2 + 1
        distance = lineFixedValue - rectangleFixedValue_2
        if index not in minDistanceLineNeighbors or distance < minDistanceLineNeighbors[index][1]:
          minDistanceLineNeighbors[index] = (lineIndex, distance, lineDim)

      if lineFixedValue < rectangleFixedValue_1 - distanceThreshold or lineFixedValue > rectangleFixedValue_2 + distanceThreshold:
        continue

      if lineFixedValue <= rectangleFixedValue_1 + gap:
        if lineDim == 0:
          rectangleLineNeighbors[rectangleIndex][lineIndex] = 1
        else:
          rectangleLineNeighbors[rectangleIndex][lineIndex] = 0
          pass
        pass
      else:
        if lineDim == 0:
          rectangleLineNeighbors[rectangleIndex][lineIndex] = 0
        else:
          rectangleLineNeighbors[rectangleIndex][lineIndex] = 1
          pass
        pass

      continue
    if len(rectangleLineNeighbors[rectangleIndex]) == 0 or True:
      for index, lineNeighbor in minDistanceLineNeighbors.items():
        rectangleLineNeighbors[rectangleIndex][lineNeighbor[0]] = lineNeighbor[2]
        continue
      pass
    continue

  return rectangleLineNeighbors

## Find the door line to wall line map
def findLineMap(points, lines, points_2, lines_2, gap):
  lineMap = [{} for lineIndex in range(len(lines))]
  for lineIndex, line in enumerate(lines):
    lineDim = calcLineDim(points, line)
    for neighborLineIndex, neighborLine in enumerate(lines_2):
      neighborLineDim = calcLineDim(points_2, neighborLine)
      if lineDim != neighborLineDim:
        continue

      minValue = max(points[line[0]][lineDim], points_2[neighborLine[0]][lineDim])
      maxValue = min(points[line[1]][lineDim], points_2[neighborLine[1]][lineDim])
      if maxValue - minValue < gap:
        continue
      fixedValue_1 = (points[line[0]][1 - lineDim] + points[line[1]][1 - lineDim]) // 2
      fixedValue_2 = (points_2[neighborLine[0]][1 - lineDim] + points_2[neighborLine[1]][1 - lineDim]) // 2

      if abs(fixedValue_2 - fixedValue_1) > gap:
        continue

      lineMinValue = points[line[0]][lineDim]
      lineMaxValue = points[line[1]][lineDim]
      ratio = float(maxValue - minValue + 1) / (lineMaxValue - lineMinValue + 1)

      lineMap[lineIndex][neighborLineIndex] = ratio
      continue
    continue

  return lineMap


## Find the one-to-one door line to wall line map after optimization
def findLineMapSingle(points, lines, points_2, lines_2, gap):
  lineMap = []
  for lineIndex, line in enumerate(lines):
    lineDim = calcLineDim(points, line)
    minDistance = max(width, height)
    minDistanceLineIndex = -1
    for neighborLineIndex, neighborLine in enumerate(lines_2):
      neighborLineDim = calcLineDim(points_2, neighborLine)
      if lineDim != neighborLineDim:
        continue

      minValue = max(points[line[0]][lineDim], points_2[neighborLine[0]][lineDim])
      maxValue = min(points[line[1]][lineDim], points_2[neighborLine[1]][lineDim])
      if maxValue - minValue < gap:
        continue
      fixedValue_1 = (points[line[0]][1 - lineDim] + points[line[1]][1 - lineDim]) // 2
      fixedValue_2 = (points_2[neighborLine[0]][1 - lineDim] + points_2[neighborLine[1]][1 - lineDim]) // 2

      distance = abs(fixedValue_2 - fixedValue_1)
      if distance < minDistance:
        minDistance = distance
        minDistanceLineIndex = neighborLineIndex
        pass
      continue

    lineMap.append(minDistanceLineIndex)
    continue

  return lineMap


## Find conflicting line pairs
def findConflictLinePairs(points, lines, gap, distanceThreshold, considerEndPoints=False):
  conflictLinePairs = []
  for lineIndex_1, line_1 in enumerate(lines):
    lineDim_1 = calcLineDim(points, line_1)
    point_1 = points[line_1[0]]
    point_2 = points[line_1[1]]
    fixedValue_1 = int(round((point_1[1 - lineDim_1] + point_2[1 - lineDim_1]) // 2))
    minValue_1 = int(min(point_1[lineDim_1], point_2[lineDim_1]))
    maxValue_1 = int(max(point_1[lineDim_1], point_2[lineDim_1]))

    for lineIndex_2, line_2 in enumerate(lines):
      if lineIndex_2 <= lineIndex_1:
        continue

      lineDim_2 = calcLineDim(points, line_2)
      point_1 = points[line_2[0]]
      point_2 = points[line_2[1]]

      if lineDim_2 == lineDim_1:
        if line_1[0] == line_2[0] or line_1[1] == line_2[1]:
          conflictLinePairs.append((lineIndex_1, lineIndex_2))
          continue
        elif line_1[0] == line_2[1] or line_1[1] == line_2[0]:
          continue
        pass
      else:
        if (line_1[0] in line_2 or line_1[1] in line_2):
          continue
        pass

      if considerEndPoints:
        if min([pointDistance(points[line_1[0]], points[line_2[0]]), pointDistance(points[line_1[0]], points[line_2[1]]), pointDistance(points[line_1[1]], points[line_2[0]]), pointDistance(points[line_1[1]], points[line_2[1]])]) <= gap:
          conflictLinePairs.append((lineIndex_1, lineIndex_2))
          continue
        pass

      fixedValue_2 = int(round((point_1[1 - lineDim_2] + point_2[1 - lineDim_2]) // 2))
      minValue_2 = int(min(point_1[lineDim_2], point_2[lineDim_2]))
      maxValue_2 = int(max(point_1[lineDim_2], point_2[lineDim_2]))

      if lineDim_1 == lineDim_2:
        if abs(fixedValue_2 - fixedValue_1) >= distanceThreshold or minValue_1 > maxValue_2 - gap or minValue_2 > maxValue_1 - gap:
          continue

        conflictLinePairs.append((lineIndex_1, lineIndex_2))
      else:
        if minValue_1 > fixedValue_2 - gap or maxValue_1 < fixedValue_2 + gap or minValue_2 > fixedValue_1 - gap or maxValue_2 < fixedValue_1 + gap:
          continue

        conflictLinePairs.append((lineIndex_1, lineIndex_2))
        pass
      continue
    continue

  return conflictLinePairs


## Find conflicting line/icon pairs
def findConflictRectanglePairs(points, rectangles, gap):
  conflictRectanglePairs = []
  for rectangleIndex_1, rectangle_1 in enumerate(rectangles):
    for rectangleIndex_2, rectangle_2 in enumerate(rectangles):
      if rectangleIndex_2 <= rectangleIndex_1:
        continue

      conflict = False
      for cornerIndex in range(4):
        if rectangle_1[cornerIndex] == rectangle_2[cornerIndex]:
          conflictRectanglePairs.append((rectangleIndex_1, rectangleIndex_2))
          conflict = True
          break
        continue

      if conflict:
        continue

      minX = max((points[rectangle_1[0]][0] + points[rectangle_1[2]][0]) // 2, (points[rectangle_2[0]][0] + points[rectangle_2[2]][0]) // 2)
      maxX = min((points[rectangle_1[1]][0] + points[rectangle_1[3]][0]) // 2, (points[rectangle_2[1]][0] + points[rectangle_2[3]][0]) // 2)
      if minX > maxX - gap:
        continue
      minY = max((points[rectangle_1[0]][1] + points[rectangle_1[1]][1]) // 2, (points[rectangle_2[0]][1] + points[rectangle_2[1]][1]) // 2)
      maxY = min((points[rectangle_1[2]][1] + points[rectangle_1[3]][1]) // 2, (points[rectangle_2[2]][1] + points[rectangle_2[3]][1]) // 2)
      if minY > maxY - gap:
        continue
      conflictRectanglePairs.append((rectangleIndex_1, rectangleIndex_2))
      continue
    continue

  return conflictRectanglePairs


## Find conflicting icon pairs
def findConflictRectangleLinePairs(rectanglePoints, rectangles, linePoints, lines, gap):
  conflictRectangleLinePairs = []
  for rectangleIndex, rectangle in enumerate(rectangles):
    for lineIndex, line in enumerate(lines):
      lineDim = calcLineDim(linePoints, line)
      if lineDim == 0:
        minX = max(rectanglePoints[rectangle[0]][0], rectanglePoints[rectangle[2]][0], linePoints[line[0]][0])
        maxX = min(rectanglePoints[rectangle[1]][0], rectanglePoints[rectangle[3]][0], linePoints[line[1]][0])
        if minX > maxX - gap:
          continue
        if max(rectanglePoints[rectangle[0]][1], rectanglePoints[rectangle[1]][1]) + gap > min(linePoints[line[0]][1], linePoints[line[1]][1]):
          continue
        if min(rectanglePoints[rectangle[2]][1], rectanglePoints[rectangle[3]][1]) - gap < max(linePoints[line[0]][1], linePoints[line[1]][1]):
          continue

      elif lineDim == 1:
        minY = max(rectanglePoints[rectangle[0]][1], rectanglePoints[rectangle[1]][1], linePoints[line[0]][1])
        maxY = min(rectanglePoints[rectangle[2]][1], rectanglePoints[rectangle[3]][1], linePoints[line[1]][1])
        if minY > maxY - gap:
          continue
        if max(rectanglePoints[rectangle[0]][0], rectanglePoints[rectangle[2]][0]) + gap > min(linePoints[line[0]][0], linePoints[line[1]][0]):
          continue
        if min(rectanglePoints[rectangle[1]][0], rectanglePoints[rectangle[3]][0]) - gap < max(linePoints[line[0]][0], linePoints[line[1]][0]):
          continue

      conflictRectangleLinePairs.append((rectangleIndex, lineIndex))
      continue
    continue

  return conflictRectangleLinePairs

## Find point to line map
def findLinePointMap(points, lines, points_2, gap):
  lineMap = [[] for lineIndex in range(len(lines))]
  for lineIndex, line in enumerate(lines):
    lineDim = calcLineDim(points, line)
    fixedValue = (points[line[0]][1 - lineDim] + points[line[1]][1 - lineDim]) // 2
    for neighborPointIndex, neighborPoint in enumerate(points_2):
      if neighborPoint[lineDim] < points[line[0]][lineDim] + gap or neighborPoint[lineDim] > points[line[1]][lineDim] - gap:
        continue

      if abs((neighborPoint[1 - lineDim] + neighborPoint[1 - lineDim]) // 2 - fixedValue) > gap:
        continue

      lineMap[lineIndex].append(neighborPointIndex)
      continue
    continue
  return lineMap

## Generate primitive candidates from heatmaps
def findCandidatesFromHeatmaps(iconHeatmaps, iconPointOffset, doorPointOffset):
  newIcons = []
  newIconPoints = []
  newDoorLines = []
  newDoorPoints = []
  for iconIndex in range(1, NUM_ICONS + 2):
    heatmap = iconHeatmaps[:, :, iconIndex] > 0.5
    kernel = np.ones((3, 3), dtype=np.uint8)
    heatmap = cv2.dilate(cv2.erode(heatmap.astype(np.uint8), kernel), kernel)
    regions = measure.label(heatmap, background=0)
    for regionIndex in range(regions.min() + 1, regions.max() + 1):
      regionMask = regions == regionIndex
      ys, xs = regionMask.nonzero()
      minX, maxX = xs.min(), xs.max()
      minY, maxY = ys.min(), ys.max()
      if iconIndex <= NUM_ICONS:
        if maxX - minX < GAPS['icon_extraction'] or maxY - minY < GAPS['icon_extraction']:
          continue
        mask = regionMask[minY:maxY + 1, minX:maxX + 1]
        sizeX, sizeY = maxX - minX + 1, maxY - minY + 1
        sumX = mask.sum(0)

        for x in range(sizeX):
          if sumX[x] * 2 >= sizeY:
            break
          minX += 1
          continue

        for x in range(sizeX - 1, -1, -1):
          if sumX[x] * 2 >= sizeY:
            break
          maxX -= 1
          continue


        sumY = mask.sum(1)
        for y in range(sizeY):
          if sumY[y] * 2 >= sizeX:
            break
          minY += 1
          continue

        for y in range(sizeY - 1, -1, -1):
          if sumY[y] * 2 >= sizeX:
            break
          maxY -= 1
          continue
        if (maxY - minY + 1) * (maxX - minX + 1) <= LENGTH_THRESHOLDS['icon'] * LENGTH_THRESHOLDS['icon'] * 2:
          continue
        newIconPoints += [[minX, minY, 1, 2], [maxX, minY, 1, 3], [minX, maxY, 1, 1], [maxX, maxY, 1, 0]]
        newIcons.append((iconPointOffset, iconPointOffset + 1, iconPointOffset + 2, iconPointOffset + 3))
        iconPointOffset += 4
      else:
        sizeX, sizeY = maxX - minX + 1, maxY - minY + 1
        if sizeX >= LENGTH_THRESHOLDS['door'] and sizeY * 2 <= sizeX:
          newDoorPoints += [[minX, (minY + maxY) // 2, 0, 1], [maxX, (minY + maxY) // 2, 0, 3]]
          newDoorLines.append((doorPointOffset, doorPointOffset + 1))
          doorPointOffset += 2
        elif sizeY >= LENGTH_THRESHOLDS['door'] and sizeX * 2 <= sizeY:
          newDoorPoints += [[(minX + maxX) // 2, minY, 0, 2], [(minX + maxX) // 2, maxY, 0, 0]]
          newDoorLines.append((doorPointOffset, doorPointOffset + 1))
          doorPointOffset += 2
        elif sizeX >= LENGTH_THRESHOLDS['door'] and sizeY >= LENGTH_THRESHOLDS['door']:
          mask = regionMask[minY:maxY + 1, minX:maxX + 1]
          sumX = mask.sum(0)
          minOffset, maxOffset = 0, 0
          for x in range(sizeX):
            if sumX[x] * 2 >= sizeY:
              break
            minOffset += 1
            continue

          for x in range(sizeX - 1, -1, -1):
            if sumX[x] * 2 >= sizeY:
              break
            maxOffset += 1
            continue

          if (sizeX - minOffset - maxOffset) * 2 <= sizeY and sizeX - minOffset - maxOffset > 0:
            newDoorPoints += [[(minX + minOffset + maxX - maxOffset) // 2, minY, 0, 2], [(minX + minOffset + maxX - maxOffset) // 2, maxY, 0, 0]]
            newDoorLines.append((doorPointOffset, doorPointOffset + 1))
            doorPointOffset += 2
            pass

          sumY = mask.sum(1)
          minOffset, maxOffset = 0, 0
          for y in range(sizeY):
            if sumY[y] * 2 >= sizeX:
              break
            minOffset += 1
            continue

          for y in range(sizeY - 1, -1, -1):
            if sumY[y] * 2 >= sizeX:
              break
            maxOffset += 1
            continue

          if (sizeY - minOffset - maxOffset) * 2 <= sizeX and sizeY - minOffset - maxOffset > 0:
            newDoorPoints += [[minX, (minY + minOffset + maxY - maxOffset) // 2, 0, 1], [maxX, (minY + minOffset + maxY - maxOffset) // 2, 0, 3]]
            newDoorLines.append((doorPointOffset, doorPointOffset + 1))
            doorPointOffset += 2
            pass
          pass
        pass
      continue
    continue
  return newIcons, newIconPoints, newDoorLines, newDoorPoints

## Sort lines so that the first point always has smaller x or y
def sortLines(points, lines):
  for lineIndex, line in enumerate(lines):
    lineDim = calcLineDim(points, line)
    if points[line[0]][lineDim] > points[line[1]][lineDim]:
      lines[lineIndex] = (line[1], line[0])
      pass
    continue
