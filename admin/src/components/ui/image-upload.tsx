import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  value: string;
  onChange: (base64: string) => void;
  disabled?: boolean;
}

export function ImageUpload ({value, onChange, disabled}:ImageUploadProps){
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (value) {
            setPreview(value);
        }
    }, [value]);

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const { getRootProps, getInputProps } = useDropzone ({
        accept: {
            'image/*': [".jpeg", ".png", ".gif", ".webp", ".bmp"],
        },
        maxFiles: 1,
        disabled,
        maxSize: 5 * 1024 * 1024, // 5MB
        onDrop: async (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                try {
                    const base64 = await convertToBase64(acceptedFiles[0]);
                    onChange(base64);
                    setPreview(base64);
                } catch (error) {
                    console.error("Error converting file to base64:", error);
                }
            }
        }
    });

    
}

