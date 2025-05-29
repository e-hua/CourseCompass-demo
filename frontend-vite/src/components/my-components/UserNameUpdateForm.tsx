import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useUserProfile } from "../my-contexts/UserProfileContext";

const FormSchema = z.object({
  userName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(30, { message: "Name must not exceed 30 characters" }),
});

export function UserNameUpdateForm() {
  const { userProfile, setUserProfile } = useUserProfile();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userName: userProfile?.userName ?? "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:8080/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("id_token")}`,
        },
        body: JSON.stringify({ userName: data.userName }),
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error("Failed to update name", {
          description: err.error || "Unknown server error",
        });
        return;
      }

      const updatedUser = await res.json();
      setUserProfile(updatedUser);

      toast.success("Profile updated", {
        description: "Your name has been updated successfully.",
      });
    } catch (err) {
      toast.error("Network error", {
        description: "Unable to reach the server." + err,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your display name"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Name"}
        </Button>
      </form>
    </Form>
  );
}
