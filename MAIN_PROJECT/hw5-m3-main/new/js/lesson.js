// PHONE BLOCK

const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'invalid phone number'
        phoneResult.style.color = 'red'
    }
}

// TAB SLIDER

const tabContentBlocks = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')

let startNum = 0
let moveInterval

const hideTabContent = () => {
    tabContentBlocks.forEach((item) => {
        item.style.display = 'none'
    })
    tabs.forEach((item) => {
        item.classList.remove('tab_content_item_active')

    })
}
const showTabContent = (index = 0) => {
    tabContentBlocks[index].style.display = 'block'
    tabs[index].classList.add('tab_content_item_active')
    startNum = index
}

const startMove  = () => {
    moveInterval = setInterval(() => {
        startNum = (startNum + 1) % tabs.length
        hideTabContent()
        showTabContent(startNum)
    }, 3000)
}

const stopMove = () => {
    clearInterval(moveInterval)
}


hideTabContent()
showTabContent()
startMove()

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((item, index) => {
            if (event.target === item) {
                stopMove()
                hideTabContent()
                showTabContent(index)
                startMove()
            }
        })
    }
}

// CONVERTER

// const somInput = document.querySelector('#som')
// const usdInput = document.querySelector('#usd')
// const eurInput = document.querySelector('#eur')
// const converter = (element, targetElement , targetElement2 ) => {
//     element.oninput = () => {
//         const xhr = new XMLHttpRequest()
//         xhr.open('GET', '../data/converter.json')
//         xhr.setRequestHeader('Content-type', 'application-json')
//         xhr.send()
//
//         xhr.onload = () => {
//             const data = JSON.parse(xhr.response)
//
//
//             if (element.id === 'som') {
//                 targetElement.value = (element.value / data.usd).toFixed(2)
//                 targetElement2.value = (element.value / data.eur).toFixed(2)
//             }else if (element.id === 'usd') {
//                 targetElement.value = (element.value * data.usd).toFixed(2)
//                 targetElement2.value= (element.value /data.usd * data.eur ).toFixed(2)
//             }else if (element.id ===  "eur"){
//                 targetElement.value = (element.value * data.eur).toFixed(2)
//                 targetElement2.value = (element.value/data.eur*data.usd).toFixed(2)
//             }
//             if(element.value.trim() === ""){
//                 targetElement.value = ""
//                 targetElement2.value = ""
//             }
//         }
//     }
// }
//
//
// converter(somInput, usdInput ,eurInput)
// converter(usdInput, somInput ,eurInput)
// converter(eurInput, somInput ,usdInput)

const usdInput = document.querySelector('#usd');
const somInput = document.querySelector('#som');
const eurInput = document.querySelector('#eur');

const fetchData = async () => {
    try {
        const response = await fetch("../data/converter.json");
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка:', error);
        return null;
    }
};

const converter = (element, targetElement1, targetElement2) => {
    element.oninput = async () => {
        const data = await fetchData();

        if (!data) return;

        if (element.id === "som") {
            targetElement1.value = (element.value / data.usd).toFixed(2);
            targetElement2.value = (element.value / data.eur).toFixed(2);
        }
        if (element.id === "usd") {
            targetElement1.value = (element.value * data.usd).toFixed(2);
            targetElement2.value = ((element.value * data.usd) / data.eur).toFixed(2);
        }
        if (element.id === "eur") {
            targetElement1.value = (element.value * data.eur).toFixed(2);
            targetElement2.value = ((element.value * data.eur) / data.usd).toFixed(2);
        }
        if (element.value === "") {
            targetElement1.value = "";
            targetElement2.value = "";
        }
    };
};

converter(somInput, usdInput, eurInput);
converter(usdInput, somInput, eurInput);
converter(eurInput, somInput, usdInput);


// somInput.oninput = () => {
//     const xhr = new XMLHttpRequest()
//     xhr.open('GET', '../data/converter.json')
//     xhr.setRequestHeader('Content-type', 'application-json')
//     xhr.send()
//
//     xhr.onload = () => {
//         const data = JSON.parse(xhr.response)
//         // usdInput.value = somInput.value/data.usd
//         usdInput.value = (+somInput.value / data.usd).toFixed()
//
//     }
// }

// DRY - dont repeat yourself
// KISS - keep it super simple



// CARD SWITCHER

// const nextButton = document.querySelector('#btn-next');
// const prevButton = document.querySelector('#btn-prev');
// const cardBlock = document.querySelector('.card');
// let cardIndex = 1;
//
// const updateCard = (index) => {
//     fetch(`https://jsonplaceholder.typicode.com/todos/${index}`)
//         .then((response) => response.json())
//         .then((data) => {
//             cardBlock.innerHTML = `
//                 <p>${data.title}</p>
//                 <p>${data.completed}</p>
//                 <span>${data.id}</span>
//             `;
//         })
//
// }
// updateCard(cardIndex)
//
// nextButton.onclick = () => {
//     cardIndex++
//     if (cardIndex > 200){
//         cardIndex = 1
//     }
//     updateCard(cardIndex);
// }
//
// prevButton.onclick = () => {
//     cardIndex--;
//     if(cardIndex < 1) {
//         cardIndex = 200
//     }
//     updateCard(cardIndex);
// }

const nextButton = document.querySelector('#btn-next');
const prevButton = document.querySelector('#btn-prev');
const cardBlock = document.querySelector('.card');
let cardIndex = 1;

const updateCard = async (index) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${index}`);
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
        }
        const data = await response.json();
        cardBlock.innerHTML = `
            <p>${data.title}</p>
            <p>${data.completed}</p>
            <span>${data.id}</span>
        `;
    } catch (error) {
        console.error('Ошибка:', error);
    }
};

updateCard(cardIndex);

nextButton.onclick = () => {
    cardIndex++;
    if (cardIndex > 200) {
        cardIndex = 1;
    }
    updateCard(cardIndex);
};

prevButton.onclick = () => {
    cardIndex--;
    if (cardIndex < 1) {
        cardIndex = 200;
    }
    updateCard(cardIndex);
}


// const fetchConsole = async () => {
//     try {
//         const response = await fetch("https://jsonplaceholder.typicode.com/posts");
//         if (!response.ok) {
//             throw new Error('Ошибка при загрузке данных');
//         }
//         const data = await response.json();
//         console.log(data);
//     } catch (error) {
//         console.error('Ошибка:', error);
//     }
// };
//
// fetchConsole();



const searchInput = document.querySelector('.cityName')
const searchButton = document.querySelector('#search')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')
const weatherIcon = document.querySelector('#weather-icon')

const URL = 'http://api.openweathermap.org/data/2.5/weather'
const KEY = 'e417df62e04d3b1b111abeab19cea714'

searchButton.onclick = () => {
    fetch(`${URL}?appid=${KEY}&q=${searchInput.value}&units=metric&lang=RU`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                city.innerHTML = data.name || 'City not found'
                temp.innerHTML = data.main?.temp ? Math.round(data.main.temp) + '&deg;C' : '///'
                weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
            } else {
                city.innerHTML = 'City is not found'
                temp.innerHTML = '///'
                weatherIcon.src = ''
            }
        })
        .catch(() => { //
            city.innerHTML = 'City is not found'
            temp.innerHTML = '///'
            weatherIcon.src = ''
        })
    searchInput.value = ''
}
// query params -
//optional chaining - .?
// const address = {
//     name: 'ibraimova',
//     info: {
//         number: 103
//     }
// }
// console.log(address.info?.number)