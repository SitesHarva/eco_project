let tips = [];

fetch('auth.php') 
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if(!data.log) {
            window.location.href = 'login.html';
        } else {
            fetch('main.php')
            .then((response) => response.json())
            .then((data) => {
                if(data.error) {
                    console.log('помилка на сервері');
                } else {
                    tips = data.tips;
                    showTips(tips);
                    updateFavouriteTips();
                }
            })
        }
    })
    .catch((eror) => {
        console.log(eror);
    })


const tipDiv = document.querySelector('.tipDiv');
const favouriteTipDiv = document.querySelector('.favouriteTipDiv');
const newTipText = document.querySelector('.newTipText');
const saveTipButton = document.querySelector('.saveTipButton');
const addTipForm = document.querySelector('.addTipForm');
const showFavouriteButton = document.querySelector('.showFavouriteButton');
const showAllTipsButton = document.querySelector('.showAllTipsButton');
const tipsDiv = document.querySelector('.tipsdiv');

function showTips(tips) {
    tipDiv.innerHTML = '';
    console.log(tips);
    if (tips.length > 0) {
        for (let i = 0; i < tips.length; i++) {
            const item = tips[i];
            const div = document.createElement('div');
            div.classList.add('divElement');

            const p = document.createElement('p');
            p.textContent = item.text;

            const buttonEdit = document.createElement('button');
            buttonEdit.textContent = 'Редагувати';
            buttonEdit.addEventListener('click', () => {
                editTip(item);
            });

            const button = document.createElement('button');
            button.textContent = item.taken ? 'Видалити' : 'Додати до вибраного';
            button.addEventListener('click', () => takenTip(item, button));

            div.appendChild(p);
            div.appendChild(buttonEdit);
            div.appendChild(button);
            tipDiv.appendChild(div);
        }
    } else {
        const noTipsMessage = document.createElement('p');
        noTipsMessage.textContent = 'Немає доступних порад.';
        tipDiv.appendChild(noTipsMessage);
    }
}

function updateFavouriteTips() {
    favouriteTipDiv.innerHTML = '';

    const favouriteTips = tips.filter(tip => tip.taken);

    if (favouriteTips.length > 0) {
        for (let i = 0; i < favouriteTips.length; i++) {
            const item = favouriteTips[i];
            const div = document.createElement('div');
            div.classList.add('divElement');

            const p = document.createElement('p');
            p.textContent = item.text;
            div.appendChild(p);

            const button = document.createElement('button');
            button.textContent = 'Видалити з вибраного';
            button.addEventListener('click', () => {

                fetch('main.php', {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: item.id,
                        text: item.text,
                        taken: !item.taken,
                    })
                }) 
                .then((response) => response.json())
                .then((data) => {
                if(data.error) {
                    tipsDiv.textContent = 'помилка на сервері';
                } else {
                    item.taken = !item.taken;
                    showTips(tips);
                    updateFavouriteTips();
                }
            })
            .catch((error) => {
                tipsDiv.textContent = 'помилка на сервері';
            })
            });
            div.appendChild(button);
            favouriteTipDiv.appendChild(div);
        }
    } else {
        const noTipsMessage = document.createElement('p');
        noTipsMessage.textContent = 'Немає доступних порад.';
        favouriteTipDiv.appendChild(noTipsMessage);
    }
}

function editTip(item) {
    console.log(item);
    newTipText.value = item.text;
    addTipForm.style.display = 'block';
    saveTipButton.onclick = function () {
        item.text = newTipText.value;
        console.log(item.text);
        console.log(item.id);
        console.log(item.taken);
        fetch('main.php', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: item.id,
                text: item.text,
                taken: item.taken
            })
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.error) {
                    tipsDiv.textContent = 'помилка на сервері';
                } else {
                    addTipForm.style.display = 'none';
                }
            })
            .catch((error) => {
                tipsDiv.textContent = 'помилка на сервері';
            })


        console.log(tips);
        showTips(tips);
        updateFavouriteTips();
    };
}

function takenTip(item, button) {
    fetch('main.php', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: item.id,
            taken: !item.taken,
            text: item.text
        })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if(data.error) {
            tipsDiv.textContent = 'помилка на сервері';
        }});

        item.taken = !item.taken;
        button.textContent = item.taken ? 'Видалити' : 'Додати до вибраного';
        updateFavouriteTips();
}



// saveTipButton.addEventListener('click', () => {
//     const newTip = {
//         text: newTipText.value,
//         max: 5, 
//         id: tips.length + 1,
//         taken: false
//     };
//     tips.push(newTip);
//     filteredTips.push(newTip);
//     newTipText.value = '';
//     showTips();
//     console.log(tips);
// });

showFavouriteButton.addEventListener('click', () => {
    tipDiv.style.display = 'none';
    favouriteTipDiv.style.display = 'block';
    showFavouriteButton.style.display = 'none';
    showAllTipsButton.style.display = 'block';
});

showAllTipsButton.addEventListener('click', () => {
    tipDiv.style.display = 'block';
    favouriteTipDiv.style.display = 'none';
    showFavouriteButton.style.display = 'block';
    showAllTipsButton.style.display = 'none';
});









































// const resultCorrectCount = 5;

// const api = '4a1ddb8e9527b03b2d5f90de93149b52';

// const tips = [
//     {
//         text: 'abcbd',
//         max: 4,
//         id: 1,
//         taken: false
//     },
//     {
//         text: 'aafcsdfd',
//         max: 4,
//         id: 2,
//         taken: false
//     },
//     {
//         text: 'aloeoroe',
//         max: 9,
//         id: 3,
//         taken: false
//     },
//     {
//         text: 'cloer',
//         max: 10,
//         id: 4,
//         taken: false
//     }
// ];

