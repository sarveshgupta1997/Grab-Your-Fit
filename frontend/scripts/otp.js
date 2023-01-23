
import navbar from "./navbar.js"
import baseURL from "./baseURL.js"
document.getElementById("navbar").innerHTML=navbar();


let token = localStorage.getItem("token");

let dropdown_content= document.getElementById("nav-dropdown-content");
if(token){   
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

let price=localStorage.getItem("Price");    
let productId=localStorage.getItem("ProductId");
let product_name=localStorage.getItem("Product_Name");
let loggedUser=localStorage.getItem("loggedUser");
let img1_src=localStorage.getItem("img1_src");

document.querySelector("#otp_submit").addEventListener("click",function(e){
    e.preventDefault();
    let otp=document.querySelector("#otp_entered").value;
    console.log(otp);
    if(otp=="1234"){
        alert("Payment Successful");
        let obj={
            title: product_name,
            price: price,
            product_id: productId,
            img1_src: img1_src,
            user:loggedUser
        }
        registerOrderInDb(obj);

    }else{
        alert("Incorrect OTP");
    }
})

async function registerOrderInDb(obj){
    try {
        let url = baseURL+"/orders/create"
        let res = await fetch(url,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "token":token
            },
            body:JSON.stringify(obj)
        });
        let data = await res.json();
        alert(data.Message);
        // window.location.href="/frontend/order_history.html";

    } catch (error) {
        alert(error.message)
    }
};