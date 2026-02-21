import dayjs from 'dayjs';
import { CheckCircle, Clock } from 'lucide-react';

import { OrderDTO, OrderStatus } from '@/api/entities';
import { cn } from '@/shared/shadcd/lib/utils';

interface Params {
  order: OrderDTO;
}

export function OrderTrackingStages({ order }: Params) {
  const { trackingData } = order;

  if (!trackingData) return;

  const deliveryDate = dayjs(order.createdAt).add(trackingData.deliveryDays, 'days').format('MMM D YYYY');

  const stages = [...trackingData.stages];

  if (order.status == OrderStatus.TO_BE_SHIPPED) {
    stages.unshift({
      name: 'Order Complete',
      description: `Expected delivery on ${deliveryDate}`,
      timestamp: 0,
    });
  }

  return (
    <div className="relative overflow-y-auto max-h-[60vh] ">
      {stages.map((step, index) => (
        <div key={index} className="relative flex gap-4 pb-8 last:pb-0">
          {/* Timeline line */}
          {index != stages.length - 1 && (
            <div
              className={cn('absolute left-3.75 top-8 w-0.5 h-full', step.timestamp ? 'bg-green-500' : 'bg-gray-300')}
            />
          )}

          {/* Step icon */}
          <div className="relative flex items-center z-10 shrink-0">
            {step.timestamp ? (
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            ) : (
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-neutral-500" />
              </div>
            )}
          </div>

          {/* Step content */}
          <div className="flex-1 pt-1">
            <p className="text-xs text-muted-foreground">
              {step.timestamp ? dayjs(step.timestamp).format('MMM D YYYY') : '...'}
            </p>
            <p className={cn('font-semibold', step.timestamp ? 'text-gray-900' : 'text-gray-600')}>{step.name}</p>
            <p className="text-sm text-neutral-600">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
