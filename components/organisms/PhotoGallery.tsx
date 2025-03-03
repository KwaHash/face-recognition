import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PhotoType, PhotoMode } from '@/types/capture.d';
import { Camera, SunMedium, AlertCircle } from 'lucide-react';

import { saveImages } from '@/actions/save-image';
interface PhotoGalleryProps {
  beforePhoto: PhotoType | null;
  afterPhoto: PhotoType | null;
  setMode: (mode: PhotoMode) => void;
  setShowCamera: (showCamera: boolean) => void;
  startCamera: () => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  beforePhoto,
  afterPhoto,
  setMode,
  setShowCamera,
  startCamera,
}) => {
  const router = useRouter();
  const [saveError, setSaveError] = useState<string | null>(null);
  const onBeforeClick = () => {
    setMode(PhotoMode.Before);
    setShowCamera(true);
    startCamera();
  }

  const onAfterClick = () => {
    setMode(PhotoMode.After);
    setShowCamera(true);
    startCamera();
  }

  const onSaveHandle = async () => {
    if (!beforePhoto || !afterPhoto) return;

    setSaveError(null);

    const timestamp = Date.now();
    const beforeFileName = `${timestamp}_before.jpg`;
    const afterFileName = `${timestamp}_after.jpg`;

    const result = await saveImages(
      beforePhoto.imageUrl,
      afterPhoto.imageUrl,
      beforeFileName,
      afterFileName,
      Number(beforePhoto.brightness.toFixed(1)),
      Number(afterPhoto.brightness.toFixed(1)),
    );

    if (result.success) {
      router.push('/');
      console.log('Images saved successfully:', result);
    } else {
      console.error('Failed to save images:', result.error);
      setSaveError('保存中にエラーが発生しました');
    }
  }

  return (
    <div className="space-y-6">
      {saveError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full">
          {saveError}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-xl">Before写真</h3>
          {beforePhoto ? (
            <div className="relative aspect-square">
              <Image
                src={beforePhoto.imageUrl}
                alt="Before"
                className="w-full h-full object-cover rounded-lg"
                width={640}
                height={480}
              />
              <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-sm flex items-center">
                <SunMedium className="w-4 h-4 mr-1" />
                {beforePhoto.brightness.toFixed(1)}
              </div>
            </div>
          ) : (
            <button
              onClick={onBeforeClick}
              className="w-full aspect-square flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <Camera className="w-10 h-10" />
            </button>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-xl">After写真</h3>
          {afterPhoto ? (
            <div className="relative aspect-square">
              <Image
                src={afterPhoto.imageUrl}
                alt="After"
                className="w-full h-full object-cover rounded-lg"
                width={640}
                height={480}
              />
              <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-sm flex items-center">
                <SunMedium className="w-4 h-4 mr-1" />
                {afterPhoto.brightness.toFixed(1)}
              </div>
            </div>
          ) : (
            <button
              onClick={onAfterClick}
              className="w-full aspect-square flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <Camera className="w-10 h-10" />
            </button>
          )}
        </div>
      </div>

      {beforePhoto && afterPhoto && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-2" />
            <div>
              <h3 className="font-semibold text-yellow-800">明るさの比較</h3>
              <p className="text-sm text-yellow-700">
                Before: {beforePhoto.brightness.toFixed(1)} / After: {afterPhoto.brightness.toFixed(1)}
                <br />
                差異: {Math.abs(Number(beforePhoto.brightness.toFixed(1)) - Number(afterPhoto.brightness.toFixed(1))).toFixed(1)}
                {Math.abs(Number(beforePhoto.brightness.toFixed(1)) - Number(afterPhoto.brightness.toFixed(1))) > 20 &&
                  ' - 明るさに大きな差があります。同じような環境で撮影することをお勧めします。'}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-3">
        {beforePhoto && (
          <button
            onClick={() => {
              setMode(PhotoMode.Before);
              setShowCamera(true);
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded-sm hover:bg-gray-600 min-w-32"
          >
            Before再撮影
          </button>
        )}
        {afterPhoto && (
          <button
            onClick={() => {
              setMode(PhotoMode.After);
              setShowCamera(true);
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded-sm hover:bg-gray-600 min-w-32"
          >
            After再撮影
          </button>
        )}

        {beforePhoto && afterPhoto && (
          <button
            onClick={onSaveHandle}
            className="px-4 py-2 bg-gray-500 text-white rounded-sm hover:bg-gray-600 min-w-32"
          >
            保存する
          </button>
        )}
      </div>
    </div>
  );
};