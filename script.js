// Contact form placeholder handler (if added in the future)
document.querySelectorAll('form').forEach(form => {
  form.onsubmit = function(e) {
    e.preventDefault();
    alert('Message sent! Thank you for reaching out.');
    form.reset();
  };
});
