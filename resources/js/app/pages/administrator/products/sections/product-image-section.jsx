import { ChevronRightIcon, ChevronLeftIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Image } from 'antd';
import React, { useState } from 'react';

export default function ProductImageSection({ data, files, setFiles }) {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleFileInputChange = (e) => {
        const fileList = e.target.files;
        displayUploadedFiles(fileList);
    };

    const handleDragOver = (e) => e.preventDefault();

    const handleDrop = (e) => {
        e.preventDefault();
        displayUploadedFiles(e.dataTransfer.files);
    };

    const displayUploadedFiles = (fileList) => {
        const newFiles = Array.from(fileList).map((file) => {
            const fileUrl = URL.createObjectURL(file);
            return { file, fileUrl };
        });

        setUploadedFiles(newFiles);
        setFiles(fileList); // Set actual FileList for FormData use
        setCurrentImageIndex(0);
    };

    const handleRemoveFile = (fileToRemove) => {
        const updatedFiles = uploadedFiles.filter((fileData) => fileData.file !== fileToRemove);
        setUploadedFiles(updatedFiles);

        // Convert FileList to array, filter, and convert back to FileList
        const filteredFiles = Array.from(files).filter((file) => file !== fileToRemove);
        const newFileList = new DataTransfer();
        filteredFiles.forEach((file) => newFileList.items.add(file));
        setFiles(newFileList.files);

        setCurrentImageIndex(0);
    };

    const existingImages = data?.uploads?.filter((img) => img.product_id === data?.id) || [];

    const allImages = uploadedFiles.length > 0
        ? uploadedFiles.map((f) => ({ file: f.fileUrl, original: f.file }))
        : existingImages.map((img) => ({ file: img.file, original: null }));

    if (allImages.length === 0) {
        return (
            <div className="text-center text-gray-500 py-6">
                No image available
            </div>
        );
    }

    const handleNext = () => setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    const handlePrevious = () => setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

    return (
        <div>
            <div className="relative mt-3 flex flex-col items-center justify-center">
                <div className="w-full py-9 rounded-2xl gap-3 grid" onDragOver={handleDragOver} onDrop={handleDrop}>
                    <div className="grid gap-1">
                        <PhotoIcon className="mx-auto size-12 text-gray-500" />
                        <h2 className="text-center text-pink-300 text-xs leading-4">Image</h2>
                    </div>
                    <div className="grid gap-2">
                        <h4 className="text-center text-pink-300 text-sm font-medium leading-snug">
                            Drag and Drop your file here or
                        </h4>
                        <div className="flex items-center justify-center">
                            <label>
                                <input type="file" accept="image/*" hidden onChange={handleFileInputChange} />
                                <div className="flex w-28 h-9 px-2 flex-col border rounded-full border-pink-300 shadow text-gray-500 text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
                                    Choose File
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Image Preview Section */}
                <div className="flex flex-col w-full mt-4">
                    <div className="w-full justify-end items-center flex mb-2">
                        {uploadedFiles.length > 0 && (
                            <button
                                type="button"
                                className="text-red-500 text-xs"
                                onClick={() => handleRemoveFile(allImages[currentImageIndex]?.original)}
                            >
                                <XMarkIcon className="h-6" />
                            </button>
                        )}
                    </div>
                    <Image
                        alt="Selected Image"
                        src={allImages[currentImageIndex]?.file}
                        width={200}
                        height={150}
                        style={{ borderRadius: '16px', objectFit: 'cover' }}
                    />
                </div>

                {/* Navigation */}
                {allImages.length > 1 && (
                    <>
                        <button
                            onClick={handlePrevious}
                            className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-[rgba(45,55,72,0.6)] hover:bg-[rgba(45,55,72,0.8)] text-white rounded-full p-2"
                        >
                            <ChevronLeftIcon className="h-6" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-[rgba(45,55,72,0.6)] hover:bg-[rgba(45,55,72,0.8)] text-white rounded-full p-2"
                        >
                            <ChevronRightIcon className="h-6" />
                        </button>
                    </>
                )}
            </div>

            <div className="text-center mt-2 text-sm text-gray-500">
                {currentImageIndex + 1} / {allImages.length}
            </div>
        </div>
    );
}
