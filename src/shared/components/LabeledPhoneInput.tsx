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
  const masks: string[] = ['+7 (###) ###-##-##', '+34 (###) ####-####', '+4 (123) ###-####'];

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const t = event.target;

    let flag = false;

    const mask =
      masks.find((m) => {
        const vd = t.value.replace(/\D/g, '');
        const md = m.replace(/\D/g, '');

        if (vd.startsWith(md)) {
          flag = vd === md;
          return true;
        }
      }) ?? '####';

    const code = mask.slice(0, Math.max(mask.indexOf('#'), 0));

    if (flag && t.value != code) {
      t.value = code;
      return params.model.onChange(event);
    }

    const idx = t.value.length < code.length ? 0 : code.length;

    t.value = [...t.value]
      .slice(idx)
      .filter((char) => /^\d+$/.test(char))
      .join('');

    let index = 0;
    const m = [...mask];
    const result: string[] = [];

    for (let i = 0; i < m.length; i++) {
      if (!t.value[index]) break;
      result[i] = m[i] === '#' ? t.value[index++] : m[i];
    }

    t.value = result.join('');
    params.model.onChange(event);
  };

  const model: InputModel = { ...params.model, onChange };

  return <LabeledInput {...params} icon={params.withIcon && <Phone />} model={model} />;
}
