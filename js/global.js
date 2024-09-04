document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const isDarkModeEnabled = localStorage.getItem('darkMode') === 'true';
  
    if (isDarkModeEnabled) {
      document.body.classList.add('dark-mode');
    }
  
    darkModeToggle.addEventListener('change', function() {
      if (darkModeToggle.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
      }
    });
  });
  