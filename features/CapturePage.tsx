"use client";

import React, { useState } from 'react';
import { useCamera } from '@/hooks/use-camera';
import { CameraView } from '@/components/organisms/CameraView';
import { PhotoGallery } from '@/components/organisms/PhotoGallery';
import { PhotoType, PhotoMode } from '@/types/capture.d';
import Loading from '@/components/molecules/loading';

const CapturePage = () => {
  const [mode, setMode] = useState<PhotoMode>(PhotoMode.Before);
  const [beforePhoto, setBeforePhoto] = useState<PhotoType | null>(null);
  const [afterPhoto, setAfterPhoto] = useState<PhotoType | null>(null);
  const [tempPhoto, setTempPhoto] = useState<PhotoType | null>(null);

  const {
    showCamera,
    setShowCamera,
    isVideoReady,
    faceInfo,
    isLoading,
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
  } = useCamera();

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Flip horizontally by scaling and translating
    context.scale(-1, 1);
    context.translate(-canvas.width, 0);
    context.drawImage(video, 0, 0);
    // Reset transform
    context.setTransform(1, 0, 0, 1, 0, 0);

    const brightness = faceInfo?.brightness ?? 0;
    const photo: PhotoType = {
      imageUrl: canvas.toDataURL('image/jpeg'),
      brightness,
      timestamp: new Date(),
    };

    setTempPhoto(photo);
  };

  const savePhoto = () => {
    if (!tempPhoto) return;

    if (mode === PhotoMode.Before) {
      setBeforePhoto(tempPhoto);
    } else {
      setAfterPhoto(tempPhoto);
    }

    setTempPhoto(null);
    setShowCamera(false);
    stopCamera();
  };

  const cancelCapture = () => {
    setTempPhoto(null);
  };

  return (
    <div className="flex flex-col flex-grow py-2 sm:py-0 sm:px-10 w-full">
      {isLoading ? <Loading /> : (
        <main className="flex flex-col grow w-full max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-col grow relative bg-white rounded shadow px-3 py-6 sm:px-6 sm:py-12">
            {showCamera ? (
              <CameraView
                mode={mode}
                beforePhoto={beforePhoto}
                tempPhoto={tempPhoto}
                videoRef={videoRef}
                canvasRef={canvasRef}
                isVideoReady={isVideoReady}
                faceInfo={faceInfo}
                onCancel={() => {
                  setShowCamera(false);
                  stopCamera();
                }}
                onCapture={capturePhoto}
                onSave={savePhoto}
                cancelCapture={cancelCapture}
              />
            ) : (
              <PhotoGallery
                beforePhoto={beforePhoto}
                afterPhoto={afterPhoto}
                setMode={setMode}
                setShowCamera={setShowCamera}
                startCamera={startCamera}
              />
            )}
          </div>
        </main>
      )}
    </div>
  );
};

export default CapturePage;