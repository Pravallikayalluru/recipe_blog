document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".view-recipe");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const category = this.getAttribute("data-category");
            window.location.href = `recipes/${category}.html`;
        });
    });
});



  const cards = document.querySelectorAll('.recipe-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('clicked');
    });
  });


  
  const form = document.getElementById('contactForm');
  const message = document.getElementById('responseMessage');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    message.classList.remove('d-none');
    form.reset(); // clear form so user can send another message
  });


  // Search functionality has been moved to search.js
  // This prevents conflicts between multiple search implementations


