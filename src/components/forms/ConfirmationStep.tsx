import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Loader2, FileCheck, Edit, CheckCircle2, AlertTriangle, User, Building, CreditCard } from "lucide-react";

interface ConfirmationStepProps {
  onNext: (finalData: any) => void;
  onBack: () => void;
  onEdit: (step: number) => void;
  formData: any;
}

export const ConfirmationStep = ({ onNext, onBack, onEdit, formData }: ConfirmationStepProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { toast } = useToast();

  const handleFinalSubmit = async () => {
    if (!agreedToTerms) {
      toast({
        title: "Terms & Conditions Required",
        description: "Please agree to the terms and conditions before submitting",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate final submission process
    setTimeout(() => {
      const finalData = {
        ...formData,
        submissionTimestamp: new Date().toISOString(),
        applicationId: `UD${Date.now()}`,
        status: "SUBMITTED",
        termsAccepted: true,
        finalValidation: {
          aadhaarVerified: true,
          panValidated: true,
          dataComplete: true,
          termsAccepted: true
        }
      };
      
      setIsSubmitting(false);
      toast({
        title: "Application Submitted Successfully",
        description: "Your Udyam registration has been submitted for processing",
      });
      
      onNext(finalData);
    }, 3000);
  };

  const formatAadhaar = (aadhaar: string) => {
    if (!aadhaar) return "";
    return aadhaar.replace(/(\d{4})(\d{4})(\d{4})/, "XXXX XXXX $3");
  };

  const isDataComplete = formData.aadhaarNumber && 
                        formData.name && 
                        formData.panNumber && 
                        formData.organizationType && 
                        formData.enterpriseName;

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-form">
      <CardHeader className="bg-gradient-header text-primary-foreground rounded-t-lg">
        <div className="flex items-center gap-3">
          <FileCheck className="h-6 w-6" />
          <div>
            <CardTitle className="text-xl">Review & Confirmation</CardTitle>
            <CardDescription className="text-primary-foreground/90">
              Step 3: Review your details and submit your application
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Data Completeness Check */}
        <div className={`p-4 rounded-lg border ${isDataComplete ? 'bg-success-muted border-success' : 'bg-destructive/10 border-destructive'}`}>
          <div className="flex items-center gap-3">
            {isDataComplete ? (
              <CheckCircle2 className="h-5 w-5 text-success" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-destructive" />
            )}
            <div>
              <p className="font-medium">
                {isDataComplete ? "All Required Information Complete" : "Missing Required Information"}
              </p>
              <p className="text-sm text-muted-foreground">
                {isDataComplete 
                  ? "Your application is ready for submission" 
                  : "Please complete all required fields before submitting"
                }
              </p>
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Personal Information
            </h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEdit(0)}
              className="text-xs"
            >
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
          </div>
          
          <div className="bg-accent/30 p-4 rounded-lg space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <p className="font-medium">{formData.name || "Not provided"}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Aadhaar Number</label>
                <p className="font-mono">{formatAadhaar(formData.aadhaarNumber) || "Not provided"}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant={formData.otp ? "default" : "outline"}>
                {formData.otp ? "✓ Aadhaar Verified" : "Aadhaar Not Verified"}
              </Badge>
            </div>
          </div>
        </div>

        <Separator />

        {/* Business Information Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              Business Information
            </h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEdit(1)}
              className="text-xs"
            >
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
          </div>
          
          <div className="bg-accent/30 p-4 rounded-lg space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Enterprise Name</label>
                <p className="font-medium">{formData.enterpriseName || "Not provided"}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Organization Type</label>
                <p className="font-medium">{formData.organizationType || "Not provided"}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Social Category</label>
                <p className="font-medium">{formData.socialCategory || "Not provided"}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Gender</label>
                <p className="font-medium">{formData.gender || "Not provided"}</p>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Physically Handicapped</label>
              <p className="font-medium">{formData.physicallyHandicapped || "Not provided"}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* PAN Information Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              PAN Information
            </h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEdit(1)}
              className="text-xs"
            >
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
          </div>
          
          <div className="bg-accent/30 p-4 rounded-lg">
            <div>
              <label className="text-sm font-medium text-muted-foreground">PAN Number</label>
              <p className="font-mono text-lg">{formData.panNumber || "Not provided"}</p>
            </div>
            
            <div className="mt-2">
              <Badge variant={formData.panNumber ? "default" : "outline"}>
                {formData.panNumber ? "✓ PAN Validated" : "PAN Not Validated"}
              </Badge>
            </div>
          </div>
        </div>

        <Separator />

        {/* Terms & Conditions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Terms & Conditions</h3>
          
          <div className="bg-muted p-4 rounded-lg max-h-32 overflow-y-auto text-sm">
            <p className="mb-2 font-medium">I hereby declare that:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• All information provided is true and correct to the best of my knowledge</li>
              <li>• I understand that providing false information may result in rejection of application</li>
              <li>• I agree to comply with all applicable laws and regulations</li>
              <li>• I authorize the verification of the information provided</li>
              <li>• I agree to the terms and conditions of Udyam Registration</li>
            </ul>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              id="terms"
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="rounded border-border"
            />
            <label htmlFor="terms" className="text-sm font-medium">
              I agree to the terms and conditions and declare that the above information is true and correct
              <span className="text-destructive"> *</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6 border-t">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1"
            disabled={isSubmitting}
          >
            Back to Details
          </Button>
          
          <Button
            onClick={handleFinalSubmit}
            disabled={!isDataComplete || !agreedToTerms || isSubmitting}
            className="flex-1 bg-success hover:bg-success/90 shadow-button"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting Application...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Submit Application
              </>
            )}
          </Button>
        </div>

        {isSubmitting && (
          <div className="bg-primary-muted p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <div>
                <p className="font-medium">Processing your application...</p>
                <p className="text-sm text-muted-foreground">
                  Please wait while we validate and submit your Udyam registration
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};