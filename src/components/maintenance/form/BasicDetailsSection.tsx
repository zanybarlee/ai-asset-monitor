
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface BasicDetailsSectionProps {
  maintenanceTitle: string;
  setMaintenanceTitle: (value: string) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  recurrence: string;
  setRecurrence: (value: string) => void;
}

const BasicDetailsSection = ({
  maintenanceTitle,
  setMaintenanceTitle,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  recurrence,
  setRecurrence
}: BasicDetailsSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Basic Details</h3>
      
      <div className="space-y-2">
        <Label htmlFor="title">Maintenance Title</Label>
        <Input 
          id="title" 
          value={maintenanceTitle}
          onChange={(e) => setMaintenanceTitle(e.target.value)}
          placeholder="Rainwater Harvesting System Weekly" 
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start-date">Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="start-date"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="end-date">End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="end-date"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="recurrence">Recurrence</Label>
        <div className="flex items-center rounded-md border p-1">
          <Button 
            type="button"
            variant={recurrence === "daily" ? "default" : "ghost"}
            className="flex-1 text-xs h-8"
            onClick={() => setRecurrence("daily")}
          >
            Daily
          </Button>
          <Button 
            type="button"
            variant={recurrence === "weekly" ? "default" : "ghost"}
            className="flex-1 text-xs h-8"
            onClick={() => setRecurrence("weekly")}
          >
            Weekly
          </Button>
          <Button 
            type="button"
            variant={recurrence === "monthly" ? "default" : "ghost"}
            className="flex-1 text-xs h-8"
            onClick={() => setRecurrence("monthly")}
          >
            Monthly
          </Button>
          <Button 
            type="button"
            variant={recurrence === "yearly" ? "default" : "ghost"}
            className="flex-1 text-xs h-8"
            onClick={() => setRecurrence("yearly")}
          >
            Yearly
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BasicDetailsSection;
