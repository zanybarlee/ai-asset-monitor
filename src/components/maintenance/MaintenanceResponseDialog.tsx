
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaintenanceTask } from "./schedule/maintenance-data";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";
import { Part, Labor, ResponseDialogProps } from "./response/types";
import TaskHeader from "./response/TaskHeader";
import DetailsTab from "./response/DetailsTab";
import CostsTab from "./response/CostsTab";
import AttachmentsTab from "./response/AttachmentsTab";

const MaintenanceResponseDialog = ({ open, onClose, task }: ResponseDialogProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("details");
  const [completionNotes, setCompletionNotes] = useState("");
  const [parts, setParts] = useState<Part[]>([]);
  const [labor, setLabor] = useState<Labor[]>([]);
  const [attachments, setAttachments] = useState<string[]>(["Maintenance_Report.pdf"]);
  
  const handleCompleteTask = () => {
    toast({
      title: "Maintenance Task Completed",
      description: "Your response has been recorded successfully."
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <span>{task.id}</span>
            <span className="text-lg font-normal">-</span>
            <span className="font-normal">{task.title}</span>
          </DialogTitle>
        </DialogHeader>
        
        <TaskHeader task={task} />
        
        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Response Details</TabsTrigger>
            <TabsTrigger value="costs">Parts & Labor</TabsTrigger>
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <DetailsTab 
              completionNotes={completionNotes} 
              setCompletionNotes={setCompletionNotes} 
            />
          </TabsContent>
          
          <TabsContent value="costs">
            <CostsTab 
              parts={parts}
              setParts={setParts}
              labor={labor}
              setLabor={setLabor}
            />
          </TabsContent>
          
          <TabsContent value="attachments">
            <AttachmentsTab 
              attachments={attachments}
              setAttachments={setAttachments}
            />
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleCompleteTask}>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Submit Response
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MaintenanceResponseDialog;
