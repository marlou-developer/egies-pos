import { FileImageOutlined, FilePdfOutlined } from '@ant-design/icons';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

export default function UploadProductSection({ files, setFiles }) {
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const displayUploadedFiles = (fileList) => {
        const newFiles = Array.from(fileList).map((file) => {
            const fileUrl = URL.createObjectURL(file);
            return { file, fileUrl };
        });
        setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
        setFiles(fileList);
    };

    const handleFileInputChange = (e) => {
        const files = e.target.files;
        displayUploadedFiles(files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        displayUploadedFiles(e.dataTransfer.files);
    };

    const handleRemoveFile = (e, fileToRemove) => {
        e.preventDefault();
        const updatedFiles = uploadedFiles.filter((fileData) => fileData.file !== fileToRemove);
        setUploadedFiles(updatedFiles);

        setFiles((prevFiles) => {
            const updatedParentFiles = Array.from(prevFiles).filter((file) => file !== fileToRemove);
            return updatedParentFiles;
        });
    };


    const renderFileIcon = (file) => {
        const fileType = file.type.split('/')[0];
        if (fileType === 'image') {
            return <FileImageOutlined className="text-2xl text-gray-500" />;
        } else if (file.type === 'application/pdf') {
            return <FilePdfOutlined className="text-2xl text-gray-500" />;
        }
        return null;
    };

    return (
        <div>
            <div className="w-full py-9 rounded-2xl gap-3 grid" onDragOver={handleDragOver} onDrop={handleDrop}>
                <div className="grid gap-1">
                    <PhotoIcon
                        aria-hidden="true"
                        className="mx-auto size-12 text-gray-500"
                    />
                    <h2 className="text-center text-pink-300 text-xs leading-4">Image</h2>
                </div>
                <div className="grid gap-2">
                    <h4 className="text-center text-pink-300 text-sm font-medium leading-snug">Drag and Drop your file here or</h4>
                    <div className="flex items-center justify-center">
                        <label>
                            <input type="file" hidden onChange={handleFileInputChange} multiple />
                            <div className="flex w-28 h-9 px-2 flex-col border rounded-full border-pink-300 shadow text-gray-500 text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">Choose File</div>
                        </label>
                    </div>
                </div>
            </div>
            <div className="mt-4 mb-4 grid grid-cols-3 gap-4">
                {uploadedFiles.map((fileData, index) => (
                    <div key={index} className="flex items-center justify-between rounded-md p-2">

                    </div>
                ))}
            </div>
            <div>
                {uploadedFiles.length > 0 && (
                    <div id="display-area" className="mt-4 mb-4 flex gap-6">
                        {uploadedFiles.map((fileData, index) => (
                            <div key={index} className="relative flex flex-col">
                                <div>
                                    <button className="text-pink-300 flex w-full items-center justify-end mb-1 pr-1" onClick={(e) => handleRemoveFile(e, fileData.file)}>
                                        <XMarkIcon className="h-6" />
                                    </button>
                                </div>
                                <div>
                                    {fileData.file.type === 'application/pdf' ? (
                                        <iframe
                                            src={fileData.fileUrl}
                                            width="300px"
                                            height="400px"
                                            className="rounded-md"
                                            title={`Uploaded PDF - ${fileData.file.name}`}
                                        />
                                    ) : (
                                        <img
                                            src={fileData.fileUrl}
                                            alt={`Uploaded image - ${fileData.file.name}`}
                                            className="rounded-md max-w-full max-h-40"
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
