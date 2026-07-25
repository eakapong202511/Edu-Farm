/* ===================================================
   EduFarm — Educational Cargo Steamboat System (steamboat.js)
   เรือไอน้ำขนส่งสินค้าส่งออกทางน้ำ ⛵ (จัดส่ง 3-4 ลัง รับเหรียญยศ 🏅 + คูลดาวน์ 10 นาที)
   =================================================== */

const SteamboatManager = {
  cooldownInterval: null,

  init() {
    this.initSteamboatState();
  },

  initSteamboatState() {
    if (!gameState) return;
    if (!gameState.steamboat) {
      gameState.steamboat = {
        docked: true,
        crates: [
          { id: 1, itemKey: 'rice', itemCount: 4, filled: false, rewardCoins: 50, rewardExp: 30 },
          { id: 2, itemKey: 'egg', itemCount: 3, filled: false, rewardCoins: 45, rewardExp: 25 },
          { id: 3, itemKey: 'bread', itemCount: 2, filled: false, rewardCoins: 80, rewardExp: 50 },
          { id: 4, itemKey: 'honey', itemCount: 1, filled: false, rewardCoins: 90, rewardExp: 60 }
        ],
        nextAvailableTime: 0,
        completed: false
      };
      if (typeof SaveSystem !== 'undefined') SaveSystem.save(gameState);
    }
  },

  openSteamboatModal() {
    if (typeof AudioManager !== 'undefined') AudioManager.playClick();
    this.initSteamboatState();
    this.renderSteamboatModal();
    if (typeof ModalSystem !== 'undefined') ModalSystem.open('steamboatModal');
  },

  renderSteamboatModal() {
    if (this.cooldownInterval) clearInterval(this.cooldownInterval);

    const container = document.getElementById('steamboatGrid');
    const boatStatusEl = document.getElementById('steamboatStatusText');
    if (!container || !gameState || !gameState.steamboat) return;

    const ship = gameState.steamboat;
    const now = Date.now();
    const nextTime = ship.nextAvailableTime || 0;

    // ตรวจสอบคูลดาวน์ 10 นาที
    if (now < nextTime) {
      if (boatStatusEl) boatStatusEl.innerHTML = `<div style="color: #D84315; font-weight: 900;">⏳ เรือสินค้ากำลังเดินทางอยู่กลางทะเล (คูลดาวน์ 10 นาที)</div>`;

      const updateCountdown = () => {
        const remaining = Math.max(0, Math.ceil((ship.nextAvailableTime - Date.now()) / 1000));
        if (remaining <= 0) {
          clearInterval(this.cooldownInterval);
          this.renderSteamboatModal();
          return;
        }

        const mins = String(Math.floor(remaining / 60)).padStart(2, '0');
        const secs = String(remaining % 60).padStart(2, '0');

        container.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 20px; background: #E0F7FA; border-radius: 16px; border: 2px solid #00ACC1;">
            <div style="font-size: 3.8rem; animation: pulse 1.2s infinite;">⛵🌊</div>
            <h3 style="color: #006064; font-weight: 900; margin-top: 8px;">เรือสินค้าออกเดินทางส่งออกแล้ว!</h3>
            <p style="color: #5D4037; font-size: 0.95rem; margin-top: 4px;">เรือสินค้าลำใหม่จะเข้าเทียบท่าในอีก:</p>
            <div style="font-size: 1.8rem; font-weight: 900; color: #D84315; background: #FFE0B2; padding: 8px 20px; border-radius: 16px; border: 2px solid #FFB300; display: inline-block; margin-top: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.15);">
              ⏱️ ${mins}:${secs} นาที
            </div>
          </div>
        `;
      };

      updateCountdown();
      this.cooldownInterval = setInterval(updateCountdown, 1000);
      return;
    }

    // ปกติ: บรรจุสินค้าลงลัง
    container.innerHTML = '';
    let filledCount = 0;

    ship.crates.forEach(crate => {
      if (crate.filled) filledCount++;

      const itemInfo = getItemInfo(crate.itemKey);
      const inStock = (gameState.inventory && gameState.inventory[crate.itemKey]) || 0;
      const canFill = inStock >= crate.itemCount;

      const card = document.createElement('div');
      card.style.cssText = 'background: white; border: 2.5px solid #00838F; border-radius: 16px; padding: 12px; text-align: center; position: relative;';

      card.innerHTML = `
        <div style="font-size: 2.2rem;">${crate.filled ? '📦✅' : itemInfo.emoji}</div>
        <div style="font-weight: 900; color: #006064; font-size: 0.95rem; margin-top: 4px;">${itemInfo.name}</div>
        <div style="font-size: 0.8rem; color: #5D4037; margin-top: 2px;">
          ต้องการ: <strong>${crate.itemCount}</strong> ชิ้น (มีในคลัง: ${inStock})
        </div>
        <div style="font-size: 0.85rem; color: #E65100; font-weight: 800; margin-top: 4px;">
          รางวัล: +${crate.rewardCoins} 💰 | +${crate.rewardExp} ⭐
        </div>
        ${crate.filled ? `
          <div style="margin-top: 8px; font-weight: 900; color: #2E7D32; background: #E8F5E9; padding: 5px; border-radius: 10px;">
            บรรจุเรียบร้อยแล้ว! 📦
          </div>
        ` : `
          <button class="btn btn-sm ${canFill ? 'btn-primary' : 'btn-secondary'}" 
                  style="margin-top: 8px; width: 100%; font-weight: 900; background: linear-gradient(135deg, #00838F, #006064); color: white;"
                  ${!canFill ? 'disabled' : ''}
                  onclick="SteamboatManager.fillCrate(${crate.id})">
            📦 บรรจุสินค้าลงลัง
          </button>
        `}
      `;

      container.appendChild(card);
    });

    const isAllCompleted = filledCount === ship.crates.length;
    if (boatStatusEl) {
      boatStatusEl.innerHTML = isAllCompleted 
        ? `<div style="color: #2E7D32; font-weight: 900;">⛵ เรือสินค้าบรรจุครบถ้วนแล้ว! พร้อมส่งออก 🏅</div>`
        : `<div style="color: #00838F; font-weight: 900;">⚓ บรรจุลังสินค้า (${filledCount}/${ship.crates.length}) ลัง</div>`;
    }
  },

  fillCrate(crateId) {
    if (!gameState || !gameState.steamboat) return;
    const crate = gameState.steamboat.crates.find(c => c.id === crateId);
    if (!crate || crate.filled) return;

    const inStock = (gameState.inventory && gameState.inventory[crate.itemKey]) || 0;
    if (inStock < crate.itemCount) {
      ToastSystem.show('⚠️ สินค้าในคลังไม่พอสำหรับบรรจุลัง!', 'error');
      return;
    }

    // หักสินค้าจากคลัง
    gameState.inventory[crate.itemKey] -= crate.itemCount;
    crate.filled = true;
    gameState.coins += crate.rewardCoins;
    gameState.exp += crate.rewardExp;

    if (typeof renderHUD === 'function') renderHUD();
    if (typeof SaveSystem !== 'undefined') SaveSystem.save(gameState);
    if (typeof AudioManager !== 'undefined') AudioManager.playHarvest();

    const itemInfo = getItemInfo(crate.itemKey);
    ToastSystem.show(`📦 บรรจุ ${itemInfo.name} ${crate.itemCount} ชิ้น ลงลังสินค้าสำเร็จ! (+${crate.rewardCoins}💰)`, 'success');

    this.renderSteamboatModal();

    // ตรวจสอบว่าบรรจุสินค้าครบถ้วนทั้งลำแล้วหรือยัง
    const isAllFilled = gameState.steamboat.crates.every(c => c.filled);
    if (isAllFilled) {
      setTimeout(() => this.departSteamboat(), 600);
    }
  },

  departSteamboat() {
    if (typeof ModalSystem !== 'undefined') ModalSystem.close('steamboatModal');

    // มอบเหรียญตรายศเกียรติยศ 🏅
    gameState.medals = (gameState.medals || 0) + 1;
    gameState.coins += 200;
    gameState.exp += 150;

    // ตั้งเวลาคูลดาวน์ 10 นาที (600,000 ms)
    gameState.steamboat.nextAvailableTime = Date.now() + 600000;

    // สุ่มสร้างออเดอร์ลำใหม่สำหรับรอบถัดไป
    gameState.steamboat.crates = [
      { id: 1, itemKey: 'rice', itemCount: Math.floor(Math.random() * 3) + 3, filled: false, rewardCoins: 60, rewardExp: 40 },
      { id: 2, itemKey: 'egg', itemCount: Math.floor(Math.random() * 3) + 2, filled: false, rewardCoins: 50, rewardExp: 35 },
      { id: 3, itemKey: 'bread', itemCount: Math.floor(Math.random() * 2) + 1, filled: false, rewardCoins: 90, rewardExp: 60 },
      { id: 4, itemKey: 'honey', itemCount: 1, filled: false, rewardCoins: 100, rewardExp: 70 }
    ];

    if (typeof renderHUD === 'function') renderHUD();
    if (typeof SaveSystem !== 'undefined') SaveSystem.save(gameState);

    Swal.fire({
      title: '⛵ เรือสินค้าออกเดินทางส่งออกแล้ว! 🏅',
      html: `
        <div style="text-align:center; padding:10px;">
          <div style="font-size:3.8rem;">⛵🌊🏅</div>
          <h3 style="color:#006064; margin-top:8px;">ส่งสินค้าครบทั้งลำสำเร็จ!</h3>
          <div style="font-size:1.1rem; color:#E65100; font-weight:bold; margin-top:8px; background:#E0F7FA; padding:10px; border-radius:12px; border:1px solid #00ACC1;">
            🏅 ได้รับเหรียญเกียรติยศ +1 เหรียญ | 💰 +200 เหรียญทอง | ⭐ +150 EXP
          </div>
          <p style="color:#5D4037; font-size:0.85rem; margin-top:8px;">
            ⏳ เรือสินค้าลำถัดไปจะเดินทางมาเทียบท่าในอีก 10 นาที!
          </p>
        </div>
      `,
      confirmButtonText: 'ยอดเยี่ยมที่สุด! 👏',
      confirmButtonColor: '#00838F',
      background: '#FFFDF5'
    });
  }
};

window.SteamboatManager = SteamboatManager;

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => SteamboatManager.init(), 1200);
});
