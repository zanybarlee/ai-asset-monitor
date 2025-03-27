
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface AddLocationDialogProps {
  onClose: () => void;
}

const AddLocationDialog = ({ onClose }: AddLocationDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    buildingCode: "",
    floor: "",
    room: "",
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.buildingCode) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate adding a location
    toast({
      title: "Location added",
      description: "The new location has been created",
    });
    
    onClose();
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Add New Location</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="required">Location Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Main Control Room"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="buildingCode" className="required">Building Code</Label>
            <Input
              id="buildingCode"
              value={formData.buildingCode}
              onChange={handleChange}
              placeholder="e.g., B-101"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="floor">Floor</Label>
              <Input
                id="floor"
                type="number"
                value={formData.floor}
                onChange={handleChange}
                placeholder="e.g., 2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="room">Room Number</Label>
              <Input
                id="room"
                value={formData.room}
                onChange={handleChange}
                placeholder="e.g., 201A"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Create Location</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default AddLocationDialog;
