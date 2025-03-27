
const CalendarLegend = () => {
  return (
    <div className="flex flex-wrap gap-2 text-xs">
      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
        <span>Critical</span>
      </div>
      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full bg-orange-500 mr-1"></div>
        <span>High Priority</span>
      </div>
      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
        <span>Scheduled</span>
      </div>
    </div>
  );
};

export default CalendarLegend;
