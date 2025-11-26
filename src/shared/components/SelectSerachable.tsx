import { Button } from '@shadcd/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@shadcd/command';
import { Label } from '@shadcd/label';
import { Popover, PopoverContent, PopoverTrigger } from '@shadcd/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import React, { useState } from 'react';

import { SelectOption } from '../lib/types';
import { cn } from '../shadcd/lib/utils';

interface Params {
  options: SelectOption[];
  value: string;
  onSelect: (value: string) => void;
  label?: string;
  icon?: React.ReactNode;
}

export default function SelectSearchable({ options, value, onSelect, icon, label }: Params) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-1">
      {label && <Label className="text-sm">{label}</Label>}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between w-full">
            {icon}
            {value ? options.find((opt) => opt.value === value)?.label : 'Select country...'}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0">
          <Command>
            <CommandInput accessKey="label" placeholder="Search..." className="h-9" />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {options.map((opt, idx) => (
                  <CommandItem key={idx} value={opt.value} onSelect={onSelect}>
                    {opt.icon}
                    {opt.label}
                    <Check className={cn('ml-auto', value === opt.value ? 'opacity-100' : 'opacity-0')} />
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
