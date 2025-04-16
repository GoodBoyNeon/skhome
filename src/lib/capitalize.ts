export const capitalize = (
  string: string,
  type: "paragraph" | "title" | "sentence",
) => {
  if (type === "title") {
    return string
      .toLowerCase()
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.substring(1))
      .join(" ");
  }
  if (type === "sentence") {
    return string[0].toUpperCase() + string.substring(1);
  }
  if (type === "paragraph") {
    return string
      .toLowerCase()
      .split(". ")
      .map((sentence) => sentence[0].toUpperCase() + sentence.substring(1))
      .join(" ");
  }
  return ""; /* Unreachable */
};
