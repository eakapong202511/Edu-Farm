/* ===================================================
   EduFarm — Farm JavaScript (farm.js)
   ลอจิกฟาร์ม: ปลูกพืช, รดน้ำ, เก็บเกี่ยว, UI ฟาร์ม
   =================================================== */

// =============================================
// 🎮 GAME STATE — สถานะเกมปัจจุบัน
// =============================================
let gameState = null;        // ข้อมูลเกมจาก localStorage
let selectedTool = 'plant';  // เครื่องมือที่เลือกอยู่
let selectedPlotId = null;   // แปลงที่กำลังเลือก

// =============================================
// 🚀 INIT FARM — เริ่มต้นหน้าฟาร์ม
// =============================================
async function initFarm() {
  // โหลดข้อมูลเกม
  gameState = SaveSystem.load();

  // ถ้าไม่มีเซฟ → กลับหน้าแรก
  if (!gameState) {
    window.location.href = 'index.html';
    return;
  }

  // 1. สร้าง UI ทั้งหมดทันทีแบบ Synchronous (ไม่ต้องรอ Async)
  renderHUD();
  renderFarmGrid();

  if (typeof AvatarManager !== 'undefined') {
    AvatarManager.renderLeftAvatarPanel();
  }

  if (typeof DecorationManager !== 'undefined') {
    DecorationManager.renderFarmDecorations();
  }

  setupToolbar();
  setupModals();

  // 2. โหลดระบบคำถามแบบ Async
  await initQuiz();

  // แสดงข้อความต้อนรับ
  setTimeout(() => {
    ToastSystem.show(`🌾 ยินดีต้อนรับ ${gameState.playerName}!`, 'success');
  }, 300);
}

// =============================================
// 📊 HUD — อัปเดตแถบข้อมูลด้านบน
// =============================================
function renderHUD() {
  const hudName = document.getElementById('hudName');
  const coinsValue = document.getElementById('coinsValue');
  const expValue = document.getElementById('expValue');
  const levelValue = document.getElementById('levelValue');

  if (hudName) hudName.textContent = gameState.playerName;
  if (coinsValue) coinsValue.textContent = gameState.coins;
  if (expValue) expValue.textContent = gameState.exp;
  if (levelValue) levelValue.textContent = gameState.level;
}

/**
 * อัปเดตค่าเดียวใน HUD พร้อม animation
 */
function animateHUDValue(elementId, newValue) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = newValue;
  el.parentElement.classList.add('anim-bounce');
  setTimeout(() => {
    el.parentElement.classList.remove('anim-bounce');
  }, 600);
}

// =============================================
// 🌾 FARM GRID — สร้างและแสดงตาราง 3x3
// =============================================
function renderFarmGrid() {
  const grid = document.getElementById('farmGrid');
  if (!grid) return;

  grid.innerHTML = '';

  gameState.plots.forEach((plot, index) => {
    const plotEl = createPlotElement(plot, index);
    grid.appendChild(plotEl);
  });
}

/**
 * สร้าง Element สำหรับแปลงปลูกแต่ละช่อง
 */
function createPlotElement(plot, index) {
  const div = document.createElement('div');
  div.className = `plot plot-${plot.state}`;
  div.dataset.plotId = index;

  // ใส่เนื้อหาตามสถานะ
  switch (plot.state) {
    case 'empty':
      // แปลงว่าง — ไม่ต้องใส่อะไร (CSS ::after จัดการ)
      break;

    case 'planted': {
      const crop = CROPS[plot.crop];
      if (crop) {
        div.innerHTML = `
          <span class="plot-emoji">${crop.seedEmoji}</span>
          <span class="plot-label">${crop.name}</span>
          ${createProgressBar(plot, crop)}
        `;
      }
      break;
    }

    case 'growing': {
      const crop = CROPS[plot.crop];
      if (crop) {
        div.innerHTML = `
          <span class="plot-emoji">${crop.growingEmoji}</span>
          <span class="plot-label">${crop.name}</span>
          ${createProgressBar(plot, crop)}
        `;
      }
      break;
    }

    case 'ready': {
      const crop = CROPS[plot.crop];
      if (crop) {
        div.innerHTML = `
          <span class="plot-emoji">${crop.emoji}</span>
          <span class="plot-label">${crop.name}</span>
        `;
      }
      break;
    }
  }

  // Event: คลิกแปลง
  div.addEventListener('click', () => handlePlotClick(index));

  return div;
}

