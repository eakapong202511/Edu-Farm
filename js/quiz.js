// =============================================
// 📚 QUIZ STATE — สถานะระบบคำถาม
// =============================================
function getEmergencyQuestions() {
  return [
    // 🧮 คณิตศาสตร์
    { id: 'M01', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '1-3', topic: 'การบวก', question: '5 + 3 = ?', choices: ['6', '7', '8', '9'], answer: 2, hint: 'ลองนับนิ้วมือดูนะ 🖐️✌️', reward: 'seed' },
    { id: 'M02', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '1-3', topic: 'การลบ', question: '10 - 4 = ?', choices: ['5', '6', '7', '8'], answer: 1, hint: 'มี 10 ลบออก 4 เหลือเท่าไร? 🤔', reward: 'seed' },
    { id: 'M03', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '1-3', topic: 'การคูณ', question: 'ข้าวโพด 1 ฝัก ราคา 5 บาท ซื้อ 3 ฝัก ต้องจ่ายเงินเท่าไร?', choices: ['10 บาท', '15 บาท', '20 บาท', '8 บาท'], answer: 1, hint: '5 + 5 + 5 = ? หรือ 5 × 3 = ?', reward: 'coin' },
    { id: 'M06', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '4-6', topic: 'การคูณ', question: 'ขายมะเขือเทศฝักละ 8 บาท ขายได้ 7 ฝัก จะได้เงินเท่าไร?', choices: ['48 บาท', '54 บาท', '56 บาท', '64 บาท'], answer: 2, hint: '8 × 7 = ? 🍅', reward: 'coin' },
    { id: 'M08', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '4-6', topic: 'กำไร-ขาดทุน', question: 'ซื้อเมล็ดข้าวมา 15 บาท ขายข้าวได้ 40 บาท ได้กำไรเท่าไร?', choices: ['15 บาท', '20 บาท', '25 บาท', '55 บาท'], answer: 2, hint: 'กำไร = ราคาขาย - ต้นทุน 💰', reward: 'coin' },

    // 🔬 วิทยาศาสตร์
    { id: 'S01', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '1-3', topic: 'สัตว์กินพืช', question: 'สัตว์ชนิดใดเป็นสัตว์กินพืช?', choices: ['สิงโต', 'วัว', 'เสือ', 'นกอินทรี'], answer: 1, hint: 'สัตว์ตัวนี้กินหญ้าเป็นอาหาร 🌿', reward: 'seed' },
    { id: 'S02', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '1-3', topic: 'ปัจจัยการเจริญเติบโต', question: 'พืชต้องการสิ่งใดในการเจริญเติบโต?', choices: ['น้ำ แสงแดด อากาศ', 'ทราย หิน ดิน', 'ลม ฝุ่น ควัน', 'เสียง สี กลิ่น'], answer: 0, hint: 'รดน้ำต้นไม้ แล้ววางไว้ที่มีแสงแดด 🌱', reward: 'seed' },
    { id: 'S05', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '1-3', topic: 'สัตว์เลี้ยง', question: 'สัตว์ชนิดใดให้ไข่เป็นอาหาร?', choices: ['วัว', 'แกะ', 'ไก่', 'ม้า'], answer: 2, hint: 'ตอนเช้าเราทานไข่ดาว ได้มาจากสัตว์ตัวไหนนะ? 🍳', reward: 'seed' },
    { id: 'S07', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '4-6', topic: 'การสังเคราะห์แสง', question: 'พืชใช้ส่วนใดในการสังเคราะห์แสง?', choices: ['ราก', 'ลำต้น', 'ใบ', 'ดอก'], answer: 2, hint: 'ส่วนนี้มีสีเขียวเพราะมีคลอโรฟิลล์ 🌿', reward: 'seed' },
    { id: 'S10', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '4-6', topic: 'ประเภทของดิน', question: 'ดินชนิดใดระบายน้ำได้ดีที่สุด แต่เก็บน้ำได้น้อยที่สุด?', choices: ['ดินเหนียว', 'ดินร่วน', 'ดินทราย', 'ดินโคลน'], answer: 2, hint: 'พบตามชายหาด เม็ดกรวดใหญ่', reward: 'seed' },

    // 🏛️ สังคมศึกษา & เศรษฐกิจพอเพียง
    { id: 'SO01', subject: 'social', subjectName: 'สังคมศึกษา', grade: '1-3', topic: 'การออม', question: 'ถ้ามีเงิน 20 บาท ซื้อขนม 5 บาท เหลือเงินเก็บเท่าไร?', choices: ['10 บาท', '15 บาท', '20 บาท', '25 บาท'], answer: 1, hint: '20 - 5 = ? 🐷💰', reward: 'coin' },
    { id: 'SO02', subject: 'social', subjectName: 'สังคมศึกษา', grade: '1-3', topic: 'เศรษฐกิจพอเพียง', question: 'หลักเศรษฐกิจพอเพียงสอนให้เราทำอย่างไร?', choices: ['ใช้จ่ายเงินให้หมด', 'ใช้จ่ายอย่างพอประมาณ', 'กู้เงินมาใช้', 'ซื้อของแพงที่สุด'], answer: 1, hint: 'พอเพียง = ไม่มากเกินไป ไม่น้อยเกินไป ⚖️', reward: 'coin' },
    { id: 'SO03', subject: 'social', subjectName: 'สังคมศึกษา', grade: '1-3', topic: 'อาชีพ', question: 'คนที่ปลูกข้าว ทำนา มีอาชีพเรียกว่าอะไร?', choices: ['ชาวประมง', 'ชาวนา', 'พ่อค้า', 'ครู'], answer: 1, hint: 'คนที่ปลูกข้าวในนาเรียกว่า...', reward: 'seed' },
    { id: 'SO05', subject: 'social', subjectName: 'สังคมศึกษา', grade: '4-6', topic: 'เศรษฐกิจพอเพียง', question: 'หลักเศรษฐกิจพอเพียงมี 3 ห่วง คือข้อใด?', choices: ['กิน นอน เล่น', 'พอประมาณ มีเหตุผล มีภูมิคุ้มกัน', 'ซื้อ ขาย แลก', 'ผลิต บริโภค บริการ'], answer: 1, hint: 'พ่อหลวง ร.9 ทรงสอนให้เรารู้จักพอประมาณ...', reward: 'coin' },
    { id: 'SO06', subject: 'social', subjectName: 'สังคมศึกษา', grade: '4-6', topic: 'การแปรรูป', question: 'การนำนมวัวมาทำชีส เรียกว่ากระบวนการอะไร?', choices: ['การเกษตร', 'การแปรรูป', 'การส่งออก', 'การเก็บเกี่ยว'], answer: 1, hint: 'การเปลี่ยนวัตถุดิบให้เป็นสินค้าใหม่ เรียกว่า...', reward: 'coin' },

    // 🌾 การงานอาชีพ & เกษตรกรรม
    { id: 'C01', subject: 'career', subjectName: 'การงานอาชีพ', grade: '1-3', topic: 'เครื่องมือเกษตร', question: 'เครื่องมือที่ใช้ขุดดินปลูกผักคืออะไร?', choices: ['กรรไกร', 'จอบ', 'ค้อน', 'ไขควง'], answer: 1, hint: 'เครื่องมือที่มีใบเหล็กแบนๆ ด้ามยาว', reward: 'seed' },
    { id: 'C02', subject: 'career', subjectName: 'การงานอาชีพ', grade: '1-3', topic: 'เครื่องมือเกษตร', question: 'เราใช้อะไรรดน้ำต้นไม้?', choices: ['ถังขยะ', 'บัวรดน้ำ', 'กระทะ', 'ตะกร้า'], answer: 1, hint: 'มีรูเล็กๆ ตรงหัวให้น้ำกระจายเป็นฝอย 💧', reward: 'seed' },
    { id: 'C04', subject: 'career', subjectName: 'การงานอาชีพ', grade: '1-3', topic: 'การเพาะปลูก', question: 'ก่อนปลูกผัก เราต้องทำอะไรเป็นอย่างแรก?', choices: ['รดน้ำ', 'ใส่ปุ๋ย', 'เตรียมดิน/ขุดดิน', 'เก็บเกี่ยว'], answer: 2, hint: 'ต้องทำให้ดินร่วนซุยก่อนที่จะหยอดเมล็ด', reward: 'seed' },
    { id: 'C06', subject: 'career', subjectName: 'การงานอาชีพ', grade: '4-6', topic: 'ปุ๋ยอินทรีย์', question: 'ข้อใดเป็นปุ๋ยอินทรีย์?', choices: ['ปุ๋ยเคมี', 'ปุ๋ยหมัก (จากเศษอาหาร/ใบไม้)', 'ยาฆ่าแมลง', 'สารเคมีกำจัดวัชพืช'], answer: 1, hint: 'ทำจากธรรมชาติ ไม่ใช่สารเคมี 🌿', reward: 'seed' },

    // 📖 ภาษาไทย
    { id: 'T01', subject: 'thai', subjectName: 'ภาษาไทย', grade: '1-3', topic: 'มาตราตัวสะกด', question: "คำว่า 'ข้าว' อยู่ในมาตราตัวสะกดใด?", choices: ['แม่กน', 'แม่เกอว', 'แม่กก', 'แม่กง'], answer: 1, hint: "ตัวสะกดคือ 'ว' อยู่ในแม่เกอว", reward: 'seed' },
    { id: 'T03', subject: 'thai', subjectName: 'ภาษาไทย', grade: '1-3', topic: 'ชนิดของคำ', question: "คำว่า 'วิ่ง' เป็นคำชนิดใด?", choices: ['คำนาม', 'คำกริยา', 'คำวิเศษณ์', 'คำสันธาน'], answer: 1, hint: 'คำที่บอกการกระทำเรียกว่าคำ... 🏃', reward: 'seed' },
    { id: 'T04', subject: 'thai', subjectName: 'ภาษาไทย', grade: '1-3', topic: 'การสะกดคำ', question: 'คำใดสะกดถูกต้อง?', choices: ['มะเคือเทศ', 'มะเขือเทด', 'มะเขือเทศ', 'มะเคือเทด'], answer: 2, hint: "ใช้ 'ข' ไข่ ไม่ใช่ 'ค' ควาย และลงท้ายด้วย 'ศ'", reward: 'seed' },
    { id: 'T05', subject: 'thai', subjectName: 'ภาษาไทย', grade: '4-6', topic: 'คำที่มีความหมาย', question: "'เศรษฐกิจพอเพียง' คำว่า 'พอเพียง' มีความหมายตรงกับข้อใด?", choices: ['มากเกินไป', 'น้อยเกินไป', 'พอดี เหมาะสม', 'ไม่มีเลย'], answer: 2, hint: 'พอเพียง = เพียงพอ = พอดีกับความต้องการ', reward: 'coin' },

    // 🔤 ภาษาอังกฤษ
    { id: 'E01', subject: 'english', subjectName: 'ภาษาอังกฤษ', grade: '1-3', topic: 'คำศัพท์สัตว์', question: "'Chicken' แปลว่าอะไร?", choices: ['วัว', 'หมู', 'ไก่', 'เป็ด'], answer: 2, hint: 'C-H-I-C-K-E-N สัตว์ที่ให้ไข่ 🍳', reward: 'seed' },
    { id: 'E02', subject: 'english', subjectName: 'ภาษาอังกฤษ', grade: '1-3', topic: 'คำศัพท์ผัก-ผลไม้', question: "'Corn' แปลว่าอะไร?", choices: ['ข้าว', 'ข้าวโพด', 'มันฝรั่ง', 'แตงโม'], answer: 1, hint: 'C-O-R-N พืชที่มีเมล็ดเหลืองเรียงอยู่บนฝัก', reward: 'seed' },
    { id: 'E04', subject: 'english', subjectName: 'ภาษาอังกฤษ', grade: '1-3', topic: 'คำศัพท์', question: "'Water' แปลว่าอะไร?", choices: ['ไฟ', 'ลม', 'น้ำ', 'ดิน'], answer: 2, hint: 'W-A-T-E-R เราใช้สิ่งนี้รดต้นไม้ 🚿', reward: 'seed' },
    { id: 'E05', subject: 'english', subjectName: 'ภาษาอังกฤษ', grade: '1-3', topic: 'คำศัพท์ผลไม้', question: "'Watermelon' แปลว่าอะไร?", choices: ['ส้ม', 'แตงโม', 'มะม่วง', 'กล้วย'], answer: 1, hint: 'Water (น้ำ) + Melon (แตง) = แตง...?', reward: 'seed' },
    { id: 'E08', subject: 'english', subjectName: 'ภาษาอังกฤษ', grade: '4-6', topic: 'คำศัพท์เกษตร', question: "'Harvest' แปลว่าอะไร?", choices: ['ปลูก', 'รดน้ำ', 'เก็บเกี่ยว', 'ขุดดิน'], answer: 2, hint: 'H-A-R-V-E-S-T เมื่อพืชโตเต็มที่เราจะ...', reward: 'coin' },

    // 🧮 คณิตศาสตร์เพิ่มเติม
    { id: 'M11', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '1-3', topic: 'การบวก', question: '7 + 8 = ?', choices: ['13', '14', '15', '16'], answer: 2, hint: '7 + 8 ได้เท่าไร?', reward: 'seed' },
    { id: 'M12', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '1-3', topic: 'การลบ', question: '20 - 7 = ?', choices: ['11', '12', '13', '14'], answer: 2, hint: 'มี 20 หักออก 7', reward: 'coin' },
    { id: 'M13', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '4-6', topic: 'ร้อยละ', question: 'ฝากเงินออมสิน 100 บาท ได้ดอกเบี้ยร้อยละ 5 จะได้ดอกเบี้ยกี่บาท?', choices: ['3 บาท', '5 บาท', '10 บาท', '50 บาท'], answer: 1, hint: 'ร้อยละ 5 จาก 100 บาท = 5 บาท', reward: 'coin' },
    { id: 'M14', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '4-6', topic: 'พื้นที่', question: 'แปลงผักทรงสี่เหลี่ยมผืนผ้า กว้าง 2 เมตร ยาว 5 เมตร มีพื้นที่กี่ตารางเมตร?', choices: ['7 ตารางเมตร', '10 ตารางเมตร', '12 ตารางเมตร', '15 ตารางเมตร'], answer: 1, hint: 'พื้นที่ = กว้าง × ยาว', reward: 'coin' },
    { id: 'M15', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '1-3', topic: 'การหาร', question: 'มีไข่ไก่ 12 ฟอง แบ่งใส่ถาด ถาดละ 4 ฟอง จะได้กี่ถาด?', choices: ['2 ถาด', '3 ถาด', '4 ถาด', '6 ถาด'], answer: 1, hint: '12 ÷ 4 = ?', reward: 'seed' },
    { id: 'M16', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '4-6', topic: 'เศษส่วน', question: 'มีผลไม้ 10 ลูก เป็นแตงโม 4 ลูก คิดเป็นเศษส่วนเท่าไรของทั้งหมด?', choices: ['1/2', '2/5', '3/5', '4/5'], answer: 1, hint: '4/10 ตัดทอนเศษส่วนอย่างต่ำได้ 2/5', reward: 'coin' },

    // 🔬 วิทยาศาสตร์เพิ่มเติม
    { id: 'S12', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '1-3', topic: 'หน้าที่ของราก', question: 'รากของพืชทำหน้าที่อะไรเป็นหลัก?', choices: ['สังเคราะห์แสง', 'ดูดน้ำและแร่ธาตุ', 'ชูใบรับแสง', 'ล่อแมลงมาผสมเกสร'], answer: 1, hint: 'รากฝังอยู่ในดินคอยดูดสิ่งนี้', reward: 'seed' },
    { id: 'S13', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '4-6', topic: 'สถานะของสาร', question: 'น้ำเปล่าที่นำไปแช่ในช่องฟรีซจะเปลี่ยนสถานะเป็นอะไร?', choices: ['ของแข็ง (น้ำแข็ง)', 'ของเหลว', 'แก๊ส/ไอ', 'พลาสมา'], answer: 0, hint: 'น้ำเปลี่ยนจากของเหลวกลายเป็นน้ำแข็ง', reward: 'seed' },
    { id: 'S14', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '1-3', topic: 'สัตว์กินสัตว์', question: 'สัตว์ชนิดใดจัดเป็นสัตว์กินเนื้อ (Carnivore)?', choices: ['วัว', 'กระต่าย', 'เสือ', 'ม้า'], answer: 2, hint: 'สัตว์ตัวนี้ล่าสัตว์อื่นเป็นอาหาร', reward: 'seed' },
    { id: 'S15', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '4-6', topic: 'การหมุนเวียนอากาศ', question: 'แก๊สชนิดใดที่พืชปล่อยออกมาในกระบวนการสังเคราะห์แสง?', choices: ['คาร์บอนไดออกไซด์', 'ออกซิเจน', 'ไนโตรเจน', 'มีเทน'], answer: 1, hint: 'แก๊สที่คนเราใช้หายใจสดชื่น', reward: 'seed' },
    { id: 'S16', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '1-3', topic: 'ส่วนประกอบของพืช', question: 'ส่วนใดของพืชทำหน้าที่สืบพันธุ์?', choices: ['ราก', 'ลำต้น', 'ใบ', 'ดอก'], answer: 3, hint: 'ส่วนที่มีสีสันสวยงามผสมเกสร', reward: 'seed' },

    // 🏛️ สังคมศึกษาเพิ่มเติม
    { id: 'SO11', subject: 'social', subjectName: 'สังคมศึกษา', grade: '1-3', topic: 'การซื้อขาย', question: 'สิ่งใดเป็นสื่อกลางในการแลกเปลี่ยนสินค้าในปัจจุบัน?', choices: ['หิน', 'เปลือกหอย', 'เงินเหรียญและธนบัตร', 'ใบไม้'], answer: 2, hint: 'เราใช้สิ่งนี้ซื้อสินค้าในตลาด', reward: 'coin' },
    { id: 'SO12', subject: 'social', subjectName: 'สังคมศึกษา', grade: '4-6', topic: 'ความซื่อสัตย์', question: 'ถ้าทอนเงินให้ลูกค้าเกิน ควรทำอย่างไร?', choices: ['เก็บไว้เอง', 'คืนเงินส่วนเกินให้ลูกค้า', 'นำไปซื้อขนม', 'แกล้งทำเป็นไม่รู้'], answer: 1, hint: 'ความซื่อสัตย์สุจริตเป็นคุณธรรมของแม่ค้าที่ดี', reward: 'coin' },
    { id: 'SO13', subject: 'social', subjectName: 'สังคมศึกษา', grade: '4-6', topic: 'ธนาคาร', question: 'สถาบันการเงินที่ทำหน้าที่รับฝากเงินออมเรียกว่าอะไร?', choices: ['สถานีตำรวจ', 'โรงพยาบาล', 'ธนาคาร', 'โรงเรียน'], answer: 2, hint: 'สถานที่ที่มีตู้เซฟรับฝากเงินออม', reward: 'coin' },

    // 🌾 การงานอาชีพเพิ่มเติม
    { id: 'C09', subject: 'career', subjectName: 'การงานอาชีพ', grade: '1-3', topic: 'การดูแลพืช', question: 'เมื่อเห็นวัชพืช (หญ้า) ขึ้นในแปลงผัก ควรทำอย่างไร?', choices: ['ปล่อยทิ้งไว้', 'ถอนหรือขุดออก', 'รดน้ำเพิ่ม', 'ใส่ปุ๋ยให้หญ้า'], answer: 1, hint: 'วัชพืชแย่งอาหารของพืชผักเรา', reward: 'seed' },
    { id: 'C10', subject: 'career', subjectName: 'การงานอาชีพ', grade: '4-6', topic: 'การแปรรูป', question: 'การนำส้มมาคั้นเป็นน้ำส้มพร้อมดื่ม เรียกว่าอะไร?', choices: ['การแปรรูปอาหาร', 'การทำลาย', 'การผสมเคมี', 'การหมักดอง'], answer: 0, hint: 'เปลี่ยนผลไม้สดเป็นเครื่องดื่มรสอร่อย', reward: 'coin' },
    { id: 'C11', subject: 'career', subjectName: 'การงานอาชีพ', grade: '1-3', topic: 'ความปลอดภัย', question: 'หลังจากใช้งานจอบขุดดินเสร็จแล้ว ควรทำอย่างไร?', choices: ['วางทิ้งไว้บนพื้น', 'ทำความสะอาดแล้วเก็บเข้าที่ให้เรียบร้อย', 'โยนลงสระน้ำ', 'ตากแดดไว้'], answer: 1, hint: 'ทำความสะอาดเครื่องมือเก็บให้ปลอดภัย', reward: 'seed' },

    // 📖 ภาษาไทยเพิ่มเติม
    { id: 'T10', subject: 'thai', subjectName: 'ภาษาไทย', grade: '1-3', topic: 'คำนาม', question: "คำใดจัดเป็น 'คำนาม' ที่หมายถึงสิ่งของ?", choices: ['วิ่ง', 'สมุด', 'สวย', 'เดิน'], answer: 1, hint: 'คำนามใช้เรียกชื่อ คน สัตว์ สิ่งของ', reward: 'seed' },
    { id: 'T11', subject: 'thai', subjectName: 'ภาษาไทย', grade: '4-6', topic: 'สำนวนไทย', question: "สำนวน 'ขยันเหมือนมด' หมายถึงอะไร?", choices: ['เป็นคนขี้เกียจ', 'เป็นคนขยันอดทนทำงาน', 'เป็นคนตัวเล็ก', 'ชอบกินของหวาน'], answer: 1, hint: 'มดเป็นสัตว์ที่ขยันขนอาหารตลอดเวลา', reward: 'coin' },
    { id: 'T12', subject: 'thai', subjectName: 'ภาษาไทย', grade: '1-3', topic: 'สระ', question: "คำว่า 'พรวน' ใช้สระใดในการเขียน?", choices: ['สระอัว', 'สระอา', 'สระอู', 'สระอี'], answer: 0, hint: 'พ + ร + สระอัว + น = พรวน', reward: 'seed' },

    // 🔤 ภาษาอังกฤษเพิ่มเติม
    { id: 'E11', subject: 'english', subjectName: 'ภาษาอังกฤษ', grade: '1-3', topic: 'คำศัพท์', question: "'Farmer' แปลว่าอะไร?", choices: ['หมอ', 'ชาวนา/เกษตรกร', 'ตำรวจ', 'ทหาร'], answer: 1, hint: 'F-A-R-M-E-R คนที่ทำงานในฟาร์ม', reward: 'seed' },
    { id: 'E12', subject: 'english', subjectName: 'ภาษาอังกฤษ', grade: '4-6', topic: 'ประโยค', question: "'I love planting vegetables.' แปลว่าอะไร?", choices: ['ฉันชอบกินผัก', 'ฉันชอบปลูกผัก', 'ฉันชอบขายผัก', 'ฉันชอบซื้อผัก'], answer: 1, hint: 'plant = ปลูก, vegetables = ผัก', reward: 'coin' },
    { id: 'E13', subject: 'english', subjectName: 'ภาษาอังกฤษ', grade: '1-3', topic: 'คำศัพท์', question: "'Milk' แปลว่าอะไร?", choices: ['น้ำชา', 'กาแฟ', 'นมสด', 'น้ำผลไม้'], answer: 2, hint: 'M-I-L-K เครื่องดื่มจากแม่วัว 🐄', reward: 'seed' }
  ];
}

