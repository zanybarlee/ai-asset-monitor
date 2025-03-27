
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InventoryMetrics } from "./types";
import { AlertTriangle, Package, ArrowRightLeft, TrendingUp, Warehouse, Banknote, Clock, PackageCheck } from "lucide-react";

interface MetricsCardsProps {
  metrics: InventoryMetrics;
}

const MetricsCards = ({ metrics }: MetricsCardsProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Inventory Status</CardTitle>
          <Package className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.totalItems} items</div>
          <p className="text-xs text-muted-foreground">
            Total inventory items tracked
          </p>
          <div className="mt-2 flex items-center justify-between text-xs">
            <div className="flex flex-col">
              <span className="text-amber-500 font-medium">{metrics.lowStockItems} low stock</span>
              <span className="text-red-500 font-medium">{metrics.outOfStockItems} out of stock</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-blue-500 font-medium">{metrics.itemsToReorder} to reorder</span>
              <span className="text-emerald-500 font-medium">{metrics.totalItems - metrics.lowStockItems - metrics.outOfStockItems} sufficient</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
          <Banknote className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(metrics.totalValue)}</div>
          <p className="text-xs text-muted-foreground">
            Total value of inventory items
          </p>
          <div className="mt-2 flex items-center">
            <span className="text-xs font-medium">Value Distribution</span>
            <div className="ml-auto flex gap-1">
              <div className="h-3 w-8 rounded-sm bg-blue-500" title="Network Components"></div>
              <div className="h-3 w-6 rounded-sm bg-amber-500" title="Storage Components"></div>
              <div className="h-3 w-12 rounded-sm bg-emerald-500" title="Server Components"></div>
              <div className="h-3 w-4 rounded-sm bg-purple-500" title="Other Components"></div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Transfers</CardTitle>
          <ArrowRightLeft className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.pendingTransfers}</div>
          <p className="text-xs text-muted-foreground">
            Transfers in process between locations
          </p>
          <div className="mt-2 flex items-center justify-between text-xs">
            <div className="flex items-center">
              <Warehouse className="h-3 w-3 mr-1 text-blue-500" />
              <span>Locations: 3</span>
            </div>
            <div className="flex items-center text-amber-500">
              <Clock className="h-3 w-3 mr-1" />
              <span>Avg. time: 2 days</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Lead Time</CardTitle>
          <TrendingUp className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.averageLeadTimeDays} days</div>
          <p className="text-xs text-muted-foreground">
            Average procurement lead time
          </p>
          <div className="mt-2 flex items-center justify-between text-xs">
            <div className="flex items-center">
              <AlertTriangle className="h-3 w-3 mr-1 text-amber-500" />
              <span>{metrics.itemsToReorder} items need reordering</span>
            </div>
            <div className="flex items-center text-emerald-500">
              <PackageCheck className="h-3 w-3 mr-1" />
              <span>{metrics.openOrders} open orders</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsCards;
