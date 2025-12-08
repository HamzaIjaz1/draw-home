# Roof Polygon Test Status

**Last Updated**: 2025-10-15  
**Verification Method**: Visual inspection + automated testing

---

## Summary

| Status | Count | Percentage |
|--------|-------|------------|
| ✅ **Working** | 13 | 54% |
| 🐛 **Skeletonization Bugs** | 4 | 17% |
| 🐛 **Polygonization Bugs** | 4 | 17% |
| ⏭️ **Not Tested** | 3 | 12% |
| **Total** | **24** | **100%** |

**Test Results**: `56 tests passed | 8 skipped`

---

## ✅ Working Polygons (13)

These polygons have been visually inspected and produce correct roof geometry:

1. ✅ **rectangle** - Simple rectangular roof
2. ✅ **t_shape_1** - T-shaped building (basic)
3. ✅ **t_shape_4** - T-shaped building (inverted T)
4. ✅ **l_shape_1** - L-shaped building (variant 1)
5. ✅ **l_shape_2** - L-shaped building (variant 2)
6. ✅ **l_shape_3** - L-shaped building (variant 3)
7. ✅ **u_shape** - U-shaped building
8. ✅ **d_square_1** - Double square (variant 1)
9. ✅ **d_square_2** - Double square (variant 2)
10. ✅ **d_square_3** - Double square (variant 3)
11. ✅ **complex_3** - Complex multi-section building
12. ✅ **simple_1** - Simple irregular polygon
13. ✅ **simple_2** - Simple irregular pentagon
14. ✅ **the_sacred_polygon** - Complex 9-vertex irregular polygon

**Test Coverage**: 56 automated tests (4 stages × 14 polygons)

---

## 🐛 Skeletonization Bugs (4)

These polygons have issues in the skeleton generation stage:

### 1. 🐛 **t_shape_2**
- **Issue**: Incorrect skeleton structure
- **Location**: `skeletonHandling.ts` or underlying `skeletonize()` function
- **Test**: Skipped (`it.skip`)

### 2. 🐛 **t_shape_3**
- **Issue**: Incorrect skeleton structure
- **Location**: `skeletonHandling.ts` or underlying `skeletonize()` function
- **Test**: Skipped (`it.skip`)

### 3. 🐛 **complex_1**
- **Issue**: Incorrect skeleton for complex multi-section building
- **Location**: `skeletonHandling.ts` or underlying `skeletonize()` function
- **Note**: Originally marked as working in `pointsTest.ts`
- **Test**: Skipped (`it.skip`)

### 4. 🐛 **straight_cross**
- **Issue**: Incorrect skeleton structure for cross-shaped building
- **Location**: `skeletonHandling.ts` or underlying `skeletonize()` function
- **Note**: Originally marked as working in `pointsTest.ts`
- **Test**: Skipped (`it.skip`)

---

## 🐛 Polygonization Bugs (4)

These polygons have issues in the face generation stage:

### 1. 🐛 **complex_2**
- **Issue**: Both skeletonization AND polygonization problems
- **Location**: `skeletonHandling.ts` and `faceGeneration.ts`
- **Test**: Skipped (`it.skip`)

### 2. 🐛 **misshapen**
- **Issue**: Extra lines/faces in final output
- **Location**: `faceGeneration.ts` or underlying `polygonize()` function
- **Note**: Marked as "Extra lines" in `pointsTest.ts`
- **Test**: Skipped (`it.skip`)

### 3. 🐛 **half_iron_cross**
- **Issue**: Extra lines/faces in final output
- **Location**: `faceGeneration.ts` or underlying `polygonize()` function
- **Note**: Marked as "Extra lines" in `pointsTest.ts`
- **Test**: Skipped (`it.skip`)

### 4. 🐛 **bug_concave**
- **Issue**: Extra lines/faces in final output
- **Location**: `faceGeneration.ts` or underlying `polygonize()` function
- **Note**: Marked as "Extra lines" in `pointsTest.ts`
- **Test**: Skipped (`it.skip`)

---

## ⏭️ Not Tested (3)

These polygons are in `pointsTest.ts` but not included in automated tests:

