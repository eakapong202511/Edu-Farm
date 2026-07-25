/* ===================================================
   EduFarm — Decoration System JavaScript (decoration.js)
   ระบบตกแต่งฟาร์มสไตล์ Hay Day: รั้ว, ดอกไม้, บ่อน้ำ, กังหันลม, รถไถ
   =================================================== */

// =============================================
// 🎨 DECORATION CATALOG (15+ Items) — รายการของแต่งฟาร์ม
// =============================================
const DECORATIONS = {
  // 🌺 หมวด 1: พืช & สวน
  tulip: { id: 'tulip', category: 'nature', name: 'แปลงดอกทิวลิป', emoji: '🌷', price: 15, unlockLevel: 1, desc: 'ดอกทิวลิปสีชมพูเพิ่มความสดชื่นให้ฟาร์ม' },
  sunflower_bed: { id: 'sunflower_bed', category: 'nature', name: 'แปลงทานตะวัน', emoji: '🌻', price: 25, unlockLevel: 1, desc: 'ดอกทานตะวันสีเหลืองบานสะพรั่ง' },
  tree: { id: 'tree', category: 'nature', name: 'ต้นไม้มงคล', emoji: '🌳', price: 40, unlockLevel: 1, desc: 'ต้นไม้ใหญ่ร่มรื่นให้ร่มเงา' },
  maple: { id: 'maple', category: 'nature', name: 'ต้นเมเปิ้ลสีส้ม', emoji: '🍁', price: 60, unlockLevel: 2, desc: 'ต้นเมเปิ้ลเปลี่ยนสีสไตล์ฤดูใบไม้ร่วง' },
  rose_arch: { id: 'rose_arch', category: 'nature', name: 'ซุ้มประตูกุหลาบ', emoji: '🌹', price: 75, unlockLevel: 3, desc: 'ซุ้มดอกกุหลาบสวยงามต้อนรับผู้มาเยี่ยมชม' },
  sakura: { id: 'sakura', category: 'nature', name: 'ต้นซากุระชมพู', emoji: '🌸', price: 90, unlockLevel: 2, desc: 'ต้นซากุระบานสะพรั่งให้กลีบดอกไม้โปรยปราย' },
  cactus_garden: { id: 'cactus_garden', category: 'nature', name: 'สวนกระบองเพชร', emoji: '🌵', price: 35, unlockLevel: 1, desc: 'สวนกระบองเพชรน่ารักดูแลง่าย' },
  orange_grove: { id: 'orange_grove', category: 'nature', name: 'สวนส้มหวาน', emoji: '🍊', price: 110, unlockLevel: 3, desc: 'ต้นส้มดกผลสีส้มสดใส' },
  lotus_pond: { id: 'lotus_pond', category: 'nature', name: 'สระบัวหลวง', emoji: '🪷', price: 130, unlockLevel: 3, desc: 'สระบัวสีชมพูสงบอบอุ่นใจ' },
  mushroom_cluster: { id: 'mushroom_cluster', category: 'nature', name: 'กอเห็ดป่าแฟนตาซี', emoji: '🍄', price: 45, unlockLevel: 2, desc: 'กลุ่มเห็ดป่าสีสันสดใสน่ารัก' },

  // 🪵 หมวด 2: รั้ว & สิ่งก่อสร้าง
  fence: { id: 'fence', category: 'structures', name: 'รั้วไม้คลาสสิก', emoji: '🪵', price: 20, unlockLevel: 1, desc: 'รั้วไม้ธรรมชาติกั้นขอบเขตฟาร์ม' },
  white_picket_fence: { id: 'white_picket_fence', category: 'structures', name: 'รั้วสีขาววินเทจ', emoji: '🤍', price: 35, unlockLevel: 1, desc: 'รั้วไม้สีขาวสไตล์ตะวันตก' },
  cobblestone: { id: 'cobblestone', category: 'structures', name: 'ทางเดินหินโบราณ', emoji: '🪨', price: 30, unlockLevel: 1, desc: 'ทางเดินหินประดับรอบแปลงปลูก' },
  brick_path: { id: 'brick_path', category: 'structures', name: 'ทางเดินอิฐส้ม', emoji: '🧱', price: 45, unlockLevel: 2, desc: 'ทางเดินอิฐแดงคลาสสิกงดงาม' },
  wooden_bridge: { id: 'wooden_bridge', category: 'structures', name: 'สะพานไม้ลำธาร', emoji: '🌉', price: 140, unlockLevel: 3, desc: 'สะพานไม้ข้ามลำธารสไตล์วินเทจ' },
  gazebo: { id: 'gazebo', category: 'structures', name: 'ศาลาพักผ่อน', emoji: '🏠', price: 120, unlockLevel: 2, desc: 'ศาลาไม้สำหรับนั่งพักผ่อนชมฟาร์ม' },
  windmill: { id: 'windmill', category: 'structures', name: 'กังหันลมไม้ยักษ์', emoji: '🌾', price: 150, unlockLevel: 2, desc: 'กังหันลมฟาร์มผลิตพลังงานธรรมชาติ' },
  fountain: { id: 'fountain', category: 'structures', name: 'บ่อน้ำพุโรมัน', emoji: '⛲', price: 180, unlockLevel: 3, desc: 'บ่อน้ำพุสีขาวประดับใจกลางฟาร์ม' },
  zen_garden: { id: 'zen_garden', category: 'structures', name: 'สวนหินญี่ปุ่น', emoji: '⛩️', price: 160, unlockLevel: 4, desc: 'สวนสไตล์เซนเงียบสงบ' },
  castle_turret: { id: 'castle_turret', category: 'structures', name: 'หอคอยปราสาทฟาร์ม', emoji: '🏰', price: 300, unlockLevel: 5, desc: 'หอคอยจำลองตระการตาต้อนรับนักท่องเที่ยว' },

  // 🚜 หมวด 3: ของแต่งพิเศษ
  hay_bale: { id: 'hay_bale', category: 'special', name: 'กองฟางทองคำ', emoji: '🌾', price: 35, unlockLevel: 1, desc: 'กองฟางอัดก้อนตกแต่งสไตล์ฟาร์มแท้' },
  scarecrow: { id: 'scarecrow', category: 'special', name: 'หุ่นไล่กาคลาสสิก', emoji: '🎃', price: 50, unlockLevel: 1, desc: 'หุ่นไล่กาน่ารักคอยดูแลพืชผล' },
  beehive: { id: 'beehive', category: 'special', name: 'รังผึ้งธรรมชาติ', emoji: '🐝', price: 80, unlockLevel: 2, desc: 'กล่องเลี้ยงผึ้งผลิตน้ำผึ้งหวานหอม' },
  duck_pond: { id: 'duck_pond', category: 'special', name: 'บ่อน้ำเป็ดน้อย', emoji: '🦆', price: 100, unlockLevel: 2, desc: 'สระน้ำเล็กๆ มีเป็ดว่ายน้ำเล่นน่ารัก' },
  koi_pond: { id: 'koi_pond', category: 'special', name: 'บ่อปลาคาร์ฟนำโชค', emoji: '🐟', price: 200, unlockLevel: 4, desc: 'บ่อปลาคาร์ฟว่ายวนเสริมโชคลาภ' },
  tractor: { id: 'tractor', category: 'special', name: 'รถไถแทรกเตอร์สีแดง', emoji: '🚜', price: 250, unlockLevel: 3, desc: 'รถไถคลาสสิกช่วยทำเกษตรกรรม' },
  golden_tractor: { id: 'golden_tractor', category: 'special', name: 'รถไถทองคำเศรษฐี', emoji: '🏎️', price: 500, unlockLevel: 5, desc: 'รถไถทองคำส่องประกายระยิบระยับ' },
  lantern: { id: 'lantern', category: 'special', name: 'โคมไฟฟาร์ม', emoji: '🏮', price: 50, unlockLevel: 1, desc: 'โคมไฟสร้างความสว่างไสวยามค่ำคืน' },
  phone_booth: { id: 'phone_booth', category: 'special', name: 'ตู้โทรศัพท์อังกฤษ', emoji: '📞', price: 170, unlockLevel: 3, desc: 'ตู้โทรศัพท์สีแดงทรงคลาสสิก' },
  ferris_wheel: { id: 'ferris_wheel', category: 'special', name: 'ชิงช้าสวรรค์จิ๋ว', emoji: '🎡', price: 350, unlockLevel: 4, desc: 'ชิงช้าสวรรค์สวนสนุกเพิ่มความสดใส' },
  mailbox: { id: 'mailbox', category: 'special', name: 'ตู้รับจดหมายฟาร์ม', emoji: '📮', price: 40, unlockLevel: 1, desc: 'ตู้ไปรษณีย์น่ารักสำหรับรับจดหมาย' },
  bench: { id: 'bench', category: 'special', name: 'ม้านั่งไม้สวน', emoji: '🪑', price: 45, unlockLevel: 1, desc: 'ม้านั่งไม้พักผ่อนใต้ร่มไม้' },
  golden_rooster: { id: 'golden_rooster', category: 'special', name: 'รูปปั้นไก่ทองคำ', emoji: '🐓', price: 450, unlockLevel: 5, desc: 'รูปปั้นไก่ผู้พิทักษ์ฟาร์มทองคำ' }
};

