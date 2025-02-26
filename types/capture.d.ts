export enum PhotoMode {
  Before = "before",
  After = "after",
}

export type PhotoType = {
  imageUrl: string;
  brightness: number;
  timestamp: Date;
};

type FaceBox = {
  xMin: number;
  yMin: number;
  xMax: number;
  yMax: number;
  width: number;
  height: number;
};

type FaceKeypoint = { x: number; y: number };

export type FacePosition = {
  box: FaceBox;
  keypoints: FaceKeypoint[];
};

export type FaceInfo = FacePosition & {
  isCorrect: boolean;
  feedbacks: string[];
  brightness: number;
};
