const selector = document.querySelectorAll(".selector");
for(let select of selector){
    for (currCode in countryList){
        let newOption =document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
        if(select.name==="from" && currCode === "USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to" && currCode === "INR"){
            newOption.selected="selected";
        }
        select.addEventListener("change",(event)=>{
            updateFlag(event.target);
        });
    }
}

const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newSrc;
}
const getData = async (fromCountry)=>{
    URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCountry}.json`;
    response = await fetch(URL);
    data = await response.json();
    return data;
}
const convertData = async ()=>{
    let fromCountry = document.querySelector("#from").value;
    let toCountry = document.querySelector("#to").value;
    data = await getData(fromCountry.toLowerCase());
    // console.log(data);
    convRate = data[fromCountry.toLowerCase()][toCountry.toLowerCase()];
    inputAmount=document.querySelector("#inputAmount").value;
    if(inputAmount<=0){
        document.querySelector("#inputAmount").value=1;
        inputAmount=1;
    }
    outputAmount = inputAmount*convRate;
    document.querySelector("#msg").innerText=outputAmount;
}
document.querySelector(".form").addEventListener("submit",(event)=>{event.preventDefault();
    convertData("usd")});