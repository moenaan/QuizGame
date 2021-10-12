// (function(){
//     function buildQuiz(){
//       // variable to store the HTML output
//       const output = [];
  
//       // for each question...
//       myQuestions.forEach(
//         (currentQuestion, questionNumber) => {
  
//           // variable to store the list of possible answers
//           const answers = [];
  
//           // and for each available answer...
//           for(letter in currentQuestion.answers){
  
//             // ...add an HTML radio button
//             answers.push(
//               `<label>
//                 <input type="radio" name="question${questionNumber}" value="${letter}">
//                 ${letter} :
//                 ${currentQuestion.answers[letter]}
//               </label>`
//             );
//           }
  
//           // add this question and its answers to the output
//           output.push(
//             `<div class="question"> ${currentQuestion.question} </div>
//             <div class="answers"> ${answers.join('')} </div>`
//           );
//         }
//       );
  
//       // finally combine our output list into one string of HTML and put it on the page
//       quizContainer.innerHTML = output.join('');
//     }
  
//     function showResults(){
  
//       // gather answer containers from our quiz
//       const answerContainers = quizContainer.querySelectorAll('.answers');
  
//       // keep track of user's answers
//       let numCorrect = 0;
  
//       // for each question...
//       myQuestions.forEach( (currentQuestion, questionNumber) => {
  
//         // find selected answer
//         const answerContainer = answerContainers[questionNumber];
//         const selector = `input[name=question${questionNumber}]:checked`;
//         const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
//         // if answer is correct
//         if(userAnswer === currentQuestion.correctAnswer){
//           // add to the number of correct answers
//           numCorrect++;
  
//           // color the answers green
//           answerContainers[questionNumber].style.color = 'lightgreen';
//         }
//         // if answer is wrong or blank
//         else{
//           // color the answers red
//           answerContainers[questionNumber].style.color = 'red';
//         }
//       });
  
//       // show number of correct answers out of total
//       resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
//     }
  
//     const quizContainer = document.getElementById('quiz');
//     const resultsContainer = document.getElementById('results');
//     const submitButton = document.getElementById('submit');
//     const myQuestions = [
//       {
//         question: "Who invented JavaScript?",
//         answers: {
//           a: "Douglas Crockford",
//           b: "Sheryl Sandberg",
//           c: "Brendan Eich"
//         },
//         correctAnswer: "c"
//       },
//       {
//         question: "Which one of these is a JavaScript package manager?",
//         answers: {
//           a: "Node.js",
//           b: "TypeScript",
//           c: "npm"
//         },
//         correctAnswer: "c"
//       },
//       {
//         question: "Which tool can you use to ensure code quality?",
//         answers: {
//           a: "Angular",
//           b: "jQuery",
//           c: "RequireJS",
//           d: "ESLint"
//         },
//         correctAnswer: "d"
//       }
//     ];
  
//     // Kick things off
//     buildQuiz();
  
//     // Event listeners
//     submitButton.addEventListener('click', showResults);
//   })();
const timeEl = document.querySelector(".time");
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})
function countdownTime() {
  var timeCountdown = 60;
    var timeInterval = setInterval(function () {  
      if (timeCountdown > 1) {    
          displayTimeEL.textContent = timeCountdown;   
          timeCountdown--;
    // } if (timeInterval === 0) {
    //   quiz.innerHTML= `${gameOver} ${grade}%`
    // }
      // if(timeCountdown = 0) {
      //   displayTimeEL.textContent = gameOver; 
      //}
      } else {    
          displayTimeEL.textContent = ''; 
          clearInterval(timeInterval);
        }
    }, 1000);
};

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Who invented JavaScript?',
    answers: [
      { text: 'Brendan Eich', correct: true },
      { text: 'Douglas Crockford', correct: false },
      { text: 'Sheryl Sandberg', correct: false}
    ]
  },
  {
    question: 'Which one of these is a JavaScript package manager?',
    answers: [
      { text: 'Node.js', correct: false },
      { text: 'TypeScript', correct: false },
      { text: 'npm', correct: true },
      { text: 'React', correct: false }
    ]
  },
  {
    question: 'Which tool can you use to ensure code quality?',
    answers: [
      { text: 'Angular', correct: false },
      { text: 'jQuery', correct: false },
      { text: 'RequireJS', correct: false },
      { text: 'ESlint', correct: true }
    ]
  },
  {
    question: 'Which of these languages is a static programming language?',
    answers: [
      { text: 'Javascript', correct: false },
      { text: 'Python', correct: false },
      { text: 'C++', correct: true }
    ]
  }
]