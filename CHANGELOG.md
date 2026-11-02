# Changelog

## Before

- The site was a static, seven-page Crown & Blade barbershop website with shared navigation and footer.
- The homepage introduced the shop and linked to services and appointment booking; the About page described the shop and its customer benefits.
- The Services page listed haircuts, beard grooming, facial care, and a full package.
- The Gallery page displayed six captioned grooming photos with responsive image sources.
- The Pricing page listed Classic Haircut (R30), Beard Trim (R20), Hot Towel Shave (R25), and Full Grooming Package (R65), under a generic "Price" column heading.
- The booking page collected a required name, email, service, and date, then posted to `/book`. No backend endpoint was included, so appointments were not saved or processed.
- The Contact page displayed the shop address, phone number, and email address.
- Shared CSS provided the black-and-yellow theme and responsive layouts. The site did not use JavaScript; `script.js` was empty.

## After

- Added a staff/customer role-selection page as the first screen; the default `index.html` entry redirects to it.
- Kept customer pages together behind the customer choice and moved the existing attendance and booking view to `staff-dashboard.html`.
- Updated customer page home links and the staff dashboard navigation to return to the correct role-specific destination.
- Added the staff PIN gate and staff-only session check, plus a customer booking availability list that reflects today's staff attendance.
- Updated the site-wide palette to powder blue, white, and powder green while keeping the existing layouts and strengthening the homepage watermark visibility.
- Replaced the broken portal landing links with a customer homepage and a working staff portal link.
- Connected the shared JavaScript on every page: booking requests and attendance are saved locally, the staff dashboard displays those bookings, contact messages open as email drafts, and copyright years update automatically.
- Clarified that browser-local bookings are not sent to staff, aligned bookable services with listed prices, and corrected the contact form and page structure.
- Updated the README to describe the current website behavior and local-storage limitations.
- Updated the README to describe the website's pages, styling, files, and booking limitation.
- Changed the pricing table heading from "Price" to "Price (Rands)". The listed amounts did not change.
- Created and updated this changelog to record the pre-today website and today's changes.
- Verified in a browser that homepage navigation targets and the stylesheet load, and that all six gallery images render.
