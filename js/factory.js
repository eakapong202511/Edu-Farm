/* ===================================================
   EduFarm — Factory JavaScript (factory.js)
   ลอจิกโรงงานแปรรูป: เตาอบ, โรงทำนม, คราฟต์สินค้า, สัดส่วนวัตถุดิบ
   =================================================== */

// =============================================
// 🏭 FACTORY MANAGER — ระบบจัดการโรงงานแปรรูป
// =============================================
const FactoryManager = {

  openBakeryModal() {
    if (typeof AudioManager !== 'undefined') AudioManager.playClick();
    this.showFactoryPopup('bakery', '🍞 เตาอบขนมปัง 3D', ['bread', 'popcorn']);
  },

  openCreameryModal() {
    if (typeof AudioManager !== 'undefined') AudioManager.playClick();
    this.showFactoryPopup('creamery', '🧀 โรงแปรรูปนม & ชีส 3D', ['cheese', 'tomato_sauce']);
  },

  showFactoryPopup(facId, title, goodsKeys) {
    let optionsHtml = '';
    goodsKeys.forEach(goodKey => {
      const item = PROCESSED_GOODS[goodKey];
      if (!item) return;

      let hasMaterials = true;
      let recipeParts = [];
      for (const [matKey, countNeeded] of Object.entries(item.recipe)) {
        const inStock = (gameState.inventory && gameState.inventory[matKey]) || 0;
        const matItemName = getItemName(matKey);
        recipeParts.push(`${matItemName} ${inStock}/${countNeeded}`);
        if (inStock < countNeeded) hasMaterials = false;
      }

      optionsHtml += `
        <div style="background:#FFF8E1; border:2px solid #FFB300; border-radius:14px; padding:10px; margin-top:8px; display:flex; align-items:center; justify-content:space-between; text-align:left;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:2.2rem;">${item.emoji}</span>
            <div>
              <strong style="color:#5D4037; font-size:0.95rem;">${item.name} (${item.nameEn})</strong>
              <div style="font-size:0.75rem; color:#8D6E63;">สูตร: ${item.recipeDesc}</div>
              <div style="font-size:0.75rem; color:${hasMaterials ? '#2E7D32' : '#C62828'}; font-weight:bold;">
                วัตถุดิบ: ${recipeParts.join(', ')}
              </div>
            </div>
          </div>
          <button class="btn btn-sm ${hasMaterials ? 'btn-primary' : 'btn-secondary'}"
                  ${!hasMaterials ? 'disabled' : ''}
                  onclick="Swal.close(); FactoryManager.craftItem('${goodKey}')"
                  style="font-size:0.8rem; padding:4px 10px;">
            ⚙️ ผลิต (${item.sellPrice} 💰)
          </button>
        </div>
      `;
    });

    if (typeof Swal !== 'undefined') {
      Swal.fire({
        title: title,
        html: `<div style="max-height:300px; overflow-y:auto;">${optionsHtml}</div>`,
        showConfirmButton: false,
        showCloseButton: true,
        background: '#FFFDF5',
        customClass: { popup: 'swal2-farm-popup' }
      });
    }
  },

  /**
   * แสดงรายการโรงงานแปรรูป
   */
  renderFactories() {
    const container = document.getElementById('factoryList');
    if (!container) return;

    container.innerHTML = '';

    const factoryTypes = [
      {
        id: 'bakery',
        name: '🍞 เตาอบขนมปัง',
        desc: 'แปรรูปข้าว ข้าวโพด และไข่ ให้เป็นขนมปังแสนอร่อย!',
        goods: ['bread', 'popcorn'],
        unlockLevel: 1
      },
      {
        id: 'creamery',
        name: '🧀 โรงแปรรูปนม & ผลไม้',
        desc: 'แปรรูปนมวัวสดและมะเขือเทศ ให้เป็นชีสและซอสเข้มข้น!',
        goods: ['cheese', 'tomato_sauce'],
        unlockLevel: 2
      }
    ];

    factoryTypes.forEach(fac => {
      const isUnlocked = gameState.level >= fac.unlockLevel;
      const card = document.createElement('div');
      card.className = `card ${isUnlocked ? '' : 'disabled'}`;
      card.style.marginBottom = '16px';
      card.style.background = isUnlocked ? 'linear-gradient(135deg, #FFF8E1 0%, #FFF3E0 100%)' : '#E0E0E0';
      card.style.border = isUnlocked ? '3px solid #FFB300' : '3px solid #9E9E9E';

      let goodsHtml = '';
      fac.goods.forEach(goodKey => {
        const item = PROCESSED_GOODS[goodKey];
        if (!item) return;

        // ตรวจสอบวัตถุดิบในคลัง
        let hasMaterials = true;
        let recipeParts = [];
        for (const [matKey, countNeeded] of Object.entries(item.recipe)) {
          const inStock = (gameState.inventory && gameState.inventory[matKey]) || 0;
          const matItemName = getItemName(matKey);
          recipeParts.push(`${matItemName} ${inStock}/${countNeeded}`);
          if (inStock < countNeeded) {
            hasMaterials = false;
          }
        }

        goodsHtml += `
          <div style="background: white; border-radius: 12px; padding: 12px; margin-top: 10px; display: flex; align-items: center; justify-content: space-between; border: 2px solid #FFE082;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 2.2rem;">${item.emoji}</span>
              <div>
                <strong style="font-size: 1rem; color: #5D4037;">${item.name} (${item.nameEn})</strong>
                <div style="font-size: 0.8rem; color: #8D6E63;">สูตร: ${item.recipeDesc}</div>
                <div style="font-size: 0.75rem; color: ${hasMaterials ? '#2E7D32' : '#C62828'}; font-weight: bold;">
                  วัตถุดิบที่มี: ${recipeParts.join(', ')}
                </div>
              </div>
            </div>
            <button class="btn btn-sm ${hasMaterials && isUnlocked ? 'btn-primary' : 'btn-secondary'}" 
                    ${!hasMaterials || !isUnlocked ? 'disabled' : ''}
                    onclick="FactoryManager.craftItem('${goodKey}')">
              ⚙️ ผลิต (${item.sellPrice} 💰)
            </button>
          </div>
        `;
      });

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h3 style="font-size: 1.2rem; font-weight: 800; color: #5D4037;">${fac.name}</h3>
          ${!isUnlocked ? `<span class="badge badge-level">🔒 ต้องการ Lv.${fac.unlockLevel}</span>` : '<span class="badge badge-exp">✅ เปิดใช้งาน</span>'}
        </div>
        <p style="font-size: 0.85rem; color: #795548; margin-top: 4px;">${fac.desc}</p>
        ${isUnlocked ? goodsHtml : '<div style="margin-top:10px; color:#757575; font-size:0.9rem;">🔒 เลเวลยังไม่ถึง ปลดล็อกได้เมื่อถึงเลเวลที่กำหนด</div>'}
      `;

      container.appendChild(card);
    });
  },

  /**
   * คราฟต์แปรรูปสินค้า
   */
  craftItem(itemKey) {
    const item = PROCESSED_GOODS[itemKey];
    if (!item) return;

    if (!gameState.inventory) gameState.inventory = {};

    // ตรวจสอบวัตถุดิบอีกครั้ง
    for (const [matKey, countNeeded] of Object.entries(item.recipe)) {
      const inStock = gameState.inventory[matKey] || 0;
      if (inStock < countNeeded) {
        ToastSystem.show(`⚠️ วัตถุดิบ ${getItemName(matKey)} ไม่พอ!`, 'error');
        return;
      }
    }

    // แสดง Quiz สัดส่วน / คำนวณกำไร / สังคม ก่อนแปรรูป
    showQuiz('harvest', (isCorrect, bonusCoins, bonusExp) => {
      // หักวัตถุดิบ
      for (const [matKey, countNeeded] of Object.entries(item.recipe)) {
        gameState.inventory[matKey] -= countNeeded;
      }

      // เพิ่มสินค้าแปรรูปเข้าคลัง
      gameState.inventory[itemKey] = (gameState.inventory[itemKey] || 0) + 1;

      // ให้ EXP และโบนัส
      let expReward = item.expReward + (isCorrect ? bonusExp : 0);
      gameState.exp += expReward;

      // ตรวจเลเวลอัพ
      const newLevel = LevelSystem.calculateLevel(gameState.exp);
      if (newLevel > gameState.level) {
        gameState.level = newLevel;
        ToastSystem.show(`🎊 เลเวลอัพ! Lv.${gameState.level}!`, 'success');
      }

      if (typeof QuestManager !== 'undefined') {
        QuestManager.trackProgress('craft', 1);
      }

      ToastSystem.show(`⚙️ ผลิต ${item.name} ${item.emoji} สำเร็จ! (+${expReward} ⭐)`, 'success');

      renderHUD();
      this.renderFactories();
      SaveSystem.save(gameState);
    });
  }
};

/**
 * Helper ดึงชื่อสิ่งของภาษาไทย
 */
function getItemName(key) {
  if (CROPS[key]) return CROPS[key].emoji + ' ' + CROPS[key].name;
  if (ANIMALS[key]) return ANIMALS[key].produceEmoji + ' ' + ANIMALS[key].produceName;
  if (key === 'egg') return '🥚 ไข่ไก่';
  if (key === 'milk') return '🥛 นมวัว';
  if (key === 'wool') return '🧶 ขนแกะ';
  if (PROCESSED_GOODS[key]) return PROCESSED_GOODS[key].emoji + ' ' + PROCESSED_GOODS[key].name;
  return key;
}
