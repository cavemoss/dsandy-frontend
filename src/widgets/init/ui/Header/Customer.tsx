import { Avatar, AvatarFallback, AvatarImage } from '@shadcd/avatar';
import { Button } from '@shadcd/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@shadcd/dropdown-menu';
import { Archive, LogIn, User, UserPlus } from 'lucide-react';

import { CustomerInfoDTO } from '@/api/entities';
import { DialogEnum, useDialogsStore } from '@/widgets/dialogs';

import { useNavStore } from '../../model';

interface Params {
  info?: CustomerInfoDTO;
}

export default function Customer({ info }: Params) {
  const navStore = useNavStore();
  const dialogsStore = useDialogsStore();

  const avatarFallback = `${info?.firstName[0]?.toUpperCase()}${info?.lastName[0]?.toUpperCase()}`;

  return (
    <>
      {info ? (
        <Button variant="ghost" className="pr-1" onClick={() => navStore.push('/account')}>
          <span className="text-gray-600">
            {info.firstName} {info.lastName}
          </span>

          <Avatar>
            <AvatarImage src="https://github.com/shadcn.pngs" alt="@shadcn" />
            <AvatarFallback>
              <span className="text-gray-600">{avatarFallback}</span>
            </AvatarFallback>
          </Avatar>
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => dialogsStore.toggleDialog(DialogEnum.LOGIN)}>
              <LogIn /> Sign In
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => dialogsStore.toggleDialog(DialogEnum.SIGNUP)}>
              <UserPlus /> Create Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navStore.push('/orders')}>
              <Archive /> My Orders
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