/**
 * สร้าง Progress Bar สำหรับรดน้ำ
 */
function createProgressBar(plot, crop) {
  const percent = (plot.waterCount / crop.waterNeeded) * 100;
  return `
    <div class="plot-progress">
      <div class="plot-progress-fill" style="width: ${percent}%"></div>
    </div>
  `;
}

// =============================================
// 🖱️ PLOT CLICK — จัดการเมื่อคลิกแปลง (ระบบอัจฉริยะ Auto-Action)
// =============================================
function handlePlotClick(plotId) {
  const plot = gameState.plots[plotId];
  if (!plot) return;

  // ตรวจสอบสถานะแปลงแล้วทำกิจกรรมให้อัตโนมัติทันที! (ไม่ต้องเสียเวลาสลับเครื่องมือ)
  if (plot.state === 'empty') {
    handlePlant(plotId, plot);
  } else if (plot.state === 'planted' || plot.state === 'growing') {
    handleWater(plotId, plot);
  } else if (plot.state === 'ready') {
    handleHarvest(plotId, plot);
  }
}

// =============================================
// 🌱 PLANT — ปลูกพืช
// =============================================
function handlePlant(plotId, plot) {
  if (plot.state !== 'empty') {
    ToastSystem.show('⚠️ แปลงนี้มีพืชอยู่แล้ว!', 'warning');
    return;
  }

  selectedPlotId = plotId;

  if (typeof showQuiz === 'function') {
    try {
      showQuiz('plant', (isCorrect, bonusCoins, bonusExp) => {
        if (isCorrect) {
          ToastSystem.show('✅ ตอบถูก! เลือกเมล็ดพันธุ์ได้เลย!', 'success');
        } else {
          ToastSystem.show('💪 ไม่เป็นไร! ยังปลูกได้อยู่นะ', 'info');
        }
        renderSeedModal();
        ModalSystem.open('seedModal');
      });
      return;
    } catch (e) {
      console.warn('Quiz engine fallback triggered:', e);
    }
  }

  // Fallback direct modal open
  renderSeedModal();
  ModalSystem.open('seedModal');
}

/**
 * แสดงรายการเมล็ดพันธุ์ใน Modal
 */
function renderSeedModal() {
  const seedGrid = document.getElementById('seedGrid');
  if (!seedGrid) return;

  seedGrid.innerHTML = '';

  Object.values(CROPS).forEach(crop => {
    const isUnlocked = gameState.level >= crop.unlockLevel;
    const canAfford = gameState.coins >= crop.seedPrice;
    const isDisabled = !isUnlocked || !canAfford;

    const card = document.createElement('div');
    card.className = `seed-card${isDisabled ? ' disabled' : ''}`;

    let statusText = '';
    if (!isUnlocked) {
      statusText = `🔒 Lv.${crop.unlockLevel}`;
    } else if (!canAfford) {
      statusText = '💸 เงินไม่พอ';
    }

    card.innerHTML = `
      <div class="seed-emoji">${crop.emoji}</div>
      <div class="seed-name">${crop.name}</div>
      <div class="seed-name-en">${crop.nameEn}</div>
      <div class="seed-info">
        <span class="seed-price">💰 ${crop.seedPrice}</span>
        <span class="seed-sell">→ 💰 ${crop.sellPrice}</span>
      </div>
      ${statusText ? `<div style="margin-top:4px;font-size:0.75rem;color:#E65100;font-weight:700">${statusText}</div>` : ''}
    `;

    if (!isDisabled) {
      card.addEventListener('click', () => plantCrop(crop.id));
    }

    seedGrid.appendChild(card);
  });
}

/**
 * ปลูกพืชลงแปลง
 */
function plantCrop(cropId) {
  const crop = CROPS[cropId];
  if (!crop) return;

  // ตรวจเงิน
  if (gameState.coins < crop.seedPrice) {
    ToastSystem.show('💸 เหรียญไม่พอ!', 'error');
    return;
  }

  // หักเงิน
  gameState.coins -= crop.seedPrice;

  // อัปเดตแปลง
  const plot = gameState.plots[selectedPlotId];
  plot.state = 'planted';
  plot.crop = cropId;
  plot.waterCount = 0;

  // อัปเดต UI
  ModalSystem.close('seedModal');
  renderFarmGrid();
  animateHUDValue('coinsValue', gameState.coins);

  // แสดงอนิเมชันขุดดิน (Shovel Dig Effect ⛏️)
  showShovelEffect(selectedPlotId);

  if (typeof QuestManager !== 'undefined') {
    QuestManager.trackProgress('plant', 1);
  }

  // แสดง Toast
  ToastSystem.show(`🌱 ปลูก${crop.name}แล้ว! (-${crop.seedPrice} 💰)`, 'success');

  // เซฟ
  SaveSystem.save(gameState);
}