let allQuestions = getEmergencyQuestions(); // คำถามเริ่มต้นฉุกเฉิน
let currentQuiz = null;         // คำถามปัจจุบัน
let quizCallback = null;        // ฟังก์ชันที่จะเรียกเมื่อตอบเสร็จ
let quizStats = {               // สถิติการตอบ
  totalAnswered: 0,
  totalCorrect: 0,
  streak: 0                    // ตอบถูกติดต่อกัน
};

// =============================================
// 📥 LOAD QUESTIONS — โหลดคำถาม
// =============================================

/**
 * โหลดคำถามจาก JSON (offline) หรือ Google Sheets (online)
 */
async function loadQuestions() {
  try {
    // ลอง fetch จาก Google Sheets ก่อน (ถ้ามี API URL)
    if (typeof API_CONFIG !== 'undefined' && API_CONFIG.APPS_SCRIPT_URL) {
      try {
        const onlineQuestions = await ApiService.getQuestions();
        if (onlineQuestions && onlineQuestions.length > 0) {
          allQuestions = onlineQuestions;
          console.log(`✅ โหลดคำถามจาก Google Sheets สำเร็จ: ${allQuestions.length} ข้อ`);
          return;
        }
      } catch (e) {
        console.warn('⚠️ ไม่สามารถโหลดจาก Google Sheets ใช้คำถาม Offline แทน:', e.message);
      }
    }

    // Fallback: โหลดจากไฟล์ JSON ในเครื่อง
    const response = await fetch('data/questions.json');
    if (!response.ok) throw new Error('Failed to load questions.json');
    
    const data = await response.json();
    allQuestions = data.questions || [];
    console.log(`✅ โหลดคำถาม Offline สำเร็จ: ${allQuestions.length} ข้อ`);
    
  } catch (e) {
    console.error('❌ โหลดคำถามล้มเหลว:', e);
    // ใช้คำถามสำรองขั้นต่ำ
    allQuestions = getEmergencyQuestions();
    console.log('⚠️ ใช้คำถามสำรองฉุกเฉิน');
  }
}

