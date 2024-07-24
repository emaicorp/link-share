// src/ui/formComponents/loginForm.tsx

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { IoIosLock } from "react-icons/io";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../button";
import { FormSchema } from "./formSchema";
import userServices from "@/app/services/user.services";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  onSwitch: () => void;
}

export function LoginForm({ onSwitch }: LoginFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    userServices.loginUser(data.email, data.password).then((userCredential) => {
     router.push("/dashboard")
    });
  }

  return (
    <div className="bg-[white] space-y-[28px] p-[40px] rounded-[12px]">
      <div className="header space-y-[8px]">
        <h1 className="text-headingMain font-[700]">Login</h1>
        <p className="text-grayMain font-[400] text-headingSmall">
          Add your details below to get back into the app
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[24px]">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={clsx("text-bodySmall font-[400] text-darkGray", {
                    "text-red-500": form.formState.errors.email,
                  })}
                >
                  Email Address
                </FormLabel>
                <div className={clsx("flex items-center focus-within:shadow-custom-shadow-purpleMain rounded-[8px] px-3 gap-[12px] focus-within:border-purpleMain focus-within:border-[1px] border", {
                  "border-redMain focus-within:shadow-transparent focus-within:border-redMain": form.formState.errors.email,
                })}>
                  <Image src={"/images/mail.svg"} height={15} width={15} alt="mail" />
                  <FormControl>
                    <Input
                      placeholder="e.g alex@gmail.com"
                      {...field}
                      className={clsx(`w-full`, {
                        "border-red-500": form.formState.errors.email,
                      })}
                    />
                  </FormControl>
                  <span className={clsx("text-bodySmall w-[162px] text-redMain", { "block": form.formState.errors.email, })}>{form.formState.errors.email?.message}</span>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={clsx("text-bodySmall font-[400] text-darkGray", {
                    "text-red-500": form.formState.errors.password,
                  })}
                >
                  Password
                </FormLabel>
                <div className={clsx("flex items-center focus-within:shadow-custom-shadow-purpleMain rounded-[8px] px-3 gap-[12px] focus-within:border-purpleMain focus-within:border-[1px] border", {
                  "border-redMain focus-within:shadow-transparent focus-within:border-redMain": form.formState.errors.password,
                })}>
                  <IoIosLock size={"30px"} fill="gray" />
                  <FormControl>
                    <Input
                      placeholder="Enter Password"
                      {...field}
                      className={clsx(`w-full`, {
                        "border-red-500": form.formState.errors.password,
                      })}
                    />
                  </FormControl>
                  <span className={clsx("text-bodySmall w-[162px] text-redMain", { "block": form.formState.errors.password, })}>{form.formState.errors.password?.message}</span>
                </div>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-purpleMain hover:bg-purpleHover"
          >
            Login
          </Button>
        </form>
      </Form>
      <div className="text-center">
        <p className="text-grayMain text-headingSmall">
          Don&apos;t have an account?{" "}
          <button onClick={onSwitch} className="text-purpleMain underline">
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
}
