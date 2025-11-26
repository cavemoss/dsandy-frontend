import { InputGroup, InputGroupAddon, InputGroupInput } from '@shadcd/input-group';
import { Label } from '@shadcd/label';
import React from 'react';

import { InputModel } from '../lib/types';

interface Params {
  className?: string;
  model: InputModel;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export default function LabeledInput({ model, label, placeholder, disabled, icon, className }: Params) {
  const node = (
    <InputGroup>
      <InputGroupInput {...model} placeholder={placeholder} disabled={disabled} />
      <InputGroupAddon>{icon}</InputGroupAddon>
    </InputGroup>
  );

  if (label)
    return (
      <div className={className}>
        <div className="space-y-2">
          {!!label && <Label htmlFor={model.id}>{label}</Label>}
          {node}
        </div>
      </div>
    );

  return <div className={className}>{node}</div>;
}
