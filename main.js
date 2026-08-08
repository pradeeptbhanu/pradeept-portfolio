// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  if (i < 2) return;
  observer.observe(el);
});

// Project Filtering & Live Search Logic
const searchInput = document.getElementById('projectSearch');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const projectCounter = document.getElementById('projectCounter');

let currentCategory = 'featured';
let currentSearchTerm = '';

function filterProjects() {
  let visibleCount = 0;

  projectCards.forEach((card) => {
    const categories = card.getAttribute('data-category') || '';
    const cardText = card.textContent.toLowerCase();

    const matchesCategory = (currentCategory === 'all') || categories.includes(currentCategory);
    const matchesSearch = cardText.includes(currentSearchTerm);

    if (matchesCategory && matchesSearch) {
      card.classList.remove('hidden');
      visibleCount++;
    } else {
      card.classList.add('hidden');
    }
  });

  if (projectCounter) {
    projectCounter.textContent = `Showing ${visibleCount} of ${projectCards.length} projects`;
  }
}

// Initial filter execution
if (projectCards.length > 0) {
  filterProjects();
}

// Category Filter Button Clicks
filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.getAttribute('data-category');
    filterProjects();
  });
});

// Real-Time Search Input
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    currentSearchTerm = e.target.value.toLowerCase().trim();
    filterProjects();
  });
}

// Web3Forms Form Submission Handler
const form = document.getElementById('form');
if (form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const formStatus = document.getElementById('form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const originalText = submitBtn.innerHTML;

    submitBtn.textContent = "Sending Inquiry...";
    submitBtn.disabled = true;
    if (formStatus) formStatus.style.display = "none";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (formStatus) {
          formStatus.style.display = "block";
          formStatus.style.background = "rgba(102, 210, 143, 0.15)";
          formStatus.style.border = "1px solid rgba(102, 210, 143, 0.35)";
          formStatus.style.color = "#66d28f";
          formStatus.innerHTML = "✓ Thank you! Your project inquiry has been sent successfully. I will get back to you shortly.";
        }
        form.reset();
      } else {
        if (formStatus) {
          formStatus.style.display = "block";
          formStatus.style.background = "rgba(255, 107, 107, 0.15)";
          formStatus.style.border = "1px solid rgba(255, 107, 107, 0.35)";
          formStatus.style.color = "#ff6b6b";
          formStatus.innerHTML = "⚠️ Error: " + (data.message || "Unable to send message.");
        }
      }

    } catch (error) {
      if (formStatus) {
        formStatus.style.display = "block";
        formStatus.style.background = "rgba(255, 107, 107, 0.15)";
        formStatus.style.border = "1px solid rgba(255, 107, 107, 0.35)";
        formStatus.style.color = "#ff6b6b";
        formStatus.innerHTML = "⚠️ Something went wrong. Please check your network connection and try again.";
      }
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}
