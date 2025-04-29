
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-cyberred/20 border border-cyberred/30 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle size={40} className="text-cyberred" />
          </div>
          
          <h1 className="text-5xl font-bold font-poppins mb-4">404</h1>
          <p className="text-2xl text-gray-300 mb-8">
            Oops! Page not found
          </p>
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/">
              <Button className="btn-neon">
                <span>Return to Home</span>
              </Button>
            </Link>
            
            <Link to="/help">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Go to Help Center
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
