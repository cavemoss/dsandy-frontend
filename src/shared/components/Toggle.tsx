import { Button } from '@shadcd/button';
import { ClassValue } from 'clsx';

import { cn } from '../shadcd/lib/utils';

interface Props {
  options: {
    value: string | number;
    label: string;
    onClick: () => void;
  }[];
  value: number | string;
  className?: ClassValue;
}

export default function Toggle({ options, value, className }: Props) {
  return (
    <div className={cn('flex gap-1.5 flex-wrap', className)}>
      {options.map((option, index) => (
        <Button
          variant="outline"
          key={index}
          onClick={() => option.onClick()}
          className={cn('shadow-none', option.value == value && 'bg-muted')}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
