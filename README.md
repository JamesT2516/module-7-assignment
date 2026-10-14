# Front-End Web Development Portfolio

This project is my ongoing portfolio for the Front-End Web Development course.

I started the portfolio using semantic HTML5 and then added CSS to improve the layout, colours, typography, spacing, and overall presentation. I later made the website responsive using a mobile-first approach, media queries, Flexbox, and CSS Grid.

In Module 5, I introduced JavaScript to add behaviour and interaction to the portfolio.

For Module 6, I developed the project further by working with more advanced DOM manipulation, event handling, real-time form validation, user feedback, and a confirmation modal.

---

## Module Progression

The portfolio has developed as I have worked through the course:

- HTML5 for webpage structure and semantic content
- CSS for colours, typography, spacing, and styling
- Flexbox and CSS Grid for layouts
- Media queries for responsive design
- CSS transitions and hover effects
- JavaScript for behaviour and interactivity
- DOM manipulation
- Event listeners and event handling
- Real-time form validation
- User feedback and modal interaction
- Browser testing and debugging
- Git and GitHub for version control

Module 6 has also introduced me to further JavaScript concepts including asynchronous JavaScript, APIs, JavaScript modules, development tools, and the foundations of Vue.js.

---

## Portfolio Navigation

For Module 6, I changed the portfolio so that the main content is organised into separate sections.

The main navigation contains:

- About Me
- What I Am Learning
- My Projects
- Contact Me

About Me, What I Am Learning, and My Projects behave like tabs. JavaScript listens for clicks on the navigation links and displays only the selected section.

A fresh visit to the main portfolio starts on the About Me section.

If I move to another portfolio section and refresh the page, JavaScript remembers the section I was viewing and keeps that section open.

The Contact Me link opens a separate `contact.html` page because the Module 6 assignment requires the contact form to be on its own page.

When returning from the Contact Me page, the portfolio opens the section that was selected without showing the contact popup again.

---

## Module 5 JavaScript Interaction

In Module 5, I created a floating **Let's Connect** contact message.

The popup appears on the right-hand side of the page and includes:

- a short contact message
- a Contact Me button
- a close button

The interaction uses JavaScript functions, DOM selection, event listeners, and CSS class changes.

For Module 6, I kept this feature and improved how it behaves with the new portfolio navigation.

The popup:

- appears when the portfolio is first opened
- appears again after a manual page refresh
- can be closed using the X button
- directs the visitor to the dedicated Contact Me page
- does not repeatedly appear while changing portfolio sections
- does not appear again immediately when returning from the Contact Me page

---

## Module 6 Contact Form

For Assignment 6, I created a new `contact.html` page containing a JavaScript-powered contact form.

The form contains:

- Name
- Email Address
- Message
- Send Message button

The form uses `novalidate` so that the validation feedback is controlled by my JavaScript instead of the browser's default validation messages.

The form is a course project and does not send information to a server.

---

## Real-Time Form Validation

Each form field is validated while the user types by listening for the `input` event.

### Name Validation

The name field:

- cannot be empty
- can only contain letters and spaces

If the value is invalid, an error message appears below the field and the field receives a red visual state.

When the name is valid, the error disappears and the field changes to a green valid state.

### Email Validation

The email field:

- cannot be empty
- must follow a valid email format

For example:

`name@example.com`

An invalid email displays an error message below the field.

A valid email removes the error and changes the field to the valid state.

### Message Validation

The message field:

- cannot be empty
- must contain at least 10 characters

If the message is too short, an error is shown immediately.

Once it contains at least 10 characters, the error disappears.

---

## Send Message Button Feedback

I added an additional visual cue to make the form easier to understand.

The Send Message button remains blue while one or more fields are invalid.

When:

- the name is valid
- the email is valid
- the message contains at least 10 characters

the Send Message button changes to green.

If any field becomes invalid again, the button changes back to blue.

This gives the visitor another indication that the form is ready to be submitted.

---

## Form Submission

The form uses a `submit` event listener.

When the Send Message button is clicked, JavaScript uses:

`event.preventDefault()`

to stop the browser from performing the normal form submission.

JavaScript then checks all three fields again.

If any field is invalid:

- the confirmation modal does not open
- the relevant error remains visible
- focus moves to the first invalid field

Only when every field is valid can the confirmation modal be displayed.

---

## Confirmation Modal

When all fields pass validation, a confirmation modal appears.

The modal displays the information entered into the form:

- Name
- Email
- Message

JavaScript uses `textContent` to place the submitted information into the modal.

The modal can be closed in several ways:

- clicking the X button
- clicking the Done button
- clicking outside the modal content
- pressing the Escape key

This gave me more practice with event listeners and DOM manipulation.

---

## Scroll Reveal Interaction

I also added a scroll reveal effect to the portfolio.

Content with the `reveal` class starts slightly lower and transparent.

JavaScript uses `IntersectionObserver` to detect when the content enters the visible part of the browser.

When it becomes visible, JavaScript adds the `visible` class and CSS creates a smooth fade and upward movement.

I also included a fallback so that the content will still appear if `IntersectionObserver` is not available.

---

