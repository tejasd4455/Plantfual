 
//  search bar scrollong
 
 const placeholderTexts = ["Search More product...", "Seeds...", "Fertilizer...", "Features product...", "About..."];
 const inputElement = document.getElementById("animatedPlaceholder");

 let placeholderIndex = 0;

 function changePlaceholder() {

  inputElement.classList.add("fade-out");
   setTimeout(() => {
     // Update placeholder and fade in
     placeholderIndex = (placeholderIndex + 1) % placeholderTexts.length;
     inputElement.placeholder = placeholderTexts[placeholderIndex];
     inputElement.classList.remove("fade-out");
     inputElement.classList.add("fade-in");
   }, 500); // Timing matches CSS fade-out duration

   setTimeout(() => {
     inputElement.classList.remove("fade-in");
   }, 1000); // Timing matches CSS fade-in duration
 }

 // Change placeholder every 2 seconds
 setInterval(changePlaceholder, 2000);


// Login sing up form

function generateStyledCaptcha() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const captchaLength = 5; // Length of the CAPTCHA string
  let styledCaptcha = '';

  for (let i = 0; i < captchaLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const char = characters[randomIndex];

      // Randomly assign styles
      const randomFontSize = Math.random() * (2.5 - 1.2) + 1.2; 
      const randomTransform = Math.random() > 0.5 ? 'translateY(-3px)' : 'translateY(3px)'; 
      const randomFontWeight = Math.random() > 0.5 ? 'bold' : 'normal'; 
      const randomFontStyle = Math.random() > 0.5 ? 'italic' : 'normal'; 
      const randomColor = `hsl(${Math.random() * 360}, 70%, 50%)`; 
      const randomSpacing = i < captchaLength - 1 ? '&nbsp;' : ''; 

      // Wrap each character in a styled span
      styledCaptcha += `<span style="
          font-size: ${randomFontSize}em;
          font-weight: ${randomFontWeight};
          font-style: ${randomFontStyle};
          color: ${randomColor};
          display: inline-block;
          transform: ${randomTransform};
          margin-right: 5px;
      ">${char}</span>${randomSpacing}`;
  }

  return styledCaptcha;
}

// Set CAPTCHA for login form
let loginCaptcha = generateStyledCaptcha();
document.getElementById('login-captcha-box').innerHTML = loginCaptcha;

// Set CAPTCHA for signup form
let signupCaptcha = generateStyledCaptcha();
document.getElementById('signup-captcha-box').innerHTML = signupCaptcha;

document.getElementById("regenerateLoginCaptcha").addEventListener("click", function () {
  loginCaptcha = generateStyledCaptcha();
  document.getElementById('login-captcha-box').innerHTML = loginCaptcha;
  document.getElementById('loginCaptchaInput').value = ""; // Clear input field
});

document.getElementById("regenerateSignupCaptcha").addEventListener("click", function () {
  signupCaptcha = generateStyledCaptcha();
  document.getElementById('signup-captcha-box').innerHTML = signupCaptcha;
  document.getElementById('signupCaptchaInput').value = ""; // Clear input field
});

function extractRawCaptcha(captchaHTML) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = captchaHTML;
  return tempDiv.textContent.replace(/\s/g, ''); // Remove spaces for comparison
}

// Login form submission handler
document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const captchaInput = document.getElementById("loginCaptchaInput").value.replace(/\s/g, ''); // Remove spaces for comparison

  if (captchaInput !== extractRawCaptcha(loginCaptcha)) {
      alert("Incorrect CAPTCHA. Please try again.");
      loginCaptcha = generateStyledCaptcha(); // Regenerate CAPTCHA
      document.getElementById('login-captcha-box').innerHTML = loginCaptcha;
      return;
  }

  if (email && password) {
      alert("Login successful!");
      window.location.href = "index.html"; // Redirect to the homepage
  } else {
      alert("Please fill in all fields.");
  }
});

