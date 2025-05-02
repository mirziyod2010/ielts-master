document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on a nav link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navLinks.classList.remove("active")
    })
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Practice Test Timer
  const practiceTimer = document.getElementById("practice-timer")
  if (practiceTimer) {
    let timeLeft = 60 * 60 // 60 minutes in seconds
    let timerInterval // Declare timerInterval here

    const updateTimer = () => {
      const minutes = Math.floor(timeLeft / 60)
      const seconds = timeLeft % 60

      practiceTimer.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

      if (timeLeft > 0) {
        timeLeft--
      } else {
        clearInterval(timerInterval)
        alert("Time is up! Your test has been submitted.")
      }
    }

    const startTestBtn = document.getElementById("start-test-btn")
    if (startTestBtn) {
      startTestBtn.addEventListener("click", () => {
        timeLeft = 60 * 60
        updateTimer()
        timerInterval = setInterval(updateTimer, 1000)
        startTestBtn.textContent = "Test in Progress..."
        startTestBtn.disabled = true
      })
    }
  }

  // Band Score Calculator
  const calculateBtn = document.getElementById("calculate-btn")
  if (calculateBtn) {
    calculateBtn.addEventListener("click", () => {
      const listeningScore = Number.parseFloat(document.getElementById("listening-score").value) || 0
      const readingScore = Number.parseFloat(document.getElementById("reading-score").value) || 0
      const writingScore = Number.parseFloat(document.getElementById("writing-score").value) || 0
      const speakingScore = Number.parseFloat(document.getElementById("speaking-score").value) || 0

      // Validate scores
      if (
        listeningScore < 0 ||
        listeningScore > 9 ||
        readingScore < 0 ||
        readingScore > 9 ||
        writingScore < 0 ||
        writingScore > 9 ||
        speakingScore < 0 ||
        speakingScore > 9
      ) {
        alert("Please enter valid scores between 0 and 9.")
        return
      }

      // Calculate overall score
      const overallScore = ((listeningScore + readingScore + writingScore + speakingScore) / 4).toFixed(1)

      // Update UI
      document.getElementById("overall-score").textContent = overallScore

      // Update band description
      const bandDescriptionText = document.getElementById("band-description-text")
      if (overallScore >= 8.5) {
        bandDescriptionText.textContent =
          "Expert User: Complete operational command of the language with only occasional unsystematic inaccuracies."
      } else if (overallScore >= 7.5) {
        bandDescriptionText.textContent =
          "Very Good User: Fully operational command of the language with occasional inaccuracies."
      } else if (overallScore >= 6.5) {
        bandDescriptionText.textContent =
          "Good User: Generally effective command of the language despite some inaccuracies."
      } else if (overallScore >= 5.5) {
        bandDescriptionText.textContent =
          "Competent User: Generally effective command of the language with some inaccuracies and misunderstandings."
      } else if (overallScore >= 4.5) {
        bandDescriptionText.textContent =
          "Modest User: Partial command of the language with frequent errors and misunderstandings."
      } else {
        bandDescriptionText.textContent =
          "Limited or Basic User: Basic competence is limited to familiar situations. You need to improve significantly."
      }
    })
  }

  // Testimonial Slider
  const testimonialSlider = document.getElementById("testimonial-slider")
  const testimonialSlides = document.querySelectorAll(".testimonial-slide")
  const dots = document.querySelectorAll(".dot")
  const prevBtn = document.getElementById("prev-testimonial")
  const nextBtn = document.getElementById("next-testimonial")

  if (testimonialSlider && testimonialSlides.length > 0) {
    let currentSlide = 0

    // Hide all slides except the first one
    testimonialSlides.forEach((slide, index) => {
      if (index !== 0) {
        slide.style.display = "none"
      }
    })

    // Function to show a specific slide
    const showSlide = (index) => {
      // Hide all slides
      testimonialSlides.forEach((slide) => {
        slide.style.display = "none"
      })

      // Remove active class from all dots
      dots.forEach((dot) => {
        dot.classList.remove("active")
      })

      // Show the selected slide
      testimonialSlides[index].style.display = "block"

      // Add active class to the corresponding dot
      dots[index].classList.add("active")

      // Update current slide index
      currentSlide = index
    }

    // Event listeners for next and previous buttons
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        let nextIndex = currentSlide + 1
        if (nextIndex >= testimonialSlides.length) {
          nextIndex = 0
        }
        showSlide(nextIndex)
      })
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        let prevIndex = currentSlide - 1
        if (prevIndex < 0) {
          prevIndex = testimonialSlides.length - 1
        }
        showSlide(prevIndex)
      })
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index)
      })
    })

    // Auto slide change
    setInterval(() => {
      let nextIndex = currentSlide + 1
      if (nextIndex >= testimonialSlides.length) {
        nextIndex = 0
      }
      showSlide(nextIndex)
    }, 5000)
  }

  // Newsletter Form
  const newsletterForm = document.getElementById("newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("email").value
      const formMessage = document.getElementById("form-message")

      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        formMessage.textContent = "Please enter a valid email address."
        formMessage.style.color = "#ef4444"
        return
      }

      // Simulate form submission
      formMessage.textContent = "Thank you for subscribing to our newsletter!"
      formMessage.style.color = "#10b981"

      // Reset form
      newsletterForm.reset()

      // Clear success message after 5 seconds
      setTimeout(() => {
        formMessage.textContent = ""
      }, 5000)
    })
  }

  // Add active class to nav links based on scroll position
  const sections = document.querySelectorAll("section[id]")

  function highlightNavLink() {
    const scrollY = window.pageYOffset

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 100
      const sectionId = section.getAttribute("id")

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add("active")
      } else {
        document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.remove("active")
      }
    })
  }

  window.addEventListener("scroll", highlightNavLink)

  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Simple validation
      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields")
        return
      }

      // Here you would typically send the form data to a server
      // For now, we'll just show a success message
      alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`)

      // Reset the form
      contactForm.reset()
    })
  }
})
