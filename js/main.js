/* ===================================================
   EduFarm — Main JavaScript (main.js)
   ลอจิกหลัก: จัดการผู้เล่น, เซฟ/โหลดข้อมูล, นำทาง
   =================================================== */

// =============================================
// 🎮 GAME CONFIG — ค่าคงที่ของเกม
// =============================================
const GAME_CONFIG = {
  SAVE_KEY: 'edufarm_save',
  STARTING_COINS: 100,
  STARTING_EXP: 0,
  STARTING_LEVEL: 1,
  TOTAL_PLOTS: 9,
  EXP_PER_LEVEL: 100,   // EXP ที่ต้องการต่อเลเวล
  VERSION: '1.0.0'
};

// =============================================
// 🌱 CROP DATA — ข้อมูลพืชทั้ง 5 ชนิด
// =============================================
const CROPS = {
  rice: {
    id: 'rice',
    name: 'ข้าว',
    nameEn: 'Rice',
    emoji: '🌾',
    seedEmoji: '🌱',
    growingEmoji: '🌿',
    seedPrice: 5,
    sellPrice: 10,
    expReward: 5,
    waterNeeded: 3,
    unlockLevel: 1,
    description: 'พืชพื้นฐาน ปลูกง่าย โตเร็ว'
  },
  corn: {
    id: 'corn',
    name: 'ข้าวโพด',
    nameEn: 'Corn',
    emoji: '🌽',
    seedEmoji: '🌱',
    growingEmoji: '🌿',
    seedPrice: 8,
    sellPrice: 18,
    expReward: 8,
    waterNeeded: 4,
    unlockLevel: 1,
    description: 'ข้าวโพดหวาน ขายได้ราคาดี'
  },
  tomato: {
    id: 'tomato',
    name: 'มะเขือเทศ',
    nameEn: 'Tomato',
    emoji: '🍅',
    seedEmoji: '🌱',
    growingEmoji: '🌿',
    seedPrice: 10,
    sellPrice: 25,
    expReward: 12,
    waterNeeded: 5,
    unlockLevel: 2,
    description: 'มะเขือเทศสดแดง วิตามินสูง'
  },
  watermelon: {
    id: 'watermelon',
    name: 'แตงโม',
    nameEn: 'Watermelon',
    emoji: '🍉',
    seedEmoji: '🌱',
    growingEmoji: '🌿',
    seedPrice: 15,
    sellPrice: 35,
    expReward: 18,
    waterNeeded: 6,
    unlockLevel: 3,
    description: 'แตงโมหวานฉ่ำ ราคาสูง'
  },
  sunflower: {
    id: 'sunflower',
    name: 'ดอกทานตะวัน',
    nameEn: 'Sunflower',
    emoji: '🌻',
    seedEmoji: '🌱',
    growingEmoji: '🌿',
    seedPrice: 20,
    sellPrice: 50,
    expReward: 25,
    waterNeeded: 7,
    unlockLevel: 4,
    description: 'ดอกไม้แห่งพลังงาน กำไรสูง!'
  }
};

// =============================================
// 🐄 ANIMAL DATA — ข้อมูลสัตว์เลี้ยง
// =============================================
const ANIMALS = {
  chicken: {
    id: 'chicken',
    name: 'ไก่',
    nameEn: 'Chicken',
    emoji: '🐔',
    produceEmoji: '🥚',
    produceName: 'ไข่ไก่',
    produceKey: 'egg',
    feedNeeded: 2,
    feedPrice: 4,
    sellPrice: 15,
    expReward: 8,
    unlockLevel: 1,
    sound: 'กุ๊กๆ! 🐔'
  },
  cow: {
    id: 'cow',
    name: 'วัว',
    nameEn: 'Cow',
    emoji: '🐄',
    produceEmoji: '🥛',
    produceName: 'นมวัว',
    produceKey: 'milk',
    feedNeeded: 3,
    feedPrice: 8,
    sellPrice: 30,
    expReward: 15,
    unlockLevel: 2,
    sound: 'มอออ! 🐄'
  },
  sheep: {
    id: 'sheep',
    name: 'แกะ',
    nameEn: 'Sheep',
    emoji: '🐑',
    produceEmoji: '🧶',
    produceName: 'ขนแกะ',
    produceKey: 'wool',
    feedNeeded: 4,
    feedPrice: 12,
    sellPrice: 45,
    expReward: 20,
    unlockLevel: 3,
    sound: 'แบ๊ะะ! 🐑'
  }
};

