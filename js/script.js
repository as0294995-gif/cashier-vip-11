document.addEventListener("DOMContentLoaded", () => {

const products=document.querySelectorAll(".product");
const invoiceBody=document.getElementById("invoiceBody");

const totalPrice=document.getElementById("totalPrice");

const discount=document.getElementById("discount");

const paid=document.getElementById("paid");

const change=document.getElementById("change");

const search=document.getElementById("search");

const clearBill=document.getElementById("clearBill");

const newOrder=document.getElementById("newOrder");

const printBill=document.getElementById("printBill");

const deleteItem=document.getElementById("deleteItem");

const currentDate=document.getElementById("currentDate");

const currentTime=document.getElementById("currentTime");

let cart=[];

let selectedRow=null;

function updateClock(){

const now=new Date();

currentDate.textContent=now.toLocaleDateString("ar-EG");

currentTime.textContent=now.toLocaleTimeString("ar-EG");

}

setInterval(updateClock,1000);

updateClock();

function renderInvoice(){

invoiceBody.innerHTML="";

let total=0;

cart.forEach((item,index)=>{

const row=document.createElement("tr");

row.innerHTML=`
<td>${item.name}</td>
<td>${item.qty}</td>
<td>${item.price}</td>
<td>${item.qty*item.price}</td>
`;

row.addEventListener("click",()=>{

selectedRow=index;

document.querySelectorAll("#invoiceBody tr").forEach(r=>r.classList.remove("selected"));

row.classList.add("selected");

});

invoiceBody.appendChild(row);

total+=item.qty*item.price;

});

const disc=Number(discount.value)||0;

const finalTotal=Math.max(total-disc,0);

totalPrice.textContent=finalTotal.toFixed(2);

const paidValue=Number(paid.value)||0;

change


products.forEach(product=>{

product.addEventListener("click",()=>{

const name=product.dataset.name;

const price=Number(product.dataset.price);

const found=cart.find(item=>item.name===name);

if(found){

found.qty++;

}else{

cart.push({

name:name,

price:price,

qty:1

});

}

renderInvoice();

});

});

discount.addEventListener("input",renderInvoice);

paid.addEventListener("input",renderInvoice);

search.addEventListener("input",()=>{

const value=search.value.trim();

products.forEach(product=>{

const name=product.dataset.name;

product.style.display=name.includes(value)?"flex":"none";

});

});
clearBill.addEventListener("click",()=>{

cart=[];

selectedRow=null;

discount.value=0;

paid.value="";

change.value="0.00";

renderInvoice();

});

newOrder.addEventListener("click",()=>{

if(confirm("بدء فاتورة جديدة؟")){

cart=[];

selectedRow=null;

discount.value=0;

paid.value="";

change.value="0.00";

renderInvoice();

}

});

deleteItem.addEventListener("click",()=>{

if(selectedRow===null){

alert("اختر صنفًا من الفاتورة أولاً");

return;

}

cart.splice(selectedRow,1);

selectedRow=null;

renderInvoice();

});

printBill.addEventListener("click",()=>{

window.print();

});

renderInvoice();

});
