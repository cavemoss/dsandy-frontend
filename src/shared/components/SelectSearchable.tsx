import { Button } from '@shadcd/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@shadcd/command';
import { Label } from '@shadcd/label';
import { Popover, PopoverContent, PopoverTrigger } from '@shadcd/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import React, { useState } from 'react';

import { SelectModel, SelectOption } from '../lib/types';
import { cn } from '../shadcd/lib/utils';

interface Params {
  model: SelectModel;
  options: SelectOption[];
  label?: React.ReactNode;
  icon?: React.ReactNode;
  onChange?: (value: string) => void;
}

export default function SelectSearchable({ options, model, icon, label, onChange }: Params) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-1">
      {label && <Label className="text-sm">{label}</Label>}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between w-full">
            {icon}
            {model.value ? options.find((opt) => opt.value === model.value)?.label : 'Select country...'}
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
                  <CommandItem key={idx} value={opt.value} onSelect={(v) => (model.onValueChange(v), onChange?.(v))}>
                    {opt.icon}
                    {opt.label}
                    <Check className={cn('ml-auto', model.value === opt.value ? 'opacity-100' : 'opacity-0')} />
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
