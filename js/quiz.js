// =============================================
// 📚 QUIZ STATE — สถานะระบบคำถาม
// =============================================
function getEmergencyQuestions() {
  return [
    // 🧮 คณิตศาสตร์ (20 ข้อ)
    { id: 'M01', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '1-3', topic: 'การบวก', question: '5 + 3 = ?', choices: ['6', '7', '8', '9'], answer: 2, hint: 'ลองนับนิ้วมือดูนะ 🖐️✌️', reward: 'seed' },
    { id: 'M02', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '1-3', topic: 'การลบ', question: '10 - 4 = ?', choices: ['5', '6', '7', '8'], answer: 1, hint: 'มี 10 ลบออก 4 เหลือเท่าไร? 🤔', reward: 'seed' },
    { id: 'M03', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '1-3', topic: 'การคูณ', question: 'ข้าวโพด 1 ฝัก ราคา 5 บาท ซื้อ 3 ฝัก ต้องจ่ายเงินเท่าไร?', choices: ['10 บาท', '15 บาท', '20 บาท', '8 บาท'], answer: 1, hint: '5 + 5 + 5 = ? หรือ 5 × 3 = ?', reward: 'coin' },
    { id: 'M04', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '1-3', topic: 'การนับ', question: 'นับเลขต่อ: 2, 4, 6, 8, ___', choices: ['9', '10', '11', '12'], answer: 1, hint: 'นับเพิ่มทีละ 2 นะ', reward: 'seed' },
    { id: 'M05', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '1-3', topic: 'การเปรียบเทียบ', question: 'จำนวนใดมีค่ามากที่สุด?', choices: ['15', '12', '19', '17'], answer: 2, hint: 'ดูตัวเลขในหลักหน่วย ตัวไหนมากที่สุด', reward: 'coin' },
    { id: 'M06', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '1-3', topic: 'การบวก', question: '7 + 8 = ?', choices: ['13', '14', '15', '16'], answer: 2, hint: '7 เพิ่มอีก 8 เป็นเท่าไร?', reward: 'seed' },
    { id: 'M07', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '1-3', topic: 'การลบ', question: '20 - 7 = ?', choices: ['11', '12', '13', '14'], answer: 2, hint: 'หักออก 7 จาก 20', reward: 'coin' },
    { id: 'M08', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '1-3', topic: 'การหาร', question: 'มีไข่ไก่ 12 ฟอง แบ่งใส่ถาด ถาดละ 4 ฟอง จะได้กี่ถาด?', choices: ['2 ถาด', '3 ถาด', '4 ถาด', '6 ถาด'], answer: 1, hint: '12 ÷ 4 = ?', reward: 'seed' },
    { id: 'M09', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '1-3', topic: 'เงินทอน', question: 'ซื้อผัก 12 บาท จ่ายแบงก์ 20 บาท ได้เงินทอนกี่บาท?', choices: ['6 บาท', '8 บาท', '10 บาท', '12 บาท'], answer: 1, hint: '20 - 12 = ? 💰', reward: 'coin' },
    { id: 'M10', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '1-3', topic: 'รูปทรงเรขาคณิต', question: 'รูปสามเหลี่ยมมีกี่ด้าน กี่มุม?', choices: ['3 ด้าน 3 มุม 📐', '4 ด้าน 4 มุม', '5 ด้าน 5 มุม', 'ไม่มีด้าน'], answer: 0, hint: 'สามเหลี่ยม = มี 3 ด้าน 3 มุม', reward: 'seed' },
    { id: 'M11', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '4-6', topic: 'การคูณ', question: 'ขายมะเขือเทศฝักละ 8 บาท ขายได้ 7 ฝัก จะได้เงินเท่าไร?', choices: ['48 บาท', '54 บาท', '56 บาท', '64 บาท'], answer: 2, hint: '8 × 7 = ? 🍅', reward: 'coin' },
    { id: 'M12', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '4-6', topic: 'การหาร', question: 'มีแตงโม 24 ลูก แบ่งใส่ลังๆ ละ 6 ลูก จะได้กี่ลัง?', choices: ['3 ลัง', '4 ลัง', '5 ลัง', '6 ลัง'], answer: 1, hint: '24 ÷ 6 = ? 🍉', reward: 'seed' },
    { id: 'M13', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '4-6', topic: 'กำไร-ขาดทุน', question: 'ซื้อเมล็ดข้าวมา 15 บาท ขายข้าวได้ 40 บาท ได้กำไรเท่าไร?', choices: ['15 บาท', '20 บาท', '25 บาท', '55 บาท'], answer: 2, hint: 'กำไร = ราคาขาย - ต้นทุน 💰', reward: 'coin' },
    { id: 'M14', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '4-6', topic: 'เศษส่วน', question: 'มีพื้นที่ปลูกผัก 8 แปลง ใช้ปลูกข้าวไป 2 แปลง ปลูกข้าวไปเท่าไรของทั้งหมด?', choices: ['1/2', '1/3', '1/4', '2/3'], answer: 2, hint: '2 จาก 8 คือ 2/8 ลดรูปได้เป็น 1/4', reward: 'seed' },
    { id: 'M15', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '4-6', topic: 'ร้อยละ', question: 'ปลูกทานตะวัน 20 ต้น ออกดอก 15 ต้น คิดเป็นร้อยละเท่าไร?', choices: ['50%', '60%', '70%', '75%'], answer: 3, hint: '15/20 × 100 = 75%', reward: 'coin' },
    { id: 'M16', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '4-6', topic: 'เวลา', question: '1 ชั่วโมง มีกี่นาที?', choices: ['30 นาที', '50 นาที', '60 นาที ⏰', '100 นาที'], answer: 2, hint: 'เข็มยาวเดินครบ 1 รอบ = 60 นาที', reward: 'coin' },
    { id: 'M17', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '4-6', topic: 'ดอกเบี้ย', question: 'ฝากเงิน 100 บาท ได้ดอกเบี้ยร้อยละ 5 จะได้ดอกเบี้ยกี่บาท?', choices: ['3 บาท', '5 บาท 🪙', '10 บาท', '50 บาท'], answer: 1, hint: 'ร้อยละ 5 จาก 100 บาท = 5 บาท', reward: 'coin' },
    { id: 'M18', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '4-6', topic: 'พื้นที่', question: 'แปลงผักกว้าง 2 เมตร ยาว 5 เมตร มีพื้นที่กี่ตารางเมตร?', choices: ['7 ตารางเมตร', '10 ตารางเมตร 📐', '12 ตารางเมตร', '15 ตารางเมตร'], answer: 1, hint: 'พื้นที่ = กว้าง × ยาว', reward: 'coin' },
    { id: 'M19', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '4-6', topic: 'ทศนิยม', question: '0.5 คิดเป็นเศษส่วนเท่ากับข้อใด?', choices: ['1/2 🎯', '1/3', '1/4', '1/5'], answer: 0, hint: '0.5 คือ ครึ่งหนึ่ง หรือ 1/2', reward: 'seed' },
    { id: 'M20', subject: 'math', subjectName: 'คณิตศาสตร์', grade: '4-6', topic: 'การหารยาว', question: '150 ÷ 5 = ?', choices: ['20', '25', '30 🎯', '35'], answer: 2, hint: '15 ÷ 5 = 3 เติม 0 เป็น 30', reward: 'coin' },

    // 🔬 วิทยาศาสตร์ (20 ข้อ)
    { id: 'S01', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '1-3', topic: 'สัตว์กินพืช', question: 'สัตว์ชนิดใดเป็นสัตว์กินพืช?', choices: ['สิงโต 🦁', 'วัว 🐄', 'เสือ 🐯', 'นกอินทรี 🦅'], answer: 1, hint: 'สัตว์ตัวนี้กินหญ้าเป็นอาหาร 🌿', reward: 'seed' },
    { id: 'S02', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '1-3', topic: 'ปัจจัยการเจริญเติบโต', question: 'พืชต้องการสิ่งใดในการเจริญเติบโต?', choices: ['น้ำ แสงแดด อากาศ ☀️', 'ทราย หิน ดิน 🪨', 'ลม ฝุ่น ควัน 💨', 'เสียง สี กลิ่น 🎵'], answer: 0, hint: 'รดน้ำต้นไม้ แล้ววางไว้ตรงที่มีแสงแดด 🌱', reward: 'seed' },
    { id: 'S03', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '1-3', topic: 'วัฏจักรชีวิตพืช', question: 'ลำดับการเจริญเติบโตของพืชที่ถูกต้องคือข้อใด?', choices: ['ดอก → เมล็ด → ต้นอ่อน → ผล', 'เมล็ด → ต้นอ่อน → ต้นโต → ดอก', 'ต้นโต → เมล็ด → ดอก → ผล', 'ผล → ดอก → ต้นอ่อน → เมล็ด'], answer: 1, hint: 'เริ่มจากเมล็ดก่อน แล้วค่อยๆ เติบโตขึ้น 🌱➡️🌿➡️🌳', reward: 'seed' },
    { id: 'S04', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '1-3', topic: 'สิ่งมีชีวิต', question: 'สิ่งใดเป็นสิ่งมีชีวิต?', choices: ['ก้อนหิน 🪨', 'ต้นข้าว 🌾', 'น้ำในแม่น้ำ 🌊', 'ดินในแปลง 🟫'], answer: 1, hint: 'สิ่งมีชีวิตต้องกินอาหาร หายใจ และเจริญเติบโต', reward: 'seed' },
    { id: 'S05', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '1-3', topic: 'สัตว์เลี้ยง', question: 'สัตว์ชนิดใดให้ไข่เป็นอาหาร?', choices: ['วัว 🐄', 'แกะ 🐑', 'ไก่ 🐔', 'ม้า 🐴'], answer: 2, hint: 'ตอนเช้าเราทานไข่ดาว ได้มาจากสัตว์ตัวไหนนะ? 🍳', reward: 'seed' },
    { id: 'S06', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '1-3', topic: 'หน้าที่ของราก', question: 'รากของพืชทำหน้าที่อะไรเป็นหลัก?', choices: ['สังเคราะห์แสง', 'ดูดน้ำและแร่ธาตุ 🪵', 'ชูใบรับแสง', 'ล่อแมลง'], answer: 1, hint: 'รากฝังอยู่ในดินคอยดูดสิ่งนี้', reward: 'seed' },
    { id: 'S07', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '1-3', topic: 'สัตว์กินเนื้อ', question: 'สัตว์ชนิดใดจัดเป็นสัตว์กินเนื้อ (Carnivore)?', choices: ['วัว 🐄', 'กระต่าย 🐰', 'เสือ 🐯', 'ม้า 🐴'], answer: 2, hint: 'สัตว์ตัวนี้ล่าสัตว์อื่นเป็นอาหาร', reward: 'seed' },
    { id: 'S08', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '1-3', topic: 'ส่วนประกอบพืช', question: 'ส่วนใดของพืชทำหน้าที่สืบพันธุ์?', choices: ['ราก', 'ลำต้น', 'ใบ', 'ดอก 🌸'], answer: 3, hint: 'ส่วนที่มีสีสันสวยงามล่อแมลงผสมเกสร', reward: 'seed' },
    { id: 'S09', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '1-3', topic: 'สัตว์ให้นม', question: 'สัตว์เลี้ยงในฟาร์มชนิดใดผลิตนมให้เราดื่ม?', choices: ['ไก่ 🐔', 'วัว 🐄', 'เป็ด 🦆', 'กระต่าย 🐰'], answer: 1, hint: 'นมสดกล่องสีขาวได้มาจากสัตว์ตัวนี้', reward: 'seed' },
    { id: 'S10', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '1-3', topic: 'พลังงานแสง', question: 'พืชใช้พลังงานจากสิ่งใดในการสร้างอาหาร?', choices: ['แสงแดด ☀️', 'เสียงเพลง', 'ลมพัด', 'ไฟฉาย'], answer: 0, hint: 'ดวงอาทิตย์ส่องสว่างตอนกลางวัน', reward: 'seed' },
    { id: 'S11', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '4-6', topic: 'ห่วงโซ่อาหาร', question: 'ในห่วงโซ่อาหาร สิ่งมีชีวิตใดเป็นผู้ผลิต?', choices: ['กระต่าย 🐰', 'ข้าวโพด 🌽', 'งู 🐍', 'เหยี่ยว 🦅'], answer: 1, hint: 'ผู้ผลิตคือสิ่งมีชีวิตที่สร้างอาหารเองได้จากแสงแดด', reward: 'seed' },
    { id: 'S12', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '4-6', topic: 'การสังเคราะห์แสง', question: 'พืชใช้ส่วนใดในการสังเคราะห์แสงเป็นหลัก?', choices: ['ราก 🪵', 'ลำต้น 🪵', 'ใบ 🍃', 'ดอก 🌸'], answer: 2, hint: 'ส่วนนี้มีสีเขียวเพราะมีสารคลอโรฟิลล์ 🌿', reward: 'seed' },
    { id: 'S13', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '4-6', topic: 'ประเภทของดิน', question: 'ดินชนิดใดระบายน้ำได้ดีที่สุด แต่ไม่อุ้มน้ำ?', choices: ['ดินเหนียว', 'ดินร่วน', 'ดินทราย 🏖️', 'ดินโคลน'], answer: 2, hint: 'พบตามชายหาด เม็ดกรวดใหญ่', reward: 'seed' },
    { id: 'S14', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '4-6', topic: 'ระบบสุริยะ', question: 'ดาวเคราะห์ดวงใดอยู่ใกล้ดวงอาทิตย์มากที่สุด?', choices: ['ดาวพุธ 🪐', 'ดาวศุกร์', 'โลก 🌍', 'ดาวอังคาร'], answer: 0, hint: 'ดาวพุธเป็นดาวเคราะห์ดวงแรกในระบบสุริยะ', reward: 'seed' },
    { id: 'S15', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '4-6', topic: 'แก๊สหายใจ', question: 'พืชปล่อยแก๊สชนิดใดออกมาในกระบวนการสังเคราะห์ด้วยแสง?', choices: ['คาร์บอนไดออกไซด์', 'ออกซิเจน 💨', 'ไนโตรเจน', 'มีเทน'], answer: 1, hint: 'แก๊สที่คนเราใช้หายใจเพื่อความสดชื่น', reward: 'seed' },
    { id: 'S16', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '4-6', topic: 'สถานะของสาร', question: 'น้ำเปล่าที่นำไปแช่ในช่องฟรีซจะเปลี่ยนสถานะเป็นอะไร?', choices: ['ของแข็ง 🧊', 'ของเหลว', 'แก๊ส/ไอ', 'พลาสมา'], answer: 0, hint: 'น้ำเปลี่ยนสถานะกลายเป็นน้ำแข็ง', reward: 'seed' },
    { id: 'S17', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '4-6', topic: 'สารสีเขียว', question: 'สารสีเขียวในพืชที่ช่วยรับพลังงานแสงเรียกว่าอะไร?', choices: ['คลอโรฟิลล์ 🌿', 'แคโรทีน', 'เฮโมโกลบิน', 'โซเดียม'], answer: 0, hint: 'สารสีเขียวในใบพืช', reward: 'seed' },
    { id: 'S18', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '4-6', topic: 'การถ่ายเรณู', question: 'แมลงชนิดใดช่วยถ่ายเรณูผสมเกสรพืชผักมากที่สุด?', choices: ['มด 🐜', 'ผึ้ง 🐝', 'ยุง 🦟', 'แมลงวัน'], answer: 1, hint: 'แมลงมีปีกตัวลายเหลืองดำชอบดูดน้ำหวาน', reward: 'seed' },
    { id: 'S19', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '4-6', topic: 'ชั้นบรรยากาศ', question: 'แก๊สในชั้นบรรยากาศใดช่วยป้องกันรังสี UV จากดวงอาทิตย์?', choices: ['โอโซน (O3) 🛡️', 'คาร์บอนไดออกไซด์', 'ไนโตรเจน', 'ไฮโดรเจน'], answer: 0, hint: 'ชั้นบรรยากาศโอโซนช่วยกรองรังสี UV', reward: 'seed' },
    { id: 'S20', subject: 'science', subjectName: 'วิทยาศาสตร์', grade: '4-6', topic: 'การกลั่นตัว', question: 'การควบแน่นของไอน้ำในอากาศทำให้เกิดสิ่งใด?', choices: ['ลม', 'ฝน/หยดน้ำ 🌧️', 'แสงแดด', 'แผ่นดินไหว'], answer: 1, hint: 'ไอน้ำลอยตัวรวมกันเป็นเมฆแล้วตกลงมาเป็น...', reward: 'seed' },

    // 🏛️ สังคมศึกษา & เศรษฐกิจพอเพียง (20 ข้อ)
    { id: 'SO01', subject: 'social', subjectName: 'สังคมศึกษา', grade: '1-3', topic: 'การออม', question: 'ถ้ามีเงิน 20 บาท ซื้อขนม 5 บาท เหลือเงินเก็บเท่าไร?', choices: ['10 บาท', '15 บาท 🪙', '20 บาท', '25 บาท'], answer: 1, hint: '20 - 5 = ? 🐷💰', reward: 'coin' },
    { id: 'SO02', subject: 'social', subjectName: 'สังคมศึกษา', grade: '1-3', topic: 'เศรษฐกิจพอเพียง', question: 'หลักเศรษฐกิจพอเพียงสอนให้เราทำอย่างไร?', choices: ['ใช้จ่ายเงินให้หมด', 'ใช้จ่ายอย่างพอประมาณ ⚖️', 'กู้เงินมาใช้', 'ซื้อของแพงที่สุด'], answer: 1, hint: 'พอเพียง = ไม่มากเกินไป ไม่น้อยเกินไป', reward: 'coin' },
    { id: 'SO03', subject: 'social', subjectName: 'สังคมศึกษา', grade: '1-3', topic: 'อาชีพ', question: 'คนที่ปลูกข้าว ทำนา มีอาชีพเรียกว่าอะไร?', choices: ['ชาวประมง 🎣', 'ชาวนา 🌾', 'พ่อค้า 🏪', 'ครู 🧑‍🏫'], answer: 1, hint: 'คนที่ปลูกข้าวในนาเรียกว่า...', reward: 'seed' },
    { id: 'SO04', subject: 'social', subjectName: 'สังคมศึกษา', grade: '1-3', topic: 'สื่อกลางการซื้อขาย', question: 'สิ่งใดเป็นสื่อกลางในการแลกเปลี่ยนสินค้าในปัจจุบัน?', choices: ['หิน', 'เปลือกหอย', 'เงินเหรียญและธนบัตร 🪙', 'ใบไม้'], answer: 2, hint: 'เราใช้สิ่งนี้ซื้อสินค้าในตลาด', reward: 'coin' },
    { id: 'SO05', subject: 'social', subjectName: 'สังคมศึกษา', grade: '1-3', topic: 'การหยอดกระปุก', question: 'การนำเงินส่วนที่เหลือจากการกินขนมไปหยอดกระปุกออมสินเรียกว่าอะไร?', choices: ['การกู้ยืม', 'การประหยัดออม 🐷', 'การสุรุ่ยสุร่าย', 'การบริจาค'], answer: 1, hint: 'การสะสมเงินไว้ใช้ในยามจำเป็น', reward: 'coin' },
    { id: 'SO06', subject: 'social', subjectName: 'สังคมศึกษา', grade: '1-3', topic: 'ปัจจัย 4', question: 'ข้อใดจัดเป็นปัจจัย 4 ที่จำเป็นต่อการดำรงชีวิต?', choices: ['อาหารและยารักษาโรค 🏥', 'ของเล่นพลาสติก', 'เกมคอมพิวเตอร์', 'รองเท้าแฟชั่น'], answer: 0, hint: 'สิ่งจำเป็นต่อร่างกายมนุษย์', reward: 'coin' },
    { id: 'SO07', subject: 'social', subjectName: 'สังคมศึกษา', grade: '1-3', topic: 'กฎระเบียบ', question: 'ข้อใดเป็นกฎระเบียบที่ดีในโรงเรียน?', choices: ['ทิ้งขยะลงบนพื้น', 'แต่งกายเรียบร้อยร้อยและเข้าเรียนตรงเวลา 🏫', 'วิ่งเล่นในห้องเรียน', 'พูดคำหยาบคาย'], answer: 1, hint: 'ทำให้ทุกคนอยู่ร่วมกันอย่างมีความสุข', reward: 'coin' },
    { id: 'SO08', subject: 'social', subjectName: 'สังคมศึกษา', grade: '1-3', topic: 'สัญลักษณ์ชาติ', question: 'ธงชาติไทย (ธงไตรรงค์) มีกี่สี?', choices: ['2 สี', '3 สี 🇹🇭', '4 สี', '5 สี'], answer: 1, hint: 'สีแดง สีขาว สีน้ำเงิน', reward: 'coin' },
    { id: 'SO09', subject: 'social', subjectName: 'สังคมศึกษา', grade: '1-3', topic: 'มารยาทไทย', question: 'เมื่อได้รับสิ่งของหรือคำชมจากผู้ใหญ่ ควรทำอย่างไร?', choices: ['วิ่งหนี', 'ยกมือไหว้และกล่าวคำว่า ขอบคุณครับ/ค่ะ 🙏', 'เฉยชา', 'หัวเราะเสียงดัง'], answer: 1, hint: 'มารยาทไทยแสดงความเคารพกตัญญู', reward: 'coin' },
    { id: 'SO10', subject: 'social', subjectName: 'สังคมศึกษา', grade: '1-3', topic: 'ตรงต่อเวลา', question: 'การมาโรงเรียนตรงเวลาแสดงถึงคุณธรรมข้อใด?', choices: ['ความตรงต่อเวลา ⏰', 'ความเห็นแก่ตัว', 'ความขี้เกียจ', 'ความใจร้อน'], answer: 0, hint: 'การรักษาเวลาตามที่นัดหมาย', reward: 'coin' },
    { id: 'SO11', subject: 'social', subjectName: 'สังคมศึกษา', grade: '4-6', topic: 'เศรษฐกิจพอเพียง', question: 'หลักเศรษฐกิจพอเพียงประกอบด้วย 3 ห่วง คือข้อใด?', choices: ['กิน นอน เล่น', 'พอประมาณ มีเหตุผล มีภูมิคุ้มกัน ⚖️', 'ซื้อ ขาย แลก', 'ผลิต บริโภค บริการ'], answer: 1, hint: 'พ่อหลวง ร.9 ทรงสอนให้เรารู้จักพอประมาณ...', reward: 'coin' },
    { id: 'SO12', subject: 'social', subjectName: 'สังคมศึกษา', grade: '4-6', topic: 'การแปรรูป', question: 'การนำนมวัวมาทำเป็นชีส เรียกว่ากระบวนการอะไร?', choices: ['การเกษตร', 'การแปรรูป 🧀', 'การส่งออก', 'การเก็บเกี่ยว'], answer: 1, hint: 'การเปลี่ยนวัตถุดิบเป็นสินค้าใหม่เรียกว่า...', reward: 'coin' },
    { id: 'SO13', subject: 'social', subjectName: 'สังคมศึกษา', grade: '4-6', topic: 'สถาบันการเงิน', question: 'สถาบันการเงินที่ทำหน้าที่รับฝากเงินออมคือข้อใด?', choices: ['โรงพยาบาล', 'สถานีตำรวจ', 'ธนาคาร 🏦', 'โรงภาพยนตร์'], answer: 2, hint: 'สถานที่ปลอดภัยสำหรับฝากเงินออม', reward: 'coin' },
    { id: 'SO14', subject: 'social', subjectName: 'สังคมศึกษา', grade: '4-6', topic: 'ความซื่อสัตย์', question: 'ถ้าทอนเงินให้ลูกค้าเกิน ควรทำอย่างไร?', choices: ['เก็บไว้เอง', 'คืนเงินส่วนเกินให้ลูกค้า 🤝', 'นำไปซื้อขนม', 'แกล้งทำเป็นไม่รู้'], answer: 1, hint: 'ความซื่อสัตย์สุจริตเป็นคุณธรรมของแม่ค้าที่ดี', reward: 'coin' },
    { id: 'SO15', subject: 'social', subjectName: 'สังคมศึกษา', grade: '4-6', topic: 'ผู้ผลิตที่ดี', question: 'ผู้ผลิตสินค้าที่ดีควรมีคุณธรรมข้อใดเป็นสำคัญ?', choices: ['ตั้งราคาแพงเกินไป', 'ผลิตสินค้าคุณภาพดีและซื่อสัตย์ต่อผู้บริโภค ✨', 'ผสมสิ่งเจือปน', 'โฆษณาเกินจริง'], answer: 1, hint: 'ซื่อสัตย์ ไม่หลอกลวงผู้บริโภค', reward: 'coin' },
    { id: 'SO16', subject: 'social', subjectName: 'สังคมศึกษา', grade: '4-6', topic: 'ตลาดนัด', question: 'ตลาดนัดมีบทบาทสำคัญอย่างไรในระบบเศรษฐกิจท้องถิ่น?', choices: ['เป็นศูนย์กลางซื้อขายแลกเปลี่ยนสินค้า 🏪', 'เป็นที่เล่นกีฬา', 'เป็นที่จอดรถ', 'เป็นที่ทิ้งขยะ'], answer: 0, hint: 'ที่กระจายสินค้าของเกษตรกรและผู้ผลิต', reward: 'coin' },
    { id: 'SO17', subject: 'social', subjectName: 'สังคมศึกษา', grade: '4-6', topic: 'ภาษีอากร', question: 'รัฐบาลนำเงินภาษีจากประชาชนไปใช้ประโยชน์ในเรื่องใด?', choices: ['สร้างถนน โรงเรียน และโรงพยาบาล 🏫สะพาน', 'ซื้อของขวัญส่วนตัว', 'แจกขนมฟรี', 'ซื้อเกม'], answer: 0, hint: 'นำไปสร้างสาธารณูปโภคเพื่อส่วนรวม', reward: 'coin' },
    { id: 'SO18', subject: 'social', subjectName: 'สังคมศึกษา', grade: '4-6', topic: 'การพัฒนาที่ยั่งยืน', question: 'การปลูกป่าทดแทนและการอนุรักษ์ธรรมชาติจัดเป็นการพัฒนาแบบใด?', choices: ['การพัฒนาที่ยั่งยืน 🌳', 'การทำลายสิ่งแวดล้อม', 'การสิ้นเปลืองงบประมาณ', 'การเห็นแก่ตัว'], answer: 0, hint: 'รักษาธรรมชาติไว้ให้ลูกหลานในอนาคต', reward: 'coin' },
    { id: 'SO19', subject: 'social', subjectName: 'สังคมศึกษา', grade: '4-6', topic: 'สินค้าส่งออก', question: 'สินค้าเกษตรส่งออกสำคัญอันดับต้นๆ ของประเทศไทยคือข้อใด?', choices: ['ข้าวหอมมะลิไทย 🌾', 'หิมะ', 'แอปเปิ้ลเขียว', 'เนยแข็ง'], answer: 0, hint: 'พืชเศรษฐกิจหลักของชาวนาไทย', reward: 'coin' },
    { id: 'SO20', subject: 'social', subjectName: 'สังคมศึกษา', grade: '4-6', topic: 'ดอกเบี้ยเงินฝาก', question: 'เมื่อเรานำเงินไปฝากธนาคาร เราจะได้ผลตอบแทนเรียกว่าอะไร?', choices: ['เงินกู้', 'ดอกเบี้ยเงินฝาก 💰', 'ภาษี', 'ค่าธรรมเนียม'], answer: 1, hint: 'เงินเพิ่มพิเศษที่ธนาคารจ่ายให้ผู้ฝาก', reward: 'coin' },

    // 🌾 การงานอาชีพ & เกษตรกรรม (20 ข้อ)
    { id: 'C01', subject: 'career', subjectName: 'การงานอาชีพ', grade: '1-3', topic: 'เครื่องมือเกษตร', question: 'เครื่องมือที่ใช้ขุดดินปลูกผักคืออะไร?', choices: ['กรรไกร', 'จอบ ⛏️', 'ค้อน', 'ไขควง'], answer: 1, hint: 'เครื่องมือที่มีใบเหล็กแบนๆ ด้ามยาว', reward: 'seed' },
    { id: 'C02', subject: 'career', subjectName: 'การงานอาชีพ', grade: '1-3', topic: 'เครื่องมือเกษตร', question: 'เราใช้อะไรรดน้ำต้นไม้?', choices: ['ถังขยะ', 'บัวรดน้ำ 🚿', 'กระทะ', 'ตะกร้า'], answer: 1, hint: 'มีรูเล็กๆ ตรงหัวให้น้ำกระจายเป็นฝอย 💧', reward: 'seed' },
    { id: 'C03', subject: 'career', subjectName: 'การงานอาชีพ', grade: '1-3', topic: 'การเตรียมดิน', question: 'ก่อนปลูกผัก เราต้องทำสิ่งใดเป็นอันดับแรก?', choices: ['ใส่ปุ๋ย', 'พรวนดิน/ขุดดิน 🟫', 'เก็บเกี่ยว', 'ฉีดน้ำหอม'], answer: 1, hint: 'ทำให้ดินร่วนซุยก่อนหยอดเมล็ด', reward: 'seed' },
    { id: 'C04', subject: 'career', subjectName: 'การงานอาชีพ', grade: '1-3', topic: 'การกำจัดวัชพืช', question: 'เมื่อเห็นวัชพืช (หญ้า) ขึ้นแย่งอาหารผัก ควรทำอย่างไร?', choices: ['ปล่อยทิ้งไว้', 'ถอนหรือขุดวัชพืชออก ✂️', 'รดน้ำเพิ่มให้หญ้า', 'ใส่ปุ๋ยให้หญ้า'], answer: 1, hint: 'ถอนหญ้าออกไม่ให้แย่งอาหารพืชผัก', reward: 'seed' },
    { id: 'C05', subject: 'career', subjectName: 'การงานอาชีพ', grade: '1-3', topic: 'การดูแลเครื่องมือ', question: 'หลังจากใช้งานจอบขุดดินเสร็จแล้ว ควรทำอย่างไร?', choices: ['วางทิ้งไว้บนพื้น', 'ทำความสะอาดเช็ดแห้งแล้วเก็บเข้าที่ 🛠️', 'โยนลงสระน้ำ', 'ตากแดดทิ้งไว้'], answer: 1, hint: 'ทำความสะอาดเพื่อป้องกันสนิมและปลอดภัย', reward: 'seed' },
    { id: 'C06', subject: 'career', subjectName: 'การงานอาชีพ', grade: '1-3', topic: 'การเก็บเกี่ยวผัก', question: 'เวลาใดเหมาะสำหรับการเก็บเกี่ยวผักสวนครัวสดๆ มากที่สุด?', choices: ['ตอนเที่ยงแดดจัด', 'ตอนเช้าตรู่หรือตอนเย็น 🌅', 'ตอนเที่ยงคืน', 'ตอนบ่ายโมง'], answer: 1, hint: 'ผักจะไม่เหี่ยวช้ำง่ายในเวลาอากาศเย็น', reward: 'seed' },
    { id: 'C07', subject: 'career', subjectName: 'การงานอาชีพ', grade: '1-3', topic: 'การเพาะเมล็ด', question: 'กระถางเพาะเมล็ดพืชควรวางไว้ในบริเวณใด?', choices: ['ตู้เย็น', 'บริเวณที่มีแสงแดดรำไรและอากาศถ่ายเท ☀️', 'ห้องมืดสนิท', 'ใต้กองขยะ'], answer: 1, hint: 'ต้องการแสงพอเหมาะและอากาศถ่ายเท', reward: 'seed' },
    { id: 'C08', subject: 'career', subjectName: 'การงานอาชีพ', grade: '1-3', topic: 'งานบ้าน', question: 'เสื้อผ้าที่เปื้อนคราบโคลนจากการทำฟาร์มควรทำอย่างไรก่อนซัก?', choices: ['ใส่ตู้เสื้อผ้าเลย', 'ล้างคราบโคลนออกด้วยน้ำสะอาดก่อนซัก 🧺', 'นำไปรีด', 'พับเก็บใส่ตู้'], answer: 1, hint: 'กำจัดคราบสกปรกโคลนออกก่อนใส่เครื่องซัก', reward: 'seed' },
    { id: 'C09', subject: 'career', subjectName: 'การงานอาชีพ', grade: '1-3', topic: 'ความเป็นระเบียบ', question: 'การจัดเก็บอุปกรณ์ทำฟาร์มให้เป็นระเบียบช่วยเรื่องใดมากที่สุด?', choices: ["ป้องกันอุบัติเหตุและหยิบใช้งานง่าย 🛡️", "ทำให้ของหาย", "ทำให้บ้านสกปรก", "เพิ่มความยุ่งยาก"], answer: 0, hint: "ปลอดภัย หยิบใช้ง่าย ป้องกันอันตราย", reward: "seed"},
    { id: 'C10', subject: 'career', subjectName: 'การงานอาชีพ', grade: '1-3', topic: 'ส้อมพรวน', question: "สิ่งใดเป็นเครื่องมือสำหรับพรวนดินรอบโคนต้นพืชขนาดเล็ก?", choices: ["ส้อมพรวน 🍴", "กรรไกรตัดกระดาษ", "มีดโต้", "ค้อนปอนด์"], answer: 0, hint: "มีลักษณะคล้ายส้อมพรวนดินร่วนซุย", reward: "seed"},
    { id: 'C11', subject: 'career', subjectName: 'การงานอาชีพ', grade: '4-6', topic: 'ปุ๋ยอินทรีย์', question: "ข้อใดเป็นปุ๋ยอินทรีย์ที่ได้จากธรรมชาติ?", choices: ["ปุ๋ยเคมี", "ปุ๋ยหมักจากเศษใบไม้ 🍃", "ยาฆ่าแมลง", "สารเคมีกำจัดวัชพืช"], answer: 1, hint: "ทำจากเศษพืช/อาหาร หมักตามธรรมชาติ", reward: "seed"},
    { id: 'C12', subject: 'career', subjectName: 'การงานอาชีพ', grade: '4-6', topic: 'การถนอมอาหาร', question: "การทำผลไม้แช่อิ่มจัดเป็นการถนอมอาหารวิธีใด?", choices: ["การหมักดอง", "การใช้น้ำตาลความเข้มข้นสูง 🍯", "การตากแห้ง", "การแช่แข็ง"], answer: 1, hint: "ใช้น้ำเชื่อมเชื่อมความหวานถนอมอาหาร", reward: "coin"},
    { id: 'C13', subject: 'career', subjectName: 'การงานอาชีพ', grade: '4-6', topic: 'การแปรรูป', question: "การนำส้มมาคั้นเป็นน้ำส้มพร้อมดื่ม เรียกว่าอะไร?", choices: ["การแปรรูปอาหาร 🍊", "การทำลาย", "การผสมเคมี", "การหมักดอง"], answer: 0, hint: "เปลี่ยนผลไม้สดเป็นเครื่องดื่มรสอร่อย", reward: "coin"},
    { id: 'C14', subject: 'career', subjectName: 'การงานอาชีพ', grade: '4-6', topic: 'พืชตระกูลถั่ว', question: "การปลูกพืชตระกูลถั่วมีประโยชน์ต่อดินอย่างไร?", choices: ["ทำให้ดินแข็ง", "ช่วยบำรุงเพิ่มธาตุอาหารไนโตรเจนในดิน 🫘", "ทำให้ดินเปรี้ยว", "แย่งอาหารพืชอื่น"], answer: 1, hint: "ปมรากถั่วมีแบคทีเรียช่วยตรึงไนโตรเจนบำรุงดิน", reward: "seed"},
    { id: 'C15', subject: 'career', subjectName: 'การงานอาชีพ', grade: '4-6', topic: 'พืชหมุนเวียน', question: "การปลูกพืชหมุนเวียนสลับชนิดมีประโยชน์อย่างไร?", choices: ["ช่วยบำรุงดินและตัดวงจรแมลงศัตรูพืช 🔄", "ทำให้ดินเสื่อมโทรม", "ทำให้ศัตรูพืชระบาด", "ทำให้พืชตาย"], answer: 0, hint: "ป้องกันโรคและแมลงสะสมในดิน", reward: "seed"},
    { id: 'C16', subject: 'career', subjectName: 'การงานอาชีพ', grade: '4-6', topic: 'การขยายพันธุ์', question: "การขยายพันธุ์พืชโดยควั่นเปลือกกิ่งแล้วพอกด้วยคั่งขุยมะพร้าวเรียกว่าอะไร?", choices: ["การตอนกิ่ง 🌿", "การเพาะเมล็ด", "การปักชำใบ", "การแยกหัว"], answer: 0, hint: "การออกรากบนกิ่งเดิมเรียกว่าการตอนกิ่ง", reward: "seed"},
    { id: 'C17', subject: 'career', subjectName: 'การงานอาชีพ', grade: '4-6', topic: 'กรรไกรตัดกิ่ง', question: "เครื่องมือใดใช้สำหรับตัดแต่งกิ่งไม้และเก็บเกี่ยวผลไม้กิ่งหนา?", choices: ["กรรไกรตัดกิ่ง ✂️", "เลื่อยตัดเหล็ก", "มีดปอกผลไม้", "กรรไกรตัดผ้า"], answer: 0, hint: "กรรไกรด้ามแข็งใบโค้งสำหรับตัดกิ่งไม้", reward: "seed"},
    { id: 'C18', subject: 'career', subjectName: 'การงานอาชีพ', grade: '4-6', topic: 'การเก็บรักษาผลผลิต', question: "การเก็บรักษาผลผลิตผักและผลไม้สดไม่ให้เน่าเสียเร็วควรทำอย่างไร?", choices: ["เก็บในห้องเย็นหรือตู้เย็น ❄️", "ตากแดดจัด", "วางไว้ในถุงพลาสติกปิดแน่น", "แช่น้ำร้อน"], answer: 0, hint: "ความเย็นช่วยชะลอการเจริญเติบโตของเชื้อแบคทีเรีย", reward: "coin"},
    { id: 'C19', subject: 'career', subjectName: 'การงานอาชีพ', grade: '4-6', topic: 'วัสดุปลูก', question: "วัสดุปลูกพืชชนิดใดช่วยอุ้มน้ำและกักเก็บความชื้นในดินได้ดีเยี่ยม?", choices: ["ขุยมะพร้าว 🥥", "กรวดหิน", "ทรายแก้ว", "เศษเหล็ก"], answer: 0, hint: "เปลือกมะพร้าวสับซับน้ำได้ดีเยี่ยม", reward: "seed"},
    { id: 'C20', subject: 'career', subjectName: 'การงานอาชีพ', grade: '4-6', topic: 'การวางแผนงาน', question: "การวางแผนขั้นตอนการทำงานเกษตรช่วยเรื่องใดมากที่สุด?", choices: ["ประหยัดเวลาและทำงานได้สำเร็จตามเป้าหมาย 🎯", "เพิ่มงานให้ซับซ้อน", "ทำให้ทำงานช้าลง", "ทำให้เสียเงินมากขึ้น"], answer: 0, hint: "วางแผนเป็นขั้นตอนช่วยให้งานเสร็จตามเป้าหมาย", reward: "coin"},

    // 📖 ภาษาไทย (20 ข้อ)
    { id: 'T01', subject: 'thai', subjectName: 'ภาษาไทย', grade: '1-3', topic: 'มาตราตัวสะกด', question: "คำว่า 'ข้าว' อยู่ในมาตราตัวสะกดใด?", choices: ["แม่กน", "แม่เกอว 🌾", "แม่กก", "แม่กง"], answer: 1, hint: "ตัวสะกดคือ 'ว' อยู่ในแม่เกอว", reward: "seed"},
    { id: 'T02', subject: 'thai', subjectName: 'ภาษาไทย', grade: '1-3', topic: 'ชนิดของคำ', question: "คำว่า 'วิ่ง' จัดเป็นคำชนิดใด?", choices: ["คำนาม", "คำกริยา 🏃", "คำวิเศษณ์", "คำสรรพนาม"], answer: 1, hint: "คำที่แสดงการกระทำเรียกว่าคำกริยา", reward: "seed"},
    { id: 'T03', subject: 'thai', subjectName: 'ภาษาไทย', grade: '1-3', topic: 'การสะกดคำ', question: "คำใดเขียนสะกดถูกต้อง?", choices: ["มะเคือเทศ", "มะเขือเทด", "มะเขือเทศ 🍅", "มะเคือเทด"], answer: 2, hint: "ใช้ 'ข' ไข่ และสะกดด้วย 'ศ' ศาลา", reward: "seed"},
    { id: 'T04', subject: 'thai', subjectName: 'ภาษาไทย', grade: '1-3', topic: 'คำนาม', question: "คำว่า 'สมุด' จัดเป็นคำชนิดใด?", choices: ["คำนาม 📚", "คำกริยา", "คำวิเศษณ์", "คำอุทาน"], answer: 0, hint: "คำนามใช้เรียกชื่อ คน สัตว์ สิ่งของ", reward: "seed"},
    { id: 'T05', subject: 'thai', subjectName: 'ภาษาไทย', grade: '1-3', topic: 'สระไทย', question: "คำว่า 'พรวน' ใช้สระใดในการเขียน?", choices: ["สระอัว 🌾", "สระอา", "สระอู", "สระอี"], answer: 0, hint: "พ + ร + สระอัว + น = พรวน", reward: "seed"},
    { id: 'T06', subject: 'thai', subjectName: 'ภาษาไทย', grade: '1-3', topic: 'พยัญชนะไทย', question: "พยัญชนะไทยมีทั้งหมดกี่ตัว?", choices: ["40 ตัว", "44 ตัว 🇹🇭", "46 ตัว", "50 ตัว"], answer: 1, hint: "ก.ไก่ ถึง ฮ.นกฮูก มี 44 ตัว", reward: "seed"},
    { id: 'T07', subject: 'thai', subjectName: 'ภาษาไทย', grade: '1-3', topic: 'มาตราเกอว', question: "คำว่า 'แมว' มีตัวสะกดอยู่ในมาตราใด?", choices: ["แม่กม", "แม่เกอว 🐱", "แม่กบ", "แม่กด"], answer: 1, hint: "สะกดด้วยตัว ว อยู่ในแม่เกอว", reward: "seed"},
    { id: 'T08', subject: 'thai', subjectName: 'ภาษาไทย', grade: '1-3', topic: 'วรรณยุกต์', question: "วรรณยุกต์ไทยมีกี่รูป กี่เสียง?", choices: ["4 รูป 5 เสียง 🎶", "5 รูป 4 เสียง", "3 รูป 4 เสียง", "4 รูป 4 เสียง"], answer: 0, hint: "เอก โท ตรี จัตวา มี 4 รูป 5 เสียง (รวมสามัญ)", reward: "seed"},
    { id: 'T09', subject: 'thai', subjectName: 'ภาษาไทย', grade: '1-3', topic: 'มาตรากด', question: "คำว่า 'มด' มีตัวสะกดอยู่ในมาตราใด?", choices: ["แม่กง", "แม่กด 🐜", "แม่กบ", "แม่กน"], answer: 1, hint: "สะกดด้วย ด อยู่ในแม่กด", reward: "seed"},
    { id: 'T10', subject: 'thai', subjectName: 'ภาษาไทย', grade: '1-3', topic: 'คำตรงข้าม', question: "คำใดเป็นคำที่มีความหมายตรงข้ามกับคำว่า 'ขยัน'?", choices: ["อดทน", "ขี้เกียจ 😴", "ว่องไว", "เมตตา"], answer: 1, hint: "ขยัน ตรงข้ามกับ ขี้เกียจ", reward: "seed"},
    { id: 'T11', subject: 'thai', subjectName: 'ภาษาไทย', grade: '4-6', topic: 'สำนวนไทย', question: "สำนวน 'ขยันเหมือนมด' มีความหมายว่าอย่างไร?", choices: ["เป็นคนขี้เกียจ", "มีความขยันอดทน 🐜", "เป็นคนตัวเล็ก", "ชอบกินของหวาน"], answer: 1, hint: "มดเป็นสัตว์ที่ขยันทำงานไม่หยุดพัก", reward: "coin"},
    { id: 'T12', subject: 'thai', subjectName: 'ภาษาไทย', grade: '4-6', topic: 'คำควบกล้ำ', question: "คำใดเป็นคำควบกล้ำแท้?", choices: ["สร้าง", "จริง", "ปรับปรุง 🛠️", "สระน้ำ"], answer: 2, hint: "ออกเสียงพยัญชนะต้น 2 ตัวพร้อมกัน (ปร-)", reward: "coin"},
    { id: 'T13', subject: 'thai', subjectName: 'ภาษาไทย', grade: '4-6', topic: 'ความหมายคำ', question: "'เศรษฐกิจพอเพียง' คำว่า 'พอเพียง' มีความหมายตรงกับข้อใด?", choices: ["มากเกินไป", "พอดี เหมาะสม ⚖️", "น้อยเกินไป", "ตระหนี่"], answer: 1, hint: "พอเพียง = พอดี เหมาะสมกับตนเอง", reward: "coin"},
    { id: 'T14', subject: 'thai', subjectName: 'ภาษาไทย', grade: '4-6', topic: 'คำราชาศัพท์', question: "คำราชาศัพท์ที่หมายถึง 'บ้าน/ที่อยู่' ของพระมหากษัตริย์คืออะไร?", choices: ["กระท่อม", "พระราชวัง 🏰", "ตึกแถว", "โฮมสเตย์"], answer: 1, hint: "สถานที่ประทับของพระมหากษัตริย์", reward: "coin"},
    { id: 'T15', subject: 'thai', subjectName: 'ภาษาไทย', grade: '4-6', topic: 'การอ่านคำ', question: "คำว่า 'กัลปพฤกษ์' อ่านออกเสียงถูกต้องอย่างไร?", choices: ["กัน-ปะ-พรัก", "กัน-ละ-ปะ-พรัก 🌸", "กา-ละ-พรัก", "กัน-พรัก"], answer: 1, hint: "อ่านแบบมีเสียงเชื่อม กัน-ละ-ปะ-พรัก", reward: "coin"},
    { id: 'T16', subject: 'thai', subjectName: 'ภาษาไทย', grade: '4-6', topic: 'คำสุภาพ', question: "คำสุภาพของคำว่า 'ผักกาด' คือข้อใด?", choices: ["ผักการะ 🥬", "ผักยาว", "ผักเขียว", "ผักใบ"], answer: 0, hint: "ภาษาเขียนคำสุภาพเรียกว่า ผักการะ", reward: "coin"},
    { id: 'T17', subject: 'thai', subjectName: 'ภาษาไทย', grade: '4-6', topic: 'ประโยค', question: "ข้อใดประกอบด้วย ประธาน + กริยา + กรรม เรียกว่าประโยคกี่ส่วน?", choices: ["ประโยค 2 ส่วน", "ประโยค 3 ส่วน 📝", "ประโยคซ้อน", "ประโยคความรวม"], answer: 1, hint: "มีองค์ประกอบครบ 3 ส่วนหลัก", reward: "coin"},
    { id: 'T18', subject: 'thai', subjectName: 'ภาษาไทย', grade: '4-6', topic: 'คุณธรรมคำสอน', question: "คำว่า 'กตัญญู' หมายถึงอะไร?", choices: ["การลืมคุณ", "การรู้คุณและตอบแทนผู้มีพระคุณ 🙏", "การเอาเปรียบ", "การโกรธเคือง"], answer: 1, hint: "รู้คุณคนและตอบแทนผู้มีพระคุณ", reward: "coin"},
    { id: 'T19', subject: 'thai', subjectName: 'ภาษาไทย', grade: '4-6', topic: 'คำประพันธ์', question: "โคลงสี่สุภาพ 1 บท มีกี่บาท?", choices: ["2 บาท", "3 บาท", "4 บาท 📜", "5 บาท"], answer: 2, hint: "โคลงสี่สุภาพ มี 4 บาทใน 1 บท", reward: "coin"},
    { id: 'T20', subject: 'thai', subjectName: 'ภาษาไทย', grade: '4-6', topic: 'ร หัน', question: "คำว่า 'บรรจง' ใช้สระ/ตัวสะกดพิเศษใดในการเขียน?", choices: ["รร (ร หัน) ✍️", "สระอะ", "สระอำ", "สระเอ"], answer: 0, hint: "บ + รร + จ + ง = บรรจง", reward: "coin"},

    // 🔤 ภาษาอังกฤษ (20 ข้อ)
    { id: 'E01', subject: 'english', subjectName: 'ภาษาอังกฤษ', grade: '1-3', topic: 'คำศัพท์สัตว์', question: "'Chicken' แปลว่าอะไร?", choices: ["วัว", "หมู", "ไก่ 🐔", "เป็ด"], answer: 2, hint: "C-H-I-C-K-E-N สัตว์ที่ออกไข่ในคอก", reward: "seed"},
    { id: 'E02', subject: 'english', subjectName: 'ภาษาอังกฤษ', grade: '1-3', topic: 'คำศัพท์พืช', question: "'Corn' แปลว่าอะไร?", choices: ["ข้าว", "ข้าวโพด 🌽", "มันฝรั่ง", "แตงโม"], answer: 1, hint: "C-O-R-N ฝักสีเหลืองหวานอร่อย", reward: "seed"},
    { id: 'E03', subject: 'english', subjectName: 'ภาษาอังกฤษ', grade: '1-3', topic: 'คำศัพท์ธรรมชาติ', question: "'Water' แปลว่าอะไร?", choices: ["ไฟ", "ลม", "น้ำ 💧", "ดิน"], answer: 2, hint: "W-A-T-E-R สิ่งที่เราใช้รดผักในฟาร์ม", reward: "seed"},
    { id: 'E04', subject: 'english', subjectName: 'ภาษาอังกฤษ', grade: '1-3', topic: 'คำศัพท์ผลไม้', question: "'Watermelon' แปลว่าอะไร?", choices: ["ส้ม", "แตงโม 🍉", "มะม่วง", "กล้วย"], answer: 1, hint: "Water (น้ำ) + Melon (แตง) = แตงโม", reward: "seed"},
    { id: 'E05', subject: 'english', subjectName: 'ภาษาอังกฤษ', grade: '1-3', topic: 'คำศัพท์อาชีพ', question: "'Farmer' แปลว่าอะไร?", choices: ["หมอ", "ชาวนา/เกษตรกร 👨‍🌾", "ตำรวจ", "ทหาร"], answer: 1, hint: "F-A-R-M-E-R คนที่ทำงานในฟาร์ม", reward: "seed"},
    { id: 'E06', subject: 'english', subjectName: 'ภาษาอังกฤษ', grade: '1-3', topic: 'คำศัพท์เครื่องดื่ม', question: "'Milk' แปลว่าอะไร?", choices: ["น้ำชา", "กาแฟ", "นมสด 🥛", "น้ำผลไม้"], answer: 2, hint: "M-I-L-K เครื่องดื่มจากแม่วัว 🐄", reward: "seed"},
    { id: 'E07', subject: 'english', subjectName: 'ภาษาอังกฤษ', grade: '1-3', topic: 'คำศัพท์สัตว์เลี้ยง', question: "'Dog' แปลว่าอะไร?", choices: ["แมว", "สุนัข/หมา 🐶", "กระต่าย", "นก"], answer: 1, hint: "D-O-G สัตว์เลี้ยงที่ช่วยเฝ้าฟาร์ม", reward: "seed"},
    { id: 'E08', subject: 'english', subjectName: 'ภาษาอังกฤษ', grade: '1-3', topic: 'คำศัพท์สัตว์เลี้ยง', question: "'Cat' แปลว่าอะไร?", choices: ["แมว 🐱", "สุนัข", "ม้า", "หมู"], answer: 0, hint: "C-A-T สัตว์เลี้ยงส่งเสียงเหมี่ยวๆ", reward: "seed"},
    { id: 'E09', subject: 'english', subjectName: 'ภาษาอังกฤษ', grade: '1-3', topic: 'คำศัพท์ผลไม้', question: "'Apple' แปลว่าอะไร?", choices: ["กล้วย", "ส้ม", "แอปเปิ้ล 🍎", "มะละกอ"], answer: 2, hint: "A-P-P-L-E ผลไม้สีแดงหวานกรอบ", reward: "seed"},
    { id: 'E10', subject: 'english', subjectName: 'ภาษาอังกฤษ', grade: '1-3', topic: 'คำศัพท์ท้องฟ้า', question: "'Sun' แปลว่าอะไร?", choices: ["ดวงจันทร์", "ดวงอาทิตย์ ☀️", "ก้อนเมฆ", "ดาว"], answer: 1, hint: "S-U-N ส่องแสงแดดให้พืชเจริญเติบโต", reward: "seed"},
    { id: 'E11', subject: 'english', subjectName: 'ภาษาอังกฤษ', grade: '4-6', topic: 'คำกริยาการเกษตร', question: "'Harvest' แปลว่าอะไร?", choices: ["ปลูก", "รดน้ำ", "เก็บเกี่ยว 🌾", "ขุดดิน"], answer: 2, hint: "H-A-R-V-E-S-T การเก็บผลผลิตเมื่อโตเต็มที่", reward: "coin"},
    { id: 'E12', subject: 'english', subjectName: 'ภาษาอังกฤษ', grade: '4-6', topic: 'ประโยคสื่อสาร', question: "'I love planting vegetables.' แปลว่าอะไร?", choices: ["ฉันชอบกินผัก", "ฉันชอบปลูกผัก 🥦", "ฉันชอบขายผัก", "ฉันชอบซื้อผัก"], answer: 1, hint: "plant = ปลูก, vegetables = ผัก", reward: "coin"},
    { id: 'E13', subject: 'english', subjectName: 'ภาษาอังกฤษ', grade: '4-6', topic: 'คำกริยา', question: "'Plant a seed' แปลว่าอะไร?", choices: ["รดน้ำต้นไม้", "ปลูกเมล็ดพันธุ์ 🌱", "เก็บเกี่ยวผลผลิต", "ตัดต้นไม้"], answer: 1, hint: "Plant = ปลูก, Seed = เมล็ดพันธุ์", reward: "coin"},
    { id: 'E14', subject: 'english', subjectName: 'ภาษาอังกฤษ', grade: '4-6', topic: 'คำถามสี', question: "'What is the color of a ripe tomato?'", choices: ["Blue", "Green", "Red 🔴", "Yellow"], answer: 2, hint: "มะเขือเทศสุกมีสีแดง (Red)", reward: "coin"},
    { id: 'E15', subject: 'english', subjectName: 'ภาษาอังกฤษ', grade: '4-6', topic: 'ประโยคสัตว์', question: "'A cow gives us fresh ___.'", choices: ["milk 🥛", "bread", "eggs", "rice"], answer: 0, hint: "แม่วัวให้นมสด (milk)", reward: "coin"},
    { id: 'E16', subject: 'english', subjectName: 'ภาษาอังกฤษ', grade: '4-6', topic: 'ประโยคกิจกรรม', question: "'We water the plants every day.' แปลว่าอะไร?", choices: ["พวกเราปลูกต้นไม้ทุกวัน", "พวกเรารดน้ำต้นไม้ทุกวัน 🚿", "พวกเราตัดต้นไม้ทุกวัน", "พวกเราพรวนดินทุกวัน"], answer: 1, hint: "water (กริยา) = รดน้ำ", reward: "coin"},
    { id: 'E17', subject: 'english', subjectName: 'ภาษาอังกฤษ', grade: '4-6', topic: 'คำคุณศัพท์', question: "'Beautiful' แปลว่าอะไร?", choices: ["น่ากลัว", "สวยงาม ✨", "สกปรก", "ยากลำบาก"], answer: 1, hint: "B-E-A-U-T-I-F-U-L ดอกไม้ที่งดงาม", reward: "coin"},
    { id: 'E18', subject: 'english', subjectName: 'ภาษาอังกฤษ', grade: '4-6', topic: 'สถานที่', question: "'Market' แปลว่าอะไร?", choices: ["โรงเรียน", "ตลาด 🏪", "โรงพยาบาล", "สนามบิน"], answer: 1, hint: "สถานที่สำหรับซื้อขายพืชผักผลไม้", reward: "coin"},
    { id: 'E19', subject: 'english', subjectName: 'ภาษาอังกฤษ', grade: '4-6', topic: 'คำศัพท์พืช', question: "'Tree' แปลว่าอะไร?", choices: ["ดอกไม้", "ต้นไม้ 🌳", "หญ้า", "ใบไม้"], answer: 1, hint: "T-R-E-E ไม้ต้นใหญ่ลำต้นสูง", reward: "coin"},
    { id: 'E20', subject: 'english', subjectName: 'ภาษาอังกฤษ', grade: '4-6', topic: 'คำทักทาย', question: "'Good morning' แปลว่าอะไร?", choices: ["สวัสดีตอนเย็น", "สวัสดีตอนเช้า 🌅", "ราตรีสวัสดิ์", "ลาก่อน"], answer: 1, hint: "คำทักทายในยามเช้าตรู่", reward: "coin"}
  ];
}