// =============================================
// 🏭 PROCESSED GOODS — ข้อมูลสินค้าแปรรูป
// =============================================
const PROCESSED_GOODS = {
  bread: {
    id: 'bread',
    name: 'ขนมปัง',
    nameEn: 'Bread',
    emoji: '🍞',
    recipe: { rice: 2, egg: 1 },
    recipeDesc: 'ข้าว 2 + ไข่ไก่ 1',
    sellPrice: 40,
    expReward: 20,
    building: 'bakery',
    buildingName: 'เตาอบขนมปัง',
    unlockLevel: 1,
    description: 'ขนมปังหอมนุ่ม ทำจากข้าวและไข่ไก่'
  },
  popcorn: {
    id: 'popcorn',
    name: 'ป๊อบคอร์น',
    nameEn: 'Popcorn',
    emoji: '🍿',
    recipe: { corn: 3 },
    recipeDesc: 'ข้าวโพด 3',
    sellPrice: 35,
    expReward: 18,
    building: 'bakery',
    buildingName: 'เตาอบขนมปัง',
    unlockLevel: 1,
    description: 'ป๊อบคอร์นกรอบอร่อย ทำจากข้าวโพด'
  },
  cheese: {
    id: 'cheese',
    name: 'ชีส',
    nameEn: 'Cheese',
    emoji: '🧀',
    recipe: { milk: 2 },
    recipeDesc: 'นมวัว 2',
    sellPrice: 70,
    expReward: 35,
    building: 'creamery',
    buildingName: 'โรงแปรรูปนม',
    unlockLevel: 2,
    description: 'ชีสหอมมัน แปรรูปจากนมวัวสด'
  },
  tomato_sauce: {
    id: 'tomato_sauce',
    name: 'ซอสมะเขือเทศ',
    nameEn: 'Tomato Sauce',
    emoji: '🥫',
    recipe: { tomato: 3 },
    recipeDesc: 'มะเขือเทศ 3',
    sellPrice: 60,
    expReward: 30,
    building: 'creamery',
    buildingName: 'โรงแปรรูปนม',
    unlockLevel: 2,
    description: 'ซอสมะเขือเทศเข้มข้น แปรรูปจากมะเขือเทศ'
  }
};

