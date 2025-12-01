import { useState } from 'react';

import { LabeledSelect } from '@/shared/components/form';
import SelectSearchable from '@/shared/components/SelectSearchable';
import { SelectOption } from '@/shared/lib/types';
import { Model } from '@/shared/lib/utils';
import { Button } from '@/shared/shadcd/components/ui/button';
import { CardDescription, CardHeader, CardTitle } from '@/shared/shadcd/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/shadcd/components/ui/popover';
import { Spinner } from '@/shared/shadcd/components/ui/spinner';
import { useInitStore } from '@/widgets/init';

export default function ParamsSelect() {
  const [open, setOpen] = useState(false);

  const initStore = useInitStore.getState();
  const model = new Model(initStore);

  const viewerParams = useInitStore((s) => s.viewerParams);
  const [isSaving, setIsSaving] = useState(false);

  const countries = initStore.getAvailableCountries();
  const currencies = initStore.getAvailableCurrencies();
  const currentCountry = initStore.getCurrentCountry();

  const countryOptions: SelectOption[] = countries.map((c) => ({
    value: c.code,
    label: c.name,
    icon: <span className="text-xl">{c.flag}</span>,
  }));

  const currencyOptions: SelectOption[] = currencies.map((el) => ({
    value: el.code,
    label: (
      <>
        {el.code} <span className="text-gray-400">({el.name})</span>
      </>
    ),
  }));

  const localeOptions: SelectOption[] = [
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'es', label: 'Español' },
    { value: 'it', label: 'Italiano' },
  ];

  const onSelectCountry = () => {
    initStore.setState((s) => {
      s.viewerParams.currency = initStore.getAvailableCurrencies()[0].code;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    await initStore.saveViewerParams();
    setIsSaving(false);
    setOpen(false);
  };

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
          <CardTitle>User Preferences</CardTitle>
          <CardDescription>Your selections will be saved for future visits.</CardDescription>
        </CardHeader>

        <SelectSearchable
          options={countryOptions}
          model={model.select((s) => s.viewerParams, 'country')}
          icon={<span className="text-xl">{currentCountry.flag}</span>}
          label={<>Country</>}
          onChange={onSelectCountry}
        />

        <LabeledSelect
          model={model.select((s) => s.viewerParams, 'currency')}
          options={currencyOptions}
          label={<>Currency</>}
        />

        <LabeledSelect
          model={model.select((s) => s.viewerParams, 'language')}
          options={localeOptions}
          label={<>Language</>}
        />

        <Button onClick={handleSave} disabled={isSaving} className="w-full">
          {isSaving && <Spinner />}
          Save Preferences
        </Button>
      </PopoverContent>
    </Popover>
  );
}
