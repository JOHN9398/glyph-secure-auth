
import { useState, useEffect } from "react";
import { ArrowRight, Mail, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

interface EmailVerificationProps {
  email: string;
  setEmail: (email: string) => void;
  enteredCode: string;
  setEnteredCode: (code: string) => void;
  verificationCode: string;
  setVerificationCode: (code: string) => void;
  verificationSent: boolean;
  setVerificationSent: (sent: boolean) => void;
  onVerifySuccess: () => void;
}

export const EmailVerification = ({
  email,
  setEmail,
  enteredCode,
  setEnteredCode,
  verificationCode,
  setVerificationCode,
  verificationSent,
  setVerificationSent,
  onVerifySuccess
}: EmailVerificationProps) => {
  const [resendDisabled, setResendDisabled] = useState<boolean>(false);
  const [resendCountdown, setResendCountdown] = useState<number>(0);

  // Handle sending verification code
  const handleSendVerification = () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address to continue.",
        variant: "destructive"
      });
      return;
    }

    // Check if user exists in localStorage
    const storedUserData = localStorage.getItem(`user_${email}`);
    if (!storedUserData) {
      toast({
        title: "Account not found",
        description: "No account found with this email. Please register first.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send a real verification code
    // For demo purposes, we'll generate a random code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(code);
    setVerificationSent(true);
    
    // Show the code (in a real app, this would be sent via email)
    toast({
      title: "Verification code sent",
      description: `For demo purposes, your verification code is: ${code}`,
    });
    
    // Disable resend button for 60 seconds
    setResendDisabled(true);
    setResendCountdown(60);
  };

  // Handle countdown for resend button
  useEffect(() => {
    let countdownInterval: number | undefined;
    
    if (resendDisabled && resendCountdown > 0) {
      countdownInterval = window.setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [resendDisabled, resendCountdown]);

  const handleVerifyCode = () => {
    if (!enteredCode) {
      toast({
        title: "Code required",
        description: "Please enter the verification code.",
        variant: "destructive"
      });
      return;
    }

    if (enteredCode === verificationCode) {
      toast({
        title: "Email verified",
        description: "Your email has been successfully verified."
      });
      onVerifySuccess();
    } else {
      toast({
        title: "Invalid code",
        description: "The verification code you entered is incorrect. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <h2 className="text-xl font-medium mb-6">Verify Your Email</h2>
      
      <div className="space-y-6">
        <div>
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Mail className="text-muted-foreground h-5 w-5" />
            </div>
            <Input 
              id="email"
              type="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-glow pl-10"
              disabled={verificationSent}
            />
          </div>
        </div>
        
        {!verificationSent ? (
          <Button 
            onClick={handleSendVerification}
            className="btn-neon w-full"
          >
            <span className="flex items-center justify-center gap-2">
              Send Verification Code <ArrowRight size={16} />
            </span>
          </Button>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="verificationCode">Verification Code</Label>
              <Input
                id="verificationCode"
                type="text"
                placeholder="Enter 6-digit code"
                value={enteredCode}
                onChange={(e) => setEnteredCode(e.target.value)}
                className="input-glow"
                maxLength={6}
              />
            </div>
            
            <div className="space-y-4">
              <Button
                onClick={handleVerifyCode}
                className="btn-neon w-full"
              >
                <span className="flex items-center justify-center gap-2">
                  Verify Code <ArrowRight size={16} />
                </span>
              </Button>
              
              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSendVerification}
                  disabled={resendDisabled}
                  className="text-xs"
                >
                  <RefreshCcw className="mr-2 h-3 w-3" />
                  {resendDisabled 
                    ? `Resend in ${resendCountdown}s` 
                    : "Resend verification code"}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      
      <div className="mt-6 text-center">
        <Link to="/login" className="text-sm text-cyberblue hover:underline">
          Back to login
        </Link>
      </div>
    </>
  );
};