// =============================================
// 💧 WATER — รดน้ำ
// =============================================
function handleWater(plotId, plot) {
  if (plot.state === 'empty') {
    ToastSystem.show('🟫 แปลงนี้ว่างอยู่ ปลูกพืชก่อนนะ!', 'info');
    return;
  }

  if (plot.state === 'ready') {
    ToastSystem.show('🌾 พืชพร้อมเก็บเกี่ยวแล้ว!', 'info');
    return;
  }

  const crop = CROPS[plot.crop];
  if (!crop) return;

  // เพิ่มจำนวนรดน้ำ
  plot.waterCount++;

  // เล่นเสียงรดน้ำสมจริง 💧
  if (typeof AudioManager !== 'undefined') {
    AudioManager.playWater();
  }

  // ตรวจสอบว่าพืชโตเต็มที่หรือยัง
  if (plot.waterCount >= crop.waterNeeded) {
    // พร้อมเก็บเกี่ยว!
    plot.state = 'ready';
    ToastSystem.show(`✨ ${crop.name}พร้อมเก็บเกี่ยวแล้ว!`, 'success');
  } else if (plot.waterCount >= Math.ceil(crop.waterNeeded / 2)) {
    // กำลังโต
    plot.state = 'growing';
    const remaining = crop.waterNeeded - plot.waterCount;
    ToastSystem.show(`💧 รดน้ำแล้ว! เหลืออีก ${remaining} ครั้ง`, 'info');
  } else {
    ToastSystem.show(`💧 รดน้ำแล้ว! เหลืออีก ${crop.waterNeeded - plot.waterCount} ครั้ง`, 'info');
  }

  // อัปเดต UI หลังอัปเดตสถานะ
  renderFarmGrid();
  SaveSystem.save(gameState);

  // แสดงเอฟเฟกต์บัวรดน้ำพร้อมละอองน้ำกระเซ็น (Watering Can & Splashing Droplets 🚿💧💦) หลังเรนเดอร์แปลงใหม่
  showWateringCanEffect(plotId);
  showWaterEffect(plotId);
}

/**
 * แสดงเอฟเฟกต์พลั่วขุดดิน (Shovel Effect ⛏️)
 */
function showShovelEffect(plotId) {
  const plotEl = document.querySelector(`.plot[data-plot-id="${plotId}"]`);
  if (!plotEl) return;

  const el = document.createElement('div');
  el.className = 'action-tool-effect tool-shovel-anim';
  el.innerHTML = '⛏️';
  plotEl.appendChild(el);

  setTimeout(() => {
    if (el.parentNode) el.parentNode.removeChild(el);
  }, 800);
}

/**
 * แสดงเอฟเฟกต์บัวรดน้ำ 3D พร้อมละอองน้ำกระเซ็น (Watering Can & Droplets 🚿💧💦)
 */
function showWateringCanEffect(plotId) {
  const plotEl = document.querySelector(`.plot[data-plot-id="${plotId}"]`);
  if (!plotEl) return;

  const container = document.createElement('div');
  container.className = 'watering-can-wrapper';
  container.innerHTML = `
    <div class="watering-can-icon">🚿</div>
    <div class="water-droplets-stream">💧 💦 💧</div>
  `;
  plotEl.appendChild(container);

  setTimeout(() => {
    if (container.parentNode) container.parentNode.removeChild(container);
  }, 950);
}

/**
 * แสดงเอฟเฟกต์เคียวเก็บเกี่ยว (Sickle Effect 🌾)
 */
function showSickleEffect(plotId) {
  const plotEl = document.querySelector(`.plot[data-plot-id="${plotId}"]`);
  if (!plotEl) return;

  const el = document.createElement('div');
  el.className = 'action-tool-effect tool-sickle-anim';
  el.innerHTML = '🌾';
  plotEl.appendChild(el);

  setTimeout(() => {
    if (el.parentNode) el.parentNode.removeChild(el);
  }, 800);
}

