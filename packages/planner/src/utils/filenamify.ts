import _filenamify from 'filenamify';

export const filenamify = (name: string) => _filenamify(name, { replacement: '_' });
