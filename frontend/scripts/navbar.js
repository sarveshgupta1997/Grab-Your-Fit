function navbar(){
    return `
        <div id="nav-top">
        <div id="nav-top-left" class="grid-center">
            <a href="">Rewards</a>
            <span id="nav-top-divider">|</span>
            <a href="">EMS Schools</a>
            <span id="nav-top-divider">|</span>
            <a href="">goEast</a>
        </div>
        <div id="nav-top-right" class="grid-center">
            <img src="/frontend/images/icons/delivery-truck.png" alt="">
            <a href="">Free Ground Shipping over $99</a>
            <span id="nav-top-divider">|</span>
            <a href="">Find a Store</a>
            <span id="nav-top-divider">|</span>
            <a href="">Help</a>
        </div>
    </div>
    <div id="nav-mid">
            <img onclick="location.href='/index.html'" src="/frontend/images/logo/logo.png" alt="">
            <input type="search" value="" placeholder="Search...">
            <div class="dropdown">
                <button class="grid-center dropbtn">
                    <span class="material-symbols-outlined">account_circle</span>
                    <span class="nav_span_btn_text">My Account & Orders</span>
                </button>
                <div id ="nav-dropdown-content" class="dropdown-content">
                    <button id="nav-mid-dropdown-btn1" onclick="location.href='/frontend/login.html'">Sign In</button>
                    <button id="nav-mid-dropdown-btn2" onclick="location.href='/frontend/signup.html'">Create Account</button>
                </div>
            </div>
            <button class="grid-center">
                <span class="material-symbols-outlined">shopping_cart</span>
                <span class="nav_span_btn_text">Cart</span>
            </button>
    </div>
    <div id="nav-bottom">
        <a href="/frontend/all_products.html">MEN</a>
        <a href="/frontend/all_products.html">WOMEN</a>
        <a href="/frontend/all_products.html">KIDS</a>
        <a href="/frontend/all_products.html">FOOTWEAR</a>
        <a href="/frontend/all_products.html">CAMP & HIKE</a>
        <a href="/frontend/all_products.html">CLIMB</a>
        <a href="/frontend/all_products.html">SNOW</a>
        <a href="/frontend/all_products.html">CYCLE</a>
        <a href="/frontend/all_products.html">ACTIVITIES</a>
        <a href="/frontend/all_products.html">BRANDS</a>
        <a href="/frontend/all_products.html">SALE & OUTLET</a>
    </div>    
    `
}
export default navbar;
// module.exports={navbar}
