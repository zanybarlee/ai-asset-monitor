
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, MapPin, BadgeCheck, Calendar, ClipboardList, GraduationCap, Clock, FileText } from "lucide-react";
import { mockPersonnel, mockCertifications, mockSchedules } from "./mock-data";

interface PersonDetailsProps {
  open: boolean;
  onClose: () => void;
  personId: string;
}

const PersonDetails = ({ open, onClose, personId }: PersonDetailsProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const person = mockPersonnel.find(p => p.id === personId);
  const personCertifications = mockCertifications.filter(c => c.personId === personId);
  const personSchedules = mockSchedules.filter(s => s.personId === personId);
  
  if (!person) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Personnel Profile</DialogTitle>
          <DialogDescription>
            View detailed information about this personnel
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={person.avatar} alt={person.name} />
            <AvatarFallback className="text-lg">
              {person.name.charAt(0)}{person.name.split(' ')[1]?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{person.name}</h2>
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground">{person.jobTitle}</p>
              <Badge variant={person.type === "Employee" ? "default" : person.type === "Contractor" ? "secondary" : "outline"}>
                {person.type}
              </Badge>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="history">Work History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{person.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{person.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{person.location}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Employment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Department: {person.department}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Hire Date: {new Date(person.hireDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Reports to: {person.manager || "None"}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-2">
                  {person.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                    <BadgeCheck className="h-5 w-5 text-primary mb-1" />
                    <span className="text-sm text-muted-foreground">Certifications</span>
                    <span className="text-xl font-bold">{personCertifications.length}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                    <ClipboardList className="h-5 w-5 text-primary mb-1" />
                    <span className="text-sm text-muted-foreground">Work Orders</span>
                    <span className="text-xl font-bold">12</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                    <GraduationCap className="h-5 w-5 text-primary mb-1" />
                    <span className="text-sm text-muted-foreground">Training Hours</span>
                    <span className="text-xl font-bold">24</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="certifications" className="space-y-4 mt-4">
            {personCertifications.length > 0 ? (
              <div className="space-y-4">
                {personCertifications.map((cert) => {
                  const expiryDate = new Date(cert.expiryDate);
                  const today = new Date();
                  const isExpired = expiryDate < today;
                  const isExpiringSoon = !isExpired && ((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) <= 30;
                  
                  return (
                    <Card key={cert.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-base">{cert.name}</CardTitle>
                          <Badge className={
                            isExpired ? "bg-destructive text-destructive-foreground" :
                            isExpiringSoon ? "bg-amber-500 text-white" :
                            "bg-emerald-500 text-white"
                          }>
                            {isExpired ? "Expired" : isExpiringSoon ? "Expiring Soon" : "Valid"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>Issuer: {cert.issuer}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Issued: {new Date(cert.issueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Expires: {new Date(cert.expiryDate).toLocaleDateString()}</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <BadgeCheck className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No certifications found</h3>
                <p className="text-muted-foreground">
                  This person doesn't have any certifications recorded.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="schedule" className="mt-4">
            {personSchedules.length > 0 ? (
              <div className="space-y-4">
                {personSchedules.map((schedule) => (
                  <Card key={schedule.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">
                          {new Date(schedule.startDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </CardTitle>
                        <Badge variant="outline">{schedule.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Shift Time: {schedule.startTime} - {schedule.endTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>Department: {schedule.department}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No schedules found</h3>
                <p className="text-muted-foreground">
                  This person doesn't have any upcoming schedules.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="history" className="mt-4">
            <div className="text-center py-8">
              <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">Work history will be available soon</h3>
              <p className="text-muted-foreground">
                This feature is currently under development.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button>Edit Profile</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PersonDetails;
