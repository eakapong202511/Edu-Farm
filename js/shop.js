/* ===================================================
   EduFarm — Shop & Orders JavaScript (shop.js)
   ลอจิกคลังสินค้า ร้านค้าขายของ กระดานออเดอร์ NPC
   =================================================== */

// =============================================
// 🛒 SHOP MANAGER — ระบบร้านค้าและคลังสินค้า
// =============================================
const ShopManager = {

  // รายการออเดอร์ปัจจุบันจาก NPC
  orders: [
    {
      id: 1,
      customer: 'ลุงสมชาย 👨‍🌾',
      itemKey: 'rice',
      itemCount: 3,
      rewardCoins: 35,
      rewardExp: 20,
      dialog: 'หลานเอ๊ย ลุงอยากได้ข้าว 3 ลัง ไปหุงให้คนงานในฟาร์มจ้ะ!'
    },
    {
      id: 2,
      customer: 'ป้าพร ร้านเบเกอรี่ 👩‍🍳',
      itemKey: 'egg',
      itemCount: 2,
      rewardCoins: 40,
      rewardExp: 25,
      dialog: 'ป้ากำลังทำเค้กวันเกิด อยากได้ไข่ไก่สดๆ 2 ฟองจ้ะ!'
    },
    {
      id: 3,
      customer: 'เด็กหญิงมะลิ 👧',
      itemKey: 'bread',
      itemCount: 1,
      rewardCoins: 50,
      rewardExp: 30,
      dialog: 'หนูหิวขนมปังหอมๆ พี่เกษตรกรช่วยขายให้หนู 1 ก้อนได้ไหมคะ?'
    },
    {
      id: 4,
      customer: 'พ่อค้าทอม 👨‍💼',
      itemKey: 'cheese',
      itemCount: 1,
      rewardCoins: 90,
      rewardExp: 45,
      dialog: 'I need 1 Cheese for my restaurant. Can you sell it to me?'
    }
  ],

  /**
   * เปิด Modal คลังสินค้า (Barn / Inventory)
   */
  openInventoryModal() {
    if (typeof AudioManager !== 'undefined') AudioManager.playBarnDoorSound();
    this.renderInventoryModal();
    ModalSystem.open('inventoryModal');
  },

  /**
   * แสดงคลังสินค้า
   */
  renderInventoryModal() {
    const container = document.getElementById('inventoryGrid');
    if (!container) return;

    container.innerHTML = '';
    const inv = gameState.inventory || {};

    let totalItems = 0;
    Object.entries(inv).forEach(([key, qty]) => {
      if (qty <= 0) return;
      totalItems += qty;

      const itemInfo = getItemInfo(key);
      const card = document.createElement('div');
      card.style.cssText = 'background: white; border: 2px solid #FFE082; border-radius: 12px; padding: 12px; text-align: center;';

      card.innerHTML = `
        <div style="font-size: 2.2rem;">${itemInfo.emoji}</div>
        <div style="font-weight: 800; color: #5D4037; font-size: 0.95rem; margin-top: 4px;">${itemInfo.name}</div>
        <div style="font-size: 0.8rem; color: #8D6E63;">มีอยู่ในคลัง: <strong>${qty}</strong></div>
        <div style="font-size: 0.8rem; color: #E65100; font-weight: bold; margin-top: 2px;">ราคาขาย: ${itemInfo.sellPrice} 💰</div>
        <button class="btn btn-sm btn-warning" style="margin-top: 8px; width: 100%;" onclick="ShopManager.sellItemDirect('${key}')">
          💰 ขาย 1 ชิ้น
        </button>
      `;

      container.appendChild(card);
    });

    if (totalItems === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; color: #8D6E63; padding: 30px; font-weight: 600;">
          📦 คลังสินค้ายังว่างเปล่า! ปลูกพืช เลี้ยงสัตว์ หรือแปรรูปสินค้าเพื่อสะสมของนะจ๊ะ
        </div>
      `;
    }
  },

  /**
   * ขายสิ่งของโดยตรงจากคลัง
   */
  sellItemDirect(key) {
    if (!gameState.inventory || !gameState.inventory[key] || gameState.inventory[key] <= 0) {
      ToastSystem.show('⚠️ ไม่มีสิ่งของนี้ในคลังแล้ว!', 'warning');
      return;
    }

    const itemInfo = getItemInfo(key);
    gameState.inventory[key]--;
    gameState.coins += itemInfo.sellPrice;
    gameState.exp += Math.ceil(itemInfo.sellPrice / 3);

    ToastSystem.show(`💰 ขาย ${itemInfo.name} ${itemInfo.emoji} สำเร็จ! (+${itemInfo.sellPrice} 💰)`, 'success');

    renderHUD();
    this.renderInventoryModal();
    SaveSystem.save(gameState);
  },

  /**
   * เปิด Modal กระดานออเดอร์ (Order Board)
   */
  openOrderBoardModal() {
    if (typeof AudioManager !== 'undefined') AudioManager.playTruckHornSound();
    this.renderOrderBoard();
    ModalSystem.open('orderModal');
  },

  /**
   * แสดงกระดานออเดอร์
   */
  renderOrderBoard() {
    const container = document.getElementById('orderGrid');
    if (!container) return;

    container.innerHTML = '';

    this.orders.forEach(order => {
      const itemInfo = getItemInfo(order.itemKey);
      const inStock = (gameState.inventory && gameState.inventory[order.itemKey]) || 0;
      const canFulfill = inStock >= order.itemCount;

      const card = document.createElement('div');
      card.style.cssText = `background: white; border: 3px solid ${canFulfill ? '#4CAF50' : '#FFB300'}; border-radius: 14px; padding: 14px; margin-bottom: 12px;`;

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <strong style="font-size: 1.05rem; color: #5D4037;">${order.customer}</strong>
            <p style="font-size: 0.85rem; color: #795548; margin-top: 2px;">"${order.dialog}"</p>
          </div>
          <span class="badge ${canFulfill ? 'badge-exp' : 'badge-coins'}">${canFulfill ? '✅ พร้อมส่ง' : '⏳ รอของ'}</span>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 12px; background: #FFF8E1; padding: 8px 12px; border-radius: 10px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 1.8rem;">${itemInfo.emoji}</span>
            <div>
              <div style="font-weight: 700; font-size: 0.9rem;">${itemInfo.name} ${order.itemCount} ชิ้น</div>
              <div style="font-size: 0.75rem; color: ${canFulfill ? '#2E7D32' : '#C62828'}; font-weight: bold;">มีในคลัง: ${inStock}/${order.itemCount}</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.85rem; font-weight: bold; color: #E65100;">💰 +${order.rewardCoins}</div>
            <div style="font-size: 0.75rem; font-weight: bold; color: #1B5E20;">⭐ +${order.rewardExp}</div>
          </div>
        </div>

        <button class="btn btn-sm ${canFulfill ? 'btn-primary' : 'btn-secondary'}"
                style="width: 100%; margin-top: 10px;"
                ${!canFulfill ? 'disabled' : ''}
                onclick="ShopManager.fulfillOrder(${order.id})">
          🚚 ส่งของให้ออเดอร์นี้!
        </button>
      `;

      container.appendChild(card);
    });
  },

  /**
   * ส่งของตามออเดอร์
   */
  fulfillOrder(orderId) {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) return;

    const inStock = (gameState.inventory && gameState.inventory[order.itemKey]) || 0;
    if (inStock < order.itemCount) {
      ToastSystem.show('⚠️ สินค้าในคลังไม่พอสำหรับส่งออเดอร์!', 'error');
      return;
    }

    // Quiz ก่อนส่งออเดอร์ (คณิตศาสตร์การขายเงินทอน/กำไร)
    showQuiz('shop', (isCorrect, bonusCoins, bonusExp) => {
      gameState.inventory[order.itemKey] -= order.itemCount;

      let totalCoins = order.rewardCoins + (isCorrect ? bonusCoins : 0);
      let totalExp = order.rewardExp + (isCorrect ? bonusExp : 0);

      gameState.coins += totalCoins;
      gameState.exp += totalExp;

      const itemInfo = getItemInfo(order.itemKey);
      ToastSystem.show(`🚚 ส่ง ${itemInfo.name} ให้ ${order.customer} สำเร็จ! (+${totalCoins} 💰 +${totalExp} ⭐)`, 'success');

      // เปลี่ยนโจทย์ใหม่
      order.itemCount = Math.floor(Math.random() * 2) + 1;
      order.rewardCoins = Math.floor(itemInfo.sellPrice * order.itemCount * 1.4);

      renderHUD();
      this.renderOrderBoard();
      SaveSystem.save(gameState);
    });
  },

  /**
   * เปิด Shop Modal
   */
  openShopModal() {
    if (typeof AudioManager !== 'undefined') AudioManager.playShopBellSound();
    this.renderShopModal();
    ModalSystem.open('shopModal');
  },

  /**
   * แสดงหน้าร้านค้า
   */
  renderShopModal() {
    const container = document.getElementById('shopGrid');
    if (!container) return;

    container.innerHTML = '';

    // สัตว์เลี้ยงขายในร้าน
    const animalItems = Object.values(ANIMALS);
    animalItems.forEach(an => {
      const isUnlocked = gameState.level >= an.unlockLevel;
      const buyPrice = an.sellPrice * 2;
      const canAfford = gameState.coins >= buyPrice;

      const card = document.createElement('div');
      card.style.cssText = 'background: white; border: 2px solid #FFCC02; border-radius: 12px; padding: 12px; text-align: center;';

      card.innerHTML = `
        <div style="font-size: 2.5rem;">${an.emoji}</div>
        <div style="font-weight: 800; color: #5D4037; font-size: 1rem;">${an.name} (${an.nameEn})</div>
        <div style="font-size: 0.8rem; color: #8D6E63; margin-top: 2px;">ผลผลิต: ${an.produceEmoji} ${an.produceName}</div>
        <div style="font-size: 0.85rem; color: #E65100; font-weight: bold; margin-top: 4px;">ราคา: ${buyPrice} 💰</div>
        <button class="btn btn-sm ${isUnlocked && canAfford ? 'btn-primary' : 'btn-secondary'}" 
                style="margin-top: 8px; width: 100%;"
                ${!isUnlocked || !canAfford ? 'disabled' : ''}
                onclick="AnimalManager.buyAnimal('${an.id}'); ModalSystem.close('shopModal');">
          🛒 ซื้อ ${an.name}
        </button>
      `;

      container.appendChild(card);
    });
  }
};

/**
 * Helper ดึงรายละเอียดข้อมูลสิ่งของจากคลัง
 */
function getItemInfo(key) {
  if (CROPS[key]) {
    return { name: CROPS[key].name, emoji: CROPS[key].emoji, sellPrice: CROPS[key].sellPrice };
  }
  if (ANIMALS[key]) {
    return { name: ANIMALS[key].name, emoji: ANIMALS[key].emoji, sellPrice: ANIMALS[key].sellPrice };
  }
  if (key === 'egg') return { name: 'ไข่ไก่', emoji: '🥚', sellPrice: 15 };
  if (key === 'milk') return { name: 'นมวัว', emoji: '🥛', sellPrice: 30 };
  if (key === 'wool') return { name: 'ขนแกะ', emoji: '🧶', sellPrice: 45 };
  if (PROCESSED_GOODS[key]) {
    return { name: PROCESSED_GOODS[key].name, emoji: PROCESSED_GOODS[key].emoji, sellPrice: PROCESSED_GOODS[key].sellPrice };
  }
  return { name: key, emoji: '📦', sellPrice: 10 };
}
