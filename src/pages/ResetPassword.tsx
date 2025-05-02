
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RotateCw, LockOpen } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Import our new components
import { EmailVerification } from "@/components/reset-password/EmailVerification";
import { ImageSelection } from "@/components/reset-password/ImageSelection";
import { PasswordConfirmation } from "@/components/reset-password/PasswordConfirmation";

// Default images for password reset
const defaultImages = [
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1579546929662-711aa81148cf?auto=format&fit=crop&q=80"
];

const ResetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [enteredCode, setEnteredCode] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>(defaultImages[0]);
  const [passwordCoordinates, setPasswordCoordinates] = useState<Array<{ x: number; y: number }>>([]);
  const [confirmPasswordCoordinates, setConfirmPasswordCoordinates] = useState<Array<{ x: number; y: number }>>([]);
  const [requiredClicks, setRequiredClicks] = useState<number>(3);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [resetSuccess, setResetSuccess] = useState<boolean>(false);
  const [verificationSent, setVerificationSent] = useState<boolean>(false);

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
    setPasswordCoordinates([]);
    setConfirmPasswordCoordinates([]);
  };

  const handlePasswordComplete = (coordinates: Array<{ x: number; y: number }>) => {
    setPasswordCoordinates(coordinates);
    
    // If we have enough clicks, go to confirmation step
    if (coordinates.length >= 3) {
      setRequiredClicks(coordinates.length);
      setStep(3);
    }
  };

  const handleConfirmPasswordComplete = (coordinates: Array<{ x: number; y: number }>) => {
    setConfirmPasswordCoordinates(coordinates);
    
    // Check if the number of clicks matches
    if (coordinates.length !== passwordCoordinates.length) {
      toast({
        title: "Click count mismatch",
        description: `Please use exactly ${passwordCoordinates.length} clicks for confirmation.`,
        variant: "destructive"
      });
      setConfirmPasswordCoordinates([]);
      return;
    }

    // Show confirmation dialog
    setShowConfirmDialog(true);
  };

  const handleResetPassword = () => {
    try {
      // Get user data from localStorage
      const storedUserData = localStorage.getItem(`user_${email}`);
      if (!storedUserData) {
        toast({
          title: "Error",
          description: "User data not found.",
          variant: "destructive"
        });
        return;
      }

      // Update user data with new password
      const userData = JSON.parse(storedUserData);
      userData.passwordCoordinates = passwordCoordinates;
      userData.selectedImage = selectedImage;
      
      // Save updated user data
      localStorage.setItem(`user_${email}`, JSON.stringify(userData));
      
      // Close dialog and show success
      setShowConfirmDialog(false);
      setResetSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      
    } catch (error) {
      console.error("Error resetting password:", error);
      toast({
        title: "Reset failed",
        description: "An error occurred while resetting your password. Please try again.",
        variant: "destructive"
      });
      setShowConfirmDialog(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-10 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold font-poppins mb-2">Reset Password</h1>
              <p className="text-gray-400">Create a new graphical password</p>
            </div>
            
            <div className="cyber-card animate-fade-in">
              {step === 1 && (
                <EmailVerification 
                  email={email}
                  setEmail={setEmail}
                  enteredCode={enteredCode}
                  setEnteredCode={setEnteredCode}
                  verificationCode={verificationCode}
                  setVerificationCode={setVerificationCode}
                  verificationSent={verificationSent}
                  setVerificationSent={setVerificationSent}
                  onVerifySuccess={() => setStep(2)}
                />
              )}
              
              {step === 2 && (
                <ImageSelection
                  selectedImage={selectedImage}
                  defaultImages={defaultImages}
                  handleImageSelect={handleImageSelect}
                  passwordCoordinates={passwordCoordinates}
                  handlePasswordComplete={handlePasswordComplete}
                  onBack={() => setStep(1)}
                />
              )}
              
              {step === 3 && (
                <PasswordConfirmation
                  selectedImage={selectedImage}
                  requiredClicks={requiredClicks}
                  handleConfirmPasswordComplete={handleConfirmPasswordComplete}
                  onBack={() => setStep(2)}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Password Reset</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reset your password? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-cyberblue" onClick={handleResetPassword}>
              Reset Password
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Success Dialog */}
      <Dialog open={resetSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Password Reset Successful!</DialogTitle>
            <DialogDescription>
              Your password has been successfully reset. You will be redirected to the login page in a few seconds.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center items-center my-4">
            <RotateCw className="h-10 w-10 text-cyberblue animate-spin" />
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default ResetPassword;
