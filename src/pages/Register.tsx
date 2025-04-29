import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ImagePasswordInput } from "@/components/ImagePasswordInput";
import { Upload, ArrowRight, Info, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";

const defaultImages = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&q=80"
];

const Register = () => {
  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>(defaultImages[0]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("default");
  const [passwordCoordinates, setPasswordCoordinates] = useState<Array<{ x: number; y: number }>>([]);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number>(3);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  const handleContinue = () => {
    if (step === 1) {
      if (!name || !email) {
        toast({
          title: "Required fields missing",
          description: "Please provide your name and email address.",
          variant: "destructive"
        });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (passwordCoordinates.length < clickCount) {
        toast({
          title: "Password incomplete",
          description: `Please select at least ${clickCount} points on the image.`,
          variant: "destructive"
        });
        return;
      }
      
      // Save user data to localStorage for demo purposes
      // In a real app, this would go to a backend API
      try {
        const userData = {
          name,
          email,
          selectedImage,
          // In a real app, you would NOT store the actual coordinates like this
          // This is just for the demo
          passwordCoordinates
        };
        
        localStorage.setItem(`user_${email}`, JSON.stringify(userData));
        
        // Display success notification
        toast({
          title: "Registration successful!",
          description: "Your account has been created successfully.",
          variant: "default",
        });
        
        setIsComplete(true);
      } catch (error) {
        console.error("Error saving user data:", error);
        toast({
          title: "Registration failed",
          description: "There was an error creating your account. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handlePasswordComplete = (coordinates: Array<{ x: number; y: number }>) => {
    setPasswordCoordinates(coordinates);
  };

  const handleClickCountChange = (count: number) => {
    setClickCount(count);
    setPasswordCoordinates([]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-10 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold font-poppins mb-2">Create Your Account</h1>
              <p className="text-gray-400">Join GlyphSecure and enhance your online security</p>
            </div>
            
            {!isComplete ? (
              <>
                {/* Progress Indicator */}
                <div className="mb-10">
                  <div className="flex items-center justify-between max-w-xs mx-auto">
                    <div className={`flex flex-col items-center ${step >= 1 ? "text-cyberblue" : "text-gray-500"}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 1 ? "border-cyberblue bg-cyberblue/20" : "border-gray-600 bg-gray-800"}`}>
                        <span className="text-sm font-medium">1</span>
                      </div>
                      <span className="text-xs mt-1">Details</span>
                    </div>
                    
                    <div className={`flex-1 h-px mx-2 ${step >= 2 ? "bg-cyberblue" : "bg-gray-700"}`}></div>
                    
                    <div className={`flex flex-col items-center ${step >= 2 ? "text-cyberblue" : "text-gray-500"}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 2 ? "border-cyberblue bg-cyberblue/20" : "border-gray-600 bg-gray-800"}`}>
                        <span className="text-sm font-medium">2</span>
                      </div>
                      <span className="text-xs mt-1">Image</span>
                    </div>
                    
                    <div className={`flex-1 h-px mx-2 ${step >= 3 ? "bg-cyberblue" : "bg-gray-700"}`}></div>
                    
                    <div className={`flex flex-col items-center ${step >= 3 ? "text-cyberblue" : "text-gray-500"}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 3 ? "border-cyberblue bg-cyberblue/20" : "border-gray-600 bg-gray-800"}`}>
                        <span className="text-sm font-medium">3</span>
                      </div>
                      <span className="text-xs mt-1">Password</span>
                    </div>
                  </div>
                </div>
                
                {/* Step 1: Personal Details */}
                {step === 1 && (
                  <div className="cyber-card animate-fade-in">
                    <h2 className="text-xl font-medium mb-6">Personal Information</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name"
                          type="text" 
                          placeholder="Enter your full name" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="input-glow mt-1"
                        />
                      </div>
                      
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
                    
                    <div className="mt-8 flex justify-end">
                      <Button 
                        onClick={handleContinue}
                        className="btn-neon"
                      >
                        <span className="flex items-center gap-2">
                          Continue <ArrowRight size={16} />
                        </span>
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Choose Image */}
                {step === 2 && (
                  <div className="cyber-card animate-fade-in">
                    <h2 className="text-xl font-medium mb-6">Choose Your Authentication Image</h2>
                    
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="default">Default Images</TabsTrigger>
                        <TabsTrigger value="upload">Upload Image</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="default" className="mt-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {defaultImages.map((image, index) => (
                            <div 
                              key={index}
                              className={`relative cursor-pointer rounded-md overflow-hidden border-2 transition-all ${selectedImage === image ? 'border-cyberblue shadow-glow' : 'border-transparent'}`}
                              onClick={() => handleImageSelect(image)}
                            >
                              <img 
                                src={image} 
                                alt={`Default image ${index + 1}`} 
                                className="w-full h-32 object-cover"
                              />
                              {selectedImage === image && (
                                <div className="absolute top-2 right-2 bg-cyberblue rounded-full p-1">
                                  <Check size={14} className="text-black" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="upload" className="mt-6">
                        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                          {uploadedImage ? (
                            <div className="relative">
                              <img 
                                src={uploadedImage} 
                                alt="Uploaded image" 
                                className="max-h-64 mx-auto rounded-md mb-4"
                              />
                              <Button 
                                variant="outline" 
                                className="mt-2"
                                onClick={() => {
                                  setUploadedImage(null);
                                  setSelectedImage(defaultImages[0]);
                                }}
                              >
                                Remove Image
                              </Button>
                            </div>
                          ) : (
                            <>
                              <div className="flex flex-col items-center gap-4">
                                <div className="p-3 rounded-full bg-cyberpurple/20 border border-cyberpurple/30">
                                  <Upload size={24} className="text-cyberpurple" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-medium">Upload an image</h3>
                                  <p className="text-gray-400 text-sm mt-1 mb-4">
                                    PNG, JPG or GIF (max. 2MB)
                                  </p>
                                  
                                  <label className="btn-neon inline-block cursor-pointer">
                                    <span>Choose File</span>
                                    <input
                                      type="file"
                                      className="sr-only"
                                      accept="image/*"
                                      onChange={handleFileUpload}
                                    />
                                  </label>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                    
                    <div className="mt-8 flex justify-between">
                      <Button 
                        variant="outline" 
                        onClick={() => setStep(1)}
                      >
                        Back
                      </Button>
                      
                      <Button 
                        onClick={handleContinue}
                        className="btn-neon"
                      >
                        <span className="flex items-center gap-2">
                          Continue <ArrowRight size={16} />
                        </span>
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Step 3: Create Password */}
                {step === 3 && (
                  <div className="cyber-card animate-fade-in">
                    <div className="mb-6">
                      <div className="flex justify-between items-center">
                        <h2 className="text-xl font-medium">Create Your Graphical Password</h2>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-cyberblue/20 cursor-help">
                                <Info size={14} className="text-cyberblue" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p className="text-sm">
                                Click on {clickCount} distinct points on the image to create your password. Choose points that you can easily remember but would be hard for others to guess.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">
                        Click on {clickCount} distinct points on your image to create your password
                      </p>
                      
                      <div className="mt-4 mb-6">
                        <label className="text-sm text-gray-300 block mb-2">Number of points required:</label>
                        <div className="flex space-x-2">
                          {[3, 4, 5, 6].map(count => (
                            <button
                              key={count}
                              type="button"
                              className={`px-3 py-2 rounded-md text-sm ${
                                clickCount === count 
                                  ? 'bg-cyberblue text-black' 
                                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                              }`}
                              onClick={() => handleClickCountChange(count)}
                            >
                              {count}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <ImagePasswordInput 
                      imageUrl={selectedImage} 
                      requiredClicks={clickCount}
                      onComplete={handlePasswordComplete}
                      minClicks={clickCount}
                      maxClicks={clickCount}
                    />
                    
                    <div className="mt-8 flex justify-between">
                      <Button 
                        variant="outline" 
                        onClick={() => setStep(2)}
                      >
                        Back
                      </Button>
                      
                      <Button 
                        onClick={handleContinue}
                        className="btn-neon"
                        disabled={passwordCoordinates.length < clickCount}
                      >
                        <span className="flex items-center gap-2">
                          Complete Registration
                        </span>
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="cyber-card animate-fade-in text-center py-10">
                <div className="w-20 h-20 bg-cyberblue/20 rounded-full mx-auto flex items-center justify-center mb-6">
                  <Check size={40} className="text-cyberblue" />
                </div>
                
                <h2 className="text-2xl font-medium mb-2">Registration Complete!</h2>
                <p className="text-gray-300 mb-8">
                  Your account has been successfully created. You can now login with your credentials.
                </p>
                
                <Link to="/login">
                  <Button className="btn-neon">
                    <span>Login to Your Account</span>
                  </Button>
                </Link>
              </div>
            )}
            
            {!isComplete && (
              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-cyberblue hover:underline">
                    Login here
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
