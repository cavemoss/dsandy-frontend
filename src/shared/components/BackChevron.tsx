'use client';

import { Button } from '@shadcd/button';
import { ArrowLeft } from 'lucide-react';
import { ReactNode } from 'react';

import { useNavStore } from '@/widgets/init';

interface Props {
  title: ReactNode | string;
  desc: ReactNode | string;
  addon?: ReactNode;
}

export default function BackChevron({ title, desc: muted, addon }: Props) {
  const navStore = useNavStore();

  return (
    <div className="flex items-center gap-4 mb-8">
      <Button variant="ghost" onClick={() => navStore.back()} className="p-2">
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="flex items-center gap-2">
          <p className="text-muted-foreground">{muted}</p>
          {addon}
        </div>
      </div>
    </div>
  );
}
