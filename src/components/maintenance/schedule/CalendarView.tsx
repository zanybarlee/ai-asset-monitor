
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Filter, Calendar, CalendarClock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface CalendarViewProps {
  onScheduleNew: () => void;
}

const CalendarView = ({ onScheduleNew }: CalendarViewProps) => {
  const [date, setDate] = useState<Date>();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={onScheduleNew}>
          <CalendarClock className="mr-2 h-4 w-4" />
          Schedule
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8 border rounded-md border-dashed">
            <div className="text-center">
              <Calendar className="h-16 w-16 mx-auto text-muted-foreground" />
              <p className="mt-2 text-muted-foreground">Calendar view would display scheduled maintenance tasks</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarView;
