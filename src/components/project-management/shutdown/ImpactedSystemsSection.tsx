
import { useState, useEffect } from "react";
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

  // Initialize from existing form value
  useEffect(() => {
    const currentSystems = form.getValues().impactedSystems;
    if (currentSystems && currentSystems.length > 0) {
      setSelectedSystems(currentSystems);
    }
  }, [form]);

  const toggleSystem = (system: string) => {
    const newSelectedSystems = selectedSystems.includes(system) 
      ? selectedSystems.filter(s => s !== system) 
      : [...selectedSystems, system];
    
    setSelectedSystems(newSelectedSystems);
    form.setValue("impactedSystems", newSelectedSystems, { 
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
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
