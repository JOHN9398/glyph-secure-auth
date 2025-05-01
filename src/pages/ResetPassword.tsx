
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ImagePasswordInput } from "@/components/ImagePasswordInput";
import { ArrowRight, Mail, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
  const [selectedImage, setSelectedImage] = useState<string>(defaultImages[0]);
  const [passwordCoordinates, setPasswordCoordinates] = useState<Array<{ x: number; y: number }>>([]);
  const [confirmPasswordCoordinates, setConfirmPasswordCoordinates] = useState<Array<{ x: number; y: number }>>([]);
  const [requiredClicks, setRequiredClicks] = useState<number>(3);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [resetSuccess, setResetSuccess] = useState<boolean>(false);

  const handleContinue = () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address to continue.",
        variant: "destructive"
      });
      return;
    }

    // Check if user exists in localStorage
    const storedUserData = localStorage.getItem(`user_${email}`);
    if (!storedUserData) {
      toast({
        title: "Account not found",
        description: "No account found with this email. Please register first.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send a verification email
    // For demo purposes, we'll just proceed to next step
    toast({
      title: "Email verified",
      description: "In a real app, we would send a verification link to your email."
    });

    setStep(2);
  };

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
                <>
                  <h2 className="text-xl font-medium mb-6">Verify Your Email</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Mail className="text-muted-foreground h-5 w-5" />
                        </div>
                        <Input 
                          id="email"
                          type="email" 
                          placeholder="Enter your email address" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="input-glow pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Button 
                      onClick={handleContinue}
                      className="btn-neon w-full"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Continue <ArrowRight size={16} />
                      </span>
                    </Button>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Link to="/login" className="text-sm text-cyberblue hover:underline">
                      Back to login
                    </Link>
                  </div>
                </>
              )}
              
              {step === 2 && (
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
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                  </div>
                </>
              )}
              
              {step === 3 && (
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
                      onClick={() => setStep(2)}
                    >
                      Back
                    </Button>
                  </div>
                </>
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
