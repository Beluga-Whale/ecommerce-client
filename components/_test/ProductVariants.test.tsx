import { render, screen, fireEvent } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import ProductVariants from "../ProductVariants";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  category: z.string().min(1),
  salePrice: z.number(),
  isFeature: z.boolean(),
  variants: z
    .array(
      z.object({
        size: z.string().min(1),
        stock: z.number().min(1),
        price: z.number().min(1),
      })
    )
    .min(1),
});

const Wrapper = () => {
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      title: "",
      category: "",
      salePrice: 0,
      isFeature: false,
      variants: [{ size: "", stock: 0, price: 0 }],
    },
  });

  return (
    <FormProvider {...methods}>
      <ProductVariants formProductVariants={methods} />
    </FormProvider>
  );
};

it("can add and remove product variants", () => {
  render(<Wrapper />);

  const addButton = screen.getByText("+ Add Size");
  fireEvent.click(addButton);

  const removeButtons = screen.getAllByRole("button", { name: "✕" });
  expect(removeButtons.length).toBe(2);

  fireEvent.click(removeButtons[0]);

  expect(screen.getAllByRole("button", { name: "✕" }).length).toBe(1);
});
