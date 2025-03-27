
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssetType } from "./mockAssetData";
import AssetFilters from "./AssetFilters";
import AssetsList from "./AssetsList";
import AssetQuickActions from "./AssetQuickActions";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AssetsContentProps {
  assets: AssetType[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  onViewAsset: (asset: AssetType) => void;
  onShowQRCode: (asset: AssetType) => void;
  onShowCBMSettings: () => void;
  onShowLifecycleStages: () => void;
  onShowMaintenanceTimeline: () => void;
  onShowMaintenanceSchedule: () => void;
}

const AssetsContent = ({
  assets,
  searchQuery,
  onSearchChange,
  selectedTab,
  setSelectedTab,
  activeView,
  setActiveView,
  onViewAsset,
  onShowQRCode,
  onShowCBMSettings,
  onShowLifecycleStages,
  onShowMaintenanceTimeline,
  onShowMaintenanceSchedule,
}: AssetsContentProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="md:col-span-1">
        <CardContent className="space-y-4 pt-6">
          <AssetFilters
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
          />
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium mb-1">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-2">
              <TooltipProvider>
                <AssetQuickActions 
                  onShowLifecycleStages={onShowLifecycleStages}
                  onShowCBMSettings={onShowCBMSettings}
                  onShowMaintenanceTimeline={onShowMaintenanceTimeline}
                  onShowMaintenanceSchedule={onShowMaintenanceSchedule}
                />
              </TooltipProvider>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium mb-1">View Options</h3>
            <Tabs defaultValue="list" value={activeView} onValueChange={setActiveView} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger value="list">List</TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View assets in a tabular list format</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger value="grid">Grid</TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View assets in a grid layout with cards</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger value="tree">Tree</TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View assets in a hierarchical tree structure</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>
      
      <div className="md:col-span-3">
        <AssetsList 
          assets={assets}
          searchQuery={searchQuery}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          onViewAsset={onViewAsset}
          onShowQRCode={onShowQRCode}
          activeView={activeView}
        />
      </div>
    </div>
  );
};

export default AssetsContent;