let allQuestions = getEmergencyQuestions(); // คำถามเริ่มต้น (120 ข้อ)
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
        console.warn('⚠️ ไม่สามารถโหลดจาก Google Sheets ใช้คำถามในตัวแทน:', e.message);
      }
    }

    // Fallback: โหลดจากไฟล์ JSON ในเครื่อง
    const response = await fetch('data/questions.json');
    if (!response.ok) throw new Error('Failed to load questions.json');
    
    const data = await response.json();
    if (data.questions && data.questions.length > 0) {
      allQuestions = data.questions;
    }
    console.log(`✅ โหลดคำถาม Offline สำเร็จ: ${allQuestions.length} ข้อ`);
    
  } catch (e) {
    console.error('❌ โหลดคำถามล้มเหลว ใช้คลังในตัว:', e.message);
    allQuestions = getEmergencyQuestions();
  }
}

// =============================================
// 🎯 QUIZ SELECTION — เลือกคำถาม
// =============================================

function isGradeMatch(qGrade, playerGrade) {
  if (!qGrade || qGrade === 'all') return true;
  const g = parseInt(playerGrade) || 1;
  if (qGrade === '1-3' && g <= 3) return true;
  if (qGrade === '4-6' && g >= 4) return true;
  if (qGrade === String(g)) return true;
  return false;
}

