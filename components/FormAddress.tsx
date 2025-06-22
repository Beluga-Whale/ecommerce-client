import React from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { CardContent } from "./ui/card";
import FormInputField from "./FormInput/FormInputField";

type FormAddressProps = {
  form: UseFormReturn<
    {
      name: string;
      phone: string;
      address: string;
      zipCode: string;
      province: string;
      district: string;
      subdistrict: string;
    },
    any,
    {
      name: string;
      phone: string;
      address: string;
      zipCode: string;
      province: string;
      district: string;
      subdistrict: string;
    }
  >;
};

const FormAddress = ({ form }: FormAddressProps) => {
  return (
    <div className="bg-white text-2xl font-bold p-4 rounded-2xl ">
      <FormProvider {...form}>
        <form className="space-y-5">
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              {/* NOTE - Name */}
              <div className="col-span-2">
                <FormInputField
                  control={form.control}
                  name="name"
                  label="FullName"
                  placeholder="Full Name"
                />
              </div>
              {/* NOTE - Phone */}
              <div className="col-span-2">
                <FormInputField
                  control={form.control}
                  name="phone"
                  label="Phone"
                  placeholder="Phone"
                />
              </div>
              {/* NOTE - Address */}
              <div className="col-span-2 sm:col-span-1">
                <FormInputField
                  control={form.control}
                  name="address"
                  label="Address"
                  placeholder="Address"
                />
              </div>
              {/* NOTE - Province */}
              <div className="col-span-2 sm:col-span-1">
                <FormInputField
                  control={form.control}
                  name="province"
                  label="Province"
                  placeholder="Province"
                />
              </div>
              {/* NOTE - District */}
              <div className="col-span-2 sm:col-span-1">
                <FormInputField
                  control={form.control}
                  name="district"
                  label="District"
                  placeholder="District"
                />
              </div>
              {/* NOTE - SubDistrict */}
              <div className="col-span-2 sm:col-span-1">
                <FormInputField
                  control={form.control}
                  name="subdistrict"
                  label="subdistrict"
                  placeholder="District"
                />
              </div>
              {/* NOTE - ZipCode */}
              <div className="col-span-2 sm:col-span-1">
                <FormInputField
                  control={form.control}
                  name="zipCode"
                  label="Zipcode"
                  placeholder="Zipcode"
                />
              </div>
            </div>
          </CardContent>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormAddress;
