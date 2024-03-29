

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

getProducts();

async function getProducts(){
    try {
        let url = baseURL+"/orders/"
        let res = await fetch(url,{
            headers:{
                "token":token
            }
        });
        let data = await res.json();
        if(data.err){
            alert(data.err)
        }else{
            // alert(JSON.stringify(data))
            console.log(data)
            if(data.length==0){
                displayEmptyData(data);
            }else{
                displayData(data);
            }

        }
        // window.location.assign("/index.html");

    } catch (error) {
        alert(error.message)
    }
}
let products_container = document.querySelector("#products_container");
let product_count = document.querySelector("#product-count");

function displayEmptyData(data){
    let count=0;
    product_count.innerText=count+" orders";

    products_container.innerHTML=null;
            products_container.style.display="block";
            products_container.innerHTML+=`
                <div id="products-inner">
                    <p id="product-price-orignal" style="text-decoration:none;text-align:center;color:black; ">No orders placed yet.</p>
                </div>
                <div id="product-buttons" style="width:100%;">
                        <button id="buy-now" onclick="location.href='/frontend/all_products.html'">
                            Explore Now
                            <span class="material-symbols-outlined">shopping_cart_checkout</span>
                        </button>
                </div>
            `
    
}
function displayData(data){
    let count=0;
    products_container.innerHTML=null;
    data.forEach(el => {
        console.log(el.order_delivery_date)
            count++;
            let orignal_price= (el.price/100)*175;
            products_container.innerHTML+=`
                <div id="products-inner">
                    <img src="${el.img1_src}" id="${el._id}" alt="shirt">
                    <a id="product-title" href="">${el.title}</a>
                    <div id="product-price" style="display:block">
                    <p id="product-price-discounted">Price: ₹${el.price}</p>
                    <p id="product-price-discounted" class="order_status">Status: ${el.order_status}</p>
                    <p id="product-price-discounted" class="order_delivery_date">Delivered on: ${el.order_delivery_date}</p>
                        <p id="product-price-orignal" style="text-decoration:none">Order Date: ${el.order_date}</p>
                        <p id="product-price-orignal" style="text-decoration:none">Order Time: ${el.order_time}</p>
                        <p id="product-price-discount">Order Id: ${el._id}</p>
                    </div>
                </div>
            `
            
                // order_status_check(el)
                
            
           
    });
    product_count.innerText=count+" orders";
}

// function order_status_check(el){
//     let order_status=document.querySelectorAll(".order_status");
//     order_status.forEach(el=>{
//         if(el.order_status=="In Progress") el.style.color="blue";
//         console.log("hi")
//     })
// }