// =============================================
// 💾 SAVE SYSTEM — ระบบเซฟ/โหลดข้อมูล
// =============================================
const SaveSystem = {
  /**
   * สร้างข้อมูลเกมใหม่
   */
  createNewGame(playerName, grade) {
    const plots = [];
    for (let i = 0; i < GAME_CONFIG.TOTAL_PLOTS; i++) {
      plots.push({
        id: i,
        state: 'empty',     // empty, planted, growing, ready
        crop: null,          // crop id (rice, corn, ...)
        waterCount: 0        // จำนวนครั้งที่รดน้ำแล้ว
      });
    }

    return {
      version: GAME_CONFIG.VERSION,
      playerName: playerName,
      grade: parseInt(grade),
      level: GAME_CONFIG.STARTING_LEVEL,
      exp: GAME_CONFIG.STARTING_EXP,
      coins: GAME_CONFIG.STARTING_COINS,
      plots: plots,
      inventory: {
        rice: 0, corn: 0, tomato: 0, watermelon: 0, sunflower: 0,
        egg: 0, milk: 0, wool: 0,
        bread: 0, popcorn: 0, cheese: 0, tomato_sauce: 0
      },
      animals: [
        { id: 0, type: 'chicken', name: 'ไก่จ๊อก', fedCount: 0, ready: false },
        { id: 1, type: 'chicken', name: 'ไก่กุ๊ก', fedCount: 0, ready: false },
        { id: 2, type: 'cow', name: 'แม่วัวมู', fedCount: 0, ready: false }
      ],
      factories: {
        bakery: { unlocked: true, level: 1 },
        creamery: { unlocked: false, level: 1 }
      },
      equippedAvatar: {
        hat: 'straw_hat',
        clothes: 'farmer_overalls',
        accessory: 'none'
      },
      ownedOutfits: ['straw_hat', 'farmer_overalls', 'none'],
      totalHarvested: 0,
      totalEarned: 0,
      createdAt: new Date().toISOString(),
      lastPlayed: new Date().toISOString()
    };
  },

  /**
   * บันทึกข้อมูลเกมลง localStorage
   */
  save(gameData) {
    try {
      gameData.lastPlayed = new Date().toISOString();
      const json = JSON.stringify(gameData);
      localStorage.setItem(GAME_CONFIG.SAVE_KEY, json);
      return true;
    } catch (e) {
      console.error('❌ บันทึกข้อมูลล้มเหลว:', e);
      return false;
    }
  },

  /**
   * โหลดข้อมูลเกมจาก localStorage
   */
  load() {
    try {
      const json = localStorage.getItem(GAME_CONFIG.SAVE_KEY);
      if (!json) return null;
      const data = JSON.parse(json);

      // เติมฟิลด์เริ่มต้นสำหรับเซฟเดิมที่ยังไม่มี Phase 3 / Avatar data
      if (!data.inventory) {
        data.inventory = {
          rice: 0, corn: 0, tomato: 0, watermelon: 0, sunflower: 0,
          egg: 0, milk: 0, wool: 0,
          bread: 0, popcorn: 0, cheese: 0, tomato_sauce: 0
        };
      }
      if (!data.animals) {
        data.animals = [
          { id: 0, type: 'chicken', name: 'ไก่จ๊อก', fedCount: 0, ready: false },
          { id: 1, type: 'chicken', name: 'ไก่กุ๊ก', fedCount: 0, ready: false },
          { id: 2, type: 'cow', name: 'แม่วัวมู', fedCount: 0, ready: false }
        ];
      }
      if (!data.factories) {
        data.factories = {
          bakery: { unlocked: true, level: 1 },
          creamery: { unlocked: false, level: 1 }
        };
      }
      if (!data.equippedAvatar) {
        data.equippedAvatar = {
          hat: 'straw_hat',
          clothes: 'farmer_overalls',
          accessory: 'none'
        };
      }
      if (!data.ownedOutfits) {
        data.ownedOutfits = ['straw_hat', 'farmer_overalls', 'none'];
      }

      return data;
    } catch (e) {
      console.error('❌ โหลดข้อมูลล้มเหลว:', e);
      return null;
    }
  },

  /**
   * ตรวจสอบว่ามีเซฟไฟล์หรือไม่
   */
  hasSave() {
    return localStorage.getItem(GAME_CONFIG.SAVE_KEY) !== null;
  },

  /**
   * ลบข้อมูลเกม
   */
  deleteSave() {
    localStorage.removeItem(GAME_CONFIG.SAVE_KEY);
  }
};

// =============================================
// 🧮 LEVEL SYSTEM — ระบบเลเวล
// =============================================
const LevelSystem = {
  /**
   * คำนวณเลเวลจาก EXP
   */
  calculateLevel(exp) {
    return Math.floor(exp / GAME_CONFIG.EXP_PER_LEVEL) + 1;
  },

  /**
   * คำนวณ EXP ที่เหลือในเลเวลปัจจุบัน
   */
  currentLevelExp(exp) {
    return exp % GAME_CONFIG.EXP_PER_LEVEL;
  },

  /**
   * ตรวจสอบว่าเลเวลอัพหรือไม่
   */
  checkLevelUp(oldExp, newExp) {
    const oldLevel = this.calculateLevel(oldExp);
    const newLevel = this.calculateLevel(newExp);
    return newLevel > oldLevel;
  }
};

// =============================================
// 🔔 TOAST SYSTEM — ระบบแจ้งเตือน SweetAlert2 สไตล์ฟาร์มน่ารัก
// =============================================
const ToastSystem = {
  /**
   * แสดง Toast notification ด้วย SweetAlert2
   */
  show(message, type = 'success') {
    if (typeof Swal !== 'undefined') {
      const swalTypes = {
        success: 'success',
        error: 'error',
        warning: 'warning',
        info: 'info'
      };

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: swalTypes[type] || 'info',
        title: message,
        showConfirmButton: false,
        timer: 2200,
        timerProgressBar: true,
        background: '#FFF8E1',
        color: '#5D4037',
        customClass: {
          popup: 'swal2-farm-toast'
        }
      });
    } else {
      const container = document.getElementById('toastContainer');
      if (!container) return;
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.textContent = message;
      container.appendChild(toast);
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 3000);
    }
  },

  /**
   * แสดง Dialog ยืนยันคำถามแบบน่ารักด้วย SweetAlert2
   */
  confirm(title, text, onConfirm) {
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        title: title,
        text: text,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#43A047',
        cancelButtonColor: '#D32F2F',
        confirmButtonText: '✅ ใช่แล้ว',
        cancelButtonText: '❌ ยกเลิก',
        background: '#FFF8E1',
        color: '#5D4037',
        customClass: {
          popup: 'swal2-farm-popup'
        }
      }).then((result) => {
        if (result.isConfirmed && onConfirm) {
          onConfirm();
        }
      });
    } else {
      if (window.confirm(`${title}\n${text}`)) {
        if (onConfirm) onConfirm();
      }
    }
  }
};

