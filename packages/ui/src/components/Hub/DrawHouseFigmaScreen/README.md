# DrawHouseFigmaScreen

Figma design screen: **Draw-House-Sid-Proptotypes** → node `21963-71468`  
URL: `https://www.figma.com/design/W2nErmlGeDHUzkWgDYHv8A/Draw-House-Sid-Proptotypes?node-id=21963-71468`

## Current status

- **Placeholder implementation** in this folder follows the UI package conventions (MUI `styled`, `css`, theme).
- **Pixel-perfect styles** from Figma could not be applied because the Figma MCP server reported: *"This figma file could not be accessed."*

## Getting pixel-perfect implementation

1. **Fix Figma access**
   - Ensure the file is shared with your Figma account (the one used by the MCP: run `whoami` to confirm).
   - If the file lives in a team where you have a **View** or **Collab** seat, you may need a **Full** or **Dev** seat to use design-to-code tools.
   - See: `file://figma/docs/plans-access-and-permissions.md` (Figma MCP resource).

2. **Re-run design-to-code**
   - Once the file is accessible, ask the assistant to call `get_design_context` and `get_screenshot` again with the same `fileKey` and `nodeId`, then update `styles.ts` and `index.tsx` to match the design exactly.

3. **Alternative**
   - Share a screenshot and any layout/typography/color notes; the implementation can be updated to match without using the Figma MCP.
