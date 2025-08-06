import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '../shadcd/components/ui/button';

interface Props {
  router: ReturnType<typeof useRouter>;
  title: string;
  muted: string;
}

export default function BackChevron({ router, title, muted }: Props) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <Button variant="ghost" onClick={() => router.back()} className="p-2">
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{muted}</p>
      </div>
    </div>
  );
}
