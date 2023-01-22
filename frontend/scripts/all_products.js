

import navbar from "./navbar.js"
import baseURL from "./baseURL.js"
document.getElementById("navbar").innerHTML=navbar();
let token = localStorage.getItem("token");

let dropdown_content= document.getElementById("nav-dropdown-content");
if(token){   
    dropdown_content.innerHTML= `
    <button id="nav-mid-dropdown-btn1" onclick="location.href='/frontend/update_user.html'">Account Details</button>
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
    products_container.innerHTML=null;
    product_count.innerText=data.length+" products";
    data.forEach(el => {
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
                    <button id="buy-now">
                        Buy Now
                        <span class="material-symbols-outlined">
                            shopping_cart_checkout
                        </span>
                    </button>
                </div>
            </div>
        `
        changeImage();
    });
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


