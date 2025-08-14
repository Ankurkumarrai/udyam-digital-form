import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, FileText, CheckCircle2, AlertCircle, Users, Building2 } from "lucide-react";

interface PanStepProps {
  onNext: (data: { 
    panNumber: string; 
    organizationType: string; 
    socialCategory: string;
    gender: string;
    physicallyHandicapped: string;
    enterpriseName: string;
  }) => void;
  onBack: () => void;
  data: any;
}

export const PanStep = ({ onNext, onBack, data }: PanStepProps) => {
  const [panNumber, setPanNumber] = useState(data.panNumber || "");
  const [organizationType, setOrganizationType] = useState(data.organizationType || "");
  const [socialCategory, setSocialCategory] = useState(data.socialCategory || "");
  const [gender, setGender] = useState(data.gender || "");
  const [physicallyHandicapped, setPhysicallyHandicapped] = useState(data.physicallyHandicapped || "");
  const [enterpriseName, setEnterpriseName] = useState(data.enterpriseName || "");
  const [isValidating, setIsValidating] = useState(false);
  const [isPanValid, setIsPanValid] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const validatePan = (pan: string) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const handlePanChange = (value: string) => {
    const upperValue = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
    setPanNumber(upperValue);
    setIsPanValid(false);
    
    if (errors.pan) {
      setErrors(prev => ({ ...prev, pan: "" }));
    }
  };

  const handleValidatePan = async () => {
    if (!validatePan(panNumber)) {
      setErrors({ pan: "Please enter a valid PAN number (Format: ABCDE1234F)" });
      return;
    }

    setIsValidating(true);
    
    // Simulate PAN validation
    setTimeout(() => {
      setIsValidating(false);
      setIsPanValid(true);
      toast({
        title: "PAN Validated Successfully",
        description: "PAN number is valid and active",
      });
    }, 2000);
  };

  const handleSubmit = () => {
    setErrors({});
    
    const newErrors: Record<string, string> = {};
    
    if (!isPanValid) {
      newErrors.pan = "Please validate your PAN number first";
    }
    
    if (!organizationType) {
      newErrors.organizationType = "Please select organization type";
    }
    
    if (!socialCategory) {
      newErrors.socialCategory = "Please select social category";
    }
    
    if (!gender) {
      newErrors.gender = "Please select gender";
    }
    
    if (!physicallyHandicapped) {
      newErrors.physicallyHandicapped = "Please select this field";
    }
    
    if (!enterpriseName.trim()) {
      newErrors.enterpriseName = "Enterprise name is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext({
      panNumber,
      organizationType,
      socialCategory,
      gender,
      physicallyHandicapped,
      enterpriseName,
    });
  };

  const organizationTypes = [
    "Proprietorship Firm",
    "Partnership Firm",
    "Hindu Undivided Family (HUF)",
    "Private Limited Company",
    "Public Limited Company",
    "Limited Liability Partnership (LLP)",
    "Cooperative Society",
    "Self Help Group",
  ];

  const socialCategories = [
    "General/Open",
    "Scheduled Caste (SC)",
    "Scheduled Tribe (ST)",
    "Other Backward Class (OBC)",
  ];

  const genderOptions = ["Male", "Female", "Other"];
  const handicapOptions = ["No", "Yes"];

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-form">
      <CardHeader className="bg-gradient-header text-primary-foreground rounded-t-lg">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6" />
          <div>
            <CardTitle className="text-xl">PAN & Business Details</CardTitle>
            <CardDescription className="text-primary-foreground/90">
              Step 2: Verify PAN and provide business information
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        <div className="bg-accent/50 p-4 rounded-lg border-l-4 border-primary">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-accent-foreground mb-1">PAN Requirement:</p>
              <p className="text-muted-foreground">
                PAN number is mandatory for all business registrations. Ensure the PAN belongs to the authorized signatory of the enterprise.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* PAN Number Section */}
          <div className="space-y-2">
            <Label htmlFor="pan" className="text-sm font-medium">
              PAN Number / पैन संख्या <span className="text-destructive">*</span>
            </Label>
            <div className="flex gap-2">
              <Input
                id="pan"
                type="text"
                value={panNumber}
                onChange={(e) => handlePanChange(e.target.value)}
                placeholder="ABCDE1234F"
                className={`font-mono text-lg ${errors.pan ? "border-destructive" : isPanValid ? "border-success" : ""}`}
                disabled={isPanValid}
              />
              {!isPanValid ? (
                <Button
                  onClick={handleValidatePan}
                  disabled={!validatePan(panNumber) || isValidating}
                  variant="outline"
                  className="whitespace-nowrap"
                >
                  {isValidating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Validating...
                    </>
                  ) : (
                    "Validate PAN"
                  )}
                </Button>
              ) : (
                <div className="flex items-center px-3 bg-success-muted rounded-md">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
              )}
            </div>
            {errors.pan && (
              <p className="text-sm text-destructive">{errors.pan}</p>
            )}
            {isPanValid && (
              <p className="text-sm text-success flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" />
                PAN verified successfully
              </p>
            )}
          </div>

          {/* Organization Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Organization Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Type of Organization <span className="text-destructive">*</span>
                </Label>
                <Select value={organizationType} onValueChange={setOrganizationType}>
                  <SelectTrigger className={errors.organizationType ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select organization type" />
                  </SelectTrigger>
                  <SelectContent>
                    {organizationTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.organizationType && (
                  <p className="text-sm text-destructive">{errors.organizationType}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Social Category <span className="text-destructive">*</span>
                </Label>
                <Select value={socialCategory} onValueChange={setSocialCategory}>
                  <SelectTrigger className={errors.socialCategory ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select social category" />
                  </SelectTrigger>
                  <SelectContent>
                    {socialCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.socialCategory && (
                  <p className="text-sm text-destructive">{errors.socialCategory}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Gender <span className="text-destructive">*</span>
                </Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className={errors.gender ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {genderOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-sm text-destructive">{errors.gender}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Physically Handicapped <span className="text-destructive">*</span>
                </Label>
                <Select value={physicallyHandicapped} onValueChange={setPhysicallyHandicapped}>
                  <SelectTrigger className={errors.physicallyHandicapped ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    {handicapOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.physicallyHandicapped && (
                  <p className="text-sm text-destructive">{errors.physicallyHandicapped}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="enterprise" className="text-sm font-medium">
                Name of Enterprise/Business <span className="text-destructive">*</span>
              </Label>
              <Input
                id="enterprise"
                type="text"
                value={enterpriseName}
                onChange={(e) => setEnterpriseName(e.target.value)}
                placeholder="Enter enterprise/business name"
                className={errors.enterpriseName ? "border-destructive" : ""}
              />
              {errors.enterpriseName && (
                <p className="text-sm text-destructive">{errors.enterpriseName}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1"
            >
              Back to Aadhaar
            </Button>
            
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-success hover:bg-success/90 shadow-button"
            >
              Complete Registration
            </Button>
          </div>
        </div>

        <div className="text-center">
          <Badge variant="outline" className="text-xs">
            For demo: Use any valid PAN format like ABCDE1234F
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};