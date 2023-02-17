
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
        title: form.title.value,
        price: form.price.value,
        desc: form.desc.value,
        brand: form.brand.value,
        category: form.category.value,
        img1_src: form.img1_src.value,
        img2_src: form.img2_src.value,
        status:form.status.value
    }
    registerInDb(obj);
})

async function registerInDb(obj){
    try {
        let url = baseURL+"/products/create"
        let res = await fetch(url,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "admintoken":adminToken
            },
            body:JSON.stringify(obj)
        });
        let data = await res.json();
        if(data.err){
            alert(data.err);
        }else{
            alert(data.Message);
            window.location.assign("./admin.html");
        }

    } catch (error) {
        alert(error.message)
    }
};

// let form = document.querySelector("form");
// form.addEventListener("submit",(event)=>{       
//     event.preventDefault();

//     let formData = new FormData();

//     formData.append("title", form.title.value);
//     formData.append("price", form.price.value);
//     formData.append("desc", form.desc.value);
//     formData.append("category", form.category.value);
//     // console.log(form.img_src.files[0])
//     const reader = new FileReader();
//     reader.readAsDataURL(form.img_src.files[0])
//     reader.onloadend=()=>{
//         console.log(reader.result)
//         formData.append("img_src",reader.result);
//         registerProductInDb(formData);
//     }
// })

// async function registerProductInDb(formData){
//     try {
//         let url = baseURL+"/products/create"
//         let res = await fetch(url,{
//             method:"POST",
//             body:formData
//         });
//         let data = await res.json(this);
//         if(data.Message){
//             alert(data.Message)
//         }else{
//             alert(JSON.stringify(data.err))
//         }
//         // window.location.assign("/index.html");

//     } catch (error) {
//         alert("not working")
//     }
// };