// =============================================
// 🪟 MODAL SYSTEM — ระบบ Modal
// =============================================
const ModalSystem = {
  /**
   * เปิด Modal
   */
  open(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
    }
  },

  /**
   * ปิด Modal
   */
  close(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
    }
  },

  /**
   * ปิดเมื่อคลิกพื้นหลัง
   */
  setupBackdropClose(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.close(modalId);
        }
      });
    }
  }
};

// =============================================
// 🏠 LANDING PAGE LOGIC — ลอจิกหน้าแรก
// =============================================
function initLandingPage() {
  const loginForm = document.getElementById('loginForm');
  const continueSection = document.getElementById('continueSection');
  const btnContinue = document.getElementById('btnContinue');
  
  // ตรวจว่ามีเซฟไฟล์ไหม → แสดงปุ่มเล่นต่อ
  if (SaveSystem.hasSave()) {
    const saveData = SaveSystem.load();
    if (saveData && continueSection) {
      continueSection.classList.remove('hidden');
      const continueInfo = document.getElementById('continueInfo');
      if (continueInfo) {
        continueInfo.textContent = `🧒 ${saveData.playerName} | ป.${saveData.grade} | Lv.${saveData.level} | 💰 ${saveData.coins}`;
      }
    }
  }

  // ฟอร์มสร้างเกมใหม่
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('playerName');
      const gradeSelect = document.getElementById('playerGrade');
      const nameError = document.getElementById('nameError');
      const gradeError = document.getElementById('gradeError');

      let isValid = true;

      // ตรวจชื่อ
      const playerName = nameInput.value.trim();
      if (!playerName) {
        nameError.classList.add('show');
        nameInput.focus();
        isValid = false;
      } else {
        nameError.classList.remove('show');
      }

      // ตรวจระดับชั้น
      const grade = gradeSelect.value;
      if (!grade) {
        gradeError.classList.add('show');
        if (isValid) gradeSelect.focus();
        isValid = false;
      } else {
        gradeError.classList.remove('show');
      }

      if (!isValid) return;

      // สร้างข้อมูลเกมใหม่
      const newGame = SaveSystem.createNewGame(playerName, grade);
      SaveSystem.save(newGame);

      // ไปหน้าเกม
      window.location.href = 'game.html';
    });
  }

  // ปุ่มเล่นต่อ
  if (btnContinue) {
    btnContinue.addEventListener('click', () => {
      window.location.href = 'game.html';
    });
  }

  // ลบ error เมื่อพิมพ์
  const nameInput = document.getElementById('playerName');
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      document.getElementById('nameError').classList.remove('show');
    });
  }

  const gradeSelect = document.getElementById('playerGrade');
  if (gradeSelect) {
    gradeSelect.addEventListener('change', () => {
      document.getElementById('gradeError').classList.remove('show');
    });
  }
}

// =============================================
// 🚀 INITIALIZATION — เริ่มต้นเมื่อหน้าโหลด
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  // ตรวจว่าอยู่หน้าไหน
  const isLandingPage = document.getElementById('loginForm');
  
  if (isLandingPage) {
    initLandingPage();
  }
  // หน้า game.html จะถูก init โดย farm.js
});

/**
 * สลับโหมดหน้าจอเต็มจอ (Fullscreen Mode)
 */
function toggleFullscreen() {
  const btn = document.getElementById('btnFullscreen');
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => {
      if (btn) btn.innerHTML = '❌ ออกจากเต็มจอ';
      ToastSystem.show('🖥️ เข้าสู่โหมดเต็มจอเรียบร้อย!', 'info');
    }).catch(err => {
      ToastSystem.show('⚠️ เบราว์เซอร์ไม่อนุญาตให้เปิดเต็มจอ', 'warning');
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().then(() => {
        if (btn) btn.innerHTML = '🖥️ เล่นเต็มจอ';
        ToastSystem.show('📱 ออกจากโหมดเต็มจอแล้ว', 'info');
      });
    }
  }
}
