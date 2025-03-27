
import * as THREE from 'three';

export type FloorConfig = {
  title: string;
  description: string;
  sceneSetup: (scene: THREE.Scene) => void;
};

// Floor 1 - Operations Center
export const floor1Config: FloorConfig = {
  title: "Floor 1 - Operations Center",
  description: "Primary operations and monitoring center",
  sceneSetup: (scene: THREE.Scene) => {
    // Add ground
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xcccccc,
      side: THREE.DoubleSide,
      roughness: 0.8
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Add grid helper
    const gridHelper = new THREE.GridHelper(50, 50);
    scene.add(gridHelper);
    
    // Add workstations in a circular arrangement
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 12;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      const deskGeometry = new THREE.BoxGeometry(3, 0.1, 1.5);
      const deskMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
      const desk = new THREE.Mesh(deskGeometry, deskMaterial);
      desk.position.set(x, 0.5, z);
      desk.rotation.y = angle + Math.PI / 2;
      desk.castShadow = true;
      scene.add(desk);
      
      // Add computer on desk
      const monitorGeometry = new THREE.BoxGeometry(1.2, 0.8, 0.1);
      const monitorMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
      const monitor = new THREE.Mesh(monitorGeometry, monitorMaterial);
      monitor.position.set(x, 1.2, z);
      monitor.rotation.y = angle + Math.PI / 2;
      monitor.castShadow = true;
      scene.add(monitor);
      
      // Add screen
      const screenGeometry = new THREE.PlaneGeometry(1.1, 0.7);
      const screenMaterial = new THREE.MeshBasicMaterial({ color: 0x1e90ff });
      const screen = new THREE.Mesh(screenGeometry, screenMaterial);
      screen.position.set(x, 1.2, z + 0.06);
      screen.rotation.y = angle + Math.PI / 2;
      scene.add(screen);
      
      // Add chair
      const chairGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.1, 16);
      const chairMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
      const chair = new THREE.Mesh(chairGeometry, chairMaterial);
      chair.position.set(x - 1 * Math.cos(angle + Math.PI / 2), 0.5, z - 1 * Math.sin(angle + Math.PI / 2));
      chair.castShadow = true;
      scene.add(chair);
    }
    
    // Add central monitoring display wall
    const wallGeometry = new THREE.BoxGeometry(12, 4, 0.2);
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xdddddd });
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.set(0, 2, -18);
    wall.castShadow = true;
    scene.add(wall);
    
    // Add displays on wall
    for (let x = -5; x <= 5; x += 2.5) {
      for (let y = 0.5; y <= 3; y += 1.5) {
        const displayGeometry = new THREE.BoxGeometry(2, 1.2, 0.1);
        const displayMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
        const display = new THREE.Mesh(displayGeometry, displayMaterial);
        display.position.set(x, y, -17.9);
        display.castShadow = true;
        scene.add(display);
        
        // Add screen content
        const screenGeometry = new THREE.PlaneGeometry(1.9, 1.1);
        const screenMaterial = new THREE.MeshBasicMaterial({ color: 0x2980b9 });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.set(x, y, -17.8);
        scene.add(screen);
      }
    }
  }
};

