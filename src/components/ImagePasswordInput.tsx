
import { useState, useRef, useEffect } from "react";

interface ImagePasswordInputProps {
  imageUrl: string;
  requiredClicks: number;
  onComplete: (coordinates: Array<{ x: number; y: number }>) => void;
  readOnly?: boolean;
  existingCoordinates?: Array<{ x: number; y: number }>;
  fallbackImageUrl?: string;
  minClicks?: number;
  maxClicks?: number;
}

export function ImagePasswordInput({
  imageUrl,
  requiredClicks = 3,
  onComplete,
  readOnly = false,
  existingCoordinates,
  fallbackImageUrl = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80",
  minClicks = 3,
  maxClicks = 6
}: ImagePasswordInputProps) {
  const [clickPositions, setClickPositions] = useState<Array<{ x: number; y: number }>>([]);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(imageUrl || fallbackImageUrl);
  const imageRef = useRef<HTMLImageElement>(null);

  // Update image if props change
  useEffect(() => {
    if (imageUrl) {
      setCurrentImageUrl(imageUrl);
    } else if (!imageUrl && fallbackImageUrl) {
      setCurrentImageUrl(fallbackImageUrl);
    }
  }, [imageUrl, fallbackImageUrl]);

  useEffect(() => {
    if (existingCoordinates && readOnly) {
      setClickPositions(existingCoordinates);
    }
  }, [existingCoordinates, readOnly]);

  useEffect(() => {
    const updateImageSize = () => {
      if (imageRef.current) {
        setImageSize({
          width: imageRef.current.clientWidth,
          height: imageRef.current.clientHeight
        });
      }
    };

    // Update on load and resize
    window.addEventListener('resize', updateImageSize);
    if (imageRef.current?.complete) {
      updateImageSize();
    } else {
      imageRef.current?.addEventListener('load', updateImageSize);
    }

    return () => {
      window.removeEventListener('resize', updateImageSize);
      imageRef.current?.removeEventListener('load', updateImageSize);
    };
  }, [currentImageUrl]);

  const handleImageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (readOnly || clickPositions.length >= maxClicks) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width);
    const y = ((event.clientY - rect.top) / rect.height);
    
    const newClickPositions = [...clickPositions, { x, y }];
    setClickPositions(newClickPositions);
    
    if (newClickPositions.length >= minClicks && newClickPositions.length <= maxClicks) {
      // Only complete if we've reached at least the minimum number of clicks
      if (newClickPositions.length === requiredClicks || newClickPositions.length === maxClicks) {
        onComplete(newClickPositions);
      }
    }
  };

  const handleImageError = () => {
    // If the image fails to load, use the fallback
    if (currentImageUrl !== fallbackImageUrl && fallbackImageUrl) {
      console.log("Image failed to load, using fallback");
      setCurrentImageUrl(fallbackImageUrl);
    }
  };

  const handleReset = () => {
    if (readOnly) return;
    setClickPositions([]);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative overflow-hidden rounded-lg border border-cyberblue/30 cyber-card">
        <div 
          className="relative cursor-crosshair"
          onClick={handleImageClick}
        >
          <img 
            ref={imageRef}
            src={currentImageUrl} 
            alt="Authentication Image" 
            className="w-full object-cover"
            onError={handleImageError}
          />
          
          {clickPositions.map((pos, index) => (
            <div 
              key={index}
              className="image-marker z-10"
              style={{ 
                left: `${pos.x * 100}%`, 
                top: `${pos.y * 100}%`,
              }}
            >
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs">
                {index + 1}
              </span>
            </div>
          ))}
        </div>

        {!readOnly && (
          <div className="p-4 border-t border-cyberblue/30 bg-cyberdark/60 flex justify-between items-center">
            <div className="text-sm text-gray-300">
              {clickPositions.length < minClicks ? (
                <>Select at least {minClicks - clickPositions.length} more {minClicks - clickPositions.length === 1 ? 'point' : 'points'}</>
              ) : clickPositions.length < maxClicks ? (
                <>You can select up to {maxClicks - clickPositions.length} more points (optional)</>
              ) : (
                <>Maximum points selected</>
              )}
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-cyberblue hover:text-white transition-colors"
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
