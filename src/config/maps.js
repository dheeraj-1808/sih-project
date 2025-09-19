// Google Maps Configuration
// To get your API key:
// 1. Go to https://console.cloud.google.com/google/maps-apis
// 2. Create a new project or select existing one
// 3. Enable "Maps JavaScript API"
// 4. Create credentials (API Key)
// 5. Replace the key below

export const GOOGLE_MAPS_CONFIG = {
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY_HERE',
  libraries: ['places'],
  version: 'weekly'
};

// Instructions for setting up Google Maps API:
export const SETUP_INSTRUCTIONS = `
1. Go to Google Cloud Console: https://console.cloud.google.com/
2. Create a new project or select existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API (optional)
4. Go to "Credentials" and create an API Key
5. Restrict the API key to your domain for security
6. Add the API key to your .env file as REACT_APP_GOOGLE_MAPS_API_KEY=your_key_here
`;
