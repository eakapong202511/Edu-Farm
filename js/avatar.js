/* ===================================================
   EduFarm — Avatar & Wardrobe System (avatar.js)
   ระบบ Avatar 3D ตัวละครเจ้าของฟาร์มด้านซ้ายมือ & ตู้เสื้อผ้าแต่งตัว
   =================================================== */

// =============================================
// 👔 OUTFIT CATALOG — รายการชุดและเครื่องแต่งกาย
// =============================================
const OUTFITS = {
  hats: {
    straw_hat: { id: 'straw_hat', category: 'hats', name: 'หมวกฟางเกษตรกร', emoji: '👒', price: 0, unlockLevel: 1, desc: 'หมวกฟางคลาสสิกกันแดด' },
    cowboy_hat: { id: 'cowboy_hat', category: 'hats', name: 'หมวกคาวบอยหนัง', emoji: '🤠', price: 50, unlockLevel: 2, desc: 'หมวกคาวบอยสุดเท่ห์สไตล์ฟาร์มตะวันตก' },
    chef_hat: { id: 'chef_hat', category: 'hats', name: 'หมวกเชฟเบเกอรี่', emoji: '👨‍🍳', price: 100, unlockLevel: 3, desc: 'หมวกเชฟสีขาวสำหรับทำขนมปัง' },
    crown: { id: 'crown', category: 'hats', name: 'มงกุฎราชาฟาร์ม', emoji: '👑', price: 300, unlockLevel: 5, desc: 'มงกุฎทองคำสำหรับเกษตรกรระดับตำนาน' },
    wizard_hat: { id: 'wizard_hat', category: 'hats', name: 'หมวกพ่อมดเวทมนตร์', emoji: '🧙', price: 150, unlockLevel: 3, desc: 'หมวกทรงสูงรังสรรค์เวทมนตร์บำรุงพืช' },
    pirate_hat: { id: 'pirate_hat', category: 'hats', name: 'หมวกโจรสลัดนักสำรวจ', emoji: '🏴‍☠️', price: 180, unlockLevel: 3, desc: 'หมวกโจรสลัดพร้อมขนนกประดับ' },
    engineer_hat: { id: 'engineer_hat', category: 'hats', name: 'หมวกวิศวกรโรงงาน', emoji: '👷', price: 90, unlockLevel: 2, desc: 'หมวกนิรภัยสีเหลืองสำหรับคุมงานแปรรูป' },
    santa_hat: { id: 'santa_hat', category: 'hats', name: 'หมวกซานต้าคริสต์มาส', emoji: '🎅', price: 120, unlockLevel: 2, desc: 'หมวกสีแดงปอยขาวฉลองเทศกาล' },
    headband: { id: 'headband', category: 'hats', name: 'ที่คาดผมหูพับ', emoji: '🐰', price: 45, unlockLevel: 1, desc: 'ที่คาดผมลายน่ารักสดใส' },
    beanie: { id: 'beehive_hat', category: 'hats', name: 'หมวกไหมพรมอุ่น', emoji: '🧢', price: 35, unlockLevel: 1, desc: 'หมวกไหมพรมกันลมหนาว' },
    viking_hat: { id: 'viking_hat', category: 'hats', name: 'หมวกนักรบไวกลิ้ง', emoji: '🪖', price: 220, unlockLevel: 4, desc: 'หมวกมีเขาสุดแกร่ง' },
    cat_ears: { id: 'cat_ears', category: 'hats', name: 'ที่คาดหูแมวเหมียว', emoji: '🐱', price: 60, unlockLevel: 2, desc: 'หูแมวสีชมพูน่ารักทะลุจอ' },
    party_hat: { id: 'party_hat', category: 'hats', name: 'หมวกปาร์ตี้วันเกิด', emoji: '🎉', price: 40, unlockLevel: 1, desc: 'หมวกกรวยงานเลี้ยงสดใส' }
  },
  clothes: {
    farmer_overalls: { id: 'farmer_overalls', category: 'clothes', name: 'ชุดเอี๊ยมเกษตรกร', emoji: '👖', price: 0, unlockLevel: 1, desc: 'ชุดเอี๊ยมยีนส์ลุยงานฟาร์ม' },
    baker_uniform: { id: 'baker_uniform', category: 'clothes', name: 'ชุดเชฟนักทำขนม', emoji: '🥼', price: 60, unlockLevel: 2, desc: 'ชุดผ้ากันเปื้อนสำหรับทำอาหาร' },
    cowboy_suit: { id: 'cowboy_suit', category: 'clothes', name: 'ชุดคาวบอยยีนส์', emoji: '🧥', price: 120, unlockLevel: 3, desc: 'ชุดแจ็กเก็ตยีนส์คาวบอยสุดเท่' },
    royal_suit: { id: 'royal_suit', category: 'clothes', name: 'ชุดราชาฟาร์มหรู', emoji: '👘', price: 350, unlockLevel: 5, desc: 'ชุดคลุมสีม่วงประดับทองหรูหรา' },
    thai_traditional: { id: 'thai_traditional', category: 'clothes', name: 'ชุดไทยเดิมชาวนา', emoji: '🇹🇭', price: 160, unlockLevel: 3, desc: 'ชุดไทยพื้นบ้านงดงามเอกลักษณ์' },
    scientist_coat: { id: 'scientist_coat', category: 'clothes', name: 'ชุดนักวิทยาศาสตร์', emoji: '🧪', price: 140, unlockLevel: 3, desc: 'ชุดกาวน์ขาววิจัยสายพันธุ์พืช' },
    superhero_suit: { id: 'superhero_suit', category: 'clothes', name: 'ชุดซูเปอร์ฮีโร่', emoji: '🦸', price: 250, unlockLevel: 4, desc: 'ชุดพิทักษ์ความยุติธรรมในฟาร์ม' },
    astronaut_suit: { id: 'astronaut_suit', category: 'clothes', name: 'ชุดอวกาศนักสำรวจ', emoji: '👩‍🚀', price: 400, unlockLevel: 5, desc: 'ชุดนักบินอวกาศตะลุยฟาร์ม' },
    ninja_suit: { id: 'ninja_suit', category: 'clothes', name: 'ชุดนินจาดำเงา', emoji: '🥷', price: 200, unlockLevel: 4, desc: 'ชุดนินจาว่องไวปลูกผักรวดเร็ว' },
    winter_coat: { id: 'winter_coat', category: 'clothes', name: 'เสื้อโค้ตกันหนาว', emoji: '🧥', price: 80, unlockLevel: 2, desc: 'เสื้อกันหนาวอุ่นสบาย' },
    kimono: { id: 'kimono', category: 'clothes', name: 'ชุดกิโมโนญี่ปุ่น', emoji: '👘', price: 170, unlockLevel: 3, desc: 'ชุดกิโมโนลวดลายดอกไม้' }
  },
  accessories: {
    none: { id: 'none', category: 'accessories', name: 'ไม่ใส่เครื่องประดับ', emoji: '❌', price: 0, unlockLevel: 1, desc: '' },
    glasses: { id: 'glasses', category: 'accessories', name: 'แว่นตากันแดด', emoji: '🕶️', price: 40, unlockLevel: 1, desc: 'แว่นตากันแดดสีดำสุดเก๋' },
    bandana: { id: 'bandana', category: 'accessories', name: 'ผ้าพันคอสีแดง', emoji: '🧣', price: 30, unlockLevel: 1, desc: 'ผ้าพันคอแฟชั่นเกษตรกร' },
    basket: { id: 'basket', category: 'accessories', name: 'ตะกร้าหวายสาน', emoji: '🧺', price: 70, unlockLevel: 2, desc: 'ตะกร้าหวายสำหรับใส่ผลผลิต' },
    gold_shovel: { id: 'gold_shovel', category: 'accessories', name: 'พลั่วทองคำ', emoji: '⛏️', price: 200, unlockLevel: 4, desc: 'พลั่วขุดดินทำจากทองคำบริสุทธิ์' },
    magic_wand: { id: 'magic_wand', category: 'accessories', name: 'คทาเวทมนตร์ประกาย', emoji: '🪄', price: 180, unlockLevel: 3, desc: 'คทาเวทมนตร์เสกให้ผักโตไว' },
    angel_wings: { id: 'angel_wings', category: 'accessories', name: 'ปีกนางฟ้าสีขาว', emoji: '🧚', price: 300, unlockLevel: 5, desc: 'ปีกนางฟ้าลอยนวลสง่างาม' },
    knight_sword: { id: 'knight_sword', category: 'accessories', name: 'ดาบอัศวินทองคำ', emoji: '⚔️', price: 250, unlockLevel: 4, desc: 'ดาบผู้พิทักษ์ฟาร์ม' },
    backpack: { id: 'backpack', category: 'accessories', name: 'กระเป๋าเป้นักเดินทาง', emoji: '🎒', price: 50, unlockLevel: 1, desc: 'เป้ใส่สัมภาระและเมล็ดพืช' },
    guitar: { id: 'guitar', category: 'accessories', name: 'กีตาร์เสียงใส', emoji: '🎸', price: 120, unlockLevel: 2, desc: 'กีตาร์เล่นเพลงกล่อมพืชผล' },
    mask: { id: 'mask', category: 'accessories', name: 'หน้ากากราตรีแฟนซี', emoji: '🎭', price: 90, unlockLevel: 2, desc: 'หน้ากากลึกลับแฟนซี' }
  }
};

