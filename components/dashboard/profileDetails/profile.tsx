"use client";
import React from "react";
import MockupPreview from "../createLink/mockScreen";
import ImageUploader from "./imageUploader";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import clsx from "clsx";
import { getAuth, updateProfile } from "firebase/auth";
import { UploadFile } from "@/app/hooks/fileUpload";
import { toast } from 'react-toastify';

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
});

const Profile = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [updateing ,setUpdating] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    
    try {
      console.log(data)
      setUpdating(true)
      const auth = getAuth();
      if (!auth.currentUser) return;

      let imageUrl;
      if (imageFile) {
        imageUrl = await UploadFile(imageFile);
        console.log('File uploaded successfully:', imageUrl);
      }
       
      updateProfile(auth.currentUser, {
        displayName: `${data.firstName} ${data.lastName} `,
        photoURL: imageUrl || null
      }).then(() => {
        console.log('Profile updated successfully')
        setUpdating(false)
        toast.success(`Profile updated successfully`)
      }).catch((error) => {
        // Handle error
        setUpdating(false)
        console.error(error)
        toast.error(error)
      });
    } catch (error) {
      setUpdating(false)
      console.error(error)

      toast.error('Upload failed:');
    }
  };

  return (
    <div className="flex gap-[24px]  p-[24px] pt-0 w-100">
      <div className="p-[24px] md:flex  w-[560px] rounded-[12px] bg-white items-center hidden justify-center">
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
          <form className="space-y-4 bg-gray-50 rounded p-5">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center px-0">
                  <FormLabel className="text-gray-500 w-[30%]">
                    First Name *
                  </FormLabel>
                  <div
                    className={clsx(
                      "flex items-center focus-within:shadow-custom-shadow-purpleMain rounded-[8px] px-3 gap-[12px] w-[70%]", // base classes without border
                      {
                        "border border-slate-300 focus-within:border-purpleMain focus-within:border-[1px]":
                          !form.formState.errors.firstName, // normal state
                        "border border-redMain focus-within:border-redMain focus-within:shadow-transparent":
                          form.formState.errors.firstName, // error state
                      }
                    )}
                  >
                    <FormControl>
                      <input
                        {...field}
                        className={clsx(
                          "bg-transparent focus-within:outline-none rounded-[8px] p-[10px] w-[65%]",
                          {
                            "border-red-500": form.formState.errors.firstName,
                          }
                        )}
                      />
                    </FormControl>
                    <span
                      className={clsx("text-bodySmall text-redMain", {
                        block: form.formState.errors.firstName,
                      })}
                    >
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
                <FormItem className="flex justify-between items-center  px-0">
                  <FormLabel className="text-gray-500 text-start  w-[30%]">
                    Last Name *
                  </FormLabel>
                  <div
                    className={clsx(
                      "flex items-center focus-within:shadow-custom-shadow-purpleMain rounded-[8px] px-3 gap-[12px] w-[70%]",
                      {
                        "border border-slate-300 focus-within:border-purpleMain focus-within:border-[1px]":
                          !form.formState.errors.lastName,
                        "border border-redMain focus-within:border-redMain focus-within:shadow-transparent":
                          form.formState.errors.lastName,
                      }
                    )}
                  >
                    <FormControl>
                      <input
                        {...field}
                        className={clsx(
                          "bg-transparent focus-within:outline-none rounded-[8px] p-[10px] w-[65%]",
                          {
                            "border-red-500": form.formState.errors.lastName,
                          }
                        )}
                      />
                    </FormControl>
                    <span
                      className={clsx("text-bodySmall text-redMain", {
                        block: form.formState.errors.lastName,
                      })}
                    >
                      {form.formState.errors.lastName?.message}
                    </span>
                  </div>
                </FormItem>
              )}
            />

          
          </form>
        </Form>
        <div className="flex justify-end">
          <button
            onClick={form.handleSubmit(onSubmit)}
            className="bg-purpleMain text-white p-[10px] rounded-[8px]"
          >
            {updateing ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
