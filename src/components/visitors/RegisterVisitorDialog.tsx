
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import VisitorBasicInfo from "./registration/VisitorBasicInfo";
import VisitorContactInfo from "./registration/VisitorContactInfo";
import VisitorSchedule from "./registration/VisitorSchedule";
import VisitorAccess from "./registration/VisitorAccess";
import SecurityAgreement from "./registration/SecurityAgreement";
import { Visitor } from "./types";

interface RegisterVisitorDialogProps {
  onVisitorRegistered: (visitor: Visitor) => void;
}

const RegisterVisitorDialog = ({ onVisitorRegistered }: RegisterVisitorDialogProps) => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [purpose, setPurpose] = useState("");
  const [host, setHost] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [accessLevel, setAccessLevel] = useState("Standard");
  const [requiresEscort, setRequiresEscort] = useState(true);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !company || !purpose || !host || !visitDate || !visitTime) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!agreed) {
      toast.error("You must agree to the security policy");
      return;
    }
    
    // Create new visitor with generated ID
    const newVisitor: Visitor = {
      id: `V-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      company,
      purpose,
      host,
      email,
      phone,
      checkIn: null,
      checkOut: null,
      status: "Scheduled",
      scheduledTime: `${visitDate}T${visitTime}:00`,
      accessLevel,
      requiresEscort
    };
    
    onVisitorRegistered(newVisitor);
    toast.success("Visitor registered successfully");
    
    // Reset form
    setName("");
    setCompany("");
    setPurpose("");
    setHost("");
    setEmail("");
    setPhone("");
    setVisitDate("");
    setVisitTime("");
    setAccessLevel("Standard");
    setRequiresEscort(true);
    setAgreed(false);
  };

  return (
    <DialogContent className="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle>Register New Visitor</DialogTitle>
        <DialogDescription>
          Register a visitor for access to the facility
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4 py-4">
        <div className="grid grid-cols-1 gap-4">
          <VisitorBasicInfo
            name={name}
            setName={setName}
            company={company}
            setCompany={setCompany}
            purpose={purpose}
            setPurpose={setPurpose}
            host={host}
            setHost={setHost}
          />
          
          <VisitorContactInfo
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
          />
          
          <VisitorSchedule
            visitDate={visitDate}
            setVisitDate={setVisitDate}
            visitTime={visitTime}
            setVisitTime={setVisitTime}
          />
          
          <VisitorAccess
            accessLevel={accessLevel}
            setAccessLevel={setAccessLevel}
            requiresEscort={requiresEscort}
            setRequiresEscort={setRequiresEscort}
          />
          
          <SecurityAgreement
            agreed={agreed}
            setAgreed={setAgreed}
          />
        </div>
        
        <DialogFooter>
          <Button type="submit">Register Visitor</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default RegisterVisitorDialog;