// Floor 2 - Administration
export const floor2Config: FloorConfig = {
  title: "Floor 2 - Administration",
  description: "Administrative offices and meeting rooms",
  sceneSetup: (scene: THREE.Scene) => {
    // Add ground
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xdddddd,
      side: THREE.DoubleSide,
      roughness: 0.6
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Add grid helper
    const gridHelper = new THREE.GridHelper(50, 50);
    scene.add(gridHelper);
    
    // Add office walls
    const createWall = (x: number, z: number, width: number, height: number, rotation: number = 0) => {
      const wallGeometry = new THREE.BoxGeometry(width, height, 0.2);
      const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xf5f5f5 });
      const wall = new THREE.Mesh(wallGeometry, wallMaterial);
      wall.position.set(x, height/2, z);
      wall.rotation.y = rotation;
      wall.castShadow = true;
      wall.receiveShadow = true;
      scene.add(wall);
    };
    
    // Create office layout
    // Main corridor
    createWall(-15, 0, 20, 4, Math.PI / 2);
    createWall(15, 0, 20, 4, Math.PI / 2);
    
    // Office rooms - left side
    for (let z = -10; z <= 10; z += 5) {
      createWall(-10, z, 10, 4, 0);
      createWall(-15, z + 2.5, 5, 4, Math.PI / 2);
      
      // Add desk and chair in each office
      const deskGeometry = new THREE.BoxGeometry(3, 0.1, 1.5);
      const deskMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
      const desk = new THREE.Mesh(deskGeometry, deskMaterial);
      desk.position.set(-12, 0.5, z + 1);
      desk.castShadow = true;
      scene.add(desk);
      
      const chairGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.1, 16);
      const chairMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
      const chair = new THREE.Mesh(chairGeometry, chairMaterial);
      chair.position.set(-12, 0.5, z + 2.5);
      chair.castShadow = true;
      scene.add(chair);
    }
    
    // Office rooms - right side
    for (let z = -10; z <= 10; z += 5) {
      createWall(10, z, 10, 4, 0);
      createWall(15, z + 2.5, 5, 4, Math.PI / 2);
      
      // Add desk and chair in each office
      const deskGeometry = new THREE.BoxGeometry(3, 0.1, 1.5);
      const deskMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
      const desk = new THREE.Mesh(deskGeometry, deskMaterial);
      desk.position.set(12, 0.5, z + 1);
      desk.castShadow = true;
      scene.add(desk);
      
      const chairGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.1, 16);
      const chairMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
      const chair = new THREE.Mesh(chairGeometry, chairMaterial);
      chair.position.set(12, 0.5, z + 2.5);
      chair.castShadow = true;
      scene.add(chair);
    }
    
    // Conference room at the center
    createWall(0, -8, 10, 4, 0);
    createWall(0, 8, 10, 4, 0);
    createWall(-5, 0, 16, 4, Math.PI / 2);
    createWall(5, 0, 16, 4, Math.PI / 2);
    
    // Conference table
    const tableGeometry = new THREE.BoxGeometry(8, 0.1, 3);
    const tableMaterial = new THREE.MeshStandardMaterial({ color: 0x5d4037 });
    const table = new THREE.Mesh(tableGeometry, tableMaterial);
    table.position.set(0, 0.8, 0);
    table.castShadow = true;
    scene.add(table);
    
    // Add chairs around conference table
    for (let x = -3; x <= 3; x += 1.5) {
      // Chairs on one side
      const chair1Geometry = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 16);
      const chair1Material = new THREE.MeshStandardMaterial({ color: 0x444444 });
      const chair1 = new THREE.Mesh(chair1Geometry, chair1Material);
      chair1.position.set(x, 0.5, 2);
      chair1.castShadow = true;
      scene.add(chair1);
      
      // Chairs on the other side
      const chair2Geometry = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 16);
      const chair2Material = new THREE.MeshStandardMaterial({ color: 0x444444 });
      const chair2 = new THREE.Mesh(chair2Geometry, chair2Material);
      chair2.position.set(x, 0.5, -2);
      chair2.castShadow = true;
      scene.add(chair2);
    }
  }
};

