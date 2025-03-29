import React, { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { Input } from "./ui/input";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { monoFont } from "@/app/fonts";

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
  const updateButtonVariants = cva("cursor-pointer", {
    variants: {
      size: {
        sm: "h-6 w-6 px-1",
        md: "h-8 w-8 px-2",
      },
    },
  });
  const inputVariants = cva(
    cn(
      monoFont.className,
      "text-center rounded-none bg-white border-none focus:outline-hidden outline-none focus:outline-none",
    ),
    {
      variants: {
        size: {
          sm: "h-6 w-8",
          md: "h-8 w-10",
        },
      },
    },
  );
  return (
    <div className="flex gap-0.5">
      <Button
        variant={"secondary"}
        // className="h-8 w-8 px-2 cursor-pointer"
        className={updateButtonVariants({ size })}
        disabled={quantity < 2}
        onClick={decOnClick}
      >
        <Minus />
      </Button>
      <Input
        type="number"
        // className="w-10 text-center h-8 font-mono rounded-none bg-white border-none focus:outline-hidden outline-none focus:outline-none"
        className={inputVariants({ size })}
        value={quantity}
        onChange={onChange}
      ></Input>
      <Button
        variant={"secondary"}
        // className="h-8 w-8 px-2 cursor-pointer"
        className={updateButtonVariants({ size })}
        onClick={incOnClick}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default QuantityInput;
