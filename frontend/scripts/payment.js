
import navbar from "./navbar.js"
import baseURL from "./baseURL.js"
document.getElementById("navbar").innerHTML=navbar();


let token = localStorage.getItem("token");
let adminToken = localStorage.getItem("adminToken");

let dropdown_content= document.getElementById("nav-dropdown-content");
if(token || adminToken){   
    dropdown_content.innerHTML= `
    <button id="nav-mid-dropdown-btn1" onclick="location.href='/frontend/update_user.html'">Account Details</button>
    <button id="nav-mid-dropdown-btn2" onclick="location.href='/frontend/order_history.html'">Order History</button>
    <button id="nav-mid-dropdown-btn3">Log out</button>
    `;
    let logout_btn = document.getElementById("nav-mid-dropdown-btn3");
    
    logout_btn.addEventListener("click",()=>{
        localStorage.clear();
        dropdown_content.innerHTML= `
        <button id="nav-mid-dropdown-btn1" onclick="location.href='/frontend/login.html'">Sign In</button>
        <button id="nav-mid-dropdown-btn2" onclick="location.href='/frontend/signup.html'">Create Account</button>
        `;
        window.location.assign("/index.html");
    })
}

getUserName();
async function getUserName(){
    try {
        let url = baseURL+"/username"
        let res = await fetch(url,{
            headers: {
                "token":token
            }
        });
        let data = await res.json();
        if(data.user){
            localStorage.setItem("loggedUser",data.user)
        }else{
            localStorage.setItem("loggedUser","Guest")
        }
        
    } catch (error) {
        alert(error.message)
    }
}

    

let price=localStorage.getItem("Price") || 0;
let product_name=localStorage.getItem("Product_Name") || "Unisex Feather Jacket";
// console.log(price,plan)

document.getElementById("product_input").placeholder=`${product_name}`;
document.getElementById("price_input").placeholder=`${price}`;
document.getElementById("priceAmount").innerText=`₹${price}`;

document.querySelector("form").addEventListener("submit",function(){
    event.preventDefault();
    let num= document.querySelector("#card_num").value;
    let cvv= document.querySelector("#cvv").value;
    let date= document.querySelector("#date").value;
    let name= document.querySelector("#name").value;
    let msg="";
    if(num=="1234567890123456" && cvv=="123" && date=="1997-01-13" ){
        alert("Otp sent on your mobile");
        window.location.assign("/frontend/otp.html");
    }if(num!=="1234567890123456"){
        msg= "Wrong Creadentials- ";
        msg+=" card number "
    }if(cvv!=="123"){
        msg+=" cvv "
    }if(date!=="1997-01-13"){
        msg+=" date "
    }
    if(msg!==""){
        alert(msg);
    }
})

