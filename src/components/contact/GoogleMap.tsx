import React from "react";

export default function GoogleMap({ address }: { address: string }) {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-lg border" style={{ minHeight: 0 }}>
      <iframe
        title="Google Map"
        src={mapSrc}
        width="100%"
        height="500"
        style={{ border: 0, minHeight: 350, height: 500, width: '100%' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
} 