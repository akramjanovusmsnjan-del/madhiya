
const questions = [
    {
        question: "O‘zbekiston Respublikasi Davlat madhiyasi qachon qabul qilingan?",
        answers: [
            "1991-yil 31-avgust",
            "1992-yil 10-dekabr",
            "1992-yil 8-dekabr",
            "1993-yil 1-sentabr"
        ],
        correct: 1
    },
    {
        question: "Davlat madhiyasining she’r muallifi kim?",
        answers: [
            "Abdulla Qodiriy",
            "Erkin Vohidov",
            "Abdulla Oripov",
            "Cho‘lpon"
        ],
        correct: 2
    },
    {
        question: "Davlat madhiyasining musiqa muallifi kim?",
        answers: [
            "Mutal Burhonov",
            "Yunus Rajabiy",
            "Komiljon Otaniyozov",
            "To‘xtasin Jalilov"
        ],
        correct: 0
    },
    {
        question: "Davlat madhiyasi qanday ramz hisoblanadi?",
        answers: [
            "Faqat musiqiy asar",
            "Davlat ramzi",
            "Sport belgisi",
            "Tarixiy xarita"
        ],
        correct: 1
    },
    {
        question: "O‘zbekiston Respublikasining davlat ramzlari qaysilar?",
        answers: [
            "Bayroq, gerb va madhiya",
            "Bayroq, pul va pasport",
            "Gerb, xarita va kitob",
            "Madhiya, kitob va qonun"
        ],
        correct: 0
    },
    {
        question: "Davlat madhiyasiga qanday munosabatda bo‘lish kerak?",
        answers: [
            "Befarq bo‘lish kerak",
            "Faqat bayramlarda eslash kerak",
            "Hurmat bilan munosabatda bo‘lish kerak",
            "Uni o‘zgartirish kerak"
        ],
        correct: 2
    },
    {
        question: "O‘zbekiston Respublikasi Konstitutsiyasi qachon qabul qilingan?",
        answers: [
            "1991-yil 1-sentabr",
            "1992-yil 8-dekabr",
            "1992-yil 10-dekabr",
            "1993-yil 1-yanvar"
        ],
        correct: 1
    },
    {
        question: "Davlat madhiyasi qaysi holatlarda yangrashi mumkin?",
        answers: [
            "Rasmiy marosimlarda",
            "Faqat uyda",
            "Faqat sport mashg‘ulotlarida",
            "Faqat dars vaqtida"
        ],
        correct: 0
    },
    {
        question: "Davlat madhiyasi nimani ifodalaydi?",
        answers: [
            "Faqat tarixiy voqealarni",
            "Xalqning Vatanga muhabbati va milliy g‘ururini",
            "Faqat tabiat manzaralarini",
            "Faqat sport yutuqlarini"
        ],
        correct: 1
    },
    {
        question: "Davlat ramzlarini hurmat qilish kimning burchi?",
        answers: [
            "Faqat davlat xizmatchilarining",
            "Faqat o‘qituvchilarning",
            "Har bir fuqaroning",
            "Faqat sportchilarning"
        ],
        correct: 2
    }
];

const questionCounter = document.getElementById("questionCounter");
const questionTitle = document.getElementById("questionTitle");
const questionNumber = document.getElementById("questionNumber");
const answersContainer = document.getElementById("answers");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const answerHint = document.getElementById("answerHint");
const nextBtn = document.getElementById("nextBtn");

const quizBox = document.getElementById("quizBox");
const resultBox = document.getElementById("resultBox");
const resultTitle = document.getElementById("resultTitle");
const scoreText = document.getElementById("scoreText");
const resultMessage = document.getElementById("resultMessage");
const restartBtn = document.getElementById("restartBtn");

let currentQuestion = 0;
let score = 0;
let answered = false;

function showQuestion() {
    const question = questions[currentQuestion];
    answered = false;

    questionCounter.textContent =
        `${currentQuestion + 1} / ${questions.length}-SAVOL`;

    questionNumber.textContent =
        String(currentQuestion + 1).padStart(2, "0");

    questionTitle.textContent = question.question;

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}%`;

    answerHint.textContent = "Javobni tanlang";

    nextBtn.disabled = true;
    nextBtn.textContent =
        currentQuestion === questions.length - 1
            ? "Natijani ko‘rish →"
            : "Keyingi savol →";

    answersContainer.innerHTML = "";

    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.className = "answer-option";
        button.type = "button";
        button.textContent =
            `${String.fromCharCode(65 + index)}. ${answer}`;

        button.addEventListener("click", () => {
            selectAnswer(index);
        });

        answersContainer.appendChild(button);
    });
}

function selectAnswer(index) {
    if (answered) return;

    answered = true;

    const question = questions[currentQuestion];
    const options =
        document.querySelectorAll(".answer-option");

    options.forEach((option, i) => {
        option.disabled = true;

        if (i === question.correct) {
            option.classList.add("correct");
        }

        if (i === index && i !== question.correct) {
            option.classList.add("wrong");
        }
    });

    if (index === question.correct) {
        score++;
        answerHint.textContent = "✓ To‘g‘ri javob!";
    } else {
        answerHint.textContent =
            "✕ Noto‘g‘ri javob. To‘g‘ri javob yashil rangda.";
    }

    nextBtn.disabled = false;
}

function showResult() {
    quizBox.hidden = true;
    resultBox.hidden = false;

    scoreText.textContent =
        `${score} / ${questions.length}`;

    const percentage =
        (score / questions.length) * 100;

    if (percentage === 100) {
        resultTitle.textContent = "Mukammal natija!";
        resultMessage.textContent =
            "Ajoyib! Barcha savollarga to‘g‘ri javob berdingiz!";
    } else if (percentage >= 80) {
        resultTitle.textContent = "A’lo natija!";
        resultMessage.textContent =
            "Juda yaxshi! Sizda davlat madhiyasi haqida mustahkam bilim bor.";
    } else if (percentage >= 60) {
        resultTitle.textContent = "Yaxshi natija!";
        resultMessage.textContent =
            "Yaxshi harakat! Ma’lumotlarni yana bir bor o‘rganib chiqing.";
    } else if (percentage >= 40) {
        resultTitle.textContent = "Yana mashq qiling!";
        resultMessage.textContent =
            "Bilimingizni mustahkamlash uchun yana bir bor urinib ko‘ring.";
    } else {
        resultTitle.textContent = "Bilimingizni oshiring!";
        resultMessage.textContent =
            "Madhiya haqidagi ma’lumotlarni o‘qing va testni qayta bajaring.";
    }

    resultBox.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

nextBtn.addEventListener("click", () => {
    if (!answered) return;

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResult();
    }
});

restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    answered = false;

    resultBox.hidden = true;
    quizBox.hidden = false;

    showQuestion();

    document.getElementById("test").scrollIntoView({
        behavior: "smooth"
    });
});

// Testni ishga tushirish
showQuestion();
