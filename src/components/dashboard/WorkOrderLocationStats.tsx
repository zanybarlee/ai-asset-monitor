
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart } from "@/components/ui/charts";

interface LocationData {
  location: string;
  count: number;
}

interface WorkOrderLocationStatsProps {
  data: LocationData[];
}

const WorkOrderLocationStats = ({ data }: WorkOrderLocationStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Work Orders by Location</CardTitle>
          <CardDescription>Distribution across physical locations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <PieChart 
              data={data}
              category="count"
              index="location"
              colors={["#3b82f6", "#0ea5e9", "#06b6d4", "#0891b2", "#0e7490"]}
              valueFormatter={(value) => `${value} orders`}
              showLegend={true}
              className="h-[350px]"
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Location Details</CardTitle>
          <CardDescription>Work order counts by location</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Location</TableHead>
                <TableHead>Work Orders</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{item.location}</TableCell>
                  <TableCell>{item.count}</TableCell>
                  <TableCell>${(item.count * 450).toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className={
                        item.count > 10 
                          ? "h-2 w-2 rounded-full bg-amber-500" 
                          : "h-2 w-2 rounded-full bg-emerald-500"
                      } />
                      {item.count > 10 ? "High" : "Normal"}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkOrderLocationStats;