// =============================================
// 🎯 QUIZ SELECTION — เลือกคำถาม
// =============================================

let askedQuestionIds = [];

/**
 * สุ่มเลือกคำถามตามเงื่อนไข (ไม่ซ้ำข้อเดิม)
 */
function getRandomQuestion(subject = null, gradeGroup = null) {
  let pool = [...allQuestions];

  // กรองคำถามที่ไม่เคยถามในรอบนี้เพื่อไม่ให้ซ้ำ
  let unaskedPool = pool.filter(q => !askedQuestionIds.includes(q.id));
  if (unaskedPool.length === 0) {
    askedQuestionIds = []; // รีเซ็ตประวัติถ้าถามครบทุกข้อแล้ว
    unaskedPool = [...pool];
  }
  pool = unaskedPool;

  // กรองตามระดับชั้น
  if (gradeGroup) {
    const gradeFiltered = pool.filter(q => q.grade === gradeGroup);
    if (gradeFiltered.length > 0) {
      pool = gradeFiltered;
    }
  }

  if (pool.length === 0) pool = [...allQuestions];
  if (pool.length === 0) return null;

  // สุ่มเลือกข้อที่ไม่ซ้ำ
  const randomIndex = Math.floor(Math.random() * pool.length);
  const chosen = pool[randomIndex];

  if (chosen) {
    askedQuestionIds.push(chosen.id);
  }

  return chosen;
}

