"use strict";

window.addEventListener("load", () => {
    let navbar = document.getElementById("navbar");
    let content = document.getElementById("main-content");

    let navHeight = navbar.offsetHeight;
    let navBottom = navbar.offsetTop + navHeight;

    let oldScrollPos = window.pageYOffset;

    window.addEventListener("scroll", () => {
        let scrollPos = window.pageYOffset;

        if (oldScrollPos <= scrollPos) {
            navbar.classList.remove("navbar-fixed");
            navbar.style.top = `-${navHeight}px`;
            content.style.marginTop = "0";
        } else {
            navbar.classList.add("navbar-fixed");
            navbar.style.top = "0";
            content.style.marginTop = `${navHeight}px`;
        }

        oldScrollPos = scrollPos;
    });
});
