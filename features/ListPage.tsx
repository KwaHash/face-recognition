import React from 'react';
import Image from 'next/image';
import { SunMedium } from 'lucide-react';
import { getAllImages } from '@/actions/all-image';

const ListPage = async () => {
  const { photos, error } = await getAllImages();

  if (error || !photos) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full">
        資料の取り込み中にエラーが発生しました。
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-grow py-2 sm:py-0 sm:px-10 w-full">
      <main className="flex flex-col grow w-full max-w-6xl mx-auto px-4 py-6">
        {photos.length === 0 ? (<></>) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="flex rounded-lg overflow-hidden">
                <div className="relative aspect-square w-1/2">
                  <Image
                    src={photo.beforeUrl}
                    alt="Before"
                    className="w-full h-full object-cover"
                    width={640}
                    height={480}
                  />
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-sm flex items-center">
                    <SunMedium className="w-4 h-4 mr-1" />
                    {photo.beforeBrightness}
                  </div>
                  <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded-full text-sm flex items-center">
                    Before写真
                  </div>
                </div>
                <div className="relative aspect-square w-1/2">
                  <Image
                    src={photo.afterUrl}
                    alt="After"
                    className="w-full h-full object-cover"
                    width={640}
                    height={480}
                  />
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-sm flex items-center">
                    <SunMedium className="w-4 h-4 mr-1" />
                    {photo.afterBrightness}
                  </div>
                  <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-sm flex items-center">
                    After写真
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ListPage;