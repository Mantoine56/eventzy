"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { PlusCircle, Trash2 } from 'lucide-react';

type FormField = {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'checkbox';
  required: boolean;
};

export default function CustomIntakeForm() {
  const [fields, setFields] = useState<FormField[]>([]);

  const addField = () => {
    const newField: FormField = {
      id: Date.now().toString(),
      label: '',
      type: 'text',
      required: false,
    };
    setFields([...fields, newField]);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const handleSave = () => {
    console.log('Saving custom intake form:', fields);
    // TODO: Implement API call to save custom intake form
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Custom Intake Form</h3>
        <p className="text-sm text-muted-foreground">Create custom fields to gather information from your clients before the meeting.</p>
      </div>
      {fields.map((field) => (
        <div key={field.id} className="space-y-2 p-4 border rounded-md">
          <div className="flex justify-between items-center">
            <Input
              value={field.label}
              onChange={(e) => updateField(field.id, { label: e.target.value })}
              placeholder="Field Label"
              className="w-full mr-2"
            />
            <Button variant="ghost" size="icon" onClick={() => removeField(field.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor={`fieldType-${field.id}`}>Field Type</Label>
            <select
              id={`fieldType-${field.id}`}
              value={field.type}
              onChange={(e) => updateField(field.id, { type: e.target.value as FormField['type'] })}
              className="border rounded-md p-1"
            >
              <option value="text">Text</option>
              <option value="textarea">Textarea</option>
              <option value="number">Number</option>
              <option value="checkbox">Checkbox</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id={`required-${field.id}`}
              checked={field.required}
              onCheckedChange={(checked) => updateField(field.id, { required: checked })}
            />
            <Label htmlFor={`required-${field.id}`}>Required</Label>
          </div>
        </div>
      ))}
      <Button onClick={addField} variant="outline">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Field
      </Button>
      <Button onClick={handleSave}>Save Intake Form</Button>
    </div>
  );
}