/**
 * กำหนดกลุ่มระดับชั้นจากเลเวล/ชั้น ของผู้เล่น
 */
function getGradeGroup(grade) {
  const g = parseInt(grade);
  if (g <= 3) return '1-3';
  return '4-6';
}

// =============================================
// 🪟 QUIZ UI — แสดงคำถาม Pop-up
// =============================================

/**
 * เลือกวิชาที่เหมาะกับกิจกรรม (null = สุ่มทุกวิชาครบถ้วน)
 */
function getSubjectForActivity(activity) {
  return null;
}

/**
 * แสดงคำถามและรอคำตอบ
 * @param {string} activity - กิจกรรม ('plant', 'water', 'harvest')
 * @param {function} onComplete - callback(isCorrect, bonusCoins, bonusExp)
 */
function showQuiz(activity, onComplete) {
  // กำหนดระดับชั้นจากข้อมูลผู้เล่น
  const gradeGroup = gameState ? getGradeGroup(gameState.grade) : '1-3';
  
  // เลือกวิชาที่เหมาะกับกิจกรรม
  const subject = getSubjectForActivity(activity);
  
  // สุ่มคำถาม
  const question = getRandomQuestion(subject, gradeGroup);
  
  if (!question) {
    // ไม่มีคำถาม → ให้ผ่านเลย
    if (onComplete) onComplete(true, 0, 0);
    return;
  }

  currentQuiz = question;
  quizCallback = onComplete;

  // สร้างและแสดง UI
  renderQuizModal(question, activity);
  ModalSystem.open('quizModal');
}

