
/* ========================================
   Module 7 - Vue Contact Form Component
   ======================================== */

const ContactFormComponent = {

    name: "ContactForm",

    // Props make the form reusable and customisable.
    props: {
        nameLabel: {
            type: String,
            default: "Name"
        },
        emailLabel: {
            type: String,
            default: "Email Address"
        },
        messageLabel: {
            type: String,
            default: "Message"
        },
        namePlaceholder: {
            type: String,
            default: "Enter your name"
        },
        emailPlaceholder: {
            type: String,
            default: "name@example.com"
        },
        messagePlaceholder: {
            type: String,
            default: "Enter your message"
        },
        buttonLabel: {
            type: String,
            default: "Send Message"
        }
    },

    emits: ["form-submitted"],

    // Reactive data stores the form values.
    data() {
        return {
            form: {
                name: "",
                email: "",
                message: ""
            },

            touched: {
                name: false,
                email: false,
                message: false
            },

            attemptedSubmit: false
        };
    },

    // Computed properties automatically update
    // whenever the input values change.
    computed: {

        nameError() {
            const name = this.form.name.trim();

            if (name === "") {
                return "Please enter your name.";
            }

            const namePattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

            if (!namePattern.test(name)) {
                return "Name can only contain letters and spaces.";
            }

            return "";
        },

        emailError() {
            const email = this.form.email.trim();

            if (email === "") {
                return "Please enter your email address.";
            }

            const emailPattern =
                /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

            if (!emailPattern.test(email)) {
                return "Please enter a valid email address.";
            }

            return "";
        },

        messageError() {
            const message = this.form.message.trim();

            if (message === "") {
                return "Please enter a message.";
            }

            if (message.length < 10) {
                return "Message must be at least 10 characters.";
            }

            return "";
        },

        isFormValid() {
            return (
                this.nameError === "" &&
                this.emailError === "" &&
                this.messageError === ""
            );
        }
    },

    methods: {

        showError(field) {
            return (
                (this.touched[field] || this.attemptedSubmit) &&
                Boolean(this[field + "Error"])
            );
        },

        showValid(field) {
            return (
                this.touched[field] &&
                !this[field + "Error"]
            );
        },

        submitForm() {
            this.attemptedSubmit = true;

            if (!this.isFormValid) {
                return;
            }

            this.$emit("form-submitted", {
                name: this.form.name.trim(),
                email: this.form.email.trim(),
                message: this.form.message.trim()
            });
        },

        focusName() {
            this.$refs.nameInput.focus();
        }
    },

    template: `
        <form
            id="contact-form"
            class="reveal"
            novalidate
            @submit.prevent="submitForm">

            <div class="form-group">

                <label for="contact-name">
                    {{ nameLabel }}
                </label>

                <input
                    id="contact-name"
                    ref="nameInput"
                    name="name"
                    type="text"
                    autocomplete="name"
                    required
                    v-model="form.name"
                    :placeholder="namePlaceholder"
                    :aria-invalid="showError('name')"
                    aria-describedby="name-error"
                    :class="{
                        'input-error': showError('name'),
                        'input-valid': showValid('name')
                    }"
                    @input="touched.name = true"
                    @blur="touched.name = true">

                <p
                    id="name-error"
                    class="error-message"
                    aria-live="polite">
                    <span v-if="showError('name')">
                        {{ nameError }}
                    </span>
                </p>

            </div>

            <div class="form-group">

                <label for="contact-email">
                    {{ emailLabel }}
                </label>

                <input
                    id="contact-email"
                    ref="emailInput"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    v-model="form.email"
                    :placeholder="emailPlaceholder"
                    :aria-invalid="showError('email')"
                    aria-describedby="email-error"
                    :class="{
                        'input-error': showError('email'),
                        'input-valid': showValid('email')
                    }"
                    @input="touched.email = true"
                    @blur="touched.email = true">

                <p
                    id="email-error"
                    class="error-message"
                    aria-live="polite">
                    <span v-if="showError('email')">
                        {{ emailError }}
                    </span>
                </p>

            </div>

            <div class="form-group">

                <label for="contact-message">
                    {{ messageLabel }}
                </label>

                <textarea
                    id="contact-message"
                    ref="messageInput"
                    name="message"
                    rows="7"
                    required
                    v-model="form.message"
                    :placeholder="messagePlaceholder"
                    :aria-invalid="showError('message')"
                    aria-describedby="message-error"
                    :class="{
                        'input-error': showError('message'),
                        'input-valid': showValid('message')
                    }"
                    @input="touched.message = true"
                    @blur="touched.message = true">
                </textarea>

                <p
                    id="message-error"
                    class="error-message"
                    aria-live="polite">
                    <span v-if="showError('message')">
                        {{ messageError }}
                    </span>
                </p>

            </div>

            <button
                type="submit"
                class="submit-button"
                :class="{ 'form-valid': isFormValid }"
                :disabled="!isFormValid">

                {{ buttonLabel }}

            </button>

        </form>
    `
};
