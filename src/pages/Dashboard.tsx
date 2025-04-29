
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Shield, Settings, LogOut, Bell, User, LockKeyhole,
  AlertTriangle, Calendar, Clock, CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const activityLog = [
  {
    type: "login",
    success: true,
    timestamp: "Today, 14:32",
    device: "Chrome on Windows",
    ip: "192.168.1.1"
  },
  {
    type: "login",
    success: false,
    timestamp: "Yesterday, 22:15",
    device: "Safari on iPhone",
    ip: "203.0.113.1"
  },
  {
    type: "password_change",
    success: true,
    timestamp: "Apr 25, 2025, 09:45",
    device: "Firefox on MacOS",
    ip: "198.51.100.1"
  },
  {
    type: "login",
    success: true,
    timestamp: "Apr 22, 2025, 16:03",
    device: "Chrome on Windows",
    ip: "192.168.1.1"
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    accountType: "Premium",
    activeSince: "January 15, 2025",
  });

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account."
    });
    
    // Redirect to home page
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  const handleResetPassword = () => {
    toast({
      title: "Password reset initiated",
      description: "Follow the instructions to reset your graphical password."
    });
    navigate("/register");
  };
  
  const getActivityIcon = (activity: typeof activityLog[0]) => {
    if (activity.type === "login") {
      return activity.success ? (
        <div className="p-2 rounded-full bg-green-500/10">
          <CheckCircle size={16} className="text-green-500" />
        </div>
      ) : (
        <div className="p-2 rounded-full bg-red-500/10">
          <AlertTriangle size={16} className="text-red-500" />
        </div>
      );
    } else if (activity.type === "password_change") {
      return (
        <div className="p-2 rounded-full bg-cyberblue/10">
          <LockKeyhole size={16} className="text-cyberblue" />
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          {/* User Welcome */}
          <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold font-poppins">Welcome, {user.name}</h1>
              <p className="text-gray-400 mt-1">Managing your security is easier than ever</p>
            </div>
            
            <div className="flex gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Bell size={18} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-80 overflow-auto">
                    <div className="p-3 hover:bg-secondary/50 cursor-pointer">
                      <div className="flex gap-3">
                        <div className="p-2 rounded-full bg-cyberblue/10">
                          <LockKeyhole size={16} className="text-cyberblue" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Security Recommendation</p>
                          <p className="text-xs text-gray-400">Review your account security settings</p>
                          <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-secondary/50 cursor-pointer">
                      <div className="flex gap-3">
                        <div className="p-2 rounded-full bg-red-500/10">
                          <AlertTriangle size={16} className="text-red-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Unusual Login Attempt</p>
                          <p className="text-xs text-gray-400">From Safari on iPhone</p>
                          <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex gap-2 items-center">
                    <User size={16} />
                    <span>Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Security</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Account Summary */}
            <div className="lg:col-span-1 space-y-6">
              <div className="cyber-card">
                <h2 className="text-xl font-medium mb-6">Account Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email:</span>
                    <span>{user.email}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Account Type:</span>
                    <span className="px-2 py-0.5 bg-cyberblue/20 text-cyberblue rounded text-xs">
                      {user.accountType}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Active Since:</span>
                    <span>{user.activeSince}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Security Status:</span>
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-500 rounded text-xs">
                      Secure
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="cyber-card">
                <h2 className="text-xl font-medium mb-6">Security Options</h2>
                
                <div className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleResetPassword}
                  >
                    <LockKeyhole className="mr-2 h-4 w-4" />
                    Change Graphical Password
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="mr-2 h-4 w-4" />
                    Two-Factor Authentication
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Right Column: Activity Log */}
            <div className="lg:col-span-2 space-y-6">
              <div className="cyber-card">
                <h2 className="text-xl font-medium mb-6">Recent Activity</h2>
                
                <div className="space-y-4">
                  {activityLog.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-3 border border-white/5 rounded bg-black/20 hover:bg-black/30 transition-colors">
                      {getActivityIcon(activity)}
                      
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">
                              {activity.type === "login" 
                                ? `Login ${activity.success ? "Successful" : "Failed"}` 
                                : "Password Changed"}
                            </p>
                            <p className="text-xs text-gray-400">{activity.device}</p>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock size={12} className="mr-1" />
                            {activity.timestamp}
                          </div>
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          <span>IP: {activity.ip}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="link" className="text-cyberblue">
                    View Full Activity Log
                  </Button>
                </div>
              </div>
              
              <div className="cyber-card">
                <h2 className="text-xl font-medium mb-6">Security Statistics</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 border border-white/5 rounded bg-black/20 text-center">
                    <div className="text-3xl font-bold text-cyberblue">3</div>
                    <div className="text-sm text-gray-400">Login Attempts</div>
                    <div className="text-xs text-gray-500">Last 7 Days</div>
                  </div>
                  
                  <div className="p-4 border border-white/5 rounded bg-black/20 text-center">
                    <div className="text-3xl font-bold text-green-500">100%</div>
                    <div className="text-sm text-gray-400">Success Rate</div>
                    <div className="text-xs text-gray-500">Last 30 Days</div>
                  </div>
                  
                  <div className="p-4 border border-white/5 rounded bg-black/20 text-center">
                    <div className="text-3xl font-bold text-cyberblue">45</div>
                    <div className="text-sm text-gray-400">Days</div>
                    <div className="text-xs text-gray-500">Since Password Change</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Security Score</h3>
                  
                  <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyberblue to-green-500" style={{ width: "85%" }}></div>
                  </div>
                  
                  <div className="mt-2 flex justify-between text-xs">
                    <span className="text-gray-400">85/100</span>
                    <span className="text-green-500">Excellent</span>
                  </div>
                  
                  <div className="mt-4 p-3 border border-cyberblue/20 rounded bg-cyberblue/10">
                    <div className="flex items-start gap-3">
                      <Info size={16} className="text-cyberblue mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-cyberblue">Security Recommendation</p>
                        <p className="text-xs text-gray-300">Enable two-factor authentication to further increase your account security.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