/**
 * กรองลบรูปและอิโมจิออกจากตัวเลือกคำตอบ เพื่อไม่ให้เด็กเดาคำตอบได้
 */
function sanitizeChoiceText(text) {
  if (!text) return '';
  return text.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}]/gu, '').trim();
}

/**
 * สร้าง HTML ของ Quiz Modal
 */
function renderQuizModal(question, activity) {
  const modal = document.getElementById('quizModal');
  if (!modal) return;

  const activityIcons = {
    'plant': '🌱',
    'water': '💧',
    'harvest': '🧺',
    'shop': '🛒',
    'default': '❓'
  };

  const activityNames = {
    'plant': 'ก่อนปลูก',
    'water': 'ก่อนรดน้ำ',
    'harvest': 'ก่อนเก็บเกี่ยว',
    'shop': 'ก่อนซื้อขาย',
    'default': 'คำถาม'
  };

  const icon = activityIcons[activity] || activityIcons['default'];
  const actName = activityNames[activity] || activityNames['default'];

  // สร้าง subject badge สี
  const subjectColors = {
    math: '#1976D2',
    science: '#388E3C',
    social: '#E65100',
    career: '#6D4C41',
    thai: '#7B1FA2',
    english: '#C62828'
  };

  const subjectColor = subjectColors[question.subject] || '#757575';

  const content = modal.querySelector('.modal-content');
  if (!content) return;

  content.innerHTML = `
    <div class="modal-header">
      <h3 class="modal-title">${icon} ${actName} — ตอบคำถาม!</h3>
    </div>
    <div class="modal-body">
      <!-- วิชา + หัวข้อ -->
      <div class="quiz-subject-badge" style="background: ${subjectColor}; color: white; display: inline-block; padding: 4px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; margin-bottom: 12px;">
        📚 ${question.subjectName} — ${question.topic}
      </div>

      <!-- คำถาม -->
      <div class="quiz-question">
        <p class="quiz-question-text">${question.question}</p>
      </div>

      <!-- ตัวเลือก (กรองอิโมจิออกทั้งหมด เหลือแต่ตัวหนังสือ) -->
      <div class="quiz-choices" id="quizChoices">
        ${question.choices.map((choice, index) => `
          <button class="quiz-choice-btn" data-index="${index}" onclick="handleQuizAnswer(${index})">
            <span class="quiz-choice-label">${String.fromCharCode(65 + index)}</span>
            <span class="quiz-choice-text">${sanitizeChoiceText(choice)}</span>
          </button>
        `).join('')}
      </div>

      <!-- คำใบ้ (ซ่อนอยู่) -->
      <div class="quiz-hint-section hidden" id="quizHintSection">
        <button class="btn btn-sm btn-secondary" id="quizHintBtn" onclick="showQuizHint()">
          💡 ขอคำใบ้
        </button>
        <p class="quiz-hint-text hidden" id="quizHintText"></p>
      </div>

      <!-- ผลลัพธ์ (ซ่อนอยู่) -->
      <div class="quiz-result hidden" id="quizResult">
        <div class="quiz-result-icon" id="quizResultIcon"></div>
        <p class="quiz-result-text" id="quizResultText"></p>
        <p class="quiz-result-explain" id="quizResultExplain"></p>
      </div>
    </div>
    <div class="modal-footer hidden" id="quizFooter">
      <button class="btn btn-primary" id="quizContinueBtn" onclick="closeQuizAndContinue()">
        ไปต่อเลย! 👍
      </button>
    </div>
  `;

  // แสดงปุ่มคำใบ้หลัง 3 วินาที
  setTimeout(() => {
    const hintSection = document.getElementById('quizHintSection');
    if (hintSection) hintSection.classList.remove('hidden');
  }, 3000);
}