// Floor 3 - Research & Development
export const floor3Config: FloorConfig = {
  title: "Floor 3 - Research & Development",
  description: "R&D labs and testing facilities",
  sceneSetup: (scene: THREE.Scene) => {
    // Add ground
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xeeeeee,
      side: THREE.DoubleSide,
      roughness: 0.7
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Add grid helper
    const gridHelper = new THREE.GridHelper(50, 50);
    scene.add(gridHelper);
    
    // Add research lab equipment
    // Section 1: Testing Lab
    const testLabGeometry = new THREE.BoxGeometry(15, 0.1, 15);
    const testLabMaterial = new THREE.MeshStandardMaterial({ color: 0xb0bec5 });
    const testLab = new THREE.Mesh(testLabGeometry, testLabMaterial);
    testLab.position.set(-12, 0.05, -12);
    testLab.receiveShadow = true;
    scene.add(testLab);
    
    // Add testing equipment
    for (let x = -18; x <= -6; x += 4) {
      for (let z = -18; z <= -6; z += 4) {
        if (Math.random() > 0.3) { // Randomly place equipment
          const equipmentGeometry = new THREE.BoxGeometry(2, 1.5, 1);
          const equipmentMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x607d8b,
            metalness: 0.5,
            roughness: 0.2
          });
          const equipment = new THREE.Mesh(equipmentGeometry, equipmentMaterial);
          equipment.position.set(x, 0.75, z);
          equipment.castShadow = true;
          scene.add(equipment);
          
          // Add details to equipment
          const panelGeometry = new THREE.PlaneGeometry(1.8, 0.5);
          const panelMaterial = new THREE.MeshBasicMaterial({ color: 0x263238 });
          const panel = new THREE.Mesh(panelGeometry, panelMaterial);
          panel.position.set(x, 1.2, z + 0.51);
          panel.rotation.x = Math.PI * 0.1;
          panel.rotation.y = Math.PI;
          scene.add(panel);
        }
      }
    }
    
    // Section 2: Development Area
    const devAreaGeometry = new THREE.BoxGeometry(15, 0.1, 15);
    const devAreaMaterial = new THREE.MeshStandardMaterial({ color: 0xeceff1 });
    const devArea = new THREE.Mesh(devAreaGeometry, devAreaMaterial);
    devArea.position.set(12, 0.05, -12);
    devArea.receiveShadow = true;
    scene.add(devArea);
    
    // Add development workstations
    for (let x = 6; x <= 18; x += 4) {
      for (let z = -18; z <= -6; z += 4) {
        // Workstation desk
        const deskGeometry = new THREE.BoxGeometry(3, 0.1, 2);
        const deskMaterial = new THREE.MeshStandardMaterial({ color: 0xbcaaa4 });
        const desk = new THREE.Mesh(deskGeometry, deskMaterial);
        desk.position.set(x, 0.7, z);
        desk.castShadow = true;
        scene.add(desk);
        
        // Monitor
        const monitorGeometry = new THREE.BoxGeometry(1.5, 1, 0.1);
        const monitorMaterial = new THREE.MeshStandardMaterial({ color: 0x424242 });
        const monitor = new THREE.Mesh(monitorGeometry, monitorMaterial);
        monitor.position.set(x, 1.4, z - 0.5);
        monitor.castShadow = true;
        scene.add(monitor);
        
        // Chair
        const chairGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.1, 16);
        const chairMaterial = new THREE.MeshStandardMaterial({ color: 0x424242 });
        const chair = new THREE.Mesh(chairGeometry, chairMaterial);
        chair.position.set(x, 0.5, z + 1.2);
        chair.castShadow = true;
        scene.add(chair);
      }
    }
    
    // Section 3: Prototype Area
    const protoAreaGeometry = new THREE.BoxGeometry(30, 0.1, 15);
    const protoAreaMaterial = new THREE.MeshStandardMaterial({ color: 0xffecb3 });
    const protoArea = new THREE.Mesh(protoAreaGeometry, protoAreaMaterial);
    protoArea.position.set(0, 0.05, 12);
    protoArea.receiveShadow = true;
    scene.add(protoArea);
    
    // Add prototype models
    const prototypePositions = [
      { x: -10, z: 12 },
      { x: 0, z: 12 },
      { x: 10, z: 12 }
    ];
    
    prototypePositions.forEach((pos, index) => {
      // Base platform
      const baseGeometry = new THREE.CylinderGeometry(2, 2, 0.2, 32);
      const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x78909c });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      base.position.set(pos.x, 0.1, pos.z);
      base.castShadow = true;
      scene.add(base);
      
      // Different prototype models
      let prototype;
      if (index === 0) {
        // Server prototype
        prototype = new THREE.Group();
        const serverGeometry = new THREE.BoxGeometry(1.5, 3, 1);
        const serverMaterial = new THREE.MeshStandardMaterial({ 
          color: 0x26a69a,
          metalness: 0.7,
          roughness: 0.2
        });
        const server = new THREE.Mesh(serverGeometry, serverMaterial);
        server.position.set(0, 1.5, 0);
        prototype.add(server);
        
        // Add details
        for (let y = 0.5; y < 3; y += 0.4) {
          const panelGeometry = new THREE.BoxGeometry(1.4, 0.3, 0.05);
          const panelMaterial = new THREE.MeshStandardMaterial({ color: 0x212121 });
          const panel = new THREE.Mesh(panelGeometry, panelMaterial);
          panel.position.set(0, y, 0.53);
          prototype.add(panel);
        }
      } else if (index === 1) {
        // Network equipment prototype
        prototype = new THREE.Group();
        const rackGeometry = new THREE.BoxGeometry(2, 1, 1.5);
        const rackMaterial = new THREE.MeshStandardMaterial({ 
          color: 0x42a5f5,
          metalness: 0.5,
          roughness: 0.3
        });
        const rack = new THREE.Mesh(rackGeometry, rackMaterial);
        rack.position.set(0, 0.5, 0);
        prototype.add(rack);
        
        // Add antennas
        for (let x = -0.5; x <= 0.5; x += 0.5) {
          const antennaGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 8);
          const antennaMaterial = new THREE.MeshStandardMaterial({ color: 0x9e9e9e });
          const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
          antenna.position.set(x, 1.5, 0);
          prototype.add(antenna);
        }
      } else {
        // Storage device prototype
        prototype = new THREE.Group();
        const storageGeometry = new THREE.BoxGeometry(2, 1, 2);
        const storageMaterial = new THREE.MeshStandardMaterial({ 
          color: 0xef5350,
          metalness: 0.4,
          roughness: 0.4
        });
        const storage = new THREE.Mesh(storageGeometry, storageMaterial);
        storage.position.set(0, 0.5, 0);
        prototype.add(storage);
        
        // Add disk arrays
        for (let z = -0.8; z <= 0.8; z += 0.4) {
          const diskGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.05, 16);
          diskGeometry.rotateX(Math.PI / 2);
          const diskMaterial = new THREE.MeshStandardMaterial({ color: 0x9e9e9e });
          const disk = new THREE.Mesh(diskGeometry, diskMaterial);
          disk.position.set(0, 0.5, z);
          prototype.add(disk);
        }
      }
      
      prototype.position.set(pos.x, 0.2, pos.z);
      scene.add(prototype);
    });
  }
};

