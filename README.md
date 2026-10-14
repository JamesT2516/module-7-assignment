
# Front-End Web Development Portfolio — Module 7

## Project Overview

This project is my ongoing portfolio for the Front-End Web Development course.

The portfolio began with semantic HTML and has progressively developed through CSS, responsive design, JavaScript, DOM manipulation, event handling, and form validation.

For Module 7, I upgraded my existing Module 6 JavaScript contact form using Vue.js.

The main objective was to create a reusable Vue contact form with reactive validation and a separate confirmation modal while maintaining the existing portfolio design and functionality.

The contact form is a demonstration project for the course. No information is submitted to a server or sent by email.

---

## Module Progression

Throughout the course, I have continued improving the same portfolio by applying the concepts introduced in each module.

- **Module 2:** Semantic HTML, page structure, and accessibility.
- **Module 3:** CSS styling, typography, colours, and layout.
- **Module 4:** Advanced CSS, Flexbox, Grid, media queries, and responsive design.
- **Module 5:** JavaScript fundamentals, DOM manipulation, and interactive elements.
- **Module 6:** Real-time form validation, user feedback, and a confirmation modal.
- **Module 7:** Vue.js, reusable components, reactive data, computed properties, props, and component communication.

This approach has helped me understand how different front-end technologies work together to create an interactive website.

---

## Project File Structure

The Module 7 project contains the following files:

```text
module-7-assignment/
│
├── components/
│   ├── contact-form.js
│   └── confirmation-modal.js
│
├── images/
│   └── james-taljaard.jpg
│
├── contact.html
├── favicon.svg
├── index.html
├── README.md
├── script.js
├── styles.css
└── vue-app.js
```

### File Descriptions

- **index.html:** Main portfolio containing the About Me, What I Am Learning, and My Projects sections.
- **contact.html:** Contact page containing the Vue application.
- **styles.css:** Shared website styling, responsive layouts, validation feedback, and modal styling.
- **script.js:** Original JavaScript controlling portfolio navigation, the floating contact popup, and scroll-reveal animations.
- **vue-app.js:** Main Vue application responsible for registering components and managing communication between them.
- **components/contact-form.js:** Reusable Vue contact form component with reactive validation.
- **components/confirmation-modal.js:** Separate Vue confirmation modal component.
- **images/:** Contains the portfolio profile image.
- **favicon.svg:** Custom browser icon matching the portfolio branding.
- **README.md:** Project documentation, implementation details, challenges, and testing results.

---

## Technologies Used

The project uses the following technologies and tools:

- HTML5
- CSS3
- JavaScript
- Vue 3
- Vue Options API
- Reactive data
- Computed properties
- Vue directives
- Component props and custom events
- Regular expressions
- CSS Flexbox and Grid
- Media queries
- IntersectionObserver
- Browser Developer Tools
- Visual Studio Code
- Live Server
- Git
- GitHub

Vue 3 is loaded through a CDN, allowing the Vue functionality to be added to the existing portfolio without requiring a build system.

---

## Vue.js Implementation

For Assignment 7, I used Vue 3 and the Options API to rebuild my contact form as reusable components.

The implementation is separated into three main JavaScript files:

1. `components/contact-form.js`
2. `components/confirmation-modal.js`
3. `vue-app.js`

This component-based approach separates responsibilities and makes the code easier to understand, maintain, and reuse.

### 1. Contact Form Component

The `contact-form.js` file contains the reusable Vue contact form component.

The component manages three fields:

- Name
- Email Address
- Message

The component uses Vue's `data()` function to store reactive form values.

The `v-model` directive creates two-way data binding between the input fields and the Vue application.

This means that whenever a user types into a field, Vue automatically updates the corresponding data value.

Computed properties evaluate the form values and determine whether each field is valid.

The `v-if` directive displays validation error messages when necessary.

The component also tracks whether fields have been interacted with so that feedback is displayed appropriately.

Props make the component reusable by allowing labels, placeholders, and the submit button text to be customised.

When the form is submitted successfully, the component emits a `form-submitted` event containing the validated information.

### 2. Confirmation Modal Component

The `confirmation-modal.js` file contains a separate reusable Vue component for displaying submitted information.

The modal receives information through props passed down from the parent application.

It displays the submitted:

- Name
- Email address
- Message

