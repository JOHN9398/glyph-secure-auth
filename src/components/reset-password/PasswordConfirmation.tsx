
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ImagePasswordInput } from "@/components/ImagePasswordInput";

interface PasswordConfirmationProps {
  selectedImage: string;
  requiredClicks: number;
  handleConfirmPasswordComplete: (coordinates: Array<{ x: number; y: number }>) => void;
  onBack: () => void;
}

export const PasswordConfirmation = ({
  selectedImage,
  requiredClicks,
  handleConfirmPasswordComplete,
  onBack
}: PasswordConfirmationProps) => {
  return (
    <>
      <h2 className="text-xl font-medium mb-6">Confirm Your Password</h2>
      
      <div className="space-y-4">
        <Alert className="bg-amber-500/10 border-amber-500/20 mb-4">
          <AlertTitle className="text-amber-500">Confirm your new password</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            Please click the same {requiredClicks} points in the same order to confirm your new password.
          </AlertDescription>
        </Alert>
        
        <ImagePasswordInput 
          imageUrl={selectedImage} 
          requiredClicks={requiredClicks} 
          onComplete={handleConfirmPasswordComplete}
          minClicks={requiredClicks}
          maxClicks={requiredClicks}
        />
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