// =============================================
// ✅ ANSWER HANDLING — ตรวจคำตอบ
// =============================================

/**
 * จัดการเมื่อผู้เล่นเลือกตอบ
 */
function handleQuizAnswer(selectedIndex) {
  if (!currentQuiz) return;

  const isCorrect = selectedIndex === currentQuiz.answer;
  const choiceBtns = document.querySelectorAll('.quiz-choice-btn');

  // ปิดปุ่มทั้งหมด
  choiceBtns.forEach(btn => {
    btn.disabled = true;
    btn.style.pointerEvents = 'none';
  });

  // ไฮไลท์คำตอบ
  choiceBtns.forEach((btn, index) => {
    if (index === currentQuiz.answer) {
      btn.classList.add('quiz-choice-correct');
    } else if (index === selectedIndex && !isCorrect) {
      btn.classList.add('quiz-choice-wrong');
    } else {
      btn.classList.add('quiz-choice-disabled');
    }
  });

  // อัปเดตสถิติ
  quizStats.totalAnswered++;
  if (isCorrect) {
    quizStats.totalCorrect++;
    quizStats.streak++;
    if (typeof QuestManager !== 'undefined') {
      QuestManager.trackProgress('quiz', 1);
    }
    if (typeof AudioManager !== 'undefined') {
      AudioManager.playCorrect();
    }
  } else {
    quizStats.streak = 0;
    if (typeof AudioManager !== 'undefined') {
      AudioManager.playWrong();
    }
  }

  // คำนวณโบนัส
  let bonusCoins = 0;
  let bonusExp = 0;

  if (isCorrect) {
    bonusCoins = 5;
    bonusExp = 3;

    // โบนัสตอบถูกติดต่อกัน
    if (quizStats.streak >= 3) {
      bonusCoins += 3;
      bonusExp += 2;
    }
    if (quizStats.streak >= 5) {
      bonusCoins += 5;
      bonusExp += 3;
    }
  }

  // แสดงผลลัพธ์
  showQuizResult(isCorrect, bonusCoins, bonusExp);

  // บันทึกคะแนน (ถ้ามี API)
  if (typeof ApiService !== 'undefined' && ApiService.saveScore) {
    ApiService.saveScore(
      gameState ? gameState.playerName : 'unknown',
      currentQuiz.id,
      isCorrect
    ).catch(e => console.warn('Score save failed:', e));
  }

  // เก็บ callback result
  currentQuiz._result = { isCorrect, bonusCoins, bonusExp };

  // อัตโนมัติเปิดไปต่อหลังจาก 1.2 วินาที (ไม่ต้องเสียเวลาเลื่อนลงมากด!)
  let autoAdvanceTimer = setTimeout(() => {
    closeQuizAndContinue();
  }, 1200);

  // ให้คลิกที่ไหนก็ได้ใน Modal เพื่อข้ามเวลารอได้ทันที
  const modalContent = document.querySelector('#quizModal .modal-content');
  if (modalContent) {
    const quickSkip = () => {
      clearTimeout(autoAdvanceTimer);
      modalContent.removeEventListener('click', quickSkip);
      closeQuizAndContinue();
    };
    modalContent.addEventListener('click', quickSkip);
  }
}

