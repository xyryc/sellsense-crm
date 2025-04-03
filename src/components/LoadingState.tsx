import React from 'react';

const LoadingState = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-blue-500"></div>
        </div>
    );
};

export default LoadingState;
