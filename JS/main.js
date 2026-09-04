function goBack() {

    const isAuthenticated =
        sessionStorage.getItem("authenticated") === "true";


    if (isAuthenticated) {

        window.location.href = "memories-list.html";
        return;

    }


    if (document.referrer) {

        window.history.back();

    } else {

        window.location.href = "index.html";

    }

}


function isAuthenticated() {

    const authenticated =
        sessionStorage.getItem("authenticated") === "true";

    const authenticatedAt =
        Number(sessionStorage.getItem("authenticatedAt") || 0);

    const sessionDuration =
        30 * 60 * 1000;

    const valid =
        authenticated &&
        authenticatedAt > 0 &&
        Date.now() - authenticatedAt < sessionDuration;

    if (!valid) {

        sessionStorage.removeItem("authenticated");
        sessionStorage.removeItem("authenticatedAt");

    }

    return valid;

}


document.addEventListener("click", event => {

    const button =
        event.target.closest("[data-url]");

    if (!button) {
        return;
    }

    const url = button.dataset.url;

    if (button.dataset.newTab === "true") {
        window.open(url, "_blank", "noopener,noreferrer");
        return;
    }

    window.location.href = url;

});