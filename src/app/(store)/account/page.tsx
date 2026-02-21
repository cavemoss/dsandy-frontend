import { Card, CardHeader } from '@shadcd/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shadcd/tabs';
import { MapPin, Package, Settings } from 'lucide-react';

import { CustomerAccountSettings } from '@/entities/customers/ui/AccountSettings';
import CustomerOrderHistory from '@/entities/customers/ui/OrderHistory';
import CustomerProfileCard from '@/entities/customers/ui/ProfileCard';
import BackChevron from '@/shared/components/BackChevron';

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <BackChevron title="My Account" desc="Manage your profile and preferences" />

        <div className="grid lg:grid-cols-4 gap-6">
          <CustomerProfileCard />

          <Card className="lg:col-span-3">
            <Tabs defaultValue="orders" className="space-y-6">
              <CardHeader>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="orders">
                    <Package /> <span className="hidden md:block">Order History</span>
                  </TabsTrigger>
                  <TabsTrigger disabled value="addresses">
                    <MapPin /> <span className="hidden md:block">Addresses</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings">
                    <Settings /> <span className="hidden md:block">Settings</span>
                  </TabsTrigger>
                </TabsList>
              </CardHeader>

              <TabsContent value="orders" className="mb-0">
                <CustomerOrderHistory />
              </TabsContent>

              <TabsContent value="settings" className="mb-0">
                <CustomerAccountSettings />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