The component uses the `v-for` directive to render submitted field information.

The modal becomes visible only after the form passes validation and is submitted.

Users can close the modal by:

- Clicking the X button.
- Clicking the Done button.
- Pressing the Escape key.
- Clicking outside the modal content.

The modal emits a `close` event to communicate with the parent application.

Keyboard focus is moved into the modal when it opens and returned to the contact form when it closes.

### 3. Main Vue Application

The `vue-app.js` file connects the contact form and confirmation modal.

The application is mounted to the HTML element with the ID:

`vue-contact-app`

The main application registers both Vue components and manages:

- Whether the confirmation modal is open.
- The information submitted through the contact form.
- Communication between the contact form and modal.
- Closing the modal and returning focus to the form.

This demonstrates how Vue components can communicate using props and custom events.

The contact form emits information to the parent application, and the parent passes that information to the confirmation modal.

---

## Real-Time Form Validation

A key requirement of Assignment 7 was to implement reactive validation using Vue.js.

The form validates input values as the user types.

### Name Validation

The name field:

- Cannot be empty.
- Accepts letters and spaces.
- Rejects numbers and unsupported special characters.

Example of invalid input:

`James123`

Example of valid input:

`James Taljaard`

When invalid information is entered, the field displays an error message and red validation styling.

When corrected, the error disappears and the field changes to a valid state.

### Email Validation

The email field:

- Cannot be empty.
- Must follow a valid email format.
- Must contain an appropriate email address structure.

Example of invalid input:

`james@gmail`

Example of valid input:

`james@gmail.com`

A regular expression is used to validate the email format.

The validation updates reactively when the input value changes.

### Message Validation

The message field:

- Cannot be empty.
- Must contain at least 10 characters.
- Ignores surrounding whitespace when checking the minimum length.

Example of invalid input:

`Hello`

Example of valid input:

`Hello, I would like to get in touch.`

The component uses a computed property to determine whether the message meets the requirements.

### Validation Feedback

The form provides visual feedback through:

- Red borders for invalid fields.
- Green borders for valid fields.
- Error messages displayed using `v-if`.
- Reactive updates as the user changes input values.

The Send Message button remains disabled until all three fields contain valid information.

Once every field is valid, the button changes to green and becomes enabled.

This prevents users from submitting incomplete or invalid information.

---

## Form Submission and Modal Interaction

The Vue contact form uses `@submit.prevent` to stop the browser's default form submission behaviour.

When the user clicks Send Message:

1. Vue checks whether all input values are valid.
2. Invalid information prevents submission.
3. Valid information is prepared for submission.
4. The contact form emits a `form-submitted` event.
5. The parent Vue application receives the information.
6. The parent application opens the confirmation modal.
7. The modal displays the submitted name, email address, and message.

The entire interaction happens without reloading the page.

No information is sent to a server, saved in a database, or delivered by email.

---

## Component Reusability

One of the main benefits of using Vue.js is the ability to build reusable components.

The contact form can be customised using props without changing its validation logic.

The component supports customisation of:

- Name label.
- Email label.
- Message label.
- Name placeholder.
- Email placeholder.
- Message placeholder.
- Submit button text.

The confirmation modal is also separated from the contact form, allowing the two components to manage their responsibilities independently.

This structure is more maintainable than placing all form validation and modal logic into one JavaScript file.

---

## Preserving Previous Functionality

An important part of Module 7 was ensuring that the Vue implementation did not interfere with the portfolio features developed in previous assignments.

The following functionality was preserved:

- Interactive portfolio navigation tabs.
- Remembering the previously selected portfolio tab.
- Returning from the contact page to the appropriate portfolio section.
- The floating Let's Connect popup.
- Scroll-reveal animations.
- Responsive navigation and layouts.
- Existing portfolio styling and branding.

The original Module 6 form validation and modal event-handling code were removed from `script.js` because Vue now manages those responsibilities.

The original JavaScript continues to control the navigation tabs, floating popup, and scroll animations.

This prevents duplicate event handling and unnecessary conflicts between Vue and standard JavaScript.

---

## Responsive Design and Accessibility

The portfolio continues to use a mobile-first responsive design approach.

CSS media queries adjust the presentation for different screen sizes.

The form and modal use flexible layouts to remain usable on mobile, tablet, and desktop devices.

