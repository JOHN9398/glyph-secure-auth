
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, Zap, Users, Calendar } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      bio: "Cybersecurity expert with 15+ years of experience in authentication systems and digital identity.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      name: "Morgan Taylor",
      role: "CTO",
      bio: "Former security researcher specializing in biometrics and graphical authentication methods.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      name: "Raj Patel",
      role: "Head of Product",
      bio: "UX specialist with a background in cognitive psychology and human-computer interaction.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150"
    }
  ];

  const timeline = [
    {
      year: "2022",
      title: "Research Begins",
      description: "Initial research into graphical password authentication systems and cognitive memory patterns."
    },
    {
      year: "2023",
      title: "Prototype Development",
      description: "First working prototype of the GlyphSecure system with core image-based authentication."
    },
    {
      year: "2024",
      title: "Beta Launch",
      description: "Limited beta release with enhanced security features and user experience improvements."
    },
    {
      year: "2025",
      title: "Public Release",
      description: "Official launch of GlyphSecure with enterprise and consumer solutions."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-cybernav">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-6">About GlyphSecure</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Revolutionizing authentication through innovative graphical password technology
            </p>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold font-poppins mb-6 text-center">Our Mission</h2>
              <p className="text-lg text-gray-300 mb-8 text-center">
                At GlyphSecure, we're dedicated to making online security more intuitive, accessible, and robust. 
                We believe that strong security shouldn't come at the expense of user experience.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="cyber-card h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 rounded-full bg-cyberblue/20 mb-5 border border-cyberblue/30">
                      <Shield size={32} className="text-cyberblue" />
                    </div>
                    <h3 className="text-xl font-poppins font-medium mb-4">Enhancing Security</h3>
                    <p className="text-gray-300">
                      Traditional text passwords are increasingly vulnerable to sophisticated attacks. 
                      Our graphical password system provides a fundamentally different approach to authentication, 
                      making it significantly more resistant to common attack vectors.
                    </p>
                  </div>
                </div>
                
                <div className="cyber-card h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 rounded-full bg-cyberpurple/20 mb-5 border border-cyberpurple/30">
                      <Zap size={32} className="text-cyberpurple" />
                    </div>
                    <h3 className="text-xl font-poppins font-medium mb-4">Improving Usability</h3>
                    <p className="text-gray-300">
                      The human brain is wired to remember visual information more effectively than 
                      alphanumeric strings. Our system leverages this cognitive advantage to create 
                      passwords that are both more secure and easier to remember.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Timeline Section */}
        <section className="py-16 bg-cybernav/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-poppins mb-12 text-center">Our Journey</h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-cyberblue/30 transform -translate-x-1/2"></div>
                
                {/* Timeline Items */}
                {timeline.map((item, index) => (
                  <div key={index} className="relative mb-16 last:mb-0">
                    <div className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      {/* Date Circle */}
                      <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-cybernav border-2 border-cyberblue flex items-center justify-center z-10">
                        <Calendar size={16} className="text-cyberblue" />
                      </div>
                      
                      {/* Content */}
                      <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-8">
                        <div className="cyber-card">
                          <span className="block text-cyberblue font-bold text-lg mb-2">{item.year}</span>
                          <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                          <p className="text-gray-400">{item.description}</p>
                        </div>
                      </div>
                      
                      <div className="hidden md:block w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-poppins mb-4 text-center">Meet Our Team</h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-center mb-12">
              Our team combines expertise in cybersecurity, cognitive science, and user experience design
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {teamMembers.map((member, index) => (
                <div key={index} className="cyber-card hover:border-cyberblue/40 transition-all duration-300">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-6">
                      <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-xl font-poppins font-medium mb-1">{member.name}</h3>
                    <p className="text-cyberblue font-medium text-sm mb-4">{member.role}</p>
                    <p className="text-gray-400 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
