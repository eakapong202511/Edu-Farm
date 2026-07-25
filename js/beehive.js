/* ===================================================
   EduFarm — Honey Beehive & Flying Pollination System (beehive.js)
   ระบบรดน้ำผึ้งหวานเจี๊ยบ 🐝 & ผึ้งบินผสมเกสร 4 ต้น (คูลดาวน์ 1 นาทีต่อ 1 ต้น)
   =================================================== */

const BeehiveManager = {
  isFlying: false,
  flightTimer: null,
  countdownTimer: null,
  maxPollinationsNeeded: 4,
  cooldownMs: 60000, // 1 นาทีต่อ 1 ต้น

  init() {
    this.initBeehiveState();
    this.renderBeehiveSprite();
    this.renderFlyingBeeSprite();
    this.startFlyingPollinationLoop();
  },

  initBeehiveState() {
    if (!gameState) return;
    if (gameState.pollinationCount === undefined) {
      gameState.pollinationCount = 0;
    }
    if (gameState.lastPollinationTime === undefined) {
      gameState.lastPollinationTime = 0;
    }
    if (gameState.honeyReady === undefined) {
      gameState.honeyReady = gameState.pollinationCount >= this.maxPollinationsNeeded;
    }
  },

  renderBeehiveSprite() {
    let hiveContainer = document.getElementById('farmBeehiveContainer');
    if (!hiveContainer) {
      hiveContainer = document.createElement('div');
      hiveContainer.id = 'farmBeehiveContainer';
      hiveContainer.className = 'beehive-container';
      
      const farmField = document.querySelector('.farm-field');
      if (farmField) farmField.appendChild(hiveContainer);
    }

    const count = gameState ? (gameState.pollinationCount || 0) : 0;
    const isReady = count >= this.maxPollinationsNeeded;

    hiveContainer.innerHTML = `
      <div class="beehive-sprite ${isReady ? 'hive-ready' : ''}" onclick="BeehiveManager.onBeehiveClick()" title="รังผึ้งผลิตน้ำผึ้งแท้ 🍯 (ผสมเกสรครบ 4 ต้นเก็บได้ 1 ขวด)">
        <div class="beehive-speech-bubble">
          ${isReady ? '🍯 เก็บน้ำผึ้งแท้!' : `🐝 ผสมเกสร (${count}/4)`}
        </div>
        <span class="beehive-emoji-3d">${isReady ? '🍯' : '🐝'}</span>
        <div class="beehive-badge">รังผึ้งหวานเจี๊ยบ</div>
      </div>
    `;
  },

  renderFlyingBeeSprite() {
    let flyingBee = document.getElementById('farmFlyingBee');
    if (!flyingBee) {
      flyingBee = document.createElement('div');
      flyingBee.id = 'farmFlyingBee';
      flyingBee.className = 'farm-flying-bee';
      flyingBee.onclick = () => this.onBeehiveClick();

      const farmField = document.querySelector('.farm-field');
      if (farmField) farmField.appendChild(flyingBee);
    }

    const count = gameState ? (gameState.pollinationCount || 0) : 0;
    const isReady = count >= this.maxPollinationsNeeded;

    const lastTime = gameState ? (gameState.lastPollinationTime || 0) : 0;
    const nextTime = lastTime + this.cooldownMs;
    const remaining = Math.max(0, Math.ceil((nextTime - Date.now()) / 1000));

    let bubbleText = '';
    if (isReady) {
      bubbleText = '🍯 น้ำผึ้งขวดทองพร้อมแล้ว!';
    } else if (remaining > 0) {
      bubbleText = `⏳ พักผ่อน (${remaining}s) | ผสมเกสร (${count}/4)`;
    } else {
      bubbleText = `🐝 พร้อมบินผสมเกสร (${count}/4)`;
    }

    flyingBee.innerHTML = `
      <div class="flying-bee-bubble">
        ${bubbleText}
      </div>
      <div class="flying-bee-emoji">🐝✨</div>
    `;
  },

  startFlyingPollinationLoop() {
    if (this.flightTimer) clearInterval(this.flightTimer);
    if (this.countdownTimer) clearInterval(this.countdownTimer);

    // อัปเดตนับถอยหลังป้ายป๊อบอัพทุกๆ 1 วินาที
    this.countdownTimer = setInterval(() => {
      this.renderFlyingBeeSprite();
    }, 1000);

    // ตรวจสอบบินผสมเกสรทุกๆ 2 วินาที
    this.flightTimer = setInterval(() => {
      if (!gameState) return;
      if ((gameState.pollinationCount || 0) >= this.maxPollinationsNeeded) return;

      const lastTime = gameState.lastPollinationTime || 0;
      const nextTime = lastTime + this.cooldownMs;

      // ถ้าครบกำหนดคูลดาวน์ 1 นาทีแล้ว
      if (Date.now() >= nextTime && !this.isFlying) {
        this.flyToRandomPlot();
      }
    }, 2000);
  },

  flyToRandomPlot() {
    if (this.isFlying) return;
    this.isFlying = true;

    const plots = document.querySelectorAll('.plot');
    const flyingBee = document.getElementById('farmFlyingBee');
    if (!plots.length || !flyingBee) {
      this.isFlying = false;
      return;
    }

    // สุ่มเลือกแปลงผักเป้าหมาย
    const targetPlot = plots[Math.floor(Math.random() * plots.length)];
    const targetRect = targetPlot.getBoundingClientRect();
    const beeRect = flyingBee.getBoundingClientRect();

    const deltaX = (targetRect.left + targetRect.width / 2) - (beeRect.left + beeRect.width / 2);
    const deltaY = (targetRect.top + targetRect.height / 2) - (beeRect.top + beeRect.height / 2);

    flyingBee.style.transition = 'transform 1.4s ease-in-out';
    flyingBee.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.15)`;

    // เมื่อผึ้งบินไปถึงแปลงเป้าหมาย
    setTimeout(() => {
      // สร้างละอองเกสรทองคำ ✨🌸
      this.spawnPollenEffect(targetPlot);

      if (!gameState.pollinationCount) gameState.pollinationCount = 0;
      gameState.pollinationCount++;
      gameState.lastPollinationTime = Date.now();

      if (gameState.pollinationCount >= this.maxPollinationsNeeded) {
        gameState.honeyReady = true;
        ToastSystem.show('🐝 ผึ้งบินผสมเกสรครบ 4 ต้นแล้ว! 🍯 ได้รับน้ำผึ้งขวดทอง 1 ขวด!', 'success');
      } else {
        ToastSystem.show(`🐝 ผึ้งบินผสมเกสรต้นที่ (${gameState.pollinationCount}/4) สำเร็จ! ✨🌸 (พักผ่อน 1 นาที)`, 'info');
      }

      if (typeof SaveSystem !== 'undefined') SaveSystem.save(gameState);
      this.renderBeehiveSprite();
      this.renderFlyingBeeSprite();

      // บินกลับเข้าที่รังผึ้ง
      setTimeout(() => {
        flyingBee.style.transition = 'transform 1.6s ease-in-out';
        flyingBee.style.transform = 'translate(0, 0) scale(1)';
        this.isFlying = false;
      }, 1000);

    }, 1400);
  },

  spawnPollenEffect(targetEl) {
    const pollen = document.createElement('div');
    pollen.style.cssText = `
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 1.6rem;
      pointer-events: none;
      z-index: 99;
      animation: pollenFloat 1.2s ease-out forwards;
    `;
    pollen.innerText = '✨🌸✨';
    targetEl.appendChild(pollen);

    setTimeout(() => pollen.remove(), 1200);
  },

  onBeehiveClick() {
    if (typeof AudioManager !== 'undefined') AudioManager.playClick();

    const count = gameState ? (gameState.pollinationCount || 0) : 0;
    const isReady = count >= this.maxPollinationsNeeded;

    if (isReady) {
      // เก็บน้ำผึ้ง
      gameState.pollinationCount = 0;
      gameState.honeyReady = false;
      gameState.lastPollinationTime = Date.now();
      gameState.coins += 45;
      gameState.exp += 30;

      if (!gameState.inventory) gameState.inventory = {};
      gameState.inventory.honey = (gameState.inventory.honey || 0) + 1;

      if (typeof renderHUD === 'function') renderHUD();
      if (typeof SaveSystem !== 'undefined') SaveSystem.save(gameState);
      if (typeof AudioManager !== 'undefined') AudioManager.playHarvest();

      this.renderBeehiveSprite();
      this.renderFlyingBeeSprite();

      Swal.fire({
        title: '🍯 เก็บน้ำผึ้งขวดทองสำเร็จ! 🐝',
        html: `
          <div style="text-align:center; padding:8px;">
            <div style="font-size:3.5rem;">🍯🐝🌸</div>
            <h4 style="color:#5D4037; margin-top:8px;">+45 เหรียญทอง 💰 | +30 EXP ⭐</h4>
            <div style="font-size:0.88rem; color:#2E7D32; font-weight:bold; background:#E8F5E9; padding:10px; border-radius:12px; margin-top:8px; text-align:left; line-height:1.4;">
              🧬 <strong>เกร็ดรู้วิทยาศาสตร์เรื่องการผสมเกสร (Pollination):</strong><br>
              ผึ้งบินผสมเกสรดอกไม้และต้นไม้ครบ 4 ต้นเรียบร้อยแล้ว! เมื่อผึ้งดูดน้ำหวานจากเกสรดอกไม้ ละอองเกสรจะติดไปผสมกับต้นถัดไป ทำให้พืชเจริญเติบโตและออกผลผลิตได้อย่างสมบูรณ์!
            </div>
          </div>
        `,
        confirmButtonText: 'รับน้ำผึ้ง! 👍',
        confirmButtonColor: '#FFB300',
        background: '#FFFDF5'
      });
    } else {
      const lastTime = gameState ? (gameState.lastPollinationTime || 0) : 0;
      const nextTime = lastTime + this.cooldownMs;
      const remaining = Math.max(0, Math.ceil((nextTime - Date.now()) / 1000));

      Swal.fire({
        title: `🐝 ผึ้งกำลังผสมเกสร (${count}/4) 🌸`,
        html: `
          <div style="text-align:center; padding:8px;">
            <div style="font-size:3.5rem; animation: pulse 1s infinite;">🐝🌸✨</div>
            <p style="color:#5D4037; margin-top:8px; font-size:0.95rem; line-height:1.4;">
              ผึ้งบินผสมเกสรไปแล้ว <strong>${count} จาก 4 ต้น</strong><br>
              ⏱️ คูลดาวน์ผสมเกสรต้นถัดไป: <strong>${remaining > 0 ? remaining + ' วินาที' : 'พร้อมบินผสมเกสร!'}</strong><br>
              💡 <strong>เงื่อนไข:</strong> ผึ้งผสมเกสรครบ 4 ต้น (คูลดาวน์ 1 นาที/ต้น) ถึงจะผลิต 🍯 <strong>น้ำผึ้งขวดทอง</strong> ได้ 1 ขวด!
            </p>
          </div>
        `,
        confirmButtonText: 'เข้าใจแล้ว 🐝',
        confirmButtonColor: '#FF9800',
        background: '#FFFDF5'
      });
    }
  }
};

window.BeehiveManager = BeehiveManager;

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => BeehiveManager.init(), 1400);
});
