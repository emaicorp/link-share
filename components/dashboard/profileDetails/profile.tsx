"use client";
import React, { useState } from "react";
import MockupPreview from "../createLink/mockScreen";
import ImageUploader from "./imageUploader";
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
import { SetCookies, GetCookies } from "@/lib/cookies";

interface Credential {
  user: {
    uid: string;
    providerData: ProviderData[];
  };
}

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

const Profile = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [updating, setUpdating] = useState(false);  // Corrected updating typo
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
   
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      console.log(updating)

      setUpdating(true);
  
      const auth = getAuth();
      if (!auth.currentUser) return;
  
      let imageUrl;
      if (imageFile) {
        imageUrl = await UploadFile(imageFile);
        console.log('File uploaded successfully:', imageUrl);
      }
  
      await updateProfile(auth.currentUser, {
        displayName: `${data.firstName} ${data.lastName}`,
        photoURL: imageUrl || null
      });
      const Details = await GetCookies();
      if (!Details) {
        throw new Error("No cookie found");
      }

      const credential = JSON.parse(Details) as Credential;
      const { user } = credential;
      const { providerData } = user;
      const updatedCredential = {
        ...credential,
        user: {
          ...credential.user,
          providerData: [
            {
              ...credential.user.providerData[0],
              photoURL: imageUrl || null,
              displayName: `${data?.firstName} ${data.lastName}` || null,
            },
          ],
        },
      };

      await SetCookies({
        credential: JSON.stringify(updatedCredential),
      });
  
      console.log('Profile updated successfully');
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Profile update failed.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex gap-[24px] p-[24px] pt-0 w-100">
      <div className="p-[24px] md:flex w-[560px] rounded-[12px] bg-white items-center hidden justify-center">
        <MockupPreview />
      </div>
      <div className="rounded-[12px] bg-white w-[808px] p-[40px] flex flex-col gap-[20px]">
        <div className="w-full space-y-0">
          <h1 className="font-[700] text-[32px] w-full h-fit">Profile Details</h1>
          <p className="font-[200]">Add your details to create a personal touch to your profile.</p>
        </div>

        {/* Image Uploader Div */}
        <div className="h-[200px] rounded-[10px]">
          <ImageUploader imageFile={imageFile} setImageFile={setImageFile} />
        </div>

        <Form {...form}>
          <form  className="space-y-4 bg-gray-50 rounded p-5">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center px-0">
                  <FormLabel className="text-gray-500 w-[30%]">First Name *</FormLabel>
                  <div
                    className={clsx(
                      "flex items-center focus-within:shadow-custom-shadow-purpleMain rounded-[8px] px-3 gap-[12px] w-[70%]",
                      {
                        "border border-slate-300 focus-within:border-purpleMain focus-within:border-[1px]":
                          !form.formState.errors.firstName,
                        "border border-redMain focus-within:border-redMain focus-within:shadow-transparent":
                          form.formState.errors.firstName,
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
                    {form.formState.errors.firstName && (
                      <span className="text-bodySmall text-redMain">
                        {form.formState.errors.firstName.message}
                      </span>
                    )}
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center px-0">
                  <FormLabel className="text-gray-500 text-start w-[30%]">Last Name *</FormLabel>
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
                    {form.formState.errors.lastName && (
                      <span className="text-bodySmall text-redMain">
                        {form.formState.errors.lastName.message}
                      </span>
                    )}
                  </div>
                </FormItem>
              )}
            />
          </form>

        </Form>
        <div className="flex justify-end">
            <button type="submit" onClick={form.handleSubmit(onSubmit)} className="bg-purpleMain text-white p-[10px] rounded-[8px]">
              {updating ? "Saving..." : "Save"}
            </button>
          </div>
      </div>
    </div>
  );
};

export default Profile;
