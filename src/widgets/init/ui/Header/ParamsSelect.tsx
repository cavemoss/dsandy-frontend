import { Button } from '@shadcd/button';
import { CardDescription, CardHeader, CardTitle } from '@shadcd/card';
import { Popover, PopoverContent, PopoverTrigger } from '@shadcd/popover';
import { Spinner } from '@shadcd/spinner';
import { useState } from 'react';

import { LabeledSelect } from '@/shared/components/form';
import SelectSearchable from '@/shared/components/SelectSearchable';
import { SelectOption } from '@/shared/lib/types';
import { Model } from '@/shared/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/shadcd/components/ui/accordion';
import { cn } from '@/shared/shadcd/lib/utils';
import { useInitStore } from '@/widgets/init';

import { localeOptions } from '../../lib/init.const';

interface Params {
  mobile?: boolean;
  className?: string;
}

export default function ParamsSelect({ className, mobile }: Params) {
  const [open, setOpen] = useState(false);

  const initStore = useInitStore.getState();
  const model = new Model(initStore);

  const viewerParams = useInitStore((s) => s.viewerParams);
  const [isSaving, setIsSaving] = useState(false);

  const countries = initStore.getAvailableCountries();
  const currencies = initStore.getAvailableCurrencies();
  const currentCountry = initStore.getCurrentCountry();
  const isChanged = initStore.areViewerParamsChanged();

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

  const onSelectCountry = () => {
    initStore.setState((s) => {
      s.viewerParamsModel.currency = initStore.getAvailableCurrencies()[0].code;
      s.viewerParamsModel.language = 'en';
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    await initStore.saveViewerParams();
  };

  const node = (
    <>
      <CardHeader className="p-0">
        {!mobile && <CardTitle>User Preferences</CardTitle>}
        <CardDescription>
          Select your country and currency. Your selections will be saved for future visits.
        </CardDescription>
      </CardHeader>

      <SelectSearchable
        options={countryOptions}
        model={model.newSelect((s) => s.viewerParamsModel, 'country')}
        icon={<span className="text-xl">{currentCountry.flag}</span>}
        label={<>Shipping to</>}
        onChange={onSelectCountry}
      />
      <LabeledSelect
        model={model.newSelect((s) => s.viewerParamsModel, 'currency')}
        options={currencyOptions}
        label={<>Currency</>}
      />
      <LabeledSelect
        model={model.newSelect((s) => s.viewerParamsModel, 'language')}
        options={localeOptions}
        label={<>Language</>}
      />
      <Button onClick={handleSave} disabled={isSaving || !isChanged} className="w-full">
        {isSaving && <Spinner />}
        Save Preferences
      </Button>
    </>
  );

  return (
    <>
      {mobile ? (
        <Accordion type="single" collapsible className="w-full rounded-lg border shadow-md">
          <AccordionItem value="content" className="border-b px-4 last:border-b-0">
            <AccordionTrigger>
              {currentCountry.name} ({viewerParams.currency})
            </AccordionTrigger>

            <AccordionContent className="space-y-4">{node}</AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild className="w-full md:w-50">
            <Button variant="outline" className={cn('flex items-center gap-2 px-3 py-1.5 rounded-md', className)}>
              <span className="text-xl">{currentCountry.flag}</span>
              <p className="truncate">
                {currentCountry.name} ({viewerParams.currency})
              </p>
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-80 space-y-4" align="end">
            {node}
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