/**
 * แสดงผลลัพธ์การตอบ (แบบกะทัดรัดอยู่ในหน้าเดียว)
 */
function showQuizResult(isCorrect, bonusCoins, bonusExp) {
  const resultDiv = document.getElementById('quizResult');
  const resultIcon = document.getElementById('quizResultIcon');
  const resultText = document.getElementById('quizResultText');
  const resultExplain = document.getElementById('quizResultExplain');

  if (!resultDiv) return;

  // ซ่อนปุ่มคำใบ้
  const hintSection = document.getElementById('quizHintSection');
  if (hintSection) hintSection.classList.add('hidden');

  if (isCorrect) {
    resultIcon.textContent = '🎉';
    resultIcon.style.fontSize = '1.8rem';

    let msg = 'เก่งมาก! ตอบถูก!';
    if (quizStats.streak >= 3) {
      msg = `🔥 ถูก ${quizStats.streak} ข้อติด! (+${bonusCoins}💰 +${bonusExp}⭐)`;
    }
    resultText.textContent = msg;
    resultText.style.color = '#2E7D32';
    resultText.style.fontSize = '1.1rem';
    resultExplain.textContent = 'กำลังไปต่อ... 🚀 (คลิกเพื่อข้ามได้เลย)';
    resultExplain.style.color = '#795548';
  } else {
    resultIcon.textContent = '💪';
    resultIcon.style.fontSize = '1.8rem';
    resultText.textContent = 'ไม่เป็นไรนะ ลองใหม่!';
    resultText.style.color = '#C62828';
    resultText.style.fontSize = '1.1rem';

    const correctAnswer = currentQuiz.choices[currentQuiz.answer];
    resultExplain.textContent = `เฉลย: "${correctAnswer}"`;
    resultExplain.style.color = '#5D4037';
  }

  resultDiv.classList.remove('hidden');
}

