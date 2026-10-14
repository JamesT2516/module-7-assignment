/* ========================================
   Navigation Information
   ======================================== */

const navigationEntry =
    performance.getEntriesByType("navigation")[0];

const navigationType =
    navigationEntry ? navigationEntry.type : "";

const pageWasReloaded =
    navigationType === "reload";

const pageWasHistoryNavigation =
    navigationType === "back_forward";


/* ========================================
   Portfolio Tab Navigation
   ======================================== */

const tabLinks =
    document.querySelectorAll(".nav-tab[data-tab]");

const tabPanels =
    document.querySelectorAll(".tab-panel");

const returnTabLinks =
    document.querySelectorAll(
        ".return-tab-link[data-return-tab]"
    );

const tabMemoryPrefix =
    "portfolio-tab:";

const returnMemoryPrefix =
    "portfolio-return:";

let returnedFromContactPage = false;


// Check whether a portfolio tab exists
function tabExists(tabName) {

    return Array.from(tabPanels).some(
        function (panel) {

            return panel.dataset.panel === tabName;

        }
    );

}


// Save the currently selected portfolio tab
function saveActiveTab(tabName) {

    window.name =
        tabMemoryPrefix + tabName;

}


// Get the saved portfolio tab
function getSavedTab() {

    if (
        window.name.startsWith(
            tabMemoryPrefix
        )
    ) {

        return window.name.replace(
            tabMemoryPrefix,
            ""
        );

    }

    return "";

}


// Display one portfolio section
function showTab(
    tabName,
    shouldScroll
) {

    tabPanels.forEach(
        function (panel) {

            if (
                panel.dataset.panel === tabName
            ) {

                panel.classList.add(
                    "active-panel"
                );

            } else {

                panel.classList.remove(
                    "active-panel"
                );

            }

        }
    );


    tabLinks.forEach(
        function (link) {

            if (
                link.dataset.tab === tabName
            ) {

                link.classList.add(
                    "active"
                );

                link.setAttribute(
                    "aria-current",
                    "page"
                );

            } else {

                link.classList.remove(
                    "active"
                );

                link.removeAttribute(
                    "aria-current"
                );

            }

        }
    );


    saveActiveTab(tabName);


    if (shouldScroll) {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

}


/* ========================================
   Return From Contact Page
   ======================================== */

// Store the tab the visitor wants to return to
returnTabLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                const returnTab =
                    link.dataset.returnTab;

                window.name =
                    returnMemoryPrefix +
                    returnTab;

            }
        );

    }
);


/* ========================================
   Start the Correct Portfolio Tab
   ======================================== */

if (
    tabLinks.length > 0 &&
    tabPanels.length > 0
) {

    const savedTab =
        getSavedTab();

    let startingTab =
        "about";


    // Returning from contact.html
    if (
        window.name.startsWith(
            returnMemoryPrefix
        )
    ) {

        const returnTab =
            window.name.replace(
                returnMemoryPrefix,
                ""
            );


        if (tabExists(returnTab)) {

            startingTab =
                returnTab;

            returnedFromContactPage =
                true;

        }

    // Manual refresh
    } else if (
        pageWasReloaded &&
        savedTab &&
        tabExists(savedTab)
    ) {

        startingTab =
            savedTab;

    // Browser Back / Forward
    } else if (
        pageWasHistoryNavigation &&
        savedTab &&
        tabExists(savedTab)
    ) {

        startingTab =
            savedTab;

    // Fresh opening
    } else {

        startingTab =
            "about";

    }


    showTab(
        startingTab,
        false
    );


    tabLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    const selectedTab =
                        link.dataset.tab;


                    showTab(
                        selectedTab,
                        true
                    );


                    /*
                       If the popup is open,
                       close it when the visitor
                       changes portfolio tabs.
                    */

                    const openPopup =
                        document.getElementById(
                            "contact-popup"
                        );


                    if (openPopup) {

                        openPopup.classList.remove(
                            "show"
                        );

                    }

                }
            );

        }
    );

}


/* ========================================
   Floating Contact Popup
   ======================================== */

const contactPopup =
    document.getElementById(
        "contact-popup"
    );

const closePopupButton =
    document.getElementById(
        "close-popup"
    );

const popupContactButton =
    document.getElementById(
        "popup-contact-button"
    );


function aboutTabIsActive() {

    const aboutPanel =
        document.querySelector(
            '[data-panel="about"]'
        );


    return (
        aboutPanel &&
        aboutPanel.classList.contains(
            "active-panel"
        )
    );

}


function showContactPopup() {

    contactPopup.classList.add(
        "show"
    );

}


function hideContactPopup() {

    contactPopup.classList.remove(
        "show"
    );

}


function openContactPage() {

    hideContactPopup();

    window.location.href =
        "contact.html";

}


if (
    contactPopup &&
    closePopupButton &&
    popupContactButton
) {

    window.addEventListener(
        "load",
        function () {

            /*
               Show popup:
               - on a normal fresh opening
                 of About Me
               - after a manual refresh

               Do not show popup:
               - when changing tabs
               - when returning from Contact Me
               - after browser Back / Forward
            */

            const normalFreshVisit =
                !pageWasReloaded &&
                !pageWasHistoryNavigation &&
                !returnedFromContactPage;


            const shouldShowPopup =
                pageWasReloaded ||
                (
                    normalFreshVisit &&
                    aboutTabIsActive()
                );


            if (shouldShowPopup) {

                setTimeout(
                    showContactPopup,
                    500
                );

            }

        }
    );


    closePopupButton.addEventListener(
        "click",
        hideContactPopup
    );


    popupContactButton.addEventListener(
        "click",
        openContactPage
    );


    /*
       Make sure a cached page does not
       restore the popup after navigation.
    */

    window.addEventListener(
        "pagehide",
        hideContactPopup
    );


    window.addEventListener(
        "pageshow",
        function (event) {

            if (event.persisted) {

                hideContactPopup();

            }

        }
    );

}


/* ========================================
   Scroll Reveal
   ======================================== */

const revealElements =
    document.querySelectorAll(".reveal");


function revealAllElements() {

    revealElements.forEach(
        function (element) {

            element.classList.add(
                "visible"
            );

        }
    );

}


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(

            function (
                entries,
                observer
            ) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.15
            }

        );


    revealElements.forEach(
        function (element) {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealAllElements();

}