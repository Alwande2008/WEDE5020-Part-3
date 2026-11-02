document.addEventListener("DOMContentLoaded", () => {
  const bookingStorageKey = "crownBladeBookings";
  const attendanceStorageKey = "crownBladeAttendance";
  const staffAccessStorageKey = "crownBladeStaffAccess";
  const staffAccessCode = "1234";
  const staffMembers = ["Sipho", "David"];
  const bookingForm = document.getElementById("booking-form");
  const staffAccessForm = document.getElementById("staff-access-form");
  const contactForm = document.getElementById("contact-form");
  const bookingsList = document.getElementById("bookings-list");
  const barberAvailabilityList = document.getElementById("barber-availability");
  const attendanceContainer = document.getElementById("staff-attendance-container");
  const attendanceMessage = document.getElementById("attendance-message");
  const bookingMessage = document.getElementById("booking-message");
  const contactMessage = document.getElementById("contact-message-status");
  const staffAccessMessage = document.getElementById("staff-access-message");

  function getLocalDateString(date = new Date()) {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
  }

  function readStoredArray(key) {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) {
      return [];
    }

    const value = JSON.parse(storedValue);
    if (!Array.isArray(value)) {
      throw new Error(`Saved data for ${key} is not in the expected format.`);
    }
    return value;
  }

  function showMessage(element, message, isError = false) {
    if (!element) {
      return;
    }
    element.textContent = message;
    element.classList.toggle("form-message-error", isError);
  }

  function readAttendanceForToday() {
    const attendance = { Sipho: true, David: true };
    const storedAttendance = localStorage.getItem(attendanceStorageKey);
    if (storedAttendance === null) {
      return attendance;
    }

    const parsedAttendance = JSON.parse(storedAttendance);
    if (!parsedAttendance || typeof parsedAttendance !== "object") {
      throw new Error("Saved attendance is not in the expected format.");
    }
    if (parsedAttendance.date !== getLocalDateString()) {
      return attendance;
    }
    if (
      !parsedAttendance.statuses ||
      typeof parsedAttendance.statuses !== "object" ||
      Array.isArray(parsedAttendance.statuses)
    ) {
      throw new Error("Saved attendance statuses are not in the expected format.");
    }

    staffMembers.forEach((name) => {
      if (typeof parsedAttendance.statuses[name] === "boolean") {
        attendance[name] = parsedAttendance.statuses[name];
      }
    });
    return attendance;
  }

  if (staffAccessForm) {
    staffAccessForm.addEventListener("submit", (event) => {
      event.preventDefault();
      showMessage(staffAccessMessage, "");
      if (!staffAccessForm.reportValidity()) {
        return;
      }

      const accessCode = String(new FormData(staffAccessForm).get("accessCode"));
      if (accessCode !== staffAccessCode) {
        showMessage(staffAccessMessage, "That code is not correct. Please try again.", true);
        staffAccessForm.reset();
        return;
      }

      try {
        sessionStorage.setItem(staffAccessStorageKey, "granted");
        window.location.href = "staff-dashboard.html";
      } catch (error) {
        console.error("Could not start the staff session.", error);
        showMessage(
          staffAccessMessage,
          "The staff session could not be started in this browser.",
          true
        );
      }
    });
  }

  if (document.body.dataset.staffOnly === "true") {
    let hasStaffAccess = false;
    try {
      hasStaffAccess = sessionStorage.getItem(staffAccessStorageKey) === "granted";
    } catch (error) {
      console.error("Could not check the staff session.", error);
    }

    if (!hasStaffAccess) {
      window.location.replace("staff%20portal.html#staff-access-form");
      return;
    }
  }

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll("[data-tabs]").forEach((tabContainer) => {
    const tabs = Array.from(tabContainer.querySelectorAll('[role="tab"]'));
    const panels = Array.from(tabContainer.querySelectorAll('[role="tabpanel"]'));

    function activateTab(tab, moveFocus = false) {
      tabs.forEach((item) => {
        const selected = item === tab;
        item.setAttribute("aria-selected", String(selected));
        item.tabIndex = selected ? 0 : -1;
      });
      panels.forEach((panel) => {
        panel.hidden = panel.id !== tab.getAttribute("aria-controls");
      });
      if (moveFocus) {
        tab.focus();
      }
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activateTab(tab));
      tab.addEventListener("keydown", (event) => {
        let nextIndex = index;
        if (event.key === "ArrowRight") {
          nextIndex = (index + 1) % tabs.length;
        } else if (event.key === "ArrowLeft") {
          nextIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = tabs.length - 1;
        } else {
          return;
        }
        event.preventDefault();
        activateTab(tabs[nextIndex], true);
      });
    });
  });

  const serviceDialog = document.getElementById("service-dialog");
  if (serviceDialog instanceof HTMLDialogElement) {
    const title = document.getElementById("service-dialog-title");
    const description = document.getElementById("service-dialog-description");
    document.querySelectorAll(".service-details").forEach((button) => {
      button.addEventListener("click", () => {
        title.textContent = button.dataset.serviceTitle || "";
        description.textContent = button.dataset.serviceDescription || "";
        serviceDialog.showModal();
      });
    });
    serviceDialog.querySelector(".dialog-close").addEventListener("click", () => {
      serviceDialog.close();
    });
    serviceDialog.addEventListener("click", (event) => {
      if (event.target === serviceDialog) {
        serviceDialog.close();
      }
    });
  }

  const lightboxDialog = document.getElementById("lightbox-dialog");
  if (lightboxDialog instanceof HTMLDialogElement) {
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxCaption = document.getElementById("lightbox-caption");
    document.querySelectorAll(".lightbox-trigger").forEach((button) => {
      button.addEventListener("click", () => {
        const image = button.querySelector("img");
        if (!image) {
          return;
        }
        lightboxImage.src = button.dataset.lightboxSrc || image.currentSrc || image.src;
        lightboxImage.alt = image.alt;
        lightboxCaption.textContent = button.closest("figure")?.querySelector("figcaption")?.textContent || image.alt;
        lightboxDialog.showModal();
      });
    });
    lightboxDialog.querySelector(".dialog-close").addEventListener("click", () => {
      lightboxDialog.close();
    });
    lightboxDialog.addEventListener("click", (event) => {
      if (event.target === lightboxDialog) {
        lightboxDialog.close();
      }
    });
    lightboxDialog.addEventListener("close", () => {
      lightboxImage.removeAttribute("src");
    });
  }

  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const animatedElements = document.querySelectorAll(
      "main h1, main > section, main article.card, main table, main .hero-box, main .role-card, main .availability-panel, main .section-box, .gallery-box"
    );
    animatedElements.forEach((element) => element.classList.add("reveal-on-scroll"));
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0 });
    animatedElements.forEach((element) => revealObserver.observe(element));
  }

  if (bookingForm) {
    const dateInput = bookingForm.querySelector('input[name="date"]');
    if (dateInput) {
      dateInput.min = getLocalDateString();
    }

    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();
      showMessage(bookingMessage, "");

      if (!bookingForm.reportValidity()) {
        return;
      }

      const formData = new FormData(bookingForm);
      const booking = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        name: String(formData.get("name")).trim(),
        email: String(formData.get("email")).trim(),
        service: String(formData.get("service")),
        barber: String(formData.get("barber")),
        date: String(formData.get("date")),
        time: String(formData.get("time"))
      };

      try {
        const attendance = readAttendanceForToday();
        if (
          (booking.barber === "Sipho" || booking.barber === "David") &&
          attendance[booking.barber] === false
        ) {
          renderBarberAvailability();
          showMessage(bookingMessage, "That barber is marked unavailable today. Please choose another barber.", true);
          return;
        }
        if (
          booking.barber === "First Available" &&
          !staffMembers.some((name) => attendance[name])
        ) {
          renderBarberAvailability();
          showMessage(bookingMessage, "No barbers are marked available today. Please contact the shop.", true);
          return;
        }

        const bookings = readStoredArray(bookingStorageKey);
        bookings.push(booking);
        localStorage.setItem(bookingStorageKey, JSON.stringify(bookings));
        bookingForm.reset();
        if (dateInput) {
          dateInput.min = getLocalDateString();
        }
        showMessage(
          bookingMessage,
          "Your request is saved in this browser. Please contact the shop to confirm your appointment."
        );
      } catch (error) {
        console.error("Could not save the booking request.", error);
        showMessage(
          bookingMessage,
          "We could not save your request in this browser. Please contact the shop by phone or email.",
          true
        );
      }
    });
  }

  function renderBarberAvailability() {
    if (!barberAvailabilityList) {
      return;
    }

    try {
      const attendance = readAttendanceForToday();
      barberAvailabilityList.replaceChildren();
      staffMembers.forEach((name) => {
        const isPresent = attendance[name];
        const item = document.createElement("li");
        item.className = isPresent ? "availability-present" : "availability-absent";
        item.textContent = `${name}: ${isPresent ? "Present today" : "Unavailable today"}`;
        barberAvailabilityList.append(item);

        const option = bookingForm?.querySelector(`select[name="barber"] option[value="${name}"]`);
        if (option) {
          option.disabled = !isPresent;
          if (!isPresent && bookingForm.elements.barber.value === name) {
            bookingForm.elements.barber.value = "";
          }
        }
      });

      const firstAvailableOption = bookingForm?.querySelector(
        'select[name="barber"] option[value="First Available"]'
      );
      if (firstAvailableOption) {
        firstAvailableOption.disabled = !staffMembers.some((name) => attendance[name]);
      }
    } catch (error) {
      console.error("Could not load barber availability.", error);
      barberAvailabilityList.replaceChildren();
      const item = document.createElement("li");
      item.textContent = "Barber availability could not be loaded. Please contact the shop.";
      barberAvailabilityList.append(item);
      bookingForm?.querySelectorAll('select[name="barber"] option:not([value=""])')
        .forEach((option) => {
          option.disabled = true;
        });
    }
  }

  if (barberAvailabilityList) {
    renderBarberAvailability();
    window.addEventListener("storage", (event) => {
      if (event.key === attendanceStorageKey || event.key === null) {
        renderBarberAvailability();
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      showMessage(contactMessage, "");
      if (!contactForm.reportValidity()) {
        return;
      }

      const formData = new FormData(contactForm);
      const subject = String(formData.get("subject")).trim() || "Website enquiry";
      const body = [
        `Name: ${String(formData.get("name")).trim()}`,
        `Email: ${String(formData.get("email")).trim()}`,
        "",
        String(formData.get("message")).trim()
      ].join("\n");
      window.location.href = `mailto:info@crownandblade.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      showMessage(contactMessage, "Your email app should open with this message ready to send.");
    });
  }

  function renderBookings() {
    if (!bookingsList) {
      return;
    }

    bookingsList.replaceChildren();
    const bookings = readStoredArray(bookingStorageKey);
    if (bookings.length === 0) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 6;
      cell.textContent = "No bookings found.";
      row.append(cell);
      bookingsList.append(row);
      return;
    }

    bookings.forEach((booking) => {
      const row = document.createElement("tr");
      [booking.name, booking.email, booking.service, booking.barber, booking.date, booking.time]
        .forEach((value) => {
          const cell = document.createElement("td");
          cell.textContent = String(value ?? "");
          row.append(cell);
        });
      bookingsList.append(row);
    });
  }

  if (bookingsList) {
    function renderBookingsSafely() {
      try {
        renderBookings();
      } catch (error) {
        console.error("Could not read saved bookings.", error);
        bookingsList.replaceChildren();
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 6;
        cell.textContent = "Saved bookings could not be loaded. Check this browser's local storage.";
        row.append(cell);
        bookingsList.append(row);
      }
    }

    renderBookingsSafely();
    window.addEventListener("storage", (event) => {
      if (event.key === bookingStorageKey || event.key === null) {
        renderBookingsSafely();
      }
    });
  }

  if (attendanceContainer) {
    const todayKey = getLocalDateString();
    let attendance = { Sipho: true, David: true };

    try {
      attendance = readAttendanceForToday();
    } catch (error) {
      console.error("Could not read saved attendance.", error);
      showMessage(
        attendanceMessage,
        "Saved attendance could not be loaded. Changes may not persist in this browser.",
        true
      );
    }

    function renderAttendance() {
      attendanceContainer.replaceChildren();
      staffMembers.forEach((name) => {
        const isPresent = attendance[name] !== false;
        const card = document.createElement("div");
        card.className = "staff-card";

        const nameElement = document.createElement("strong");
        nameElement.textContent = name;

        const status = document.createElement("span");
        status.className = `status-badge ${isPresent ? "status-present" : "status-absent"}`;
        status.textContent = isPresent ? "Present" : "Absent";

        const button = document.createElement("button");
        button.className = "toggle-btn";
        button.type = "button";
        button.textContent = `Mark ${isPresent ? "Absent" : "Present"}`;
        button.setAttribute("aria-label", `Mark ${name} ${isPresent ? "absent" : "present"}`);
        button.addEventListener("click", () => {
          attendance[name] = !isPresent;
          try {
            localStorage.setItem(
              attendanceStorageKey,
              JSON.stringify({ date: todayKey, statuses: attendance })
            );
            renderAttendance();
          } catch (error) {
            console.error("Could not save attendance.", error);
            window.alert("Attendance could not be saved in this browser.");
          }
        });

        card.append(nameElement, status, button);
        attendanceContainer.append(card);
      });
    }

    renderAttendance();
    window.addEventListener("storage", (event) => {
      if (event.key !== attendanceStorageKey && event.key !== null) {
        return;
      }
      try {
        attendance = readAttendanceForToday();
        renderAttendance();
        showMessage(attendanceMessage, "");
      } catch (error) {
        console.error("Could not refresh saved attendance.", error);
        showMessage(
          attendanceMessage,
          "Saved attendance could not be refreshed. Changes may not persist in this browser.",
          true
        );
      }
    });
  }

  const clearBookingsButton = document.getElementById("clear-bookings");
  if (clearBookingsButton) {
    clearBookingsButton.addEventListener("click", () => {
      if (!window.confirm("Clear all bookings saved in this browser?")) {
        return;
      }
      try {
        localStorage.removeItem(bookingStorageKey);
        renderBookings();
      } catch (error) {
        console.error("Could not clear saved bookings.", error);
        window.alert("Bookings could not be cleared from this browser.");
      }
    });
  }
});