// Signup form submission handler
document.getElementById("signupForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const captchaInput = document.getElementById("signupCaptchaInput").value.replace(/\s/g, ''); // Remove spaces for comparison

  if (captchaInput !== extractRawCaptcha(signupCaptcha)) {
      alert("Incorrect CAPTCHA. Please try again.");
      signupCaptcha = generateStyledCaptcha(); // Regenerate CAPTCHA
      document.getElementById('signup-captcha-box').innerHTML = signupCaptcha;
      return;
  }

  if (name && email && password) {
      alert("Account created successfully!");
      window.location.href = "index.html"; // Redirect to the homepage
  } else {
      alert("Please fill in all fields.");
  }
});





// paymentMethod


 const checkoutBtn = document.getElementById("checkoutBtn");
 const paymentInfoSection = document.getElementById("paymentInfoSection");
 const orderConfirmationSection = document.getElementById("orderConfirmationSection");
 const placeOrderBtn = document.getElementById("placeOrderBtn");
 const trackingProgress = document.getElementById("trackingProgress");
 
 checkoutBtn.addEventListener("click", () => {
   paymentInfoSection.classList.remove("d-none");
   orderConfirmationSection.classList.add("d-none");
 });
 
 placeOrderBtn.addEventListener("click", () => {
   const customerName = document.getElementById("customerName").value;
   const customerEmail = document.getElementById("customerEmail").value;
   const customerPhone = document.getElementById("customerPhone").value;
   const customerAddress = document.getElementById("customerAddress").value;
   const paymentMethod = document.getElementById("paymentMethod").value;
 
   if (!customerName || !customerEmail || !customerPhone || !customerAddress) {
     alert("Please fill out all customer details.");
     return;
   }
 
   // Simulate order placement
   paymentInfoSection.classList.add("d-none");
   orderConfirmationSection.classList.remove("d-none");
 
   let progress = 25;
   const interval = setInterval(() => {
     progress += 25;
     if (progress > 100) {
       clearInterval(interval);
       trackingProgress.textContent = "Delivered";
       trackingProgress.style.width = "80%";
       trackingProgress.classList.remove("progress-bar-animated");
     } else {
       trackingProgress.textContent = `${progress}%`;
       trackingProgress.style.width = `${progress}%`;
     }
   }, 1000);
 });
 

 




//add to cart



 let cart = [];
 const cartCount = document.getElementById("cartCount");
 const cartItems = document.getElementById("cartItems");
 const totalPrice = document.getElementById("totalPrice");

 function updateCart() {
   cartCount.textContent = `(${cart.reduce((sum, item) => sum + item.quantity, 0)})`;
   cartItems.innerHTML = "";
   let total = 0;

   cart.forEach(item => {
     const listItem = document.createElement("li");
     listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
     listItem.innerHTML = `${item.name} <span class="badge bg-primary rounded-pill">${item.quantity}</span>`;
     cartItems.appendChild(listItem);

     total += item.price * item.quantity;
   });

   totalPrice.textContent = `₹${total.toFixed(2)}`;
 }

 document.querySelectorAll('.add-to-cart').forEach(button => {
   button.addEventListener('click', function (e) {
     e.preventDefault(); // Prevent default link behavior

     const card = this.closest('.card');
     const productId = card.parentElement.getAttribute('data-product-id');
     const productName = card.querySelector('.card-title').textContent;
     const productPrice = parseFloat(card.querySelector('.card-text').textContent.replace('₹', ''));

     // Add product to cart or update quantity if it exists
     const existingProduct = cart.find(item => item.id === productId);
     if (existingProduct) {
       existingProduct.quantity++;
     } else {
       cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
     }

     // Update Cart UI
     updateCart();

     const productCard = this.closest('.col-12');
     productCard.fadeOut('slow', function() {
       productCard.remove();
     });

     $('html, body').animate({
       scrollTop: 0
     }, 500); // Scroll to the top in 500ms
   });
 });

 // Initialize Cart UI
 updateCart();



















 //   scroll to top
 window.onscroll = function() {
  const button = document.getElementById('scrollToTopBtn');
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
};

// Scroll smoothly to the top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}