
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

let form = document.querySelector("form");
form.addEventListener("submit",(event)=>{       
    event.preventDefault();
    let obj={
        email: form.email.value,
        pass: form.pass.value
    }
    // console.log(obj)
    adminLogInFromDb(obj);
})
async function adminLogInFromDb(obj){
    try {
        let url = baseURL+"/admin/login"
        let res = await fetch(url,{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(obj)
        });
        let data = await res.json();
        if(data.msg){
            alert(data.msg);
            window.location.href="/frontend/admin.html";
        }else{
            alert(data.err);
        }

        let adminToken= data.adminToken;
        localStorage.setItem("adminToken",adminToken);
        
    } catch (error) {
        alert(error.message);
    }
};