/**
 * แสดงคำใบ้
 */
function showQuizHint() {
  if (!currentQuiz) return;

  const hintText = document.getElementById('quizHintText');
  const hintBtn = document.getElementById('quizHintBtn');
  
  if (hintText && currentQuiz.hint) {
    hintText.textContent = `💡 ${currentQuiz.hint}`;
    hintText.classList.remove('hidden');
    hintText.classList.add('anim-fade-in');
  }
  
  if (hintBtn) {
    hintBtn.disabled = true;
    hintBtn.textContent = '💡 แสดงคำใบ้แล้ว';
  }
}

/**
 * ปิด Quiz Modal และเรียก callback
 */
function closeQuizAndContinue() {
  ModalSystem.close('quizModal');

  if (quizCallback && currentQuiz && currentQuiz._result) {
    const { isCorrect, bonusCoins, bonusExp } = currentQuiz._result;
    
    // ให้โบนัส
    if (isCorrect && gameState) {
      gameState.coins += bonusCoins;
      gameState.exp += bonusExp;
      
      const newLevel = LevelSystem.calculateLevel(gameState.exp);
      if (newLevel > gameState.level) {
        gameState.level = newLevel;
        ToastSystem.show(`🎊 เลเวลอัพ! Lv.${gameState.level}!`, 'success');
      }
      
      renderHUD();
      SaveSystem.save(gameState);
    }

    // เรียก callback — แจ้ง farm.js ว่าตอบถูก/ผิด
    quizCallback(isCorrect, bonusCoins, bonusExp);
  }

  // Reset
  currentQuiz = null;
  quizCallback = null;
}

// =============================================
// 🚀 INIT QUIZ — เริ่มต้นระบบคำถาม
// =============================================
async function initQuiz() {
  await loadQuestions();
  
  // โหลดสถิติเดิม
  const savedStats = localStorage.getItem('edufarm_quiz_stats');
  if (savedStats) {
    try {
      const parsed = JSON.parse(savedStats);
      quizStats = { ...quizStats, ...parsed };
    } catch (e) { /* ignore */ }
  }

  console.log('📚 ระบบคำถามพร้อมใช้งาน!');
}

// เซฟสถิติ quiz เมื่อปิดหน้า
window.addEventListener('beforeunload', () => {
  localStorage.setItem('edufarm_quiz_stats', JSON.stringify(quizStats));
});
