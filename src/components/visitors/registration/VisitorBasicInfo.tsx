
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface VisitorBasicInfoProps {
  name: string;
  setName: (value: string) => void;
  company: string;
  setCompany: (value: string) => void;
  purpose: string;
  setPurpose: (value: string) => void;
  host: string;
  setHost: (value: string) => void;
}

const VisitorBasicInfo = ({
  name,
  setName,
  company,
  setCompany,
  purpose,
  setPurpose,
  host,
  setHost,
}: VisitorBasicInfoProps) => {
  return (
    <>
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
    </>
  );
};

export default VisitorBasicInfo;