## Responsive Design

The project continues to use a mobile-first responsive design.

The base layout is designed for smaller screens first, with media queries used as the available screen size increases.

The navigation:

- uses a compact two-column layout on small screens
- changes to a horizontal Flexbox layout on tablet and desktop screens

The About Me section:

- stacks vertically on smaller screens
- changes to a two-column layout on larger screens

The learning cards and project cards also adjust according to the available screen width.

The contact form and confirmation modal are designed to remain readable and usable across different screen sizes.

The page also uses a flexible body layout so the footer remains at the bottom of the viewport when a page does not contain enough content to fill the screen.

---

## Accessibility Considerations

I included several accessibility improvements while developing the project.

These include:

- semantic HTML elements
- descriptive form labels
- `aria-describedby` for validation messages
- `aria-live="polite"` for changing error messages
- `aria-invalid` to identify invalid fields
- an accessible label for modal and popup close buttons
- `aria-current` for the active navigation section
- keyboard support for closing the modal with Escape
- visible focus states
- reduced-motion support for users who prefer less animation

---

## Testing and Debugging

I tested the project throughout development using Chrome DevTools.

I tested:

- portfolio navigation
- contact popup behaviour
- form validation
- invalid form submission
- valid form submission
- confirmation modal content
- all modal close methods
- responsive layouts
- scroll reveal behaviour

I also tested different invalid values.

Examples included:

### Invalid Name

`James123`

This correctly displays a message explaining that the name can only contain letters and spaces.

### Invalid Email

`james@gmail`

This correctly displays a message asking for a valid email address.

### Invalid Message

`Hello`

This correctly displays a message explaining that the message must contain at least 10 characters.

I then tested valid information and confirmed that the modal only opens when all three fields pass validation.

---

## Debugging Challenge

One issue I encountered during testing was a browser security error when I opened the HTML files directly from Windows.

The browser address started with:

`file:///`

Chrome treated the local files as separate security origins and displayed an unsafe URL error in the Console when moving between `index.html` and `contact.html`.

At first, I changed some of the navigation logic while trying to solve the problem, but I discovered that the website itself was not causing the error.

The correct solution was to run the project through a local development server.

I installed the Live Server extension in Visual Studio Code and opened the project using:

`http://127.0.0.1:5500/`

Once the website was served over HTTP instead of the `file://` protocol, the security-origin error disappeared.

This helped me understand the difference between opening local files directly and running a website through a development server.

---

## DevTools Validation

After moving the project to Live Server, I completed another test using Chrome DevTools.

I checked the Console while:

- refreshing the portfolio
- changing portfolio sections
- opening the Contact Me page
- returning to the portfolio
- entering invalid form information
- entering valid form information
- opening and closing the confirmation modal

The final test showed no red JavaScript errors.

I also checked the Chrome Issues panel and confirmed that no issues were being reported.

---

## Development Decisions

I wanted the Module 6 work to feel like a natural progression of the same portfolio rather than creating a completely separate design.

For this reason, I kept the same:

- colours
- typography
- navigation style
- card styling
- spacing
- overall visual identity

I then added the new Module 6 functionality on top of the existing design.

I also chose to give each main portfolio topic its own section instead of displaying all the information on one long page. This made it possible to add more detail to each topic without making the page feel overcrowded.

The contact form was kept on a separate page because this was part of the Assignment 6 requirement.

---

## What I Learned

Module 6 helped me understand that JavaScript is not only used for simple button interactions.

I learned how JavaScript can:

- select and update DOM elements
- respond to different user events
- validate information while a user types
- change CSS classes based on conditions
- stop a form's default behaviour
- provide immediate visual feedback
- display user information dynamically
- control modal interactions
- respond to keyboard input
- manage interactive sections on a page

The debugging process was also useful.

The local `file://` security problem showed me that a Console error does not always mean that the JavaScript code itself is incorrect. I had to investigate the browser environment and eventually use a proper local development server.

I now have a better understanding of how HTML, CSS, JavaScript, browser developer tools, and the development environment work together.

---

## Project Files

The project currently contains:

- `index.html` - the main portfolio and tab-based content
- `contact.html` - the Module 6 contact form
- `styles.css` - styling, responsive layouts, validation states, modal styling, and animations
- `script.js` - tab navigation, popup behaviour, scroll reveal, form validation, and modal interaction
- `images/` - images used in the portfolio
- `README.md` - documentation of the project and my development process

---

## Technologies Used

- HTML5
- CSS3
- JavaScript
- DOM manipulation
- Event listeners
- Regular expressions for validation
- Intersection Observer
- Chrome DevTools
- Visual Studio Code
- Live Server
- Git
- GitHub

---

## Current Status

The Module 6 version of the portfolio includes:

- responsive portfolio navigation
- expanded Module 6 learning content
- a dedicated contact page
- real-time JavaScript validation
- visual valid and invalid states
- a form-ready button state
- blocked invalid submissions
- a confirmation modal
- multiple modal close controls
- a floating contact popup
- smooth content reveal effects
- responsive layouts
- browser testing and debugging

I will continue developing this portfolio as I progress through the course and learn more front-end development skills.