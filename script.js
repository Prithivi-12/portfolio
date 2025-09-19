// Contact form placeholder handler (if added in the future)
document.querySelectorAll('form').forEach(form => {
  form.onsubmit = function(e) {
    e.preventDefault();
    alert('Message sent! Thank you for reaching out.');
    form.reset();
  };
});

// Smooth scroll effect
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});
