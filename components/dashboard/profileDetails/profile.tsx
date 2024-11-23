"use client";
import React from "react";
import MockupPreview from "../createLink/mockScreen";
import ImageUploader from "./imageUploader";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import clsx from "clsx";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
})

const Profile = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  })

  return (
    <div className="flex gap-[24px]  p-[24px] pt-0">
      <div className="p-[24px]  w-[560px] rounded-[12px] bg-white items-center flex justify-center">
        <MockupPreview />
      </div>
      <div className="rounded-[12px] bg-white w-[808px] p-[40px] flex flex-col gap-[20px]">
        <div className="w-full space-y-0">
          <h1 className="font-[700] text-[32px]  w-full h-fit  ">
            Profile Details
          </h1>
          <p className="font-[200]">
            Add your details to create a personal touch to your profile.
          </p>
        </div>

        {/* Image Uploader Div */}
        <div className="h-[200px]  rounded-[10px]">
          <ImageUploader imageFile={imageFile} setImageFile={setImageFile} />
        </div>

        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <div className={clsx(
                    "flex items-center focus-within:shadow-custom-shadow-purpleMain rounded-[8px] px-3 gap-[12px] focus-within:border-purpleMain focus-within:border-[1px] border",
                    {
                      "border-redMain focus-within:shadow-transparent focus-within:border-redMain":
                        form.formState.errors.firstName,
                    }
                  )}>
                    <FormLabel className="text-gray-500 w-[30%]">First Name *</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        className={clsx("border border-gray-300 rounded-[8px] p-[10px] w-[70%]", {
                          "border-red-500": form.formState.errors.firstName,
                        })}
                      />
                    </FormControl>
                    <span className={clsx("text-bodySmall text-redMain", {
                      block: form.formState.errors.firstName,
                    })}>
                      {form.formState.errors.firstName?.message}
                    </span>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <div className={clsx(
                    "flex items-center focus-within:shadow-custom-shadow-purpleMain rounded-[8px] px-3 gap-[12px] focus-within:border-purpleMain focus-within:border-[1px] border",
                    {
                      "border-redMain focus-within:shadow-transparent focus-within:border-redMain":
                        form.formState.errors.lastName,
                    }
                  )}>
                    <FormLabel className="text-gray-500 w-[30%]">Last Name *</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        className={clsx("border border-gray-300 rounded-[8px] p-[10px] w-[70%]", {
                          "border-red-500": form.formState.errors.lastName,
                        })}
                      />
                    </FormControl>
                    <span className={clsx("text-bodySmall text-redMain", {
                      block: form.formState.errors.lastName,
                    })}>
                      {form.formState.errors.lastName?.message}
                    </span>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className={clsx(
                    "flex items-center focus-within:shadow-custom-shadow-purpleMain rounded-[8px] px-3 gap-[12px] focus-within:border-purpleMain focus-within:border-[1px] border",
                    {
                      "border-redMain focus-within:shadow-transparent focus-within:border-redMain":
                        form.formState.errors.email,
                    }
                  )}>
                    <FormLabel className="text-gray-500 w-[30%]">Email</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        type="email"
                        className={clsx("border border-gray-300 rounded-[8px] p-[10px] w-[70%]", {
                          "border-red-500": form.formState.errors.email,
                        })}
                      />
                    </FormControl>
                    <span className={clsx("text-bodySmall text-redMain", {
                      block: form.formState.errors.email,
                    })}>
                      {form.formState.errors.email?.message}
                    </span>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <button 
                onClick={form.handleSubmit((data) => console.log(data))}
                className="bg-purpleMain text-white p-[10px] rounded-[8px]"
              >
                Save
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
