
const BASE_URL =
"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
  const dropdowns=document.querySelectorAll(".dropdown select");
 const fromCurr=document.querySelector(".from select");
 const toCurr=document.querySelector(".to select");
 const msg=document.querySelector(".msg");


 const btn=document.getElementById("bt");


  for(let select of dropdowns){
  for (currCode in countryList){
    let newOption=document.createElement("option");
    newOption.innerText=currCode;
    newOption.value=currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);   
}
  select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
  });
 }


const updateexchangerate = async () => {
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;
  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1"; 
  }

  // API expects lowercase base currency
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  
  // target currency also lowercase
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  
  let finalamount = amtval * rate;
  msg.innerText = `${amtval} ${fromCurr.value} = ${finalamount} ${toCurr.value}`;
};


 const updateFlag=(element)=>{
  let currCode=element.value;
  let countryCode=countryList[currCode];
  let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png` ;
  let img= element.parentElement.querySelector("img");
  img.src=newsrc;
 };
 
 


 btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateexchangerate();
  });

  let amountInput = document.querySelector(".amount input");
amountInput.addEventListener("keypress", (evt) => {
  if (evt.key === "Enter") {
    evt.preventDefault();
    updateexchangerate();
  }
});
  window.addEventListener("load",()=>{
    updateexchangerate();
  })

