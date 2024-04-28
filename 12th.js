const quizData = [
    {
      question: 'Which subjects are you most interested in?',
      options: ['Science and Mathematics', 'Arts and Humanities', 'Commerce and Economics', 'Other'],
      answers: {
        'Science and Mathematics': 'science',
        'Arts and Humanities': 'arts',
        'Commerce and Economics': 'commerce',
        'Other': 'other',
      },
    },
    {
      question: 'What type of activities do you enjoy the most?',
      options: ['Problem-solving and Analysis', 'Creative Expression and Arts', 'Business and Management', 'Other'],
      answers: {
        'Problem-solving and Analysis': 'science',
        'Creative Expression and Arts': 'arts',
        'Business and Management': 'commerce',
        'Other': 'other',
      },
    },
    {
      question: 'Which career path are you interested in pursuing?',
      options: ['Engineering or Medicine', 'Fine Arts or Literature', 'Business or Finance', 'Other'],
      answers: {
        'Engineering or Medicine': 'science',
        'Fine Arts or Literature': 'arts',
        'Business or Finance': 'commerce',
        'Other': 'other',
      },
    },
    // Add more questions tailored to career interests and aptitudes.
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  
  let currentQuestion = 0;
  let userAnswers = {};
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    for (let i = 0; i < questionData.options.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = questionData.options[i];
      radio.addEventListener('change', function() {
        userAnswers[currentQuestion] = questionData.answers[radio.value];
      });
  
      const optionText = document.createTextNode(questionData.options[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkCompletion() {
    return Object.keys(userAnswers).length === quizData.length;
  }
  
  function displayResult() {
    if (!checkCompletion()) {
      resultContainer.innerHTML = 'Please answer all questions.';
      return;
    }
  
    // Predict career path based on user's answers
    let prediction = '';
    const scienceCount = Object.values(userAnswers).filter(answer => answer === 'science').length;
    const artsCount = Object.values(userAnswers).filter(answer => answer === 'arts').length;
    const commerceCount = Object.values(userAnswers).filter(answer => answer === 'commerce').length;
  
    if (scienceCount > artsCount && scienceCount > commerceCount) {
      prediction = 'Based on your interests and aptitude, you may consider pursuing a career in science-related fields such as Engineering or Medicine.';
    } else if (artsCount > scienceCount && artsCount > commerceCount) {
      prediction = 'Based on your interests and aptitude, you may consider pursuing a career in arts-related fields such as Fine Arts or Literature.';
    } else if (commerceCount > scienceCount && commerceCount > artsCount) {
      prediction = 'Based on your interests and aptitude, you may consider pursuing a career in commerce-related fields such as Business or Finance.';
    } else {
      prediction = 'Based on your interests and aptitude, you may consider exploring various career options further to find the best fit for you.';
    }
  
    resultContainer.innerHTML = prediction;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    userAnswers = {};
    displayQuestion();
    resultContainer.innerHTML = '';
  }
  
  submitButton.addEventListener('click', function() {
    if (currentQuestion < quizData.length - 1) {
      // Navigate to the next question
      currentQuestion++;
      displayQuestion();
    } else {
      // Check completion and display result
      if (checkCompletion()) {
        displayResult();
      } else {
        resultContainer.innerHTML = 'Please answer all questions.';
      }
    }
  });
  
    
  
  retryButton.addEventListener('click', retryQuiz);
  
  displayQuestion();