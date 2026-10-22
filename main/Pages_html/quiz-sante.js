const quizData = [
    {
        question: "Quelle est la température normale du corps humain en bonne santé ?",
        a: "36°C",
        b: "37°C",
        c: "38°C",
        d: "39°C",
        correct: "b",
    },
    {
        question: "Combien de litres de sang le corps humain contient-il en moyenne ?",
        a: "3 à 4 litres",
        b: "4 à 5 litres",
        c: "5 à 6 litres",
        d: "6 à 7 litres",
        correct: "c",
    },
    {
        question: "Quel organe est principalement responsable de la filtration du sang ?",
        a: "Le foie",
        b: "Les reins",
        c: "Les poumons",
        d: "Le cœur",
        correct: "b",
    },
    {
        question: "Quel est le rôle principal des globules rouges ?",
        a: "Transporter l'oxygène",
        b: "Lutter contre les infections",
        c: "Coaguler le sang",
        d: "Produire de l'énergie",
        correct: "a",
    },
    {
        question: "Quelle vitamine est principalement produite par la peau lorsqu'elle est exposée au soleil ?",
        a: "Vitamine A",
        b: "Vitamine B12",
        c: "Vitamine C",
        d: "Vitamine D",
        correct: "d",
    },
    // Tableau existant des questions

    {
        question: "Quelle vitamine est essentielle pour renforcer le système immunitaire ?",
        a: "Vitamine A",
        b: "Vitamine B12",
        c: "Vitamine C",
        d: "Vitamine E",
        correct: "c",
    },
    {
        question: "Combien d'os contient le squelette humain adulte ?",
        a: "196",
        b: "206",
        c: "216",
        d: "226",
        correct: "b",
    },
    {
        question: "Quel est le plus grand organe du corps humain ?",
        a: "Le foie",
        b: "La peau",
        c: "Le cœur",
        d: "Les poumons",
        correct: "b",
    }


];

const quiz = document.getElementById('quiz');
const answers = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
    answers.forEach(answer => answer.checked = false);
}

function getSelected() {
    let answer;
    answers.forEach(ans => {
        if (ans.checked) {
            answer = ans.id;
        }
    });
    return answer;
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `
                <h2>Vous avez répondu correctement à ${score}/${quizData.length} questions.</h2>
                <button onclick="location.reload()">Rejouer</button>
            `;
        }
    }
});

loadQuiz();

