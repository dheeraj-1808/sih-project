import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

const MapView = ({ report }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!report || !report.coordinates || !mapRef.current) return;

    // Create a simple interactive map using CSS and positioning
    const mapContainer = mapRef.current;
    
    // Clear previous content
    mapContainer.innerHTML = '';
    
    // Create map background with grid pattern
    const mapBackground = document.createElement('div');
    mapBackground.className = 'absolute inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-yellow-100';
    mapBackground.style.backgroundImage = `
      radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
      linear-gradient(45deg, transparent 25%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 50%, transparent 50%, transparent 75%, rgba(0,0,0,0.02) 75%)
    `;
    mapBackground.style.backgroundSize = '20px 20px, 30px 30px, 10px 10px';
    
    // Create marker
    const marker = document.createElement('div');
    marker.className = 'absolute transform -translate-x-1/2 -translate-y-1/2 z-10';
    marker.style.left = '50%';
    marker.style.top = '50%';
    
    // Create marker pin
    const markerPin = document.createElement('div');
    markerPin.className = 'relative';
    markerPin.innerHTML = `
      <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
        </svg>
      </div>
      <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500"></div>
    `;
    
    // Create pulse animation
    const pulse = document.createElement('div');
    pulse.className = 'absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20';
    
    marker.appendChild(markerPin);
    marker.appendChild(pulse);
    
    // Create location info
    const locationInfo = document.createElement('div');
    locationInfo.className = 'absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs';
    locationInfo.innerHTML = `
      <div class="flex items-center space-x-2 mb-1">
        <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
        </svg>
        <span class="text-sm font-medium text-gray-900">Issue Location</span>
      </div>
      <p class="text-xs text-gray-600 leading-tight">${report.location}</p>
    `;
    
    // Create zoom controls
    const zoomControls = document.createElement('div');
    zoomControls.className = 'absolute bottom-4 right-4 flex flex-col space-y-1';
    zoomControls.innerHTML = `
      <button class="w-8 h-8 bg-white bg-opacity-90 backdrop-blur-sm rounded shadow-lg flex items-center justify-center hover:bg-opacity-100 transition-all">
        <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
      </button>
      <button class="w-8 h-8 bg-white bg-opacity-90 backdrop-blur-sm rounded shadow-lg flex items-center justify-center hover:bg-opacity-100 transition-all">
        <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6"></path>
        </svg>
      </button>
    `;
    
    // Add elements to map
    mapContainer.appendChild(mapBackground);
    mapContainer.appendChild(marker);
    mapContainer.appendChild(locationInfo);
    mapContainer.appendChild(zoomControls);
    
    // Add click handlers for zoom controls
    const zoomInBtn = zoomControls.querySelector('button:first-child');
    const zoomOutBtn = zoomControls.querySelector('button:last-child');
    
    zoomInBtn.addEventListener('click', () => {
      markerPin.style.transform = 'scale(1.2)';
      setTimeout(() => {
        markerPin.style.transform = 'scale(1)';
      }, 200);
    });
    
    zoomOutBtn.addEventListener('click', () => {
      markerPin.style.transform = 'scale(0.8)';
      setTimeout(() => {
        markerPin.style.transform = 'scale(1)';
      }, 200);
    });
    
  }, [report]);

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

  return (
    <div className="h-64 bg-gray-100 rounded-lg relative overflow-hidden border border-gray-200">
      <div ref={mapRef} className="w-full h-full relative"></div>
    </div>
  );
};

export default MapView;
