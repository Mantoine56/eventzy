"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type DayAvailability = {
  isAvailable: boolean;
  startTime: string;
  endTime: string;
};

type WeekAvailability = {
  [key: string]: DayAvailability;
};

const defaultAvailability: WeekAvailability = {
  monday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
  tuesday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
  wednesday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
  thursday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
  friday: { isAvailable: true, startTime: '09:00', endTime: '17:00' },
  saturday: { isAvailable: false, startTime: '09:00', endTime: '17:00' },
  sunday: { isAvailable: false, startTime: '09:00', endTime: '17:00' },
};

export default function AvailabilitySettings() {
  const [availability, setAvailability] = useState<WeekAvailability>(defaultAvailability);
  const [bufferTime, setBufferTime] = useState(15);
  const [dailyMeetingLimit, setDailyMeetingLimit] = useState(8);

  const handleAvailabilityChange = (day: string, field: keyof DayAvailability, value: boolean | string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  const handleSave = () => {
    console.log('Saving availability settings:', { availability, bufferTime, dailyMeetingLimit });
    // TODO: Implement API call to save settings
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Weekly Availability</h3>
        <p className="text-sm text-muted-foreground">Set your available hours for each day of the week.</p>
      </div>
      {Object.entries(availability).map(([day, { isAvailable, startTime, endTime }]) => (
        <div key={day} className="flex items-center space-x-4">
          <Switch
            checked={isAvailable}
            onCheckedChange={(checked) => handleAvailabilityChange(day, 'isAvailable', checked)}
          />
          <Label className="w-24 capitalize">{day}</Label>
          <Input
            type="time"
            value={startTime}
            onChange={(e) => handleAvailabilityChange(day, 'startTime', e.target.value)}
            disabled={!isAvailable}
            className="w-32"
          />
          <span>to</span>
          <Input
            type="time"
            value={endTime}
            onChange={(e) => handleAvailabilityChange(day, 'endTime', e.target.value)}
            disabled={!isAvailable}
            className="w-32"
          />
        </div>
      ))}
      <div className="space-y-4">
        <div>
          <Label htmlFor="bufferTime">Buffer Time (minutes)</Label>
          <Select value={bufferTime.toString()} onValueChange={(value) => setBufferTime(parseInt(value))}>
            <SelectTrigger id="bufferTime">
              <SelectValue placeholder="Select buffer time" />
            </SelectTrigger>
            <SelectContent>
              {[0, 5, 10, 15, 20, 30].map((time) => (
                <SelectItem key={time} value={time.toString()}>{time} minutes</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="dailyMeetingLimit">Daily Meeting Limit</Label>
          <Input
            id="dailyMeetingLimit"
            type="number"
            min="1"
            max="24"
            value={dailyMeetingLimit}
            onChange={(e) => setDailyMeetingLimit(parseInt(e.target.value))}
          />
        </div>
      </div>
      <Button onClick={handleSave}>Save Availability Settings</Button>
    </div>
  );
}