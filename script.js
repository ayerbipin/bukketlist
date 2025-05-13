// ===== Signup =====
document.getElementById('signupForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
  
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const msg = document.getElementById('signupMsg');
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailPattern.test(email)) {
      msg.textContent = "Invalid email format!";
      msg.style.color = "red";
      return;
    }
  
    if (password !== confirmPassword) {
      msg.textContent = "Passwords do not match!";
      msg.style.color = "red";
      return;
    }
  
    localStorage.setItem('user', JSON.stringify({ username, email, password }));
    msg.textContent = "Signup successful!";
    msg.style.color = "green";
  
    setTimeout(() => {
      window.location.href = "hello.html";
    }, 1500);
  });
  
  // ===== Login =====
  document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
  
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const errorMsg = document.getElementById('loginError');
  
    const storedUser = JSON.parse(localStorage.getItem('user'));
  
    if (storedUser && username === storedUser.username && password === storedUser.password) {
      localStorage.setItem('user', JSON.stringify(storedUser));
      window.location.href = "homepage.html";
    } else {
      errorMsg.textContent = "Invalid username or password!";
      errorMsg.style.color = "red";
    }
  });
  
  // ===== Google Sign-In Callback =====
  function handleGoogleLogin(response) {
    const userObject = jwt_decode(response.credential);
    console.log("Google user:", userObject);
  
    // Save user info in localStorage
    localStorage.setItem("user", JSON.stringify({
      username: userObject.name,
      email: userObject.email,
      google: true
    }));
  
    window.location.href = "homepage.html";
  }
  