Accessibility features include:

- Semantic HTML elements.
- Form labels associated with their input fields.
- Descriptive validation messages.
- `aria-invalid` attributes for invalid fields.
- `aria-describedby` attributes connecting fields to feedback.
- Keyboard-accessible buttons.
- Escape key functionality for closing the modal.
- Keyboard focus management when opening and closing the modal.
- Visible validation states.
- Responsive text and spacing.

These features improve usability for visitors using different devices and input methods.

---

## Testing and Debugging

Testing was an important part of Assignment 7.

I tested the portfolio and Vue contact form using Google Chrome, Mozilla Firefox, and Microsoft Edge.

The tests included form validation, modal functionality, responsive design, existing portfolio behaviour, and JavaScript Console checks.

### Functional Testing Completed

The following features were tested successfully:

- Invalid name input displays an error.
- Valid name input passes validation.
- Invalid email input displays an error.
- Valid email input passes validation.
- Messages shorter than 10 characters are rejected.
- Messages containing at least 10 characters pass validation.
- Invalid fields display red validation styling.
- Valid fields display green validation styling.
- The submit button remains disabled while the form is invalid.
- The submit button becomes enabled when all fields are valid.
- Valid submissions open the confirmation modal.
- The modal displays the correct submitted information.
- The X button closes the modal.
- The Done button closes the modal.
- Pressing Escape closes the modal.
- Clicking outside the modal content closes it.
- Keyboard focus returns to the form after closing the modal.
- Existing homepage navigation tabs continue to work.
- The floating Let's Connect popup continues to work.
- Navigation between the homepage and contact page works.

### Responsive Testing

I tested the portfolio and Vue contact form using responsive browser developer tools.

The responsive testing included:

- Checking that navigation and content fit correctly.
- Confirming that form fields remain readable and accessible.
- Checking for unwanted horizontal scrolling.
- Testing real-time validation at different screen sizes.
- Confirming that the modal opens and closes correctly.
- Checking that the homepage layout adjusts appropriately.
- Checking the Console for JavaScript errors and warnings.

### Browser Testing Results

| Browser | Mobile | Tablet | Desktop | Console |
|---|---|---|---|---|
| Google Chrome | Passed | Passed | Passed | No errors or warnings |
| Mozilla Firefox | Passed | Passed | Passed | No errors or warnings |
| Microsoft Edge | Passed | Passed | Passed | No errors or warnings |

### Screen Sizes Tested

**Mobile**

- Google Chrome: approximately 378 × 667 pixels.
- Mozilla Firefox: 375 × 667 pixels.
- Microsoft Edge: 375 × 667 pixels.

**Tablet**

- Google Chrome: 768 × 1024 pixels.
- Mozilla Firefox: 768 × 1024 pixels.
- Microsoft Edge: 768 × 1024 pixels.

**Desktop**

- Google Chrome: 1280 × 800 pixels.
- Mozilla Firefox: standard desktop browser window.
- Microsoft Edge: standard desktop browser window.

### Final Testing Outcome

All three browsers passed the functional and responsive tests performed during development.

The Vue contact form validated user input correctly, and the submit button remained disabled until all fields were valid.

The confirmation modal displayed the submitted information and closed correctly using the available controls.

The existing portfolio navigation, project sections, and floating contact popup continued to function.

The final browser Console checks showed no JavaScript errors or warnings.

The successful testing results indicate that the Module 7 changes work across the tested browsers and screen sizes.

---

## Challenges and Solutions

Throughout Assignment 7, I encountered several challenges that helped me understand Vue.js and front-end development more clearly.

### Challenge 1: Moving From JavaScript to Vue

**Problem:**

The original Module 6 contact form used JavaScript event listeners and direct DOM manipulation.

For Module 7, I needed to rebuild this functionality using Vue's component-based structure.

**Solution:**

I separated the contact form, confirmation modal, and parent application into individual JavaScript files.

I replaced direct input handling with Vue's `v-model` directive and used computed properties for validation.

**What I learned:**

Vue's reactive approach reduces the need to manually update page elements and helps keep related functionality organised.

### Challenge 2: Avoiding Conflicting Form Logic

**Problem:**

The original JavaScript form-handling code could interfere with the new Vue implementation if both attempted to control the same elements.

