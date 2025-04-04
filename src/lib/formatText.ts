export const formatText = (text: string, absolute: boolean = true) => {
  if (!absolute) {
    return text.replace(/\\n/gm, " ");
  }
  return text.replace(/\\n/gm, "\n");
};
