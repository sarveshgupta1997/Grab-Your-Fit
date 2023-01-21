
import navbar from "./navbar.js"
import baseURL from "./baseURL.js"
document.getElementById("navbar").innerHTML=navbar();

let token = localStorage.getItem("token");

let dropdown_content= document.getElementById("nav-dropdown-content");
if(token){   
    dropdown_content.innerHTML= `
    <button id="nav-mid-dropdown-btn1">Account Details</button>
    <button id="nav-mid-dropdown-btn2">Order History</button>
    <button id="nav-mid-dropdown-btn3">Log out</button>
    `;
    let logout_btn = document.getElementById("nav-mid-dropdown-btn3");
    
    logout_btn.addEventListener("click",()=>{
        localStorage.clear();
        dropdown_content.innerHTML= `
        <button id="nav-mid-dropdown-btn1" onclick="location.href='/frontend/login.html'">Sign In</button>
        <button id="nav-mid-dropdown-btn2" onclick="location.href='/frontend/signup.html'">Create Account</button>
        `;
    })
}

let form = document.querySelector("form");
form.addEventListener("submit",(event)=>{       
    event.preventDefault();
    let obj={
        email: form.email.value,
        pass: form.pass.value
    }
    // console.log(obj)
    loginFromDb(obj);
})
async function loginFromDb(obj){
    try {
        let url = baseURL+"/users/login"
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
            window.location.assign("/index.html");
        }else{
            alert("Wrong Credentials");
        }

        let token= data.token;
        localStorage.setItem("token",token)
        
        // console.log(token);
        // alert(JSON.stringify(data));
    } catch (error) {
        // alert("Wrong Credentials2");
        alert(error.message);
    }
};