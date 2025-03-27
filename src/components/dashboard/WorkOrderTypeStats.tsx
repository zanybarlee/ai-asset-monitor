
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart } from "@/components/ui/charts";

interface TypeData {
  type: string;
  count: number;
}

interface WorkOrderTypeStatsProps {
  data: TypeData[];
}

const WorkOrderTypeStats = ({ data }: WorkOrderTypeStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Work Orders by Type</CardTitle>
          <CardDescription>Distribution by maintenance type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <PieChart 
              data={data}
              category="count"
              index="type"
              colors={["#10b981", "#f59e0b", "#ef4444", "#6366f1"]}
              valueFormatter={(value) => `${value} orders`}
              showLegend={true}
              className="h-[350px]"
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Type Details</CardTitle>
          <CardDescription>Work order counts by type</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Work Orders</TableHead>
                <TableHead>Avg Duration</TableHead>
                <TableHead>Avg Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{item.type}</TableCell>
                  <TableCell>{item.count}</TableCell>
                  <TableCell>
                    {item.type === 'Emergency' ? '4 hours' : 
                     item.type === 'Corrective' ? '2 days' :
                     item.type === 'Preventative' ? '1 day' : '3 days'}
                  </TableCell>
                  <TableCell>
                    ${item.type === 'Emergency' ? '950' : 
                      item.type === 'Corrective' ? '750' :
                      item.type === 'Preventative' ? '450' : '1200'}
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

export default WorkOrderTypeStats;
