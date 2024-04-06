const BASE_URL =
  "https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn =document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList)
    {
        let newOption = document.createElement("option")
        newOption.innerText= currCode;
        newOption.value = currCode;
        if(select.name==="from" && currCode ==="USD")
        {   
            newOption.selected="selected";
        } else if (select.name === "to" && currCode === "INR")
        {
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(event)=>{
        updateFlag(event.target);
    })
}

const updateFlag =(element)=>{
    let currCode =element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img= element.parentElement.querySelector("img")
    img.src=newSrc;
}

const updateExchange= async ()=>{
    let amount =document.querySelector("form input");
    let amtValue=amount.value;
    if(amtValue==""|| amtValue<1)
    {
        amtValue=1;
        amount.value="1";
    }
    const newUrl=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response= await fetch(newUrl);
    const data =await response.json();
    const rateObj =data[fromCurr.value.toLowerCase()]
    const rate = rateObj[toCurr.value.toLowerCase()];
    const finalAmt=amtValue*rate;
    msg.innerText=`${amtValue} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}

btn.addEventListener("click",(eve)=>{
    eve.preventDefault();
    updateExchange();
})

window.addEventListener("load",()=>{
    updateExchange();
})