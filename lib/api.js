// lib/api.js
const API_BASE_URL = 'https://ghl-backend-silk.vercel.app/api';

// Fetch free slots
export const getFreeSlots = async (date, timezone) => {
  const response = await fetch(`${API_BASE_URL}/events/free-slots?date=${date}&timezone=${timezone}`);
  const data = await response.json();
  if (!data.success) {
    throw new Error('Failed to fetch free slots');
  }
  return data.data;
};

// Book an event
export const bookEvent = async (dateTime, duration) => {
  const response = await fetch(`${API_BASE_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ dateTime, duration }),
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error('Failed to book event');
  }
  return data.data;
};

// Get events in a date range
export const getEventsInRange = async (startDate, endDate) => {
  const response = await fetch(`${API_BASE_URL}/events?startDate=${startDate}&endDate=${endDate}`);
  const data = await response.json();
  if (!data.success) {
    throw new Error('Failed to fetch events');
  }
  return data.data;
};
