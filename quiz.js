class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.timerInterval = null;

    this.timerElement = document.getElementById("timer");
    this.scoreElement = document.getElementById("score");
    this.nextButton = document.getElementById("next-btn");
    this.feedbackElement = document.getElementById("feedback");
    this.optionsElement = document.getElementById("options");

    // this.questionAnswered = false

    this.nextButton.addEventListener("click", () => this.moveToNextQuestion());

    // this.displayCurrentQuestion();

    this.initializeQuiz();
  }

  initializeQuiz() {
    this.clearElement(this.optionsElement);
    this.feedbackElement.textContent = "";
    this.timerElement.textContent = "";
    this.nextButton.style.display = "none";
    this.scoreElement.textContent = "Score: 0";
    this.displayCurrentQuestion();
  }

  clearElement(element) {
    element.innerHTML = "";
  }

  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  // add more methods here, such as checking answers, updating score, etc.
  displayCurrentQuestion() {
    const currentQuestion = this.getCurrentQuestion();
    const questionNumberElement = document.getElementById("question-number");
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const feedbackElement = document.getElementById("feedback");

    questionNumberElement.textContent = `Question ${this.currentQuestionIndex + 1}`; // Update question number
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    this.questionAnswered = false;

    currentQuestion.options.forEach((option, index) => {
      const optionButton = document.createElement("button");
      optionButton.textContent = option;
      optionButton.addEventListener("click", () => this.checkAnswer(index));
      optionsElement.appendChild(optionButton);

      this.nextButton.style.display = "none";
    });

    this.startTimer(); // Start the timer for each question
    this.nextButton.style.display = "block";
  }

  checkAnswer(selectedOption) {
    if (this.questionAnswered) {
      return;
    }
    const currentQuestion = this.getCurrentQuestion();
    const feedbackElement = document.getElementById("feedback");

    clearInterval(this.timerInterval);

    if (selectedOption === currentQuestion.correctAnswer) {
      this.score++;
      feedbackElement.textContent = "Correct!";
    } else if (selectedOption === -1) {
      feedbackElement.textContent = "Unanswered!";
    } else {
      feedbackElement.textContent = "Incorrect!";
    }

    this.scoreElement.textContent = `Score: ${this.score}`;

    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.showEndOfQuiz();
    }

    this.questionAnswered = true;

    this.moveToNextQuestion();
  }

  moveToNextQuestion() {
    this.currentQuestionIndex++;

    this.questionAnswered = false;

    if (this.currentQuestionIndex < this.questions.length) {
      this.displayCurrentQuestion();
    }
  }

  startTimer() {
    let timeLeft = 29;

    this.timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        this.timerElement.textContent = `Time left: ${timeLeft} seconds`;
        timeLeft--;
      } else {
        clearInterval(this.timerInterval);
        this.timerElement.textContent = "Time's up!";
        this.checkAnswer(-1);
      }
    }, 1000);
  }

  showEndOfQuiz() {
    clearInterval(this.timerInterval);
    document.getElementById("question-number").textContent = "End of Quiz";
    document.getElementById("question").textContent = "Thank you for completing the quiz!";
    document.getElementById("options").innerHTML = "";
    document.getElementById("feedback").textContent = "";
    this.timerElement.textContent = "";
    this.nextButton.style.display = "none";
    this.scoreElement.textContent = `Final Score: ${this.score} out of ${this.questions.length}`;
  }
}

// Quiz questions
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin"],
    correctAnswer: 0,
  },

  {
    question: "When did Nigeria gain independence?",
    options: [1945, 1960, 1987],
    correctAnswer: 1,
  },

  {
    question: "What is the capital of Nigeria?",
    options: ["Paris", "Lagos", "Abuja"],
    correctAnswer: 2,
  },

  {
    question: "When is the National day in Nigeria?",
    options: ["Oct 1st", "May 29th", "Dec 25th"],
    correctAnswer: 0,
  },

  {
    question: "What is the Nigerian currency?",
    options: ["Kobo", "Dollar", "Naira"],
    correctAnswer: 2,
  },

  {
    question: "What does the Eagle in the Nigerian Coat of Arms stand for?",
    options: ["Power", "Strength", "Humility"],
    correctAnswer: 1,
  },

  {
    question: "What does the white color on the Nigerian flag stand for?",
    options: ["Peace", "Friendship", "Holiness"],
    correctAnswer: 0,
  },

  {
    question: "What is the ending state of the Nigerian national anthem",
    options: ["Let the poor britt", "Peace and Unity", "Don't Suffocate them"],
    correctAnswer: 1,
  },

  {
    question: "Which country won the 2022 world cup?",
    options: ["Nigeria", "London", "Argentina"],
    correctAnswer: 2,
  },

  {
    question: "Who is the current president of Nigeria?",
    options: ["Jagoban Emi lokan", "Bola Ahmed Tinubu", "Asiwaju"],
    correctAnswer: 1,
  },
];
const quiz = new Quiz(questions);
