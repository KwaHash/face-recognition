import Image from "next/image";
import { PhotoType, FaceInfo, PhotoMode } from "@/types/capture.d";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Check, Dot } from "lucide-react";

const VideoOverlay: React.FC<{
  mode: PhotoMode;
  beforePhoto: PhotoType | null;
  tempPhoto: PhotoType | null;
  isVideoReady: boolean;
  faceInfo: FaceInfo | null;
  videoRef: React.RefObject<HTMLVideoElement>;
}> = ({ mode, beforePhoto, tempPhoto, isVideoReady, faceInfo, videoRef }) => {

  const renderPositioningArrows = () => {
    if (!faceInfo || !videoRef.current) return null;

    const videoWidth = videoRef.current.clientWidth;
    const videoHeight = videoRef.current.clientHeight;
    const { xMin, yMin, xMax, yMax } = faceInfo.box;
    const centerX = (xMin + xMax) / 2;
    const centerY = (yMin + yMax) / 2;

    const showLeft = centerX > videoWidth * 0.6;
    const showRight = centerX < videoWidth * 0.4;
    const showUp = centerY > videoHeight * 0.6;
    const showDown = centerY < videoHeight * 0.4;

    return (
      <div className="absolute inset-0 pointer-events-none">
        {showLeft && <ArrowLeft className="absolute left-4 top-1/2 transform -translate-y-1/2 w-7 h-7 sm:w-10 sm:h-10 text-red-500 animate-pulse" />}
        {showRight && <ArrowRight className="absolute right-4 top-1/2 transform -translate-y-1/2 w-7 h-7 sm:w-10 sm:h-10 text-red-500 animate-pulse" />}
        {showUp && <ArrowUp className="absolute top-4 left-1/2 transform -translate-x-1/2 w-7 h-7 sm:w-10 sm:h-10 text-red-500 animate-pulse" />}
        {showDown && <ArrowDown className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-7 h-7 sm:w-10 sm:h-10 text-red-500 animate-pulse" />}
        {faceInfo?.keypoints && faceInfo.keypoints.map((keypoint, index) => (
          <Dot
            key={index}
            className="absolute w-10 h-10 text-[#32eedb]"
            style={{
              left: `${keypoint.x}px`,
              top: `${keypoint.y}px`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
        {faceInfo.isCorrect && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full flex items-center">
            <Check className="w-4 h-4 mr-2" />
            位置OK
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {mode === PhotoMode.After && beforePhoto && !tempPhoto && (
        <div className="absolute pointer-events-none">
          <Image
            src={beforePhoto.imageUrl}
            alt="Before overlay"
            className="w-full h-full mx-auto mt-8 rounded sm:rounded-lg opacity-30 scale-x-[-1]"
            width={640}
            height={480}
          />
        </div>
      )}

      {!tempPhoto && renderPositioningArrows()}

      {!isVideoReady && !tempPhoto && (
        <p className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg sm:text-xl font-bold">
          カメラを準備中
        </p>
      )}

      {/* {feedback && !tempPhoto && (
        <div className="absolute w-11/12 sm:w-3/5 text-sm text-center bottom-4 left-1/2 font-bold transform -translate-x-1/2 bg-yellow-500 text-white px-4 py-2 rounded-full">
          {feedback}
        </div>
      )} */}
    </>
  );
};

export default VideoOverlay;