import { Button } from '@shadcd/button';
import { Input } from '@shadcd/input';
import { Label } from '@shadcd/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shadcd/select';
import { Eye, EyeOff, Lock, Phone } from 'lucide-react';
import React, { useState } from 'react';

import { InputModel, SelectModel, SelectOption } from '../lib/types';

interface Params {
  model: InputModel;
  label: string;
  placeholder?: string;
  disabled?: boolean;
}

interface LabeledInputParams extends Params {
  children?: React.ReactNode;
}

interface LabeledPasswordInputParams extends Params {
  children?: React.ReactNode;
}

interface LabeledSelectParams {
  model: SelectModel;
  label?: string | React.ReactNode;
  placeholder?: string;
  options: SelectOption[];
  disabled?: boolean;
}

export function LabeledInput({ model, label, placeholder, disabled, children: icon }: LabeledInputParams) {
  return (
    <div className="space-y-2">
      <Label htmlFor={model.id}>{label}</Label>
      {!!icon ? (
        <div className="relative">
          {icon}
          <Input
            {...model}
            disabled={disabled}
            placeholder={placeholder}
            className={`pl-10 ${
              model.error && 'border-destructive ring-destructive/20 dark:ring-destructive/40 ring-[3px]'
            }`}
          />
        </div>
      ) : (
        <Input
          {...model}
          placeholder={placeholder}
          className={`${model.error && 'border-destructive ring-destructive/20 dark:ring-destructive/40 ring-[3px]'}`}
        />
      )}
      {model.error && <p className={`text-xs ${model.error && 'text-destructive/60'}`}>{model.error}</p>}
    </div>
  );
}

export function LabeledPhoneInput(params: LabeledInputParams & { mask?: string }) {
  const { mask = '+1 (###)###-####' } = params;

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

  return (
    <LabeledInput {...params} model={model}>
      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </LabeledInput>
  );
}

export function LabeledPasswordInput({ model, label, placeholder }: LabeledPasswordInputParams) {
  const [shown, setShown] = useState(false);

  return (
    <div className="space-y-2">
      <Label htmlFor={model.id}>{label}</Label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          {...model}
          type={shown ? 'text' : 'password'}
          placeholder={placeholder}
          className={`pl-10 pr-10 ${
            model.error && 'border-destructive ring-destructive/20 dark:ring-destructive/40 ring-[3px]'
          }`}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3"
          onClick={() => setShown(!shown)}
        >
          {shown ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </Button>
      </div>
      {model.error && <p className={`text-xs ${model.error && 'text-destructive/60'}`}>{model.error}</p>}
    </div>
  );
}

export function LabeledSelect({ model, options, label, placeholder, disabled }: LabeledSelectParams) {
  return (
    <div className="space-y-2 flex-1">
      {label && <Label>{label}</Label>}
      <Select {...model}>
        <SelectTrigger className="w-full" disabled={disabled}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-[300px] overflow-y-auto">
          {options.map(({ value, label }, index) => (
            <SelectItem value={value} key={index}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
