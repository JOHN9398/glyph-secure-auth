
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-cybernav/80 backdrop-blur-lg border-b border-cyberblue/10 py-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyberblue to-cyberpurple flex items-center justify-center">
            <span className="text-white font-bold">GS</span>
          </div>
          <span className="text-lg font-poppins font-bold text-white">Glyph<span className="text-cyberblue">Secure</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-white/90 hover:text-cyberblue transition-colors">Home</Link>
          <Link to="/about" className="text-sm font-medium text-white/90 hover:text-cyberblue transition-colors">About</Link>
          <Link to="/help" className="text-sm font-medium text-white/90 hover:text-cyberblue transition-colors">Help</Link>
          <div className="h-5 w-px bg-white/20"></div>
          <Link to="/login">
            <Button variant="outline" className="border-cyberblue text-cyberblue hover:bg-cyberblue/20">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="bg-cyberblue hover:bg-cyberblue/80 text-white">
              Register
            </Button>
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:bg-white/10"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-cybernav border-b border-cyberblue/10 py-4 px-6 flex flex-col gap-4 animate-fade-in">
          <Link 
            to="/" 
            className="text-sm font-medium text-white/90 hover:text-cyberblue transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="text-sm font-medium text-white/90 hover:text-cyberblue transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/help" 
            className="text-sm font-medium text-white/90 hover:text-cyberblue transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Help
          </Link>
          <div className="h-px w-full bg-white/20 my-2"></div>
          <div className="flex gap-3">
            <Link 
              to="/login" 
              className="w-1/2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button 
                variant="outline" 
                className="w-full border-cyberblue text-cyberblue hover:bg-cyberblue/20"
              >
                Login
              </Button>
            </Link>
            <Link 
              to="/register" 
              className="w-1/2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button 
                className="w-full bg-cyberblue hover:bg-cyberblue/80 text-white"
              >
                Register
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
