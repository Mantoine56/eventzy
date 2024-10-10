"use client"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, Link as LinkIcon } from 'lucide-react';

type EventType = {
  id: string;
  name: string;
  duration: number;
  description: string;
  isGroup: boolean;
};

const mockEventTypes: EventType[] = [
  { id: '1', name: '30 Min Meeting', duration: 30, description: 'Short catch-up or consultation', isGroup: false },
  { id: '2', name: '60 Min Meeting', duration: 60, description: 'In-depth discussion or planning session', isGroup: false },
  { id: '3', name: 'Group Workshop', duration: 120, description: 'Interactive session for multiple participants', isGroup: true },
];

export default function EventTypeList() {
  const [eventTypes, setEventTypes] = useState<EventType[]>(mockEventTypes);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {eventTypes.map((eventType) => (
        <Card key={eventType.id}>
          <CardHeader>
            <CardTitle>{eventType.name}</CardTitle>
            <CardDescription>{eventType.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
              <Clock className="h-4 w-4" />
              <span>{eventType.duration} minutes</span>
              {eventType.isGroup && (
                <>
                  <Users className="h-4 w-4 ml-2" />
                  <span>Group</span>
                </>
              )}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <LinkIcon className="h-4 w-4 mr-2" />
                Copy Link
              </Button>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}