
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, Lock, User, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyberblue to-white">Next Generation</span>
                  <br />
                  Image Authentication
                </h1>
                <p className="text-lg text-gray-300 mb-8 max-w-xl">
                  Enhance your security with our cutting-edge graphical password system.
                  Click patterns on images to create unbreakable passwords.
                </p>
                <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                  <Link to="/register">
                    <Button className="btn-neon w-full sm:w-auto">
                      <span>Create Account</span>
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" className="border-cyberblue text-white hover:bg-cyberblue/20 w-full sm:w-auto">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="flex-1 w-full max-w-md">
                <div className="cyber-card shadow-glow p-1">
                  <img 
                    src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80" 
                    alt="Matrix code visualization" 
                    className="rounded-lg w-full object-cover h-64"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute top-1/4 left-1/3 w-4 h-4 rounded-full border-2 border-cyberblue bg-cyberblue/20 animate-pulse"></div>
                    <div className="absolute top-2/3 left-2/3 w-4 h-4 rounded-full border-2 border-cyberblue bg-cyberblue/20 animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full border-2 border-cyberblue bg-cyberblue/20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-cybernav/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-poppins mb-4">
                Why Choose <span className="text-cyberblue">Glyph</span>Secure
              </h2>
              <p className="text-gray-300 max-w-xl mx-auto">
                Our image-based authentication provides security beyond traditional passwords,
                making your accounts significantly more resistant to attacks.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="cyber-card hover:border-cyberblue/40 transition-all duration-300 h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-cyberblue/20 mb-5 border border-cyberblue/30">
                    <Shield size={24} className="text-cyberblue" />
                  </div>
                  <h3 className="text-xl font-poppins font-medium mb-2">Enhanced Security</h3>
                  <p className="text-gray-400">
                    Visual passwords are more resistant to brute force attacks and keyloggers.
                  </p>
                </div>
              </div>
              
              <div className="cyber-card hover:border-cyberblue/40 transition-all duration-300 h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-cyberblue/20 mb-5 border border-cyberblue/30">
                    <User size={24} className="text-cyberblue" />
                  </div>
                  <h3 className="text-xl font-poppins font-medium mb-2">User Friendly</h3>
                  <p className="text-gray-400">
                    Easy to remember image points instead of complex character combinations.
                  </p>
                </div>
              </div>
              
              <div className="cyber-card hover:border-cyberblue/40 transition-all duration-300 h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-cyberblue/20 mb-5 border border-cyberblue/30">
                    <Lock size={24} className="text-cyberblue" />
                  </div>
                  <h3 className="text-xl font-poppins font-medium mb-2">Custom Images</h3>
                  <p className="text-gray-400">
                    Use our default images or upload your own for personalized security.
                  </p>
                </div>
              </div>
              
              <div className="cyber-card hover:border-cyberblue/40 transition-all duration-300 h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-cyberblue/20 mb-5 border border-cyberblue/30">
                    <BarChart size={24} className="text-cyberblue" />
                  </div>
                  <h3 className="text-xl font-poppins font-medium mb-2">Activity Monitoring</h3>
                  <p className="text-gray-400">
                    Track login attempts and get alerts on suspicious activity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-poppins mb-4">How It Works</h2>
              <p className="text-gray-300 max-w-xl mx-auto">
                Our graphical password system is simple to use yet provides superior security
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-cyberpurple/20 flex items-center justify-center mb-6 border border-cyberpurple">
                  <span className="text-2xl font-bold text-cyberpurple">1</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Choose an Image</h3>
                <p className="text-gray-400">
                  Select from our default images or upload your own personal image
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-cyberblue/20 flex items-center justify-center mb-6 border border-cyberblue">
                  <span className="text-2xl font-bold text-cyberblue">2</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Create Your Pattern</h3>
                <p className="text-gray-400">
                  Click on specific points on your image to create your unique password
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-cyberred/20 flex items-center justify-center mb-6 border border-cyberred">
                  <span className="text-2xl font-bold text-cyberred">3</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Login Securely</h3>
                <p className="text-gray-400">
                  Reproduce your clicks on your image to securely access your account
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-b from-cybernav to-cyberdark">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold font-poppins mb-4">
                Ready to Enhance Your Security?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of users who have upgraded to GlyphSecure's innovative authentication system.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/register">
                  <Button className="btn-neon w-full sm:w-auto">
                    <span>Get Started Free</span>
                  </Button>
                </Link>
                <Link to="/help">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
