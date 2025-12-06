'use client';

import { Badge } from '@shadcd/badge';
import { Button } from '@shadcd/button';
import { Card, CardContent, CardHeader, CardTitle } from '@shadcd/card';
import { Separator } from '@shadcd/separator';
import { Switch } from '@shadcd/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shadcd/tabs';
import { CreditCard, Edit, Mail, MapPin, Plus, Settings, Trash2, User } from 'lucide-react';
import { useState } from 'react';

import OrdersHistory from '@/entities/customers/ui/OrdersHistory';
import PersonalInfo from '@/entities/customers/ui/PersonalInfo';
import BackChevron from '@/shared/components/BackChevron';

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export default function AccountPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [addresses] = useState<Address[]>([
    {
      id: '1',
      type: 'home',
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main Street',
      apartment: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'US',
      isDefault: true,
    },
    {
      id: '2',
      type: 'work',
      firstName: 'John',
      lastName: 'Doe',
      address: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'US',
      isDefault: false,
    },
  ]);

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    orderUpdates: true,
  });

  const handleProfileChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <BackChevron title="My Account" muted="Manage your profile and preferences" />

          <Button variant="outline">Logout</Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-medium">Jane Doe</h3>
              <p className="text-sm text-muted-foreground">jane@doe.com</p>
              <Badge variant="secondary" className="mt-2">
                Premium Member
              </Badge>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <PersonalInfo />

              {/* Addresses Tab */}
              <TabsContent value="addresses">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Saved Addresses
                    </CardTitle>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Address
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant={address.isDefault ? 'default' : 'secondary'}>{address.type}</Badge>
                              {address.isDefault && <Badge variant="outline">Default</Badge>}
                            </div>
                            <p className="font-medium">
                              {address.firstName} {address.lastName}
                            </p>
                            <p className="text-muted-foreground">
                              {address.address}
                              {address.apartment && `, ${address.apartment}`}
                            </p>
                            <p className="text-muted-foreground">
                              {address.city}, {address.state} {address.zipCode}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {!address.isDefault && (
                              <Button variant="outline" size="sm">
                                Set Default
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orders Tab */}
              <OrdersHistory />

              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Notifications</h4>

                      <div className="flex items-center justify-between">
                        <div>
                          <p>Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                        <Switch
                          checked={preferences.emailNotifications}
                          onCheckedChange={(checked) =>
                            setPreferences((prev) => ({ ...prev, emailNotifications: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p>SMS Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                        </div>
                        <Switch
                          checked={preferences.smsNotifications}
                          onCheckedChange={(checked) =>
                            setPreferences((prev) => ({ ...prev, smsNotifications: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p>Marketing Emails</p>
                          <p className="text-sm text-muted-foreground">Receive promotional emails and offers</p>
                        </div>
                        <Switch
                          checked={preferences.marketingEmails}
                          onCheckedChange={(checked) =>
                            setPreferences((prev) => ({ ...prev, marketingEmails: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p>Order Updates</p>
                          <p className="text-sm text-muted-foreground">Get notified about order status changes</p>
                        </div>
                        <Switch
                          checked={preferences.orderUpdates}
                          onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, orderUpdates: checked }))}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-medium">Account Actions</h4>

                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Manage Payment Methods
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Mail className="h-4 w-4 mr-2" />
                          Change Password
                        </Button>
                        <Button variant="destructive" className="w-full justify-start">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
