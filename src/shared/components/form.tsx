import { InputModel, SelectModel } from '../lib/types';
import { Input } from '../shadcd/components/ui/input';
import { Label } from '../shadcd/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../shadcd/components/ui/select';

interface LabeledInputParams {
  model: InputModel;
  label: string;
  placeholder: string;
}

interface LabeledSelectParams {
  model: SelectModel;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
}

export function LabeledInput({ model, label, placeholder }: LabeledInputParams) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={model.id}>{label}</Label>
      <Input placeholder={placeholder} {...model} />
    </div>
  );
}

export function LabeledSelect({ model, options, label, placeholder }: LabeledSelectParams) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Select {...model}>
        <SelectTrigger className="w-full">
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
