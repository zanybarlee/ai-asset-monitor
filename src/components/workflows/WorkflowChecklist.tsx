
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ChevronUp, ChevronDown, Plus, Trash } from "lucide-react";
import { ChecklistItem } from "./workflow-types";

interface WorkflowChecklistProps {
  checklist: ChecklistItem[];
}

const WorkflowChecklist = ({ checklist }: WorkflowChecklistProps) => {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Item Description</TableHead>
            <TableHead>Input Type</TableHead>
            <TableHead className="w-[100px] text-center">Required</TableHead>
            <TableHead className="w-[100px] text-center">Critical</TableHead>
            <TableHead className="w-[100px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {checklist.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-center">
                <div className="flex flex-col">
                  <Button variant="ghost" size="icon" className="h-5 w-5">
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-5 w-5">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.inputType}</TableCell>
              <TableCell className="text-center">
                <Switch checked={item.required} />
              </TableCell>
              <TableCell className="text-center">
                <Switch checked={item.critical} />
              </TableCell>
              <TableCell>
                <div className="flex justify-center space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="flex justify-end">
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>
    </div>
  );
};

export default WorkflowChecklist;
