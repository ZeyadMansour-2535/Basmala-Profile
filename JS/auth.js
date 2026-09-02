const PASSWORD = "0216";


function checkPassword() {

    const passwordInput =
        document.getElementById("password");

    const errorMessage =
        document.getElementById("error-message");


    const enteredPassword =
        passwordInput.value;


    if (enteredPassword === PASSWORD) {

        sessionStorage.setItem(
            "authenticated",
            "true"
        );


        window.location.href =
            "memories-list.html";


    } else {

        errorMessage.textContent =
            "الباسورد غلط ❤️ حاول تاني";


        errorMessage.style.color =
            "red";


        passwordInput.value = "";


        passwordInput.focus();

    }

}