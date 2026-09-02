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