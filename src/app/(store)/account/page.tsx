'use client';

import { CreditCard, Edit, Mail, MapPin, Package, Plus, Settings, Trash2, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import BackChevron from '@/shared/components/BackChevron';
import { Badge } from '@/shared/shadcd/components/ui/badge';
import { Button } from '@/shared/shadcd/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/shadcd/components/ui/card';
import { Input } from '@/shared/shadcd/components/ui/input';
import { Label } from '@/shared/shadcd/components/ui/label';
import { Separator } from '@/shared/shadcd/components/ui/separator';
import { Switch } from '@/shared/shadcd/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/shadcd/components/ui/tabs';

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
          <BackChevron router={useRouter()} title="My Account" muted="Manage your profile and preferences" />

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
              <TabsContent value="profile">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                    <Button variant="outline" onClick={() => setIsEditing(!isEditing)} disabled={isSaving}>
                      {isEditing ? (
                        'Cancel'
                      ) : (
                        <>
                          <Edit className="h-4 w-4 mr-2" /> Edit
                        </>
                      )}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) => handleProfileChange('firstName', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) => handleProfileChange('lastName', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleProfileChange('phone', e.target.value)}
                        disabled={!isEditing}
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    {isEditing && (
                      <Button disabled={isSaving} className="w-full">
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

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
              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Order History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Sample orders */}
                      {[1, 2, 3].map((order) => (
                        <div key={order} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-medium">Order #000{order}</p>
                              <p className="text-sm text-muted-foreground">Placed on Dec {order + 10}, 2024</p>
                            </div>
                            <Badge variant={order === 1 ? 'default' : 'secondary'}>
                              {order === 1 ? 'Delivered' : 'Shipped'}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm">
                              {order === 1 ? '2 items' : '1 item'} • ${(24.99 * order).toFixed(2)}
                            </p>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

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