// =============================================
// 🧑‍🌾 AVATAR MANAGER — ระบบจัดการตัวละคร
// =============================================
const AvatarManager = {
  currentCategory: 'hats',

  /**
   * เริ่มต้นสวมใส่ชุดเริ่มต้นถ้ายืนยันแล้ว
   */
  initAvatarState() {
    if (!gameState) return;
    if (!gameState.equippedAvatar) {
      gameState.equippedAvatar = {
        hat: 'straw_hat',
        clothes: 'farmer_overalls',
        accessory: 'none'
      };
    }
    if (!gameState.ownedOutfits) {
      gameState.ownedOutfits = ['straw_hat', 'farmer_overalls', 'none'];
    }
  },

  /**
   * แสดงตัวละคร 3D ในแผงด้านซ้ายมือตลอดเวลา
   */
  renderLeftAvatarPanel() {
    if (!gameState) return;
    this.initAvatarState();
    const container = document.getElementById('leftAvatarPanel');
    if (!container) return;

    const hat = (OUTFITS.hats && OUTFITS.hats[gameState.equippedAvatar?.hat]) || OUTFITS.hats['straw_hat'];
    const clothes = (OUTFITS.clothes && OUTFITS.clothes[gameState.equippedAvatar?.clothes]) || OUTFITS.clothes['farmer_overalls'];
    const acc = (OUTFITS.accessories && OUTFITS.accessories[gameState.equippedAvatar?.accessory]) || OUTFITS.accessories['none'];

    container.innerHTML = `
      <div class="avatar-card-3d">
        <!-- ป้ายชื่อตัวละคร 3D มงกุฎทอง -->
        <div class="avatar-title-badge">
          <span>👑 ${gameState.playerName || 'เจ้าของฟาร์ม'}</span>
          <span class="avatar-level-tag">Lv.${gameState.level || 1}</span>
        </div>

        <!-- เวที 3D Avatar (Spotlight Aura & Golden Pedestal Base) -->
        <div class="avatar-stage-3d">
          <div class="avatar-spotlight"></div>
          <div class="avatar-body-3d">
            <div class="avatar-slot slot-hat" title="${hat.name}">${hat.emoji}</div>
            <div class="avatar-slot slot-head">😃</div>
            <div class="avatar-slot slot-clothes" title="${clothes.name}">${clothes.emoji}</div>
            ${acc.id !== 'none' ? `<div class="avatar-slot slot-acc" title="${acc.name}">${acc.emoji}</div>` : ''}
          </div>
          <!-- ฐานประกาย 3D โกลว์ดิ้ง -->
          <div class="avatar-pedestal">
            <div class="pedestal-top"></div>
            <div class="pedestal-glow"></div>
          </div>
        </div>

        <!-- รายละเอียดสวมใส่ชุด -->
        <div class="avatar-equipped-info">
          <div><small>👒 หมวก:</small> ${hat.name}</div>
          <div><small>👔 ชุด:</small> ${clothes.name}</div>
        </div>

        <!-- ปุ่มเปิดตู้เสื้อผ้า -->
        <button class="btn btn-sm btn-primary avatar-dress-btn" onclick="AvatarManager.openWardrobeModal()">
          👗 ร้านชุด & ตู้เสื้อผ้า 3D
        </button>
      </div>

      <!-- ตำแหน่ง 3: โซนโรงงานแปรรูป 3D ข้างล่าง Avatar -->
      <div class="avatar-factory-card-3d" id="avatarFactorySection">
        <div class="factory-header-badge">🏭 3. โรงงานแปรรูป 3D</div>
        <div class="factory-buildings-grid">
          <!-- เตาอบ 3D -->
          <div class="factory-building-3d bakery-building" onclick="FactoryManager.openBakeryModal()" title="เตาอบขนมปัง (คราฟต์ขนมปัง 🍞 / ป๊อปคอร์น 🍿)">
            <div class="chimney-smoke">💨</div>
            <div class="factory-icon-3d">🍞</div>
            <div class="factory-label-3d">เตาอบขนมปัง</div>
            <div class="factory-action-btn">🥖 คราฟต์</div>
          </div>
          <!-- โรงนม & ชีส 3D -->
          <div class="factory-building-3d creamery-building" onclick="FactoryManager.openCreameryModal()" title="โรงงานนม & ชีส (คราฟต์ชีส 🧀 / ซอส 🥫)">
            <div class="spinning-gear">⚙️</div>
            <div class="factory-icon-3d">🧀</div>
            <div class="factory-label-3d">โรงแปรรูปนม</div>
            <div class="factory-action-btn">🧀 คราฟต์</div>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * เปิด Modal ตู้เสื้อผ้า (Wardrobe / Outfit Shop)
   */
  openWardrobeModal() {
    if (typeof AudioManager !== 'undefined') AudioManager.playDressSound();
    this.renderWardrobeModal(this.currentCategory);
    ModalSystem.open('wardrobeModal');
  },

  /**
   * แสดงรายการตู้เสื้อผ้าตามหมวดหมู่
   */
  renderWardrobeModal(category = 'hats') {
    this.currentCategory = category;
    this.initAvatarState();
    const container = document.getElementById('wardrobeGrid');
    const tabContainer = document.getElementById('wardrobeTabContainer');
    if (!container) return;

    if (tabContainer) {
      tabContainer.innerHTML = `
        <div style="display: flex; gap: 8px; justify-content: center; margin-bottom: 14px; flex-wrap: wrap;">
          <button class="btn btn-sm ${category === 'hats' ? 'btn-warning' : 'btn-secondary'}" onclick="AvatarManager.renderWardrobeModal('hats')">
            👒 หมวก (Hats)
          </button>
          <button class="btn btn-sm ${category === 'clothes' ? 'btn-warning' : 'btn-secondary'}" onclick="AvatarManager.renderWardrobeModal('clothes')">
            👔 ชุดเสื้อผ้า (Outfits)
          </button>
          <button class="btn btn-sm ${category === 'accessories' ? 'btn-warning' : 'btn-secondary'}" onclick="AvatarManager.renderWardrobeModal('accessories')">
            🕶️ เครื่องประดับ (Acc)
          </button>
        </div>
      `;
    }

    container.innerHTML = '';
    const items = Object.values(OUTFITS[category] || {});

    items.forEach(item => {
      const isOwned = gameState.ownedOutfits.includes(item.id);
      const isEquipped = gameState.equippedAvatar[category === 'hats' ? 'hat' : category === 'clothes' ? 'clothes' : 'accessory'] === item.id;
      const isUnlocked = gameState.level >= item.unlockLevel;
      const canAfford = gameState.coins >= item.price;

      const card = document.createElement('div');
      card.style.cssText = `
        background: ${isEquipped ? '#E8F5E9' : 'white'};
        border: 2.5px solid ${isEquipped ? '#43A047' : isOwned ? '#42A5F5' : '#FFCC02'};
        border-radius: 14px;
        padding: 12px;
        text-align: center;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        position: relative;
      `;

      let actionBtn = '';
      if (isEquipped) {
        actionBtn = `<button class="btn btn-sm btn-primary" disabled style="width:100%; margin-top:8px;">✅ กำลังสวมใส่</button>`;
      } else if (isOwned) {
        actionBtn = `<button class="btn btn-sm btn-warning" style="width:100%; margin-top:8px;" onclick="AvatarManager.equipItem('${category}', '${item.id}')">👕 สวมใส่ชุดนี้</button>`;
      } else if (!isUnlocked) {
        actionBtn = `<button class="btn btn-sm btn-secondary" disabled style="width:100%; margin-top:8px;">🔒 ปลดล็อกที่ Lv.${item.unlockLevel}</button>`;
      } else {
        actionBtn = `<button class="btn btn-sm ${canAfford ? 'btn-primary' : 'btn-secondary'}" ${!canAfford ? 'disabled' : ''} style="width:100%; margin-top:8px;" onclick="AvatarManager.buyItem('${category}', '${item.id}')">🛒 ซื้อ (${item.price} 💰)</button>`;
      }

      card.innerHTML = `
        <div style="font-size: 2.8rem; filter: drop-shadow(0 3px 3px rgba(0,0,0,0.2));">${item.emoji}</div>
        <div style="font-weight: 800; color: #5D4037; font-size: 0.95rem; margin-top: 4px;">${item.name}</div>
        <div style="font-size: 0.75rem; color: #795548; margin-top: 2px;">${item.desc}</div>
        ${!isOwned ? `<div style="font-size: 0.85rem; color: #E65100; font-weight: bold; margin-top: 4px;">ราคา: ${item.price} 💰</div>` : '<div style="font-size:0.75rem; color:#2E7D32; font-weight:bold; margin-top:4px;">มีในตู้เสื้อผ้าแล้ว</div>'}
        ${actionBtn}
      `;

      container.appendChild(card);
    });
  },

  /**
   * สวมใส่ชุด
   */
  equipItem(category, itemId) {
    this.initAvatarState();
    const slotKey = category === 'hats' ? 'hat' : category === 'clothes' ? 'clothes' : 'accessory';
    gameState.equippedAvatar[slotKey] = itemId;

    ToastSystem.show(`✨ สวมใส่ ${OUTFITS[category][itemId].name} แล้ว!`, 'success');

    this.renderLeftAvatarPanel();
    this.renderWardrobeModal(category);
    SaveSystem.save(gameState);
  },

  /**
   * ซื้อชุดใหม่
   */
  buyItem(category, itemId) {
    const item = OUTFITS[category][itemId];
    if (!item) return;

    if (gameState.coins < item.price) {
      ToastSystem.show('💸 เหรียญไม่พอซื้อชุดนะจ๊ะ!', 'error');
      return;
    }

    gameState.coins -= item.price;
    gameState.ownedOutfits.push(itemId);

    ToastSystem.show(`🎉 ซื้อ ${item.name} ${item.emoji} เข้าตู้เสื้อผ้าเรียบร้อย! (-${item.price} 💰)`, 'success');

    this.equipItem(category, itemId);
    renderHUD();
  }
};
