
"use strict";

/* =========================================
   REMART LACHICA - PERSONAL PORTFOLIO
   Navigation, Animations, Modal and Contact
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    /* =====================================
       1. ELEMENT REFERENCES
    ===================================== */

    const navLinksContainer = document.getElementById("nav-links");
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll(".nav-screen");

    const currentYear = document.getElementById("current-year");

    const modal = document.getElementById("activity-modal");
    const modalDialog = modal?.querySelector(".modal-dialog");
    const modalClose = document.getElementById("modal-close");
    const modalTitle = document.getElementById("modal-title");
    const modalSubject = document.getElementById("modal-subject");
    const modalDescription = document.getElementById("modal-description");
    const modalImage = document.getElementById("activity-image");

    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    const facebookLink = document.getElementById("facebook-link");

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    /* =====================================
       2. CURRENT YEAR
    ===================================== */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    /* =====================================
       3. LABORATORY INFORMATION

       Replace the sample descriptions and
       image paths with actual laboratory work.
    ===================================== */

    const laboratories = [
        {
            title: "Naruto Wallpaper Editing",
            subject: "Multimedia Systems Laboratory",
            description:
                "This laboratory presents an image editing activity focused on creating and enhancing a Naruto-themed wallpaper using visual effects, image composition, and creative design techniques.",
            image: "lab1.png",
            alt: "Screenshot of a programming laboratory activity",
            tools: "Adobe Photoshop Software"
        },
        {
            title: "Typography and Letter Design",
            subject: "Multimedia Systems Laboratory",
            description:
                "This laboratory presents a typography activity focused on designing and styling letters using creative fonts, text effects, and visual elements to create an attractive text design.",
            image: "lab2.jpg",
            alt: "Screenshot of a website development activity",
            tools: "Adobe Photoshop Software"
        },
        {
            title: "Ultrasonic Distance Sensor",
            subject: "Embedded Systems Laboratory",
            description:
                "This laboratory presents a simulation activity involving an ultrasonic distance sensor using Tinkercad. It demonstrates how the sensor detects objects and measures distance through an embedded systems setup.",
            image: "lab3.png",
            alt: "Preview of a photo editing laboratory output",
            tools: "Tinkercad"
        },
        {
            title: "String Reversal in C",
            subject: "Programming Laboratory",
            description:
                "This laboratory presents a C programming activity that reverses a given string using string length and a loop. It demonstrates basic programming concepts, logical thinking, and string manipulation.",
            image: "lab4.png",
            alt: "Preview of a multimedia laboratory output",
            tools: "C Programming Language"
        },
        {
            title: "Asian Food Brochure Design",
            subject: "Living in the IT Era Laboratory",
            description:
                "This laboratory presents a brochure design featuring Korean, Thai, and Filipino food. It combines images, text, and creative layouts to showcase different food cultures in an organized and visually appealing way.",
            image: "lab5.png",
            alt: "Screenshot of a database laboratory activity",
            tools: "Adobe Photoshop Software"
        },
        {
            title: "Web Page Formatting",
            subject: "Web Systems 1 Laboratory",
            description:
                "This laboratory presents webpage formatting activities involving the organization of content, text styling, and page layout using web technologies.",
            image: "lab6.png",
            alt: "Screenshot of a Computer Science diagram",
            tools: "HTML and CSS"
        }
    ];

    /* =====================================
       4. SINGLE-SECTION NAVIGATION

       Only one .nav-screen is visible.
       Previous section fades out before
       the selected section fades in.
    ===================================== */

    let navigationLocked = false;
    let navigationTimer = null;
    let currentSection = document.querySelector(
        ".nav-screen.is-active"
    );

    function updateCurrentNavigation(sectionId) {
        navLinks.forEach((link) => {
            const isCurrent = link.getAttribute("href") === `#${sectionId}`;

            if (isCurrent) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    function closeMobileMenu() {
        if (!menuToggle || !navLinksContainer) return;

        navLinksContainer.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
    }

    function showSection(sectionId, options = {}) {
        const { updateHash = true, moveFocus = false } = options;

        const targetSection = document.getElementById(sectionId);

        if (
            !targetSection ||
            !targetSection.classList.contains("nav-screen")
        ) {
            return;
        }

        closeMobileMenu();

        if (targetSection === currentSection && !navigationLocked) {
            updateCurrentNavigation(sectionId);

            if (updateHash && window.location.hash !== `#${sectionId}`) {
                history.replaceState(null, "", `#${sectionId}`);
            }

            return;
        }

        if (navigationLocked) return;

        navigationLocked = true;

        if (navigationTimer !== null) {
            window.clearTimeout(navigationTimer);
        }

        const previousSection = currentSection;

        if (previousSection && previousSection !== targetSection) {
            previousSection.classList.add("is-leaving");
            previousSection.classList.remove("is-active");
            previousSection.setAttribute("aria-hidden", "true");
        }

        targetSection.classList.remove("is-leaving");
        targetSection.classList.add("is-active");
        targetSection.setAttribute("aria-hidden", "false");

        currentSection = targetSection;

        updateCurrentNavigation(sectionId);

        if (updateHash && window.location.hash !== `#${sectionId}`) {
            history.pushState(null, "", `#${sectionId}`);
        }

        if (moveFocus) {
            const heading = targetSection.querySelector("h1, h2");

            if (heading) {
                if (!heading.hasAttribute("tabindex")) {
                    heading.setAttribute("tabindex", "-1");
                }

                heading.focus({ preventScroll: true });
            }
        }

        /*
         * The previous section is hidden after the fade-out.
         * The selected section fades in using CSS.
         */
        const transitionTime = reducedMotion.matches ? 0 : 300;

        navigationTimer = window.setTimeout(() => {
            sections.forEach((section) => {
                if (section !== targetSection) {
                    section.classList.remove("is-active", "is-leaving");
                    section.setAttribute("aria-hidden", "true");
                }
            });

            targetSection.classList.remove("is-leaving");
            targetSection.classList.add("is-active");
            targetSection.setAttribute("aria-hidden", "false");

            navigationLocked = false;
            navigationTimer = null;
        }, transitionTime);
    }

    /* Set initial section visibility. */

    sections.forEach((section) => {
        const isActive = section === currentSection;

        section.classList.toggle("is-active", isActive);
        section.classList.remove("is-leaving");
        section.setAttribute("aria-hidden", String(!isActive));
    });

    if (currentSection) {
        updateCurrentNavigation(currentSection.id);
    }

    /* Handle navigation link clicks. */

    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href")?.slice(1);

            if (!targetId) return;

            event.preventDefault();

            showSection(targetId, {
                updateHash: true,
                moveFocus: true
            });
        });
    });

    /* Handle links and buttons that navigate to a section. */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        if (link.closest(".nav-links")) return;

        if (link.hasAttribute("data-close-modal")) return;

        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href")?.slice(1);

            if (!targetId || targetId === "") return;

            const target = document.getElementById(targetId);

            if (!target || !target.classList.contains("nav-screen")) {
                return;
            }

            event.preventDefault();

            showSection(targetId, {
                updateHash: true,
                moveFocus: true
            });
        });
    });

    /* Handle browser Back and Forward navigation. */

    window.addEventListener("popstate", () => {
        const sectionId = window.location.hash.slice(1) || "home";

        if (modal && !modal.hidden) {
            closeModal();
        }

        navigationLocked = false;

        if (navigationTimer !== null) {
            window.clearTimeout(navigationTimer);
            navigationTimer = null;
        }

        sections.forEach((section) => {
            const isTarget = section.id === sectionId;

            section.classList.remove("is-leaving");
            section.classList.toggle("is-active", isTarget);
            section.setAttribute("aria-hidden", String(!isTarget));
        });

        currentSection = document.getElementById(sectionId);

        if (!currentSection ||
            !currentSection.classList.contains("nav-screen")) {
            currentSection = document.getElementById("home");
            currentSection?.classList.add("is-active");
            currentSection?.setAttribute("aria-hidden", "false");
        }

        updateCurrentNavigation(currentSection.id);
        closeMobileMenu();
    });

    /* Support direct links such as portfolio/#contact. */

    const initialHash = window.location.hash.slice(1);

    if (
        initialHash &&
        document.getElementById(initialHash)?.classList.contains("nav-screen")
    ) {
        sections.forEach((section) => {
            const isTarget = section.id === initialHash;

            section.classList.toggle("is-active", isTarget);
            section.setAttribute("aria-hidden", String(!isTarget));
        });

        currentSection = document.getElementById(initialHash);
        updateCurrentNavigation(initialHash);
    }

    /* =====================================
       5. MOBILE MENU
    ===================================== */

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener("click", () => {
            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            navLinksContainer.classList.toggle("is-open", !isOpen);
            menuToggle.setAttribute("aria-expanded", String(!isOpen));
        });

        document.addEventListener("click", (event) => {
            const clickedInsideMenu =
                navLinksContainer.contains(event.target) ||
                menuToggle.contains(event.target);

            if (!clickedInsideMenu) {
                closeMobileMenu();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMobileMenu();
            }
        });
    }

    /* =====================================
       6. LABORATORY MODAL
    ===================================== */

    let lastFocusedElement = null;

    function openModal(index, trigger) {
        if (
            !modal ||
            !modalDialog ||
            !modalTitle ||
            !modalSubject ||
            !modalDescription ||
            !modalImage
        ) {
            return;
        }

        const lab = laboratories[index];

        if (!lab) return;

        lastFocusedElement = trigger || document.activeElement;

        modalTitle.textContent = lab.title;
        modalSubject.textContent = lab.subject;
        modalDescription.textContent =
            `${lab.description} Tools used: ${lab.tools}.`;

        modalImage.src = lab.image;
        modalImage.alt = lab.alt;

        modal.hidden = false;
        document.body.style.overflow = "hidden";

        if (modalClose) {
            modalClose.focus();
        } else {
            modalDialog.focus();
        }
    }

    function closeModal() {
        if (!modal || modal.hidden) return;

        modal.hidden = true;
        document.body.style.overflow = "";

        if (
            lastFocusedElement &&
            document.contains(lastFocusedElement)
        ) {
            lastFocusedElement.focus();
        }

        lastFocusedElement = null;
    }

    document.querySelectorAll("[data-activity]").forEach((button) => {
        button.addEventListener("click", () => {
            const index = Number(button.dataset.activity);

            if (!Number.isInteger(index)) return;

            openModal(index, button);
        });
    });

    if (modalClose) {
        modalClose.addEventListener("click", closeModal);
    }

    if (modal) {
        modal.querySelectorAll("[data-close-modal]").forEach((element) => {
            element.addEventListener("click", closeModal);
        });
    }

    /* Escape key closes the modal. */

    document.addEventListener("keydown", (event) => {
        if (!modal || modal.hidden) return;

        if (event.key === "Escape") {
            closeModal();
            return;
        }

        /* Keep keyboard focus inside the open modal. */

        if (event.key === "Tab" && modalDialog) {
            const focusableElements = modalDialog.querySelectorAll(
                'a[href], button:not([disabled]), input:not([disabled]), ' +
                'textarea:not([disabled]), select:not([disabled]), ' +
                '[tabindex]:not([tabindex="-1"])'
            );

            const focusable = Array.from(focusableElements).filter(
                (element) => element.getClientRects().length > 0
            );

            if (focusable.length === 0) {
                event.preventDefault();
                modalDialog.focus();
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (
                !event.shiftKey &&
                document.activeElement === last
            ) {
                event.preventDefault();
                first.focus();
            }
        }
    });

    /* =====================================
       7. CONTACT FORM VALIDATION

       This validates the fields locally.
       It does not send email to a server.
    ===================================== */

    if (contactForm) {
        const nameInput = document.getElementById("contact-name");
        const emailInput = document.getElementById("contact-email");
        const messageInput = document.getElementById("contact-message");

        const nameError = document.getElementById("name-error");
        const emailError = document.getElementById("email-error");
        const messageError = document.getElementById("message-error");

        function setError(input, errorElement, message) {
            if (input) {
                input.setAttribute(
                    "aria-invalid",
                    message ? "true" : "false"
                );
            }

            if (errorElement) {
                errorElement.textContent = message;
            }
        }

        function validateName() {
            const value = nameInput?.value.trim() || "";

            if (!value) {
                setError(nameInput, nameError, "Please enter your full name.");
                return false;
            }

            if (value.length < 2) {
                setError(
                    nameInput,
                    nameError,
                    "Your name must contain at least 2 characters."
                );
                return false;
            }

            setError(nameInput, nameError, "");
            return true;
        }

        function validateEmail() {
            const value = emailInput?.value.trim() || "";
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!value) {
                setError(
                    emailInput,
                    emailError,
                    "Please enter your email address."
                );
                return false;
            }

            if (!emailPattern.test(value)) {
                setError(
                    emailInput,
                    emailError,
                    "Please enter a valid email address."
                );
                return false;
            }

            setError(emailInput, emailError, "");
            return true;
        }

        function validateMessage() {
            const value = messageInput?.value.trim() || "";

            if (!value) {
                setError(
                    messageInput,
                    messageError,
                    "Please enter your message."
                );
                return false;
            }

            if (value.length < 10) {
                setError(
                    messageInput,
                    messageError,
                    "Please enter at least 10 characters."
                );
                return false;
            }

            setError(messageInput, messageError, "");
            return true;
        }

        nameInput?.addEventListener("blur", validateName);
        emailInput?.addEventListener("blur", validateEmail);
        messageInput?.addEventListener("blur", validateMessage);

        nameInput?.addEventListener("input", () => {
            if (nameInput.getAttribute("aria-invalid") === "true") {
                validateName();
            }
        });

        emailInput?.addEventListener("input", () => {
            if (emailInput.getAttribute("aria-invalid") === "true") {
                validateEmail();
            }
        });

        messageInput?.addEventListener("input", () => {
            if (messageInput.getAttribute("aria-invalid") === "true") {
                validateMessage();
            }
        });

        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            if (formStatus) {
                formStatus.textContent = "";
            }

            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();

            if (!isNameValid || !isEmailValid || !isMessageValid) {
                if (!isNameValid) {
                    nameInput?.focus();
                } else if (!isEmailValid) {
                    emailInput?.focus();
                } else {
                    messageInput?.focus();
                }

                if (formStatus) {
                    formStatus.textContent =
                        "Please correct the highlighted fields.";
                }

                return;
            }

            /*
             * No backend is connected.
             * Prepare a message in the visitor's email application.
             */

            const recipient = "remartlachica@gmail.com";

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            const subject = encodeURIComponent(
                `Portfolio Message from ${name}`
            );

            const body = encodeURIComponent(
                `Name: ${name}\n` +
                `Email: ${email}\n\n` +
                `Message:\n${message}`
            );

            if (formStatus) {
                formStatus.textContent =
                    "Opening your email application. Please send the " +
                    "message there to complete the process.";
            }

            window.location.href =
                `mailto:${recipient}?subject=${subject}&body=${body}`;
        });
    }

    /* =====================================
       8. FACEBOOK LINK CHECK
    ===================================== */

    if (facebookLink) {
        facebookLink.addEventListener("click", (event) => {
            const href = facebookLink.getAttribute("href");

            if (!href || href === "#") {
                event.preventDefault();

                if (formStatus) {
                    formStatus.textContent =
                        "The Facebook profile link has not been added yet.";
                }
            }
        });
    }

});