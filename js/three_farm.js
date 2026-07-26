/* ===================================================
   EduFarm — Three.js 3D Farm Engine (three_farm.js)
   ระบบแสดงผล Three.js 3D สำหรับพื้นที่ฟาร์ม, รั้ว, ต้นไม้,
   พื้นหญ้า และแปลงผักด้วย Texture จาก StarterNaturePack_(FoliageKit1)
   =================================================== */

const ThreeFarmSystem = {
  scene: null,
  camera: null,
  renderer: null,
  canvas: null,
  groundMesh: null,
  grassPatches: [],
  trees: [],
  particles: null,
  clock: null,

  // พาธไฟล์รูป Texture หญ้า grass6.png (isometric-nature-pack)
  TEXTURE_PATHS: {
    groundBase: 'texture/isometric-nature-pack/grass6.png',
    groundNormal: 'texture/grass_02_1k/grass_02_normal_gl_1k.png',
    grassBase: 'texture/isometric-nature-pack/grass6.png',
    grassNormal: 'texture/grass_02_1k/grass_02_normal_gl_1k.png',
    foliageMap: 'texture/StarterNaturePack_(FoliageKit1)/FBX_Textures/Textures/F1_Foliage_Map1.png',
    leavesMap: 'texture/StarterNaturePack_(FoliageKit1)/FBX_Textures/Textures/F1_Leaves_Map1.png'
  },

  /**
   * เริ่มต้นใช้งานระบบ Three.js 3D
   */
  init() {
    if (typeof THREE === 'undefined') {
      console.warn('⚠️ Three.js library not loaded yet. Retrying in 500ms...');
      setTimeout(() => this.init(), 500);
      return;
    }

    const farmField = document.querySelector('.farm-field');
    if (!farmField) return;

    // 1. ตรวจสอบหรือสร้าง Canvas สำหรับ Three.js 3D
    this.canvas = document.getElementById('threeFarmCanvas');
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'threeFarmCanvas';
      this.canvas.style.position = 'absolute';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.width = '100%';
      this.canvas.style.height = '100%';
      this.canvas.style.zIndex = '0';
      this.canvas.style.pointerEvents = 'none';
      this.canvas.style.borderRadius = '20px';
      this.canvas.style.opacity = '0.92';
      farmField.insertBefore(this.canvas, farmField.firstChild);
    }

    const width = farmField.clientWidth || 800;
    const height = farmField.clientHeight || 500;

    // 2. สร้าง Three.js Scene, Camera, Renderer
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();

    // ตั้งค่า Isometric 2.5D Camera
    const aspect = width / height;
    this.camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 1000);
    this.camera.position.set(0, 14, 18);
    this.camera.lookAt(0, -1, 0);

    // WebGL Renderer พร้อมเงา 3D
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 3. จัดแสงไฟในโลก 3D (Golden Sunlight & Sky Light)
    this.setupLighting();

    // 4. โหลด Texture และสร้างแผ่นดิน 3D + ต้นไม้ 3D + พุ่มหญ้า 3D
    this.build3DEnvironment();

    // 5. สร้างละอองเกสรเรืองรอง (3D Ambient Particles)
    this.createPollenParticles();

    // 6. เริ่มการวนลูปแสดงผล Render Loop
    this.animate();

    // 7. ปรับขนาดอัตโนมัติตามหน้าจอ
    window.addEventListener('resize', () => this.onWindowResize());
    console.log('🌲 Three.js 3D Farm Environment initialized successfully!');
  },

  /**
   * จัดแสงไฟ 3D (Sunlight & Soft Shadows)
   */
  setupLighting() {
    // แสงอาทิตย์สีทองสดใส 3D (Directional Sun Light)
    const sunLight = new THREE.DirectionalLight(0xFFFAED, 1.4);
    sunLight.position.set(12, 20, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 50;
    sunLight.shadow.camera.left = -15;
    sunLight.shadow.camera.right = 15;
    sunLight.shadow.camera.top = 15;
    sunLight.shadow.camera.bottom = -15;
    this.scene.add(sunLight);

    // แสงสว่างจากท้องฟ้าและพื้นดิน (Hemisphere Sky Light)
    const hemiLight = new THREE.HemisphereLight(0xB1E0FF, 0x548B2F, 0.7);
    this.scene.add(hemiLight);
  },

  /**
   * สร้างสภาพแวดล้อม 3D (แผ่นดิน Normal Map, ต้นไม้, รั้ว, พุ่มหญ้า)
   */
  build3DEnvironment() {
    const textureLoader = new THREE.TextureLoader();

    // โหลด Texture แผ่นดินหญ้า 3D 1K Smooth (Ground Color Map & Normal Map)
    const groundColorMap = textureLoader.load(this.TEXTURE_PATHS.groundBase, (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(6, 4);
    });

    const groundNormalMap = textureLoader.load(this.TEXTURE_PATHS.groundNormal, (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(6, 4);
    });

    // โหลด Texture หญ้า 3D (Grass Color Map)
    const grassColorMap = textureLoader.load(this.TEXTURE_PATHS.grassBase);
    const leavesMap = textureLoader.load(this.TEXTURE_PATHS.leavesMap);
    const foliageMap = textureLoader.load(this.TEXTURE_PATHS.foliageMap);

    // --- 1. แผ่นดินฟาร์ม 3D (Ground Terrain Plane) ---
    const groundGeo = new THREE.PlaneGeometry(32, 20, 32, 32);
    const groundMat = new THREE.MeshStandardMaterial({
      map: groundColorMap,
      normalMap: groundNormalMap,
      roughness: 0.8,
      metalness: 0.05
    });

    this.groundMesh = new THREE.Mesh(groundGeo, groundMat);
    this.groundMesh.rotation.x = -Math.PI / 2;
    this.groundMesh.position.y = -1.5;
    this.groundMesh.receiveShadow = true;
    this.scene.add(this.groundMesh);

    // --- 2. รั้วไม้ 3D รอบฟาร์ม (3D Fence Posts) ---
    this.build3DFences();

    // --- 3. ต้นไม้ 3D (3D Low-Poly Nature Trees with Leaves Map) ---
    this.create3DTree(-13, -1.5, -6, leavesMap, foliageMap);
    this.create3DTree(13, -1.5, -6, leavesMap, foliageMap);
    this.create3DTree(-13.5, -1.5, 6, leavesMap, foliageMap);
    this.create3DTree(13.5, -1.5, 6, leavesMap, foliageMap);

    // --- 4. กอหญ้า 3D พริ้วไหว (3D Grass Patch Tuft Planes) ---
    for (let i = 0; i < 20; i++) {
      const grassGeo = new THREE.PlaneGeometry(1.2, 1.2);
      const grassMat = new THREE.MeshStandardMaterial({
        map: grassColorMap,
        transparent: true,
        alphaTest: 0.4,
        side: THREE.DoubleSide
      });
      const grassMesh = new THREE.Mesh(grassGeo, grassMat);

      // สุ่มตำแหน่งรอบแปลงผักและคอกสัตว์
      const x = (Math.random() - 0.5) * 26;
      const z = (Math.random() - 0.5) * 14;
      grassMesh.position.set(x, -0.9, z);
      grassMesh.rotation.y = Math.random() * Math.PI;
      grassMesh.castShadow = true;
      
      this.scene.add(grassMesh);
      this.grassPatches.push(grassMesh);
    }
  },

  /**
   * สร้างรั้วไม้ 3D รอบฟาร์ม (3D Wood Fence Blocks)
   */
  build3DFences() {
    const fenceMat = new THREE.MeshStandardMaterial({
      color: 0x8D6E63,
      roughness: 0.7
    });

    // รั้วแนวนอนทิศเหนือ & ทิศใต้
    for (let x = -13; x <= 13; x += 2.2) {
      // เสารั้วไม้ 3D
      const postGeo = new THREE.CylinderGeometry(0.15, 0.18, 1.2, 8);
      const postMeshNorth = new THREE.Mesh(postGeo, fenceMat);
      postMeshNorth.position.set(x, -0.9, -8.5);
      postMeshNorth.castShadow = true;
      this.scene.add(postMeshNorth);

      const postMeshSouth = new THREE.Mesh(postGeo, fenceMat);
      postMeshSouth.position.set(x, -0.9, 8.5);
      postMeshSouth.castShadow = true;
      this.scene.add(postMeshSouth);

      // คานรั้วไม้ 3D
      const railGeo = new THREE.BoxGeometry(2.1, 0.15, 0.12);
      const railMeshNorth = new THREE.Mesh(railGeo, fenceMat);
      railMeshNorth.position.set(x + 1, -0.7, -8.5);
      this.scene.add(railMeshNorth);

      const railMeshSouth = new THREE.Mesh(railGeo, fenceMat);
      railMeshSouth.position.set(x + 1, -0.7, 8.5);
      this.scene.add(railMeshSouth);
    }
  },

  /**
   * สร้างต้นไม้ 3D พร้อมใบไม้ (3D Tree Model with Foliage & Leaves)
   */
  create3DTree(x, y, z, leavesMap, foliageMap) {
    const treeGroup = new THREE.Group();

    // ลำต้นไม้ 3D (Trunk)
    const trunkGeo = new THREE.CylinderGeometry(0.35, 0.5, 3.2, 8);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5D4037, roughness: 0.9 });
    const trunkMesh = new THREE.Mesh(trunkGeo, trunkMat);
    trunkMesh.position.y = 1.6;
    trunkMesh.castShadow = true;
    treeGroup.add(trunkMesh);

    // พุ่มใบไม้ 3D ทรงกลมลดทอน (Canopy Layers with Foliage Texture)
    const canopyMat = new THREE.MeshStandardMaterial({
      map: foliageMap || leavesMap,
      color: 0x7EC850,
      roughness: 0.6
    });

    const canopy1 = new THREE.Mesh(new THREE.DodecahedronGeometry(1.6), canopyMat);
    canopy1.position.y = 3.6;
    canopy1.castShadow = true;
    treeGroup.add(canopy1);

    const canopy2 = new THREE.Mesh(new THREE.DodecahedronGeometry(1.2), canopyMat);
    canopy2.position.set(0.4, 4.4, -0.2);
    canopy2.castShadow = true;
    treeGroup.add(canopy2);

    treeGroup.position.set(x, y, z);
    this.scene.add(treeGroup);
    this.trees.push(treeGroup);
  },

  /**
   * สร้างละอองเกสรเรืองแสง 3D (3D Ambient Pollen Particle System)
   */
  createPollenParticles() {
    const particleCount = 40;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 30;
      positions[i + 1] = Math.random() * 8 - 1;
      positions[i + 2] = (Math.random() - 0.5) * 18;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xFFD700,
      size: 0.35,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  },

  /**
   * อนิเมชันเคลื่อนไหวต่อเนื่อง (3D Animation Loop)
   */
  animate() {
    requestAnimationFrame(() => this.animate());

    if (!this.clock || !this.renderer || !this.scene || !this.camera) return;

    const elapsedTime = this.clock.getElapsedTime();

    // 1. โยกพุ่มหญ้า 3D เบาๆ ตามสายลม (Swaying Grass Tuft Animation)
    this.grassPatches.forEach((grass, index) => {
      grass.rotation.z = Math.sin(elapsedTime * 2 + index) * 0.08;
    });

    // 2. โยกพุ่มต้นไม้ 3D เบาๆ ตามแรงลม
    this.trees.forEach((tree, index) => {
      tree.rotation.z = Math.sin(elapsedTime * 1.5 + index) * 0.03;
    });

    // 3. หมุนลอยละอองเกสร 3D ช้าๆ
    if (this.particles) {
      this.particles.rotation.y = elapsedTime * 0.04;
      const positions = this.particles.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(elapsedTime + i) * 0.005;
      }
      this.particles.geometry.attributes.position.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
  },

  /**
   * ปรับขนาด Canvas 3D เมื่อย่อขยายหน้าจอ
   */
  onWindowResize() {
    const farmField = document.querySelector('.farm-field');
    if (!farmField || !this.renderer || !this.camera) return;

    const width = farmField.clientWidth || 800;
    const height = farmField.clientHeight || 500;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
};

// เริ่มต้นระบบ 3D เมื่อเอกสารโหลดเสร็จสมบูรณ์
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    ThreeFarmSystem.init();
  }, 400);
});
