import dayjs from "dayjs";
import { FormProvider, useForm } from "react-hook-form";
import FormDatePickerField from "../FormDatePickerField";
import { render, screen, waitFor } from "@testing-library/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const formSchema = z.object({
  dudeDate: z.date({
    required_error: "Date is required",
  }),
});

const RenderFormDatePickerField = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dudeDate: dayjs().toDate(),
    },
  });

  return (
    <FormProvider {...form}>
      <FormDatePickerField
        control={form.control}
        name="dudeDate"
        label="Date"
        description="Choose the due date for the task."
      />
    </FormProvider>
  );
};

describe("FormDatePickerField", () => {
  it("should render datePicker with label, defaultDate", () => {
    render(<RenderFormDatePickerField />);
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Choose the due date for the task./i)
    ).toBeInTheDocument();
  });

  it("can open datepicker", async () => {
    render(<RenderFormDatePickerField />);
    const openBtn = screen.getByRole("button");
    userEvent.click(openBtn);
    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  it("should show placeholder when value is not provided", () => {
    const formSchema = z.object({
      dudeDate: z.date({
        required_error: "Date is required",
      }),
    });

    const RenderFormDatePickerFieldUndefined = () => {
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          dudeDate: undefined,
        },
      });

      return (
        <FormProvider {...form}>
          <FormDatePickerField
            control={form.control}
            name="dudeDate"
            label="Date"
            description="Choose the due date for the task."
          />
        </FormProvider>
      );
    };

    render(<RenderFormDatePickerFieldUndefined />);

    expect(screen.getByRole("button")).toHaveTextContent("Pick a date");
  });
});
