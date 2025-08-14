import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Shield, CheckCircle2, AlertCircle } from "lucide-react";

interface AadhaarStepProps {
  onNext: (data: { aadhaarNumber: string; name: string; otp?: string }) => void;
  data: { aadhaarNumber?: string; name?: string; otp?: string };
}

export const AadhaarStep = ({ onNext, data }: AadhaarStepProps) => {
  const [aadhaarNumber, setAadhaarNumber] = useState(data.aadhaarNumber || "");
  const [name, setName] = useState(data.name || "");
  const [otp, setOtp] = useState(data.otp || "");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const validateAadhaar = (number: string) => {
    const cleanNumber = number.replace(/\s/g, "");
    return /^\d{12}$/.test(cleanNumber);
  };

  const formatAadhaar = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    const limitedValue = cleanValue.slice(0, 12);
    return limitedValue.replace(/(\d{4})(\d{4})?(\d{4})?/g, (match, p1, p2, p3) => {
      return [p1, p2, p3].filter(Boolean).join(" ");
    });
  };

  const handleAadhaarChange = (value: string) => {
    const formatted = formatAadhaar(value);
    setAadhaarNumber(formatted);
    
    if (errors.aadhaar) {
      setErrors(prev => ({ ...prev, aadhaar: "" }));
    }
  };

  const handleSendOtp = async () => {
    setErrors({});
    
    if (!validateAadhaar(aadhaarNumber)) {
      setErrors({ aadhaar: "Please enter a valid 12-digit Aadhaar number" });
      return;
    }

    if (!name.trim()) {
      setErrors({ name: "Name is required" });
      return;
    }

    setIsSendingOtp(true);
    
    // Simulate OTP sending
    setTimeout(() => {
      setIsSendingOtp(false);
      setIsOtpSent(true);
      toast({
        title: "OTP Sent Successfully",
        description: "Please check your registered mobile number for the OTP",
      });
    }, 2000);
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setErrors({ otp: "Please enter a valid 6-digit OTP" });
      return;
    }

    setIsVerifying(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setIsVerifying(false);
      if (otp === "123456") {
        toast({
          title: "Aadhaar Verified Successfully",
          description: "Your identity has been verified",
        });
        onNext({ aadhaarNumber, name, otp });
      } else {
        setErrors({ otp: "Invalid OTP. Please try again." });
      }
    }, 2000);
  };

  const isFormValid = validateAadhaar(aadhaarNumber) && name.trim();

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-form">
      <CardHeader className="bg-gradient-header text-primary-foreground rounded-t-lg">
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6" />
          <div>
            <CardTitle className="text-xl">Aadhaar Verification</CardTitle>
            <CardDescription className="text-primary-foreground/90">
              Step 1: Verify your identity with Aadhaar
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        <div className="bg-accent/50 p-4 rounded-lg border-l-4 border-primary">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-accent-foreground mb-1">Important Note:</p>
              <p className="text-muted-foreground">
                Aadhaar number shall be required for Udyam Registration. The Aadhaar number shall be of the proprietor in case of proprietorship firm, managing partner in case of partnership firm, and karta in case of Hindu Undivided Family (HUF).
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="aadhaar" className="text-sm font-medium">
              Aadhaar Number / आधार संख्या <span className="text-destructive">*</span>
            </Label>
            <Input
              id="aadhaar"
              type="text"
              value={aadhaarNumber}
              onChange={(e) => handleAadhaarChange(e.target.value)}
              placeholder="XXXX XXXX XXXX"
              className={`text-lg font-mono ${errors.aadhaar ? "border-destructive" : ""}`}
              disabled={isOtpSent}
            />
            {errors.aadhaar && (
              <p className="text-sm text-destructive">{errors.aadhaar}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Name of Entrepreneur / उद्यमी का नाम <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name as per Aadhaar card"
              className={errors.name ? "border-destructive" : ""}
              disabled={isOtpSent}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          {!isOtpSent ? (
            <Button
              onClick={handleSendOtp}
              disabled={!isFormValid || isSendingOtp}
              className="w-full bg-primary hover:bg-primary/90 shadow-button"
              size="lg"
            >
              {isSendingOtp ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                "Send OTP"
              )}
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-success-muted rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="text-sm font-medium text-success-foreground">
                  OTP sent to registered mobile number
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otp" className="text-sm font-medium">
                  Enter OTP / ओटीपी दर्ज करें <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  className={`text-lg font-mono text-center ${errors.otp ? "border-destructive" : ""}`}
                  maxLength={6}
                />
                {errors.otp && (
                  <p className="text-sm text-destructive">{errors.otp}</p>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleSendOtp}
                  variant="outline"
                  disabled={isSendingOtp}
                  className="flex-1"
                >
                  {isSendingOtp ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Resending...
                    </>
                  ) : (
                    "Resend OTP"
                  )}
                </Button>

                <Button
                  onClick={handleVerifyOtp}
                  disabled={!otp || otp.length !== 6 || isVerifying}
                  className="flex-1 bg-success hover:bg-success/90 shadow-button"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify & Continue"
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <Badge variant="outline" className="text-xs">
            For demo: Use OTP 123456
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};