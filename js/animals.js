/* ===================================================
   EduFarm — Animals JavaScript (animals.js)
   ลอจิกคอกสัตว์: ให้อาหาร, เก็บไข่/นม/ขนแกะ, สอดแทรกคำถามวิทย์/อังกฤษ
   =================================================== */

// =============================================
// 🐄 ANIMAL MANAGER — ระบบจัดการคอกสัตว์
// =============================================
const AnimalManager = {

  /**
   * แสดงลานคอกสัตว์ 3D ผืนใหญ่ มีรั้วล้อมรอบ สัตว์เดินไปเดินมาได้อิสระ
   */
  renderAnimalPen() {
    const grid = document.getElementById('animalGrid');
    if (!grid) return;

    grid.innerHTML = '';

    if (!gameState.animals || gameState.animals.length === 0) {
      grid.innerHTML = `
        <div style="text-align: center; color: white; padding: 24px; background: rgba(0,0,0,0.3); border-radius: 20px; width: 100%;">
          🐔 ยังไม่มีสัตว์เลี้ยงในคอก! ไปซื้อสัตว์ในร้านค้าได้เลยนะ 🛒
          <div style="margin-top:10px;">
            <button class="btn btn-sm btn-warning" onclick="ShopManager.openShopModal()">🏪 ร้านค้าซื้อสัตว์เลี้ยง</button>
          </div>
        </div>
      `;
      return;
    }

    // สร้างลานคอกสัตว์ 3D ผืนใหญ่สไตล์ Hay Day Ranch
    const pasture = document.createElement('div');
    pasture.className = 'animal-ranch-pasture';

    let animalsHTML = '';
    gameState.animals.forEach((animalItem, index) => {
      const animalType = ANIMALS[animalItem.type];
      if (!animalType) return;

      const isReady = animalItem.ready;
      const progressPercent = Math.min(100, (animalItem.fedCount / animalType.feedNeeded) * 100);

      let animClass = 'anim-chicken-waddle';
      if (animalItem.type === 'cow') animClass = 'anim-cow-sway';
      if (animalItem.type === 'sheep') animClass = 'anim-sheep-graze';
      if (animalItem.type === 'pig') animClass = 'anim-pig-bounce';

      animalsHTML += `
        <div class="ranch-animal-slot ${isReady ? 'slot-ready' : ''}" onclick="AnimalManager.handleAnimalClick(${index})" title="คลิกเพื่อให้อาหาร/เก็บผลผลิต (${animalItem.name})">
          <!-- สัตว์เดินในคอก 3D -->
          <div class="animal-sprite-3d ${animClass}">
            <span class="animal-emoji-3d">${isReady ? animalType.produceEmoji : animalType.emoji}</span>
          </div>

          <div class="animal-name-tag">${animalItem.name}</div>

          ${isReady ? `
            <div class="animal-action-badge badge-ready">✨ เก็บ!</div>
          ` : `
            <div class="animal-action-badge badge-feed">🌾 ให้อาหาร (${animalItem.fedCount}/${animalType.feedNeeded})</div>
            <div class="plot-progress" style="width: 75%; height: 5px; margin-top: 2px;">
              <div class="plot-progress-fill" style="width: ${progressPercent}%"></div>
            </div>
          `}
        </div>
      `;
    });

    pasture.innerHTML = `
      <div class="ranch-fence fence-top">🪵 🌲 🪵 🌲 🪵 🌲 🪵</div>
      <div class="ranch-hay-bales">🌾 🥣 🌾</div>
      <div class="ranch-animals-grid">
        ${animalsHTML}
      </div>
      <div class="ranch-fence fence-bottom">🪵 🌲 🪵 🌲 🪵 🌲 🪵</div>
    `;

    grid.appendChild(pasture);
  },

  /**
   * จัดการเมื่อคลิกสัตว์
   */
  handleAnimalClick(index) {
    const animalItem = gameState.animals[index];
    if (!animalItem) return;

    const animalType = ANIMALS[animalItem.type];
    if (!animalType) return;

    // ถ้าพร้อมเก็บผลผลิต
    if (animalItem.ready) {
      this.collectProduce(index);
    } else {
      // ให้อาหาร
      this.feedAnimal(index);
    }
  },

  /**
   * ให้อาหารสัตว์ (มี Quiz สอดแทรก + รองรับถุงอาหารสัตว์)
   */
  feedAnimal(index) {
    const animalItem = gameState.animals[index];
    if (!animalItem) return;
    const animalType = ANIMALS[animalItem.type];
    if (!animalType) return;
    const feedKey = 'feed_' + animalItem.type;

    // แสดงคำถามวิทยาศาสตร์/ภาษาอังกฤษก่อนให้อาหาร
    // ⚠️ ใช้ AnimalManager.renderAnimalPen() แบบ explicit แทน this.renderAnimalPen()
    // เพราะ callback ถูกเรียกจาก quiz.js ทำให้ 'this' ผิด context
    showQuiz('water', (isCorrect, bonusCoins, bonusExp) => {
      let usedFeedBag = false;

      // ตรวจสอบถุงอาหารในคลังสินค้า
      if (gameState.inventory && gameState.inventory[feedKey] && gameState.inventory[feedKey] > 0) {
        gameState.inventory[feedKey]--;
        usedFeedBag = true;
      } else if (gameState.coins >= animalType.feedPrice) {
        gameState.coins -= animalType.feedPrice;
      } else {
        // เงินไม่พอ → ช่วยเติมทุนให้อาหารสัตว์ฟรี
        gameState.coins += 10;
        ToastSystem.show(`🎁 ได้รับทุนช่วยเหลือให้อาหารสัตว์ +10 💰!`, 'info');
      }

      animalItem.fedCount = (animalItem.fedCount || 0) + 1;

      if (typeof QuestManager !== 'undefined') {
        QuestManager.trackProgress('feed', 1);
      }

      // แสดง Toast ผล
      if (usedFeedBag) {
        ToastSystem.show(`🥣 ให้อาหาร${animalType.name}ด้วยถุงอาหารสำเร็จ! (เหลือ ${gameState.inventory[feedKey]} ถุง)`, 'success');
      } else {
        ToastSystem.show(`${animalType.sound} ให้อาหาร${animalType.name}เรียบร้อยแล้ว!`, 'success');
      }

      if (animalItem.fedCount >= animalType.feedNeeded) {
        animalItem.ready = true;
        ToastSystem.show(`✨ ${animalType.name}อิ่มแล้ว! ผลิต ${animalType.produceName} ${animalType.produceEmoji} พร้อมเก็บ!`, 'success');
      } else {
        const remaining = animalType.feedNeeded - animalItem.fedCount;
        ToastSystem.show(`😋 ${animalType.name}อิ่มขึ้น! (ให้อาหารอีก ${remaining} ครั้ง)`, 'info');
      }

      // ✅ ใช้ชื่อ object โดยตรง ไม่ใช้ this
      if (typeof renderHUD === 'function') renderHUD();
      if (typeof AnimalManager !== 'undefined') AnimalManager.renderAnimalPen();
      if (typeof SaveSystem !== 'undefined') SaveSystem.save(gameState);
    });
  },

  /**
   * เก็บผลผลิตสัตว์
   */
  collectProduce(index) {
    const animalItem = gameState.animals[index];
    const animalType = ANIMALS[animalItem.type];

    // เพิ่มสิ่งของเข้าคลังสินค้า
    if (!gameState.inventory) gameState.inventory = {};
    const key = animalType.produceKey;
    gameState.inventory[key] = (gameState.inventory[key] || 0) + 1;

    // ให้เหรียญและ EXP
    gameState.coins += animalType.sellPrice;
    gameState.exp += animalType.expReward;

    // รีเซ็ตสัตว์
    animalItem.ready = false;
    animalItem.fedCount = 0;

    // ตรวจเลเวลอัพ
    const newLevel = LevelSystem.calculateLevel(gameState.exp);
    if (newLevel > gameState.level) {
      gameState.level = newLevel;
      ToastSystem.show(`🎊 เลเวลอัพ! Lv.${gameState.level}!`, 'success');
    }

    ToastSystem.show(`🎉 เก็บ ${animalType.produceName} ${animalType.produceEmoji} ได้แล้ว! (+${animalType.sellPrice} 💰 +${animalType.expReward} ⭐)`, 'success');

    renderHUD();
    this.renderAnimalPen();
    SaveSystem.save(gameState);
  },

  /**
   * ซื้อสัตว์ใหม่
   */
  buyAnimal(type) {
    const animalType = ANIMALS[type];
    if (!animalType) return;

    if (gameState.level < animalType.unlockLevel) {
      ToastSystem.show(`🔒 ต้องการเลเวล ${animalType.unlockLevel} เพื่อซื้อ${animalType.name}`, 'warning');
      return;
    }

    const buyPrice = animalType.sellPrice * 2;
    if (gameState.coins < buyPrice) {
      ToastSystem.show(`💸 เหรียญไม่พอซื้อ${animalType.name} (${buyPrice} 💰)!`, 'error');
      return;
    }

    gameState.coins -= buyPrice;
    if (!gameState.animals) gameState.animals = [];

    const newId = gameState.animals.length;
    const names = {
      chicken: ['ไก่จ๊อก', 'ไก่กุ๊ก', 'ไก่เด้ง', 'ไก่หวาน'],
      cow: ['แม่วัวมู', 'วัวดนตรี', 'วัวนมสด', 'วัวใจดี'],
      sheep: ['แกะนุ่ม', 'แกะปุย', 'แกะขาว', 'แกะยิ้ม'],
      pig: ['หมูอู๊ด', 'หมูพะโล้', 'หมูนุ่ม', 'หมูพุงกาง']
    };

    const typeNames = names[type] || ['น้องสัตว์'];
    const randomName = typeNames[Math.floor(Math.random() * typeNames.length)];

    gameState.animals.push({
      id: newId,
      type: type,
      name: randomName,
      fedCount: 0,
      ready: false
    });

    ToastSystem.show(`🎉 ได้รับ ${animalType.emoji} ${randomName} เข้าคอกสัตว์แล้ว! (-${buyPrice} 💰)`, 'success');

    renderHUD();
    this.renderAnimalPen();
    SaveSystem.save(gameState);
  }
};
