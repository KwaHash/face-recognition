import React from "react";
import { OrbitProgress } from 'react-loading-indicators';

const Loading = () => {
  return (
    <div className={`fixed w-full h-screen flex z-50 items-center justify-center bg-[#f9fafb] bg-opacity-80 inset-0`}>
      <div className="sm:hidden">
        <OrbitProgress variant="dotted" color="#32cd32" size="medium" />
      </div>
      <div className="hidden sm:block">
        <OrbitProgress variant="dotted" color="#32cd32" size="large" />
      </div>
    </div>
  );
}

export default Loading;