
/* ========================================
   Module 7 - Vue Application
   ======================================== */

// Create the Vue application.
const { createApp } = Vue;

createApp({

    // Register our two reusable Vue components.
    components: {
        "contact-form": ContactFormComponent,
        "confirmation-modal": ConfirmationModalComponent
    },

    // Store modal visibility and submitted form data.
    data() {
        return {
            isModalOpen: false,

            submittedData: {
                name: "",
                email: "",
                message: ""
            }
        };
    },

    methods: {

        // Receive validated information from the form.
        showConfirmation(details) {

            this.submittedData = {
                ...details
            };

            this.isModalOpen = true;
        },

        // Close the confirmation modal.
        closeConfirmation() {

            this.isModalOpen = false;

            // Return keyboard focus to the name field.
            this.$nextTick(() => {
                this.$refs.contactForm.focusName();
            });
        }
    }

}).mount("#vue-contact-app");