1. **florida** - Very complex 75-vertex polygon
2. **hole_symetric** - Polygon with hole (8 vertices)
3. **holey** - Polygon with hole (13 vertices)
4. **holey_2** - Polygon with hole (8 vertices)
5. **south_africa** - Complex 25-vertex polygon (marked as "Bad calculation")
6. **t_shape_hole_extra_edge** - T-shape with hole (12 vertices)

**Reason**: Most are marked as "not working" in `pointsTest.ts`. Holes are not yet supported by the algorithm.

---

## How to Fix Bugs

### Step 1: Enable Visual Test Mode

```typescript
// In calculateHipRoofData.ts
const TEST_POLYGON_NAME = 't_shape_2'; // The polygon you're fixing
const USE_TEST_DATA = true;
```

### Step 2: Start Dev Server

```bash
npm run planner:dev
```

### Step 3: Identify the Issue

Visually inspect the roof in the browser. Look for:
- Missing roof sections
- Incorrect ridge lines
- Wrong roof slopes
- Extra faces/lines

### Step 4: Debug the Algorithm

Add console logs or use debugger in:
- `inputDataPreparation.ts` - Point preparation
- `skeletonHandling.ts` - Skeleton generation
- `faceGeneration.ts` - Face creation

### Step 5: Test the Fix

```bash
# Run automated tests
npm run test:run -w packages/planner

# If tests fail (they will - output changed):
npm run test:update -w packages/planner
```

### Step 6: Update Test File

Move the fixed polygon from buggy list to working list:

```typescript
// In roof-algorithm.test.ts
const workingPolygons = [
  'rectangle',
  // ... other polygons
  't_shape_2', // ← Add here after fixing
] as const;

// Remove from:
const skeletonizationBugs = [
  // 't_shape_2', // ← Comment out or delete
] as const;
```

### Step 7: Commit

```bash
git add .
git commit -m "fix: resolve skeletonization bug for t_shape_2"
```

---

## Bug Priority Recommendations

### High Priority (Most Common Shapes)

1. **t_shape_2**, **t_shape_3** - T-shaped buildings are common
2. **straight_cross** - Cross-shaped buildings are common

### Medium Priority

3. **complex_1** - Complex buildings should work
4. **misshapen** - Irregular shapes should be robust

### Low Priority

5. **complex_2**, **half_iron_cross**, **bug_concave** - Edge cases

---

## Testing Workflow

### When Fixing a Bug

```bash
# 1. Visual inspection
npm run planner:dev  # With TEST_POLYGON_NAME set

# 2. Make code changes

# 3. Verify visually again

# 4. Run tests
npm run test:run -w packages/planner

# 5. Update snapshots if correct
npm run test:update -w packages/planner

# 6. Update this document
# 7. Commit
```

### Daily Development

```bash
# Always run before committing
npm run test:run -w packages/planner
```

Should see: `✓ 56 tests passed | 8 skipped` (or more passed as you fix bugs)

---

## Statistics

### Coverage by Shape Type

| Shape Type | Total | Working | Broken | Coverage |
|------------|-------|---------|--------|----------|
| Simple (Rectangle) | 1 | 1 | 0 | 100% |
| T-Shaped | 4 | 2 | 2 | 50% |
| L-Shaped | 3 | 3 | 0 | 100% |
| U-Shaped | 1 | 1 | 0 | 100% |
| Double Square | 3 | 3 | 0 | 100% |
| Complex | 3 | 1 | 2 | 33% |
| Cross | 1 | 0 | 1 | 0% |
| Irregular | 4 | 3 | 1 | 75% |
| **Overall** | **20** | **14** | **8** | **60%** |

---

## Notes

- All working polygons have automated snapshot tests
- Broken polygons have tests but they're skipped (`.skip`)
- When you fix a bug, the snapshot will capture the correct output
- Tests run in ~2 seconds for all working polygons
- Visual test mode lets you inspect any polygon instantly

---

## Next Steps

1. ✅ Fix skeletonization bugs (4 polygons)
2. ✅ Fix polygonization bugs (4 polygons)
3. ⏭️ Add support for polygons with holes (6 polygons)
4. 🎯 Goal: Get to 100% working polygons

**Current Status**: 60% of tested polygons working correctly