// const filteredTips = tips.filter((tip) => tip.max >= resultCorrectCount);

// const tipDiv = document.querySelector('.tipDiv');
// const favouriteTipDiv = document.querySelector('.favouriteTipDiv');
// const newTipText = document.querySelector('.newTipText');
// const saveTipButton = document.querySelector('.saveTipButton');
// const addTipForm = document.querySelector('.addTipForm');
// const showFavouriteButton = document.querySelector('.showFavouriteButton');
// const showAllTipsButton = document.querySelector('.showAllTipsButton');

// function showTips() {
//     tipDiv.innerHTML = '';
//     if (filteredTips.length > 0) {
//         for (let i = 0; i < filteredTips.length; i++) {
//             const item = filteredTips[i];
//             const div = document.createElement('div');
//             div.classList.add('divElement');

//             const p = document.createElement('p');
//             p.textContent = item.text;

//             const buttonEdit = document.createElement('button');
//             buttonEdit.textContent = 'Редагувати';
//             buttonEdit.addEventListener('click', () => {
//                 editTip(item);
//             });

//             const button = document.createElement('button');
//             button.textContent = item.taken ? 'Видалити' : 'Додати до вибраного';
//             button.addEventListener('click', () => {
//                 item.taken = !item.taken;
//                 button.textContent = item.taken ? 'Видалити' : 'Додати до вибраного';
//                 updateFavouriteTips();
//             });

//             div.appendChild(p);
//             div.appendChild(buttonEdit);
//             div.appendChild(button);
//             tipDiv.appendChild(div);
//         }
//     } else {
//         const noTipsMessage = document.createElement('p');
//         noTipsMessage.textContent = 'Немає доступних порад.';
//         tipDiv.appendChild(noTipsMessage);
//     }
// }
// showTips();

// function updateFavouriteTips() {
//     favouriteTipDiv.innerHTML = '';

//     const favouriteTips = tips.filter(tips => tips.taken);

//     if (favouriteTips.length > 0) {
//         for (let i = 0; i < filteredTips.length; i++) {
//             const item = filteredTips[i];
//             if (!item.taken) {
//                 continue;
//             }
//             const div = document.createElement('div');
//             div.classList.add('divElement');

//             const p = document.createElement('p');
//             p.textContent = item.text;
//             div.appendChild(p);

//             const button = document.createElement('button');
//             button.textContent = 'Видалити з вибраного';
//             button.addEventListener('click', () => {
//                 item.taken = !item.taken;
//                 showTips();
//                 updateFavouriteTips();
//             });
//             div.appendChild(button);
//             favouriteTipDiv.appendChild(div);
//         }
//     } else {
//         const noTipsMessage = document.createElement('p');
//         noTipsMessage.textContent = 'Немає доступних порад.';
//         favouriteTipDiv.appendChild(noTipsMessage);
//     }
// }
// updateFavouriteTips();

// function editTip(item) {
//     console.log(item);
//     newTipText.value = item.text;
//     addTipForm.style.display = 'block';
//     saveTipButton.onclick = function () {
//         item.text = newTipText.value;
//         addTipForm.style.display = 'none';
//         showTips();
//         updateFavouriteTips();
//     };
// }

// // saveTipButton.addEventListener('click', () => {
// //     const newTip = {
// //         text: newTipText.value,
// //         max: 5, 
// //         id: tips.length + 1,
// //         taken: false
// //     };
// //     tips.push(newTip);
// //     filteredTips.push(newTip);
// //     newTipText.value = '';
// //     showTips();
// //     console.log(tips);
// // });

// showFavouriteButton.addEventListener('click', () => {
//     tipDiv.style.display = 'none';
//     favouriteTipDiv.style.display = 'block';
//     showFavouriteButton.style.display = 'none';
//     showAllTipsButton.style.display = 'block';
// });

// showAllTipsButton.addEventListener('click', () => {
//     tipDiv.style.display = 'block';
//     favouriteTipDiv.style.display = 'none';
//     showFavouriteButton.style.display = 'block';
//     showAllTipsButton.style.display = 'none';
// });






// const inputApi = document.querySelector('.inputApi');
// const weatherButton = document.querySelector('.weatherButton');
// const resultApi = document.querySelector('.resultApi');
// const resultApi2 = document.querySelector('.resultApi2');
// const resultApi3 = document.querySelector('.resultApi3');
// const errorApi = document.querySelector('.errorApi');
// const url = 'https://api.openweathermap.org/data/2.5/weather';

// weatherButton.addEventListener('click', function() {
//     if(inputApi.value.length < 2) {
//         errorApi.innerHTML = 'Назва міста неправильна';
//         return;
//     }
//     errorApi.innerHTML = '';

    
//     getWeather(inputApi.value);

// });

// async function getWeather(city) {
//     try {
//         const response =  await fetch(`${url}?q=${city}&units=metric&appid=${api}`);

//         const data = await response.json();
//         console.log(data);
//         if(data.cod === '404') {
//             errorApi.innerHTML = '404';
//             return;
//         }

//         const temp = data.main.temp;
//         const wind = data.wind.speed;
//         const humidity = data.main.humidity;
//         console.log(temp);
//         console.log(wind);
//         console.log(humidity);

//         resultApi.innerHTML = temp;
//         resultApi2.innerHTML = wind;
//         resultApi3.innerHTML = humidity;

//     } catch(error) {
//         console.log(error);
//     }
// }