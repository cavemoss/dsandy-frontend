import { Minus, Plus } from 'lucide-react';

import { Button } from '../shadcd/components/ui/button';

interface Params {
  value: number;
  setter: (amount: number) => void;
  step?: number;
  min?: number;
}

export default function Counter({ value, setter, min = 1, step = 1 }: Params) {
  return (
    <div className="flex items-center border rounded-md p-1">
      <Button variant="ghost" size="sm" disabled={value <= min} onClick={() => setter(-step)}>
        <Minus />
      </Button>
      <span className="px-4 min-w-[3rem] text-center">{value}</span>
      <Button variant="ghost" size="sm" onClick={() => setter(step)}>
        <Plus />
      </Button>
    </div>
  );
}
