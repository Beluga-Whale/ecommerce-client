import { FormProvider, useForm } from "react-hook-form";
import FormCheckBoxField from "../FormCheckBoxField";
import { render, screen } from "@testing-library/react";
type TestFormData = {
  isFeature: boolean;
};

const RenderFormInputField = () => {
  const form = useForm<TestFormData>({
    defaultValues: { isFeature: false },
  });
  return (
    <FormProvider {...form}>
      <FormCheckBoxField
        control={form.control}
        name="isFeature"
        label="Feature"
      />
    </FormProvider>
  );
};

describe("FormInputField", () => {
  beforeEach(() => {
    render(<RenderFormInputField />);
  });

  it("should render input field with label", () => {
    expect(screen.getByLabelText(/feature/i)).toBeInTheDocument();
  });
});
