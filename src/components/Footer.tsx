
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-cybernav/80 border-t border-cyberblue/10 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyberblue to-cyberpurple flex items-center justify-center">
                <span className="text-white font-bold">GS</span>
              </div>
              <span className="text-lg font-poppins font-bold text-white">Glyph<span className="text-cyberblue">Secure</span></span>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              Next-generation graphical password authentication system providing enhanced security with image-based verification.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-cyberblue transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-400 hover:text-cyberblue transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/help" className="text-sm text-gray-400 hover:text-cyberblue transition-colors">Help Center</Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-gray-400 hover:text-cyberblue transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-gray-400 hover:text-cyberblue transition-colors">Register</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-sm text-gray-400 hover:text-cyberblue transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/help" className="text-sm text-gray-400 hover:text-cyberblue transition-colors">User Guide</Link>
              </li>
              <li>
                <a href="mailto:support@glyphsecure.com" className="text-sm text-gray-400 hover:text-cyberblue transition-colors">Contact Support</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">© 2025 GlyphSecure. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-xs text-gray-500 hover:text-cyberblue transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-gray-500 hover:text-cyberblue transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-500 hover:text-cyberblue transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