/**
 * แสดงเอฟเฟกต์น้ำกระเซ็น
 */
function showWaterEffect(plotId) {
  const plotEl = document.querySelector(`.plot[data-plot-id="${plotId}"]`);
  if (!plotEl) return;

  const splash = document.createElement('span');
  splash.className = 'water-splash';
  splash.textContent = '💦';
  plotEl.appendChild(splash);

  setTimeout(() => {
    if (splash.parentNode) splash.parentNode.removeChild(splash);
  }, 600);
}

// =============================================
// 🧺 HARVEST — เก็บเกี่ยว
// =============================================
function handleHarvest(plotId, plot) {
  if (plot.state !== 'ready') {
    if (plot.state === 'empty') {
      ToastSystem.show('🟫 แปลงนี้ว่างอยู่!', 'info');
    } else {
      const crop = CROPS[plot.crop];
      const remaining = crop ? crop.waterNeeded - plot.waterCount : '?';
      ToastSystem.show(`💧 ยังไม่โตเต็มที่ รดน้ำอีก ${remaining} ครั้ง`, 'warning');
    }
    return;
  }

  const crop = CROPS[plot.crop];
  if (!crop) return;

  // แสดงคำถามก่อนเก็บเกี่ยว
  showQuiz('harvest', (isCorrect, bonusCoins, bonusExp) => {
    // คำนวณรางวัล (ตอบถูกได้โบนัสเพิ่ม)
    let totalCoins = crop.sellPrice;
    let totalExp = crop.expReward;
    if (isCorrect) {
      totalCoins += bonusCoins;
      totalExp += bonusExp;
    }

    // ให้รางวัล
    gameState.coins += totalCoins;
    const oldExp = gameState.exp;
    gameState.exp += totalExp;
    gameState.totalHarvested = (gameState.totalHarvested || 0) + 1;
    gameState.totalEarned = (gameState.totalEarned || 0) + totalCoins;

    // เพิ่มผลผลิตเข้าคลังสินค้า (Inventory)
    if (!gameState.inventory) gameState.inventory = {};
    gameState.inventory[plot.crop] = (gameState.inventory[plot.crop] || 0) + 1;

    // ตรวจเลเวลอัพ
    const newLevel = LevelSystem.calculateLevel(gameState.exp);
    const didLevelUp = newLevel > gameState.level;
    gameState.level = newLevel;

    // แสดงเอฟเฟกต์เคียวเกี่ยวผัก (Sickle Harvest Effect 🌾)
    showSickleEffect(plotId);
    showFloatingReward(plotId, totalCoins, totalExp);

    if (typeof AudioManager !== 'undefined') {
      AudioManager.playHarvest();
      setTimeout(() => AudioManager.playCoin(), 200);
    }

    // รีเซ็ตแปลง
    plot.state = 'empty';
    plot.crop = null;
    plot.waterCount = 0;

    // อัปเดต UI
    renderFarmGrid();
    animateHUDValue('coinsValue', gameState.coins);
    animateHUDValue('expValue', gameState.exp);
    if (didLevelUp) {
      animateHUDValue('levelValue', gameState.level);
    }

    // แสดง Modal ผลลัพธ์
    showHarvestResult(crop, didLevelUp, isCorrect, bonusCoins, bonusExp);

    // เซฟ
    SaveSystem.save(gameState);
  });
}

/**
 * แสดงเหรียญ/EXP ลอยขึ้น
 */
function showFloatingReward(plotId, coins, exp) {
  const plotEl = document.querySelector(`.plot[data-plot-id="${plotId}"]`);
  if (!plotEl) return;

  // เหรียญ
  const coinFloat = document.createElement('div');
  coinFloat.className = 'float-reward coin-reward';
  coinFloat.textContent = `+${coins} 💰`;
  plotEl.appendChild(coinFloat);

  // EXP (ดีเลย์เล็กน้อย)
  setTimeout(() => {
    const expFloat = document.createElement('div');
    expFloat.className = 'float-reward exp-reward';
    expFloat.textContent = `+${exp} ⭐`;
    expFloat.style.animationDelay = '0.2s';
    plotEl.appendChild(expFloat);
  }, 200);

  // Cleanup
  setTimeout(() => {
    plotEl.querySelectorAll('.float-reward').forEach(el => el.remove());
  }, 1200);
}

