const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const singInForm = document.getElementById('sign-in-form');

nameInput.addEventListener("blur", checkUsername = () => {
  let valid = false;
  const username = nameInput.value.trim();
  if(!username.length){
    showError(nameInput, "This field is required")
  }else{
    removeError(nameInput);
    valid = true;
  }
  return valid
});
  
emailInput.addEventListener("blur", checkEmail = () => {
  let valid = false;
  const emailValue = emailInput.value.trim();
  if(!emailValue.length){
    showError(emailInput, "This field is required")
  }else if(!isEmailValid(emailValue)){
    showError(emailInput, "The email is not valid")
  }else if(users.some(user => user.email === emailValue)){
    showError(emailInput, "The email address is already taken")
  }else{
    removeError(emailInput);
    valid = true;
  }
  return valid
});

passwordInput.addEventListener("blur", checkPassword = () => {
  let valid = false;
  const passwordValue = passwordInput.value.trim();
  if(!passwordValue.length){
    showError(passwordInput, "This field is required")
  }else if(!isPasswordValid(passwordValue)){
    showError(passwordInput, "Password must be between 4 and 8 digits long and include at least one number.")
  }else{
    removeError(passwordInput);
    valid = true;
  }
  return valid
});

confirmPasswordInput.addEventListener("blur", checkConfirmPassword = () => {
  let valid = false;
  const confirmPasswordValue = confirmPasswordInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  if(!confirmPasswordValue.length){
    showError(confirmPasswordInput, "This field is required")
  }else if(confirmPasswordValue !== passwordValue){
    showError(confirmPasswordInput, "Passwords do not match")
  }else{
    removeError(confirmPasswordInput);
    valid = true;
  }
  return valid
});
  
phoneInput.addEventListener("blur", checkPhone = () => {
  let valid = false;
  const phoneValue = phoneInput.value.trim();
  if(!phoneValue.length){
    removeError(phoneInput);
    valid = true;
  }else if(!isPhoneValid(phoneValue)){
    showError(phoneInput, "The phone number is not valid")
  }else{
    removeError(phoneInput);
    valid = true;
  }
  return valid
});  

singInForm.addEventListener("submit",(e) => {
  e.preventDefault();

  let isUsernameValid = checkUsername()
  let isEmailValid = checkEmail()
  let isPasswordValid = checkPassword()
  let isConfirmPasswordValid = checkConfirmPassword()
  let isPhoneValid = checkPhone()
  
  let isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isPhoneValid

  if(isFormValid){
    users = [...users, {name:nameInput.value, email: emailInput.value, password: passwordInput.value, phone:phoneInput.value, userId: users.length}]

    saveToLocalStorage(users)
    showSuccessModal ("Your registration was successful");
  
    nameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';
    phoneInput.value = '';
  }
});

