 // Hamburger toggle
    const mobileMenu = document.getElementById("mobile-menu");
    const openMenuBtn = document.getElementById("menu-open");
    const closeMenuBtn = document.getElementById("menu-close");

    openMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.add("open");
      openMenuBtn.classList.add('hidden'); // i think to hide the hamburger menu
    });

    closeMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      openMenuBtn.classList.add('hidden'); //show hamburger agan ig
    });

    // Slideshow
    let slideIndex = 0;
    showSlides();
    function showSlides() {
      let slides = document.getElementsByClassName("mySlides");
      let dots = document.getElementsByClassName("dot");
      for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
      slideIndex++;
      if (slideIndex > slides.length) slideIndex = 1;
      for (let i = 0; i < dots.length; i++) dots[i].className = dots[i].className.replace(" active", "");
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
      setTimeout(showSlides, 4000);
    }
    function plusSlides(n){ slideIndex += n - 1; showSlides(); }
    function currentSlide(n){ slideIndex = n - 1; showSlides(); }



    document.addEventListener('click', (e) => {
       const clickedInsideMenu =mobileMenu.contains(e.target);
       const clickedHamburger = hamburger.contains(e.target);

       //Don't close if user taps inside the Menu I think OR taps hamburger
       if (!clickedInsideMenu && !clickedHamburger) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('hidden');
       }
    })

    

    /* ------------------------------
   PARENTS PORTAL LOGIN DEMO
------------------------------ */
const portalLoginForm = document.getElementById('portal-login-form');

if (portalLoginForm) {
  portalLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email =
      portalLoginForm.querySelector('input[type="email"]').value.trim();
    const pass =
      portalLoginForm.querySelector('input[type="password"]').value.trim();

    // demo credentials
    if (email.toLowerCase() === 'parent@example.com' && pass === 'demo123') {
      showParentDashboard({
        name: 'Amaka Johnson',
        child: 'Tomi - Age 4'
      });
    } else {
      alert('Login failed (demo). Use: parent@example.com / demo123');
    }
  });
}

function showParentDashboard(profile) {
  const loginCard = document.querySelector('.portal-card.login-card');
  if (loginCard) loginCard.style.display = 'none';

  let dash = document.querySelector('.portal-card.dashboard-card');

  if (!dash) {
    dash = document.createElement('div');
    dash.className = 'portal-card dashboard-card';

    dash.innerHTML = `
      <div class="card">
        <h3>Welcome, ${profile.name}</h3>
        <p class="small">Child: <strong>${profile.child}</strong></p>
      </div>

      <div class="dashboard" style="margin-top:1rem;">
        <div>
          <div class="card">
            <h4>Latest Announcements</h4>
            <ul class="announcements">
              <li>Sports Day: Dec 10 — bring comfortable shoes.</li>
              <li>Holiday Break: Dec 22 - Jan 5.</li>
              <li>Parent-Teacher meeting: Nov 28.</li>
            </ul>
          </div>

          <div class="card" style="margin-top:0.8rem;">
            <h4>Attendance</h4>
            <p class="small">Last week: 4 days present / 5 possible</p>
          </div>

          <div class="card" style="margin-top:0.8rem;">
            <h4>Messages</h4>
            <p class="small"><strong>Ms. Ada:</strong> Tomi enjoyed painting today!</p>
          </div>
        </div>

        <div>
          <div class="card">
            <h4>Payments</h4>
            <p class="small">Next due: Jan 1 — Term fee (₦45,000)</p>
            <button id="pay-demo" class="btn" style="margin-top:0.6rem;">Make Demo Payment</button>
          </div>

          <div class="card" style="margin-top:0.8rem;">
            <h4>Download</h4>
            <a class="small" href="#" onclick="alert('Download demo report'); return false;">Download Report Card (PDF)</a>
          </div>
        </div>
      </div>

      <div style="text-align:right; margin-top:0.6rem;">
        <button id="logout-portal" class="btn" style="background:#888">Logout</button>
      </div>
    `;

    document.querySelector('.portal-wrapper').appendChild(dash);

    document.getElementById('logout-portal').addEventListener('click', () => location.reload());
    document.getElementById('pay-demo').addEventListener('click', () => alert('Demo payment flow'));
  }
}