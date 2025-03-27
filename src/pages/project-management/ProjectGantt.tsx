
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockProjects } from "@/components/project-management/mock-data";
import { CalendarRange, Download, Filter, Printer, Share2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from "@/components/ui/resizable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const ProjectGantt = () => {
  const [selectedProject, setSelectedProject] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("month");
  
  // Filter projects based on selection
  const filteredProjects = selectedProject === "all" 
    ? mockProjects 
    : mockProjects.filter(project => project.id === selectedProject);

  // Calculate the timeline dates based on the selected timeframe
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(1); // Start from the first day of the month

  const endDate = new Date(today);
  if (selectedTimeframe === "week") {
    endDate.setDate(startDate.getDate() + 7);
  } else if (selectedTimeframe === "month") {
    endDate.setMonth(today.getMonth() + 1);
    endDate.setDate(0); // Last day of the current month
  } else if (selectedTimeframe === "quarter") {
    endDate.setMonth(today.getMonth() + 3);
    endDate.setDate(0); // Last day of the third month
  } else if (selectedTimeframe === "year") {
    endDate.setFullYear(today.getFullYear() + 1);
    endDate.setDate(0); // Last day of the year
  }

  // Generate time periods for the header
  const timeUnits = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    let label = "";
    
    if (selectedTimeframe === "week") {
      label = currentDate.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' });
      const nextDay = new Date(currentDate);
      nextDay.setDate(currentDate.getDate() + 1);
      timeUnits.push({ 
        label, 
        start: new Date(currentDate),
        end: nextDay
      });
      currentDate.setDate(currentDate.getDate() + 1);
    } else if (selectedTimeframe === "month") {
      label = currentDate.toLocaleDateString(undefined, { day: 'numeric' });
      const nextDay = new Date(currentDate);
      nextDay.setDate(currentDate.getDate() + 1);
      timeUnits.push({ 
        label, 
        start: new Date(currentDate),
        end: nextDay
      });
      currentDate.setDate(currentDate.getDate() + 1);
    } else if (selectedTimeframe === "quarter") {
      const weekNum = Math.ceil(currentDate.getDate() / 7);
      label = `W${weekNum}`;
      const nextWeek = new Date(currentDate);
      nextWeek.setDate(currentDate.getDate() + 7);
      timeUnits.push({ 
        label, 
        start: new Date(currentDate),
        end: nextWeek
      });
      currentDate.setDate(currentDate.getDate() + 7);
    } else if (selectedTimeframe === "year") {
      label = currentDate.toLocaleDateString(undefined, { month: 'short' });
      const nextMonth = new Date(currentDate);
      nextMonth.setMonth(currentDate.getMonth() + 1);
      timeUnits.push({ 
        label, 
        start: new Date(currentDate),
        end: nextMonth
      });
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  }

  // Function to determine if a date falls within a time unit
  const isDateInTimeUnit = (date: string, unit: { start: Date, end: Date }) => {
    const dateObj = new Date(date);
    return dateObj >= unit.start && dateObj < unit.end;
  };

  // Function to calculate bar width and position
  const calculateBarStyle = (project: any) => {
    const projectStart = new Date(project.startDate);
    const projectEnd = new Date(project.endDate);
    
    // Calculate the total timeframe duration in days
    const totalDuration = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    
    // Calculate project days that fall within our timeframe
    const visibleStart = projectStart < startDate ? startDate : projectStart;
    const visibleEnd = projectEnd > endDate ? endDate : projectEnd;
    
    // Calculate left position (how far from start of timeline)
    const daysFromStart = (visibleStart.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    const leftPercentage = (daysFromStart / totalDuration) * 100;
    
    // Calculate width based on visible duration
    const visibleDuration = (visibleEnd.getTime() - visibleStart.getTime()) / (1000 * 60 * 60 * 24);
    const widthPercentage = (visibleDuration / totalDuration) * 100;
    
    return {
      left: `${leftPercentage}%`,
      width: `${widthPercentage}%`,
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold">Project Timeline</h3>
          <p className="text-muted-foreground">Gantt chart view of project schedules and dependencies</p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
      
      <div className="flex gap-4 items-center">
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2">Project:</span>
          <Select 
            value={selectedProject} 
            onValueChange={setSelectedProject}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {mockProjects.map(project => (
                <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2">Timeframe:</span>
          <Select 
            value={selectedTimeframe} 
            onValueChange={setSelectedTimeframe}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="quarter">Quarter</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarRange className="mr-2 h-5 w-5 text-muted-foreground" />
            Project Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={25} minSize={20}>
              <div className="h-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">Project</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProjects.map(project => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div className="font-semibold">{project.name}</div>
                            <div className="text-xs text-muted-foreground">{project.id}</div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {/* Also add milestones rows */}
                    {filteredProjects.map(project => 
                      project.milestones.map((milestone, idx) => (
                        <TableRow key={`${project.id}-milestone-${idx}`}>
                          <TableCell className="py-1 pl-6">
                            <div className="text-sm">
                              <div>{milestone.name}</div>
                              <div className="text-xs text-muted-foreground">Milestone</div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel defaultSize={75}>
              <div className="h-full overflow-auto">
                <div className="min-w-[800px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {timeUnits.map((unit, index) => (
                          <TableHead key={index} className="text-center p-1 text-xs">
                            {unit.label}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* Project bars */}
                      {filteredProjects.map(project => (
                        <TableRow key={project.id}>
                          <TableCell className="relative p-0" colSpan={timeUnits.length}>
                            <div 
                              className="absolute h-6 my-1 rounded-sm bg-primary/80 text-white text-xs flex items-center px-2 overflow-hidden"
                              style={calculateBarStyle(project)}
                            >
                              {project.progress}% Complete
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      
                      {/* Milestone markers */}
                      {filteredProjects.map(project => 
                        project.milestones.map((milestone, idx) => (
                          <TableRow key={`${project.id}-milestone-${idx}`}>
                            <TableCell className="p-0 relative" colSpan={timeUnits.length}>
                              {timeUnits.map((unit, timeIdx) => (
                                isDateInTimeUnit(milestone.date, unit) && (
                                  <div 
                                    key={timeIdx}
                                    className={`absolute top-0 h-6 w-4 my-1 transform -translate-x-1/2 flex flex-col items-center`}
                                    style={{ 
                                      left: `${(timeIdx + 0.5) * (100 / timeUnits.length)}%`,
                                    }}
                                  >
                                    <div 
                                      className={`w-4 h-4 rounded-full ${
                                        milestone.status === "Completed" ? "bg-green-500" :
                                        milestone.status === "On Track" ? "bg-blue-500" :
                                        milestone.status === "At Risk" ? "bg-amber-500" :
                                        milestone.status === "In Progress" ? "bg-purple-500" :
                                        "bg-red-500"
                                      } border-2 border-white`}
                                    />
                                  </div>
                                )
                              ))}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Dependencies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-8 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Building A Power System Upgrade</p>
                    <p className="text-sm text-muted-foreground">Required for Data Hall 1 Expansion</p>
                  </div>
                </div>
                <div className="text-sm font-medium">Complete by Oct 1</div>
              </div>
              
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-8 bg-amber-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Network Infrastructure Upgrade</p>
                    <p className="text-sm text-muted-foreground">Required for Q4 Security Systems</p>
                  </div>
                </div>
                <div className="text-sm font-medium">Complete by Nov 10</div>
              </div>
              
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Equipment Delivery</p>
                    <p className="text-sm text-muted-foreground">Required for UPS Replacement</p>
                  </div>
                </div>
                <div className="text-sm font-medium">Complete by Dec 10</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Resource Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">Electrical Team</div>
                  <div className="text-sm">75% allocated</div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: "75%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">Mechanical Team</div>
                  <div className="text-sm">60% allocated</div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: "60%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">IT Team</div>
                  <div className="text-sm">90% allocated</div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: "90%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">Civil Team</div>
                  <div className="text-sm">40% allocated</div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: "40%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectGantt;
