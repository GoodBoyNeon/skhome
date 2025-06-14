"use server";

import { prisma } from "@/lib/database";
import {
  UpdateProductFormSchema,
  UpdateProductFormState,
  newBrandFormSchema,
  NewBrandFormState,
  newCategoryFormSchema,
  NewCategoryFormState,
  NewProductFormSchema,
  NewProductFormState,
} from "@/lib/definitions";
import { ServicingBookingStatus } from "@/generated/prisma";
import { del, put } from "@vercel/blob";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createProduct(
  _prevState: NewProductFormState,
  formData: FormData,
): Promise<NewProductFormState> {
  const validatedFields = NewProductFormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    specifications: formData.get("specifications"),
    urlSlug: formData.get("urlSlug"),
    MRP: formData.get("MRP"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    pIndex: formData.get("pIndex"),
    brand: formData.get("brand"),
    category: formData.get("category"),
    tags: JSON.parse((formData.get("tags") as string) || "[]"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create product.",
      success: false,
    };
  }

  const {
    name,
    description,
    specifications,
    urlSlug,
    MRP,
    price,
    stock,
    pIndex,
    brand,
    category,
    tags,
  } = validatedFields.data;

  const existingProduct = await prisma.product.findUnique({
    where: { urlSlug },
  });

  if (existingProduct) {
    return {
      errors: {
        urlSlug: ["A product with this URL slug already exists."],
      },
      message: "Failed to create product.",
      success: false,
    };
  }

  const imageFiles = formData.getAll("images") as File[];

  if (imageFiles.length === 0) {
    return {
      errors: {
        images: ["At least one product image is required."],
      },
      message: "Failed to create product.",
      success: false,
    };
  }

  try {
    const imageUploadPromises = imageFiles.map(async (file, i) => {
      const blob = await put(
        `brand/${urlSlug}-${i}.${file.type.split("/").at(1)}`,
        file,
        {
          access: "public",
        },
      );
      return blob.url;
    });

    const imageUrls = await Promise.all(imageUploadPromises);

    const brandObject = await prisma.brand.findUnique({
      where: { id: parseInt(brand) },
    });

    const categoryObject = await prisma.category.findUnique({
      where: { id: parseInt(category) },
    });

    if (!brandObject) {
      return {
        errors: {
          brand: ["Brand does not exist in database."],
        },
        message: "Failed to create product.",
        success: false,
      };
    }
    if (!categoryObject) {
      return {
        errors: {
          category: ["Category does not exist in database."],
        },
        message: "Failed to create product.",
        success: false,
      };
    }

    await prisma.product.create({
      data: {
        name,
        description,
        specifications,
        urlSlug,
        MRP,
        price,
        stock,
        pIndex,
        tags,
        images: imageUrls,
        brandId: brandObject?.id,
        categoryId: categoryObject?.id,
      },
    });

    revalidateTag("products");
    revalidatePath("/admin/dashboard/products");

    return {
      errors: {},
      message: "Product created successfully!",
      success: true,
    };
  } catch (error) {
    console.error("Failed to create product:", error);
    return {
      errors: {
        _form: ["An unexpected error occurred. Please try again."],
      },
      message: "Database or upload error. Failed to create product.",
      success: false,
    };
  }
}

export async function updateProduct(
  _prevState: UpdateProductFormState,
  formData: FormData,
  productId: number,
): Promise<UpdateProductFormState> {
  const validatedFields = UpdateProductFormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    specifications: formData.get("specifications"),
    urlSlug: formData.get("urlSlug"),
    MRP: formData.get("MRP"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    pIndex: formData.get("pIndex"),
    brand: formData.get("brand"),
    category: formData.get("category"),
    tags: JSON.parse((formData.get("tags") as string) || "[]"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create product.",
      success: false,
    };
  }

  const {
    name,
    description,
    specifications,
    urlSlug,
    MRP,
    price,
    stock,
    pIndex,
    brand,
    category,
    tags,
  } = validatedFields.data;

  try {
    const brandObject = await prisma.brand.findUnique({
      where: { id: parseInt(brand) },
    });

    const categoryObject = await prisma.category.findUnique({
      where: { id: parseInt(category) },
    });

    if (!brandObject) {
      return {
        errors: {
          brand: ["Brand does not exist in database."],
        },
        message: "Failed to update product.",
        success: false,
      };
    }
    if (!categoryObject) {
      return {
        errors: {
          category: ["Category does not exist in database."],
        },
        message: "Failed to update product.",
        success: false,
      };
    }

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        description,
        specifications,
        urlSlug,
        MRP,
        price,
        stock,
        pIndex,
        tags,
        brand: {
          connect: {
            id: brandObject.id,
          },
        },
        category: {
          connect: {
            id: categoryObject.id,
          },
        },
      },
    });

    revalidateTag("products");
    revalidatePath("/admin/dashboard/products");

    return {
      errors: {},
      message: "Product updated successfully!",
      success: true,
    };
  } catch (error) {
    console.error("Failed to update product:", error);
    return {
      errors: {
        _form: ["An unexpected error occurred. Please try again."],
      },
      message: "Database or upload error. Failed to create product.",
      success: false,
    };
  }
}

