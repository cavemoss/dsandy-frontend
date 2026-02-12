'use client';

import { CardContent } from '@shadcd/card';
import { Switch } from '@shadcd/switch';
import { Bell, ChevronRight, CreditCard, Globe, HelpCircle, Lock, LogOut } from 'lucide-react';

import { useCustomersStore } from '../model';

const settingsItems = [
  {
    id: 'notifications',
    icon: Bell,
    label: 'Notifications',
    description: 'Manage email and push notifications',
    hasToggle: true,
    enabled: true,
  },
  {
    id: 'password',
    icon: Lock,
    label: 'Password & Security',
    description: 'Update password and security settings',
    hasToggle: false,
  },
  {
    id: 'payment',
    icon: CreditCard,
    label: 'Payment Methods',
    description: 'Manage your payment options',
    hasToggle: false,
  },
  {
    id: 'language',
    icon: Globe,
    label: 'Language & Region',
    description: 'English (US)',
    hasToggle: false,
  },
  {
    id: 'help',
    icon: HelpCircle,
    label: 'Help & Support',
    description: 'Get help with your account',
    hasToggle: false,
  },
];

export function CustomerAccountSettings() {
  const customerStore = useCustomersStore();

  return (
    <CardContent className="space-y-2">
      {settingsItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-4 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">{item.label}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </div>

          {item.hasToggle ? (
            <Switch defaultChecked={item.enabled} />
          ) : (
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      ))}

      <div className="pt-4 border-t mt-4" onClick={customerStore.logOut}>
        <div className="flex items-center gap-3 p-4 rounded-lg hover:bg-destructive/10 transition-colors cursor-pointer text-destructive">
          <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
            <LogOut className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium">Log Out</p>
            <p className="text-sm opacity-80">Sign out of your account</p>
          </div>
        </div>
      </div>
    </CardContent>
  );
}
