/* ===================================================
   EduFarm — Audio System JavaScript (audio.js)
   ระบบดนตรีประกอบ (BGM) สไตล์ฟาร์ม HayDay & เสียงเอฟเฟกต์ (SFX)
   สร้างด้วย Web Audio API (โหลดไว ไม่ต้องพึ่งไฟล์ภายนอก เล่นได้ทุกเครื่อง)
   =================================================== */

// =============================================
// 🎵 AUDIO MANAGER — ระบบจัดการเสียง
// =============================================
const AudioManager = {
  ctx: null,
  bgmEnabled: false,
  sfxEnabled: true,
  bgmVolume: 0.5, // 0.0 ถึง 1.0 (50%)
  bgmInterval: null,
  noteStep: 0,

  /**
   * เพิ่มระดับเสียงเพลง BGM
   */
  increaseBGMVolume() {
    this.bgmVolume = Math.min(1.0, Math.round((this.bgmVolume + 0.1) * 10) / 10);
    this.updateVolumeUI();
    ToastSystem.show(`🔊 ความแรงเสียงเพลง: ${Math.round(this.bgmVolume * 100)}%`, 'info');
  },

  /**
   * ลดระดับเสียงเพลง BGM
   */
  decreaseBGMVolume() {
    this.bgmVolume = Math.max(0.0, Math.round((this.bgmVolume - 0.1) * 10) / 10);
    this.updateVolumeUI();
    ToastSystem.show(`🔉 ความแรงเสียงเพลง: ${Math.round(this.bgmVolume * 100)}%`, 'info');
  },

  /**
   * อัปเดตแสดงผลเปอร์เซ็นต์ระดับเสียง
   */
  updateVolumeUI() {
    const display = document.getElementById('bgmVolumeText');
    if (display) {
      display.textContent = `${Math.round(this.bgmVolume * 100)}%`;
    }
  },

  /**
   * เริ่มต้น AudioContext หลังผู้เล่นคลิกบนหน้าจอ (ตามนโยบายเบราว์เซอร์)
   */
  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  // =========================================
  // 🎼 BGM — ดนตรีบรรยากาศสไตล์ฟาร์ม (HayDay Style)
  // =========================================

  /**
   * เปิด/ปิด ดนตรีประกอบ
   */
  toggleBGM() {
    this.initContext();
    this.bgmEnabled = !this.bgmEnabled;

    const btn = document.getElementById('btnToggleBGM');
    if (this.bgmEnabled) {
      this.startBGM();
      if (btn) btn.textContent = '🎵 เพลง: เปิด';
      ToastSystem.show('🎵 เปิดเพลงบรรยากาศฟาร์มเรียบร้อย', 'info');
    } else {
      this.stopBGM();
      if (btn) btn.textContent = '🔇 เพลง: ปิด';
      ToastSystem.show('🔇 ปิดเพลงบรรยากาศเรียบร้อย', 'info');
    }
  },

  /**
   * เริ่มเล่นเพลงพื้นหลัง 8-Bit Hay Day Theme ต้นฉบับ (Exact Hay Day Melody & Moderate 105 BPM Tempo)
   */
  startBGM() {
    this.stopBGM();
    if (!this.bgmEnabled) return;
    this.initContext();

    // ทำนองหลัก Hay Day Theme ต้นฉบับในรูปแบบ 8-Bit (Exact Hay Day Note Sequence)
    const hayDayMelody = [
      // Hook 1: Intro Banjo Roll
      392.00, 523.25, 659.25, 783.99, 880.00, 783.99, 659.25, 523.25, // G4-C5-E5-G5-A5-G5-E5-C5
      587.33, 659.25, 698.46, 880.00, 783.99, 659.25, 587.33, 523.25, // D5-E5-F5-A5-G5-E5-D5-C5
      // Hook 2: Whistle Drop & Chorus
      659.25, 783.99, 1046.50, 1318.51, 1174.66, 1046.50, 880.00, 783.99, // E5-G5-C6-E6-D6-C6-A5-G5
      880.00, 783.99, 659.25, 587.33, 523.25, 493.88, 523.25, 0,        // A5-G5-E5-D5-C5-B4-C5-Rest
      // Hook 3: Staccato Country Bounce
      392.00, 523.25, 659.25, 783.99, 783.99, 880.00, 783.99, 659.25, // G4-C5-E5-G5-G5-A5-G5-E5
      698.46, 698.46, 659.25, 587.33, 523.25, 587.33, 659.25, 523.25  // F5-F5-E5-D5-C5-D5-E5-C5
    ];

    // เบสเดินจังหวะคาวบอย 8-bit อุ่นๆ (Moderate Walking Country Bass)
    const hayDayBass = [
      130.81, 196.00, 130.81, 196.00, // C3, G3, C3, G3
      174.61, 261.63, 174.61, 261.63, // F3, C4, F3, C4
      196.00, 293.66, 196.00, 293.66, // G3, D4, G3, D4
      130.81, 196.00, 130.81, 261.63  // C3, G3, C3, C4
    ];

    this.noteStep = 0;
    this.bgmInterval = setInterval(() => {
      if (!this.bgmEnabled || !this.ctx) return;

      const melFreq = hayDayMelody[this.noteStep % hayDayMelody.length];
      const bassFreq = hayDayBass[Math.floor(this.noteStep / 2) % hayDayBass.length];
      const vol = this.bgmVolume * 2; // คำนวณตามสเกลความดัง

      // 1. ทำนองหลัก 8-bit Square Wave (NES Chiptune Pulse)
      if (melFreq > 0) {
        this.playSynthNote(melFreq, 0.18, 'square', 0.05 * vol);
      }

      // 2. เบสเดินจังหวะคาวบอย 8-bit Triangle Wave
      if (this.noteStep % 2 === 0) {
        this.playSynthNote(bassFreq, 0.22, 'triangle', 0.07 * vol);
      }

      // 3. เสียงเคาะจังหวะ 8-bit Noise Staccato ทุกย่อยจังหวะ
      if (this.noteStep % 4 === 2 || this.noteStep % 4 === 3) {
        this.play8BitPercussion(0.015 * vol);
      }

      this.noteStep++;
    }, 285); // 105 BPM จังหวะผ่อนคลายสบายๆ เหมือนต้นฉบับ Hay Day
  },

  /**
   * เคาะจังหวะ 8-bit (Chiptune Hi-hat Noise Click)
   */
  play8BitPercussion(vol = 0.015) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch(e) {}
  },

  /**
   * หยุดดนตรีประกอบ
   */
  stopBGM() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  },

  /**
   * สร้างโน้ตดนตรีสังเคราะห์
   */
  playSynthNote(freq, duration, type = 'sine', volume = 0.1) {
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // ignore
    }
  },

  // =========================================
  // 🔊 SFX — เสียงเอฟเฟกต์การกระทำ
  // =========================================

  /**
   * เปิด/ปิด เสียงเอฟเฟกต์
   */
  toggleSFX() {
    this.sfxEnabled = !this.sfxEnabled;
    const btn = document.getElementById('btnToggleSFX');
    if (btn) btn.textContent = this.sfxEnabled ? '🔊 เสียง: เปิด' : '🔇 เสียง: ปิด';
  },

  /**
   * เสียงกดปุ่มทั่วไป
   */
  playClick() {
    if (!this.sfxEnabled) return;
    this.initContext();
    this.playSynthNote(600, 0.08, 'sine', 0.1);
  },

  /**
   * เสียงรดน้ำสมจริง (Realistic Water Pouring & Splashing Sound)
   */
  playWater() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // 1. เสียงสายน้ำเทออกจากบัวรดน้ำ (Water Stream Noise Flow)
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.45);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2400, now);
      filter.frequency.exponentialRampToValueAtTime(700, now + 0.45);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.45);

      // 2. เสียงหยดน้ำกระทบดินฉ่ำๆ (Water Droplet Bubble Drops)
      const bubbleFreqs = [450, 680, 850, 600];
      bubbleFreqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.6, now + idx * 0.08 + 0.09);

        g.gain.setValueAtTime(0.2, now + idx * 0.08);
        g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.09);

        osc.connect(g);
        g.connect(this.ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.09);
      });
    } catch (e) {
      this.playSynthNote(500, 0.2, 'sine', 0.2);
    }
  },

  /**
   * เสียงเก็บเกี่ยว (Harvesting Chime)
   */
  playHarvest() {
    if (!this.sfxEnabled) return;
    this.initContext();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playSynthNote(freq, 0.2, 'sine', 0.15), idx * 70);
    });
  },

  /**
   * เสียงได้เหรียญ (Coin Ding)
   */
  playCoin() {
    if (!this.sfxEnabled) return;
    this.initContext();
    this.playSynthNote(987.77, 0.1, 'sine', 0.15); // B5
    setTimeout(() => this.playSynthNote(1318.51, 0.25, 'sine', 0.2), 80); // E6
  },

  /**
   * เสียงตอบคำถามถูก (Correct Fanfare)
   */
  playCorrect() {
    if (!this.sfxEnabled) return;
    this.initContext();
    const fanfare = [523.25, 659.25, 783.99, 1046.50];
    fanfare.forEach((freq, idx) => {
      setTimeout(() => this.playSynthNote(freq, 0.25, 'triangle', 0.2), idx * 100);
    });
  },

  /**
   * เสียงตอบคำถามผิด (Gentle Bonk)
   */
  playWrong() {
    if (!this.sfxEnabled) return;
    this.initContext();
    this.playSynthNote(220, 0.2, 'sawtooth', 0.1);
    setTimeout(() => this.playSynthNote(174.61, 0.3, 'sawtooth', 0.1), 150);
  },

  // =========================================
  // 🎮 REALISTIC MENU SPECIFIC SFX — เสียงเอฟเฟกต์เฉพาะเมนูแบบสมจริง
  // =========================================

  /**
   * 🌾 เสียงเข้าเมนูทำฟาร์ม (เสียงขุดดิน & รดน้ำจริง - Realistic Shovel Dig & Water Splash)
   */
  playFarmMenuSound() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // 1. เสียงขุดดินจริง (Shovel Cut & Thud)
      const bufferSize = this.ctx.sampleRate * 0.22;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(220, now);
      filter.frequency.exponentialRampToValueAtTime(80, now + 0.2);
      filter.Q.setValueAtTime(1.5, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.35, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      // เสียงแรงกระทบดิน (Low Pitch Dirt Thud)
      const thud = this.ctx.createOscillator();
      const thudGain = this.ctx.createGain();
      thud.type = 'triangle';
      thud.frequency.setValueAtTime(130, now);
      thud.frequency.exponentialRampToValueAtTime(45, now + 0.18);
      thudGain.gain.setValueAtTime(0.4, now);
      thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      thud.connect(thudGain);
      thudGain.connect(this.ctx.destination);

      noise.start(now);
      thud.start(now);
      noise.stop(now + 0.22);
      thud.stop(now + 0.18);

      // 2. เสียงรดน้ำฉ่ำๆ ตามหลัง (Realistic Water Splash)
      setTimeout(() => {
        if (!this.ctx) return;
        const t2 = this.ctx.currentTime;
        const splashBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.25, this.ctx.sampleRate);
        const sData = splashBuffer.getChannelData(0);
        for (let i = 0; i < sData.length; i++) {
          sData[i] = Math.random() * 2 - 1;
        }

        const splashNoise = this.ctx.createBufferSource();
        splashNoise.buffer = splashBuffer;

        const splashFilter = this.ctx.createBiquadFilter();
        splashFilter.type = 'lowpass';
        splashFilter.frequency.setValueAtTime(1800, t2);
        splashFilter.frequency.exponentialRampToValueAtTime(600, t2 + 0.25);

        const splashGain = this.ctx.createGain();
        splashGain.gain.setValueAtTime(0.25, t2);
        splashGain.gain.exponentialRampToValueAtTime(0.001, t2 + 0.25);

        splashNoise.connect(splashFilter);
        splashFilter.connect(splashGain);
        splashGain.connect(this.ctx.destination);

        splashNoise.start(t2);
        splashNoise.stop(t2 + 0.25);
      }, 160);
    } catch (e) {
      this.playClick();
    }
  },

  /**
   * 📦 เสียงเข้าเมนูคลังสินค้า (เสียงเปิดประตูการ์ตูน - Fun Cartoon Door Open Sound)
   */
  playBarnDoorSound() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // 1. เสียงประตูการ์ตูนแอ๊ดดดด~ (Cartoon Creak Glissando)
      const creak = this.ctx.createOscillator();
      const creakGain = this.ctx.createGain();
      creak.type = 'triangle';

      // สไลด์เสียงขึ้นการ์ตูนสดใส 160Hz -> 540Hz
      creak.frequency.setValueAtTime(160, now);
      creak.frequency.exponentialRampToValueAtTime(540, now + 0.28);
      creak.frequency.exponentialRampToValueAtTime(420, now + 0.38);

      creakGain.gain.setValueAtTime(0.01, now);
      creakGain.gain.linearRampToValueAtTime(0.22, now + 0.15);
      creakGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      creak.connect(creakGain);
      creakGain.connect(this.ctx.destination);

      // 2. เสียงป๊อกกลอนประตูไม้ป็อปการ์ตูน (Cartoon Latch Pop)
      const pop = this.ctx.createOscillator();
      const popGain = this.ctx.createGain();
      pop.type = 'sine';
      pop.frequency.setValueAtTime(780, now + 0.25);
      pop.frequency.exponentialRampToValueAtTime(220, now + 0.38);

      popGain.gain.setValueAtTime(0.25, now + 0.25);
      popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      pop.connect(popGain);
      popGain.connect(this.ctx.destination);

      creak.start(now);
      creak.stop(now + 0.4);
      pop.start(now + 0.25);
      pop.stop(now + 0.38);
    } catch (e) {
      this.playClick();
    }
  },

  /**
   * 🚚 เสียงเข้าเมนูออเดอร์ (เสียงแตรรถบรรทุกส่งของจริง - Realistic Air Truck Horn)
   */
  playTruckHornSound() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const playSingleBlast = (timeOffset) => {
        const now = this.ctx.currentTime + timeOffset;

        // แตรรถบรรทุกใช้คอร์ดคู่ (Dual-tone Brass Air Horn: F4 + A4)
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const hornGain = this.ctx.createGain();

        osc1.type = 'sawtooth';
        osc2.type = 'square';

        osc1.frequency.setValueAtTime(349.23, now); // F4
        osc2.frequency.setValueAtTime(440.00, now); // A4

        hornGain.gain.setValueAtTime(0.01, now);
        hornGain.gain.linearRampToValueAtTime(0.18, now + 0.02); // Quick horn attack
        hornGain.gain.setValueAtTime(0.18, now + 0.12);
        hornGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, now);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(hornGain);
        hornGain.connect(this.ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.16);
        osc2.stop(now + 0.16);
      };

      // บีบแตร 2 ครั้ง "ปี๊บ... ปี๊บ!"
      playSingleBlast(0);
      playSingleBlast(0.18);
    } catch (e) {
      this.playClick();
    }
  },

  /**
   * 🏪 เสียงเข้าเมนูร้านค้า (เสียงกระดิ่งร้านค้า - Bright Service Counter Bell Ring)
   */
  playShopBellSound() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // เสียงกระดิ่งโลหะทองเหลืองเคาน์เตอร์ (High Metallic Overtones)
      const freqs = [2093.00, 3135.96, 4186.01]; // C7, G7, C8
      const gains = [0.22, 0.12, 0.06];

      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        g.gain.setValueAtTime(gains[idx], now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 1.2); // ก้องยาว 1.2 วินาที

        osc.connect(g);
        g.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 1.2);
      });
    } catch (e) {
      this.playClick();
    }
  },

  /**
   * 🏦 เสียงเข้าเมนูธนาคาร (เสียงเหรียญทองร่วงกะร็องโป๊ง)
   */
  playBankSound() {
    if (!this.sfxEnabled) return;
    this.initContext();
    const coinNotes = [1046.50, 1318.51, 1567.98, 2093.00];
    coinNotes.forEach((freq, idx) => {
      setTimeout(() => this.playSynthNote(freq, 0.15, 'sine', 0.18), idx * 60);
    });
  },

  /**
   * 📋 เสียงเข้าเมนูภารกิจ (เสียงเปิดสมุด/เช็กลิสต์)
   */
  playQuestSound() {
    if (!this.sfxEnabled) return;
    this.initContext();
    this.playSynthNote(523.25, 0.1, 'triangle', 0.15);
    setTimeout(() => this.playSynthNote(783.99, 0.2, 'sine', 0.2), 90);
  },

  /**
   * 👔 เสียงเข้าเมนูแต่งตัว (เสียงปิ๊งสวมชุดวิ้งๆ)
   */
  playDressSound() {
    if (!this.sfxEnabled) return;
    this.initContext();
    const notes = [659.25, 880.00, 1174.66, 1760.00];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playSynthNote(freq, 0.12, 'sine', 0.15), idx * 50);
    });
  },

  // =============================================
  // 🐔🐄🐑 AMBIENT ANIMAL SOUNDS (ระบบเสียงสัตว์ร้องสุ่มในฟาร์ม)
  // =============================================
  activeAnimalCount: 0,
  maxConcurrentAnimals: 2,
  ambientAnimalTimer: null,

  /**
   * เริ่มระบบสุ่มเล่นเสียงสัตว์ร้องในฟาร์ม (ไม่ถี่เกินไป ซ้อนกันไม่เกิน 2 ชนิด)
   */
  startAmbientAnimalSounds() {
    if (this.ambientAnimalTimer) return;

    const scheduleNextCall = () => {
      // สุ่มเวลาระหว่าง 10 - 22 วินาที (ไม่ถี่เกินไป สบายหู)
      const nextDelay = Math.floor(Math.random() * 12000) + 10000;
      this.ambientAnimalTimer = setTimeout(() => {
        this.triggerRandomAnimalSound();
        scheduleNextCall();
      }, nextDelay);
    };

    scheduleNextCall();
  },

  /**
   * สุ่มเล่นเสียงสัตว์ 1 ชนิด (ไก่ / วัว / แกะ)
   */
  triggerRandomAnimalSound() {
    if (!this.sfxEnabled || this.activeAnimalCount >= this.maxConcurrentAnimals) return;

    const animalTypes = ['chicken', 'cow', 'sheep'];
    const selected = animalTypes[Math.floor(Math.random() * animalTypes.length)];

    this.activeAnimalCount++;

    if (selected === 'chicken') {
      this.playChickenCall(() => { this.activeAnimalCount = Math.max(0, this.activeAnimalCount - 1); });
    } else if (selected === 'cow') {
      this.playCowCall(() => { this.activeAnimalCount = Math.max(0, this.activeAnimalCount - 1); });
    } else if (selected === 'sheep') {
      this.playSheepCall(() => { this.activeAnimalCount = Math.max(0, this.activeAnimalCount - 1); });
    }
  },

  /**
   * 🐔 เสียงไก่ร้องจริง (Realistic Acoustic Chicken Cluck & Crow)
   */
  playChickenCall(onEnd) {
    if (!this.sfxEnabled) { if (onEnd) onEnd(); return; }
    this.initContext();
    if (!this.ctx) { if (onEnd) onEnd(); return; }

    try {
      const now = this.ctx.currentTime;
      const playCluckPulse = (timeOffset, fStart, fPeak, duration) => {
        const t = now + timeOffset;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(850, t);
        filter.Q.setValueAtTime(2.5, t);

        osc.frequency.setValueAtTime(fStart, t);
        osc.frequency.exponentialRampToValueAtTime(fPeak, t + duration * 0.3);
        osc.frequency.exponentialRampToValueAtTime(fStart * 0.85, t + duration);

        gain.gain.setValueAtTime(0.01, t);
        gain.gain.linearRampToValueAtTime(0.18, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + duration);
      };

      // จังหวะไก่ร้องจริง "กุ๊ก... กุ๊ก... กุ๊กกะต๊าก!"
      playCluckPulse(0, 480, 720, 0.11);
      playCluckPulse(0.14, 520, 790, 0.12);
      playCluckPulse(0.28, 550, 920, 0.15);
      playCluckPulse(0.46, 680, 1050, 0.28);

      setTimeout(() => { if (onEnd) onEnd(); }, 750);
    } catch (e) {
      if (onEnd) onEnd();
    }
  },

  /**
   * 🐄 เสียงวัวร้องจริง (Realistic Acoustic Cow Lowing Moo)
   */
  playCowCall(onEnd) {
    if (!this.sfxEnabled) { if (onEnd) onEnd(); return; }
    this.initContext();
    if (!this.ctx) { if (onEnd) onEnd(); return; }

    try {
      const now = this.ctx.currentTime;

      // แม่วัวใช้คอร์ดเสียงพูดทุ่มต่ำ (Fundamental + Subharmonics + Formant Filter)
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc1.type = 'sawtooth';
      osc2.type = 'triangle';

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(360, now);
      filter.frequency.linearRampToValueAtTime(450, now + 0.4);
      filter.frequency.linearRampToValueAtTime(280, now + 1.2);

      // ความถี่วัวร้องจริง (88Hz -> 108Hz -> 78Hz)
      osc1.frequency.setValueAtTime(88, now);
      osc1.frequency.linearRampToValueAtTime(108, now + 0.35);
      osc1.frequency.exponentialRampToValueAtTime(78, now + 1.2);

      osc2.frequency.setValueAtTime(176, now);
      osc2.frequency.linearRampToValueAtTime(216, now + 0.35);
      osc2.frequency.exponentialRampToValueAtTime(156, now + 1.2);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.15);
      gain.gain.setValueAtTime(0.22, now + 0.85);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.25);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.25);
      osc2.stop(now + 1.25);

      setTimeout(() => { if (onEnd) onEnd(); }, 1300);
    } catch (e) {
      if (onEnd) onEnd();
    }
  },

  /**
   * 🐑 เสียงแกะร้องจริง (Realistic Acoustic Pasture Sheep Bleat)
   */
  playSheepCall(onEnd) {
    if (!this.sfxEnabled) { if (onEnd) onEnd(); return; }
    this.initContext();
    if (!this.ctx) { if (onEnd) onEnd(); return; }

    try {
      const now = this.ctx.currentTime;
      const playRealBleat = (timeOffset, duration) => {
        const t = now + timeOffset;
        const osc = this.ctx.createOscillator();
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(680, t);
        filter.Q.setValueAtTime(2.0, t);

        // LFO สร้างเสียงลูกคอสั่นแกะ "แฮ่รๆ-แบะๆ" (16Hz Tremolo Vibrato)
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(16, t);
        lfoGain.gain.setValueAtTime(25, t);

        lfo.connect(osc.frequency);

        osc.frequency.setValueAtTime(240, t);
        osc.frequency.linearRampToValueAtTime(320, t + 0.15);
        osc.frequency.linearRampToValueAtTime(260, t + duration);

        gain.gain.setValueAtTime(0.01, t);
        gain.gain.linearRampToValueAtTime(0.18, t + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        lfo.start(t);
        osc.start(t);
        lfo.stop(t + duration);
        osc.stop(t + duration);
      };

      // แกะร้อง 2 จังหวะ "แบะ... แบะ~"
      playRealBleat(0, 0.45);
      playRealBleat(0.48, 0.52);

      setTimeout(() => { if (onEnd) onEnd(); }, 1050);
    } catch (e) {
      if (onEnd) onEnd();
    }
  }
};

// เริ่มต้นฟังเสียงเมื่อผู้เล่นคลิกบนหน้าจอครั้งแรก
document.addEventListener('click', () => {
  AudioManager.initContext();
  AudioManager.startAmbientAnimalSounds();
}, { once: true });