**Solution:**

I removed the old contact-form validation and modal-handling code from `script.js`.

I preserved the JavaScript responsible for navigation, the floating popup, and scroll animations.

**What I learned:**

When upgrading existing functionality, it is important to identify which code should be replaced and which functionality needs to remain unchanged.

### Challenge 3: Managing Communication Between Components

**Problem:**

The contact form and confirmation modal were separated into different Vue components.

I needed a way to pass validated information from the form to the modal.

**Solution:**

I used a custom `form-submitted` event to pass the submitted information to the parent Vue application.

The parent stores the information and passes it to the modal through props.

The modal emits a separate `close` event when the user closes it.

**What I learned:**

Props and custom events provide a structured way for Vue components to communicate without tightly coupling their internal logic.

### Challenge 4: Vue Development Build Notice

**Problem:**

During testing, Chrome displayed an informational message explaining that the Vue development build was being used.

**Solution:**

After completing the initial development and functionality checks, I updated the Vue CDN reference from the development build to the production build.

The project now uses:

`https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js`

**What I learned:**

Vue provides separate development and production builds. The development build is useful while debugging, while the production build is more appropriate for the finished project.

### Challenge 5: Missing Favicon Error

**Problem:**

The browser Console initially displayed a `favicon.ico` 404 error because the portfolio did not have a defined favicon.

**Solution:**

I created a custom `favicon.svg` file using the portfolio's navy-and-blue colour scheme.

I linked the favicon in both HTML pages.

After refreshing the website, the favicon loaded correctly and the missing-resource error disappeared.

**What I learned:**

Browser Console errors are not always caused by JavaScript. Missing website resources can also create errors that need to be investigated.

### Challenge 6: Local Development Environment

**Problem:**

During an earlier module, opening the HTML files directly using the `file://` protocol caused browser-origin issues.

**Solution:**

I used the Live Server extension in Visual Studio Code to run the portfolio through a local development server.

I continued using Live Server throughout Module 7.

**What I learned:**

A local development server provides a more suitable testing environment than opening project files directly in the browser.

### Challenge 7: Maintaining Responsive Design

**Problem:**

Introducing Vue components required checking that the new contact form and modal continued to display correctly across different devices.

**Solution:**

I preserved the existing CSS classes and responsive layout rules.

I tested the portfolio at mobile, tablet, and desktop screen sizes in Chrome, Firefox, and Edge.

**What I learned:**

Adding functionality to an existing website requires regression testing to ensure that the original design and behaviour continue to work correctly.

---

## How to Run the Project

1. Download or clone the GitHub repository.
2. Open the project folder in Visual Studio Code.
3. Install the Live Server extension if it is not already installed.
4. Right-click `index.html`.
5. Select **Open with Live Server**.
6. Use the portfolio navigation to explore the different sections.
7. Select **Contact Me** to open the Vue contact form.
8. Enter valid and invalid information to test the form validation.
9. Submit valid information to display the confirmation modal.

An internet connection is required to load Vue from the CDN and the Google Fonts used by the portfolio.

---

## GitHub Repository

**Repository:**

https://github.com/JamesT2516/module-7-assignment

The repository is used to track the development of my Module 7 portfolio.

Git and GitHub allow me to maintain version history, document changes through commit messages, and submit the completed project for assessment.

The final submission will include:

- Updated HTML pages.
- Shared CSS styling.
- Existing JavaScript functionality.
- Reusable Vue contact form component.
- Separate Vue confirmation modal component.
- Main Vue application.
- Project images and favicon.
- Updated README documentation.
- Completed cross-browser testing notes.

---

## Reflection and Learning Outcomes

Assignment 7 has helped me understand how Vue.js can be introduced into an existing website without rebuilding the entire project.

I learned how to work with reactive data, computed properties, directives, props, and custom events.

Separating the form and modal into individual components also helped me understand how reusable functionality can make a project easier to manage and expand.

The testing process reinforced the importance of checking both new functionality and existing website features.

By testing across Chrome, Firefox, and Edge at different screen sizes, I gained more experience using browser developer tools and identifying potential compatibility problems.

Overall, this assignment has helped me progress from using standard JavaScript for interactive functionality to building structured, reusable components with Vue.js.

I intend to continue developing this portfolio as I progress through the remaining modules of the course.
