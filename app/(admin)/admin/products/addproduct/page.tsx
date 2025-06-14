"use client";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { useState } from "react";

const AddProduct = () => {
  const [description, setDescription] = useState<string>("");
  return (
    <div>
      <SimpleEditor onChange={setDescription} />
    </div>
  );
};
export default AddProduct;
