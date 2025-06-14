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

const defaultSizes = ["S", "M", "L", "XL"];

export default function ProductVariants() {
  const [sizes, setSizes] = useState([{ size: "", quantity: "", price: "" }]);

  const handleAdd = () => {
    setSizes([...sizes, { size: "", quantity: "", price: "" }]);
  };

  const handleRemove = (index: number) => {
    const newSizes = sizes.filter((_, i) => i !== index);
    setSizes(newSizes);
  };

  const handleChange = (
    index: number,
    field: keyof (typeof sizes)[number],
    value: string
  ) => {
    const newSizes = [...sizes];
    newSizes[index][field] = value;
    setSizes(newSizes);
  };

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">Product Variants</Label>

      {sizes.map((item, index) => (
        <div key={index} className="flex items-center gap-4">
          <div className="w-1/2">
            <Label className="text-xs">Size</Label>
            <Select
              value={item.size}
              onValueChange={(value) => handleChange(index, "size", value)}
            >
              <SelectTrigger className="w-full  ">
                <SelectValue placeholder="Select a size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sizes</SelectLabel>
                  {defaultSizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-1/2">
            <Label className="text-xs">Quantity</Label>
            <Input
              type="number"
              value={item.quantity}
              onChange={(e) => handleChange(index, "quantity", e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="w-1/2">
            <Label className="text-xs">Price</Label>
            <Input
              type="number"
              value={item.price}
              onChange={(e) => handleChange(index, "price", e.target.value)}
              placeholder="0"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="self-end"
            onClick={() => handleRemove(index)}
          >
            ✕
          </Button>
        </div>
      ))}

      <Button type="button" onClick={handleAdd} variant="outline" size="sm">
        + Add Size
      </Button>
    </div>
  );
}
