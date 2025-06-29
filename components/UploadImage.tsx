// components/avatar-uploader.tsx
"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Dispatch, SetStateAction } from "react";
import { Images } from "lucide-react";

interface UploadImageProps {
  setImageUpload: Dispatch<SetStateAction<string[]>>;
}

export function UploadImage({ setImageUpload }: UploadImageProps) {
  return (
    <>
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET}
        onSuccess={(result) => {
          const info = result.info as { secure_url: string };
          if (info?.secure_url) {
            setImageUpload((prev) => [...prev, info.secure_url]);
          }
        }}
        options={{
          singleUploadAutoClose: true,
          // maxFiles: 3,
        }}
      >
        {({ open }) => {
          return (
            <div
              className="flex flex-col justify-center items-center w-[200px] h-[125px] border-2 border-dashed border-amber-300 my-5 hover:cursor-pointer hover:bg-slate-100"
              onClick={() => open()}
            >
              <Images size={30} />
              <p className="text-slate-400 text-sm ">Chose your images</p>
              <p className="text-blue-400 text-sm">Click to browse</p>
            </div>
          );
        }}
      </CldUploadWidget>
    </>
  );
}
