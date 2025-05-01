import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Shield, Settings, LogOut, Bell, User, LockKeyhole,
  AlertTriangle, Clock, CheckCircle, Info, Calendar as CalendarIcon,
  Edit, Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  
  // Get user data from localStorage or use default values
  const storedUser = localStorage.getItem('user');
  const initialUser = storedUser ? JSON.parse(storedUser) : {
    name: "Alex Johnson",
    email: "alex@example.com",
    accountType: "Premium",
    activeSince: "January 15, 2025",
    dob: null,
    phone: "",
    address: "",
    bio: ""
  };
  
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    user.dob ? new Date(user.dob) : undefined
  );

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
    navigate("/reset-password");
  };
  
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Save data to localStorage when exiting edit mode
      localStorage.setItem('user', JSON.stringify(user));
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved."
      });
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setUser(prev => ({
        ...prev,
        dob: selectedDate.toISOString()
      }));
    }
  };
  
  const handleAccountSettings = () => {
    toast({
      title: "Account Settings",
      description: "Account settings functionality will be implemented soon."
    });
  };
  
  const handleSecuritySettings = () => {
    toast({
      title: "Security Settings",
      description: "Security settings functionality will be implemented soon."
    });
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
                  <DropdownMenuItem onClick={() => setIsEditing(true)}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleAccountSettings}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSecuritySettings}>
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
            {/* Left Column: User Profile Card */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="cyber-card border-cyberblue/20">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-medium">User Profile</CardTitle>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={handleEditToggle}
                      className="h-8 w-8"
                    >
                      {isEditing ? <Save size={16} /> : <Edit size={16} />}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input 
                        id="name" 
                        name="name" 
                        value={user.name} 
                        onChange={handleInputChange} 
                        className="input-glow"
                      />
                    ) : (
                      <p className="text-sm font-medium">{user.name}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input 
                        id="email" 
                        name="email" 
                        value={user.email} 
                        onChange={handleInputChange} 
                        className="input-glow"
                        type="email"
                      />
                    ) : (
                      <p className="text-sm font-medium">{user.email}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    {isEditing ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Select date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleDateChange}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <p className="text-sm font-medium">
                        {user.dob ? format(new Date(user.dob), "PPP") : "Not specified"}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    {isEditing ? (
                      <Input 
                        id="phone" 
                        name="phone" 
                        value={user.phone} 
                        onChange={handleInputChange} 
                        className="input-glow"
                        type="tel"
                      />
                    ) : (
                      <p className="text-sm font-medium">{user.phone || "Not specified"}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    {isEditing ? (
                      <Input 
                        id="address" 
                        name="address" 
                        value={user.address} 
                        onChange={handleInputChange} 
                        className="input-glow"
                      />
                    ) : (
                      <p className="text-sm font-medium">{user.address || "Not specified"}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">About Me</Label>
                    {isEditing ? (
                      <Textarea 
                        id="bio" 
                        name="bio" 
                        value={user.bio} 
                        onChange={handleInputChange} 
                        className="input-glow min-h-[80px]"
                      />
                    ) : (
                      <p className="text-sm font-medium">{user.bio || "No bio information"}</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full space-y-3">
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
                </CardFooter>
              </Card>
              
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
                  
                  <Button variant="outline" className="w-full justify-start" onClick={handleSecuritySettings}>
                    <Shield className="mr-2 h-4 w-4" />
                    Two-Factor Authentication
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start" onClick={handleAccountSettings}>
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
