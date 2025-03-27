
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ShutdownFormValues } from "./schema";
import { FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

interface ImpactedSystemsSectionProps {
  form: UseFormReturn<ShutdownFormValues>;
}

export const ImpactedSystemsSection = ({ form }: ImpactedSystemsSectionProps) => {
  const [selectedSystems, setSelectedSystems] = useState<string[]>([]);
  const availableSystems = [
    "Power Distribution", "UPS Systems", "Cooling Infrastructure", "Network Equipment", 
    "Servers", "Security Systems", "Fire Detection", "Building Management"
  ];

  const toggleSystem = (system: string) => {
    setSelectedSystems((prev) => 
      prev.includes(system) 
        ? prev.filter(s => s !== system) 
        : [...prev, system]
    );
  };

  return (
    <FormItem>
      <FormLabel>Impacted Systems *</FormLabel>
      <div className="flex flex-wrap gap-2 mt-2">
        {availableSystems.map((system) => (
          <Button
            key={system}
            type="button"
            variant={selectedSystems.includes(system) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleSystem(system)}
          >
            {system}
          </Button>
        ))}
      </div>
      {form.formState.errors.impactedSystems && (
        <p className="text-sm font-medium text-destructive mt-2">
          {form.formState.errors.impactedSystems.message}
        </p>
      )}
    </FormItem>
  );
};