// =============================================
// 🎨 DECORATION MANAGER — ระบบจัดการของแต่งฟาร์ม
// =============================================
const DecorationManager = {
  currentCategory: 'nature',

  /**
   * เปิด Modal ตกแต่งฟาร์ม
   */
  openDecorationModal() {
    if (typeof AudioManager !== 'undefined') AudioManager.playShopBellSound();
    this.renderDecorationModal(this.currentCategory);
    ModalSystem.open('decoModal');
  },

  /**
   * แสดงรายการของแต่งตามหมวดหมู่
   */
  renderDecorationModal(category = 'nature') {
    this.currentCategory = category;
    const container = document.getElementById('decoGrid');
    const tabContainer = document.getElementById('decoTabContainer');
    if (!container) return;

    // แท็บเลือกหมวดหมู่
    if (tabContainer) {
      tabContainer.innerHTML = `
        <div style="display: flex; gap: 8px; justify-content: center; margin-bottom: 14px; flex-wrap: wrap;">
          <button class="btn btn-sm ${category === 'nature' ? 'btn-warning' : 'btn-secondary'}" onclick="DecorationManager.renderDecorationModal('nature')">
            🌺 พืช & สวน
          </button>
          <button class="btn btn-sm ${category === 'structures' ? 'btn-warning' : 'btn-secondary'}" onclick="DecorationManager.renderDecorationModal('structures')">
            🪵 รั้ว & สิ่งก่อสร้าง
          </button>
          <button class="btn btn-sm ${category === 'special' ? 'btn-warning' : 'btn-secondary'}" onclick="DecorationManager.renderDecorationModal('special')">
            🚜 ของแต่งพิเศษ
          </button>
        </div>
      `;
    }

    container.innerHTML = '';

    const filtered = Object.values(DECORATIONS).filter(d => d.category === category);

    filtered.forEach(deco => {
      const isUnlocked = gameState.level >= deco.unlockLevel;
      const canAfford = gameState.coins >= deco.price;

      const card = document.createElement('div');
      card.style.cssText = 'background: white; border: 2.5px solid #FFCC02; border-radius: 14px; padding: 12px; text-align: center; box-shadow: 0 4px 8px rgba(0,0,0,0.1);';

      card.innerHTML = `
        <div style="font-size: 2.8rem; filter: drop-shadow(0 3px 3px rgba(0,0,0,0.2));">${deco.emoji}</div>
        <div style="font-weight: 800; color: #5D4037; font-size: 1rem; margin-top: 4px;">${deco.name}</div>
        <p style="font-size: 0.75rem; color: #795548; margin-top: 2px; height: 32px;">${deco.desc}</p>
        <div style="font-size: 0.85rem; color: #E65100; font-weight: bold; margin-top: 4px;">ราคา: ${deco.price} 💰</div>
        ${!isUnlocked ? `<div style="font-size: 0.75rem; color: #C62828; font-weight: bold; margin-top: 4px;">🔒 ต้องการ Lv.${deco.unlockLevel}</div>` : ''}
        <button class="btn btn-sm ${isUnlocked && canAfford ? 'btn-primary' : 'btn-secondary'}" 
                style="margin-top: 8px; width: 100%;"
                ${!isUnlocked || !canAfford ? 'disabled' : ''}
                onclick="DecorationManager.buyDecoration('${deco.id}')">
          🛒 ซื้อของแต่ง
        </button>
      `;

      container.appendChild(card);
    });
  },

  /**
   * ซื้อของแต่ง
   */
  buyDecoration(id) {
    const deco = DECORATIONS[id];
    if (!deco) return;

    if (gameState.coins < deco.price) {
      ToastSystem.show('💸 เหรียญไม่พอซื้อของแต่งนะจ๊ะ!', 'error');
      return;
    }

    gameState.coins -= deco.price;
    if (!gameState.decorations) gameState.decorations = [];
    gameState.decorations.push(deco.emoji);

    ToastSystem.show(`🎨 ซื้อ ${deco.name} ${deco.emoji} มาประดับฟาร์มสำเร็จ! (-${deco.price} 💰)`, 'success');

    renderHUD();
    this.renderFarmDecorations();
    SaveSystem.save(gameState);
  },

  /**
   * แสดงของแต่งรอบฟาร์มสไตล์ Hay Day 2.5D
   */
  renderFarmDecorations() {
    const bar = document.getElementById('farmDecoBar');
    if (!bar) return;

    const decos = gameState.decorations || ['🌷', '🪵', '🌻', '🌾', '🌳', '🦆'];
    bar.innerHTML = `
      <div style="display: flex; justify-content: space-around; align-items: center; background: rgba(255,255,255,0.25); border-radius: 20px; padding: 6px 16px; border: 2px solid rgba(255,255,255,0.4); box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
        ${decos.slice(-8).map(e => `<span style="font-size: 1.8rem; filter: drop-shadow(0 3px 3px rgba(0,0,0,0.3)); transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.3)'" onmouseout="this.style.transform='scale(1)'">${e}</span>`).join('')}
      </div>
    `;
  }
};
