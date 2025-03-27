
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Filter, Plus, Search, User, UserPlus, BadgeCheck, Clock, MapPin, Wrench, UserCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { mockPersonnel } from "@/components/people-management/mock-data";
import PersonDetails from "@/components/people-management/PersonDetails";
import PersonForm from "@/components/people-management/PersonForm";

const Directory = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const [showPersonDetails, setShowPersonDetails] = useState(false);

  // Filter personnel based on search, department and type
  const filteredPersonnel = mockPersonnel.filter((person) => {
    const matchesSearch = 
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDepartment = selectedDepartment === "all" || person.department === selectedDepartment;
    const matchesType = selectedType === "all" || person.type === selectedType;
    
    return matchesSearch && matchesDepartment && matchesType;
  });

  const handleAddPerson = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleViewProfile = (personId: string) => {
    setSelectedPersonId(personId);
    setShowPersonDetails(true);
  };

  const handleCloseDetails = () => {
    setShowPersonDetails(false);
    setSelectedPersonId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2 flex-1 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name, job title, or skills..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select 
            value={selectedDepartment} 
            onValueChange={setSelectedDepartment}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="Facilities">Facilities</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
              <SelectItem value="Security">Security</SelectItem>
              <SelectItem value="Management">Management</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={selectedType} 
            onValueChange={setSelectedType}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Employee">Employees</SelectItem>
              <SelectItem value="Contractor">Contractors</SelectItem>
              <SelectItem value="Vendor">Vendors</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={handleAddPerson}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Person
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPersonnel.map((person) => (
          <Card key={person.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={person.avatar} alt={person.name} />
                  <AvatarFallback>{person.name.charAt(0)}{person.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{person.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{person.jobTitle}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Badge variant={person.type === "Employee" ? "default" : person.type === "Contractor" ? "secondary" : "outline"}>
                    {person.type}
                  </Badge>
                  <span className="text-muted-foreground ml-2">{person.department}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {person.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="outline" className="bg-background">
                      {skill}
                    </Badge>
                  ))}
                  {person.skills.length > 3 && (
                    <Badge variant="outline" className="bg-background">
                      +{person.skills.length - 3} more
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BadgeCheck className="h-4 w-4" />
                  <span>{person.certifications.length} certifications</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => handleViewProfile(person.id)}>
                View Profile
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Display message when no results found */}
      {filteredPersonnel.length === 0 && (
        <div className="text-center py-10">
          <User className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No personnel found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters.
          </p>
        </div>
      )}

      {/* Person Form Dialog */}
      {showForm && (
        <PersonForm
          open={showForm}
          onClose={handleCloseForm}
        />
      )}

      {/* Person Details Dialog */}
      {showPersonDetails && selectedPersonId && (
        <PersonDetails
          open={showPersonDetails}
          onClose={handleCloseDetails}
          personId={selectedPersonId}
        />
      )}
    </div>
  );
};

export default Directory;
