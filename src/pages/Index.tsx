import { useState } from "react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { AadhaarStep } from "@/components/forms/AadhaarStep";
import { PanStep } from "@/components/forms/PanStep";
import { ConfirmationStep } from "@/components/forms/ConfirmationStep";
import { SuccessStep } from "@/components/forms/SuccessStep";
import { WebScrapingDemo } from "@/components/demo/WebScrapingDemo";
import { Badge } from "@/components/ui/badge";
import { Building2, Shield, FileText } from "lucide-react";

interface FormData {
  aadhaarNumber?: string;
  name?: string;
  otp?: string;
  panNumber?: string;
  organizationType?: string;
  socialCategory?: string;
  gender?: string;
  physicallyHandicapped?: string;
  enterpriseName?: string;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});

  const steps = ["Aadhaar Verification", "PAN & Business Details", "Review & Confirm", "Completion"];
  
  const handleNext = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleEdit = (step: number) => {
    setCurrentStep(step);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setFormData({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary-muted/30">
      {/* Header */}
      <header className="bg-gradient-header text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Udyam Registration Portal</h1>
                <p className="text-primary-foreground/90 text-sm">Ministry of Micro, Small & Medium Enterprises</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-white/10 text-primary-foreground border-white/30">
              Government of India
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              New Enterprise Registration
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Register your micro, small, or medium enterprise with the Government of India. 
              Complete the process in just 2 simple steps.
            </p>
          </div>

          <div className="mb-8">
            <ProgressBar 
              currentStep={currentStep} 
              totalSteps={steps.length} 
              steps={steps}
            />
          </div>

          {/* Web Scraping Demo Section */}
          <WebScrapingDemo />

          <div className="flex justify-center">
            {currentStep === 0 && (
              <AadhaarStep 
                onNext={handleNext}
                data={formData}
              />
            )}
            
            {currentStep === 1 && (
              <PanStep 
                onNext={handleNext}
                onBack={handleBack}
                data={formData}
              />
            )}
            
            {currentStep === 2 && (
              <ConfirmationStep 
                onNext={handleNext}
                onBack={handleBack}
                onEdit={handleEdit}
                formData={formData}
              />
            )}
            
            {currentStep === 3 && (
              <SuccessStep 
                formData={formData}
                onReset={handleReset}
              />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Government of India. All rights reserved.</p>
            <p className="mt-1">This is a demo implementation for educational purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