/**
 * แสดง Modal ผลลัพธ์การเก็บเกี่ยว
 */
function showHarvestResult(crop, didLevelUp, quizCorrect = false, bonusCoins = 0, bonusExp = 0) {
  const resultTitle = document.getElementById('resultTitle');
  const resultEmoji = document.getElementById('resultEmoji');
  const resultMessage = document.getElementById('resultMessage');
  const resultCoins = document.getElementById('resultCoins');
  const resultExp = document.getElementById('resultExp');

  if (resultTitle) {
    resultTitle.textContent = didLevelUp ? '🎊 เลเวลอัพ!' : '🎉 เก็บเกี่ยวสำเร็จ!';
  }
  if (resultEmoji) {
    resultEmoji.textContent = didLevelUp ? '🏆' : crop.emoji;
  }
  if (resultMessage) {
    let msg = `เก็บ${crop.name}ได้แล้ว!`;
    if (quizCorrect) {
      msg += ` (🎯 โบนัสตอบถูก!)`;
    }
    if (didLevelUp) {
      msg += `\n🎊 ยินดีด้วย! อัพเป็น Lv.${gameState.level}!`;
    }
    resultMessage.textContent = msg;
  }
  if (resultCoins) {
    const totalCoins = crop.sellPrice + (quizCorrect ? bonusCoins : 0);
    resultCoins.textContent = quizCorrect ? `+${crop.sellPrice} +${bonusCoins}🎯` : `+${crop.sellPrice}`;
  }
  if (resultExp) {
    const totalExp = crop.expReward + (quizCorrect ? bonusExp : 0);
    resultExp.textContent = quizCorrect ? `+${crop.expReward} +${bonusExp}🎯` : `+${crop.expReward}`;
  }

  ModalSystem.open('resultModal');
}

// =============================================
// 🔧 TOOLBAR — แถบเครื่องมือ
// =============================================
function setupToolbar() {
  const toolbarBtns = document.querySelectorAll('.toolbar-btn');

  toolbarBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tool = btn.dataset.tool;

      // ปุ่มพิเศษ: กลับหน้าแรก
      if (tool === 'home') {
        ToastSystem.confirm('🏠 กลับหน้าแรก?', 'ข้อมูลการเล่นของคุณถูกบันทึกอัตโนมัติเรียบร้อยแล้ว', () => {
          window.location.href = 'index.html';
        });
        return;
      }

      // ปุ่มร้านค้า (Phase ถัดไป)
      if (tool === 'shop') {
        ToastSystem.show('🏪 ร้านค้าจะเปิดเร็วๆ นี้!', 'info');
        return;
      }

      // สลับเครื่องมือ
      selectedTool = tool;
      toolbarBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // แสดง Toast บอกเครื่องมือ
      const toolNames = {
        plant: '🌱 โหมดปลูก — คลิกแปลงว่างเพื่อปลูก',
        water: '💧 โหมดรดน้ำ — คลิกแปลงที่มีพืชเพื่อรดน้ำ',
        harvest: '🧺 โหมดเก็บเกี่ยว — คลิกพืชที่โตเต็มที่'
      };
      ToastSystem.show(toolNames[tool] || '', 'info');
    });
  });
}

// =============================================
// 🪟 MODALS SETUP — ตั้งค่า Modal
// =============================================
function setupModals() {
  // ปุ่มปิด Modal เลือกเมล็ด
  const seedModalClose = document.getElementById('seedModalClose');
  if (seedModalClose) {
    seedModalClose.addEventListener('click', () => {
      ModalSystem.close('seedModal');
    });
  }

  // ปุ่ม OK ใน Modal ผลลัพธ์
  const resultOkBtn = document.getElementById('resultOkBtn');
  if (resultOkBtn) {
    resultOkBtn.addEventListener('click', () => {
      ModalSystem.close('resultModal');
    });
  }

  // คลิกพื้นหลังเพื่อปิด
  ModalSystem.setupBackdropClose('seedModal');
  ModalSystem.setupBackdropClose('resultModal');
}

// =============================================
// 🚀 START — เริ่มต้นเมื่อหน้าโหลด
// =============================================
function runInitFarm() {
  const farmGrid = document.getElementById('farmGrid');
  if (farmGrid) {
    initFarm();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runInitFarm);
} else {
  runInitFarm();
}
