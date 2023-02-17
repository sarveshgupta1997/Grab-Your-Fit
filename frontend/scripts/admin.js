

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


let products_container = document.querySelector("#products_container");
let product_count = document.querySelector("#product-count");
let top_heading = document.querySelector(".top_heading");
let all_products_admin = document.querySelector("#all_products_admin");
let all_users = document.querySelector("#all_users");

all_products_admin.addEventListener("click",()=>{
    getProducts();
})
all_users.addEventListener("click",()=>{
    getUsers();
})

getOrders();
document.querySelector("body").style.display="none";
async function getOrders(){
    top_heading.innerText="All Orders";
    
    try {
        let url = baseURL+"/orders/all"
        let res = await fetch(url,{
            "headers":{
                "admintoken":adminToken
            }
        });
        let data = await res.json();
        if(data.err){
            alert(data.err);
            window.location.href="/index.html";
        }else{
            document.querySelector("body").style.display="block";
            if(data.length==0){
                displayEmptyData(data);
            }else{
                displayOrderData(data);
            }

        }
        // window.location.assign("/index.html");

    } catch (error) {
        alert(error.message)
    }
}

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
            `
    
}
function displayOrderData(data){
    let count=0;
    products_container.innerHTML=null;
    data.forEach(el => {
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
                        <p id="product-price-discount">User: ${el.user}</p>
                        <p id="product-price-discount">Order Id: ${el._id}</p>
                        <p id="product-price-discount">Product Id: ${el.product_id}</p>
                        <p id="product-price-discount">User Id: ${el.user_id}</p>
                    </div>
                        <button id="complete_order" class="btn-brown ${el._id}">
                            Complete Order &nbsp;
                            <span class="material-symbols-outlined">verified</span>
                        </button>
                </div>
            `
            getUpdateOrderId();
    });
    product_count.innerText=count+" orders";
}

async function getProducts(){
    top_heading.innerText="All Products";
    
    try {
        let url = baseURL+"/products/all_for_admin"
        let res = await fetch(url,{
            headers:{
                "admintoken":adminToken
            }
        });
        let data = await res.json();
        if(data.err){
            alert(data.err)
        }else{
            if(data.length==0){
                displayEmptyData(data);
            }else{
                displayProductData(data);
            }
        }
        // window.location.assign("/index.html");

    } catch (error) {
        alert(error.message)
    }
}

function displayProductData(data){
    let count=0;
    products_container.innerHTML=null;
    data.forEach(el => {
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
                    <div id="product-price" style="display:block">
                        <p id="product-price-discounted">Price: ₹${el.price}</p>
                        <p id="product-price-discounted">Staus: ${el.status}</p>
                        <p id="product-price-orignal" style="text-decoration:none">Date: ${el.created_date}</p>
                        <p id="product-price-orignal" style="text-decoration:none">Purchases: ${el.purchases}</p>
                        <p id="product-price-orignal" style="text-decoration:none">Time: ${el.created_time}</p>
                        <p id="product-price-discount" style="color:#8b7301">Brand Id: ${el.brand}</p>
                        <p id="product-price-discount" style="color:#8b7301">Category Id: ${el.category}</p>
                        <p id="product-price-discount">Product Id: ${el._id}</p>
                    </div>
                        <button id="update_product" class="btn-brown" onclick="location.href='/frontend/all_products.html'">
                            Update Product &nbsp;
                            <span class="material-symbols-outlined">edit</span>
                        </button>
                        <button id="delete_product" class="btn-brown ${el._id}">
                            Delete Product &nbsp;
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                </div>
            `
            changeImage();
    });
    getDeleteProductId()
    product_count.innerText=count+" products";
}

async function getUsers(){
    top_heading.innerText="All Users";
    
    try {
        let url = baseURL+"/users/"
        let res = await fetch(url,{
            headers:{
                "admintoken":adminToken
            }
        });
        let data = await res.json();
        if(data.err){
            alert(data.err)
        }else{
            if(data.length==0){
                displayEmptyData(data);
            }else{
                displayUsersData(data);
            }
        }
    } catch (error) {
        alert(error.message)
    }
}

function displayUsersData(data){
    let count=0;
    products_container.innerHTML=null;
    data.forEach(el => {
            count++;
            let orignal_price= (el.price/100)*175;
            products_container.innerHTML+=`
                <div id="products-inner">
                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" style="width:50%;margin:auto;display: block;" alt="user">
                    <div id="product-price" style="display:block; margin-top:30px;">
                        <p id="product-price-discounted">Name: ${el.fname} ${el.lname}</p>
                        <p id="product-price-orignal" style="text-decoration:none">Email: ${el.email}</p>
                        <p id="product-price-discount">User Id: ${el._id}</p>
                    </div>
                </div>
            `
            changeImage();
    });
    product_count.innerText=count+" products";
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

function getUpdateOrderId(){
    let complete_order = document.querySelectorAll("#complete_order");
    
    complete_order.forEach(el=>{
        el.addEventListener("click",()=>{
            let orderId_to_update=el.className.split(" ")[1];
            updateOrderInDb(orderId_to_update);
        })
    })
}

async function updateOrderInDb(id){
    try {
        let url = baseURL+"/orders/update"
        let res = await fetch(url,{
            method:"PATCH",
            "headers":{
                "admintoken":adminToken,
                "order_to_update":id
            }
        });
        let data = await res.json();
        if(data.err){
            alert(data.err);
        }else{
            alert(data.message);
            getOrders();
        }

    } catch (error) {
        alert(error.message)
    }
}

function getDeleteProductId(){
    let delete_product = document.querySelectorAll("#delete_product");
    
    delete_product.forEach(el=>{
        el.addEventListener("click",()=>{
            let productId_to_delete=el.className.split(" ")[1];
            deleteProductFromDb(productId_to_delete);
        })
    })
}

async function deleteProductFromDb(id){
    // console.log(id)
    try {
        let url = baseURL+"/products/delete"
        let res = await fetch(url,{
            method:"DELETE",
            "headers":{
                "admintoken":adminToken,
                "product_to_delete":id
            }
        });
        let data = await res.json();
        if(data.err){
            alert(data.err);
        }else{
            alert(data.message);
            getProducts();
        }

    } catch (error) {
        alert(error.message)
    }
}