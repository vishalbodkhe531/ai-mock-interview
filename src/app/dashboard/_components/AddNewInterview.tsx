"use client";
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
import { storeData } from "@/lib/user.action";
import { formType, UserDataType } from "@/types/user.types";
import { chatSession } from "@/utils/gemeniAIMode";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export const formSchema = z.object({
  role: z.string().min(2, "Role must be at least 2 characters").max(50),
  jobDesc: z.string().min(10, "Description must be at least 10 characters"),
  experience: z
    .string()
    .regex(/^\d+$/, "Experience must be a number")
    .refine((val) => parseInt(val) >= 0, "Experience cannot be negative"),
});

function AddNewInterview() {
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { user } = useUser();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "",
      jobDesc: "",
      experience: "",
    },
  });

  const { handleSubmit, reset } = form;

  const onSubmit = async (data: formType) => {
    setLoading(true);
    try {
      const inputPrompt = `Job Position : ${data.role} , Job Skills :  ${data.experience} , Years of experience : ${data.experience} ,  Dependes on this information please give me 7 interview quetion with answer in JSON format , give me quetions and answer related to user Job Skills as field in JSON`;

      const result = await chatSession.sendMessage(inputPrompt);

      if (!result || !result.response) {
        toast.error("Something went wrong..!! Please try again.");
        return;
      }

      let parseResult;
      try {
        const textResponse = await result.response.text();
        const formattedResponse = textResponse
          .replace("```json", "")
          .replace("```", "");
        parseResult = JSON.parse(formattedResponse);
      } catch (jsonError) {
        console.error("Error parsing AI response:", jsonError);
        toast.error("Failed to parse AI response. Please try again.");
        return;
      }

      if (parseResult) {
        const userInfo: UserDataType = {
          userId: user!.id,
          userName: user!.fullName!,
          profilePic: user!.imageUrl,
        };

        const isCompleted = false;

        parseResult = Array.isArray(parseResult)
          ? [...parseResult.map((item: any) => ({ ...item, isCompleted }))]
          : [];

        try {
          const apiResponse = await storeData({ parseResult, userInfo });
          console.log(apiResponse);
          toast.success(apiResponse.message);
          router.push(`/dashboard/interview/${apiResponse.mockId}`);
        } catch (apiError) {
          console.error("Error sending data to API:", apiError);
          toast.error("Failed to send data. Please try again.");
        }
      } else {
        toast.error("Invalid AI response. Please try again.");
      }
    } catch (error) {
      console.error("Error while fetching AI API:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setOpenDailog(false);
    }
  };

  const handleClose = () => {
    setOpenDailog(false);
    reset();
  };

  return (
    <div className="w-full">
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
                <Button
                  type="submit"
                  className="cursor-pointer"
                  variant={"outline"}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Generating from the AI...
                    </>
                  ) : (
                    "Start Interview"
                  )}
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
