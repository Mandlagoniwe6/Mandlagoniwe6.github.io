document.addEventListener('DOMContentLoaded', () => {
  // Page Load Progress Bar
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('load', () => {
      progressBar.style.width = '100%';
      setTimeout(() => progressBar.style.opacity = '0', 300);
  });

  // Loader
  window.addEventListener('load', () => {
      const loader = document.getElementById('loader');
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 500);
  });

  // Theme toggle
  const themeToggle = document.querySelector('.theme-toggle');
  themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      const isLight = document.body.classList.contains('light-mode');
      themeToggle.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light-mode');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }

  // Custom cursor
  const cursor = document.querySelector('.custom-cursor');
  document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.pageX + 'px';
      cursor.style.top = e.pageY + 'px';
  });

  document.querySelectorAll('a, button, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  // Navigation scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
      } else {
          navbar.classList.remove('scrolled');
      }
  });

  // Hamburger menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
  });

  // Scroll Indicators
  const scrollDots = document.querySelectorAll('.scroll-dot');
  const sections = document.querySelectorAll('section');
  const observerOptions = { threshold: 0.3 };
  const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              scrollDots.forEach(dot => {
                  dot.classList.remove('active');
                  if (dot.getAttribute('data-section') === entry.target.id) {
                      dot.classList.add('active');
                  }
              });
              entry.target.classList.add('visible');
          }
      });
  }, observerOptions);
  sections.forEach(section => sectionObserver.observe(section));

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
          navLinks.classList.remove('active');
      });
  });

  // Active navigation state
  const navItems = document.querySelectorAll('.nav-link');
  const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              navItems.forEach(link => {
                  link.classList.remove('active');
                  if (link.getAttribute('href').substring(1) === entry.target.id) {
                      link.classList.add('active');
                  }
              });
          }
      });
  }, observerOptions);
  sections.forEach(section => navObserver.observe(section));

  // Typed text effect
  const typedText = document.getElementById('typed-text');
  const texts = ['Aspiring Software Developer', 'Tech Enthusiast'];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
      const currentText = texts[textIndex];
      if (!isDeleting && charIndex < currentText.length) {
          typedText.textContent += currentText[charIndex];
          charIndex++;
          setTimeout(type, 100);
      } else if (isDeleting && charIndex > 0) {
          typedText.textContent = currentText.substring(0, charIndex - 1);
          charIndex--;
          setTimeout(type, 50);
      } else if (!isDeleting && charIndex === currentText.length) {
          setTimeout(() => { isDeleting = true; type(); }, 1000);
      } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
          setTimeout(type, 500);
      }
  }
  type();

  // Animate elements
  const animateObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              if (entry.target.classList.contains('skill-category')) {
                  entry.target.querySelectorAll('.progress-bar').forEach(bar => {
                      bar.style.width = '100%';
                      setTimeout(() => {
                          bar.style.width = bar.dataset.progress + '%';
                      }, 100);
                  });
              }
          }
      });
  }, { threshold: 0.1 });
  document.querySelectorAll('.section, .project-card').forEach(element => {
      animateObserver.observe(element);
  });

  // See More Button Toggle
  const seeMoreBtn = document.getElementById('see-more-btn');
  const aboutMore = document.getElementById('about-more');
  seeMoreBtn.addEventListener('click', () => {
      aboutMore.classList.toggle('visible');
      seeMoreBtn.textContent = aboutMore.classList.contains('visible') ? 'See Less' : 'See More';
  });

  // Contact form with EmailJS
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');
  contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      if (name && email && message) {
          emailjs.send('service_azm5qha', 'template_0rkiojh', {
              name: name,
              email: email,
              message: message
          })
          .then((response) => {
              formMessage.textContent = 'Message sent successfully!';
              formMessage.classList.add('show');
              contactForm.reset();
              setTimeout(() => formMessage.classList.remove('show'), 3000);
          }, (error) => {
              formMessage.textContent = 'Failed to send message. Please try again.';
              formMessage.classList.add('show');
              setTimeout(() => formMessage.classList.remove('show'), 3000);
              console.error('EmailJS error:', error);
          });
      } else {
          formMessage.textContent = 'Please fill in all fields!';
          formMessage.classList.add('show');
          setTimeout(() => formMessage.classList.remove('show'), 3000);
      }
  });

  // Dynamic copyright year
  document.getElementById('year').textContent = new Date().getFullYear();
});

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  .visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
  }
`, styleSheet.cssRules.length);