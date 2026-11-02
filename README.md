# Crown & Blade Barbershop

This project is a simple barbershop website made with HTML, CSS, and JavaScript. It lets visitors choose whether they are a customer or staff member and then takes them to the right pages. The website is designed to look clean, modern, and easy to use on both desktop and mobile devices.

## Project overview

Crown & Blade is a website for a fictional barber shop. It gives customers a quick overview of the shop, the services available, pricing, and booking options. It also includes a staff area where staff can check appointments and attendance status.

## Main features

### Customer experience

The site starts with a role selection page. Visitors can either:

- go to the customer area, or
- use the staff code `1234` to open the staff dashboard.

The customer homepage includes:

- a clear brand header and navigation
- a welcoming message and strong call-to-action buttons
- service highlights
- a section about the team and the customer experience
- quick links to important pages such as services, pricing, and booking

### About the shop

The About Us page explains the shop's style and values. It focuses on classic barbering, modern grooming, clean service, friendly staff, and a relaxed environment.

### Services and pricing

The Services page explains the main treatments on offer, including:

- Haircut
- Beard Grooming
- Full Grooming Package

The Pricing page shows the service prices in South African Rands and keeps the information easy to read.

### Gallery

The Gallery page shows different barber looks and styles. Compressed JPEG versions are served at responsive sizes; offscreen images load lazily, while the first gallery image is prioritized.

### Interactive elements

- The Services page uses keyboard-accessible tabs to switch service categories, with a details modal for each service.
- The About and Booking pages use expandable accordion sections for additional information.
- Gallery images open in an accessible lightbox when selected.
- Content and cards animate into view as visitors scroll. Motion effects are reduced when the visitor's device requests reduced motion.

### Booking form

The booking page lets customers enter:

- name
- email
- chosen service
- preferred barber
- date
- time

The form includes validation to prevent empty or wrong submissions. Booking data is saved in the browser's local storage so the staff dashboard can view it. This is a demo project, so bookings are not sent to a real database or server.

### Contact page

The contact page shows the barbershop's address, phone number, and email. It also includes a contact form and a map. When the customer sends a message, the browser opens their default email app with a prepared message.

## Website design

The website uses a simple design system to stay consistent across all pages:

- yellow and black branding
- white content blocks
- soft blue and green accents
- clear navigation and readable text
- responsive navigation, content, forms, and gallery layouts for phones, tablets, and desktops
- horizontally scrollable staff booking table on narrow screens
- accessible labels and layout structure

The styling is mostly controlled by [style.css](style.css), which handles the overall layout, page sections, buttons, forms, pricing table, and gallery design.

## JavaScript behavior

The [script.js](script.js) file handles several interactive features, including:

- form validation
- local booking storage
- staff dashboard updates
- current year in the footer
- contact form email setup

It is important to note that the staff access code in the browser is only a demo feature. It is not secure enough for real customer data. A proper website would need server-side authentication and a real database.



## Project structure

```text
.
├── index.html                # Main entry page that redirects to role selection
├── staff portal.html         # First page with customer/staff choices
├── Customer Home.html        # Customer homepage
├── staff-dashboard.html      # Staff page for viewing bookings and attendance
├── About Us.html            # About the business and its values
├── Service.html             # Services offered by the barbershop
├── Gallery.html             # Photo gallery for different hairstyles
├── Pricing.html             # Price list for services
├── Book.Html                # Booking form page
├── contact.html             # Contact information and form
├── style.css                # Shared website styling
├── script.js                # Shared JavaScript logic
├── Images/                 # Images used in the gallery and homepage
├── CHANGELOG.md             # Project update history
├── README.md                # Project documentation
└──
```

## Current limitations

This is a learning/demo project, so it has a few limits:

- bookings are stored only in the local browser
- contact forms open an email app instead of sending messages to a server
- staff attendance is local and not synced across devices
- the staff code is not secure and is only for demonstration
- the map depends on internet access

## Possible improvements

If this project were developed further, these would be useful upgrades:

1. Add a real backend for bookings and contact forms
2. Save customer data safely in a database
3. Add barber availability and time slot selection
4. Keep prices in one central source to avoid duplication
5. Improve form success and error messages
6. Add better privacy and consent handling
7. Add a proper logo and business metadata
8. Use secure login and authentication for staff access


## Summary

This project is a front-end barbershop website built as a student web design project. It shows how HTML, CSS, and JavaScript can be used together to create a responsive business website with booking and staff features. It is a strong example of a static website for a local business, but it still needs a real backend and secure systems before it can be used in a live business setting.

## References
-Responsive design: Chatgpt AI, Accessed : 1 November 2026
-Fixing broken javascript and Error check: Visual Studio Code Agent( Github Copilot), Accessed: 1 November 2026
-Things that should be on a website: ideasonpurpose-(ideasonpurpose,2000),: Accessed: 28 October 2026, `https://www.ideasonpurpose.com/about/`
-Adding JavaScript to your page: MDN, Accessed: 2 November 2026, `https://developer.mozilla.org/en-US/docs/Web/HTML/How_to/Add_JavaScript_to_your_web_page`
## Acknowledgements and AI assistance

AI tools were used as support during the planning and development of this project:

- **ChatGPT (OpenAI)** — consulted for ethical guidance, layout ideas, and general suggestions for making the website more polished and user-friendly.
- **Visual Studio Code agent (GitHub Copilot)** — used for coding assistance, explanations, and help with development tasks.

AI suggestions were reviewed and adapted as needed. The project content and final implementation were checked by the author, who is responsible for the submitted work.

## SEO link
`hairstdio.netlify.app` (just as it is written)


## Author
Alwande Mbambo