import { google } from 'googleapis';
import { getSession } from 'next-auth/react';

export async function getGoogleCalendarEvents(startDate: Date, endDate: Date) {
  const session = await getSession();
  if (!session?.accessToken) {
    throw new Error('No access token found');
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: session.accessToken });

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  try {
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: startDate.toISOString(),
      timeMax: endDate.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    return response.data.items;
  } catch (error) {
    console.error('Error fetching Google Calendar events:', error);
    throw error;
  }
}

export async function createGoogleCalendarEvent(event: any) {
  const session = await getSession();
  if (!session?.accessToken) {
    throw new Error('No access token found');
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: session.accessToken });

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });

    return response.data;
  } catch (error) {
    console.error('Error creating Google Calendar event:', error);
    throw error;
  }
}