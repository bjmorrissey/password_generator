const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl= document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardEl.addEventListener('click', () => {
    const textarea  =document.createElement('textarea')
    const password = resultEl.innerText;

    if (!password) {return}

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove()
    alert('Password is copied to clipboard!')

})

generateEl.addEventListener('click', () => {
     const length = +lengthEl.value
     const hasLower = lowercaseEl.checked
     const hasUpper = uppercaseEl.checked
     const hasNumber = numbersEl.checked
     const hasSymbol = symbolsEl.checked
    
     resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
})

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])

    
    if(typesCount === 0) {
        return ''
    } 
    
    for(let i = 0; i< length; i += typesCount) {
        typesArr.forEach(type =>{
           const funcName = Object.keys(type)[0]
           generatedPassword += randomFunc[funcName]()
        })
        
    }
    const finalPassword = generatedPassword.slice(0, length)
    return finalPassword
} 

function randomizer(min, max) {
    return Math.floor(Math.random()*1*(max-min)+min)
};

function getRandomLower() {
    return String.fromCharCode(randomizer(122,97))
};
function getRandomUpper() {
    return String.fromCharCode(randomizer(90, 65))
};
function getRandomNumber() {
    return String.fromCharCode(randomizer(57, 48))
};
function getRandomSymbol() {
    return String.fromCharCode(randomizer(47,33))
};


