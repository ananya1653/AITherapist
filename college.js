const quizData = [
    {
      question: 'Which of the following activities do you find most fulfilling?',
      options: ['Helping others and volunteering', 'Exploring new places and cultures', 'Problem-solving and analyzing data', 'Creating art or music'],
      answers: {
        'Helping others and volunteering': 'Social and Community Services',
        'Exploring new places and cultures': 'Travel and Tourism',
        'Problem-solving and analyzing data': 'Science and Technology',
        'Creating art or music': 'Arts and Entertainment',
      },
    },
    {
      question: 'What type of work environment do you prefer?',
      options: ['Dynamic and fast-paced', 'Structured and organized', 'Collaborative and team-oriented', 'Flexible and independent'],
      answers: {
        'Dynamic and fast-paced': 'Entrepreneurship and Startups',
        'Structured and organized': 'Government and Public Administration',
        'Collaborative and team-oriented': 'Business and Management',
        'Flexible and independent': 'Freelancing and Self-Employment',
      },
    },
    {
      question: 'Which aspect of a job is most important to you?',
      options: ['Salary and financial stability', 'Work-life balance and flexibility', 'Career growth and advancement opportunities', 'Making a positive impact on society'],
      answers: {
        'Salary and financial stability': 'Finance and Accounting',
        'Work-life balance and flexibility': 'Human Resources and Organizational Development',
        'Career growth and advancement opportunities': 'Professional Development and Training',
        'Making a positive impact on society': 'Nonprofit and Social Enterprise',
      },
    },
    {
      question: 'What are your strongest skills?',
      options: ['Technical skills and problem-solving', 'Creativity and innovation', 'Communication and interpersonal skills', 'Leadership and decision-making'],
      answers: {
        'Technical skills and problem-solving': 'Engineering and Technology',
        'Creativity and innovation': 'Design and Media',
        'Communication and interpersonal skills': 'Marketing and Public Relations',
        'Leadership and decision-making': 'Management and Leadership',
      },
    },
    {
      question: 'Which industry or field interests you the most?',
      options: ['Healthcare and Wellness', 'Environmental Sustainability', 'Information Technology and Software Development', 'Fashion and Apparel'],
      answers: {
        'Healthcare and Wellness': 'Healthcare and Medical Services',
        'Environmental Sustainability': 'Environmental and Sustainability Services',
        'Information Technology and Software Development': 'Information Technology and Software Engineering',
        'Fashion and Apparel': 'Fashion Design and Merchandising',
      },
    },
    {
      question: 'What motivates you in your career?',
      options: ['Solving complex problems', 'Expressing creativity and individuality', 'Helping others and making a difference', 'Earning recognition and prestige'],
      answers: {
        'Solving complex problems': 'Research and Development',
        'Expressing creativity and individuality': 'Creative Arts and Design',
        'Helping others and making a difference': 'Social Work and Humanitarian Services',
        'Earning recognition and prestige': 'Corporate Leadership and Executive Management',
      },
    },
   
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
    let fieldCounts = {
      'Social and Community Services': 0,
      'Travel and Tourism': 0,
      'Science and Technology': 0,
      'Arts and Entertainment': 0,
      'Entrepreneurship and Startups': 0,
      'Government and Public Administration': 0,
      'Business and Management': 0,
      'Freelancing and Self-Employment': 0,
      'Finance and Accounting': 0,
      'Human Resources and Organizational Development': 0,
      'Professional Development and Training': 0,
      'Nonprofit and Social Enterprise': 0,
      'Engineering and Technology': 0,
      'Design and Media': 0,
      'Marketing and Public Relations': 0,
      'Management and Leadership': 0,
      'Healthcare and Medical Services': 0,
      'Environmental and Sustainability Services': 0,
      'Information Technology and Software Engineering': 0,
      'Fashion Design and Merchandising': 0,
      'Research and Development': 0,
      'Creative Arts and Design': 0,
      'Social Work and Humanitarian Services': 0,
      'Corporate Leadership and Executive Management': 0,
    };
  
    // Count the number of responses for each field
    for (let answer in userAnswers) {
      fieldCounts[userAnswers[answer]]++;
    }
  
    // Find the field with the maximum count
    let maxField = '';
    let maxCount = 0;
    for (let field in fieldCounts) {
      if (fieldCounts[field] > maxCount) {
        maxField = field;
        maxCount = fieldCounts[field];
      }
    }
  
    // Generate result message based on the most selected field
    let resultMessage = '';
    switch (maxField) {
      case 'Social and Community Services':
        resultMessage = 'Based on your responses, you may find fulfillment in careers related to social and community services, such as social work, counseling, or nonprofit management.';
        break;
      case 'Travel and Tourism':
        resultMessage = 'Your interests align with careers in the travel and tourism industry, where you can explore opportunities in hospitality management, tour guiding, or destination marketing.';
        break;
      case 'Science and Technology':
        resultMessage = 'Your skills and interests are well-suited for careers in science and technology, offering opportunities in fields such as engineering, computer science, or research and development.';
        break;
      // Add cases for other fields as needed
      default:
        resultMessage = 'Based on your responses, it seems you have diverse interests and could explore multiple career paths. Consider further exploring different fields and industries to find the best fit for you.';
        break;
    }
  
    resultContainer.innerHTML = resultMessage;
  }
  
  
  function retryQuiz() {
    currentQuestion = 0;
    userAnswers = {};
    resultContainer.innerHTML = '';
    displayQuestion();
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
  