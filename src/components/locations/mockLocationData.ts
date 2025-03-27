
export interface Location {
  id: string;
  name: string;
  buildingCode: string;
  floor: number;
  room: string;
  assetCount: number;
}

export const mockLocations: Location[] = [
  {
    id: "loc-001",
    name: "Main Control Room",
    buildingCode: "B-101",
    floor: 1,
    room: "101A",
    assetCount: 15
  },
  {
    id: "loc-002",
    name: "Power Generation Unit",
    buildingCode: "B-102",
    floor: 1,
    room: "150",
    assetCount: 23
  },
  {
    id: "loc-003",
    name: "Data Center",
    buildingCode: "B-201",
    floor: 2,
    room: "210",
    assetCount: 42
  },
  {
    id: "loc-004",
    name: "HVAC Control Room",
    buildingCode: "B-103",
    floor: 1,
    room: "103B",
    assetCount: 18
  },
  {
    id: "loc-005",
    name: "Security Operations Center",
    buildingCode: "B-301",
    floor: 3,
    room: "301",
    assetCount: 12
  },
  {
    id: "loc-006",
    name: "Electrical Substation",
    buildingCode: "B-001",
    floor: 0,
    room: "ES-1",
    assetCount: 31
  },
  {
    id: "loc-007",
    name: "Maintenance Workshop",
    buildingCode: "B-102",
    floor: 1,
    room: "120",
    assetCount: 27
  },
  {
    id: "loc-008",
    name: "Chemical Storage",
    buildingCode: "B-001",
    floor: 0,
    room: "CS-1",
    assetCount: 8
  }
];
