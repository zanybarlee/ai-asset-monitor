
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Calendar as CalendarIcon, Filter, GraduationCap, Plus, Search, Shield, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockCertifications } from "@/components/people-management/mock-data";
import AddTrainingDialog from "@/components/people-management/AddTrainingDialog";

const Training = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [showAddTraining, setShowAddTraining] = useState(false);

  // Filter certifications based on search and expiry status
  const filteredCertifications = mockCertifications.filter((cert) => {
    const matchesSearch = 
      cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.person.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "expiring-soon") {
      const expiryDate = new Date(cert.expiryDate);
      const today = new Date();
      const daysDifference = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return matchesSearch && daysDifference <= 30 && daysDifference > 0;
    }
    if (selectedTab === "expired") {
      const expiryDate = new Date(cert.expiryDate);
      const today = new Date();
      return matchesSearch && expiryDate < today;
    }
    
    return matchesSearch;
  });

  const getCertificationStatus = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysDifference = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (expiry < today) {
      return { status: "Expired", className: "bg-destructive text-destructive-foreground" };
    } else if (daysDifference <= 30) {
      return { status: "Expiring soon", className: "bg-amber-500 text-white" };
    } else {
      return { status: "Valid", className: "bg-emerald-500 text-white" };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2 flex-1 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by certification or person..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Button onClick={() => setShowAddTraining(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Training Record
        </Button>
      </div>

      <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All Certifications</TabsTrigger>
          <TabsTrigger value="expiring-soon">Expiring Soon</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCertifications.map((cert) => {
              const status = getCertificationStatus(cert.expiryDate);
              return (
                <Card key={cert.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">{cert.name}</CardTitle>
                      <Badge className={status.className}>
                        {status.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{cert.person}</p>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Issued: {formatDate(cert.issueDate)}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Expires: {formatDate(cert.expiryDate)}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Issuer: {cert.issuer}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Renew</Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        
        <TabsContent value="expiring-soon" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCertifications.map((cert) => {
              const status = getCertificationStatus(cert.expiryDate);
              return (
                <Card key={cert.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">{cert.name}</CardTitle>
                      <Badge className={status.className}>
                        {status.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{cert.person}</p>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Issued: {formatDate(cert.issueDate)}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Expires: {formatDate(cert.expiryDate)}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Issuer: {cert.issuer}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Renew</Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        
        <TabsContent value="expired" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCertifications.map((cert) => {
              const status = getCertificationStatus(cert.expiryDate);
              return (
                <Card key={cert.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">{cert.name}</CardTitle>
                      <Badge className={status.className}>
                        {status.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{cert.person}</p>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Issued: {formatDate(cert.issueDate)}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Expires: {formatDate(cert.expiryDate)}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Issuer: {cert.issuer}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Renew</Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Display message when no results found */}
      {filteredCertifications.length === 0 && (
        <div className="text-center py-10">
          <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No certifications found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters.
          </p>
        </div>
      )}

      {/* Add Training Dialog */}
      {showAddTraining && (
        <AddTrainingDialog
          open={showAddTraining}
          onClose={() => setShowAddTraining(false)}
        />
      )}
    </div>
  );
};

export default Training;
