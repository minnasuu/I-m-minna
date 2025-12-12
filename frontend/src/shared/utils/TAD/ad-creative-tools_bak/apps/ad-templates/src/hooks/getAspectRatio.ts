export const getAspectRatio = (ratio: string) => {
  const [width, height] = ratio.split(':').map(Number);
  return width / height;
};