import { monoFont } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Minus, Plus } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const QuantityInput = ({
  quantity,
  incOnClick,
  decOnClick,
  onChange,
  size = "md",
}: {
  quantity: number;
  incOnClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  decOnClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: "sm" | "md";
}) => {
  const updateBtnIconVariants = cva("cursor-pointer", {
    variants: {
      size: {
        sm: "h-3 w-3",
        md: "h-4 w-4",
      },
    },
  });
  const updateButtonVariants = cva("cursor-pointer", {
    variants: {
      size: {
        sm: "h-6 w-6 px-1",
        md: "h-10 w-10 px-2",
      },
    },
  });

  const inputVariants = cva(
    cn(
      monoFont.className,
      "text-center rounded-none bg-background border-none focus:outline-hidden outline-none focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
    ),
    {
      variants: {
        size: {
          sm: "h-6 w-8 text-sm",
          md: "h-12 w-16 text-base",
        },
      },
    },
  );
  return (
    <div className="flex items-center gap-0.5">
      <Button
        variant={"outline"}
        className={updateButtonVariants({ size })}
        size={"icon"}
        disabled={quantity < 2}
        onClick={decOnClick}
      >
        <Minus className={updateBtnIconVariants({ size })} />
      </Button>
      <Input
        type="number"
        className={inputVariants({ size })}
        value={quantity}
        onChange={onChange}
      ></Input>
      <Button
        variant={"outline"}
        onClick={incOnClick}
        className={updateButtonVariants({ size })}
        size={"icon"}
      >
        <Plus className={updateBtnIconVariants({ size })} />
      </Button>
    </div>
  );
};

export default QuantityInput;
