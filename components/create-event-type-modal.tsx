"use client"

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

type CreateEventTypeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateEventTypeModal({ isOpen, onClose }: CreateEventTypeModalProps) {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [isGroup, setIsGroup] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement event type creation logic
    console.log({ name, duration, description, isGroup });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Event Type</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., 30 Min Meeting"
                required
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="30"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the event type"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isGroup"
                checked={isGroup}
                onCheckedChange={setIsGroup}
              />
              <Label htmlFor="isGroup">Group Event</Label>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="submit">Create Event Type</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}