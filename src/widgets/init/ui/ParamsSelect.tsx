import { useState } from 'react';

import SelectSearchable from '@/shared/components/SelectSerachable';
import { SelectOption } from '@/shared/lib/types';
import { Button } from '@/shared/shadcd/components/ui/button';
import { CardDescription, CardHeader, CardTitle } from '@/shared/shadcd/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/shadcd/components/ui/popover';

import { useInitStore } from '../model';

export default function ParamsSelect() {
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    setOpen(false);
  };

  const initStore = useInitStore.getState();

  const viewerParams = useInitStore((s) => s.viewerParams);
  const countries = initStore.getAvailableCountries();
  const currentCountry = countries.find((c) => c.code === viewerParams.country)!;

  const countryOptions: SelectOption[] = countries.map((c) => ({
    value: c.code,
    label: c.name,
    icon: <span className="text-xl">{c.flag}</span>,
  }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-[200px]">
        <Button variant="outline" className="flex items-center gap-2 px-3 py-1.5 rounded-md">
          <span className="text-xl">{currentCountry.flag}</span>
          <p className="truncate">
            {currentCountry.name} ({viewerParams.currency})
          </p>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 space-y-4" align="end">
        <CardHeader className="p-0">
          <CardTitle>Order Summary</CardTitle>
          <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit.</CardDescription>
        </CardHeader>

        <SelectSearchable
          options={countryOptions}
          onSelect={(value) => initStore.setState((s) => (s.viewerParams.country = value))}
          value={currentCountry.code}
          icon={<span className="text-xl">{currentCountry.flag}</span>}
          label="Select country"
        />

        <Button onClick={handleSave} className="w-full">
          Save Preferences
        </Button>
      </PopoverContent>
    </Popover>
  );
}
