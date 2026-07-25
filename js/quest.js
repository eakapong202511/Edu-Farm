/* ===================================================
   EduFarm — Quest System JavaScript (quest.js)
   ระบบภารกิจการเรียนรู้ & รางวัลประจำวัน
   =================================================== */

// =============================================
// 📋 QUEST MANAGER — ระบบภารกิจ
// =============================================
const QuestManager = {

  // รายการภารกิจมาตรฐาน
  defaultQuests: [
    {
      id: 'q1',
      title: '🌾 เกษตรกรฝึกหัด',
      desc: 'ปลูกพืชชนิดใดก็ได้ 3 ครั้ง',
      type: 'plant',
      target: 3,
      rewardCoins: 30,
      rewardExp: 20
    },
    {
      id: 'q2',
      title: '🐔 ฟาร์มสัตว์สุขสันต์',
      desc: 'ให้อาหารสัตว์เลี้ยง 2 ครั้ง',
      type: 'feed',
      target: 2,
      rewardCoins: 40,
      rewardExp: 25
    },
    {
      id: 'q3',
      title: '🧠 ยอดนักคิดตอบคำถาม',
      desc: 'ตอบคำถามวิชาการถูกต้อง 3 ข้อ',
      type: 'quiz',
      target: 3,
      rewardCoins: 50,
      rewardExp: 30
    },
    {
      id: 'q4',
      title: '🍞 เชฟนักแปรรูป',
      desc: 'ผลิตสินค้าแปรรูป 1 ชิ้น',
      type: 'craft',
      target: 1,
      rewardCoins: 60,
      rewardExp: 35
    }
  ],

  /**
   * ดึงข้อมูลภารกิจปัจจุบันของผู้เล่น
   */
  getPlayerQuests() {
    if (!gameState.quests || gameState.quests.length === 0) {
      gameState.quests = this.defaultQuests.map(q => ({
        ...q,
        current: 0,
        completed: false,
        claimed: false
      }));
    }
    return gameState.quests;
  },

  /**
   * เพิ่มความก้าวหน้าในภารกิจตามประเภท
   */
  trackProgress(type, amount = 1) {
    const quests = this.getPlayerQuests();
    let updated = false;

    quests.forEach(q => {
      if (q.type === type && !q.completed) {
        q.current = Math.min(q.target, q.current + amount);
        if (q.current >= q.target) {
          q.completed = true;
          ToastSystem.show(`📋 ภารกิจ "${q.title}" สำเร็จแล้ว! มารับรางวัลได้เลย! 🎉`, 'success');
        }
        updated = true;
      }
    });

    if (updated) {
      SaveSystem.save(gameState);
    }
  },

  /**
   * เปิด Modal ภารกิจ
   */
  openQuestModal() {
    if (typeof AudioManager !== 'undefined') AudioManager.playQuestSound();
    this.renderQuestModal();
    ModalSystem.open('questModal');
  },

  /**
   * แสดงรายการภารกิจ
   */
  renderQuestModal() {
    const container = document.getElementById('questList');
    if (!container) return;

    container.innerHTML = '';
    const quests = this.getPlayerQuests();

    quests.forEach((q, index) => {
      const card = document.createElement('div');
      const isDone = q.completed;
      const isClaimed = q.claimed;

      card.style.cssText = `
        background: ${isClaimed ? '#E0E0E0' : isDone ? '#E8F5E9' : '#FFF8E1'};
        border: 3px solid ${isClaimed ? '#BDBDBD' : isDone ? '#43A047' : '#FFB300'};
        border-radius: 14px;
        padding: 14px;
        margin-bottom: 12px;
      `;

      const progressPercent = Math.min(100, (q.current / q.target) * 100);

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <strong style="font-size: 1.05rem; color: #5D4037;">${q.title}</strong>
            <p style="font-size: 0.85rem; color: #795548; margin-top: 2px;">${q.desc}</p>
          </div>
          <div>
            <span class="badge badge-coins">+${q.rewardCoins} 💰</span>
            <span class="badge badge-exp">+${q.rewardExp} ⭐</span>
          </div>
        </div>

        <div style="margin-top: 10px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: bold; color: #5D4037; margin-bottom: 4px;">
            <span>ความคืบหน้า:</span>
            <span>${q.current} / ${q.target}</span>
          </div>
          <div class="plot-progress" style="position: relative; height: 10px; bottom: 0; left: 0; right: 0;">
            <div class="plot-progress-fill" style="width: ${progressPercent}%; background: ${isDone ? '#43A047' : '#FFB300'};"></div>
          </div>
        </div>

        <button class="btn btn-sm ${isClaimed ? 'btn-secondary' : isDone ? 'btn-primary' : 'btn-secondary'}"
                style="width: 100%; margin-top: 10px;"
                ${!isDone || isClaimed ? 'disabled' : ''}
                onclick="QuestManager.claimReward(${index})">
          ${isClaimed ? '✅ รับรางวัลแล้ว' : isDone ? '🎁 รับรางวัลภารกิจ!' : '⏳ ยังไม่เสร็จ'}
        </button>
      `;

      container.appendChild(card);
    });
  },

  /**
   * รับรางวัลภารกิจ
   */
  claimReward(index) {
    const quests = this.getPlayerQuests();
    const q = quests[index];
    if (!q || !q.completed || q.claimed) return;

    q.claimed = true;
    gameState.coins += q.rewardCoins;
    gameState.exp += q.rewardExp;

    const newLevel = LevelSystem.calculateLevel(gameState.exp);
    if (newLevel > gameState.level) {
      gameState.level = newLevel;
      ToastSystem.show(`🎊 เลเวลอัพ! Lv.${gameState.level}!`, 'success');
    }

    ToastSystem.show(`🎁 รับรางวัลภารกิจ "${q.title}" สำเร็จ! (+${q.rewardCoins} 💰 +${q.rewardExp} ⭐)`, 'success');

    renderHUD();
    this.renderQuestModal();
    SaveSystem.save(gameState);
  }
};