export async function deleteProduct(productId: number) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { images: true, urlSlug: true },
    });

    if (!product) {
      return {
        success: false,
        message: "Product not found",
      };
    }

    if (product.images && product.images.length > 0) {
      const deletePromises = product.images.map(async (imageUrl) => {
        try {
          const urlParts = new URL(imageUrl);
          const blobPath = urlParts.pathname.substring(1); // Remove leading slash

          await del(blobPath);
        } catch (error) {
          console.error(`Failed to delete image ${imageUrl}:`, error);
        }
      });

      await Promise.all(deletePromises);
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    revalidateTag("products");
    revalidatePath("/admin/dashboard/products");

    return {
      success: true,
      message: "Product deleted successfully",
    };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return {
      success: false,
      message: "Failed to delete product. Please try again.",
    };
  }
}

export async function createCategory(
  _prevState: NewCategoryFormState,
  formData: FormData,
): Promise<NewCategoryFormState> {
  const validatedFields = newCategoryFormSchema.safeParse({
    name: formData.get("name"),
    urlSlug: formData.get("urlSlug"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create category.",
      success: false,
    };
  }

  const { name, urlSlug } = validatedFields.data;

  const existingCategory = await prisma.category.findUnique({
    where: { urlSlug },
  });

  if (existingCategory) {
    return {
      errors: {
        urlSlug: ["A category with this URL slug already exists."],
      },
      message: "Failed to create category.",
      success: false,
    };
  }

  const imageFile = formData.get("image") as File;

  if (!imageFile) {
    return {
      errors: {
        image: ["Category image is required."],
      },
      message: "Failed to create category.",
      success: false,
    };
  }

  try {
    const imageUrl = (
      await put(
        `category/${urlSlug}.${imageFile.type.split("/").at(1)}`,
        imageFile,
        {
          access: "public",
        },
      )
    ).url;

    await prisma.category.create({
      data: {
        name,
        urlSlug,
        image: imageUrl,
      },
    });

    revalidateTag("categories");

    return {
      errors: {},
      message: "Category created successfully!",
      success: true,
    };
  } catch (error) {
    console.error("Failed to create category:", error);
    return {
      errors: {
        _form: ["An unexpected error occurred. Please try again."],
      },
      message: "Database or upload error. Failed to create category.",
      success: false,
    };
  }
}

export async function createBrand(
  _prevState: NewBrandFormState,
  formData: FormData,
): Promise<NewBrandFormState> {
  const validatedFields = newBrandFormSchema.safeParse({
    name: formData.get("name"),
    urlSlug: formData.get("urlSlug"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create brand.",
      success: false,
    };
  }

  const { name, urlSlug } = validatedFields.data;

  const existingBrand = await prisma.brand.findUnique({
    where: { urlSlug },
  });

  if (existingBrand) {
    return {
      errors: {
        urlSlug: ["A brand with this URL slug already exists."],
      },
      message: "Failed to create brand.",
      success: false,
    };
  }

  const imageFile = formData.get("image") as File;

  if (!imageFile) {
    return {
      errors: {
        image: ["Brand image is required."],
      },
      message: "Failed to create brand.",
      success: false,
    };
  }

  try {
    const imageUrl = (
      await put(
        `brand/${urlSlug}.${imageFile.type.split("/").at(1)}`,
        imageFile,
        {
          access: "public",
        },
      )
    ).url;

    await prisma.brand.create({
      data: {
        name,
        urlSlug,
        image: imageUrl,
      },
    });

    revalidateTag("brands");
    return {
      errors: {},
      message: "Brand created successfully!",
      success: true,
    };
  } catch (error) {
    console.error("Failed to create brand:", error);
    return {
      errors: {
        _form: ["An unexpected error occurred. Please try again."],
      },
      message: "Database or upload error. Failed to create brand.",
      success: false,
    };
  }
}

export async function updateBookingStatus(
  _: unknown,
  {
    bookingId,
    newStatus,
  }: { bookingId: string; newStatus: ServicingBookingStatus },
): Promise<unknown> {
  try {
    await prisma.servicingBooking.update({
      where: {
        bookingId,
      },
      data: {
        status: newStatus,
      },
    });

    revalidatePath(`/admin/dashboard/booking/${bookingId}`);
    return { message: "Updated booking status" };
  } catch (err) {
    return { error: "Something went wrong... " + err };
  }
}
