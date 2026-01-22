import { ChevronsUpDown, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

import { isoToFlag } from '@/widgets/init';

import { PhoneFormat, phoneFormats } from '../lib/const';
import { InputModel } from '../lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../shadcd/components/ui/dropdown-menu';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '../shadcd/components/ui/input-group';
import { Label } from '../shadcd/components/ui/label';

interface Params {
  className?: string;
  model: InputModel;
  setValid: React.Dispatch<React.SetStateAction<boolean>>;
  onReset: () => void;
  label?: string | React.ReactNode;
  disabled?: boolean;
  withIcon?: boolean;
}

export function LabeledPhoneInput(params: Params) {
  const [phoneFormat, setPhoneFormat] = useState<PhoneFormat>(phoneFormats[0]);

  const { mask, code, placeholder } = phoneFormat;
  const initialValue = params.model.value as string;

  const model: InputModel = {
    ...params.model,

    value: applyMask(initialValue.slice(code.length)).slice(code.length + 1),
    onChange,
  };

  function applyMask(value: string) {
    value = value.slice().replace(/\D/g, '');

    let index = 0;
    const result: string[] = [];

    for (let i = 0; i < mask.length; i++) {
      if (!value[index]) break;
      result[i] = mask[i] === '#' ? value[index++] : mask[i];
    }

    return code + ' ' + result.join('');
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const phoneFormat = phoneFormats.find(({ code }) => event.target.value.startsWith(code));

    if (phoneFormat) {
      setPhoneFormat(phoneFormat);
      event.target.value = event.target.value.slice(phoneFormat.code.length);
    }

    const value = (event.target.value = applyMask(event.target.value));

    const isValid = value.length <= code.length + 1 || value.length === code.length + mask.length + 1;

    params.setValid(isValid);
    params.model.onChange(event);
  }

  function onChangeCode(index: number) {
    setPhoneFormat(phoneFormats[index]);
    params.onReset();
  }

  useEffect(() => {
    if (!initialValue) return;

    const phoneFormat = phoneFormats.find(({ code }) => initialValue.startsWith(code)) ?? phoneFormats[0];
    setPhoneFormat(phoneFormat);
  }, []);

  // Template

  const errorInput = 'border-destructive ring-destructive/20 dark:ring-destructive/40 ring-[3px]';
  const errorLabel = 'text-destructive/55';

  const mainNode = (
    <>
      <InputGroup className={model.error ? errorInput : ''}>
        <InputGroupInput
          id={model.id}
          type={model.type}
          value={model.value}
          onChange={model.onChange}
          placeholder={placeholder}
        />
        {params.withIcon && (
          <InputGroupAddon>
            <Phone />
          </InputGroupAddon>
        )}
        <InputGroupAddon>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton variant="secondary">
                {code} <ChevronsUpDown className="size-3" />
              </InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-60 ">
              {phoneFormats.map(({ code, iso }, index) => (
                <DropdownMenuItem onClick={() => onChangeCode(index)} key={index}>
                  <span className="text-lg">{isoToFlag(iso)}</span>
                  <span>{code}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
      {model.error && <div className={`text-xs -mt-1 ${errorLabel}`}>{model.error}</div>}
    </>
  );

  if (params.label)
    return (
      <div className={params.className}>
        <div className="space-y-2">
          {!!params.label && (
            <Label className={model.error ? errorLabel : ''} htmlFor={model.id}>
              {params.label}
            </Label>
          )}
          {mainNode}
        </div>
      </div>
    );

  return <div className={params.className}>{mainNode}</div>;
}
