
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SettingsSidebar } from "@/components/settings/SettingsSidebar";

const profileFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  bio: z.string().max(160).optional(),
  urls: z.array(z.object({
    value: z.string().url({ message: "Please enter a valid URL." })
  })).optional()
});

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function SettingsPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "",
      email: "",
      bio: "",
      urls: [{ value: "" }]
    },
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return navigate("/auth/login");

      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      if (data) {
        form.reset({
          username: data.username || "",
          email: user.email || "",
          bio: data.bio || "",
          urls: data.urls && Array.isArray(data.urls) && data.urls.length 
            ? data.urls 
            : [{ value: "" }]
        });
      }
    } catch (error) {
      toast.error("Error loading profile");
      console.error(error);
    }
  };

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from("user_profiles")
        .upsert({
          id: user.id,
          username: values.username,
          bio: values.bio,
          urls: values.urls,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      toast.success("Settings updated successfully");
    } catch (error) {
      toast.error("Error updating settings");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addUrl = () => {
    const currentUrls = form.getValues("urls") || [];
    form.setValue("urls", [...currentUrls, { value: "" }]);
  };

  return (
    <div className="container max-w-6xl py-10">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6" />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SettingsSidebar />
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">
                  This is how others will see you on the site.
                </p>
              </div>
              
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.
                    </FormDescription>
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
                      <Input placeholder="Select a verified email to display" {...field} />
                    </FormControl>
                    <FormDescription>
                      You can manage verified email addresses in your email settings.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      You can @mention other users and organizations to link to them.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>URLs</FormLabel>
                <FormDescription className="mt-0">
                  Add links to your website, blog, or social media profiles.
                </FormDescription>
                <div className="space-y-3 mt-2">
                  {form.watch("urls")?.map((_, index) => (
                    <FormField
                      key={index}
                      control={form.control}
                      name={`urls.${index}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="https://example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={addUrl}
                >
                  Add URL
                </Button>
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update profile"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
