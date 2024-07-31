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
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

import GoogleSignInButton from "../../components/ui/GoogleSignInButton";

const FormSchema = z.object({
  email: z.string().min(1, "Email Required!").email("Invalid Email!"),
  password: z.string().min(1, "Password Required!").min(8, "Password must be at least 8 characters!"),
});

const SignInForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (FormSchema) => {
    const signInData = await signIn('credentials', {
      email: FormSchema.email,
      password: FormSchema.password,
      redirect: false,
    });
    if (signInData?.error) {
      toast({
        title : 'Error',
        description: "Oops! Something went wrong. Please try again.",
        variant: 'destructive',
      });
    }
    else {
      location.reload();
      router.push('/dashboard');
      toast({
        title : 'Success',
        description: "Log In Successfull!",
        variant: 'success',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
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
        </div>
        <Button type="submit" className="w-full mt-6">
          Sign In
        </Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">or</div>
      <GoogleSignInButton>Sign In with Google</GoogleSignInButton>
      <p className="text-center text-sm text-gray-600 mt-2">
        Don&apos;t have an account,&nbsp;
        <Link href="/sign-up" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>
    </Form>
  );
};

export default SignInForm;
