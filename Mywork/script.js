const inputSlider =  document.querySelector("[ data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength = 10;
let checkCount = 0;


handleSlider();
function handleSlider()
{
    lengthDisplay.innerText=passwordLength;
    inputSlider.value=passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}
function setIndicator(color)
{
    indicator.style.color="color";
    indicator.style.boxShadow= "0px 0px 12px 1px ${color}"

}
function  generateRndInteger(min,max)
{
    return Math.floor(Math.random()*(max-min))+min;
}
function generateRandomNumber(){
    return generateRndInteger(0,9);
}
function generateLowerCase()
{
    return String.fromCharCode(generateRndInteger(97,122));
}
function generateUpperCase()
{
    return String.fromCharCode(generateRndInteger(65,91));
}
function generateSymbol()
{
    const randNum =generateRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}
async function copyContent()
{
        try 
        {
            await navigator.clipboard.writeText(passwordDisplay.value);
            copyMsg.innerText = "copied";
        } 
        catch (e) 
        {
            copyMsg.innerText = "failed";
        }
        copyMsg.classList.add("active");

        setTimeout( ()=>{
            copyMsg.classList.remove("active");
        },5000);
}
inputSlider.addEventListener('input',(e) =>
{
    passwordLength = e.target.value;
    handleSlider();
})
copyBtn.addEventListener('click',() =>
{
    if(passwordDisplay.value);
    copyContent();
})
allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})
function handleCheckBoxChange()
{
    checkCount = 0;
    allCheckBox.forEach((checkbox)=>{
    if(checkbox.checked)
    {
        checkCount++;
    }
});
    if(checkCount>passwordLength)
    {
        passwordLength=checkCount;
        handleSlider();
    }
}
generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected

    if(checkCount == 0) 
        return;

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
    password = "";
    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

    //compulsory addition
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex =  generateRndInteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    console.log("Remaining adddition done");
    //shuffle the password
    
    passwordDisplay.value = password;
    console.log("UI adddition done");
    //calculate strength
    calcStrength();
});