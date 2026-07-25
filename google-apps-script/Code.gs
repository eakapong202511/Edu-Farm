/**
 * ===================================================
 * EduFarm — Google Apps Script (Code.gs)
 * API กลาง เชื่อมเว็บเกมกับ Google Sheets
 * ===================================================
 * 
 * 📋 วิธีติดตั้ง:
 * 1. เปิด Google Sheets → สร้าง Sheet ใหม่ชื่อ "EduFarm Database"
 * 2. สร้าง Sheet ย่อย 3 ชื่อ: "Questions", "Scores", "Students"
 * 3. เปิดเมนู Extensions → Apps Script
 * 4. ลบโค้ดเดิมทิ้ง → Copy โค้ดนี้ทั้งหมดไปวาง
 * 5. กด Deploy → New Deployment → Web app
 * 6. ตั้งค่า:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 7. กด Deploy → Copy URL ที่ได้
 * 8. นำ URL ไปใส่ในไฟล์ js/api.js ที่ตัวแปร APPS_SCRIPT_URL
 * 
 * 📊 โครงสร้าง Sheet "Questions":
 * | id | subject | grade | topic | question | choice_a | choice_b | choice_c | choice_d | answer | hint |
 * 
 * 📊 โครงสร้าง Sheet "Scores":
 * | timestamp | studentName | questionId | isCorrect |
 * 
 * 📊 โครงสร้าง Sheet "Students":
 * | studentName | grade | level | exp | coins | lastPlayed |
 */

// ============================================
// 🌐 WEB APP ENTRY POINTS
// ============================================

/**
 * รับ GET requests
 */
function doGet(e) {
  var action = e.parameter.action || '';
  var result = {};

  try {
    switch (action) {
      case 'getQuestions':
        result = handleGetQuestions(e.parameter);
        break;
      case 'getLeaderboard':
        result = handleGetLeaderboard(e.parameter);
        break;
      default:
        result = { status: 'error', message: 'Unknown action: ' + action };
    }
  } catch (error) {
    result = { status: 'error', message: error.message };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * รับ POST requests
 */
function doPost(e) {
  var result = {};

  try {
    var body = JSON.parse(e.postData.contents);
    var action = body.action || '';

    switch (action) {
      case 'saveScore':
        result = handleSaveScore(body);
        break;
      case 'saveStudent':
        result = handleSaveStudent(body);
        break;
      default:
        result = { status: 'error', message: 'Unknown action: ' + action };
    }
  } catch (error) {
    result = { status: 'error', message: error.message };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================
// 📚 QUESTIONS — ดึงคำถาม
// ============================================

function handleGetQuestions(params) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Questions');
  if (!sheet) return { status: 'error', message: 'Sheet "Questions" not found' };

  var data = sheet.getDataRange().getValues();
  var headers = data[0]; // แถวแรกเป็นหัวตาราง
  var questions = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (!row[0]) continue; // ข้ามแถวว่าง

    var q = {
      id: row[0],
      subject: row[1],
      subjectName: getSubjectName(row[1]),
      grade: String(row[2]),
      topic: row[3],
      question: row[4],
      choices: [row[5], row[6], row[7], row[8]],
      answer: letterToIndex(row[9]), // A=0, B=1, C=2, D=3
      hint: row[10] || '',
      reward: row[11] || 'seed'
    };

    // กรองตามวิชา (ถ้าระบุ)
    if (params.subject && params.subject !== '' && q.subject !== params.subject) continue;

    // กรองตามระดับชั้น (ถ้าระบุ)
    if (params.grade && params.grade !== '' && q.grade !== params.grade) continue;

    questions.push(q);
  }

  return { status: 'success', questions: questions, total: questions.length };
}

// ============================================
// 📊 SCORES — บันทึกคะแนน
// ============================================

function handleSaveScore(body) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Scores');
  if (!sheet) {
    // สร้าง Sheet ถ้ายังไม่มี
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Scores');
    sheet.appendRow(['timestamp', 'studentName', 'questionId', 'isCorrect']);
  }

  sheet.appendRow([
    body.timestamp || new Date().toISOString(),
    body.studentName || 'unknown',
    body.questionId || '',
    body.isCorrect ? 'TRUE' : 'FALSE'
  ]);

  return { status: 'success', message: 'Score saved' };
}

// ============================================
// 👤 STUDENTS — บันทึกข้อมูลนักเรียน
// ============================================

function handleSaveStudent(body) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Students');
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Students');
    sheet.appendRow(['studentName', 'grade', 'level', 'exp', 'coins', 'lastPlayed']);
  }

  var studentData = body.studentData || {};
  var name = studentData.playerName || 'unknown';

  // ค้นหาว่ามีนักเรียนคนนี้แล้วหรือยัง
  var data = sheet.getDataRange().getValues();
  var rowIndex = -1;
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === name) {
      rowIndex = i + 1; // +1 เพราะ Sheet เริ่มที่ 1
      break;
    }
  }

  var rowData = [
    name,
    studentData.grade || '',
    studentData.level || 1,
    studentData.exp || 0,
    studentData.coins || 0,
    new Date().toISOString()
  ];

  if (rowIndex > 0) {
    // อัปเดตข้อมูลเดิม
    sheet.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);
  } else {
    // เพิ่มใหม่
    sheet.appendRow(rowData);
  }

  return { status: 'success', message: 'Student data saved' };
}

// ============================================
// 🏆 LEADERBOARD — กระดานคะแนน
// ============================================

function handleGetLeaderboard(params) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Students');
  if (!sheet) return { status: 'success', leaderboard: [] };

  var data = sheet.getDataRange().getValues();
  var leaderboard = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (!row[0]) continue;

    leaderboard.push({
      name: row[0],
      grade: row[1],
      level: row[2],
      exp: row[3],
      coins: row[4]
    });
  }

  // เรียงตาม exp มากสุด
  leaderboard.sort(function(a, b) { return b.exp - a.exp; });

  // จำกัด 20 อันดับ
  leaderboard = leaderboard.slice(0, 20);

  return { status: 'success', leaderboard: leaderboard };
}

// ============================================
// 🔧 HELPER FUNCTIONS
// ============================================

function letterToIndex(letter) {
  var map = { 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'a': 0, 'b': 1, 'c': 2, 'd': 3 };
  return map[letter] !== undefined ? map[letter] : 0;
}

function getSubjectName(subject) {
  var names = {
    'math': 'คณิตศาสตร์',
    'science': 'วิทยาศาสตร์',
    'social': 'สังคมศึกษา',
    'career': 'การงานอาชีพ',
    'thai': 'ภาษาไทย',
    'english': 'ภาษาอังกฤษ'
  };
  return names[subject] || subject;
}
