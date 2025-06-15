import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import FormSelectField from "./FormInput/FormSelectFiled";
import FormInputField from "./FormInput/FormInputField";

type ProductFormType = {
  name: string;
  category: string;
  salePrice: number;
  isFeature: boolean;
  variants: {
    size: string;
    stock: number;
    price: number;
  }[];
};

type ProductVariantsProps = {
  formProductVariants: UseFormReturn<ProductFormType>;
};
const defaultSizes = ["S", "M", "L", "XL"];

export default function ProductVariants({
  formProductVariants,
}: ProductVariantsProps) {
  const { control } = formProductVariants;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">Product Variants</Label>

      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-4 items-end">
          <FormSelectField
            control={control}
            name={`variants.${index}.size`}
            label="Size"
            options={defaultSizes.map((s) => ({ label: s, value: s }))}
          />
          <FormInputField
            control={control}
            name={`variants.${index}.price`}
            label="Price"
            placeholder="Prize product"
            type="number"
          />
          <FormInputField
            control={control}
            name={`variants.${index}.stock`}
            label="Quantity"
            placeholder="Quantity"
            type="number"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => remove(index)}
            disabled={fields.length <= 1}
          >
            ✕
          </Button>
        </div>
      ))}

      <Button
        type="button"
        onClick={() => append({ size: "", price: 0, stock: 0 })}
        variant="outline"
        size="sm"
      >
        + Add Size
      </Button>
    </div>
  );
}
