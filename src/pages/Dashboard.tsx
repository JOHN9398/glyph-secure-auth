
import { useState, useEffect } from "react";
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
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

// Define our validation schema
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  dob: z.date().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  bio: z.string().optional()
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Get user data from localStorage or use default values
  const getUserData = () => {
    const storedUser = localStorage.getItem('user');
    try {
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        // If we have stored user details from login, use them
        return {
          name: userData.name || "Alex Johnson",
          email: userData.email || "alex@example.com",
          accountType: userData.accountType || "Premium",
          activeSince: userData.activeSince || "January 15, 2025",
          dob: userData.dob ? new Date(userData.dob) : undefined,
          phone: userData.phone || "",
          address: userData.address || "",
          bio: userData.bio || ""
        };
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
    
    // Default values
    return {
      name: "Alex Johnson",
      email: "alex@example.com",
      accountType: "Premium",
      activeSince: "January 15, 2025",
      dob: undefined,
      phone: "",
      address: "",
      bio: ""
    };
  };
  
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(getUserData());
  const [lastLogin, setLastLogin] = useState<string | null>(null);
  
  // Setup form with react-hook-form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      dob: user.dob,
      phone: user.phone,
      address: user.address,
      bio: user.bio
    }
  });
  
  // Get last login info from localStorage
  useEffect(() => {
    try {
      // Try to get the last login time from localStorage
      const lastLoginTime = localStorage.getItem('lastLoginTime');
      if (lastLoginTime) {
        const loginDate = new Date(JSON.parse(lastLoginTime));
        setLastLogin(format(loginDate, "PPP 'at' p"));
      }
      
      // If there's no last login time recorded, set it to now (first visit)
      if (!lastLoginTime) {
        const now = new Date();
        localStorage.setItem('lastLoginTime', JSON.stringify(now.toISOString()));
        setLastLogin(format(now, "PPP 'at' p"));
      }
    } catch (error) {
      console.error("Error getting last login time:", error);
    }
  }, []);
  
  // Update form values when user data changes
  useEffect(() => {
    form.reset({
      name: user.name,
      email: user.email,
      dob: user.dob,
      phone: user.phone,
      address: user.address,
      bio: user.bio
    });
  }, [user, form]);

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account."
    });
    
    // Record the last logout time
    const now = new Date();
    localStorage.setItem('lastLoginTime', JSON.stringify(now.toISOString()));
    
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
    if (isEditing) {
      // Submit the form if we're exiting edit mode
      form.handleSubmit(onSubmit)();
    } else {
      // Reset form to current values when entering edit mode
      form.reset({
        name: user.name,
        email: user.email,
        dob: user.dob,
        phone: user.phone,
        address: user.address,
        bio: user.bio
      });
    }
    
    setIsEditing(!isEditing);
  };
  
  const onSubmit = (data: ProfileFormValues) => {
    // Update user data with form values
    const updatedUser = {
      ...user,
      name: data.name,
      email: data.email,
      dob: data.dob,
      phone: data.phone || "",
      address: data.address || "",
      bio: data.bio || ""
    };
    
    // Update state and save to localStorage
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved."
    });
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
            
            {/* Notification and Account dropdown */}
            <div className="flex gap-3">
              {/* ... keep existing code (dropdown menus) */}
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
                  {/* ... keep existing code (notification items) */}
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
                  {/* ... keep existing code (account menu items) */}
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
                  {isEditing ? (
                    <Form {...form}>
                      <form className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input {...field} className="input-glow" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input {...field} className="input-glow" type="email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="dob"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date of Birth</FormLabel>
                              <FormControl>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "w-full justify-start text-left",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Select date</span>
                                      )}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      initialFocus
                                      className="p-3 pointer-events-auto"
                                    />
                                  </PopoverContent>
                                </Popover>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input {...field} className="input-glow" type="tel" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input {...field} className="input-glow" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>About Me</FormLabel>
                              <FormControl>
                                <Textarea {...field} className="input-glow min-h-[80px]" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </form>
                    </Form>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <p className="text-sm font-medium">{user.name}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <p className="text-sm font-medium">{user.email}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Date of Birth</Label>
                        <p className="text-sm font-medium">
                          {user.dob ? format(new Date(user.dob), "PPP") : "Not specified"}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <p className="text-sm font-medium">{user.phone || "Not specified"}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Address</Label>
                        <p className="text-sm font-medium">{user.address || "Not specified"}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>About Me</Label>
                        <p className="text-sm font-medium">{user.bio || "No bio information"}</p>
                      </div>
                    </div>
                  )}
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
              
              {/* Login Credentials Card */}
              <Card className="cyber-card border-cyberblue/20">
                <CardHeader>
                  <CardTitle className="text-xl font-medium">Login Credentials</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <p className="text-sm font-medium">{user.email}</p>
                    <p className="text-xs text-gray-400">Used for account login and recovery</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Password Type</Label>
                    <p className="text-sm font-medium">Graphical Password</p>
                    <p className="text-xs text-gray-400">Your account is secured with a pattern of clicks</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Last Login</Label>
                    <p className="text-sm font-medium">{lastLogin || "First login"}</p>
                    <p className="text-xs text-gray-400">Keep track of your account access</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleResetPassword}
                  >
                    <LockKeyhole className="mr-2 h-4 w-4" />
                    Change Graphical Password
                  </Button>
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
            
            {/* Right Column: Activity Log and Security Statistics */}
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
