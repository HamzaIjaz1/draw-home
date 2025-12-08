# Roof Algorithm Testing Guide

## Overview

This testing system uses **snapshot testing** to automatically verify your roof algorithm doesn't break when you make changes. It captures the output of your algorithm and compares it to a known-good "snapshot" saved on disk.

## How Snapshot Testing Works

1. **First Run**: Creates snapshot files with the current output
2. **Future Runs**: Compares new output against saved snapshots
3. **If Different**: Test fails and shows you what changed
4. **If Intentional**: Update snapshots with the new expected output

## Quick Start

### 1. Create Initial Snapshots

Run this command from the project root:

```bash
npm run test:run -w packages/planner
```

This will:
- Run all tests against your 17 working roof polygons
- Create snapshot files in `__snapshots__/` directory
- Pass all tests (since there are no snapshots to compare against yet)

### 2. Make Changes to Your Roof Algorithm

Edit any of the roof algorithm files:
- `inputDataPreparation.ts`
- `skeletonHandling.ts`
- `faceGeneration.ts`
- Or any dependencies

### 3. Run Tests Again

```bash
npm run test:run -w packages/planner
```

Results:
- ✅ **All Pass**: Your changes didn't break any roofs!
- ❌ **Some Fail**: The test output will show EXACTLY what changed

### 4. Review Changes

If tests fail, Vitest will show you a diff like this:

```diff
- Expected
+ Received

  Object {
    "faceCount": 8,
-   "vertexCount": 12,
+   "vertexCount": 13,
    "faces": Array [
      ...
    ]
  }
```

### 5. Update Snapshots (if changes are correct)

If the changes are intentional (e.g., you fixed a bug or improved the algorithm):

```bash
npm run test:update -w packages/planner
```

This updates all snapshots with the new expected output.

## Available Test Commands

| Command | Description |
|---------|-------------|
| `npm run test -w packages/planner` | Run tests in watch mode (auto-reruns on file changes) |
| `npm run test:run -w packages/planner` | Run tests once and exit |
| `npm run test:update -w packages/planner` | Update snapshots with new output |
| `npm run test:ui -w packages/planner` | Open interactive UI to explore tests |
| `npm run test:coverage -w packages/planner` | Generate code coverage report |

## What Gets Tested

The test suite covers **4 levels**:

### Stage 1: Point Preparation
Tests: `prepareCoordinates()`
- Removes collinear points
- Ensures counter-clockwise orientation
- Rotates to optimal start position
- Offsets polygon

### Stage 2: Skeletonization
Tests: `generateRoofSkeleton()`
- Creates skeleton from polygon
- Adjusts for roof pitch (slope)
- Cleans skeleton data
- Positions at correct height

### Stage 3: Polygonization
Tests: `generateRoofFaces()`
- Converts skeleton to roof faces
- Generates proper triangulation
- Removes invalid vertices

### Stage 4: Full Pipeline
Tests: All stages together
- End-to-end integration test
- Captures complete transformation from input → output

## Tested Polygons

Currently testing **17 working polygons**:

✅ Working:
- `rectangle`
- `t_shape_1`, `t_shape_2`, `t_shape_3`, `t_shape_4`
- `l_shape_1`, `l_shape_2`, `l_shape_3`
- `u_shape`
- `d_square_1`, `d_square_2`, `d_square_3`
- `complex_1`, `complex_3`
- `straight_cross`
- `simple_1`, `simple_2`
- `the_sacred_polygon`

🐛 Skipped (known bugs):
- `complex_2`
- `misshapen`
- `half_iron_cross`
- `bug_concave`

When you fix a bug, move it from skipped to working tests!

## Typical Workflow

### During Development

1. Start watch mode:
   ```bash
   npm run test -w packages/planner
   ```

2. Edit your code

3. Tests automatically rerun

4. See instant feedback

### Before Committing

1. Run full test suite:
   ```bash
   npm run test:run -w packages/planner
   ```

2. If tests fail:
   - Review changes
   - Fix bugs OR update snapshots if intentional

3. Commit your changes + updated snapshots together

## Understanding Test Output

### When Tests Pass
```
✓ src/calculationsByJovan/roof/__tests__/roof-algorithm.test.ts (68 tests) 2341ms
  ✓ Stage 1: Point Preparation (17 tests) 234ms
  ✓ Stage 2: Skeletonization (17 tests) 567ms
  ✓ Stage 3: Polygonization (17 tests) 891ms
  ✓ Stage 4: Full Pipeline Integration (17 tests) 649ms

Test Files  1 passed (1)
     Tests  68 passed (68)
```

### When Tests Fail
```
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
FAIL  src/calculationsByJovan/roof/__tests__/roof-algorithm.test.ts > 
      Stage 3: Polygonization > 
      should generate roof faces correctly for: rectangle

AssertionError: Snapshot mismatch

- Expected
+ Received

  Object {
-   "faceCount": 4,
+   "faceCount": 5,
    ...
  }
```

This tells you:
1. Which polygon failed (`rectangle`)
2. Which stage failed (`Stage 3: Polygonization`)
3. What changed (`faceCount` went from 4 to 5)

## Advanced: Adding Your Own Tests

To add a new polygon to test:

1. Add it to `pointsTest.ts`:
   ```typescript
   export const pointsData = {
     my_new_polygon: [
       [0, 0, 0], [0, 0, 10], [10, 0, 10], [10, 0, 0],
     ],
     // ...
   };
   ```

2. Add it to the test array in `roof-algorithm.test.ts`:
   ```typescript
   const workingPolygons = [
     'rectangle',
     // ... other polygons
     'my_new_polygon', // Add here
   ] as const;
   ```

3. Run tests to create snapshots:
   ```bash
   npm run test:run -w packages/planner
   ```

## Troubleshooting

### "Cannot find module" errors
Make sure you're running from the project root:
```bash
cd /home/jovan/Documents/draw-house
npm run test:run -w packages/planner
```

### Tests are too slow
Run specific tests only:
```bash
npm run test:run -w packages/planner -- roof-algorithm.test.ts
```

Or run in parallel (default):
```bash
npm run test:run -w packages/planner -- --poolOptions.threads.maxThreads=4
```

### Want to test just one polygon
Temporarily change `it(` to `it.only(`:
```typescript
it.only('should prepare points correctly for: rectangle', () => {
  // This test will run alone
});
```

### Snapshots are too large
That's normal! Snapshot files can be big. They're committed to git for comparison.

## Benefits

✅ **Speed**: Run 68 tests in ~2 seconds vs. minutes of manual clicking  
✅ **Confidence**: Know immediately if you broke something  
✅ **Documentation**: Tests show expected behavior  
✅ **Regression Prevention**: Once fixed, bugs can't come back unnoticed  
✅ **Refactoring Safety**: Change internals fearlessly  

## Questions?

- Check Vitest docs: https://vitest.dev/
- Check snapshot testing guide: https://vitest.dev/guide/snapshot.html
