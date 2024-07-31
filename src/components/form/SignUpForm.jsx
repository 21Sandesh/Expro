"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GoogleSignInButton from "../../components/ui/GoogleSignInButton";
import { useToast } from "../../components/ui/use-toast";

const FormSchema = z
    .object({
        username: z.string().min(1, "Username Required!").max(20, "Username must be less than 20 characters!"),
        email: z.string().min(1, "Email Required!").email("Invalid Email!"),
        password: z.string().min(1, "Password Required!").min(8, "Password must be at least 8 characters!"),
        confirmPassword: z.string().min(1, "Password Confirmation Required!"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match!",
    });

const SignUpForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (FormSchema) => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: FormSchema.username,
        email: FormSchema.email,
        password: FormSchema.password
      })
    })

    if (response.ok) {
      router.push("/sign-in");
      toast({
        title : 'Success',
        description: "Registration Successful! Please Sign In!",
        variant: 'success',
      });
    }else {
      toast({
        title : 'Error',
        description: "Oops! Something went wrong. Please try again.",
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
            <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" type='password'{...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-enter Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" type='password'{...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full mt-6">
          Sign Up
        </Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">or</div>
      <GoogleSignInButton>Sign Up with Google</GoogleSignInButton>
      <p className="text-center text-sm text-gray-600 mt-2">
        Already have an Account?&nbsp;
        <Link href="/sign-in" className="text-blue-500 hover:underline">
          Sign In
        </Link>
      </p>
    </Form>
  );
};

export default SignUpForm;
