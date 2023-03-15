export const formatMedia = (minOrMax: "min" | "max", size: number) => `(${minOrMax || "min"}-width: ${size}px)`;

export const mediaMatch = (mediaSize: string) => {
  const result = window.matchMedia(mediaSize);
  return result.matches;
}
