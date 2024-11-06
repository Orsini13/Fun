"use client";
import Image from "next/image";
import React, { useState } from "react";

interface FileInputProps {
    onFileSelect: (file: File | null, imageId: string | null) => void;
  }

const InputFile: React.FC<FileInputProps> = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [akordHash, setAkordHash] = useState<any>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Function to handle file change event
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("https://api.akord.com/files", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Api-Key": process.env.NEXT_PUBLIC_AKORD_API_KEY!,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload to Akord");
        }

        const result = await response.json();
        console.log("File upload result:", result); 
   
        setAkordHash(result.id);
        console.log("Calling onFileSelect with file and image ID");
        onFileSelect(file, result.id);
      } catch (error) {
        console.error("Error uploading to Akord:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4 gap-4 m-auto border border-blue-800 border-l-blue-500">
      <Image
        src="/icons/upload.png"
        alt="upload your image"
        width={80}
        height={80}
      />
      <input
        id="fileInput"
        type="file"
        accept="image/*,application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />
      <label htmlFor="fileInput" className="text-white cursor-pointer">
        Upload image or video
      </label>
    </div>
  );
};

export default InputFile;
