import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.svix.com',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer testsk_dgT3kl8bidO83QFP4n6ZuvIIjgJFxzYH.eu`, // This should use a .env file instead of exposing to public.
  },
});

// GET Event Types
export const getEventTypes = async (endpoint: any) => {
  try {
    const response = await instance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Create Event Types
export const createEventTypes = async (endpoint: any, payload: any) => {
  try {
    await instance.post(endpoint, payload);
  } catch (error) {
    console.error('Error posting data:', error);
  }
};

// Update Event Types
export const updateEventTypes = async (endpoint: any, payload: any) => {
  try {
    await instance.put(endpoint, payload);
  } catch (error) {
    console.error('Error updating data:', error);
  }
};

// Delete Event Types
export const deleteEventTypes = async (endpoint: any) => {
  try {
    await instance.delete(endpoint);
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};
