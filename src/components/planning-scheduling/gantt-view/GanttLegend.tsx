
const GanttLegend = () => {
  return (
    <div className="mt-4 flex space-x-4 text-sm">
      <div className="flex items-center">
        <div className="w-3 h-3 rounded-sm bg-blue-500 mr-1"></div>
        <span>Preventive</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 rounded-sm bg-orange-500 mr-1"></div>
        <span>Corrective</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 rounded-sm bg-purple-500 mr-1"></div>
        <span>Project</span>
      </div>
    </div>
  );
};

export default GanttLegend;
