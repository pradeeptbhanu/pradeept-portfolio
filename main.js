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

if (projectCards.length > 0) {
  filterProjects();
}

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.getAttribute('data-category');
    filterProjects();
  });
});

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
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
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
      } else if (formStatus) {
        formStatus.style.display = "block";
        formStatus.style.background = "rgba(255, 107, 107, 0.15)";
        formStatus.style.border = "1px solid rgba(255, 107, 107, 0.35)";
        formStatus.style.color = "#ff6b6b";
        formStatus.innerHTML = "⚠️ Error: " + (data.message || "Unable to send message.");
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

// Freelance positioning refinements
(function applyFreelancePositioning() {
  document.title = 'Pradeept Bhanu Sabat | Laravel & WordPress Developer';
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute('content', 'Pradeept Bhanu Sabat — Laravel & WordPress Developer with 10+ years of professional experience building, fixing, and maintaining production web applications and business websites.');

  document.querySelectorAll('.trust-number').forEach((el) => {
    if (el.textContent.trim() === '20+ Projects') el.textContent = '20+ Production Projects';
  });

  const aboutTitle = document.querySelector('#about .section-title');
  if (aboutTitle) aboutTitle.textContent = 'About Me';
  const aboutCopy = document.querySelector('#about > .container > .section-copy');
  if (aboutCopy) aboutCopy.textContent = 'I’m a senior web developer with 10+ years of experience building, fixing, and maintaining production websites and web applications. My core expertise is Laravel, PHP, WordPress, and MySQL, with a strong focus on practical business solutions and reliable backend systems.';
  const aboutPhoto = document.querySelector('#about .photo-card p');
  if (aboutPhoto) aboutPhoto.textContent = 'Building and supporting production web applications, e-commerce storefronts, custom Laravel systems, and multi-site WordPress platforms for clients across Australia, USA, and India.';
  const aboutKicker = document.querySelector('#about .about-content .kicker');
  if (aboutKicker) aboutKicker.textContent = 'Experience & Engineering';
  const aboutHeading = document.querySelector('#about .about-content h3');
  if (aboutHeading) aboutHeading.textContent = 'Experienced in building, fixing, and improving real-world web systems';
  const aboutLead = document.querySelector('#about .about-content > .section-copy');
  if (aboutLead) aboutLead.textContent = 'I’m comfortable working on both new projects and existing codebases—whether you need a feature built, a difficult bug diagnosed, a database optimized, or ongoing technical support.';

  const aboutPoints = document.querySelectorAll('#about .about-points li');
  const pointCopy = [
    ['Production Development', 'Hands-on experience delivering and supporting business websites, custom web applications, e-commerce systems, and internal platforms.'],
    ['Backend Architecture & Query Optimization', 'Strong experience with PHP, Laravel, MySQL schema design, indexing, API-driven systems, and performance troubleshooting.'],
    ['Existing Systems & Support', 'Comfortable taking over existing applications, understanding unfamiliar codebases, fixing production issues, and delivering new features safely.']
  ];
  aboutPoints.forEach((li, i) => {
    if (!pointCopy[i]) return;
    const strong = li.querySelector('strong');
    if (strong) strong.textContent = pointCopy[i][0];
    if (strong && strong.nextSibling) strong.nextSibling.textContent = pointCopy[i][1];
  });

  const trustKicker = document.querySelector('#trust-experience .kicker');
  if (trustKicker) trustKicker.textContent = 'Professional Experience';
  const trustCopy = document.querySelector('#trust-experience .section-copy');
  if (trustCopy) trustCopy.textContent = 'Backed by 10+ years of hands-on delivery across technology agencies, business platforms, websites, and production systems.';

  const servicesGrid = document.querySelector('#services .services-grid');
  if (servicesGrid && !document.querySelector('#additional-freelance-services')) {
    const additionalGrid = document.createElement('div');
    additionalGrid.id = 'additional-freelance-services';
    additionalGrid.className = 'services-grid';
    additionalGrid.style.marginTop = '1.5rem';
    additionalGrid.innerHTML = `
      <article class="panel service-card reveal visible">
        <div class="service-header"><div class="service-icon" aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 9l-3 3 3 3"></path><path d="M16 9l3 3-3 3"></path><path d="M14 5l-4 14"></path></svg></div><h3>API & Third-Party Integrations</h3></div>
        <p class="service-desc">Connect your website or application with external services and build reliable data flows between systems.</p>
        <div class="service-typical"><div class="service-typical-label"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>Typical Work</div><ul class="service-work-tags"><li>REST API integrations</li><li>Payment & external services</li><li>Webhooks & callbacks</li><li>Data synchronization</li><li>Custom API endpoints</li><li>Third-party platform integration</li></ul></div>
      </article>
      <article class="panel service-card reveal visible">
        <div class="service-header"><div class="service-icon" aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h18"></path><path d="M6 3h12l2 4H4l2-4z"></path><path d="M5 7l1 13h12l1-13"></path><path d="M9 11h6"></path></svg></div><h3>E-Commerce Development</h3></div>
        <p class="service-desc">Build and improve online stores with WooCommerce or Shopify, from custom features to storefront refinements.</p>
        <div class="service-typical"><div class="service-typical-label"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>Typical Work</div><ul class="service-work-tags"><li>WooCommerce customization</li><li>Shopify & Liquid</li><li>Product & collection templates</li><li>Custom checkout features</li><li>Third-party apps & integrations</li><li>Store performance improvements</li></ul></div>
      </article>`;
    servicesGrid.parentNode.insertBefore(additionalGrid, servicesGrid.nextElementSibling);
  }

  const contactTitle = document.querySelector('#contact .section-title');
  if (contactTitle) contactTitle.textContent = 'Have a website or application that needs help?';
  const contactCopy = document.querySelector('#contact .section-copy');
  if (contactCopy) contactCopy.textContent = 'Whether you’re starting something new, fixing an existing system, or looking for ongoing technical support, tell me what you need.';

  const projectSelect = document.querySelector('#contact select[name="project_type"]');
  if (projectSelect && !Array.from(projectSelect.options).some(o => o.value === 'API & Third-Party Integrations')) {
    const option = document.createElement('option');
    option.value = 'API & Third-Party Integrations';
    option.textContent = 'API & Third-Party Integrations';
    const other = projectSelect.querySelector('option[value="Other Custom Web Application"]');
    projectSelect.insertBefore(option, other || null);
  }
})();
