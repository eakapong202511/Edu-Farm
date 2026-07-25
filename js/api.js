/* ===================================================
   EduFarm — API Service (api.js)
   เชื่อมต่อ Google Apps Script ⟷ Google Sheets
   =================================================== */

// =============================================
// ⚙️ API CONFIG — ตั้งค่า API
// =============================================
const API_CONFIG = {
  // 🔗 ใส่ URL ของ Google Apps Script Web App ที่นี่
  // (จะได้ URL หลัง Deploy Apps Script เป็น Web App)
  APPS_SCRIPT_URL: '',

  // ⏱️ Timeout (มิลลิวินาที)
  TIMEOUT: 10000,

  // 🔄 จำนวนครั้งที่ retry เมื่อ fetch ล้มเหลว
  MAX_RETRIES: 2
};

// =============================================
// 🌐 API SERVICE — บริการเชื่อมต่อ API
// =============================================
const ApiService = {

  /**
   * ตรวจสอบว่ามี API URL หรือยัง
   */
  isConfigured() {
    return API_CONFIG.APPS_SCRIPT_URL && API_CONFIG.APPS_SCRIPT_URL.length > 0;
  },

  /**
   * ส่ง request ไปยัง Google Apps Script
   * @param {string} action - ชื่อ action (เช่น 'getQuestions', 'saveScore')
   * @param {object} params - พารามิเตอร์เพิ่มเติม
   * @param {string} method - 'GET' หรือ 'POST'
   */
  async request(action, params = {}, method = 'GET') {
    if (!this.isConfigured()) {
      throw new Error('API URL ยังไม่ได้ตั้งค่า');
    }

    let url = API_CONFIG.APPS_SCRIPT_URL;
    let options = {
      method: method,
      headers: { 'Content-Type': 'text/plain' }
    };

    if (method === 'GET') {
      // ใส่พารามิเตอร์ใน URL
      const queryParams = new URLSearchParams({ action, ...params });
      url += '?' + queryParams.toString();
    } else {
      // ใส่พารามิเตอร์ใน body
      options.body = JSON.stringify({ action, ...params });
    }

    // Retry logic
    let lastError = null;
    for (let attempt = 0; attempt <= API_CONFIG.MAX_RETRIES; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
        options.signal = controller.signal;

        const response = await fetch(url, options);
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data;

      } catch (error) {
        lastError = error;
        if (attempt < API_CONFIG.MAX_RETRIES) {
          // รอก่อน retry
          await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
          console.warn(`🔄 Retry ${attempt + 1}/${API_CONFIG.MAX_RETRIES}...`);
        }
      }
    }

    throw lastError;
  },

  // =========================================
  // 📚 QUESTIONS — คำถาม
  // =========================================

  /**
   * ดึงคำถามจาก Google Sheets
   * @param {string} subject - วิชา (optional)
   * @param {string} grade - ระดับชั้น (optional)
   */
  async getQuestions(subject = '', grade = '') {
    try {
      const data = await this.request('getQuestions', { subject, grade });
      
      if (data.status === 'success' && Array.isArray(data.questions)) {
        return data.questions;
      }
      
      return [];
    } catch (e) {
      console.error('❌ ดึงคำถามจาก API ล้มเหลว:', e);
      return [];
    }
  },

  // =========================================
  // 📊 SCORES — คะแนน
  // =========================================

  /**
   * บันทึกคะแนนขึ้น Google Sheets
   */
  async saveScore(studentName, questionId, isCorrect) {
    if (!this.isConfigured()) return;

    try {
      await this.request('saveScore', {
        studentName,
        questionId,
        isCorrect,
        timestamp: new Date().toISOString()
      }, 'POST');
    } catch (e) {
      console.warn('⚠️ บันทึกคะแนนล้มเหลว:', e);
    }
  },

  // =========================================
  // 👤 STUDENTS — ข้อมูลนักเรียน
  // =========================================

  /**
   * บันทึกข้อมูลนักเรียนขึ้น Google Sheets
   */
  async saveStudentData(studentData) {
    if (!this.isConfigured()) return;

    try {
      await this.request('saveStudent', { studentData }, 'POST');
    } catch (e) {
      console.warn('⚠️ บันทึกข้อมูลนักเรียนล้มเหลว:', e);
    }
  },

  // =========================================
  // 🏆 LEADERBOARD — กระดานคะแนน
  // =========================================

  /**
   * ดึงอันดับคะแนนสูงสุด
   */
  async getLeaderboard(grade = '') {
    try {
      const data = await this.request('getLeaderboard', { grade });
      if (data.status === 'success') {
        return data.leaderboard || [];
      }
      return [];
    } catch (e) {
      console.warn('⚠️ ดึง Leaderboard ล้มเหลว:', e);
      return [];
    }
  }
};

// แจ้งสถานะ API
if (ApiService.isConfigured()) {
  console.log('🌐 Google Sheets API เชื่อมต่อพร้อมใช้งาน');
} else {
  console.log('📴 ยังไม่ได้ตั้งค่า Google Sheets API — ใช้โหมด Offline');
}
