import { useState } from 'react';

import { SelectOption } from '@/shared/lib/types';
import { Model } from '@/shared/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/shadcd/components/ui/accordion';
import { useInitStore } from '@/widgets/init';

export default function ParamsSelectMobile() {
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

  return (
    <Accordion type="single" collapsible className="w-full rounded-lg border shadow-md">
      <AccordionItem value="content" className="border-b px-4 last:border-b-0">
        <AccordionTrigger>
          {currentCountry.name} ({viewerParams.currency})
        </AccordionTrigger>

        <AccordionContent className="space-y-4"></AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
