# Getting Started with Roof Tests - 5 Minute Guide

## The Problem We're Solving

**Before**: You had to manually click through your roof library after every change to see if something broke.

**After**: Run one command, get instant feedback on all roofs in 2 seconds.

## Step-by-Step First Run

### Step 1: Open Terminal

Open your terminal in the project directory:
```bash
cd /home/jovan/Documents/draw-house
```

### Step 2: Create Your First Snapshots

Run this command:
```bash
npm run test:run -w packages/planner
```

**What happens:**
```
✓ Stage 1: Point Preparation (17 tests)
✓ Stage 2: Skeletonization (17 tests)  
✓ Stage 3: Polygonization (17 tests)
✓ Stage 4: Full Pipeline Integration (17 tests)

Test Files  1 passed (1)
     Tests  68 passed (68)
  Start at  10:30:45
  Duration  2.34s
```

**What just happened:**
- Vitest ran your roof algorithm on 17 different polygons
- Each polygon was tested at 4 stages (= 68 tests total)
- It saved the output to snapshot files
- All tests passed because this is the first run

### Step 3: Look at the Snapshot Files

Check the new files created:
```bash
ls -la packages/planner/src/calculationsByJovan/roof/__tests__/__snapshots__/
```

You'll see:
```
roof-algorithm.test.ts.snap
```

This file contains the "known-good" output for all 17 roofs.

### Step 4: Make a Change

Let's test it! Make ANY change to your roof algorithm. For example, edit:
```
packages/planner/src/calculationsByJovan/roof/inputDataPreparation.ts
```

Change the offset or any calculation.

### Step 5: Run Tests Again

```bash
npm run test:run -w packages/planner
```

**Now you'll see:**
```
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
❌ FAIL  Stage 1: Point Preparation > 
         should prepare points correctly for: rectangle

Snapshot mismatch

- Expected
+ Received

  Object {
    "polygon": Array [
-     [4.1, 3.1],
+     [4.2, 3.1],
      ...
    ]
  }
```

**This tells you:**
- ✅ Which polygon broke (`rectangle`)
- ✅ Which stage broke (`Stage 1: Point Preparation`)
- ✅ Exactly what changed (`4.1` → `4.2`)

### Step 6: Decide What to Do

**Option A: The change was a mistake**
- Undo your changes
- Run tests again
- Tests should pass

**Option B: The change was intentional**
- Review the diff to make sure it's correct
- Update snapshots:
  ```bash
  npm run test:update -w packages/planner
  ```
- Tests now pass with new expected output

## Real-World Example

### Scenario: You're fixing a bug in skeletonization

1. **Before fixing:**
   ```bash
   npm run test:run -w packages/planner
   # 68 tests pass
   ```

2. **Edit `skeletonHandling.ts` to fix the bug**

3. **Run tests:**
   ```bash
   npm run test:run -w packages/planner
   ```

4. **Results:**
   ```
   ✓ Stage 1: Point Preparation (17/17)
   ❌ Stage 2: Skeletonization (2/17 failed)
   ❌ Stage 3: Polygonization (2/17 failed)
   ❌ Stage 4: Full Pipeline (2/17 failed)
   ```

5. **Analysis:**
   - 2 roofs changed behavior (the ones you fixed!)
   - Other stages failed because skeleton changed
   - You can see EXACTLY what changed in each roof

6. **Verify the changes are correct:**
   - Review the diff output
   - Make sure the bug is actually fixed
   - Check that you didn't break other roofs

7. **Update snapshots:**
   ```bash
   npm run test:update -w packages/planner
   ```

8. **Commit everything:**
   ```bash
   git add .
   git commit -m "fix: skeletonization bug for t_shape_2 and l_shape_3"
   ```

## Pro Tips

### 💡 Tip 1: Use Watch Mode During Development

Instead of running tests manually, let them run automatically:

```bash
npm run test -w packages/planner
```

Now every time you save a file, tests rerun automatically!

### 💡 Tip 2: Test Just One Polygon

When debugging, edit the test file and add `.only`:

```typescript
it.only('should prepare points correctly for: rectangle', () => {
  // Only this test runs
});
```

### 💡 Tip 3: Use the UI

For a visual interface:

```bash
npm run test:ui -w packages/planner
```

Opens a browser with interactive test explorer!

### 💡 Tip 4: Commit Snapshots to Git

Snapshot files should be committed alongside your code:

```bash
git add packages/planner/src/calculationsByJovan/roof/__tests__/__snapshots__/
```

This way your team sees what changed.

## What's Next?

Now you can:

1. **Run tests before committing** - Make sure nothing broke
2. **Run tests after pulling** - Make sure others didn't break your roofs
3. **Add more test polygons** - Expand your coverage
4. **Fix known bugs** - Move them from skipped to working tests

## Need Help?

Check the full README:
```bash
cat packages/planner/src/calculationsByJovan/roof/__tests__/README.md
```

Or run tests with verbose output:
```bash
npm run test:run -w packages/planner -- --reporter=verbose
```

---

**You're all set! Your roof algorithm is now protected by automated tests. 🎉**
