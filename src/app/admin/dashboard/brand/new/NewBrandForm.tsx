"use client";

import { createBrand } from "@/app/actions/admin";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  newBrandFormSchema,
  NewBrandFormState,
  NewBrandFormFields,
} from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Trash2, Upload } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const NewBrandForm = () => {
  const [image, setImage] = useState<File | null>();
  const [formState, setFormState] = useState<NewBrandFormState>({
    errors: {},
    message: null,
    success: false,
  });
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<NewBrandFormFields>({
    resolver: zodResolver(newBrandFormSchema),
    defaultValues: {
      name: "",
      urlSlug: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImage(newFiles[0]);
    }
  };
  const removeImage = () => {
    setImage(null);
  };
  function onSubmit(fields: NewBrandFormFields) {
    if (!image) {
      toast.error("At least one image is required.");
      return;
    }
    const formData = new FormData();

    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    formData.set("image", image);

    startTransition(async () => {
      const result = await createBrand(formState, formData);
      setFormState(result);

      if (result.success) {
        toast.success("Brand created successfully!");

        form.reset();
        removeImage();
      } else {
        toast(result.message || "Failed to create brand.");
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        ref={formRef}
      >
        {formState.message && !formState.success && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{formState.message}</AlertDescription>
          </Alert>
        )}

        {formState.success && (
          <Alert variant={"success"}>
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{formState.message}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter brand name" {...field} />
                </FormControl>
                <FormDescription>Brand&apos;s name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="urlSlug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL Slug</FormLabel>
                <FormControl>
                  <Input placeholder="brand-name-123" {...field} />
                </FormControl>
                <FormDescription>
                  ! Only lowercase letters, numbers, and hyphens.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="image-upload" className="text-sm font-medium">
              Brand Image
            </label>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <label
                  htmlFor="image-upload"
                  className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Upload className="h-4 w-4" />
                  <span>Upload Image</span>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              {formState.errors?.image && (
                <p className="text-destructive text-sm">
                  {formState.errors.image[0]}
                </p>
              )}

              {image && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  <Card className="overflow-hidden">
                    <CardContent className="p-2">
                      <div className="relative aspect-square w-full overflow-hidden rounded-md">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={URL.createObjectURL(image) || "/placeholder.svg"}
                          alt={`Preview image`}
                          className="h-full w-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6"
                          onClick={() => removeImage()}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-muted-foreground mt-1 truncate text-xs">
                        {image.name}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Brand"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewBrandForm;
