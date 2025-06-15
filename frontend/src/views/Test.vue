<template>
  <div ref="threeContainer" class="three-fullscreen"></div>
  <div v-if="panelVisible" class="data-panel">
    <div class="panel-header">
      <span>楼层 F{{ selectedFloor + 1 }}</span>
      <button class="close-btn" @click="panelVisible = false">×</button>
    </div>
    <div class="panel-content">
      <div class="panel-row"><span>温度：</span><b>{{ floorData.temperature }} ℃</b></div>
      <div class="panel-row"><span>能耗：</span><b>{{ floorData.energy }} kWh</b></div>
      <div class="panel-row"><span>人员数：</span><b>{{ floorData.people }} 人</b></div>
      <div class="panel-row"><span>状态：</span><b :style="{color: floorData.status==='正常'?'#00e676':'#ff3b3b'}">{{ floorData.status }}</b></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import * as THREE from 'three';

const threeContainer = ref(null);
const panelVisible = ref(false);
const selectedFloor = ref(0);
const floorData = reactive({ temperature: 0, energy: 0, people: 0, status: '正常' });

// 模拟10层楼数据
const allFloorsData = Array.from({length: 10}, (_, i) => ({
  temperature: (20 + Math.random() * 5).toFixed(1),
  energy: (100 + Math.random() * 50).toFixed(1),
  people: Math.floor(10 + Math.random() * 20),
  status: Math.random() > 0.15 ? '正常' : '异常'
}));

