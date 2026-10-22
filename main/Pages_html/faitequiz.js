const quizData = [
    {
        question: "Comment peut-on traduire HTML?",
        a: "Langage de balises pour l'hypertexte",
        b: "Langage de balises pour le transfert de l'hypertexte",
        c: "Langage de balises pour le processeur",
        d: "Langage de balises pour le style en cascade",
        correct: "a",
    },
    {
        question: "Combien de types de balises a-t-on?",
        a: "1",
        b: "2",
        c: "3",
        d: "4",
        correct: "b",
    },
    {
        question: "Pour fusionner les colonnes du tableau,on utilise la balise...",
        a: "<td colspan=...>",
        b: "<th colspan...>",
        c: "<table colspan=...>",
        d: "on ne peut pas fusinner des colonnes",
        correct: "a",
    },
    {
        question: "Laquelle de ces balises est une balise auto-fermante?",
        a: "<title>",
        b: "<p>",
        c: "<scipt>",
        d: "<img>",
        correct: "d",
    },
    {
        question: "L'endroit où on peut écrire le code CSS?",
        a: "<header>",
        b: "<article>",
        c: "<head>",
        d: "<footer>",
        correct: "c",
    },
    {
        question: "CSS est l'abréviation de:",
        a: "cascading sheet style",
        b: "cascading style sheet",
        c: "cascade sheet style",
        d: "cascading style sheets",
        correct: "d",
    },
    {
        question: "Quels sont les attribut(s) qui fonctionne(ent) sur toutes les balises?",
        a: "class",
        b: "id",
        c: "input",
        d: "class et id",
        correct: "d",
    },
    {
        question: "Pour changer l'apparence d'un certain lien lorsqu'on pointe au dessus?",
        a: ":focus",
        b: ":active",
        c: ":hover",
        d: ":visited",
        correct: "c",
    },
    {
        question: "Quelle est la fonction du javascript?",
        a: "développer les sites Web ou les applications Web",
        b: "intéractivité à notre site web",
        c: "Mise en forme des documents",
        d: "structurer une page Web",
        correct: "b",
    },
    {
        question: "combien y a-t-il de développeurs sur Java script? ",
        a: "14+ Millions",
        b: "15+ Millions",
        c: "16+ Millions",
        d: "17+ Millions",
        correct: "c",
    }
];
const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')
const answersTable = document.getElementById('answerTable')

let currentQuiz = 0
let score = 0

loadQuiz()

function loadQuiz() {

    deselectAnswers()
    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}



function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}


submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    if (answer) {
        if (answer == quizData[currentQuiz].correct) {
            score++
        }
        currentQuiz++
        if (currentQuiz < quizData.length) {
            loadQuiz()
        } else {
            quiz.innerHTML = `<h2>You answered ${score}/${quizData.length} questions correctly</h2><button onclick="location.reload()">Reload</button>`;
            quizData.forEach(element => {
                correctanswer = element.correct == "a" ? element.a : element.correct == "b" ? element.b : element.correct == "c" ? element.c : element.d;
                answersTable.insertAdjacentHTML("beforeend", '<th class=\"tableContent\">' + element.question + '</th><th class=\"tableContent\">' + correctanswer + '</th>');
            });
            answersTable.insertAdjacentHTML("afterbegin", "<th class=\"tableHeader\">Question</th><th class=\"tableHeader\">Correct Answer</th>");
        }
    }
})



function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}