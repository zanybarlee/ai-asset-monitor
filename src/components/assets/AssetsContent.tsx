
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssetType } from "./mockAssetData";
import AssetFilters from "./AssetFilters";
import AssetsList from "./AssetsList";

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
              <AssetQuickActions 
                onShowLifecycleStages={() => {}}
                onShowCBMSettings={() => {}}
                onShowMaintenanceTimeline={() => {}}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium mb-1">View Options</h3>
            <Tabs defaultValue="list" value={activeView} onValueChange={setActiveView} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="list">List</TabsTrigger>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="tree">Tree</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>
      
      <div className="md:col-span-3">
        <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsContent value="all">
            <AssetsList 
              assets={assets}
              searchQuery={searchQuery}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              onViewAsset={onViewAsset}
              onShowQRCode={onShowQRCode}
            />
          </TabsContent>
          
          <TabsContent value="operational">
            <AssetsList 
              assets={assets}
              searchQuery={searchQuery}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              onViewAsset={onViewAsset}
              onShowQRCode={onShowQRCode}
            />
          </TabsContent>
          
          <TabsContent value="warning">
            <AssetsList 
              assets={assets}
              searchQuery={searchQuery}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              onViewAsset={onViewAsset}
              onShowQRCode={onShowQRCode}
            />
          </TabsContent>
          
          <TabsContent value="critical">
            <AssetsList 
              assets={assets}
              searchQuery={searchQuery}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              onViewAsset={onViewAsset}
              onShowQRCode={onShowQRCode}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AssetsContent;
