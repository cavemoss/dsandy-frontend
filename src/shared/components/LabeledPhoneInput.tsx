import { Phone } from 'lucide-react';
import React from 'react';

import { InputModel } from '../lib/types';
import LabeledInput from './LabeledInput';

interface Params {
  className?: string;
  model: InputModel;
  label?: string | React.ReactNode;
  disabled?: boolean;
  withIcon?: boolean;
}

export function LabeledPhoneInput(params: Params & { mask?: string }) {
  const { mask = '+1 (###) ###-####' } = params;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const t = event.target;
    t.value = [...t.value]
      .slice(t.value.indexOf(' '))
      .filter((char) => /^\d+$/.test(char))
      .join('');

    let index = 0;
    const ptr = [...mask];
    const result: string[] = [];

    for (let i = 0; i < ptr.length; i++) {
      if (!t.value[index]) break;
      result[i] = ptr[i] === '#' ? t.value[index++] : ptr[i];
    }

    t.value = result.join('');
    params.model.onChange(event);
  };

  const model: InputModel = { ...params.model, onChange };

  return <LabeledInput {...params} icon={params.withIcon && <Phone />} model={model} placeholder={mask} />;
}
