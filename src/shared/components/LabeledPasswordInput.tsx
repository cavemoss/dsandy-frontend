import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@shadcd/input-group';
import { Label } from '@shadcd/label';
import { Eye, EyeOff, Lock } from 'lucide-react';
import React, { useState } from 'react';

import { InputModel } from '../lib/types';

interface Params {
  className?: string;
  model: InputModel;
  label?: string | React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
}

export default function LabeledPasswordInput({ model, label, placeholder, disabled, className }: Params) {
  const [shown, setShown] = useState(false);

  const errorInput = 'border-destructive ring-destructive/20 dark:ring-destructive/40 ring-[3px]';
  const errorLabel = 'text-destructive/55';

  const node = (
    <>
      <InputGroup className={model.error ? errorInput : ''}>
        <InputGroupInput {...model} type={shown ? 'text' : 'password'} placeholder={placeholder} disabled={disabled} />
        <InputGroupAddon>
          <Lock />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupButton onClick={() => setShown(!shown)}>{shown ? <Eye /> : <EyeOff />}</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      {model.error && <div className={`text-xs -mt-1 ${errorLabel}`}>{model.error}</div>}
    </>
  );

  if (label)
    return (
      <div className={className}>
        <div className="space-y-2">
          {!!label && (
            <Label className={model.error ? errorLabel : ''} htmlFor={model.id}>
              {label}
            </Label>
          )}
          {node}
        </div>
      </div>
    );

  return <div className={className}>{node}</div>;
}
