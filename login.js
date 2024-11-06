document.addEventListener('DOMContentLoaded', function() {
        const questions = [
            {
                question: "Що є найефективнішим способом зменшити кількість пластикових відходів?",
                answers: ['Рециклінг', 'Зменшення використання', 'Спалювання'],
                correctAnswer: "Зменшення використання"
            },
            {
                question: "Який вид транспорту має найменший вуглецевий слід?",
                answers: ['Автомобіль', 'Літак', 'Велосипед'],
                correctAnswer: "Велосипед"
            },
            {
                question: "Який з цих ресурсів є відновлюваним?",
                answers: ['Нафта', 'Сонячна енергія', 'Вугілля'],
                correctAnswer: "Сонячна енергія"
            },
            {
                question: "Скільки часу потрібно, щоб пластиковій пляшці розкластися у природі?",
                answers: ['450 років', '100 років', '20 років'],
                correctAnswer: "450 років"
            },
            {
                question: "Що знижує енергоспоживання у будинку?",
                answers: ['Використання енергозберігаючих ламп', 'Підвищення температури в кімнатах', 'Відкриті вікна взимку'],
                correctAnswer: "Використання енергозберігаючих ламп"
            },
            {
                question: "Яке дерево виділяє найбільше кисню?",
                answers: ['Береза', 'Дуб', 'Тополя'],
                correctAnswer: "Дуб"
            },
            {
                question: "Що є головною причиною глобального потепління?",
                answers: ['Використання пластику', 'Викиди парникових газів', 'Вирубка лісів'],
                correctAnswer: "Викиди парникових газів"
            },
            {
                question: "Який матеріал найкраще підходить для компостування?",
                answers: ['Скло', 'Метал', 'Картон'],
                correctAnswer: "Картон"
            },
            {
                question: "Що допомагає зменшити споживання енергії?",
                answers: ['Використання звичайних ламп', 'Використання енергозберігаючих приладів', 'Тримання вікон відкритими'],
                correctAnswer: "Використання енергозберігаючих приладів"
            },
            {
                question: "Які з цих дій є екологічно чистими?",
                answers: ['Використання одноразових пакетів', 'Використання сумок багаторазового використання', 'Купівля імпортованих товарів'],
                correctAnswer: "Використання сумок багаторазового використання"
            },
            {
                question: "Що таке компостування?",
                answers: ['Процес переробки сміття', 'Процес розкладання органічних відходів', 'Процес очищення води'],
                correctAnswer: "Процес розкладання органічних відходів"
            },
            {
                question: "Яка з цих альтернатив є найбільш екологічною?",
                answers: ['Вугілля', 'Сонячна енергія', 'Газ'],
                correctAnswer: "Сонячна енергія"
            },
            {
                question: "Яке явище викликане глобальним потеплінням?",
                answers: ['Зменшення озонового шару', 'Збільшення кількості викидів CO2', 'Зменшення рівня води в океанах'],
                correctAnswer: "Збільшення кількості викидів CO2"
            },
            {
                question: "Яка з цих дій є найкращою для збереження природи?",
                answers: ['Зменшення використання автомобілів', 'Використання більше пластику', 'Збільшення споживання електроенергії'],
                correctAnswer: "Зменшення використання автомобілів"
            },
            {
                question: "Який з цих відходів є найбільш шкідливим для водних екосистем?",
                answers: ['Металеві відходи', 'Пластикові пляшки', 'Складові побутової хімії'],
                correctAnswer: "Складові побутової хімії"
            },
            {
                question: "Яка з цих практик є найбільш екологічною?",
                answers: ['Вирубка лісів', 'Відновлення лісів', 'Використання хімікатів у сільському господарстві'],
                correctAnswer: "Відновлення лісів"
            },
            {
                question: "Що таке екологічний слід?",
                answers: ['Вимірювання використання природних ресурсів', 'Оцінка стану повітря', 'Кількість відходів'],
                correctAnswer: "Вимірювання використання природних ресурсів"
            },
            {
                question: "Які рослини найкраще очищають повітря?",
                answers: ['Кактуси', 'Деревяні рослини', 'Сукуленти'],
                correctAnswer: "Дерев'яні рослини"
            },
            {
                question: "Які з цих дій є екологічно свідомими?",
                answers: ['Використання енергоефективних ламп', 'Викидання сміття на вулиці', 'Ігнорування переробки'],
                correctAnswer: "Використання енергоефективних ламп"
            },
            {
                question: "Яка з цих енергій є відновлюваною?",
                answers: ['Ядерна енергія', 'Вітрова енергія', 'Вугілля'],
                correctAnswer: "Вітрова енергія"
            },
    
    ];
    const startTestButton = document.querySelector('.startTestButton');
    const question = document.querySelector('.question');
    const quiz = document.querySelector('.quiz');
    const result = document.querySelector('.result');
    const submitButton = document.querySelector('form button'); 
    const input1 = document.querySelector('.input1');
    const input2 = document.querySelector('.input2');
    const sentButton = document.querySelector('.sentButton');
    const tooltip = document.querySelector('.tooltip');
    const images = document.querySelectorAll('.slider img');
    const erorDiv = document.getElementById('eror');

    submitButton.disabled = true;

    let currentQuestionIndex = 0;
    let resultCorrectCount = 0;

    function startTest() {
        startTestButton.style.display = 'none';
        tooltip.style.display = 'none';
        // questionButton.style.display = 'block';
        currentQuestionIndex = 0;
        resultCorrectCount = 0;
        result.style.display = 'none';
        sentButton.disabled = true;
        showQuestion();
    }

    function showQuestion() {
        quiz.innerHTML = '';
        
        if (currentQuestionIndex < questions.length) {
            question.textContent = questions[currentQuestionIndex].question;
            
            questions[currentQuestionIndex].answers.forEach(answer => {
                const button = document.createElement('button');
                button.textContent = answer;
                button.classList.add('answerButton');
                quiz.appendChild(button);
                button.addEventListener('click', () => checkAnswer(answer));
            });
        } else {
            endTest();
        }
    }

    function checkAnswer(answer) {
        if (answer === questions[currentQuestionIndex].correctAnswer) {
            resultCorrectCount++;
        }
        currentQuestionIndex++;
        showQuestion();
    }

    function endTest() {
        quiz.innerHTML = '';
        question.textContent = '';
        result.style.display = 'block';
        sentButton.disabled = false;
        submitButton.disabled = false;
    }

    startTestButton.addEventListener('click', startTest);
    // questionButton.style.display = 'none'; 

    sentButton.addEventListener('click', goOver);

    function goOver(e) {
        e.preventDefault();

        const loginValue = input1.value.trim();
    const passwordValue = input2.value.trim();

    // Перевірка на порожні поля
    if (loginValue === '' || passwordValue === '') {
        erorDiv.textContent = 'Будь ласка, заповніть всі поля';
        return; // Зупиняємо виконання, якщо поля порожні
    }

        console.log(input1.value);
        console.log(input2.value);
        console.log(resultCorrectCount);
        const obj = {
            userName: input1.value,
            userPass: input2.value,
            userCount: resultCorrectCount
        };

        fetch('login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        })  
            .then((response) => response.json())
            .then((data) => {
                

                
                console.log(data)

                if(data.success) {
                    window.location.href = 'home.html';
                } else {
                    erorDiv.textContent = 'неправильний логін, або пароль';
                }
            })
            .catch((eror) => {
                console.log(eror);
                erorDiv.textContent = 'помилка на сервері, спробуйте пізніше';
            })
    }

    let currentIndex = 0;
    const imageCount = images.length;
    const interval = 7000; // секунди
    function changeImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % imageCount;
        images[currentIndex].classList.add('active');
    }
    setInterval(changeImage, interval);

    setTimeout(function() {
        document.getElementById('notification').classList.remove('hidden');
    }, 5000);

    // При натисканні кнопки "ОК" приховати вікно
    document.getElementById('okButton').addEventListener('click', function() {
        document.getElementById('notification').classList.add('hidden');
    });
    
});
