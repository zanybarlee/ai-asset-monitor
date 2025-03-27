
import { ChecklistItem, WorkflowTemplate } from "./workflow-types";

export const workOrderTemplates: WorkflowTemplate[] = [
  {
    id: "steam-water",
    name: "STEAM WATER PUMP ROOM MAINTENANCE",
    status: "Active",
    department: "Maintenance",
    checklist: [
      {
        description: "Check for leaks in piping system",
        inputType: "Yes/No",
        required: true,
        critical: true
      },
      {
        description: "Check water level in tanks",
        inputType: "Numeric",
        required: true,
        critical: true
      },
      {
        description: "Verify pump operation (ON/OFF)",
        inputType: "Yes/No",
        required: true,
        critical: true
      },
      {
        description: "Check for unusual noise in pump operation",
        inputType: "Yes/No",
        required: true,
        critical: false
      },
      {
        description: "Check valve operation throughout the system",
        inputType: "Multi-select",
        required: true,
        critical: true
      },
      {
        description: "Inspect safety valves for proper operation",
        inputType: "Yes/No",
        required: true,
        critical: true
      },
      {
        description: "Check pressure gauges reading within normal parameters",
        inputType: "Numeric",
        required: true,
        critical: true
      },
      {
        description: "Verify temperature gauges reading within normal range",
        inputType: "Numeric",
        required: true,
        critical: true
      },
      {
        description: "Inspect condensate system for proper drainage",
        inputType: "Yes/No",
        required: true,
        critical: false
      }
    ]
  },
  {
    id: "electrical-panel",
    name: "ELECTRICAL PANEL INSPECTION",
    status: "Active",
    department: "Electrical",
    checklist: [
      {
        description: "Check for signs of overheating or burning",
        inputType: "Yes/No",
        required: true,
        critical: true
      },
      {
        description: "Verify all breakers are properly labeled",
        inputType: "Yes/No",
        required: true,
        critical: false
      },
      {
        description: "Check connections for tightness",
        inputType: "Yes/No",
        required: true,
        critical: true
      },
      {
        description: "Measure voltage at main terminals",
        inputType: "Numeric",
        required: true,
        critical: true
      }
    ]
  }
];

export const maintenanceTemplates: WorkflowTemplate[] = [
  {
    id: "hvac-maintenance",
    name: "QUARTERLY HVAC MAINTENANCE CHECKLIST",
    status: "Active",
    department: "Maintenance",
    checklist: [
      {
        description: "Clean or replace air filters",
        inputType: "Yes/No",
        required: true,
        critical: true
      },
      {
        description: "Check thermostat operation",
        inputType: "Yes/No",
        required: true,
        critical: true
      },
      {
        description: "Inspect ductwork for leaks or damage",
        inputType: "Yes/No",
        required: true,
        critical: false
      },
      {
        description: "Clean condenser and evaporator coils",
        inputType: "Yes/No",
        required: true,
        critical: true
      },
      {
        description: "Check refrigerant levels",
        inputType: "Numeric",
        required: true,
        critical: true
      },
      {
        description: "Inspect electrical connections and components",
        inputType: "Yes/No",
        required: true,
        critical: true
      },
      {
        description: "Test system operation in all modes",
        inputType: "Multi-select",
        required: true,
        critical: true
      }
    ]
  },
  {
    id: "generator-maintenance",
    name: "MONTHLY GENERATOR MAINTENANCE",
    status: "Active",
    department: "Electrical",
    checklist: [
      {
        description: "Check oil level and condition",
        inputType: "Yes/No",
        required: true,
        critical: true
      },
      {
        description: "Inspect fuel system for leaks",
        inputType: "Yes/No",
        required: true,
        critical: true
      },
      {
        description: "Test battery condition",
        inputType: "Numeric",
        required: true,
        critical: true
      },
      {
        description: "Verify proper operation under load",
        inputType: "Yes/No",
        required: true,
        critical: true
      }
    ]
  }
];
