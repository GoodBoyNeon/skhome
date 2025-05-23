import { createProduct } from "@/app/actions/admin";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  NewProductFormFields,
  NewProductFormSchema,
  NewProductFormState,
} from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Trash2, Upload } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getAllBrands, getAllCategories } from "@/db";

const AddProductForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [formState, setFormState] = useState<NewProductFormState>({
    errors: {},
    message: null,
    success: false,
  });
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<NewProductFormFields>({
    resolver: zodResolver(NewProductFormSchema),
    defaultValues: {
      name: "",
      description: "",
      urlSlug: "",
      MRP: 0,
      price: 0,
      stock: 0,
      pIndex: 0,
      tags: [],
    },
  });

  const categoriesRes = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getAllCategories(),
  });
  const brandsRes = useQuery({
    queryKey: ["brands"],
    queryFn: async () => await getAllBrands(),
  });

  if (categoriesRes.isLoading || brandsRes.isLoading) {
    return "loading";
  }
  if (categoriesRes.error || brandsRes.error) {
    return "An unexpected error occured!";
  }

  const { data: categories } = categoriesRes;
  const { data: brands } = brandsRes;

  function onSubmit(fields: NewProductFormFields) {
    if (images.length === 0) {
      toast.error("At least one product image is required.");
      return;
    }

    const formData = new FormData();

    Object.entries(fields).forEach(([key, value]) => {
      if (key === "tags") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    });

    images.forEach((image) => {
      formData.append("images", image);
    });

    startTransition(async () => {
      const result = await createProduct(formState, formData);
      setFormState(result);

      if (result.success) {
        toast.success("Product created successfully!");

        form.reset();
        setImages([]);
      } else {
        toast(result.message || "Failed to create product.");
      }
    });
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newFiles]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeTag = (tag: string) => {
    const currentTags = form.getValues("tags");
    form.setValue(
      "tags",
      currentTags.filter((t) => t !== tag),
    );
    form.trigger("tags");
  };

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {formState.message && !formState.success && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{formState.message}</AlertDescription>
          </Alert>
        )}

        {formState.success && (
          <Alert>
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
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormDescription>Product&apos;s title</FormDescription>
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
                  <Input placeholder="product-name-123" {...field} />
                </FormControl>
                <FormDescription>
                  ! Only lowercase letters, numbers, and hyphens.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter product description"
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-3">
          <FormField
            control={form.control}
            name="MRP"
            render={({ field }) => (
              <FormItem>
                <FormLabel>MRP</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <FormField
            control={form.control}
            name="pIndex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Index</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a brand" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {brands?.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id.toString()}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="image-upload" className="text-sm font-medium">
              Product Images
            </label>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <label
                  htmlFor="image-upload"
                  className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Upload className="h-4 w-4" />
                  <span>Upload Images</span>
                  <input
                    id="image-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                <p className="text-muted-foreground text-sm">
                  {images.length} {images.length === 1 ? "file" : "files"}{" "}
                  selected
                </p>
              </div>

              {formState.errors?.images && (
                <p className="text-destructive text-sm">
                  {formState.errors.images[0]}
                </p>
              )}

              {images.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {images.map((file, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-2">
                        <div className="relative aspect-square w-full overflow-hidden rounded-md">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={
                              URL.createObjectURL(file) || "/placeholder.svg"
                            }
                            alt={`Preview ${index}`}
                            className="h-full w-full object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6"
                            onClick={() => removeImage(index)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-muted-foreground mt-1 truncate text-xs">
                          {file.name}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <div className="grid gap-3">
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input
                      placeholder="Type and press space to add tags"
                      value={tagInput}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Check if the last character is a space
                        if (value.endsWith(" ") && value.trim() !== "") {
                          // Add the tag (without the space)
                          const newTag = value.trim();
                          if (newTag) {
                            const currentTags = form.getValues("tags") || [];
                            if (!currentTags.includes(newTag)) {
                              form.setValue("tags", [...currentTags, newTag]);
                              form.trigger("tags");
                            }
                            setTagInput("");
                          }
                        } else {
                          setTagInput(value);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (tagInput.trim() !== "") {
                            const currentTags = form.getValues("tags") || [];
                            if (!currentTags.includes(tagInput.trim())) {
                              form.setValue("tags", [
                                ...currentTags,
                                tagInput.trim(),
                              ]);
                              form.trigger("tags");
                            }
                            setTagInput("");
                          }
                        }
                      }}
                    />
                  </FormControl>
                </div>

                <div className="flex flex-wrap gap-2">
                  {field.value?.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="flex items-center gap-1 px-3 py-1.5"
                    >
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 rounded-full"
                        onClick={() => removeTag(tag)}
                      >
                        <Trash2 className="h-3 w-3" />
                        <span className="sr-only">Remove {tag}</span>
                      </Button>
                    </Badge>
                  ))}
                  {field.value?.length === 0 && (
                    <p className="text-muted-foreground text-sm">
                      No tags added yet
                    </p>
                  )}
                </div>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

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
              "Save Product"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddProductForm;
