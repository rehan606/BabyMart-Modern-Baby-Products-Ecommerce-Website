import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "./card";
import { Upload, X } from "lucide-react";
import {Button} from "@/components/ui/button";

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

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange("");
        setPreview(null);
    };
    return (
        <Card className="border-dashed overflow-hidden">
            <CardContent className="p-0">
                <div {...getRootProps({
                        className:"flex flex-col items-center justify-center px-4 cursor-pointer",
                    })}
                >
                    <input {...getInputProps()} />
                    {preview ? ( 
                        <div className="relative w-full">
                            <img 
                                src={preview}
                                alt="Preview"
                                className="w-full h-[250px] object-fit rounded-md"
                            />

                            <Button 
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2"
                                onClick={handleRemove}
                                disabled={disabled} 
                            >
                                <X size={16} />
                            </Button>
                        </div>
                    ) :(
                        <div className="flex flex-col gap-4 items-center justify-center h-[200px] w-full border border-dashed border-muted-foreground/50 rounded-md text-center cursor-pointer hover:bg-accent hover:border-accent/70 transition-colors" >
                            <Upload className="h-10 w-10 text-muted-foreground mb-1"/> 
                            <p>Drag &amp; drop or click to upload an image</p>
                            <p className="text-xs text-muted-foreground/70">PNG, JPG, GIF up to 5MB</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

