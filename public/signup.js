<<<<<<< HEAD
window.onload = function(){
    var txtPassword = document.getElementById("txtPassword");
    var txtConfirmPassword = document.getElementById("txtConfirmPassword");
    txtPassword.onchange = ConfirmPassword;
    txtConfirmPassword.onkeyup = ConfirmPassword;
    function ConfirmPassword(){
        txtConfirmPassword.setCustomValidity("");
        if (txtPassword.value != txtConfirmPassword.value){
            txtConfirmPassword.setCustomValidity("Passwords do not match.");
        }
    }
=======
window.onload = function(){
    var txtPassword = document.getElementById("txtPassword");
    var txtConfirmPassword = document.getElementById("txtConfirmPassword");
    txtPassword.onchange = ConfirmPassword;
    txtConfirmPassword.onkeyup = ConfirmPassword;
    function ConfirmPassword(){
        txtConfirmPassword.setCustomValidity("");
        if (txtPassword.value != txtConfirmPassword.value){
            txtConfirmPassword.setCustomValidity("Passwords do not match.");
        }
    }
>>>>>>> c3ad590144341987fe0c3a7290ffa5710c869440
}