
import TemplateWorkflowItem, { TemplateWorkflowProps } from "./TemplateWorkflowItem";

interface TemplateWorkflowsTabProps {
  templates: TemplateWorkflowProps[];
}

const TemplateWorkflowsTab = ({ templates }: TemplateWorkflowsTabProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {templates.map((template) => (
        <TemplateWorkflowItem key={template.id} template={template} />
      ))}
    </div>
  );
};

export default TemplateWorkflowsTab;
