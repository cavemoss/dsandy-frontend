'use client';

import { RotateCcw, Shield, Truck } from 'lucide-react';

import { formatPrice, useInitStore } from '@/widgets/init';

export function ProductTrustBudges() {
  const policies = useInitStore((state) => state.subdomain.config.policies);

  return (
    <div className="grid grid-cols-3 gap-4 py-3">
      <div className="text-center space-y-2">
        <Truck className="h-8 md:w-8 mx-auto text-primary" />
        <div className="text-xs md:text-sm">
          <div className="font-medium">Free Shipping</div>
          <div className=" text-muted-foreground">
            On orders over {formatPrice(policies.freeShippingCap, undefined, 0)}
          </div>
        </div>
      </div>
      <div className="text-center space-y-2">
        <Shield className="h-8 md:w-8 mx-auto text-primary" />
        <div className="text-xs md:text-sm">
          <div className="font-medium">Secure Payment</div>
          <div className="text-muted-foreground">Powered by Stripe</div>
        </div>
      </div>
      <div className="text-center space-y-2">
        <RotateCcw className="h-8 md:w-8 mx-auto text-primary" />
        <div className="text-xs md:text-sm">
          <div className="font-medium">{policies.returnDays}-Day Returns</div>
          <div className="text-muted-foreground">Money back guarantee</div>
        </div>
      </div>
    </div>
  );
}
