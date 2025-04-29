
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ImagePasswordInput } from "@/components/ImagePasswordInput";
import { ChevronDown, HelpCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Demo image for visualization
const demoImage = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [demoCoordinates] = useState([
    { x: 0.3, y: 0.2 },
    { x: 0.7, y: 0.4 },
    { x: 0.5, y: 0.8 }
  ]);

  const faqs = [
    {
      question: "How does graphical password authentication work?",
      answer: "Graphical password authentication allows you to create a password by selecting specific points on an image rather than typing characters. To log in, you need to click on the same points (with a small margin of error allowed) in the same order. This creates a password that's both more secure and easier to remember than traditional text passwords."
    },
    {
      question: "Is this more secure than a traditional password?",
      answer: "Yes, graphical passwords can be more secure than traditional text passwords for several reasons: They're resistant to common attacks like keyloggers, they have a larger theoretical password space, and they're more difficult to share or write down, reducing the risk of social engineering attacks."
    },
    {
      question: "What happens if I forget my graphical password?",
      answer: "If you forget your graphical password, you can use the 'Forgot Password' option on the login page. This will initiate a password reset process where a verification link will be sent to your registered email address. Following this link will allow you to set up a new graphical password."
    },
    {
      question: "Can I use my own image for authentication?",
      answer: "Yes! During registration, you can either choose from our default image library or upload your own image. We recommend selecting an image with distinct features and areas to make your click points easier to remember but harder for others to guess."
    },
    {
      question: "How many points do I need to select for my password?",
      answer: "Our system requires you to select 3 distinct points on your chosen image to create your password. You'll need to click these same points in the same order during login. A small tolerance is allowed for each point to accommodate slight variations in your clicks."
    },
    {
      question: "What if someone watches me log in?",
      answer: "While graphical passwords are more resistant to 'shoulder surfing' than keyboard entry (especially on mobile devices), it's always good practice to shield your screen when logging in in public places. For additional security, consider enabling two-factor authentication."
    },
    {
      question: "Can I change my graphical password later?",
      answer: "Yes, you can change your graphical password at any time from the security settings in your account dashboard. You'll need to authenticate using your current password before setting up a new one."
    },
    {
      question: "What devices can I use GlyphSecure on?",
      answer: "GlyphSecure works on any device with a modern web browser, including desktop computers, laptops, tablets, and smartphones. The interface is responsive and adapts to different screen sizes for optimal usability."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <section className="mb-12">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold font-poppins mb-6">Help Center</h1>
              <p className="text-xl text-gray-300 mb-8">
                Everything you need to know about using GlyphSecure's graphical password system
              </p>
              
              <div className="relative max-w-xl mx-auto">
                <Input
                  placeholder="Search for help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-glow pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </section>
          
          {/* How It Works Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold font-poppins mb-6 text-center">How It Works</h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div>
                  <h3 className="text-xl font-medium mb-4">Creating Your Graphical Password</h3>
                  
                  <ol className="space-y-4">
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-cyberblue/20 flex items-center justify-center flex-shrink-0 mt-1 border border-cyberblue/30">
                        <span className="text-sm text-cyberblue">1</span>
                      </div>
                      <div>
                        <p className="text-base">
                          During registration, you'll be prompted to either choose a default image or upload your own image.
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-cyberblue/20 flex items-center justify-center flex-shrink-0 mt-1 border border-cyberblue/30">
                        <span className="text-sm text-cyberblue">2</span>
                      </div>
                      <div>
                        <p className="text-base">
                          Once you've selected your image, you'll need to click on three distinct points on the image to create your graphical password.
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-cyberblue/20 flex items-center justify-center flex-shrink-0 mt-1 border border-cyberblue/30">
                        <span className="text-sm text-cyberblue">3</span>
                      </div>
                      <div>
                        <p className="text-base">
                          Your clicks create a unique pattern that becomes your password. The system records both the positions and the order of your clicks.
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-cyberblue/20 flex items-center justify-center flex-shrink-0 mt-1 border border-cyberblue/30">
                        <span className="text-sm text-cyberblue">4</span>
                      </div>
                      <div>
                        <p className="text-base">
                          When logging in, you'll be presented with the same image and will need to click on the same points in the same order.
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>
                
                <div>
                  <div className="cyber-card">
                    <h3 className="text-lg font-medium mb-4">Password Creation Example</h3>
                    <ImagePasswordInput 
                      imageUrl={demoImage} 
                      requiredClicks={3}
                      onComplete={() => {}}
                      readOnly={true}
                      existingCoordinates={demoCoordinates}
                    />
                    <p className="text-sm text-gray-400 mt-4">
                      This is a visual demonstration of a graphical password with three selected points. 
                      Your actual password points will be different.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Tips for Strong Graphical Passwords */}
          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold font-poppins mb-6">Tips for Strong Graphical Passwords</h2>
            
            <div className="cyber-card">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-medium mb-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                      <span className="text-green-500 text-xs">✓</span>
                    </div>
                    Do:
                  </h3>
                  
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">•</span>
                      <span>Choose an image with distinct visual elements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">•</span>
                      <span>Select points that have meaning to you but would be hard for others to guess</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">•</span>
                      <span>Distribute your click points across different areas of the image</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">•</span>
                      <span>Practice your click pattern a few times to make sure you can remember it</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">•</span>
                      <span>Consider using an image that has personal meaning but isn't publicly associated with you</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-medium mb-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
                      <span className="text-red-500 text-xs">✗</span>
                    </div>
                    Don't:
                  </h3>
                  
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">•</span>
                      <span>Choose an image that's too simple or lacks distinct features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">•</span>
                      <span>Select obvious points like faces in portraits or prominent objects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">•</span>
                      <span>Group all your click points close together</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">•</span>
                      <span>Share screenshots of your authentication image with others</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">•</span>
                      <span>Use the same graphical password pattern across different services</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          {/* FAQs */}
          <section className="mb-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold font-poppins mb-6">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border border-white/10 rounded-lg overflow-hidden bg-black/20">
                    <AccordionTrigger className="px-6 py-4 text-left hover:bg-white/5">
                      <div className="flex items-center gap-3">
                        <HelpCircle size={18} className="text-cyberblue flex-shrink-0" />
                        <h3 className="font-medium">{faq.question}</h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-2 text-gray-300">
                      <div className="pl-9">{faq.answer}</div>
                    </AccordionContent>
                  </AccordionItem>
                ))
              ) : (
                <div className="text-center py-10 border border-white/10 rounded-lg bg-black/20">
                  <p className="text-gray-400">No results found for "{searchQuery}"</p>
                  <Button 
                    variant="link" 
                    className="text-cyberblue mt-2"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </Accordion>
          </section>
          
          {/* Contact Support */}
          <section className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold font-poppins mb-4">Still Need Help?</h2>
            <p className="text-gray-300 mb-6">
              Our support team is available to assist you with any questions or issues.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="btn-neon">
                <span>Contact Support</span>
              </Button>
              
              <Button variant="outline" className="border-cyberblue text-white hover:bg-cyberblue/20">
                Submit a Ticket
              </Button>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Help;
