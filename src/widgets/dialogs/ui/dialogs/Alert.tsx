'use client';
import { Button } from '@shadcd/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@shadcd/dialog';

import { DialogEnum, useDialogsStore } from '../..';

export default function AlertBox() {
  const dialogsStore = useDialogsStore();

  const isOpened = useDialogsStore((state) => state[DialogEnum.ALERT]);
  const data = useDialogsStore((state) => state.alertData);

  return (
    <>
      <Dialog open={isOpened} onOpenChange={() => dialogsStore.useAlert()}>
        <DialogContent className="sm:max-w-125">
          <DialogHeader>
            <DialogTitle>{data.title}</DialogTitle>
            <DialogDescription>{data.description}</DialogDescription>
          </DialogHeader>

          <div className="w-full flex flex-col gap-2 sm:flex-row sm:justify-end">
            {data.type == 'info' ? (
              <Button variant="outline" onClick={() => dialogsStore.useAlert()}>
                Cancel
              </Button>
            ) : (
              <>
                <Button className="w-22" variant="outline" onClick={() => dialogsStore.useAlert()}>
                  Cancel
                </Button>
                <Button className="w-22" onClick={() => dialogsStore.toggleDialog(DialogEnum.ALERT)}>
                  Confirm
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
