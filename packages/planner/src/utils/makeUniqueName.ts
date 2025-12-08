export const makeUniqueName = (name: string, existingNames: string[]) => {
  let counter = 0;
  let newName = name;

  while(existingNames.includes(newName)) {
    counter++;
    newName = `${name} (${counter + 1})`;
  }

  return newName;
};
