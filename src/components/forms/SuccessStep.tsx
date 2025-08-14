import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Download, FileText, Mail } from "lucide-react";

interface SuccessStepProps {
  formData: any;
  onReset: () => void;
}

export const SuccessStep = ({ formData, onReset }: SuccessStepProps) => {
  const handleDownloadReceipt = () => {
    // Generate a simple receipt
    const receiptData = {
      ...formData,
      submissionTime: new Date().toLocaleString(),
      applicationId: `UD${Date.now()}`,
    };
    
    const blob = new Blob([JSON.stringify(receiptData, null, 2)], {
      type: 'application/json',
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `udyam-registration-${receiptData.applicationId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-form">
      <CardHeader className="bg-gradient-success text-success-foreground rounded-t-lg text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div>
            <CardTitle className="text-2xl">Registration Successful!</CardTitle>
            <p className="text-success-foreground/90 mt-2">
              Your Udyam registration application has been submitted successfully
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        <div className="text-center space-y-4">
          <Badge variant="outline" className="text-sm px-4 py-2 bg-success-muted border-success">
            Application ID: UD{Date.now()}
          </Badge>
          
          <p className="text-muted-foreground">
            Your application has been submitted for processing. You will receive updates on your registered mobile number and email address.
          </p>
        </div>

        <div className="bg-accent/50 p-4 rounded-lg space-y-3">
          <h3 className="font-semibold text-accent-foreground flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Application Summary
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="font-medium">Applicant Name:</span>
              <p className="text-muted-foreground">{formData.name}</p>
            </div>
            
            <div>
              <span className="font-medium">PAN Number:</span>
              <p className="text-muted-foreground font-mono">{formData.panNumber}</p>
            </div>
            
            <div>
              <span className="font-medium">Enterprise Name:</span>
              <p className="text-muted-foreground">{formData.enterpriseName}</p>
            </div>
            
            <div>
              <span className="font-medium">Organization Type:</span>
              <p className="text-muted-foreground">{formData.organizationType}</p>
            </div>
            
            <div>
              <span className="font-medium">Social Category:</span>
              <p className="text-muted-foreground">{formData.socialCategory}</p>
            </div>
            
            <div>
              <span className="font-medium">Submission Time:</span>
              <p className="text-muted-foreground">{new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-accent-foreground">Next Steps:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
              Your application will be verified by the concerned authorities
            </li>
            <li className="flex items-start gap-2">
              <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              You will receive SMS and email updates on the status
            </li>
            <li className="flex items-start gap-2">
              <FileText className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              Upon approval, your Udyam certificate will be generated
            </li>
          </ul>
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button
            onClick={handleDownloadReceipt}
            variant="outline"
            className="flex-1"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Receipt
          </Button>
          
          <Button
            onClick={onReset}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            New Registration
          </Button>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          <p>This is a demo implementation of the Udyam registration form.</p>
          <p>No actual registration has been submitted to government servers.</p>
        </div>
      </CardContent>
    </Card>
  );
};