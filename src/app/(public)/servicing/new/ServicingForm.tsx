"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { capitalize } from "@/lib/capitalize";
import {
  ServicingBookingFormFields,
  ServicingBookingFormSchema,
} from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplianceType } from "@/generated/prisma";
import axios from "axios";
import {
  ArrowRight,
  Check,
  ChevronsUpDown,
  CirclePlus,
  Loader2,
  X,
} from "lucide-react";
import { redirect } from "next/navigation";
import { Fragment, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const appliancesList = Object.keys(ApplianceType).map((appliance) => ({
  value: appliance,
  label: capitalize(appliance.replace(/_/g, " "), "title"),
}));

const ServicingForm = () => {
  const form = useForm<ServicingBookingFormFields>({
    resolver: zodResolver(ServicingBookingFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      appliances: [{ applianceType: "", brand: "" }],
      phone: "",
      address: "",
      city: "",
      appartment: "",
      postalCode: "",
    },
  });
  const { handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "appliances",
  });

  async function onSubmit(values: ServicingBookingFormFields) {
    const resp = await axios.post("/api/book_servicing", values);

    const data = resp.data as unknown;

    if (
      resp.status !== 200 ||
      !data ||
      typeof data !== "object" ||
      !("bookingId" in data) ||
      typeof data.bookingId !== "string"
    ) {
      return "An unexpected error occured!";
    }

    redirect(`/servicing/confirmed?bookingId=${data.bookingId}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h2 className="mb-4 text-xl font-semibold">Contact</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">Location</h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="appartment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Apartment, suite, street, etc. (optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="postal code (optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">Select Appliance(s)</h2>
          <div className="flex flex-col gap-2">
            <div className="w-full space-y-2">
              {fields.map((field, index) => (
                <Fragment key={field.id}>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-1 gap-2">
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name={`appliances.${index}.applianceType`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <ApplianceSelector
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        {form.formState.errors.appliances && (
                          <p className="text-destructive text-sm font-medium">
                            {
                              form.formState.errors.appliances[index]
                                ?.applianceType?.message
                            }
                          </p>
                        )}
                      </div>

                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name={`appliances.${index}.brand`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="The Brand of appliance..."
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        {form.formState.errors.appliances && (
                          <p className="text-destructive text-sm font-medium">
                            {
                              form.formState.errors.appliances[index]?.brand
                                ?.message
                            }
                          </p>
                        )}
                      </div>
                    </div>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="h-10 w-10 shrink-0 cursor-pointer"
                      >
                        <X className="size-4" />
                      </Button>
                    )}
                  </div>
                  {/* {form.formState.errors.appliances && ( */}
                  {/*   <> */}
                  {/*     <p className="text-destructive text-sm font-medium"> */}
                  {/*       { */}
                  {/*         form.formState.errors.appliances[index]?.brand */}
                  {/*           ?.message */}
                  {/*       } */}
                  {/*     </p> */}
                  {/*   </> */}
                  {/* )} */}
                </Fragment>
              ))}
            </div>
            <Button
              variant={"outline"}
              type="button"
              size={"lg"}
              onClick={() => append({ applianceType: "", brand: "" })}
              className="cursor-pointer gap-2 border-dashed border-gray-600 py-6 text-gray-600"
            >
              <CirclePlus className="size-5" /> Add More
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="group w-full cursor-pointer gap-1.5 py-6 text-lg"
        >
          Book Servicing{" "}
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <ArrowRight
              size={24}
              className="transition delay-0 duration-200 ease-out group-hover:translate-x-1.5"
            ></ArrowRight>
          )}
        </Button>
      </form>
    </Form>
  );
};

interface ApplianceSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

function ApplianceSelector({ value, onChange }: ApplianceSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? appliancesList.find((appliance) => appliance.value === value)
                  ?.label
              : "Select appliance..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search appliance..." />
            <CommandList>
              <CommandEmpty>No appliance found.</CommandEmpty>
              <CommandGroup>
                {appliancesList.map((appliance) => (
                  <CommandItem
                    key={appliance.value}
                    value={appliance.value}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === appliance.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {appliance.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ServicingForm;
