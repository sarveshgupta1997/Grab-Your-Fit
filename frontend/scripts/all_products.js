

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

getProducts();

async function getProducts(){
    try {
        let url = baseURL+"/products/"
        let res = await fetch(url);
        let data = await res.json();
        if(data.err){
            alert(data.err)
        }else{
            displayData(data);
        }
        // window.location.assign("/index.html");

    } catch (error) {
        alert(error.message)
    }
}
let products_container = document.querySelector("#products_container");
let product_count = document.querySelector("#product-count");
function displayData(data){
    let count=0;
    products_container.innerHTML=null;
    data.forEach(el => {
        if(el.status=="active"){
            count++;
            let orignal_price= (el.price/100)*175;
            products_container.innerHTML+=`
                <div id="products-inner">
                    <img src="${el.img1_src}" id="${el._id}" alt="shirt">
                    <div id="product-small-images">
                        <span><img src="${el.img1_src}" id="change_product_image" class="${el._id}" alt="shirt"></span>
                        <span><img src="${el.img2_src}" id="change_product_image" class="${el._id}" alt="shirt"></span>
                    </div>
                    <a id="product-title" href="">${el.title}</a>
                    <div id="product-price">
                        <p id="product-price-discounted">₹${el.price}</p>
                        <p id="product-price-orignal">₹${orignal_price}</p>
                        <p id="product-price-dot">·</p>
                        <p id="product-price-discount">25% off</p>
                        </div>
                        <div id="product-buttons">
                        <button id="buy-now" class="${el._id}---${el.price}---${el.title}---${el.img1_src}" >
                        Buy Now
                        <span class="material-symbols-outlined">
                        shopping_cart_checkout
                        </span>
                        </button>
                        </div>
                        </div>
                        `
                        changeImage();
                        buyNow();
                    }
                });
                product_count.innerText=count+" products";
            }
function buyNow(){
    let buyNow = document.querySelectorAll("#buy-now");
    
    buyNow.forEach(el=>{
        el.addEventListener("click",()=>{
            if(token){ 
                console.log(el.className)
                let arr = el.className.split("---");
                let productId = arr[0];
                let price = arr[1];
                let product_Name = arr[2];
                let img1_src = arr[3];
                
                localStorage.setItem("Price",price);
                localStorage.setItem("ProductId",productId)
                localStorage.setItem("Product_Name",product_Name)
                localStorage.setItem("img1_src",img1_src)
                window.location.href="/frontend/payment.html"
            }else{
                alert("Please Login First");
                window.location.href="/frontend/login.html"
            }
        })
    })
}

function changeImage(){
    let change_product_image = document.querySelectorAll("#change_product_image");
    
    change_product_image.forEach(el=>{
        el.addEventListener("mouseover",()=>{
            let product_image = document.getElementById(`${el.className}`);
            product_image.src=el.src;
        })
    })
}



