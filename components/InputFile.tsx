"use client"
import Image from 'next/image';
import React, { useState } from 'react';

type FileInputProps = {
    onFileSelect: (file: File | null) => void;
};

const FileInput =() =>{

// const FileInput: React.FC<FileInputProps> = ({ onFileSelect }) => {
//     const [selectedFile, setSelectedFile] = useState<File | null>(null);

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files ? event.target.files[0] : null;
//         setSelectedFile(file);
//         onFileSelect(file);
//     };
    return (
        <div>

            <div
                className='justify-center items-center p-4 gap-4 flex flex-col m-auto border-0.2 border-solid border-blue-800  border-l-blue-500'>
                <Image
                    src="/icons/upload.png"
                    alt='upload your image'
                    width={80}
                    height={80}
                />
                <input type="file"
                    accept="image/*,application/pdf"
                    className='hidden' />
                <label htmlFor="file"
                    className='text-white'
                >Upload image or video</label>
                {/* {selectedFile && (
                    <p>Selected file: {selectedFile.name}</p>
                )} */}
            </div>

    
        </div>
    );
};

export default FileInput;
