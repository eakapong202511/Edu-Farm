/* ===================================================
   EduFarm — Natural Fishing Pond & 10s Flash Math Quiz (fishing.js)
   บ่อตกปลาธรรมชาติ 🎣 & มินิเกมคำถามคณิตคิดเร็ว 10 วินาที
   =================================================== */

const FishingManager = {
  isFishing: false,
  currentFish: null,

  fishSpecies: [
    { id: 'barb', name: 'ปลาตะเพียนขาว 🐟', price: 30, exp: 20, emoji: '🐟', desc: 'ปลาน้ำจืดไทย เกล็ดเงินแวววาว ชอบอยู่น้ำนิ่ง' },
    { id: 'catfish', name: 'ปลาดุกอุย 🐟', price: 40, exp: 25, emoji: '🐟', desc: 'มีหนวดยาว 4 คู่ ลำตัวลื่น อาศัยตามโคลนตม' },
    { id: 'ruby_tilapia', name: 'ปลาทับทิม 🐠', price: 50, exp: 35, emoji: '🐠', desc: 'เกล็ดสีชมพูส้มสดใส เนื้อนุ่มหวานอร่อย' },
    { id: 'giant_catfish', name: 'ปลาชะโด 🐊', price: 80, exp: 60, emoji: '🐊', desc: 'ปลาล่าเหยื่อขนาดใหญ่ ดุร้ายแต่ขายได้ราคาสูงมาก' }
  ],

  flashMathQuestions: [
    { q: "6 x 4 = ?", a: ["24", "20", "28", "22"], correct: 0 },
    { q: "15 - 7 = ?", a: ["8", "6", "9", "7"], correct: 0 },
    { q: "8 + 9 = ?", a: ["17", "16", "18", "15"], correct: 0 },
    { q: "36 / 6 = ?", a: ["6", "4", "7", "8"], correct: 0 },
    { q: "7 x 5 = ?", a: ["35", "30", "40", "25"], correct: 0 },
    { q: "50 - 15 = ?", a: ["35", "40", "30", "25"], correct: 0 },
    { q: "9 x 3 = ?", a: ["27", "24", "30", "21"], correct: 0 }
  ],

  init() {},

  openFishingModal() {
    if (typeof AudioManager !== 'undefined') AudioManager.playClick();
    this.renderFishingModal();
    if (typeof ModalSystem !== 'undefined') ModalSystem.open('fishingModal');
  },

  renderFishingModal() {
    const container = document.getElementById('fishingPondBody');
    if (!container) return;

    container.innerHTML = `
      <div style="text-align: center; padding: 12px;">
        <div style="font-size: 4rem; margin-bottom: 8px; animation: bounce 1.5s infinite;">🎣🌊</div>
        <h3 style="color: #006064; font-weight: 900; margin-bottom: 6px;">บ่อตกปลาธรรมชาติสายน้ำไหล</h3>
        <p style="color: #5D4037; font-size: 0.95rem; line-height: 1.4; max-width: 380px; margin: 0 auto 14px;">
          เหวี่ยงเบ็ดตกปลาน้ำจืดสดๆ เมื่อปลาตอดเบ็ด ตอบคำถามคณิตคิดเร็วใน 10 วินาที เพื่อดึงปลาขึ้นมาสำเร็จ!
        </p>

        <button class="btn btn-warning" style="font-size: 1.1rem; font-weight: 900; padding: 12px 28px; background: linear-gradient(135deg, #0288D1, #01579B); color: white; border: 2.5px solid #81D4FA; box-shadow: 0 4px 12px rgba(0,0,0,0.25);" onclick="FishingManager.startCasting()">
          🎣 เหวี่ยงเบ็ดตกปลาเลย!
        </button>

        <div style="margin-top: 20px; border-top: 2px dashed #B2EBF2; padding-top: 14px;">
          <h4 style="color: #00838F; font-weight: 900; margin-bottom: 8px;">🐟 สมุดบันทึกสายพันธุ์ปลาที่ตกได้</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; text-align: left;">
            ${this.fishSpecies.map(f => `
              <div style="background: white; border: 1.5px solid #81D4FA; border-radius: 10px; padding: 8px; display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 1.8rem;">${f.emoji}</span>
                <div>
                  <div style="font-weight: 900; font-size: 0.85rem; color: #006064;">${f.name}</div>
                  <div style="font-size: 0.72rem; color: #E65100; font-weight: bold;">💰 ${f.price} | ⭐ ${f.exp}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  startCasting() {
    if (this.isFishing) return;
    this.isFishing = true;

    // สุ่มสายพันธุ์ปลา
    this.currentFish = this.fishSpecies[Math.floor(Math.random() * this.fishSpecies.length)];

    Swal.fire({
      title: '🎣 กำลังเหวี่ยงเบ็ด...',
      html: `
        <div style="text-align:center; padding:16px;">
          <div style="font-size:4rem; animation: pulse 0.8s infinite;">🌊🎣</div>
          <p style="color:#006064; font-weight:900; font-size:1.1rem; margin-top:10px;">กรุณารอสักครู่... ปลากำลังจะตอดเบ็ด!</p>
        </div>
      `,
      showConfirmButton: false,
      allowOutsideClick: false,
      background: '#E0F7FA'
    });

    // ปลากินเบ็ดหลังจาก 2.5 วินาที
    setTimeout(() => {
      this.triggerFishBiteQuiz();
    }, 2500);
  },

  triggerFishBiteQuiz() {
    const fish = this.currentFish;
    const quiz = this.flashMathQuestions[Math.floor(Math.random() * this.flashMathQuestions.length)];

    let timeLeft = 10;
    let timerInterval = null;

    Swal.fire({
      title: '⚡ ปลากินเบ็ดแล้ว! ตอบไว 10 วินาที! 🐟',
      html: `
        <div style="text-align:center; padding:6px;">
          <div style="font-size:1.1rem; color:#D84315; font-weight:900; background:#FFE0B2; padding:4px 12px; border-radius:12px; display:inline-block; margin-bottom:10px;">
            ⏱️ เหลือเวลา: <span id="fishQuizTimer">10</span> วินาที
          </div>
          <h2 style="color:#006064; font-weight:900; margin:10px 0;">${quiz.q}</h2>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:12px;">
            ${quiz.a.map((ans, idx) => `
              <button class="btn btn-primary" style="font-size:1.1rem; font-weight:900; padding:10px; background:linear-gradient(135deg,#0288D1,#01579B); border:2px solid #FFF;" onclick="FishingManager.answerFishQuiz(${idx}, ${quiz.correct})">
                ${ans}
              </button>
            `).join('')}
          </div>
        </div>
      `,
      showConfirmButton: false,
      allowOutsideClick: false,
      background: '#FFFDF5',
      didOpen: () => {
        timerInterval = setInterval(() => {
          timeLeft--;
          const timerEl = document.getElementById('fishQuizTimer');
          if (timerEl) timerEl.innerText = timeLeft;

          if (timeLeft <= 0) {
            clearInterval(timerInterval);
            Swal.close();
            this.isFishing = false;
            ToastSystem.show('🐟 หลุดไปแล้ว! ตอบไม่ทันใน 10 วินาที', 'warning');
          }
        }, 1000);
      },
      willClose: () => {
        if (timerInterval) {
          clearInterval(timerInterval);
        }
      }
    });
  },

  answerFishQuiz(choiceIdx, correctIdx) {
    Swal.close();
    this.isFishing = false;

    const fish = this.currentFish;
    if (choiceIdx === correctIdx) {
      // ตกปลาสำเร็จ!
      gameState.coins += fish.price;
      gameState.exp += fish.exp;
      if (!gameState.inventory) gameState.inventory = {};
      gameState.inventory[fish.id] = (gameState.inventory[fish.id] || 0) + 1;

      if (typeof renderHUD === 'function') renderHUD();
      if (typeof SaveSystem !== 'undefined') SaveSystem.save(gameState);
      if (typeof AudioManager !== 'undefined') AudioManager.playHarvest();

      Swal.fire({
        title: `🎉 ตกได้ ${fish.name}! 🎣`,
        html: `
          <div style="text-align:center; padding:10px;">
            <div style="font-size:4rem;">${fish.emoji}</div>
            <h3 style="color:#006064; margin-top:8px;">${fish.name}</h3>
            <p style="color:#5D4037; font-size:0.85rem;">${fish.desc}</p>
            <div style="font-size:1.1rem; color:#E65100; font-weight:bold; margin-top:8px; background:#E0F7FA; padding:8px; border-radius:12px;">
              💰 ได้รับ +${fish.price} เหรียญทอง | ⭐ ได้รับ +${fish.exp} EXP
            </div>
          </div>
        `,
        confirmButtonText: 'เก็บใส่คลัง! 🐟',
        confirmButtonColor: '#0288D1',
        background: '#FFFDF5'
      });
    } else {
      ToastSystem.show('❌ ดึงเบ็ดพลาด! ปลาว่ายหนีไปแล้ว', 'error');
    }
  }
};

window.FishingManager = FishingManager;

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => FishingManager.init(), 1400);
});
