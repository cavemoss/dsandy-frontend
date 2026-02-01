import { RotateCcw, Shield, Truck } from 'lucide-react';

export function ProductTrustBudges() {
  return (
    <div className="grid grid-cols-3 gap-4 py-3">
      <div className="text-center space-y-2">
        <Truck className="h-8 md:w-8 mx-auto text-primary" />
        <div className="text-xs md:text-sm">
          <div className="font-medium">Free Shipping</div>
          <div className=" text-muted-foreground">Worldwide Shipping</div>
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
          <div className="font-medium">30-Day Returns</div>
          <div className="text-muted-foreground">Money back guarantee</div>
        </div>
      </div>
    </div>
  );
}
