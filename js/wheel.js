/* ===================================================
   EduFarm — Knowledge Lucky Wheel System (wheel.js)
   วงล้อหมุนเสี่ยงโชคความรู้ (ตอบคำถามก่อนหมุนวงล้อรับของรางวัล)
   =================================================== */

const WheelManager = {
  prizes: [
    { id: 'coins_100', label: '100 เหรียญทอง', emoji: '💰', type: 'coins', amount: 100, color: '#FFD54F' },
    { id: 'exp_150', label: '150 EXP', emoji: '⭐', type: 'exp', amount: 150, color: '#81C784' },
    { id: 'super_seeds', label: 'เมล็ดทองคำ 3 ชิ้น', emoji: '🌟', type: 'item', itemKey: 'sunflower', amount: 3, color: '#FFB74D' },
    { id: 'fertilizer', label: 'ปุ๋ยเร่งโต 2 ชิ้น', emoji: '⚡', type: 'item', itemKey: 'rice', amount: 2, color: '#4FC3F7' },
    { id: 'crown_gift', label: 'หมวกมงกุฎทองคำ!', emoji: '👑', type: 'outfit', outfitKey: 'crown', color: '#BA68C8' },
    { id: 'coins_200', label: '200 เหรียญทอง', emoji: '💰', type: 'coins', amount: 200, color: '#FF8A65' }
  ],
  isSpinning: false,

  /**
   * เปิด Modal วงล้อเสี่ยงโชค (หมุนได้ 10 นาทีต่อ 1 ครั้ง)
   */
  openWheelModal() {
    if (typeof AudioManager !== 'undefined') AudioManager.playClick();

    // ตรวจสอบคูลดาวน์ 10 นาที (600,000 ms)
    if (!gameState) return;
    const cooldownMs = 10 * 60 * 1000;
    const lastSpin = gameState.lastWheelSpinTime || 0;
    const elapsed = Date.now() - lastSpin;

    if (elapsed < cooldownMs) {
      const remainingMs = cooldownMs - elapsed;
      const minutes = Math.floor(remainingMs / 60000);
      const seconds = Math.floor((remainingMs % 60000) / 1000);

      Swal.fire({
        title: '⏳ คูลดาวน์วงล้อเสี่ยงโชค',
        html: `
          <div style="text-align:center; padding:10px;">
            <div style="font-size:3rem;">⏳ 🎡</div>
            <p style="font-size:1rem; color:#5D4037; margin-top:8px;">
              กรุณารออีก <strong>${minutes} นาที ${seconds} วินาที</strong><br>จึงจะเปิดหมุนวงล้อเสี่ยงโชครอบถัดไปได้นะ!
            </p>
          </div>
        `,
        confirmButtonText: 'รับทราบจ้า! 👍',
        confirmButtonColor: '#FF9800',
        background: '#FFFDF5',
        customClass: { popup: 'swal2-farm-popup' }
      });
      return;
    }

    // ขั้นตอนที่ 1: ตอบคำถามสุ่ม 1 ข้อเพื่อรับสิทธิ์หมุนวงล้อ
    this.promptQuizChallenge();
  },

  /**
   * คำถามท้าทายก่อนหมุนวงล้อ
   */
  promptQuizChallenge() {
    if (typeof showQuiz === 'function') {
      showQuiz('harvest', (isCorrect, bonusCoins, bonusExp) => {
        if (isCorrect) {
          ToastSystem.show('✨ ตอบถูกต้อง! ได้รับสิทธิ์หมุนวงล้อโชคดีแล้ว 🎡', 'success');
          setTimeout(() => this.showSpinWheelPopup(), 400);
        } else {
          ToastSystem.show('❌ ตอบยังไม่ถูก ลองทบทวนแล้วมาหมุนใหม่นะ!', 'error');
        }
      });
    } else {
      this.showSpinWheelPopup();
    }
  },

  /**
   * แสดง Popup วงล้อหมุน 3D
   */
  showSpinWheelPopup() {
    if (typeof Swal === 'undefined') return;

    Swal.fire({
      title: '🎡 วงล้อเสี่ยงโชคความรู้ 🎡',
      html: `
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:10px;">
          <!-- เข็มชี้วงล้อ -->
          <div style="font-size:2rem; margin-bottom:-15px; z-index:10; filter:drop-shadow(0 4px 6px rgba(0,0,0,0.4));">🔻</div>
          
          <!-- ตัววงล้อ -->
          <div id="luckyWheelCircle" class="lucky-wheel-circle">
            <div class="wheel-segment seg-0">💰 100</div>
            <div class="wheel-segment seg-1">⭐ 150</div>
            <div class="wheel-segment seg-2">🌟 เมล็ด</div>
            <div class="wheel-segment seg-3">⚡ ปุ๋ย</div>
            <div class="wheel-segment seg-4">👑 มงกุฎ</div>
            <div class="wheel-segment seg-5">💰 200</div>
            <div class="wheel-center-pin">🎡</div>
          </div>

          <button id="btnSpinNow" class="btn btn-warning" style="margin-top:18px; font-size:1.1rem; padding:8px 24px;" onclick="WheelManager.spinWheel()">
            ✨ หมุนวงล้อเลย! ✨
          </button>
        </div>
      `,
      showConfirmButton: false,
      showCloseButton: true,
      background: '#FFFDF5',
      customClass: { popup: 'swal2-farm-popup' }
    });
  },

  /**
   * หมุนวงล้อ
   */
  spinWheel() {
    if (this.isSpinning) return;
    this.isSpinning = true;

    const wheel = document.getElementById('luckyWheelCircle');
    const btn = document.getElementById('btnSpinNow');
    if (btn) btn.disabled = true;

    // สุ่มเลือกของรางวัล 0-5
    const prizeIndex = Math.floor(Math.random() * this.prizes.length);
    const selectedPrize = this.prizes[prizeIndex];

    // คำนวณองศาในการหมุน (หมุน 5 รอบเต็ม = 1800 องศา + องศาของช่องรางวัล)
    const segmentAngle = 360 / this.prizes.length;
    const targetDegree = 1800 + (360 - (prizeIndex * segmentAngle) - (segmentAngle / 2));

    if (wheel) {
      wheel.style.transition = 'transform 4.5s cubic-bezier(0.15, 0.9, 0.2, 1)';
      wheel.style.transform = `rotate(${targetDegree}deg)`;
    }

    if (typeof AudioManager !== 'undefined') {
      const clickInterval = setInterval(() => {
        AudioManager.playClick();
      }, 200);
      setTimeout(() => clearInterval(clickInterval), 4000);
    }

    // หลังหมุนเสร็จ 4.5 วินาที
    setTimeout(() => {
      this.isSpinning = false;
      Swal.close();
      this.grantPrize(selectedPrize);
    }, 4800);
  },

  /**
   * มอบของรางวัล
   */
  grantPrize(prize) {
    if (!gameState) return;
    gameState.lastWheelSpinTime = Date.now();

    let bonusMultiplier = (typeof WeatherManager !== 'undefined' && WeatherManager.isDoubleBonus) ? 2 : 1;

    if (prize.type === 'coins') {
      const amount = prize.amount * bonusMultiplier;
      gameState.coins += amount;
      ToastSystem.show(`🎉 ยินดีด้วย! ได้รับ ${prize.emoji} ${amount} เหรียญทอง!`, 'success');
    } else if (prize.type === 'exp') {
      const amount = prize.amount * bonusMultiplier;
      gameState.exp += amount;
      ToastSystem.show(`🎉 ยินดีด้วย! ได้รับ ${prize.emoji} ${amount} EXP!`, 'success');
    } else if (prize.type === 'item') {
      if (!gameState.inventory) gameState.inventory = {};
      gameState.inventory[prize.itemKey] = (gameState.inventory[prize.itemKey] || 0) + prize.amount;
      ToastSystem.show(`🎉 ยินดีด้วย! ได้รับ ${prize.emoji} ${prize.label}!`, 'success');
    } else if (prize.type === 'outfit') {
      if (!gameState.ownedOutfits) gameState.ownedOutfits = [];
      if (!gameState.ownedOutfits.includes(prize.outfitKey)) {
        gameState.ownedOutfits.push(prize.outfitKey);
      }
      ToastSystem.show(`👑 สุดยอด! ปลดล็อก ${prize.label} ปรบมือ!`, 'success');
    }

    if (typeof AudioManager !== 'undefined') AudioManager.playDressSound();
    if (typeof renderHUD === 'function') renderHUD();
    if (typeof SaveSystem !== 'undefined') SaveSystem.save(gameState);
  }
};
