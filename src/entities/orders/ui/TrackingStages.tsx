import dayjs from 'dayjs';
import { CheckCircle, Clock } from 'lucide-react';

import { OrderDTO } from '@/api/entities';

interface Params {
  order: OrderDTO;
}

export default function OrderTrackingStages({ order }: Params) {
  if (!order.trackingData?.stages) return;

  const stages = [
    {
      name: 'Order Complete',
      description: '',
      timestamp: '',
    },
    ...order.trackingData.stages,
  ];

  return (
    <div className="relative">
      {stages.map((step, index) => (
        <div key={index} className="relative flex gap-4 pb-8 last:pb-0">
          {/* Timeline line */}
          {index !== stages.length - 1 && (
            <div
              className={`absolute left-3.75 top-8 w-0.5 h-full ${step.timestamp ? 'bg-green-500' : 'bg-gray-300'}`}
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
                <Clock className="w-5 h-5 text-gray-500" />
              </div>
            )}
          </div>

          {/* Step content */}
          <div className="flex-1 pt-1">
            <p className="text-xs text-muted-foreground">
              {step.timestamp && dayjs(step.timestamp).format('MMM D YYYY')}
            </p>
            <p className={`font-semibold  ${step.timestamp ? 'text-gray-900' : 'text-gray-600'}`}>{step.name}</p>
            <p className="text-sm text-gray-600">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
