import React from 'react';
import Image from 'next/image';
import { SunMedium, Camera, Calendar } from 'lucide-react';
import { getAllImages } from '@/actions/all-image';

const ListPage = async () => {
  const { photos, error } = await getAllImages();

  if (error || !photos) {
    return (
      <div className="flex flex-col flex-grow py-2 sm:py-0 sm:px-10 w-full bg-gray-50 min-h-[calc(100vh-80px)]">
        <div className="flex flex-col grow w-full max-w-6xl mx-auto px-4 py-6">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md mb-4 w-full">
            <div className="flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="font-medium">
                {error || '資料の取り込み中にエラーが発生しました。'}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-grow py-2 sm:py-0 sm:px-10 w-full bg-gray-50 min-h-[calc(100vh-80px)]">
      <div className="flex flex-col grow w-full max-w-6xl mx-auto px-4 py-6">
        {photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8 text-center">
            <Camera className="w-16 h-16 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">写真がありません</h2>
            <p className="text-gray-500 mb-4">まだ写真が撮影されていません。顔登録ページから写真を撮影してください。</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {photos.map((photo, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(photo.createdAt).toLocaleDateString('ja-JP')}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row">
                  <div className="relative aspect-square w-full sm:w-1/2">
                    <Image
                      src={photo.beforeUrl}
                      alt="Before"
                      className="w-full h-full object-cover"
                      width={640}
                      height={480}
                    />
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded-full text-sm flex items-center backdrop-blur-sm">
                      <SunMedium className="w-4 h-4 mr-1" />
                      {photo.beforeBrightness.toFixed(1)}
                    </div>
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                      Before
                    </div>
                  </div>
                  <div className="relative aspect-square w-full sm:w-1/2">
                    <Image
                      src={photo.afterUrl}
                      alt="After"
                      className="w-full h-full object-cover"
                      width={640}
                      height={480}
                    />
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded-full text-sm flex items-center backdrop-blur-sm">
                      <SunMedium className="w-4 h-4 mr-1" />
                      {photo.afterBrightness.toFixed(1)}
                    </div>
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                      After
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">明るさの変化: </span>
                      <span className={`${photo.afterBrightness > photo.beforeBrightness ? 'text-green-600' : 'text-red-600'}`}>
                        {(photo.afterBrightness - photo.beforeBrightness).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListPage;