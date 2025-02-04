// สร้าง Audio objects สำหรับเอฟเฟค
let passAudio = new Audio("Asset/Sound/anime-wow-sound-effect.mp3"); // เสียงเมื่อผ่านเกม
let failAudio = new Audio("Asset/Sound/fart-meme-sound.mp3"); // เสียงเมื่อไม่ผ่านเกม

// ฟังก์ชันเริ่มเกม: เมื่อกดปุ่ม "เริ่มต้น" จะเล่นเพลงและเริ่มนับถอยหลัง
function startGame() {
    let audio = document.getElementById("bg-music");

    // เล่นเพลงเมื่อกดปุ่มเริ่มเกม
    if (audio.paused) {
        audio.play().catch(error => console.log("Autoplay error:", error));
    }

    // ซ่อนหน้าข้อมูลเริ่มต้น
    document.querySelector(".container").style.display = "none";
    // แสดงนับถอยหลัง
    document.getElementById("countdown").style.display = "block";
    startCountdown();
}

// ฟังก์ชันที่ใช้จัดการการเล่น/หยุดเพลงจากปุ่ม
document.addEventListener("DOMContentLoaded", function () {
    let audio = document.getElementById("bg-music");
    let musicButton = document.getElementById("music-toggle");

    musicButton.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
            musicButton.textContent = "🔇 Mute Music";
        } else {
            audio.pause();
            musicButton.textContent = "🔊 Play Music";
        }
    });
});

// กำหนดคำถามและตัวเลือก (ใน object ของแต่ละคำถาม)
// **หมายเหตุ:** สำหรับคำถามที่ต้องการแสดงรูปภาพ ให้เพิ่ม property "image" และใส่ URL หรือ path ของรูปภาพลงไป
let questions = [
    {
        image: "Asset/Image/cube.jpg",
        question: "นับมุมแล้วได้เท่าไร?",
        choices: ["18", "20", "24", "28"],
        answer: "24"
    },
    {
        question: "หนังเรื่องล่าสุดที่ดูคือเรื่องอะไร? 🎬",
        choices: ["Everything Everywhere All at Once", "Pirates of the Caribbean: Dead Men Tell No Tales", "The Curious Case of Benjamin Button", "Spider-Man: Across the Spider-Verse"],
        answer: "The Curious Case of Benjamin Button"
    },
    {
        image: "Asset/Image/R.jpg",
        question: "คุณเห็นอะไร?",
        choices: [
            "ต้นไม้, ลานเดิน, ทะเลสาบ, ทางจักรยาน",
            "ต้นไม้, ลานเดิน, บ่อน้ำ, ร้านกาแฟ",
            "สระว่ายน้ำ, ลานเด็กเล่น, ทะเลสาบ, ทางจักรยาน",
            "ต้นไม้, ทะเลสาบ, ห้องสมุด, ร้านอาหาร"
        ],
        answer: "ต้นไม้, ลานเดิน, บ่อน้ำ, ร้านกาแฟ"
    },
    {
        question: "สัตว์ที่เร็วที่สุดในโลกคืออะไร?",
        choices: ["เสือชีต้า", "ช้าง", "นกกระเรียน", "กระต่าย"],
        answer: "เสือชีต้า"
    },
    {
        image: "Asset/Image/mall-591337_1280.jpg",
        question: "ช่วยจำของที่จะซื้อหน่อย",
        choices: ["นมสด, ไข่ไก่, ขนมปัง, เนยถั่ว", "โยเกิร์ต, ไข่เป็ด, ครัวซองต์, แยมสตรอว์เบอร์รี", "ผงซักฟอก, น้ำยาล้างจาน, กระดาษทิชชู่, สบู่", "น้ำยาปรับผ้านุ่ม, น้ำยาเช็ดกระจก, ทิชชู่เปียก, ครีมอาบน้ำ"],
        answer: "โยเกิร์ต, ไข่เป็ด, ครัวซองต์, แยมสตรอว์เบอร์รี"
    },
    {
        question: "คุณต้องเดินทางไปโรงพยาบาลจากบ้านของคุณ โดยเริ่มต้นจากถนนหน้าบ้านให้เดินทางไปทางซ้ายก่อน ขับตรงไปเรื่อย ๆ จนเจอสี่แยกแรก จากนั้นให้เลี้ยวขวาและขับต่อไปจนเห็นสวนสาธารณะทางซ้ายมือ หลังจากผ่านสวนไปประมาณ 500 เมตร จะเจอสี่แยกที่สอง ให้คุณเลี้ยวซ้ายและขับตรงไปจนถึงวงเวียน จากนั้นให้ออกทางออกที่สอง และขับต่อไปจนพบโรงพยาบาลอยู่ทางซ้ายมือ ข้อใดคือเส้นทางที่ถูกต้อง?",
        choices: [
            "ไปขวา, เลี้ยวซ้ายที่สี่แยกแรก, เลี้ยวขวาที่สี่แยกที่สอง",
            "ไปซ้าย, เลี้ยวขวาที่สี่แยกแรก, เลี้ยวซ้ายที่สี่แยกที่สอง",
            "ไปขวา, เลี้ยวขวาที่สี่แยกแรก, เลี้ยวซ้ายที่สี่แยกที่สอง",
            "ไปขวา, เลี้ยวซ้ายที่สี่แยกแรก, เลี้ยวซ้ายที่สี่แยกที่สอง"
        ],
        answer: "ไปซ้าย, เลี้ยวขวาที่สี่แยกแรก, เลี้ยวซ้ายที่สี่แยกที่สอง"
    },
    {
        question: "(984,326+759,872)x1,238÷287",
        choices: ["7,523,760", "7,525,750", "7,523,790", "7,523,750"],
        answer: "7,523,750"
    },
    {
        question: "ดาวเคราะห์ที่ใกล้ดวงอาทิตย์ที่สุดคืออะไร?",
        choices: ["ดาวโลก", "ดาวอังคาร", "ดาวพุธ", "ดาวศุกร์"],
        answer: "ดาวพุธ"
    },
    {
        image:"Asset/Image/OIP.jpg",
        question: "ทะเลสาบ,บ่อน้ำ,ธารน้ำแข็ง,แม่น้ำ",
        choices: ["ทะเลสาบ", "บ่อน้ำ", "แม่น้ำ", "ธารน้ำแข็ง"],
        answer: "ธารน้ำแข็ง"
    },
    {
        question: "เสียงที่มนุษย์ไม่ได้ยินเรียกว่าอะไร?",
        choices: ["คลื่นความถี่สูง", "อินฟราเรด", "อัลตราซาวด์", "คลื่นแม่เหล็ก"],
        answer: "อัลตราซาวด์"
    },
    {
        image:"Asset/Image/CHINA.jpg",
        question: "",
        choices: ["อินเดีย", "จีน", "อเมริกา", "รัสเซีย"],
        answer: "จีน"
    },
    {
        question: "องค์ประกอบใดของคอมพิวเตอร์ที่ทำหน้าที่เป็นศูนย์กลางในการประมวลผลข้อมูลและควบคุมการทำงานของระบบทั้งหมด โดยมีบทบาทสำคัญในการกำหนดความเร็วและประสิทธิภาพของเครื่อง?",
        choices: ["Central Processing Unit (CPU) with Multi-Core Architecture and Advanced Thermal Management System", "Random Access Memory (RAM) with High-Speed Data Transfer and Low Latency for Enhanced Multitasking Performance", "Solid State Drive (SSD) with NVMe Interface and High-Speed Read/Write Capabilities for Fast Booting and Data Access", "Graphics Processing Unit (GPU) with Dedicated VRAM and Ray Tracing Technology for High-Performance Rendering and Gaming"],
        answer: "Central Processing Unit (CPU) with Multi-Core Architecture and Advanced Thermal Management System"
    }
];

let currentQuestion = 0;
let correctAnswers = 0;
let isSecondRound = false;

// ฟังก์ชันนับถอยหลังก่อนเริ่มแสดงคำถาม
function startCountdown() {
    let countdownElement = document.getElementById("countdown");
    let count = 3;
    countdownElement.style.display = "block";

    let interval = setInterval(() => {
        count--;
        if (count <= 0) {
            clearInterval(interval);
            countdownElement.style.display = "none";
            showQuestion();
        } else {
            countdownElement.textContent = count;
        }
    }, 1000);
}

// ฟังก์ชันแสดงคำถาม
function showQuestion() {
    if (currentQuestion >= questions.length) {
        if (!isSecondRound) {
            isSecondRound = true;
            currentQuestion = 0;
            alert("เข้าสู่รอบเลือกคำตอบ!");
            showQuestion();
        } else {
            showResult();
        }
        return;
    }

    let questionContainer = document.getElementById("questionContainer");
    let questionText = document.getElementById("questionText");
    let answerText = document.getElementById("answerText");
    let choicesDiv = document.getElementById("choices");
    let okButton = document.getElementById("okButton");

    questionContainer.style.display = "block";

    let currentQuestionData = questions[currentQuestion];

    // ล้างเนื้อหาเก่าก่อน
    questionText.innerHTML = "";

    // ถ้ามี property "image" ใน object ให้แสดงรูปภาพ
    if (currentQuestionData.image) {
        let imgElement = document.createElement("img");
        imgElement.src = currentQuestionData.image;
        imgElement.alt = "รูปภาพคำถาม";
        imgElement.style.maxWidth = "100%";
        imgElement.style.height = "auto";
        questionText.appendChild(imgElement);
    }

    // แสดงข้อความคำถาม (ถ้ามี) โดยจะแสดงด้านล่างรูปภาพ
    if (currentQuestionData.question) {
        let textElement = document.createElement("p");
        textElement.innerHTML = currentQuestionData.question;
        questionText.appendChild(textElement);
    }

    if (!isSecondRound) {
        answerText.textContent = "เฉลย: " + currentQuestionData.answer;
        answerText.style.display = "none";
        choicesDiv.style.display = "none";
        okButton.style.display = "block";
    } else {
        setChoices();
        answerText.style.display = "none";
        choicesDiv.style.display = "block";
        okButton.style.display = "none";
    }
}

// ฟังก์ชันแสดงเฉลยและรอเวลาแล้วแสดงคำถามต่อไป
function showAnswer() {
    document.getElementById("answerText").style.display = "block";
    currentQuestion++;
    setTimeout(() => showQuestion(), 2000);
}

// ฟังก์ชันสุ่มและแสดงตัวเลือกคำตอบ
function setChoices() {
    let currentQuestionData = questions[currentQuestion];
    let correctAnswer = currentQuestionData.answer;
    let wrongAnswers = currentQuestionData.choices.filter(choice => choice !== correctAnswer);
    let allChoices = [correctAnswer, ...wrongAnswers];
    
    // สุ่มลำดับตัวเลือก
    allChoices = allChoices.sort(() => Math.random() - 0.5);

    document.getElementById("choiceA").textContent = "ก. " + allChoices[0];
    document.getElementById("choiceB").textContent = "ข. " + allChoices[1];
    document.getElementById("choiceC").textContent = "ค. " + allChoices[2];
    document.getElementById("choiceD").textContent = "ง. " + allChoices[3];

    document.getElementById("choiceA").dataset.correct = (allChoices[0] === correctAnswer);
    document.getElementById("choiceB").dataset.correct = (allChoices[1] === correctAnswer);
    document.getElementById("choiceC").dataset.correct = (allChoices[2] === correctAnswer);
    document.getElementById("choiceD").dataset.correct = (allChoices[3] === correctAnswer);
}

// ฟังก์ชันตรวจคำตอบเมื่อผู้ใช้คลิกตัวเลือก
function checkAnswer(event) {
    if (event.target.dataset.correct === "true") {
        correctAnswers++;
    }
    currentQuestion++;
    showQuestion();
}

// ฟังก์ชันแสดงผลลัพธ์หลังจบคำถาม และเล่นเสียงเอฟเฟคตามคะแนน
function showResult() {
    // กำหนดข้อความผลลัพธ์โดยแทรกลิงก์ดาวน์โหลดสำหรับกรณีผ่าน (คะแนน 9 หรือมากกว่า)
    let message =
        correctAnswers >= 9
            ? "ยินดีด้วยครับคุณผ่านแล้ว! ดาวน์โหลดไฟล์ <a href='Asset/โค้ดถอดรหัสข้อความในรูปภาพ.zip' download='Asset/โค้ดถอดรหัสข้อความในรูปภาพ.zip' style='color: cyan; text-decoration: underline;'>ที่นี่</a>"
            : "เสียใจด้วยนะคุณตอบผิดเยอะเกิน";

    // ซ่อน container คำถาม
    document.getElementById("questionContainer").style.display = "none";

    // แสดงผลลัพธ์ใน pop-up
    document.getElementById("resultMessage").innerHTML = message;
    document.getElementById("scoreMessage").textContent = "คะแนนที่ได้: " + correctAnswers + "/12";

    // แสดงปุ่ม "เริ่มต้นใหม่" เฉพาะกรณีที่ผู้เล่นไม่ผ่าน
    if (correctAnswers < 9) {
        document.getElementById("restartButton").style.display = "block";
    } else {
        document.getElementById("restartButton").style.display = "none";
    }
    
    // แสดงปุ่ม "กลับ" (เพิ่มปุ่มกลับไว้ใน popup)
    document.getElementById("backButton").style.display = "block";

    document.getElementById("popupResult").style.display = "block";

    // เล่นเสียงเอฟเฟคตามผลลัพธ์
    if (correctAnswers >= 9) {
        passAudio.play().catch(error => console.log("Pass effect error:", error));
    } else {
        failAudio.play().catch(error => console.log("Fail effect error:", error));
    }
}

// ฟังก์ชันสำหรับปุ่ม "กลับ" ที่จะนำไปยังไฟล์ HTML อื่น
function goBack() {
    window.location.href = 'index.html'; // เปลี่ยน 'other.html' เป็นชื่อไฟล์ที่ต้องการเชื่อมโยง
}

// ฟังก์ชันรีเซ็ตเกม (โดยรีเฟรชหน้าเว็บ)
function resetGame() {
    location.reload();
}
