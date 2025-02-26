export const brightnessFeedback = (brightness: number) => {
  return brightness > 200
    ? "部屋の明るさを暗くしてください。"
    : brightness < 100
    ? "もっと明るいところで撮影してください。"
    : "";
};