// Server Room
export const serverRoomConfig: FloorConfig = {
  title: "Server Room - Data Center",
  description: "Primary data center with critical infrastructure",
  sceneSetup: (scene: THREE.Scene) => {
    // Add ground
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xcccccc,
      side: THREE.DoubleSide,
      roughness: 0.8
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Add grid helper
    const gridHelper = new THREE.GridHelper(50, 50);
    scene.add(gridHelper);
    
    // Add server racks in rows
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 4; j++) {
        const rackGroup = new THREE.Group();
        
        // Create rack frame
        const rackGeometry = new THREE.BoxGeometry(2, 4, 1);
        const rackMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
        const rack = new THREE.Mesh(rackGeometry, rackMaterial);
        rack.position.set(0, 2, 0);
        rack.castShadow = true;
        rackGroup.add(rack);
        
        // Add servers to rack
        for (let k = 0; k < 6; k++) {
          const serverGeometry = new THREE.BoxGeometry(1.8, 0.5, 0.9);
          const serverMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x555555, 
            metalness: 0.5, 
            roughness: 0.2 
          });
          const server = new THREE.Mesh(serverGeometry, serverMaterial);
          server.position.set(0, 0.5 + k * 0.6, 0);
          server.castShadow = true;
          rackGroup.add(server);
          
          // Add LED lights
          const ledGeometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
          const ledMaterial = new THREE.MeshBasicMaterial({ 
            color: Math.random() > 0.8 ? 0xff0000 : 0x00ff00 // Some red LEDs for error indicators
          });
          const led = new THREE.Mesh(ledGeometry, ledMaterial);
          led.position.set(0.8, 0.5 + k * 0.6, 0.4);
          rackGroup.add(led);
        }
        
        // Position the rack
        rackGroup.position.set(-10 + i * 5, 0, -8 + j * 5);
        scene.add(rackGroup);
      }
    }
    
    // Add central storage unit
    const storageGeometry = new THREE.BoxGeometry(4, 3, 3);
    const storageMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x0066cc,
      metalness: 0.7,
      roughness: 0.2
    });
    const storageUnit = new THREE.Mesh(storageGeometry, storageMaterial);
    storageUnit.position.set(0, 1.5, 10);
    storageUnit.castShadow = true;
    scene.add(storageUnit);
    
    // Add cooling units
    const coolingUnitGeometry = new THREE.CylinderGeometry(1, 1, 3, 8);
    const coolingUnitMaterial = new THREE.MeshStandardMaterial({ color: 0x66ccff });
    
    const coolingUnit1 = new THREE.Mesh(coolingUnitGeometry, coolingUnitMaterial);
    coolingUnit1.position.set(-12, 1.5, 10);
    coolingUnit1.castShadow = true;
    scene.add(coolingUnit1);
    
    const coolingUnit2 = new THREE.Mesh(coolingUnitGeometry, coolingUnitMaterial);
    coolingUnit2.position.set(12, 1.5, 10);
    coolingUnit2.castShadow = true;
    scene.add(coolingUnit2);
    
    // Add raised floor indicators
    const raisedFloorGeometry = new THREE.PlaneGeometry(48, 48);
    const raisedFloorMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x333333,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const raisedFloor = new THREE.Mesh(raisedFloorGeometry, raisedFloorMaterial);
    raisedFloor.rotation.x = Math.PI / 2;
    raisedFloor.position.set(0, 0.01, 0);
    scene.add(raisedFloor);
    
    // Add power distribution units
    const pduGeometry = new THREE.BoxGeometry(0.5, 4, 0.5);
    const pduMaterial = new THREE.MeshStandardMaterial({ color: 0xff9800 });
    
    for (let i = 0; i < 4; i++) {
      const pdu = new THREE.Mesh(pduGeometry, pduMaterial);
      pdu.position.set(-14 + i * 10, 2, -12);
      pdu.castShadow = true;
      scene.add(pdu);
    }
    
    // Add cable trays on ceiling
    const cableTrayGeometry = new THREE.BoxGeometry(48, 0.1, 1);
    const cableTrayMaterial = new THREE.MeshStandardMaterial({ color: 0x9e9e9e });
    
    for (let z = -12; z <= 12; z += 8) {
      const cableTray = new THREE.Mesh(cableTrayGeometry, cableTrayMaterial);
      cableTray.position.set(0, 4, z);
      cableTray.castShadow = true;
      scene.add(cableTray);
    }
  }
};

// Map of floor/room IDs to their configurations
export const floorConfigs: Record<string, FloorConfig> = {
  floor1: floor1Config,
  floor2: floor2Config,
  floor3: floor3Config,
  serverRoom: serverRoomConfig
};
