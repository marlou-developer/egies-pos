import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Image } from 'antd';
import React, { useState } from 'react';

export default function ProductImageSection({ data }) {
    console.log('data', data?.uploads);

    const images = data?.uploads?.filter(image => image.product_id === data?.id);

    // If there are no images, return a message
    if (!images || images.length === 0) {
        return (
            <td className="whitespace-nowrap px-3 py-4 text-sm">
                <div className="col-span-3 text-center text-gray-500">
                    No image available
                </div>
            </td>
        );
    }

    // Set up state to control the currently displayed image index
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Handle Next button click
    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Handle Previous button click
    const handlePrevious = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div>
            <div className="relative mt-3 flex items-center justify-center">
                <Image
                    alt="Selected Image"
                    src={images[currentImageIndex]?.file}
                    width={200}
                    height={100}
                    style={{ borderRadius: '16px', objectFit: 'cover' }}
                />
                {/* Previous Button */}
                {images.length > 1 && (
                    <button
                        onClick={handlePrevious}
                        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-[rgba(45,55,72,0.6)] hover:bg-[rgba(45,55,72,0.8)] text-white rounded-full p-2"
                    >
                        <ChevronLeftIcon className='h-6' />
                    </button>
                )}
                {/* Next Button */}
                {images.length > 1 && (
                    <button
                        onClick={handleNext}
                        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-[rgba(45,55,72,0.6)] hover:bg-[rgba(45,55,72,0.8)] text-white rounded-full p-2"
                    >
                        <ChevronRightIcon className='h-6' />
                    </button>
                )}
            </div>

            {/* Display the number of images and current image index */}
            <div className="text-center mt-2 text-sm text-gray-500">
                {currentImageIndex + 1} / {images.length}
            </div>
        </div>
    );
}
