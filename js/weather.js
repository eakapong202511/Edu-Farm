/* ===================================================
   EduFarm — Weather System (weather.js)
   ระบบสภาพอากาศสุ่ม (แดดจัด ☀️, ฝนตก 🌧️, รุ้งกินน้ำ 🌈)
   =================================================== */

const WeatherManager = {
  currentWeather: 'sunny', // 'sunny' | 'rainy' | 'rainbow'
  weatherTimer: null,
  rainbowBonusTimer: null,
  isDoubleBonus: false,

  // คำถามวิชาวิทยาศาสตร์เกี่ยวกับสภาพอากาศและวัฏจักรน้ำ (ป.1-6)
  weatherQuizzes: [
    {
      question: "🌧️ ฝนตก เกิดจากปรากฏการณ์ใดตามวัฏจักรน้ำ?",
      options: ["ไอน้ำควบแน่นเป็นหยดน้ำในเมฆแล้วตกลงมา", "น้ำทะเลเดือดเป็นฟองขึ้นไปบนฟ้า", "ดวงอาทิตย์ละลายก้อนเมฆ"],
      answer: 0,
      explain: "ถูกต้อง! เมื่อไอน้ำในอากาศลอยสูงขึ้นเจอความเย็นจะควบแน่นเป็นหยดน้ำรวมตัวกันเป็นเมฆ แล้วตกลงมาเป็นฝนจ้า!"
    },
    {
      question: "🌈 ปรากฏการณ์ 'รุ้งกินน้ำ' มักเกิดขึ้นช่วงเวลาใด?",
      options: ["ขณะฝนตกและมีแสงแดดส่องกระทบหยดน้ำ", "ตอนกลางคืนที่มีดวงจันทร์เต็มดวง", "ตอนที่หิมะตกหนัก"],
      answer: 0,
      explain: "ถูกต้อง! รุ้งกินน้ำเกิดจากละอองน้ำในอากาศหักเหและสะท้อนแสงอาทิตย์เกิดเป็น 7 สีงามตา!"
    },
    {
      question: "☀️ ดวงอาทิตย์ มีบทบาทอย่างไรในวัฏจักรน้ำ?",
      options: ["ให้ความร้อนทำให้น้ำระเหยกลายเป็นไอน้ำ", "ทำให้ฝนตกหนักขึ้น", "ทำให้เมฆกลายเป็นสีดำ"],
      answer: 0,
      explain: "ถูกต้อง! ความร้อนจากดวงอาทิตย์ทำให้น้ำจากแม่น้ำลำคลองระเหยกลายเป็นไอน้ำลอยขึ้นสู่ชั้นบรรยากาศ!"
    },
    {
      question: "🌈 รุ้งกินน้ำ ประกอบด้วยทั้งหมดกี่สี?",
      options: ["7 สี (ม่วง คราม น้ำเงิน เขียว เหลือง แสด แดง)", "5 สี", "10 สี"],
      answer: 0,
      explain: "ถูกต้อง! รุ้งกินน้ำมีสเปกตรัมแสง 7 สี คือ ม่วง คราม น้ำเงิน เขียว เหลือง แสด แดง!"
    }
  ],

  /**
   * เริ่มต้นระบบสุ่มสภาพอากาศ
   */
  init() {
    this.createWeatherOverlay();
    this.scheduleNextWeatherChange();
  },

  /**
   * สุ่มเปลี่ยนสภาพอากาศถัดไป (ทุก 45 - 75 วินาที)
   */
  scheduleNextWeatherChange() {
    if (this.weatherTimer) clearTimeout(this.weatherTimer);
    const delay = Math.floor(Math.random() * 30000) + 45000;

    this.weatherTimer = setTimeout(() => {
      this.randomizeWeather();
      this.scheduleNextWeatherChange();
    }, delay);
  },

  /**
   * สุ่มสภาพอากาศใหม่
   */
  randomizeWeather() {
    const weights = ['sunny', 'sunny', 'rainy', 'rainy', 'rainbow'];
    const nextWeather = weights[Math.floor(Math.random() * weights.length)];
    this.setWeather(nextWeather);
  },

  /**
   * ตั้งค่าสภาพอากาศ
   */
  setWeather(type) {
    this.currentWeather = type;
    const badge = document.getElementById('hudWeatherBadge');
    const rainOverlay = document.getElementById('rainOverlay');
    const rainbowOverlay = document.getElementById('rainbowOverlay');

    if (type === 'rainy') {
      this.isDoubleBonus = false;
      if (badge) {
        badge.innerHTML = '🌧️ ฝนตกพรำๆ (รดน้ำอัตโนมัติ!)';
        badge.className = 'hud-stat hud-weather weather-rainy';
      }
      if (rainOverlay) rainOverlay.classList.remove('hidden');
      if (rainbowOverlay) rainbowOverlay.classList.add('hidden');

      // รดน้ำแปลงผักทุกแปลงให้อัตโนมัติ!
      this.autoWaterAllCrops();

      if (typeof AudioManager !== 'undefined') AudioManager.playWater();
      ToastSystem.show('🌧️ ฝนตกโปรยปราย! พืชผลได้รับการรดน้ำทุกแปลงสดชื่น 💦', 'info');

      // ถามคำถามวิทยาศาสตร์วัฏจักรน้ำ
      this.triggerWeatherQuiz();

    } else if (type === 'rainbow') {
      this.isDoubleBonus = true;
      if (badge) {
        badge.innerHTML = '🌈 รุ้งกินน้ำ (โบนัส 2 เท่า 1 นาที!)';
        badge.className = 'hud-stat hud-weather weather-rainbow';
      }
      if (rainOverlay) rainOverlay.classList.add('hidden');
      if (rainbowOverlay) rainbowOverlay.classList.remove('hidden');

      if (typeof AudioManager !== 'undefined') AudioManager.playDressSound();
      ToastSystem.show('🌈 ปรากฏการณ์รุ้งกินน้ำ! ได้รับโบนัส เหรียญทอง & EXP x2 เป็นเวลา 1 นาที ✨', 'success');

      // ตั้งเวลาหมดโบนัสรุ้งกินน้ำ 1 นาที
      if (this.rainbowBonusTimer) clearTimeout(this.rainbowBonusTimer);
      this.rainbowBonusTimer = setTimeout(() => {
        this.setWeather('sunny');
      }, 60000);

      this.triggerWeatherQuiz();

    } else { // sunny
      this.isDoubleBonus = false;
      if (badge) {
        badge.innerHTML = '☀️ แดดใสสดชื่น';
        badge.className = 'hud-stat hud-weather weather-sunny';
      }
      if (rainOverlay) rainOverlay.classList.add('hidden');
      if (rainbowOverlay) rainbowOverlay.classList.add('hidden');
    }
  },

  /**
   * ฝนตก: รดน้ำแปลงผักทุกแปลงที่ปลูกไว้ให้อัตโนมัติ
   */
  autoWaterAllCrops() {
    if (!gameState || !gameState.plots) return;
    let wateredAny = false;
    gameState.plots.forEach(plot => {
      if (plot.cropKey && !plot.watered) {
        plot.watered = true;
        wateredAny = true;
      }
    });
    if (wateredAny) {
      if (typeof CropManager !== 'undefined') CropManager.renderGrid();
      if (typeof SaveSystem !== 'undefined') SaveSystem.save(gameState);
    }
  },

  /**
   * สุ่มแสดงควิซวิทยาศาสตร์วัฏจักรน้ำเมื่อสภาพอากาศเปลี่ยน
   */
  triggerWeatherQuiz() {
    const q = this.weatherQuizzes[Math.floor(Math.random() * this.weatherQuizzes.length)];
    if (!q || typeof Swal === 'undefined') return;

    setTimeout(() => {
      Swal.fire({
        title: '🧪 เกร็ดความรู้วิทยาศาสตร์!',
        text: q.question,
        input: 'radio',
        inputOptions: q.options.reduce((acc, opt, idx) => ({ ...acc, [idx]: opt }), {}),
        inputValidator: (value) => {
          if (!value) return 'กรุณาเลือกคำตอบจ้า!';
        },
        confirmButtonText: 'ตอบคำถาม 💡',
        confirmButtonColor: '#4CAF50',
        background: '#FFFDF5',
        customClass: { popup: 'swal2-farm-popup' }
      }).then((result) => {
        if (result.isConfirmed) {
          const isCorrect = parseInt(result.value) === q.answer;
          if (isCorrect) {
            let coinReward = 30;
            let expReward = 20;
            if (this.isDoubleBonus) { coinReward *= 2; expReward *= 2; }

            gameState.coins += coinReward;
            gameState.exp += expReward;
            ToastSystem.show(`✨ ตอบถูก! ${q.explain} (+${coinReward} 💰 +${expReward} ⭐)`, 'success');
          } else {
            ToastSystem.show(`💡 ${q.explain}`, 'info');
          }
          if (typeof renderHUD === 'function') renderHUD();
          if (typeof SaveSystem !== 'undefined') SaveSystem.save(gameState);
        }
      });
    }, 1500);
  },

  /**
   * สร้าง เอฟเฟกต์สายฝนโปรยปราย & สายรุ้งโค้ง Overlay บนหน้าจอ
   */
  createWeatherOverlay() {
    if (document.getElementById('rainOverlay')) return;

    // Overlay ฝนตก
    const rainDiv = document.createElement('div');
    rainDiv.id = 'rainOverlay';
    rainDiv.className = 'rain-overlay hidden';
    let dropsHtml = '';
    for (let i = 0; i < 35; i++) {
      const left = Math.floor(Math.random() * 100);
      const delay = (Math.random() * 1.5).toFixed(2);
      const duration = (0.6 + Math.random() * 0.6).toFixed(2);
      dropsHtml += `<div class="rain-drop" style="left:${left}%; animation-delay:${delay}s; animation-duration:${duration}s;"></div>`;
    }
    rainDiv.innerHTML = dropsHtml;
    document.body.appendChild(rainDiv);

    // Overlay สายรุ้ง
    const rainbowDiv = document.createElement('div');
    rainbowDiv.id = 'rainbowOverlay';
    rainbowDiv.className = 'rainbow-overlay hidden';
    rainbowDiv.innerHTML = '<div class="rainbow-arc"></div>';
    document.body.appendChild(rainbowDiv);
  }
};

// เริ่มต้นสภาพอากาศเมื่อโหลดหน้าจอ
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => WeatherManager.init(), 1000);
});
