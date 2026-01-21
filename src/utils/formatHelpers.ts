export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDuration = (duration: string): string => {
  // Parse ISO 8601 duration (e.g., "PT2H30M")
  const durationRegex = /PT(\d+)H?(\d+)?M?/;
  const match = durationRegex.exec(duration);
  
  if (!match) return duration;
  
  const hours = Number.parseInt(match[1], 10) || 0;
  const minutes = Number.parseInt(match[2] || '0', 10) || 0;
  
  if (hours === 0) {
    return `${minutes}m`;
  }
  
  if (minutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${minutes}m`;
};

export const getNumberOfStopsLabel = (stops: number): string => {
  if (stops === 0) return 'Nonstop';
  if (stops === 1) return '1 stop';
  return `${stops} stops`;
};
