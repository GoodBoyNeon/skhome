"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useNavigation } from "./NavigationProvider";

interface BreadcrumbProps {
  productName?: string;
  categoryName?: string;
  brandName?: string;
}

export function DynamicBreadcrumb({
  productName,
  categoryName,
  brandName,
}: BreadcrumbProps) {
  const pathname = usePathname();
  const { history } = useNavigation();

  const getBreadcrumbItems = () => {
    const currentPathIndex = history.findIndex(
      (item) => item.path === pathname,
    );

    if (currentPathIndex === -1) {
      // Default breadcrumb when no history is available
      return [
        { displayName: "Home", href: "/", isLast: false },
        { displayName: "Products", href: "/products", isLast: false },
        {
          displayName: productName || "Product",
          href: pathname,
          isLast: true,
        },
      ];
    }

    const relevantHistory = history.slice(0, currentPathIndex + 1);

    return relevantHistory.map((item, index) => {
      const isLast = index === relevantHistory.length - 1;

      let displayName = "Home";
      if (item.path !== "/") {
        if (item.referrer === "category" && categoryName) {
          displayName = categoryName;
        } else if (item.referrer === "brand" && brandName) {
          displayName = brandName;
        } else {
          // Extract name from path as fallback
          const segments = item.path.split("/").filter(Boolean);
          displayName = segments[segments.length - 1]
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());
        }
      }

      // For product pages, use the product name
      if (isLast && productName) {
        displayName = productName;
      }

      return {
        displayName,
        href: item.path,
        isLast,
      };
    });
  };

  const breadcrumbItems = getBreadcrumbItems();

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage>{item.displayName}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.displayName}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
