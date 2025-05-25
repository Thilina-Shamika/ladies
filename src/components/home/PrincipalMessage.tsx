import React from 'react';

interface PrincipalMessageProps {
  image: { url: string; alt: string; };
  name: string;
  designation: string;
  subheading: string;
  heading: string;
  message: string;
  buttonText?: string;
  buttonLink?: { url: string; target?: string; };
}

export const PrincipalMessage: React.FC<PrincipalMessageProps> = ({
  image,
  name,
  designation,
  subheading,
  heading,
  message,
  buttonText,
  buttonLink,
}) => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Principal Image with overlay */}
          <div className="relative w-full h-72 md:h-full md:min-h-[350px] rounded-xl overflow-hidden shadow-xl">
            <img
              src={image.url}
              alt={image.alt || name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-6 py-4">
              <div className="text-lg md:text-2xl font-bold text-white mb-1">{name}</div>
              <div className="text-sm md:text-base text-white/80">{designation}</div>
            </div>
          </div>
          {/* Right: Subheading, Heading, Message, Button */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 mb-2">
              {/* Optional: Add an icon here if desired */}
              <span className="text-xs uppercase tracking-widest text-[#9d0202] font-semibold">{subheading}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">{heading}</h2>
            <div
              className="prose prose-lg max-w-none text-gray-700 mb-8"
              dangerouslySetInnerHTML={{ __html: message }}
            />
            {buttonText && buttonLink?.url && (
              <a
                href={buttonLink.url}
                target={buttonLink.target || undefined}
                rel={buttonLink.target === '_blank' ? 'noopener noreferrer' : undefined}
                className="inline-block bg-[#9d0202] text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-white hover:text-[#9d0202] border-2 border-[#9d0202] transition-colors duration-300 text-base uppercase tracking-wide mt-2"
              >
                {buttonText}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}; 