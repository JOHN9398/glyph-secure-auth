
import { Button } from "@/components/ui/button";
import { ImagePasswordInput } from "@/components/ImagePasswordInput";

interface ImageSelectionProps {
  selectedImage: string;
  defaultImages: string[];
  handleImageSelect: (image: string) => void;
  passwordCoordinates: Array<{ x: number; y: number }>;
  handlePasswordComplete: (coordinates: Array<{ x: number; y: number }>) => void;
  onBack: () => void;
}

export const ImageSelection = ({
  selectedImage,
  defaultImages,
  handleImageSelect,
  passwordCoordinates,
  handlePasswordComplete,
  onBack
}: ImageSelectionProps) => {
  return (
    <>
      <h2 className="text-xl font-medium mb-6">Choose a New Image</h2>
      
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground mb-4">
          Select an image that you'll use for your graphical password.
        </p>
        
        <div className="grid grid-cols-3 gap-2">
          {defaultImages.map((image, index) => (
            <div 
              key={index}
              className={`
                relative rounded-md overflow-hidden border-2 transition-all
                ${selectedImage === image ? 'border-cyberblue shadow-glow' : 'border-transparent'}
              `}
              onClick={() => handleImageSelect(image)}
            >
              <img 
                src={image} 
                alt={`Password Image ${index + 1}`}
                className="w-full h-24 object-cover cursor-pointer"
              />
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-md font-medium mb-2">Set Your New Password</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Click on 3 to 6 points on the image to create your new graphical password.
          </p>
          
          <ImagePasswordInput 
            imageUrl={selectedImage} 
            requiredClicks={3} 
            onComplete={handlePasswordComplete}
            minClicks={3}
            maxClicks={6}
          />
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <Button 
          variant="ghost" 
          className="text-sm text-cyberblue"
          onClick={onBack}
        >
          Back
        </Button>
      </div>
    </>
  );
};
