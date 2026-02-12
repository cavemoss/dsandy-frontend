import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@shadcd/accordion';
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
            <Tabs defaultValue="orders" className="space-y-6 hidden md:block">
              <CardHeader>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="orders">
                    <Package /> Order History
                  </TabsTrigger>
                  <TabsTrigger disabled value="addresses">
                    <MapPin /> Addresses
                  </TabsTrigger>
                  <TabsTrigger value="settings">
                    <Settings /> Settings
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

            <Accordion className="md:hidden px-4" type="single" collapsible defaultValue="orders">
              <AccordionItem value="description">
                <AccordionTrigger>
                  <div className="flex gap-3 items-center font-semibold text-neutral-700">
                    <Package /> Order History
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <CustomerOrderHistory />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="addresses" disabled>
                <AccordionTrigger>
                  <div className="flex gap-3 items-center font-semibold text-neutral-700">
                    <MapPin /> Addresses
                  </div>
                </AccordionTrigger>
                <AccordionContent></AccordionContent>
              </AccordionItem>
              <AccordionItem value="settings">
                <AccordionTrigger>
                  <div className="flex gap-3 items-center font-semibold text-neutral-700">
                    <Settings /> Settings
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <CustomerAccountSettings />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </div>
      </div>
    </div>
  );
}