/**
 * ดึงประวัติคำถามที่เคยตอบไปแล้วจาก gameState
 */
function getAskedQuestionIds() {
  if (gameState && gameState.askedQuestionIds) {
    return gameState.askedQuestionIds;
  }
  return [];
}

/**
 * บันทึกคำถามที่ตอบแล้วลงใน gameState
 */
function saveAskedQuestionId(qId) {
  if (!gameState) return;
  if (!gameState.askedQuestionIds) gameState.askedQuestionIds = [];
  if (!gameState.askedQuestionIds.includes(qId)) {
    gameState.askedQuestionIds.push(qId);
    if (typeof SaveSystem !== 'undefined') SaveSystem.save(gameState);
  }
}

/**
 * สุ่มเลือกคำถามตามเงื่อนไข (ไม่ซ้ำข้อเดิม)
 */
function getRandomQuestion(subject = null, playerGrade = null) {
  let pool = [...allQuestions];

  // 1. กรองตามวิชา (ถ้าระบุ)
  if (subject) {
    const subjectFiltered = pool.filter(q => q.subject === subject);
    if (subjectFiltered.length > 0) pool = subjectFiltered;
  }

  // 2. กรองตามระดับชั้น (ถ้าระบุ)
  if (playerGrade) {
    const gradeFiltered = pool.filter(q => isGradeMatch(q.grade, playerGrade));
    if (gradeFiltered.length > 0) pool = gradeFiltered;
  }

  // 3. กรองคำถามที่ไม่เคยถามมาก่อนเพื่อไม่ให้ซ้ำ
  const askedIds = getAskedQuestionIds();
  let unaskedPool = pool.filter(q => !askedIds.includes(q.id));
  
  if (unaskedPool.length === 0) {
    // ถ้าถามตอบครบหมดทุกลำดับข้อในกลุ่มนี้แล้ว ให้รีเซ็ตประวัติสำหรับกลุ่มนี้
    if (gameState && gameState.askedQuestionIds) {
      gameState.askedQuestionIds = gameState.askedQuestionIds.filter(id => !pool.some(q => q.id === id));
      if (typeof SaveSystem !== 'undefined') SaveSystem.save(gameState);
    }
    unaskedPool = [...pool];
  }
  pool = unaskedPool;

  if (pool.length === 0) pool = [...allQuestions];
  if (pool.length === 0) return null;

  // สุ่มเลือกข้อที่ไม่ซ้ำ
  const randomIndex = Math.floor(Math.random() * pool.length);
  const chosen = pool[randomIndex];

  if (chosen) {
    saveAskedQuestionId(chosen.id);
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
  const playerGrade = gameState ? (gameState.grade || 1) : 1;
  
  // เลือกวิชาที่เหมาะกับกิจกรรม
  const subject = getSubjectForActivity(activity);
  
  // สุ่มคำถาม
  const question = getRandomQuestion(subject, playerGrade);
  
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
    plant: '🌱',
    water: '💧',
    harvest: '🌾'
  };

  const activityTitles = {
    plant: 'โบนัสการปลูก!',
    water: 'โบนัสการรดน้ำ!',
    harvest: 'โบนัสการเก็บเกี่ยว!'
  };

  const choicesHtml = question.choices.map((choice, index) => `
    <button class="choice-btn" onclick="submitAnswer(${index})">
      <span class="choice-letter">${String.fromCharCode(65 + index)}</span>
      <span class="choice-text">${sanitizeChoiceText(choice)}</span>
    </button>
  `).join('');

  modal.querySelector('.modal-content').innerHTML = `
    <div class="quiz-header">
      <span class="quiz-badge badge-subject">${question.subjectName}</span>
      <span class="quiz-badge badge-grade">ชั้น ป.${question.grade}</span>
      <span class="quiz-badge badge-topic">${question.topic}</span>
    </div>

    <div class="quiz-body">
      <h3 class="quiz-question">${question.question}</h3>
      <div class="quiz-choices">
        ${choicesHtml}
      </div>
    </div>

    <div class="quiz-footer">
      <button class="btn btn-sm btn-secondary" onclick="showQuizHint()" id="btnQuizHint">
        💡 คำใบ้
      </button>
      <div class="quiz-hint hidden" id="quizHintText">
        ${question.hint}
      </div>
    </div>
  `;
}

