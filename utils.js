const isEmailValid = (email) => {
  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  
  return re.test(email)
}
  
const isPasswordValid = (password) => {
  const re = /^(?=.*\d).{4,8}$/;
  
  return re.test(password)
}
  
const isPhoneValid = (phone) => {
  const re = /^[0-9]{10}$/;
  
  return re.test(phone)
}

const doesUserExits = (email) => {
  if(users.some(user => user.email === email)){
    return true
  }
  return false
}

const isTheUsersPassword = (email, password) => {
  if(users.some(user => user.email === email && user.password === password)){
    return true
  }
  return false
}
  
const showError = (input, message) => {
  const formField = input.parentElement;
  input.classList.add("input-error");
  const textError = formField.querySelector("small");
  textError.textContent = message;
}
  
const removeError = (input) => {
  const formField = input.parentElement;
  input.classList.remove("input-error");
  const textError = formField.querySelector("small");
  textError.textContent = "";
}
