//log in function START
document.getElementById('signin-btn')
.addEventListener("click", () =>{
    const inputName = document.getElementById('input-name');
    const inputNameValue = inputName.value;
    console.log(inputNameValue)
    const inputPassword = document.getElementById('input-password');
    const inputPasswordValue = inputPassword.value;
    console.log(inputPasswordValue)

    //condition START for log in form
    if(inputNameValue === "admin" && inputPasswordValue === "admin123"){
        alert("Log In Successfully");
        window.location.assign("/home.html");
    }else{
        alert("Log In Failed")
    }
    //condition END for log in form
})
//log in function END