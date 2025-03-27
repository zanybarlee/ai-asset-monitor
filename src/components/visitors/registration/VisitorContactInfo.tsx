
import { Input } from "@/components/ui/input";

interface VisitorContactInfoProps {
  email: string;
  setEmail: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
}

const VisitorContactInfo = ({
  email,
  setEmail,
  phone,
  setPhone,
}: VisitorContactInfoProps) => {
  return (
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
  );
};

export default VisitorContactInfo;
