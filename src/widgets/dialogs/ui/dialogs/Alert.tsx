'use client';

import { Button } from '@shadcd/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@shadcd/dialog';
import { Spinner } from '@shadcd/spinner';
import { useState } from 'react';

import { DialogEnum, useDialogsStore } from '../..';

export default function AlertBox() {
  const dialogs = useDialogsStore();

  const [loading, setLoading] = useState(false);

  const isOpened = useDialogsStore((state) => state[DialogEnum.ALERT]);
  const data = useDialogsStore((state) => state.alertData);
  const alertConfirmAction = useDialogsStore((state) => state.confirmAction);

  const handleConfirm = async () => {
    if (!data.isAsync) {
      return alertConfirmAction();
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    await alertConfirmAction();
    setLoading(false);
  };

  return (
    <>
      <Dialog open={isOpened} onOpenChange={() => dialogs.useAlert()}>
        <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className="sm:max-w-125">
          <DialogHeader>
            <DialogTitle>{data.title}</DialogTitle>
            <DialogDescription>{data.description}</DialogDescription>
          </DialogHeader>

          <div className="w-full flex flex-col sm:flex-row gap-2 sm:justify-end">
            {data.type == 'info' ? (
              <Button variant="outline" onClick={() => dialogs.useAlert()}>
                Cancel
              </Button>
            ) : (
              <>
                <Button className="sm:w-26" variant="outline" onClick={() => dialogs.useAlert()}>
                  Cancel
                </Button>
                <Button
                  variant={data.type == 'destructive' ? 'destructive' : 'default'}
                  className="sm:w-26"
                  disabled={loading}
                  onClick={handleConfirm}
                >
                  {loading ? <Spinner /> : <>Confirm</>}
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
