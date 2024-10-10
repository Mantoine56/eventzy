"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import EventTypeList from '@/components/event-type-list';
import CreateEventTypeModal from '@/components/create-event-type-modal';
import AvailabilitySettings from '@/components/availability-settings';
import CustomIntakeForm from '@/components/custom-intake-form';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function Dashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/');
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  const tabContent = {
    overview: (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your schedule for the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" className="rounded-md border" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-2">
            <Button onClick={() => setIsCreateModalOpen(true)}>Create New Event Type</Button>
            <Button variant="outline">Sync Calendars</Button>
            <Button variant="outline">Manage Notifications</Button>
          </CardContent>
        </Card>
      </div>
    ),
    "event-types": (
      <Card>
        <CardHeader>
          <CardTitle>Event Types</CardTitle>
          <CardDescription>Manage your event types and create new ones</CardDescription>
        </CardHeader>
        <CardContent>
          <EventTypeList />
          <Button onClick={() => setIsCreateModalOpen(true)} className="mt-4">Create New Event Type</Button>
        </CardContent>
      </Card>
    ),
    availability: (
      <Card>
        <CardHeader>
          <CardTitle>Set Your Availability</CardTitle>
          <CardDescription>Define your working hours, buffer times, and daily meeting limits</CardDescription>
        </CardHeader>
        <CardContent>
          <AvailabilitySettings />
        </CardContent>
      </Card>
    ),
    "intake-forms": (
      <Card>
        <CardHeader>
          <CardTitle>Custom Intake Forms</CardTitle>
          <CardDescription>Create custom forms for gathering information from your clients</CardDescription>
        </CardHeader>
        <CardContent>
          <CustomIntakeForm />
        </CardContent>
      </Card>
    ),
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Eventzy Dashboard</h1>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4">
                {Object.keys(tabContent).map((tab) => (
                  <Button
                    key={tab}
                    variant={activeTab === tab ? "default" : "ghost"}
                    onClick={() => {
                      setActiveTab(tab);
                    }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="hidden md:inline-flex">
          {Object.keys(tabContent).map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={activeTab}>
          {tabContent[activeTab as keyof typeof tabContent]}
        </TabsContent>
      </Tabs>
      <CreateEventTypeModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  );
}