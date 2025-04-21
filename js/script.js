// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
  // Initialize custom cursor
  initCursor();

  // Initialize menu toggle
  initMenuToggle();

  // Initialize smooth navigation
  initSmoothNav();

  // Initialize typing effect
  initTypingEffect();

  // Initialize skills progress bars
  initSkillBars();

  // Initialize project filtering
  initProjectFilter();

  // Add scroll effects
  initScrollEffects();

  // Initialize contact form
  initContactForm();
});

// Custom cursor functionality
function initCursor() {
  const cursor = document.querySelector(".cursor");
  const cursorFollower = document.querySelector(".cursor-follower");

  document.addEventListener("mousemove", function (e) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    setTimeout(function () {
      cursorFollower.style.left = e.clientX + "px";
      cursorFollower.style.top = e.clientY + "px";
    }, 100);
  });

  // Change cursor style on hover over links and buttons
  const links = document.querySelectorAll(
    "a, button, .project-card, .skill-card, .tech-item"
  );

  links.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      cursor.classList.add("cursor-hover");
      cursorFollower.classList.add("cursor-hover");
      cursorFollower.style.width = "20px";
      cursorFollower.style.height = "20px";
    });

    link.addEventListener("mouseleave", function () {
      cursor.classList.remove("cursor-hover");
      cursorFollower.classList.remove("cursor-hover");
      cursorFollower.style.width = "32px";
      cursorFollower.style.height = "32px";
    });
  });
}

// Menu toggle functionality
function initMenuToggle() {
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle menu when clicking hamburger
  menuToggle.addEventListener("click", function () {
    this.classList.toggle("menu-active");
    document.body.classList.toggle("menu-open");
    mainNav.classList.toggle("active");
  });

  // Close menu when clicking navigation link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      menuToggle.classList.remove("menu-active");
      document.body.classList.remove("menu-open");
      mainNav.classList.remove("active");
    });
  });
}

// Smooth navigation between sections
function initSmoothNav() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Get the target section ID
      const targetId = this.getAttribute("href").substring(1);

      // Remove active class from all links
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });

      // Add active class to clicked link
      this.classList.add("active");

      // Remove active class from all sections
      sections.forEach((section) => {
        section.classList.remove("active");
      });

      // Add active class to target section
      document.getElementById(targetId).classList.add("active");

      // Update URL hash without jumping
      history.pushState(null, null, `#${targetId}`);
    });
  });

  // Handle initial page load or refresh
  function setInitialSection() {
    let targetId;

    // Check if URL has a hash
    if (window.location.hash) {
      targetId = window.location.hash.substring(1);
    } else {
      // Default to home if no hash
      targetId = "home";
    }

    // Remove active class from all links
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });

    // Add active class to target link
    document.querySelector(`a[href="#${targetId}"]`).classList.add("active");

    // Remove active class from all sections
    sections.forEach((section) => {
      section.classList.remove("active");
    });

    // Add active class to target section if it exists
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add("active");
    } else {
      // Fallback to home
      document.getElementById("home").classList.add("active");
    }
  }

  // Set initial section on page load
  setInitialSection();

  // Update section on hash change
  window.addEventListener("hashchange", setInitialSection);
}

// Typing effect for the hero section
function initTypingEffect() {
  const typingElement = document.querySelector(".typing-text");
  const strings = [
    "AI Developer",
    "Smart Contract Expert",
    "AI Agent Builder",
    "Technology Explorer",
  ];

  let stringIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;

  function type() {
    const currentString = strings[stringIndex];

    if (isDeleting) {
      // Remove character
      typingElement.textContent = currentString.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 50;
    } else {
      // Add character
      typingElement.textContent = currentString.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 150;
    }

    // Handle text completion
    if (!isDeleting && charIndex === currentString.length) {
      // Pause at the end of typing
      isDeleting = true;
      typingDelay = 2000;
    } else if (isDeleting && charIndex === 0) {
      // Move to next text
      isDeleting = false;
      stringIndex++;

      // Reset to first text if all texts are typed
      if (stringIndex === strings.length) {
        stringIndex = 0;
      }

      // Pause before typing next string
      typingDelay = 500;
    }

    setTimeout(type, typingDelay);
  }

  // Start typing effect
  setTimeout(type, 1000);
}

// Initialize skills progress bars
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-bar");

  // Function to animate skill bars when they come into view
  function animateSkillBars() {
    skillBars.forEach((bar) => {
      const percent = bar.getAttribute("data-percent");
      const progress = bar.querySelector(".skill-progress");
      const isAnimated = bar.classList.contains("animated");

      if (isInViewport(bar) && !isAnimated) {
        setTimeout(() => {
          progress.style.width = percent + "%";
          bar.classList.add("animated");
        }, 200);
      }
    });
  }

  // Check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Initial check
  animateSkillBars();

  // Check on scroll
  window.addEventListener("scroll", animateSkillBars);
}

// Project filtering functionality
function initProjectFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      // Add active class to clicked button
      this.classList.add("active");

      // Get filter value
      const filterValue = this.getAttribute("data-filter");

      // Filter projects
      projectCards.forEach((card) => {
        // Remove hide class initially
        card.classList.remove("hide");

        // If not "all" filter and card doesn't match filter, hide it
        if (
          filterValue !== "all" &&
          !card.getAttribute("data-category").includes(filterValue)
        ) {
          card.classList.add("hide");
        }
      });
    });
  });
}

// Scroll effects
function initScrollEffects() {
  const header = document.querySelector("header");

  // Header scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Animate elements on scroll
  const animatedElements = document.querySelectorAll(
    ".skill-card, .project-card, .contact-card"
  );

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Basic validation
      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields.");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Simulate form submission (replace with actual form submission)
      const submitBtn = contactForm.querySelector(".submit-btn");
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML =
        '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;

      // Simulate API call (replace with your actual form submission logic)
      setTimeout(function () {
        alert("Message sent successfully! I will get back to you soon.");
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }
}
