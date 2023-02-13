const userEmailInput = document.getElementById('user-email');
const userPasswordInput = document.getElementById('user-password');
const loginForm = document.getElementById('login-form');

userEmailInput.addEventListener("blur", checkUserEmail = () => {
  let valid = false;
  const userEmailValue = userEmailInput.value.trim();
  if(!userEmailValue.length){
    showError(userEmailInput, "This field is required")
  }else if(!isEmailValid(userEmailValue)){
    showError(userEmailInput, "The email is not valid")
  }else if(!doesUserExits(userEmailValue)){
    showError(userEmailInput, "The email does not correspond to a registered user")
  }else{
    removeError(userEmailInput);
    valid = true;
  }
  return valid
});

userPasswordInput.addEventListener("blur", () => {
  let valid = false;
  if(!userPasswordInput.value.length){
    showError(userPasswordInput, "This field is required")
  }
  valid = true;
  return valid
});

const checkUserPassword = () => {
  let valid = false;
  const userPasswordValue = userPasswordInput.value.trim();
  const userEmailValue = userEmailInput.value.trim();
    
  if(!userPasswordValue.length){
    showError(userPasswordInput, "This field is required")
  }else if(!isTheUsersPassword(userEmailValue, userPasswordValue)){
    showError(userPasswordInput, "The password is incorrect")
  }else{
      removeError(userPasswordInput);
    valid = true;
  }
  return valid
};

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let isEmailValid = checkUserEmail()
  let isPasswordValid = checkUserPassword()

  let isFormValid = isEmailValid && isPasswordValid

  if(isFormValid){
    showSuccessModal ("You are now logged in");

    userEmailInput.value = '';
    userPasswordInput.value = '';
  }
});

