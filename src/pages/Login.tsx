
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ImagePasswordInput } from "@/components/ImagePasswordInput";
import { ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";

// Default image as fallback
const defaultImage = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80";

// Demo password coordinates - in a real app these would be validated on the server
const correctCoordinates = [
  { x: 0.3, y: 0.2 },
  { x: 0.7, y: 0.4 },
  { x: 0.5, y: 0.8 }
];

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [userImage, setUserImage] = useState<string | null>(null);
  const [passwordCoordinates, setPasswordCoordinates] = useState<Array<{ x: number; y: number }>>([]);
  const [attempts, setAttempts] = useState<number>(0);
  const [requiredClicks, setRequiredClicks] = useState<number>(3);

  // Simulate fetching user's image when email is entered
  useEffect(() => {
    if (email) {
      try {
        const storedUserData = localStorage.getItem(`user_${email}`);
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          console.log("Found user data:", userData);
          if (userData.selectedImage) {
            setUserImage(userData.selectedImage);
            // If user has custom number of required clicks, use that
            if (userData.passwordCoordinates && userData.passwordCoordinates.length) {
              setRequiredClicks(userData.passwordCoordinates.length);
            }
          }
        } else {
          console.log("No stored data found for email:", email);
          setUserImage(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserImage(null);
      }
    }
  }, [email]);

  const handleContinue = () => {
    if (step === 1) {
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
      
      setStep(2);
    }
  };

  const handlePasswordComplete = (coordinates: Array<{ x: number; y: number }>) => {
    setPasswordCoordinates(coordinates);
    
    try {
      // Get user data from localStorage
      const storedUserData = localStorage.getItem(`user_${email}`);
      if (!storedUserData) {
        toast({
          title: "Account not found",
          description: "No account found with this email.",
          variant: "destructive"
        });
        return;
      }
      
      const userData = JSON.parse(storedUserData);
      const savedCoordinates = userData.passwordCoordinates;
      
      // Validate the coordinates
      const isCorrect = validateCoordinates(coordinates, savedCoordinates);
      
      if (isCorrect) {
        toast({
          title: "Login successful!",
          description: "Welcome back to GlyphSecure.",
          variant: "default"
        });
        
        // Redirect to dashboard
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setAttempts(prev => prev + 1);
        
        if (attempts >= 2) {
          toast({
            title: "Too many failed attempts",
            description: "Please reset your password or try again later.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Incorrect password",
            description: `Wrong click pattern. You have ${3 - attempts - 1} attempts remaining.`,
            variant: "destructive"
          });
          setPasswordCoordinates([]);
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast({
        title: "Login error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Simple coordinate validation with tolerance
  // In a real app, this would be done server-side with proper security
  const validateCoordinates = (
    inputCoords: Array<{ x: number; y: number }>,
    correctCoords: Array<{ x: number; y: number }>
  ) => {
    const tolerance = 0.1; // 10% tolerance in any direction
    
    if (inputCoords.length !== correctCoords.length) return false;
    
    return inputCoords.every((coord, index) => {
      const correctCoord = correctCoords[index];
      const xDiff = Math.abs(coord.x - correctCoord.x);
      const yDiff = Math.abs(coord.y - correctCoord.y);
      
      return xDiff <= tolerance && yDiff <= tolerance;
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-10 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold font-poppins mb-2">Welcome Back</h1>
              <p className="text-gray-400">Log in to your GlyphSecure account</p>
            </div>
            
            <div className="cyber-card animate-fade-in">
              {step === 1 && (
                <>
                  <h2 className="text-xl font-medium mb-6">Enter Your Email</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email"
                        type="email" 
                        placeholder="Enter your email address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-glow mt-1"
                      />
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
                    <Link to="/reset-password" className="text-sm text-cyberblue hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                </>
              )}
              
              {step === 2 && (
                <>
                  <div className="mb-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-medium">Enter Your Graphical Password</h2>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-cyberblue/20 cursor-help">
                              <Info size={14} className="text-cyberblue" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-sm">
                              Click on the {requiredClicks} points that you selected during registration to authenticate your account.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-gray-400 text-sm">Logging in as:</p>
                      <p className="text-sm">{email}</p>
                      <Button 
                        variant="link" 
                        className="text-xs text-cyberblue p-0 h-auto" 
                        onClick={() => setStep(1)}
                      >
                        Change
                      </Button>
                    </div>
                  </div>
                  
                  <ImagePasswordInput 
                    imageUrl={userImage || ''} 
                    fallbackImageUrl={defaultImage}
                    requiredClicks={requiredClicks}
                    onComplete={handlePasswordComplete}
                    minClicks={requiredClicks}
                    maxClicks={requiredClicks}
                  />
                  
                  <div className="mt-6 text-center">
                    <Link to="/reset-password" className="text-sm text-cyberblue hover:underline">
                      Forgot your password?
                    </Link>
                  </div>
                </>
              )}
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-cyberblue hover:underline">
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
