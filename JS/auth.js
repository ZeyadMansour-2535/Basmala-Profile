const PASSWORD_HASH =
    "3b2cbc8be13f3bad7d9049caf98fd558b191bc3ff2107638cf773eefbc4df512";

const MAX_ATTEMPTS = 5;
const LOCK_TIME = 60 * 1000;


async function hashPassword(value) {

    const data =
        new TextEncoder().encode(value);

    const digest =
        await crypto.subtle.digest("SHA-256", data);

    return Array.from(
        new Uint8Array(digest),
        byte => byte.toString(16).padStart(2, "0")
    ).join("");

}


async function checkPassword() {

    const passwordInput =
        document.getElementById("password");

    const errorMessage =
        document.getElementById("error-message");


    const lockedUntil =
        Number(sessionStorage.getItem("passwordLockedUntil") || 0);

    if (Date.now() < lockedUntil) {

        const seconds =
            Math.ceil((lockedUntil - Date.now()) / 1000);

        errorMessage.textContent =
            `حاول مرة أخرى بعد ${seconds} ثانية`;

        return;

    }


    const enteredPassword =
        passwordInput.value;

    const enteredHash =
        await hashPassword(enteredPassword);


    if (enteredHash === PASSWORD_HASH) {

        sessionStorage.setItem(
            "authenticated",
            "true"
        );

        sessionStorage.setItem(
            "authenticatedAt",
            String(Date.now())
        );

        sessionStorage.removeItem("passwordAttempts");


        window.location.href =
            "memories-list.html";


    } else {

        const attempts =
            Number(sessionStorage.getItem("passwordAttempts") || 0) + 1;

        sessionStorage.setItem(
            "passwordAttempts",
            String(attempts)
        );

        if (attempts >= MAX_ATTEMPTS) {

            sessionStorage.setItem(
                "passwordLockedUntil",
                String(Date.now() + LOCK_TIME)
            );

            sessionStorage.removeItem("passwordAttempts");

            errorMessage.textContent =
                "تم القفل مؤقتًا بسبب محاولات كثيرة";

            passwordInput.value = "";

            return;

        }

        errorMessage.textContent =
            `الباسورد غلط ❤️ المحاولات المتبقية: ${MAX_ATTEMPTS - attempts}`;


        errorMessage.style.color =
            "red";


        passwordInput.value = "";


        passwordInput.focus();

    }

}