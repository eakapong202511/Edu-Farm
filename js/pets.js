/* ===================================================
   EduFarm — Farm Helper Pet System (pets.js)
   หมาน้อยช่วยฟาร์ม 🐶 (ซื้อจากร้านค้า ราคา 400 เหรียญทอง)
   - วิ่งไปรดน้ำแปลงผักให้อัตโนมัติ (คูลดาวน์ 5 วินาที)
   - วิ่งไปเก็บผลผลิตพืชผักและคอกสัตว์ถึงแปลงสุกจริงอย่างสมจริง!
   =================================================== */

const PetManager = {
  lastWaterTime: 0,
  waterCooldownMs: 10000, // 10 วินาทีต่อ 1 แปลง
  loopInterval: null,
  isBusy: false,

  /**
   * เริ่มต้นระบบหมาน้อยช่วยฟาร์ม
   */
  init() {
    if (!gameState || !gameState.hasHelperPet) {
      this.removePetSprite();
      return;
    }

    this.renderPetSprite();
    this.startHelperLoop();
  },

  /**
   * แสดงตัวการ์ตูนหมาน้อยเดินในฟาร์ม
   */
  renderPetSprite() {
    let petContainer = document.getElementById('farmPetContainer');
    if (!petContainer) {
      petContainer = document.createElement('div');
      petContainer.id = 'farmPetContainer';
      petContainer.className = 'farm-pet-container';
      
      const targetParent = document.body;
      targetParent.appendChild(petContainer);
    }

    petContainer.innerHTML = `
      <div class="farm-pet-sprite" title="🐶 หมาน้อยผู้ช่วยฟาร์มกำลังวิ่งช่วยรดน้ำ (คูลดาวน์ 10s) และเก็บผลผลิตให้อัตโนมัติ!">
        <div class="pet-speech-bubble" id="petSpeechBubble">🐶 ผู้ช่วยทำงานอยู่!</div>
        <span class="pet-emoji-3d">🐶</span>
        <div class="pet-level-badge">ผู้ช่วยฟาร์ม 400💰</div>
      </div>
    `;
  },

  /**
   * ถอดการ์ตูนหมาน้อยออก
   */
  removePetSprite() {
    const petContainer = document.getElementById('farmPetContainer');
    if (petContainer) petContainer.remove();
  },

  /**
   * อัปเดตข้อความในบอลลูนคำพูดหมาน้อย
   */
  updateSpeechBubble(text) {
    const bubble = document.getElementById('petSpeechBubble');
    if (bubble) bubble.innerText = text;
  },

  /**
   * เริ่มลูปทำงานอัตโนมัติ (ตรวจตราทุก 1 วินาที)
   */
  startHelperLoop() {
    if (this.loopInterval) clearInterval(this.loopInterval);

    this.runHelperTick();
    this.loopInterval = setInterval(() => {
      this.runHelperTick();
    }, 1000);
  },

  /**
   * ทำงาน 1 รอบการตรวจตรา
   */
  runHelperTick() {
    if (!gameState || !gameState.hasHelperPet || this.isBusy) return;

    // 1. ตรวจสอบแปลงผักที่พร้อมเก็บเกี่ยว (Ready Crops)
    if (gameState.plots) {
      const readyPlotIndex = gameState.plots.findIndex(p => p.state === 'ready' && p.crop);
      if (readyPlotIndex !== -1) {
        this.isBusy = true;
        const plotEl = document.querySelector(`.plot[data-plot-id="${readyPlotIndex}"]`);
        const plot = gameState.plots[readyPlotIndex];
        const crop = CROPS[plot.crop];

        const cropName = crop ? crop.name : 'ผลผลิต';
        this.updateSpeechBubble(`🐶 วิ่งไปเก็บ${cropName}! 🧺`);
        this.moveToTarget(plotEl, () => {
          this.harvestSinglePlot(readyPlotIndex);
          this.isBusy = false;
          this.updateSpeechBubble('🐶 ผู้ช่วยทำงานอยู่!');
        });
        return;
      }
    }

    // 2. ตรวจสอบคอกสัตว์ที่ผลผลิตพร้อมเก็บเกี่ยว (Ready Animal Produce)
    if (gameState.animals) {
      const readyAnimalIndex = gameState.animals.findIndex(an => an.ready);
      if (readyAnimalIndex !== -1) {
        this.isBusy = true;
        const animalSlots = document.querySelectorAll('.ranch-animal-slot');
        const targetSlot = animalSlots[readyAnimalIndex];
        const animal = gameState.animals[readyAnimalIndex];
        const animalType = ANIMALS[animal.type];

        const produceName = animalType ? animalType.produceName : 'ผลผลิต';
        this.updateSpeechBubble(`🐶 วิ่งไปเก็บ${produceName}! 🧺`);
        this.moveToTarget(targetSlot, () => {
          this.harvestSingleAnimal(readyAnimalIndex);
          this.isBusy = false;
          this.updateSpeechBubble('🐶 ผู้ช่วยทำงานอยู่!');
        });
        return;
      }
    }

    // 3. ตรวจสอบแปลงผักที่ยังไม่ได้รดน้ำ (Watering Cooldown 5s)
    const elapsed = Date.now() - this.lastWaterTime;
    if (elapsed >= this.waterCooldownMs) {
      if (gameState.plots) {
        const unwateredPlotIndex = gameState.plots.findIndex(p => (p.state === 'planted' || p.state === 'growing') && p.crop);
        if (unwateredPlotIndex !== -1) {
          this.isBusy = true;
          const plotEl = document.querySelector(`.plot[data-plot-id="${unwateredPlotIndex}"]`);

          this.updateSpeechBubble('🐶 วิ่งไปรดน้ำ! 💧');
          this.moveToTarget(plotEl, () => {
            const plot = gameState.plots[unwateredPlotIndex];
            if (typeof handleWater === 'function') {
              handleWater(unwateredPlotIndex, plot);
              this.lastWaterTime = Date.now();
              ToastSystem.show('🐶 หมาน้อยวิ่งไปช่วยรดน้ำแปลงผักให้อัตโนมัติ! 💧 (คูลดาวน์ 5s)', 'success');
            }
            this.isBusy = false;
            this.updateSpeechBubble('🐶 ผู้ช่วยทำงานอยู่!');
          });
          return;
        }
      }
    }
  },

  /**
   * วิ่งไปหา Element เป้าหมายอย่างสมจริงด้วย CSS Translation
   */
  moveToTarget(targetEl, actionCallback) {
    const petContainer = document.getElementById('farmPetContainer');
    if (!petContainer || !targetEl) {
      if (actionCallback) actionCallback();
      return;
    }

    const targetRect = targetEl.getBoundingClientRect();
    const petRect = petContainer.getBoundingClientRect();

    // คำนวณระยะทางสัมพัทธ์ระหว่างตำแหน่งหมาน้อยกับเป้าหมาย
    const deltaX = (targetRect.left + targetRect.width / 2) - (petRect.left + petRect.width / 2);
    const deltaY = (targetRect.top + targetRect.height / 2) - (petRect.top + petRect.height / 2);

    const sprite = petContainer.querySelector('.farm-pet-sprite');
    if (sprite) sprite.classList.add('pet-running');

    // วิ่งไปยังตำแหน่งเป้าหมาย
    petContainer.style.transition = 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)';
    petContainer.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

    setTimeout(() => {
      // เมื่อถึงเป้าหมาย ให้ทำงาน (รดน้ำ / เก็บเกี่ยว)
      if (actionCallback) actionCallback();

      // เดินทางกลับตำแหน่งเดิมอย่างนุ่มนวล
      setTimeout(() => {
        petContainer.style.transition = 'transform 0.75s cubic-bezier(0.25, 1, 0.5, 1)';
        petContainer.style.transform = 'translate(0px, 0px)';
        if (sprite) sprite.classList.remove('pet-running');
      }, 700);
    }, 650);
  },

  /**
   * เก็บเกี่ยวพืชผักแปลงเดียว
   */
  harvestSinglePlot(plotIndex) {
    const plot = gameState.plots[plotIndex];
    if (!plot || plot.state !== 'ready' || !plot.crop) return;

    const crop = CROPS[plot.crop];
    if (crop) {
      gameState.coins += crop.sellPrice;
      gameState.exp += crop.expReward;
      gameState.totalHarvested = (gameState.totalHarvested || 0) + 1;

      if (!gameState.inventory) gameState.inventory = {};
      gameState.inventory[plot.crop] = (gameState.inventory[plot.crop] || 0) + 1;

      plot.state = 'empty';
      plot.crop = null;
      plot.waterCount = 0;

      if (typeof renderHUD === 'function') renderHUD();
      if (typeof renderFarmGrid === 'function') renderFarmGrid();
      if (typeof SaveSystem !== 'undefined') SaveSystem.save(gameState);
      if (typeof AudioManager !== 'undefined') AudioManager.playHarvest();

      ToastSystem.show(`🐶 หมาน้อยวิ่งไปช่วยเก็บ ${crop.name} เรียบร้อย! ✨ (+${crop.sellPrice}💰 +${crop.expReward}⭐)`, 'success');
    }
  },

  /**
   * เก็บผลผลิตสัตว์เลี้ยงตัวเดียว
   */
  harvestSingleAnimal(animalIndex) {
    const animal = gameState.animals[animalIndex];
    if (!animal || !animal.ready) return;

    const animalType = ANIMALS[animal.type];
    if (animalType) {
      gameState.coins += animalType.sellPrice;
      gameState.exp += animalType.expReward;

      const produceKey = animalType.produceKey || (animal.type === 'chicken' ? 'egg' : animal.type === 'cow' ? 'milk' : 'wool');
      if (!gameState.inventory) gameState.inventory = {};
      gameState.inventory[produceKey] = (gameState.inventory[produceKey] || 0) + 1;

      animal.ready = false;
      animal.fedCount = 0;

      if (typeof renderHUD === 'function') renderHUD();
      if (typeof AnimalManager !== 'undefined' && typeof AnimalManager.renderAnimalPen === 'function') {
        AnimalManager.renderAnimalPen();
      }
      if (typeof SaveSystem !== 'undefined') SaveSystem.save(gameState);
      if (typeof AudioManager !== 'undefined') AudioManager.playHarvest();

      ToastSystem.show(`🐶 หมาน้อยวิ่งไปช่วยเก็บ${animalType.produceName}เรียบร้อย! ✨ (+${animalType.sellPrice}💰 +${animalType.expReward}⭐)`, 'success');
    }
  }
};

// ผูก PetManager เข้ากับ window Object
window.PetManager = PetManager;

// เริ่มต้นระบบเมื่อโหลดหน้าจอ
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => PetManager.init(), 1000);
});
