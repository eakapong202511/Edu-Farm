/* ===================================================
   EduFarm — Hall of Fame & Badges System (achievements.js)
   ตู้สะสมถ้วยรางวัลเกียรติยศ 🏆 & เหรียญยศฟาร์มส่องแสงระยิบระยับ
   =================================================== */

const AchievementManager = {
  achievements: [
    {
      id: 'crop_king',
      title: 'ราชาแห่งการปลูกผัก 🌾',
      desc: 'เก็บเกี่ยวพืชผักในฟาร์มรวมกันครบ 15 ครั้ง',
      icon: '🌾🏆',
      rewardCoins: 100,
      rewardExp: 80,
      check: (gs) => (gs.totalHarvested || 0) >= 15
    },
    {
      id: 'math_wizard',
      title: 'อัจฉริยะคิดเร็ว 🧠',
      desc: 'สะสมเหรียญทองจากการทำฟาร์มครบ 500 💰',
      icon: '🧠🏆',
      rewardCoins: 150,
      rewardExp: 100,
      check: (gs) => (gs.coins || 0) >= 500
    },
    {
      id: 'steamboat_captain',
      title: 'กัปตันเรือไอน้ำ ⛵',
      desc: 'สะสมเหรียญยศส่งออกเรือสินค้าครบ 1 เหรียญ 🏅',
      icon: '⛵🏆',
      rewardCoins: 200,
      rewardExp: 150,
      check: (gs) => (gs.medals || 0) >= 1
    },
    {
      id: 'honey_master',
      title: 'ปรมาจารย์น้ำผึ้ง 🐝',
      desc: 'เก็บน้ำผึ้งขวดทองจากรังผึ้งครบ 1 ขวด 🍯',
      icon: '🐝🏆',
      rewardCoins: 120,
      rewardExp: 90,
      check: (gs) => (gs.inventory && gs.inventory.honey >= 1)
    },
    {
      id: 'master_angler',
      title: 'ยอดนักตกปลา 🎣',
      desc: 'ตกปลาน้ำจืดจากบ่อตกปลาสำเร็จอย่างน้อย 1 ตัว',
      icon: '🎣🏆',
      rewardCoins: 100,
      rewardExp: 75,
      check: (gs) => gs.inventory && (gs.inventory.barb || gs.inventory.catfish || gs.inventory.ruby_tilapia || gs.inventory.giant_catfish)
    },
    {
      id: 'pet_owner',
      title: 'เจ้าของหมาน้อยผู้ช่วย 🐶',
      desc: 'เป็นเจ้าของหมาน้อยผู้ช่วยฟาร์ม (400 💰)',
      icon: '🐶🏆',
      rewardCoins: 250,
      rewardExp: 200,
      check: (gs) => gs.hasHelperPet === true
    }
  ],

  init() {
    this.initAchievementState();
    this.renderAvatarTrophies();
  },

  initAchievementState() {
    if (!gameState) return;
    if (!gameState.unlockedAchievements) {
      gameState.unlockedAchievements = [];
      if (typeof SaveSystem !== 'undefined') SaveSystem.save(gameState);
    }
  },

  openAchievementsModal() {
    if (typeof AudioManager !== 'undefined') AudioManager.playClick();
    this.initAchievementState();
    this.renderAchievementsModal();
    if (typeof ModalSystem !== 'undefined') ModalSystem.open('achievementsModal');
  },

  renderAchievementsModal() {
    const container = document.getElementById('achievementsGrid');
    if (!container || !gameState) return;

    container.innerHTML = '';
    const unlockedList = gameState.unlockedAchievements || [];

    this.achievements.forEach(ach => {
      const isUnlocked = unlockedList.includes(ach.id);
      const isEligible = Boolean(ach.check(gameState));

      const card = document.createElement('div');
      card.style.cssText = `background: ${isUnlocked ? 'linear-gradient(135deg, #FFFDF5, #FFF8E1)' : isEligible ? 'linear-gradient(135deg, #E8F5E9, #C8E6C9)' : '#F5F5F5'}; border: 2.5px solid ${isUnlocked ? '#FFD54F' : isEligible ? '#4CAF50' : '#BDBDBD'}; border-radius: 16px; padding: 12px; text-align: center; position: relative; box-shadow: ${isEligible ? '0 4px 12px rgba(76,175,80,0.3)' : 'none'};`;

      card.innerHTML = `
        <div style="font-size: 2.5rem; filter: ${isUnlocked || isEligible ? 'drop-shadow(0 4px 8px rgba(255,193,7,0.5))' : 'grayscale(100%) opacity(0.5)'}">${ach.icon}</div>
        <div style="font-weight: 900; color: ${isUnlocked ? '#E65100' : isEligible ? '#2E7D32' : '#757575'}; font-size: 1rem; margin-top: 4px;">${ach.title}</div>
        <div style="font-size: 0.78rem; color: #5D4037; margin-top: 4px;">${ach.desc}</div>
        <div style="font-size: 0.82rem; color: #D84315; font-weight: 800; margin-top: 6px;">
          รางวัล: +${ach.rewardCoins} 💰 | +${ach.rewardExp} ⭐
        </div>
        ${isUnlocked ? `
          <div style="margin-top: 8px; font-weight: 900; color: #2E7D32; background: #E8F5E9; padding: 5px; border-radius: 10px; border: 1px solid #A5D6A7;">
            🏆 ปลดล็อกแล้ว!
          </div>
        ` : isEligible ? `
          <button class="btn btn-sm btn-warning" 
                  style="margin-top: 8px; width: 100%; font-weight: 900; background: linear-gradient(135deg, #4CAF50, #2E7D32); color: white;"
                  onclick="AchievementManager.claimAchievement('${ach.id}')">
            🏆 กดรับถ้วยรางวัล!
          </button>
        ` : `
          <div style="margin-top: 8px; font-size: 0.75rem; color: #757575; font-weight: bold; background: #E0E0E0; padding: 5px; border-radius: 10px;">
            🔒 กำลังสะสมภารกิจ...
          </div>
        `}
      `;

      container.appendChild(card);
    });
  },

  claimAchievement(achId) {
    if (!gameState) return;
    const ach = this.achievements.find(a => a.id === achId);
    if (!ach) return;

    if (!ach.check(gameState)) {
      ToastSystem.show('⚠️ ยังสะสมภารกิจถ้วยรางวัลนี้ไม่ครบ!', 'warning');
      return;
    }

    if (!gameState.unlockedAchievements) gameState.unlockedAchievements = [];
    if (gameState.unlockedAchievements.includes(achId)) return;

    gameState.unlockedAchievements.push(achId);
    gameState.coins += ach.rewardCoins;
    gameState.exp += ach.rewardExp;

    if (typeof renderHUD === 'function') renderHUD();
    if (typeof SaveSystem !== 'undefined') SaveSystem.save(gameState);
    if (typeof AudioManager !== 'undefined') AudioManager.playHarvest();

    this.renderAchievementsModal();
    this.renderAvatarTrophies();

    Swal.fire({
      title: `🎉 ปลดล็อก ${ach.title}! 🏆`,
      html: `
        <div style="text-align:center; padding:10px;">
          <div style="font-size:4rem; animation: bounce 1s infinite;">🏆✨</div>
          <h3 style="color:#E65100; margin-top:8px;">${ach.title}</h3>
          <div style="font-size:1.1rem; color:#2E7D32; font-weight:bold; margin-top:8px; background:#FFF8E1; padding:8px; border-radius:12px; border:1px solid #FFE082;">
            💰 +${ach.rewardCoins} เหรียญทอง | ⭐ +${ach.rewardExp} EXP
          </div>
        </div>
      `,
      confirmButtonText: 'รับถ้วยรางวัล! 🏆',
      confirmButtonColor: '#FFB300',
      background: '#FFFDF5'
    });
  },

  /**
   * แสดงถ้วยรางวัลเรืองแสงข้าง Avatar ด้านซ้ายมือ
   */
  renderAvatarTrophies() {
    const avatarPanel = document.getElementById('leftAvatarPanel');
    if (!avatarPanel || !gameState) return;

    let trophyBar = document.getElementById('avatarTrophyBar');
    if (!trophyBar) {
      trophyBar = document.createElement('div');
      trophyBar.id = 'avatarTrophyBar';
      trophyBar.className = 'avatar-trophy-bar';
      avatarPanel.appendChild(trophyBar);
    }

    const unlockedList = gameState.unlockedAchievements || [];
    const count = unlockedList.length;

    trophyBar.innerHTML = `
      <div class="trophy-badge-display" onclick="AchievementManager.openAchievementsModal()" title="คลิกเพื่อเปิดตู้สะสมถ้วยรางวัลเกียรติยศ">
        <span>🏆</span>
        <span class="trophy-count">${count} ถ้วยรางวัล</span>
      </div>
    `;
  }
};

window.AchievementManager = AchievementManager;

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => AchievementManager.init(), 1400);
});
