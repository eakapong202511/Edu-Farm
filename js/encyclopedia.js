/* ===================================================
   EduFarm — Encyclopedia System JavaScript (encyclopedia.js)
   หนังสือสารานุกรมฟาร์มแห่งการเรียนรู้
   รวมความรู้ 6 วิชาหลัก (คณิต, วิทย์, สังคม, การงาน, ไทย, อังกฤษ)
   และคู่มือพันธุ์พืช สัตว์เลี้ยง เครื่องมือเกษตร
   =================================================== */

// =============================================
// 📖 ENCYCLOPEDIA MANAGER — ระบบหนังสือสารานุกรม
// =============================================
const EncyclopediaManager = {
  currentCategory: 'subjects', // 'subjects' | 'crops' | 'animals' | 'tools'
  currentSubject: 'science',

  // =========================================
  // 📚 1. ฐานข้อมูลความรู้ 6 วิชาหลัก
  // =========================================
  subjectsData: {
    math: {
      name: 'คณิตศาสตร์',
      icon: '🧮',
      color: '#1976D2',
      topics: [
        {
          title: '📊 การคิดต้นทุน กำไร และขาดทุนในการทำฟาร์ม',
          content: `
            <ul>
              <li><strong>ต้นทุน (Cost):</strong> คือ เงินที่เราจ่ายไปเพื่อซื้อเมล็ดพันธุ์ อาหารสัตว์ หรือปุ๋ย</li>
              <li><strong>ราคาขาย (Sell Price):</strong> คือ เงินที่ได้จากการนำผลผลิตไปขายในตลาดหรือออเดอร์</li>
              <li><strong>กำไร (Profit):</strong> ราคาขาย - ต้นทุน (เมื่อขายได้เงินมากกว่าต้นทุน)</li>
              <li><strong>สูตรคำนวณ:</strong> ซื้อเมล็ดข้าว 5 บาท ขายได้ 15 บาท ➡️ ได้กำไร 15 - 5 = <strong>10 บาท!</strong></li>
            </ul>
          `
        },
        {
          title: '📐 การคำนวณพื้นที่แปลงปลูกผัก',
          content: `
            <ul>
              <li>แปลงปลูกผักในฟาร์มจัดเรียงแบบตาราง <strong>3 × 3 แปลง = 9 แปลง</strong></li>
              <li>การคำนวณพื้นที่รูปสี่เหลี่ยม = <strong>กว้าง × ยาว</strong></li>
              <li>การวางแผนปลูกผักในตารางช่วยให้เราคำนวณจำนวนเมล็ดพันธุ์และผลผลิตได้อย่างแม่นยำ</li>
            </ul>
          `
        },
        {
          title: '💰 การคิดอัตราดอกเบี้ยและเงินออม',
          content: `
            <ul>
              <li><strong>การคิดดอกเบี้ย:</strong> ธนาคารออมสินให้ดอกเบี้ย 5% สำหรับเงินฝาก</li>
              <li><strong>ตัวอย่าง:</strong> ฝากเงิน 100 บาท ➡️ ได้ดอกเบี้ยเพิ่ม +5 บาท รวมเป็น <strong>105 บาท!</strong></li>
              <li>การออมเงินอย่างสม่ำเสมอช่วยให้ทบต้นทบดอก เงินออมเติบโตขึ้นเรื่อยๆ</li>
            </ul>
          `
        }
      ]
    },
    science: {
      name: 'วิทยาศาสตร์',
      icon: '🔬',
      color: '#388E3C',
      topics: [
        {
          title: '🌱 ปัจจัย 4 ประการในการเจริญเติบโตของพืช',
          content: `
            <ul>
              <li>💧 <strong>น้ำ:</strong> ช่วยละลายสารอาหารในดินให้รากดูดซึมไปเลี้ยงส่วนต่างๆ</li>
              <li>☀️ <strong>แสงแดด:</strong> ให้พลังงานสำหรับกระบวนการสังเคราะห์ด้วยแสง</li>
              <li>💨 <strong>อากาศ:</strong> พืชใช้คาร์บอนไดออกไซด์สร้างอาหาร และใช้ออกซิเจนหายใจ</li>
              <li>🟫 <strong>ดินและปุ๋ย:</strong> ให้แร่ธาตุสำคัญ (N-P-K) ช่วยให้ลำต้นและใบแข็งแรง</li>
            </ul>
          `
        },
        {
          title: '🍃 กระบวนการสังเคราะห์ด้วยแสง (Photosynthesis)',
          content: `
            <ul>
              <li>พืชใช้สารสีเขียวที่เรียกว่า <strong>คลอโรฟิลล์ (Chlorophyll)</strong> ในใบ</li>
              <li>รวมพลังงานแสงแดด + น้ำ + คาร์บอนไดออกไซด์ ➡️ เปลี่ยนเป็น <strong>น้ำตาล (อาหารพืช) + แก๊สออกซิเจน!</strong></li>
              <li>ต้นไม้ในฟาร์มจึงช่วยผลิตแก๊สออกซิเจนบริสุทธิ์ให้อากาศแจ่มใส</li>
            </ul>
          `
        }
      ]
    },
    social: {
      name: 'สังคมศึกษา & เศรษฐกิจพอเพียง',
      icon: '🏛️',
      color: '#E65100',
      topics: [
        {
          title: '⚖️ ปรัชญาเศรษฐกิจพอเพียง (3 ห่วง 2 เงื่อนไข)',
          content: `
            <ul>
              <li>1. <strong>ความพอประมาณ:</strong> ปลูกผักและใช้จ่ายอย่างพอดี ไม่โลภเกินตัว</li>
              <li>2. <strong>ความมีเหตุผล:</strong> คิดวางแผนก่อนซื้อเมล็ดพันธุ์หรืออุปกรณ์</li>
              <li>3. <strong>การมีภูมิคุ้มกันที่ดี:</strong> ฝากเงินออมในธนาคารออมสินไว้ใช้ยามจำเป็น</li>
            </ul>
          `
        },
        {
          title: '🏭 การแปรรูปผลผลิตเพื่อเพิ่มมูลค่า (Value Added)',
          content: `
            <ul>
              <li>นำข้าวเปลือก + ไข่ไก่ ➡️ เข้าเตาอบแปรรูปเป็น <strong>ขนมปังหอมนุ่ม 🍞</strong></li>
              <li>นำนมวัวสด ➡️ แปรรูปเป็น <strong>ชีสแสนอร่อย 🧀</strong></li>
              <li>การแปรรูปช่วยถนอมอาหารให้เก็บได้นานขึ้น และขายได้ราคาสูงขึ้น!</li>
            </ul>
          `
        }
      ]
    },
    career: {
      name: 'การงานอาชีพ & เกษตรกรรม',
      icon: '🌾',
      color: '#6D4C41',
      topics: [
        {
          title: '⛏️ เครื่องมือเกษตรคู่ใจชาวนา',
          content: `
            <ul>
              <li>⛏️ <strong>จอบ:</strong> ใช้ขุดดิน ถากหญ้า และพรวนดินให้ร่วนซุยก่อนปลูก</li>
              <li>🚿 <strong>บัวรดน้ำ:</strong> หัวฝอยช่วยกระจายสายน้ำเบาๆ ไม่ให้ต้นอ่อนเสียหาย</li>
              <li>🧺 <strong>ตะกร้าเก็บเกี่ยว:</strong> บรรจุผลผลิตสดจากแปลงส่งไปยังคลังสินค้า</li>
            </ul>
          `
        },
        {
          title: '🍂 ปุ๋ยอินทรีย์จากธรรมชาติ',
          content: `
            <ul>
              <li>ทำจากเศษใบไม้ หมักรวมกับเศษอาหารและหมักโดยจุลินทรีย์ธรรมชาติ</li>
              <li>บำรุงดินให้ร่วนซุย ปลอดภัยต่อผู้บริโภคและไม่ทำลายสิ่งแวดล้อม</li>
            </ul>
          `
        }
      ]
    },
    thai: {
      name: 'ภาษาไทย',
      icon: '📖',
      color: '#7B1FA2',
      topics: [
        {
          title: '📝 คำศัพท์เกษตรกรรมน่ารู้',
          content: `
            <ul>
              <li><strong>เก็บเกี่ยว (กริยา):</strong> การเก็บผลผลิตพืชผักที่โตเต็มวัย</li>
              <li><strong>พรวนดิน (กริยา):</strong> การทำดินให้ร่วนซุยเพื่อให้อากาศระบายได้ดี</li>
              <li><strong>ออมสิน (นาม):</strong> การเก็บสะสมเงินทีละเล็กทีละน้อย</li>
            </ul>
          `
        }
      ]
    },
    english: {
      name: 'ภาษาอังกฤษ',
      icon: '🔤',
      color: '#C62828',
      topics: [
        {
          title: '🔤 Farm Vocabulary (คำศัพท์ฟาร์มภาษาอังกฤษ)',
          content: `
            <ul>
              <li>🌾 <strong>Rice:</strong> ข้าว</li>
              <li>🌽 <strong>Corn:</strong> ข้าวโพด</li>
              <li>🍅 <strong>Tomato:</strong> มะเขือเทศ</li>
              <li>🍉 <strong>Watermelon:</strong> แตงโม</li>
              <li>🌻 <strong>Sunflower:</strong> ดอกทานตะวัน</li>
              <li>🐔 <strong>Chicken / Egg:</strong> ไก่ / ไข่ไก่</li>
              <li>🐄 <strong>Cow / Milk:</strong> วัว / นมวัว</li>
              <li>🧺 <strong>Harvest:</strong> เก็บเกี่ยว</li>
            </ul>
          `
        }
      ]
    }
  },

  // =========================================
  // 📖 2. เปิด MODAL สารานุกรม
  // =========================================
  openBookModal() {
    if (typeof AudioManager !== 'undefined') AudioManager.playQuestSound();
    this.renderEncyclopediaModal('subjects');
    ModalSystem.open('encyclopediaModal');
  },

  // =========================================
  // 📖 3. RENDER CONTENT
  // =========================================
  renderEncyclopediaModal(category = 'subjects') {
    this.currentCategory = category;
    const container = document.getElementById('encyclopediaBody');
    const tabContainer = document.getElementById('encyclopediaTabs');
    if (!container) return;

    if (tabContainer) {
      tabContainer.innerHTML = `
        <div style="display: flex; gap: 8px; justify-content: center; margin-bottom: 12px; flex-wrap: wrap;">
          <button class="btn btn-sm ${category === 'subjects' ? 'btn-warning' : 'btn-secondary'}" onclick="EncyclopediaManager.renderEncyclopediaModal('subjects')">
            📚 6 วิชาหลัก
          </button>
          <button class="btn btn-sm ${category === 'crops' ? 'btn-warning' : 'btn-secondary'}" onclick="EncyclopediaManager.renderEncyclopediaModal('crops')">
            🌾 พันธุ์พืช
          </button>
          <button class="btn btn-sm ${category === 'animals' ? 'btn-warning' : 'btn-secondary'}" onclick="EncyclopediaManager.renderEncyclopediaModal('animals')">
            🐄 สัตว์เลี้ยง
          </button>
          <button class="btn btn-sm ${category === 'tools' ? 'btn-warning' : 'btn-secondary'}" onclick="EncyclopediaManager.renderEncyclopediaModal('tools')">
            ⛏️ เครื่องมือเกษตร
          </button>
        </div>
      `;
    }

    if (category === 'subjects') {
      this.renderSubjectsView(container);
    } else if (category === 'crops') {
      this.renderCropsView(container);
    } else if (category === 'animals') {
      this.renderAnimalsView(container);
    } else if (category === 'tools') {
      this.renderToolsView(container);
    }
  },

  /**
   * แสดงวิชาความรู้ 6 วิชา
   */
  renderSubjectsView(container) {
    const subjects = Object.keys(this.subjectsData);
    const activeSub = this.subjectsData[this.currentSubject] || this.subjectsData.science;

    let subTabsHtml = `<div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 12px;">`;
    subjects.forEach(key => {
      const sub = this.subjectsData[key];
      const isActive = key === this.currentSubject;
      subTabsHtml += `
        <button class="btn btn-sm" 
                style="background: ${isActive ? sub.color : '#E0E0E0'}; color: ${isActive ? 'white' : '#424242'}; border-radius: 20px; font-weight: 700; white-space: nowrap;"
                onclick="EncyclopediaManager.currentSubject = '${key}'; EncyclopediaManager.renderEncyclopediaModal('subjects');">
          ${sub.icon} ${sub.name}
        </button>
      `;
    });
    subTabsHtml += `</div>`;

    let topicsHtml = '';
    activeSub.topics.forEach(t => {
      topicsHtml += `
        <div style="background: white; border-left: 5px solid ${activeSub.color}; border-radius: 10px; padding: 12px; margin-bottom: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
          <h4 style="color: ${activeSub.color}; font-size: 1rem; font-weight: 800; margin-bottom: 6px;">${t.title}</h4>
          <div style="font-size: 0.85rem; color: #424242; line-height: 1.5;">${t.content}</div>
        </div>
      `;
    });

    container.innerHTML = subTabsHtml + topicsHtml;
  },

  /**
   * แสดงสารานุกรมพันธุ์พืช
   */
  renderCropsView(container) {
    let html = `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">`;
    Object.values(CROPS).forEach(crop => {
      html += `
        <div style="background: white; border: 2px solid #C8E6C9; border-radius: 12px; padding: 12px; text-align: center;">
          <div style="font-size: 3rem;">${crop.emoji}</div>
          <h4 style="color: #2E7D32; font-weight: 800; font-size: 1rem; margin-top: 4px;">${crop.name}</h4>
          <div style="font-size: 0.75rem; color: #66BB6A; font-weight: 700;">ระยะเวลาโต: ${crop.growTime} วินาที</div>
          <p style="font-size: 0.8rem; color: #5D4037; margin-top: 6px; text-align: left;">
            พืชผลสดชื่น ปลูกง่าย ได้ผลผลิตคุณภาพ สามารถนำไปขายหรือแปรรูปเป็นอาหารแสนอร่อยได้!
          </p>
        </div>
      `;
    });
    html += `</div>`;
    container.innerHTML = html;
  },

  /**
   * แสดงสารานุกรมสัตว์เลี้ยง
   */
  renderAnimalsView(container) {
    let html = `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">`;
    Object.values(ANIMALS).forEach(an => {
      html += `
        <div style="background: white; border: 2px solid #FFE082; border-radius: 12px; padding: 12px; text-align: center;">
          <div style="font-size: 3rem;">${an.emoji}</div>
          <h4 style="color: #E65100; font-weight: 800; font-size: 1rem; margin-top: 4px;">${an.name} (${an.nameEn})</h4>
          <div style="font-size: 0.75rem; color: #F57C00; font-weight: 700;">ผลผลิต: ${an.produceEmoji} ${an.produceName}</div>
          <p style="font-size: 0.8rem; color: #5D4037; margin-top: 6px; text-align: left;">
            สัตว์เลี้ยงในฟาร์มต้องได้รับการดูแล รดน้ำและให้อาหารอย่างสม่ำเสมอ เพื่อผลิตวัตถุดิบสดใหม่!
          </p>
        </div>
      `;
    });
    html += `</div>`;
    container.innerHTML = html;
  },

  /**
   * แสดงสารานุกรมเครื่องมือเกษตร
   */
  renderToolsView(container) {
    const tools = [
      { name: 'จอบขุดดิน (Shovel)', emoji: '⛏️', desc: 'ใช้ขุดเตรียมดินและปรับหน้าแปลงปลูกให้ร่วนซุย' },
      { name: 'บัวรดน้ำ (Watering Can)', emoji: '🚿', desc: 'ใช้น้ำรดต้นไม้ให้ความชื้นพืชผลเจริญเติบโต' },
      { name: 'เคียวเกี่ยวหญ้า (Sickle)', emoji: '🌾', desc: 'ใช้เก็บเกี่ยวพืชผลเมื่อโตเต็มที่' },
      { name: 'ตู้เสื้อผ้าตัวละคร (Wardrobe)', emoji: '👔', desc: 'ใช้เก็บสะสมชุดและแต่งตัวเจ้าของฟาร์ม' }
    ];

    let html = `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">`;
    tools.forEach(t => {
      html += `
        <div style="background: white; border: 2px solid #D7CCC8; border-radius: 12px; padding: 12px; text-align: center;">
          <div style="font-size: 2.8rem;">${t.emoji}</div>
          <h4 style="color: #4E342E; font-weight: 800; font-size: 0.95rem; margin-top: 4px;">${t.name}</h4>
          <p style="font-size: 0.8rem; color: #6D4C41; margin-top: 6px; text-align: left;">${t.desc}</p>
        </div>
      `;
    });
    html += `</div>`;
    container.innerHTML = html;
  }
};