onMounted(() => {
  // 场景、相机、渲染器
  const scene = new THREE.Scene();
  // 科技感径向渐变背景
  const bgCanvas = document.createElement('canvas');
  bgCanvas.width = 512; bgCanvas.height = 512;
  const bgCtx = bgCanvas.getContext('2d');
  const radial = bgCtx.createRadialGradient(256,256,60,256,256,256);
  radial.addColorStop(0, '#232b3a');
  radial.addColorStop(0.5, '#10131a');
  radial.addColorStop(1, '#0a0f1c');
  bgCtx.fillStyle = radial;
  bgCtx.fillRect(0,0,512,512);
  // 柔和光晕
  bgCtx.beginPath();
  bgCtx.arc(256, 256, 120, 0, 2*Math.PI);
  bgCtx.globalAlpha = 0.18;
  bgCtx.fillStyle = '#00eaff';
  bgCtx.fill();
  bgCtx.globalAlpha = 1;
  const bgTex = new THREE.CanvasTexture(bgCanvas);
  scene.background = bgTex;

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  // 初始视角参数
  let camRadius = 28;
  let camTheta = Math.PI/6; // 水平角
  let camPhi = Math.PI/4;   // 俯仰角
  function updateCamera() {
    // 极坐标转直角坐标
    camera.position.x = camRadius * Math.sin(camPhi) * Math.cos(camTheta);
    camera.position.y = camRadius * Math.cos(camPhi);
    camera.position.z = camRadius * Math.sin(camPhi) * Math.sin(camTheta);
    camera.lookAt(0, 7, 0);
  }
  updateCamera();

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(0x10131a, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  threeContainer.value.appendChild(renderer.domElement);

  // 灯光
  scene.add(new THREE.AmbientLight(0x88aaff, 0.7));
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
  dirLight.position.set(20, 30, 20);
  scene.add(dirLight);

  // 地面发光网格
  const grid = new THREE.GridHelper(60, 30, 0x1e90ff, 0x1e90ff);
  grid.material.opacity = 0.18;
  grid.material.transparent = true;
  scene.add(grid);
  // 地面
  const groundGeo = new THREE.BoxGeometry(30, 0.2, 30);
  const groundMat = new THREE.MeshPhysicalMaterial({ color: 0x1a2233, roughness: 0.7, metalness: 0.3 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.position.y = -0.11;
  scene.add(ground);

  // 道路
  const roadGeo = new THREE.BoxGeometry(18, 0.05, 4);
  const roadMat = new THREE.MeshPhysicalMaterial({ color: 0x22262c, roughness: 0.5, metalness: 0.2 });
  const road = new THREE.Mesh(roadGeo, roadMat);
  road.position.set(0, 0.02, -7);
  scene.add(road);

  // 绿化带
  const grassGeo = new THREE.BoxGeometry(6, 0.08, 2);
  const grassMat = new THREE.MeshPhysicalMaterial({ color: 0x1de9b6, roughness: 0.8 });
  const grass1 = new THREE.Mesh(grassGeo, grassMat);
  grass1.position.set(-8, 0.06, 8);
  scene.add(grass1);
  const grass2 = new THREE.Mesh(grassGeo, grassMat);
  grass2.position.set(8, 0.06, 8);
  scene.add(grass2);

  // 灯光点缀
  for(let i=0;i<6;i++){
    const poleGeo = new THREE.CylinderGeometry(0.07, 0.07, 1.2, 8);
    const poleMat = new THREE.MeshPhysicalMaterial({ color: 0x888888 });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.set(-7 + i*2.8, 0.6, -8.7);
    scene.add(pole);
    const lampGeo = new THREE.SphereGeometry(0.13, 12, 12);
    const lampMat = new THREE.MeshPhysicalMaterial({ color: 0x00eaff, emissive: 0x00eaff, emissiveIntensity: 1, metalness: 0.8 });
    const lamp = new THREE.Mesh(lampGeo, lampMat);
    lamp.position.set(-7 + i*2.8, 1.25, -8.7);
    scene.add(lamp);
  }

  // 10层楼体参数
  const floorCount = 10;
  const floorHeight = 1.2;
  const buildingWidth = 4;
  const buildingDepth = 4;
  const buildingHeight = floorCount * floorHeight;

  // 底座
  const baseGeo = new THREE.BoxGeometry(buildingWidth + 1.2, 1, buildingDepth + 1.2);
  const baseMat = new THREE.MeshPhysicalMaterial({ color: 0x26334d, roughness: 0.5, metalness: 0.7 });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = 0.5;
  scene.add(base);
  // 底座入口
  const doorGeo = new THREE.BoxGeometry(1.2, 0.7, 0.18);
  const doorMat = new THREE.MeshPhysicalMaterial({ color: 0x00eaff, metalness: 0.8, roughness: 0.2, emissive: 0x00eaff, emissiveIntensity: 0.5 });
  const door = new THREE.Mesh(doorGeo, doorMat);
  door.position.set(0, 0.35, (buildingDepth+1.2)/2-0.09);
  scene.add(door);

  // 楼层Mesh数组
  const floors = [];
  const edgeLines = [];
  const windowGroups = [];
  const floorGroup = new THREE.Group();

  // 材质
  const floorMat = new THREE.MeshPhysicalMaterial({
    color: 0x2196f3,
    transparent: true,
    opacity: 0.32,
    roughness: 0.18,
    metalness: 0.7,
    transmission: 0.7,
    clearcoat: 0.7,
    clearcoatRoughness: 0.08,
    ior: 1.5,
    reflectivity: 0.45,
    emissive: 0x0a60ff,
    emissiveIntensity: 0.13
  });
  const edgeMat = new THREE.LineBasicMaterial({ color: 0x00eaff, linewidth: 2 });
  const highlightMat = new THREE.MeshPhysicalMaterial({
    color: 0x00eaff,
    transparent: true,
    opacity: 0.55,
    roughness: 0.1,
    metalness: 0.9,
    transmission: 0.8,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    ior: 1.7,
    reflectivity: 0.7,
    emissive: 0x00eaff,
    emissiveIntensity: 0.5
  });
  // 窗户材质
  const windowMat = new THREE.MeshPhysicalMaterial({
    color: 0x8fd6ff,
    transparent: true,
    opacity: 0.18,
    roughness: 0.05,
    metalness: 0.8,
    transmission: 0.9,
    ior: 1.6,
    reflectivity: 0.7
  });

  // 创建每一层
  for(let i=0;i<floorCount;i++){
    const geo = new THREE.BoxGeometry(buildingWidth, floorHeight, buildingDepth);
    const mesh = new THREE.Mesh(geo, floorMat.clone());
    mesh.position.y = 1 + floorHeight/2 + i*floorHeight;
    mesh.userData.floorIndex = i;
    floors.push(mesh);
    floorGroup.add(mesh);
    // 边框
    const edges = new THREE.EdgesGeometry(geo);
    const line = new THREE.LineSegments(edges, edgeMat);
    line.position.y = mesh.position.y;
    edgeLines.push(line);
    floorGroup.add(line);
    // 窗户组
    const winGroup = new THREE.Group();
    // 每层正面4扇窗
    for(let w=0;w<4;w++){
      const winGeo = new THREE.BoxGeometry(0.7, 0.7, 0.05);
      const win = new THREE.Mesh(winGeo, windowMat);
      win.position.set(-1.05 + w*0.7, mesh.position.y, buildingDepth/2+0.03);
      winGroup.add(win);
    }
    // 每层背面4扇窗
    for(let w=0;w<4;w++){
      const winGeo = new THREE.BoxGeometry(0.7, 0.7, 0.05);
      const win = new THREE.Mesh(winGeo, windowMat);
      win.position.set(-1.05 + w*0.7, mesh.position.y, -buildingDepth/2-0.03);
      winGroup.add(win);
    }
    // 左右两侧各2扇窗
    for(let w=0;w<2;w++){
      const winGeo = new THREE.BoxGeometry(0.05, 0.7, 0.7);
      const winL = new THREE.Mesh(winGeo, windowMat);
      winL.position.set(-buildingWidth/2-0.03, mesh.position.y, -0.7 + w*1.4);
      winGroup.add(winL);
      const winR = new THREE.Mesh(winGeo, windowMat);
      winR.position.set(buildingWidth/2+0.03, mesh.position.y, -0.7 + w*1.4);
      winGroup.add(winR);
    }
    windowGroups.push(winGroup);
    floorGroup.add(winGroup);
  }
  scene.add(floorGroup);

  // 屋顶设备（冷却塔+天线）
  const towerGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.7, 24);
  const towerMat = new THREE.MeshPhysicalMaterial({ color: 0x00eaff, metalness: 0.9, roughness: 0.2, emissive: 0x00eaff, emissiveIntensity: 0.7 });
  const tower = new THREE.Mesh(towerGeo, towerMat);
  tower.position.set(0.9, 1 + buildingHeight + 0.35, 0.9);
  scene.add(tower);
  const antennaGeo = new THREE.CylinderGeometry(0.07, 0.07, 1.1, 12);
  const antennaMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 1, roughness: 0.1, emissive: 0x00eaff, emissiveIntensity: 0.8 });
  const antenna = new THREE.Mesh(antennaGeo, antennaMat);
  antenna.position.set(-1.1, 1 + buildingHeight + 0.55, -1.1);
  scene.add(antenna);

  // 交互参数
  let separated = Array(floorCount).fill(false);
  let animating = Array(floorCount).fill(false);
  let highlightIdx = -1;

  // 缓动动画参数
  const separationY = 0.7;
  const animationSpeed = 0.12;
  const targetY = Array.from({length: floorCount}, (_, i) => 1 + floorHeight/2 + i*floorHeight);

  function animate() {
    requestAnimationFrame(animate);
    // 缓动分离动画
    for(let i=0;i<floorCount;i++){
      const mesh = floors[i];
      const line = edgeLines[i];
      let dest = targetY[i] + (separated[i] ? separationY : 0);
      if(Math.abs(mesh.position.y - dest) > 0.01){
        mesh.position.y += (dest - mesh.position.y) * animationSpeed;
        line.position.y = mesh.position.y;
        windowGroups[i].children.forEach(win => win.position.y = mesh.position.y);
        animating[i] = true;
      }else{
        if(animating[i]){
          mesh.position.y = dest;
          line.position.y = dest;
          windowGroups[i].children.forEach(win => win.position.y = dest);
          animating[i] = false;
        }
      }
    }
    // 高亮材质切换
    for(let i=0;i<floorCount;i++){
      if(i === highlightIdx){
        floors[i].material = highlightMat;
      }else{
        floors[i].material = floorMat;
      }
    }
    renderer.render(scene, camera);
  }
  animate();

  // 鼠标悬浮高亮
  function onPointerMove(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    const mouse = new THREE.Vector2();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(floors);
    if(intersects.length > 0){
      highlightIdx = intersects[0].object.userData.floorIndex;
    }else{
      highlightIdx = -1;
    }
  }
  renderer.domElement.addEventListener('pointermove', onPointerMove);

  // 点击分离+数据面板
  function onClick(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    const mouse = new THREE.Vector2();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(floors);
    if(intersects.length > 0){
      const mesh = intersects[0].object;
      const idx = mesh.userData.floorIndex;
      separated[idx] = !separated[idx];
      // 显示数据面板
      selectedFloor.value = idx;
      Object.assign(floorData, allFloorsData[idx]);
      panelVisible.value = true;
    }
  }
  renderer.domElement.addEventListener('click', onClick);

  // 方向键控制相机旋转
  window.addEventListener('keydown', (e) => {
    const step = Math.PI/36; // 5度
    if(e.key === 'ArrowLeft') camTheta -= step;
    if(e.key === 'ArrowRight') camTheta += step;
    if(e.key === 'ArrowUp') camPhi -= step;
    if(e.key === 'ArrowDown') camPhi += step;
    // 限制俯仰角范围
    camPhi = Math.max(0.15, Math.min(Math.PI/2-0.1, camPhi));
    updateCamera();
  });

  // 禁止页面滚动
  renderer.domElement.addEventListener('wheel', e => e.preventDefault(), { passive: false });

  // 自适应窗口
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
});
</script>

<style scoped>
.three-fullscreen {
  position: fixed;
  left: 0; top: 0; right: 0; bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background: #10131a;
}
.data-panel {
  position: fixed;
  top: 60px;
  right: 48px;
  width: 260px;
  background: rgba(18,28,48,0.98);
  border-radius: 14px;
  box-shadow: 0 4px 32px #0af3ff33;
  color: #e3f6ff;
  z-index: 2000;
  padding: 0 0 18px 0;
  border: 1.5px solid #00eaff55;
  font-family: 'HarmonyOS', 'Microsoft YaHei', Arial, sans-serif;
  animation: panelIn 0.3s;
}
@keyframes panelIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: none; }
}
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  padding: 16px 18px 8px 18px;
  border-bottom: 1px solid #00eaff33;
}
.close-btn {
  background: none;
  border: none;
  color: #00eaff;
  font-size: 22px;
  cursor: pointer;
  font-weight: bold;
  transition: color 0.2s;
}
.close-btn:hover {
  color: #ff3b3b;
}
.panel-content {
  padding: 16px 18px 0 18px;
}
.panel-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  margin-bottom: 12px;
}
</style>