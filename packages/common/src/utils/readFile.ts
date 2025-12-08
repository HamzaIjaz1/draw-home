import { readFile as _readFile } from 'fs/promises';

export const readFile = async (filePath: string) => {
  try {
    return await _readFile(filePath, 'utf-8');
  } catch(e) {
    return null;
  }
};