/**
 * แสดงคำใบ้
 */
function showQuizHint() {
  const hintText = document.getElementById('quizHintText');
  const btnHint = document.getElementById('btnQuizHint');
  if (hintText) hintText.classList.remove('hidden');
  if (btnHint) btnHint.classList.add('hidden');
}

/**
 * ส่งคำตอบ
 * @param {number} choiceIndex - อินเด็กซ์ของตัวเลือก (0-3)
 */
function submitAnswer(choiceIndex) {
  if (!currentQuiz) return;

  const isCorrect = (choiceIndex === currentQuiz.answer);
  
  // อัปเดตสถิติ
  quizStats.totalAnswered++;
  if (isCorrect) {
    quizStats.totalCorrect++;
    quizStats.streak++;
  } else {
    quizStats.streak = 0;
  }

  // ปิด Modal
  ModalSystem.close('quizModal');

  // คำนวณรางวัลโบนัส
  let bonusCoins = 0;
  let bonusExp = 0;

  if (isCorrect) {
    bonusCoins = (currentQuiz.reward === 'coin') ? 15 : 10;
    bonusExp = 10;
    
    // โบนัสตอบถูกติดต่อกัน
    if (quizStats.streak >= 3) {
      bonusCoins += 5;
      bonusExp += 5;
      ToastSystem.show(`🔥 ตอบถูก ${quizStats.streak} ข้อติด! ได้โบนัสพิเศษ!`, 'success');
    }

    if (typeof AudioManager !== 'undefined') AudioManager.playQuizSuccessSound();
  } else {
    if (typeof AudioManager !== 'undefined') AudioManager.playQuizWrongSound();
  }

  // แสดง Toast บอกผล
  if (isCorrect) {
    ToastSystem.show(`✨ ตอบถูกต้อง! ได้รับโบนัส +${bonusCoins} 💰 +${bonusExp} ⭐`, 'success');
  } else {
    const correctAnswerText = sanitizeChoiceText(currentQuiz.choices[currentQuiz.answer]);
    ToastSystem.show(`❌ ตอบผิด! คำตอบที่ถูกต้องคือ: ${correctAnswerText}`, 'error');
  }

  // เรียก Callback สรุปผล
  if (quizCallback) {
    const cb = quizCallback;
    currentQuiz = null;
    quizCallback = null;
    cb(isCorrect, bonusCoins, bonusExp);
  }
}
