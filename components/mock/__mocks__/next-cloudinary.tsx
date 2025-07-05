// __mocks__/next-cloudinary.ts
import React from "react";

export const CldUploadWidget = ({ children, onSuccess }: any) => {
  const open = () => {
    onSuccess?.({
      info: {
        secure_url: "https://example.com/image.jpg",
      },
    });
  };

  return <>{children({ open })}</>;
};
