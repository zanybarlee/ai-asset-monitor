
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface RegisterVisitorDialogProps {
  onVisitorRegistered: (visitor: any) => void;
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
    const newVisitor = {
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
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Visitor Name <span className="text-destructive">*</span>
            </label>
            <Input 
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium">
                Company <span className="text-destructive">*</span>
              </label>
              <Input 
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="host" className="text-sm font-medium">
                Host <span className="text-destructive">*</span>
              </label>
              <Input 
                id="host"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                placeholder="Host employee name"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="purpose" className="text-sm font-medium">
              Visit Purpose <span className="text-destructive">*</span>
            </label>
            <Textarea 
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Purpose of the visit"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <Input 
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </label>
              <Input 
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Contact number"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="visitDate" className="text-sm font-medium">
                Visit Date <span className="text-destructive">*</span>
              </label>
              <Input 
                id="visitDate"
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="visitTime" className="text-sm font-medium">
                Visit Time <span className="text-destructive">*</span>
              </label>
              <Input 
                id="visitTime"
                type="time"
                value={visitTime}
                onChange={(e) => setVisitTime(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="accessLevel" className="text-sm font-medium">
                Access Level
              </label>
              <Select value={accessLevel} onValueChange={setAccessLevel}>
                <SelectTrigger id="accessLevel">
                  <SelectValue placeholder="Select access level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Limited">Limited</SelectItem>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Extended">Extended</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2 mt-8">
              <Checkbox
                id="requiresEscort"
                checked={requiresEscort}
                onCheckedChange={(checked) => 
                  setRequiresEscort(checked as boolean)
                }
              />
              <label htmlFor="requiresEscort" className="text-sm font-medium">
                Requires Escort
              </label>
            </div>
          </div>
          
          <div className="border-t pt-4 mt-2">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreed"
                checked={agreed}
                onCheckedChange={(checked) => 
                  setAgreed(checked as boolean)
                }
              />
              <label htmlFor="agreed" className="text-sm">
                I confirm this visitor has been approved for facility access and understands all security protocols and requirements.
              </label>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button type="submit">Register Visitor</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default RegisterVisitorDialog;
