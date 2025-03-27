
import { AlertTriangle } from "lucide-react";
import EmergencyRequestsTable from "./EmergencyRequestsTable";

interface EmergencySectionProps {
  onViewDetails: (orderId: string) => void;
}

const EmergencySection = ({ onViewDetails }: EmergencySectionProps) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <AlertTriangle className="mr-2 h-5 w-5 text-destructive" />
        Emergency Requests
      </h3>
      <EmergencyRequestsTable onViewDetails={onViewDetails} />
    </div>
  );
};

export default EmergencySection;
