"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
  role: z.string().min(2, "Role must be at least 2 characters").max(50),
  jobDesc: z.string().min(10, "Description must be at least 10 characters"),
  experience: z
    .string()
    .regex(/^\d+$/, "Experience must be a number")
    .refine((val) => parseInt(val) >= 0, "Experience cannot be negative"),
});

type formType = {
  role: string;
  jobDesc: string;
  experience: string;
};

function AddNewInterview() {
  const [openDailog, setOpenDailog] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "",
      jobDesc: "",
      experience: "",
    },
  });

  const { handleSubmit, reset } = form;

  const onSubmit = (data: formType) => {
    console.log(data);
  };

  const handleClose = () => {
    setOpenDailog(false);
    reset();
  };

  return (
    <div>
      <div
        className="p-10 border rounded-xl bg-secondary hover:scale-105 hover:shadow-xl cursor-pointer transition-all"
        onClick={() => setOpenDailog(true)}
      >
        <h1 className="text-lg">+ Add new</h1>
      </div>
      <Dialog open={openDailog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Tell us more about your job which you are interviewing for
            </DialogTitle>
            <DialogDescription>
              Add more information about your job position/role, description,
              and years of experience.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-3">Job/Role Position</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Your Role" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobDesc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-3">
                      Job Description / Skills
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="Your skills" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-3 ">Years of Experience</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Your Experience"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-5 mt-5">
                <Button
                  variant="ghost"
                  className="cursor-pointer"
                  type="button"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button type="submit" className="cursor-pointer">
                  Start Interview
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
