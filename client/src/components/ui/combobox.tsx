"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { CourseTag } from "@server/shared/types";

import { cn, courseTagToString } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MultiSelectProps {
  value: CourseTag[];
  onChange: (value: CourseTag[]) => void;
}

export function TagsCombobox({ value, onChange }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const tags = Object.values(CourseTag).map((tag) => ({
    value: tag,
    label: courseTagToString(tag),
  }));

  const selectedTags = value.map((tag) => ({
    value: tag,
    label: courseTagToString(tag),
  }));

  const placeholder =
    selectedTags.length === 0
      ? "Select tags..."
      : `${selectedTags.length} tag(s) selected`;

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Search tags..." />
            <CommandList>
              <CommandEmpty>No tags found.</CommandEmpty>
              <CommandGroup>
                {tags.map((tag) => (
                  <CommandItem
                    key={tag.value}
                    onSelect={() => {
                      const isSelected = value.includes(tag.value as CourseTag);
                      const newValue = isSelected
                        ? value.filter((t) => t !== tag.value)
                        : [...value, tag.value as CourseTag];
                      onChange(newValue);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.includes(tag.value as CourseTag)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />

                    {tag.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <Badge
              key={tag.value}
              variant="secondary"
              className="flex items-center gap-1 p-2"
            >
              {tag.label}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onChange(value.filter((t) => t !== tag.value))}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
