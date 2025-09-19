// Utility functions for dynamic image loading based on problem categories and specific report titles

export const getReportSpecificImages = (reportTitle) => {
  const specificImageMap = {
    'Damaged Traffic Signal': ['/images/trafic.jpg'],
    'Multiple Potholes on Outer Ring Road': ['/images/pothole1.jpg'],
    'Large Pothole on MG Road': ['/images/pothole2.jpg'],
    'Broken Streetlight on Residency Road': ['/images/street.jpg'],
    'Garbage Collection Missed': ['/images/garbage1.jpg'],
    'Garbage Dump Near Park': ['/images/garbage2.jpg']
  };

  return specificImageMap[reportTitle] || null;
};

export const getCategoryImages = (category) => {
  const categoryImageMap = {
    'Potholes': [
      '/images/pothole1.jpg',
      '/images/pothole2.jpg',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
    ],
    'Streetlights': [
      '/images/street.jpg',
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
    ],
    'Garbage': [
      '/images/garbage1.jpg',
      '/images/garbage2.jpg',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400'
    ],
    'Others': [
      '/images/trafic.jpg',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
    ]
  };

  return categoryImageMap[category] || [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400'
  ];
};

export const getDefaultImages = () => {
  return [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400'
  ];
};

export const getRelevantImages = (report) => {
  // First priority: Check for report-specific images
  const specificImages = getReportSpecificImages(report.title);
  if (specificImages) {
    return specificImages;
  }
  
  // Second priority: If report has specific images, use them
  if (report.images && report.images.length > 0) {
    return report.images;
  }
  
  // Third priority: Get images based on category
  return getCategoryImages(report.category);
};
