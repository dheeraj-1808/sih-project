import React, { useEffect, useRef, useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { MapPin, Navigation, ZoomIn, ZoomOut } from 'lucide-react';
import { GOOGLE_MAPS_CONFIG } from '../config/maps';

const MapComponent = ({ report }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!report || !report.coordinates || !mapRef.current) return;

    const { lat, lng } = report.coordinates;

    // Initialize map
    const googleMap = new window.google.maps.Map(mapRef.current, {
      center: { lat, lng },
      zoom: 15,
      mapTypeId: 'roadmap',
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: true,
      gestureHandling: 'greedy',
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    // Add marker with custom red pin
    const marker = new window.google.maps.Marker({
      position: { lat, lng },
      map: googleMap,
      title: report.location,
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 0C7.163 0 0 7.163 0 16c0 11.5 16 24 16 24s16-12.5 16-24c0-8.837-7.163-16-16-16z" fill="#ea4335"/>
            <circle cx="16" cy="16" r="6" fill="white"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(32, 40),
        anchor: new window.google.maps.Point(16, 40)
      },
      animation: window.google.maps.Animation.DROP
    });

    markerRef.current = marker;

    // Add info window
    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="padding: 12px; max-width: 200px;">
          <h3 style="margin: 0 0 6px 0; font-size: 14px; font-weight: bold; color: #333;">${report.title}</h3>
          <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">📍 ${report.location}</p>
          <p style="margin: 0; font-size: 11px; color: #999; background: #f5f5f5; padding: 4px 8px; border-radius: 4px; display: inline-block;">${report.category} Issue</p>
        </div>
      `
    });

    marker.addListener('click', () => {
      infoWindow.open(googleMap, marker);
    });

    // Auto-open info window after a short delay
    setTimeout(() => {
      infoWindow.open(googleMap, marker);
    }, 1000);

  }, [report]);

  return (
    <div 
      ref={mapRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        borderRadius: '8px',
        overflow: 'hidden'
      }} 
    />
  );
};

const LoadingComponent = () => (
  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
      <p className="text-gray-500">Loading Google Maps...</p>
    </div>
  </div>
);

const ErrorComponent = ({ status }) => (
  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
    <div className="text-center">
      <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
      <p className="text-gray-500">Map unavailable</p>
      <p className="text-sm text-gray-400 mt-1">
        {status === Status.FAILURE ? 'Failed to load Google Maps' : 'Map loading...'}
      </p>
      <p className="text-xs text-gray-400 mt-2">
        Please check your Google Maps API key
      </p>
    </div>
  </div>
);

// Fallback Map Component (works without API key)
const FallbackMapComponent = ({ report }) => {
  const [zoom, setZoom] = useState(15);
  const { lat, lng } = report.coordinates;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 2, 20));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 2, 1));

  return (
    <div className="h-64 bg-gradient-to-br from-blue-100 via-green-50 to-yellow-100 rounded-lg relative overflow-hidden border border-gray-200">
      {/* Map Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
            linear-gradient(45deg, transparent 25%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.05) 50%, transparent 50%, transparent 75%, rgba(0,0,0,0.05) 75%)
          `,
          backgroundSize: '20px 20px, 30px 30px, 10px 10px'
        }}
      />
      
      {/* Central Marker */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="relative">
          {/* Main Marker */}
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          {/* Marker Shadow */}
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500"></div>
        </div>
      </div>

      {/* Location Info */}
      <div className="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
        <div className="flex items-center space-x-2 mb-1">
          <MapPin className="w-4 h-4 text-red-500" />
          <span className="text-sm font-medium text-gray-900">Issue Location</span>
        </div>
        <p className="text-xs text-gray-600 leading-tight">{report.location}</p>
        <p className="text-xs text-gray-500 mt-1">Coordinates: {lat.toFixed(4)}, {lng.toFixed(4)}</p>
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-1">
        <button 
          onClick={handleZoomIn}
          className="w-8 h-8 bg-white bg-opacity-90 backdrop-blur-sm rounded shadow-lg flex items-center justify-center hover:bg-opacity-100 transition-all"
        >
          <ZoomIn className="w-4 h-4 text-gray-600" />
        </button>
        <button 
          onClick={handleZoomOut}
          className="w-8 h-8 bg-white bg-opacity-90 backdrop-blur-sm rounded shadow-lg flex items-center justify-center hover:bg-opacity-100 transition-all"
        >
          <ZoomOut className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Zoom Level Indicator */}
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm rounded px-2 py-1 text-xs text-gray-600">
        Zoom: {zoom}x
      </div>

      {/* Open in Google Maps Button */}
      <div className="absolute top-4 right-4">
        <a
          href={`https://www.google.com/maps?q=${lat},${lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors flex items-center space-x-1"
        >
          <Navigation className="w-3 h-3" />
          <span>Open in Maps</span>
        </a>
      </div>
    </div>
  );
};

const GoogleMapsView = ({ report }) => {
  const [useFallback, setUseFallback] = useState(false);

  if (!report || !report.coordinates) {
    return (
      <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">No location data available</p>
        </div>
      </div>
    );
  }

  const render = (status) => {
    switch (status) {
      case Status.LOADING:
        return <LoadingComponent />;
      case Status.FAILURE:
        return <FallbackMapComponent report={report} />;
      case Status.SUCCESS:
        return <MapComponent report={report} />;
      default:
        return <LoadingComponent />;
    }
  };

  // Check if API key is valid
  const hasValidApiKey = GOOGLE_MAPS_CONFIG.apiKey && 
    GOOGLE_MAPS_CONFIG.apiKey !== 'YOUR_GOOGLE_MAPS_API_KEY_HERE' &&
    GOOGLE_MAPS_CONFIG.apiKey.length > 20;

  if (!hasValidApiKey) {
    return <FallbackMapComponent report={report} />;
  }

  return (
    <div className="h-64 bg-gray-100 rounded-lg relative overflow-hidden border border-gray-200">
      <Wrapper
        apiKey={GOOGLE_MAPS_CONFIG.apiKey}
        render={render}
        libraries={GOOGLE_MAPS_CONFIG.libraries}
      />
    </div>
  );
};

export default GoogleMapsView;
