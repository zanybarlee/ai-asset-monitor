
import { Input } from "@/components/ui/input";

interface VisitorScheduleProps {
  visitDate: string;
  setVisitDate: (value: string) => void;
  visitTime: string;
  setVisitTime: (value: string) => void;
}

const VisitorSchedule = ({
  visitDate,
  setVisitDate,
  visitTime,
  setVisitTime,
}: VisitorScheduleProps) => {
  return (
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
  );
};

export default VisitorSchedule;
