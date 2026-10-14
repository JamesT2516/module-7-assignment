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


/* ========================================
   Module 6 Contact Form
   ======================================== */

const contactForm =
    document.getElementById(
        "contact-form"
    );

const nameInput =
    document.getElementById(
        "contact-name"
    );

const emailInput =
    document.getElementById(
        "contact-email"
    );

const messageInput =
    document.getElementById(
        "contact-message"
    );

const nameError =
    document.getElementById(
        "name-error"
    );

const emailError =
    document.getElementById(
        "email-error"
    );

const messageError =
    document.getElementById(
        "message-error"
    );

const confirmationModal =
    document.getElementById(
        "confirmation-modal"
    );

const closeConfirmationModalButton =
    document.getElementById(
        "close-confirmation-modal"
    );

const modalDoneButton =
    document.getElementById(
        "modal-done-button"
    );

const submittedName =
    document.getElementById(
        "submitted-name"
    );

const submittedEmail =
    document.getElementById(
        "submitted-email"
    );

const submittedMessage =
    document.getElementById(
        "submitted-message"
    );

const submitButton =
    document.querySelector(
        ".submit-button"
    );


/* ========================================
   Validation Patterns
   ======================================== */

const namePattern =
    /^[A-Za-z]+(?: [A-Za-z]+)*$/;

const emailPattern =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;


/* ========================================
   Validation Helper
   ======================================== */

function setFieldState(
    input,
    errorElement,
    errorMessage
) {

    if (errorMessage !== "") {

        errorElement.textContent =
            errorMessage;

        input.classList.add(
            "input-error"
        );

        input.classList.remove(
            "input-valid"
        );

        input.setAttribute(
            "aria-invalid",
            "true"
        );

        return false;

    }


    errorElement.textContent =
        "";

    input.classList.remove(
        "input-error"
    );

    input.classList.add(
        "input-valid"
    );

    input.setAttribute(
        "aria-invalid",
        "false"
    );

    return true;

}


/* ========================================
   Name Validation
   ======================================== */

function validateName() {

    const nameValue =
        nameInput.value.trim();


    if (nameValue === "") {

        return setFieldState(
            nameInput,
            nameError,
            "Please enter your name."
        );

    }


    if (
        !namePattern.test(
            nameValue
        )
    ) {

        return setFieldState(
            nameInput,
            nameError,
            "Name can only contain letters and spaces."
        );

    }


    return setFieldState(
        nameInput,
        nameError,
        ""
    );

}


/* ========================================
   Email Validation
   ======================================== */

function validateEmail() {

    const emailValue =
        emailInput.value.trim();


    if (emailValue === "") {

        return setFieldState(
            emailInput,
            emailError,
            "Please enter your email address."
        );

    }


    if (
        !emailPattern.test(
            emailValue
        )
    ) {

        return setFieldState(
            emailInput,
            emailError,
            "Please enter a valid email address, for example name@example.com."
        );

    }


    return setFieldState(
        emailInput,
        emailError,
        ""
    );

}


/* ========================================
   Message Validation
   ======================================== */

function validateMessage() {

    const messageValue =
        messageInput.value.trim();


    if (messageValue === "") {

        return setFieldState(
            messageInput,
            messageError,
            "Please enter a message."
        );

    }


    if (
        messageValue.length < 10
    ) {

        return setFieldState(
            messageInput,
            messageError,
            "Message must be at least 10 characters."
        );

    }


    return setFieldState(
        messageInput,
        messageError,
        ""
    );

}


/* ========================================
   Submit Button State
   ======================================== */

function updateSubmitButtonState() {

    const nameValue =
        nameInput.value.trim();

    const emailValue =
        emailInput.value.trim();

    const messageValue =
        messageInput.value.trim();


    const nameIsValid =
        namePattern.test(
            nameValue
        );

    const emailIsValid =
        emailPattern.test(
            emailValue
        );

    const messageIsValid =
        messageValue.length >= 10;


    if (
        nameIsValid &&
        emailIsValid &&
        messageIsValid
    ) {

        submitButton.classList.add(
            "form-valid"
        );

    } else {

        submitButton.classList.remove(
            "form-valid"
        );

    }

}


/* ========================================
   Confirmation Modal
   ======================================== */

function showConfirmationModal() {

    submittedName.textContent =
        nameInput.value.trim();

    submittedEmail.textContent =
        emailInput.value.trim();

    submittedMessage.textContent =
        messageInput.value.trim();


    confirmationModal.classList.add(
        "show"
    );


    closeConfirmationModalButton.focus();

}


function hideConfirmationModal() {

    confirmationModal.classList.remove(
        "show"
    );


    nameInput.focus();

}


/* ========================================
   Contact Form Events
   ======================================== */

if (
    contactForm &&
    nameInput &&
    emailInput &&
    messageInput &&
    nameError &&
    emailError &&
    messageError &&
    confirmationModal &&
    closeConfirmationModalButton &&
    modalDoneButton &&
    submittedName &&
    submittedEmail &&
    submittedMessage &&
    submitButton
) {

    nameInput.addEventListener(
        "input",
        function () {

            validateName();

            updateSubmitButtonState();

        }
    );


    emailInput.addEventListener(
        "input",
        function () {

            validateEmail();

            updateSubmitButtonState();

        }
    );


    messageInput.addEventListener(
        "input",
        function () {

            validateMessage();

            updateSubmitButtonState();

        }
    );


    updateSubmitButtonState();


    /* ----------------------------------------
       Form Submission
       ---------------------------------------- */

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const nameIsValid =
                validateName();

            const emailIsValid =
                validateEmail();

            const messageIsValid =
                validateMessage();


            updateSubmitButtonState();


            if (
                !nameIsValid ||
                !emailIsValid ||
                !messageIsValid
            ) {

                if (!nameIsValid) {

                    nameInput.focus();

                } else if (!emailIsValid) {

                    emailInput.focus();

                } else {

                    messageInput.focus();

                }


                return;

            }


            showConfirmationModal();

        }
    );


    /* ----------------------------------------
       Modal Close Controls
       ---------------------------------------- */

    closeConfirmationModalButton.addEventListener(
        "click",
        hideConfirmationModal
    );


    modalDoneButton.addEventListener(
        "click",
        hideConfirmationModal
    );


    confirmationModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                confirmationModal
            ) {

                hideConfirmationModal();

            }

        }
    );


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                confirmationModal.classList.contains(
                    "show"
                )
            ) {

                hideConfirmationModal();

            }

        }
    );

}