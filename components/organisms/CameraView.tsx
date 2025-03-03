"use client";

import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

import VideoOverlay from '@/components/molecules/VideoOverlay';
import CaptureControls from '@/components/molecules/CaptureControls';
import { PhotoType, FaceInfo, PhotoMode } from '@/types/capture.d';
import { brightnessFeedback } from '@/utils/convert.util';

interface CameraViewProps {
  mode: PhotoMode;
  beforePhoto: PhotoType | null;
  tempPhoto: PhotoType | null;
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isVideoReady: boolean;
  faceInfo: FaceInfo | null;
  onCancel: () => void;
  onCapture: () => void;
  onSave: () => void;
  cancelCapture: () => void;
}

export const CameraView: React.FC<CameraViewProps> = ({
  mode,
  beforePhoto,
  tempPhoto,
  videoRef,
  canvasRef,
  isVideoReady,
  faceInfo,
  onCancel,
  onCapture,
  onSave,
  cancelCapture
}) => {
  const feedbacks = faceInfo?.feedbacks ?? [];
  const brightnessFeedbackMessage = brightnessFeedback(faceInfo?.brightness ?? 0);

  return (
    <div className="flex flex-col grow space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {mode === PhotoMode.Before ? 'Before' : 'After'}写真を撮影してください。
        </h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-full absolute top-1 right-2"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="relative w-full mx-auto aspect-[4/3]">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-contain rounded sm:rounded-lg bg-black bg-opacity-80 scale-x-[-1]"
        />

        <VideoOverlay
          mode={mode as PhotoMode}
          beforePhoto={beforePhoto}
          tempPhoto={tempPhoto}
          isVideoReady={isVideoReady}
          faceInfo={faceInfo}
          videoRef={videoRef}
        />
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {tempPhoto && (
        <div className="relative w-full mx-auto aspect-[4/3]">
          <Image
            src={tempPhoto.imageUrl}
            alt="Captured photo"
            className="absolute inset-0 w-full h-full object-contain rounded sm:rounded-lg bg-black bg-opacity-80 mt-7"
            width={640}
            height={480}
          />
        </div>
      )}

      <CaptureControls
        tempPhoto={tempPhoto}
        isPositionCorrect={faceInfo?.isCorrect && !brightnessFeedbackMessage || false}
        onCapture={onCapture}
        onSave={onSave}
        cancelCapture={cancelCapture}
      />

      {!tempPhoto && (
        <div className="text-center">
          {faceInfo?.isCorrect && !feedbacks.length && !brightnessFeedbackMessage ? (
            <p className='text-lg text-green-500 font-semibold'>位置はOKです。</p>
          ) : (
            feedbacks.map((feedback) => (
              <p key={feedback} className='text-sm text-red-500 font-semibold mt-1'>{feedback}</p>
            ))
          )}
          {brightnessFeedbackMessage && (
            <p className='text-sm text-red-500 font-semibold mt-1'>{brightnessFeedbackMessage}</p>
          )}
        </div>
      )
      }
    </div >
  );
};