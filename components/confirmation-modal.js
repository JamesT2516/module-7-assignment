
/* ========================================
   Module 7 - Vue Confirmation Modal
   ======================================== */

const ConfirmationModalComponent = {

    name: "ConfirmationModal",

    // Props receive information from the parent app.
    props: {
        visible: {
            type: Boolean,
            default: false
        },

        submission: {
            type: Object,
            required: true
        }
    },

    // Inform the parent when the modal should close.
    emits: ["close"],

    computed: {

        submittedFields() {
            return [
                {
                    label: "Name",
                    value: this.submission.name
                },
                {
                    label: "Email",
                    value: this.submission.email
                },
                {
                    label: "Message",
                    value: this.submission.message
                }
            ];
        }
    },

    watch: {

        visible(isOpen) {
            if (isOpen) {
                this.$nextTick(() => {
                    this.$refs.closeButton.focus();
                });
            }
        }
    },

    mounted() {
        document.addEventListener(
            "keydown",
            this.handleKeydown
        );
    },

    beforeUnmount() {
        document.removeEventListener(
            "keydown",
            this.handleKeydown
        );
    },

    methods: {

        requestClose() {
            this.$emit("close");
        },

        handleKeydown(event) {

            if (!this.visible) {
                return;
            }

            // Close the modal using Escape.
            if (event.key === "Escape") {
                event.preventDefault();
                this.requestClose();
                return;
            }

            // Keep keyboard focus inside the modal.
            if (event.key !== "Tab") {
                return;
            }

            const buttons =
                this.$refs.dialog.querySelectorAll(
                    "button:not([disabled])"
                );

            if (!buttons.length) {
                return;
            }

            const firstButton = buttons[0];
            const lastButton = buttons[buttons.length - 1];

            if (
                event.shiftKey &&
                document.activeElement === firstButton
            ) {
                event.preventDefault();
                lastButton.focus();

            } else if (
                !event.shiftKey &&
                document.activeElement === lastButton
            ) {
                event.preventDefault();
                firstButton.focus();
            }
        }
    },

    template: `
        <div
            v-if="visible"
            id="confirmation-modal"
            class="confirmation-modal show"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirmation-title"
            aria-describedby="confirmation-description"
            @click.self="requestClose">

            <div
                class="modal-content"
                ref="dialog">

                <button
                    type="button"
                    class="modal-close"
                    ref="closeButton"
                    aria-label="Close confirmation"
                    @click="requestClose">
                    &times;
                </button>

                <p class="modal-label">
                    Form Successfully Validated
                </p>

                <h2 id="confirmation-title">
                    Message Submitted
                </h2>

                <p id="confirmation-description">
                    Your information passed the Vue.js
                    validation. These are the details
                    you entered:
                </p>

                <div class="submitted-details">

                    <p
                        v-for="field in submittedFields"
                        :key="field.label">

                        <strong>
                            {{ field.label }}
                        </strong>

                        <span>
                            {{ field.value }}
                        </span>

                    </p>

                </div>

                <button
                    type="button"
                    id="modal-done-button"
                    @click="requestClose">
                    Done
                </button>

            </div>

        </div>
    `
};
