/* ===================================================
   EduFarm — Bank & Economics JavaScript (bank.js)
   ระบบธนาคารออมสิน บัญชีฟาร์ม และปรัชญาเศรษฐกิจพอเพียง
   =================================================== */

// =============================================
// 🏦 BANK MANAGER — ระบบธนาคารและบัญชี
// =============================================
const BankManager = {

  /**
   * เปิด Modal ธนาคารออมสิน
   */
  openBankModal() {
    if (typeof AudioManager !== 'undefined') AudioManager.playBankSound();
    this.renderBankModal();
    ModalSystem.open('bankModal');
  },

  /**
   * แสดงหน้าต่างธนาคารออมสิน
   */
  renderBankModal() {
    const container = document.getElementById('bankContainer');
    if (!container) return;

    if (typeof gameState.bankSavings === 'undefined') {
      gameState.bankSavings = 0;
    }

    const savings = gameState.bankSavings;
    const wallet = gameState.coins;

    container.innerHTML = `
      <!-- ปรัชญาเศรษฐกิจพอเพียง -->
      <div style="background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%); border: 3px solid #4CAF50; border-radius: 14px; padding: 14px; margin-bottom: 16px;">
        <h4 style="color: #1B5E20; font-size: 1.05rem; font-weight: 800;">⚖️ ปรัชญาเศรษฐกิจพอเพียง</h4>
        <p style="font-size: 0.85rem; color: #2E7D32; margin-top: 4px;">
          "พอประมาณ มีเหตุผล มีภูมิคุ้มกันในตัวที่ดี" การฝากเงินออมช่วยสร้างภูมิคุ้มกันทางการเงินให้ฟาร์มของเรา!
        </p>
      </div>

      <!-- สรุปเงิน -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
        <div style="background: white; border: 2px solid #FFB300; border-radius: 12px; padding: 12px; text-align: center;">
          <div style="font-size: 0.8rem; color: #8D6E63; font-weight: bold;">💰 เงินในกระเป๋า</div>
          <div style="font-size: 1.4rem; font-weight: 800; color: #E65100;">${wallet} 💰</div>
        </div>

        <div style="background: white; border: 2px solid #1976D2; border-radius: 12px; padding: 12px; text-align: center;">
          <div style="font-size: 0.8rem; color: #0D47A1; font-weight: bold;">🏦 เงินฝากออมสิน</div>
          <div style="font-size: 1.4rem; font-weight: 800; color: #1565C0;">${savings} 💰</div>
          <div style="font-size: 0.7rem; color: #2E7D32; font-weight: bold;">(ดอกเบี้ย 5% ออมสิน)</div>
        </div>
      </div>

      <!-- ฟอร์มฝาก/ถอนเงิน -->
      <div style="background: white; border: 2px solid #E0E0E0; border-radius: 14px; padding: 14px; margin-bottom: 16px;">
        <h4 style="font-size: 0.95rem; font-weight: 800; color: #5D4037; margin-bottom: 10px;">💳 ทำรายการฝาก/ถอนเงิน</h4>
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          <button class="btn btn-sm btn-primary" style="flex: 1;" onclick="BankManager.deposit(10)">
            ➕ ฝาก 10 💰
          </button>
          <button class="btn btn-sm btn-primary" style="flex: 1;" onclick="BankManager.deposit(50)">
            ➕ ฝาก 50 💰
          </button>
          <button class="btn btn-sm btn-success" style="flex: 1; background: #2E7D32;" onclick="BankManager.depositAll()">
            💎 ฝากทั้งหมด
          </button>
        </div>
        <div style="display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap;">
          <button class="btn btn-sm btn-warning" style="flex: 1;" onclick="BankManager.withdraw(10)">
            ➖ ถอน 10 💰
          </button>
          <button class="btn btn-sm btn-warning" style="flex: 1;" onclick="BankManager.withdraw(50)">
            ➖ ถอน 50 💰
          </button>
          <button class="btn btn-sm btn-danger" style="flex: 1; background: #C62828;" onclick="BankManager.withdrawAll()">
            💸 ถอนทั้งหมด
          </button>
        </div>
      </div>

      <!-- คำแนะนำพอเพียง -->
      <div style="text-align: center; font-size: 0.8rem; color: #616161;">
        💡 <strong>คำแนะนำ:</strong> ควรออมเงินอย่างน้อย 20% ของเงินทั้งหมดไว้ในธนาคารเพื่อรับดอกเบี้ยนะจ๊ะ!
      </div>
    `;
  },

  /**
   * ฝากเงิน
   */
  deposit(amount) {
    if (gameState.coins < amount) {
      ToastSystem.show('💸 เงินในกระเป๋าไม่พอฝากนะจ๊ะ!', 'error');
      return;
    }

    gameState.coins -= amount;
    if (typeof gameState.bankSavings === 'undefined') gameState.bankSavings = 0;
    gameState.bankSavings += amount;

    // คำนวณดอกเบี้ยโบนัสเล็กน้อย
    const interest = Math.ceil(amount * 0.05);
    gameState.bankSavings += interest;

    ToastSystem.show(`🏦 ฝากเงิน ${amount} 💰 เข้าธนาคารเรียบร้อย! (ได้รับดอกเบี้ย +${interest} 💰)`, 'success');

    renderHUD();
    this.renderBankModal();
    SaveSystem.save(gameState);
  },

  /**
   * ฝากเงินทั้งหมด
   */
  depositAll() {
    const amount = gameState.coins;
    if (amount <= 0) {
      ToastSystem.show('💸 ไม่มีเงินในกระเป๋าเหลือให้ฝาก!', 'warning');
      return;
    }
    this.deposit(amount);
  },

  /**
   * ถอนเงิน
   */
  withdraw(amount) {
    if (!gameState.bankSavings || gameState.bankSavings < amount) {
      ToastSystem.show('⚠️ เงินฝากในธนาคารไม่พอถอน!', 'error');
      return;
    }

    gameState.bankSavings -= amount;
    gameState.coins += amount;

    ToastSystem.show(`💳 ถอนเงิน ${amount} 💰 ออกมาจากธนาคารเรียบร้อย!`, 'info');

    renderHUD();
    this.renderBankModal();
    SaveSystem.save(gameState);
  },

  /**
   * ถอนเงินทั้งหมด
   */
  withdrawAll() {
    const amount = gameState.bankSavings || 0;
    if (amount <= 0) {
      ToastSystem.show('⚠️ ไม่มีเงินฝากในธนาคารให้ถอน!', 'error');
      return;
    }
    this.withdraw(amount);
  }
};
