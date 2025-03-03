import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <Image src="/logo.png" alt="Logo" width={40} height={40} />
      <div className="flex flex-col ml-6">
        <span className="text-xl font-bold">顔撮影システム</span>
      </div>
    </div>
  );
}

export default Logo;