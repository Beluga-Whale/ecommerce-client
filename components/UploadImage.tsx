// components/avatar-uploader.tsx
"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Dispatch, SetStateAction } from "react";
import { Images } from "lucide-react";

interface UploadImageProps {
  setImageUpload: Dispatch<SetStateAction<string>>;
}

export function UploadImage({ setImageUpload }: UploadImageProps) {
  return (
    <>
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET}
        onSuccess={(result) => {
          if (typeof result.info === "object" && "secure_url" in result.info) {
            setImageUpload(result.info.secure_url);
          }
        }}
        options={{
          singleUploadAutoClose: true,
        }}
      >
        {({ open }) => {
          return (
            <div className="flex justify-center items-center w-[300px] h-[225px] border-2 border-dashed border-amber-300 my-5 ">
              <Images size={100} onClick={() => open()} />
            </div>
          );
        }}
      </CldUploadWidget>
    </>
  );
}
