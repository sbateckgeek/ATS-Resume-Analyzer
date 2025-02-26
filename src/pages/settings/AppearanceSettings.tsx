
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"], {
    required_error: "Please select a theme.",
  }),
  fontSize: z.enum(["sm", "md", "lg"], {
    required_error: "Please select a font size.",
  }),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

export default function AppearanceSettings() {
  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      theme: "system",
      fontSize: "md",
    },
  });

  const onSubmit = (data: AppearanceFormValues) => {
    toast.success("Appearance settings updated");
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app.
        </p>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Theme</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-3 gap-4"
                  >
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="light" className="sr-only" />
                      </FormControl>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                        <div className="border-2 rounded-md p-4 cursor-pointer">
                          Light
                        </div>
                      </FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="dark" className="sr-only" />
                      </FormControl>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                        <div className="border-2 rounded-md p-4 cursor-pointer">
                          Dark
                        </div>
                      </FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="system" className="sr-only" />
                      </FormControl>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                        <div className="border-2 rounded-md p-4 cursor-pointer">
                          System
                        </div>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormDescription>
                  Select the theme for the dashboard.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fontSize"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Font Size</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-3 gap-4"
                  >
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="sm" className="sr-only" />
                      </FormControl>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                        <div className="border-2 rounded-md p-4 cursor-pointer">
                          Small
                        </div>
                      </FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="md" className="sr-only" />
                      </FormControl>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                        <div className="border-2 rounded-md p-4 cursor-pointer">
                          Medium
                        </div>
                      </FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="lg" className="sr-only" />
                      </FormControl>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                        <div className="border-2 rounded-md p-4 cursor-pointer">
                          Large
                        </div>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormDescription>
                  Select the font size for the dashboard.
                </FormDescription>
              </FormItem>
            )}
          />

          <Button type="submit">Update preferences</Button>
        </form>
      </Form>
    </div>
  );
}
