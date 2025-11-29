/* ------------------------------
   MOBILE MENU
------------------------------ */
const menuOpen = document.getElementById("menu-open");   // ☰ hamburger
const menuClose = document.getElementById("menu-close"); // × close button
const mobileMenu = document.getElementById("mobile-menu");

if (menuOpen && menuClose && mobileMenu) {

  // Open menu
  menuOpen.addEventListener("click", () => {
    mobileMenu.classList.add("open");
    menuOpen.style.display = "none"; // hide hamburger
  });

  // Close with ×
  menuClose.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuOpen.style.display = "block";
  });

  // Close when clicking outside menu
  document.addEventListener("click", (e) => {
    const insideMenu = mobileMenu.contains(e.target);
    const isHamburger = menuOpen.contains(e.target);

    if (!insideMenu && !isHamburger) {
      mobileMenu.classList.remove("open");
      menuOpen.style.display = "block";
    }
  });
}

/* Fix glitch when resizing between mobile ↔ desktop */
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    mobileMenu.classList.remove("open");
    menuOpen.style.display = "none";  // desktop hides burger
  } else {
    // back to mobile
    menuOpen.style.display = "block";
  }
});


/* ------------------------------
   SLIDESHOW
------------------------------ */
let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";

  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;

  for (let i = 0; i < dots.length; i++)
    dots[i].className = dots[i].className.replace(" active", "");

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";

  setTimeout(showSlides, 4000);
}

function plusSlides(n) { slideIndex += n - 1; showSlides(); }
function currentSlide(n) { slideIndex = n - 1; showSlides(); }


/* ------------------------------
   STAFF POPUP
------------------------------ */
const staffCards = document.querySelectorAll(".staff-member");

const popup = document.getElementById("staff-popup");
const popupImg = document.getElementById("popup-img");
const popupName = document.getElementById("popup-name");
const popupRole = document.getElementById("popup-role");
const popupClose = document.getElementById("staff-popup-close");

// Open popup
staffCards.forEach(card => {
  card.addEventListener("click", () => {
    popupImg.src = card.querySelector("img").src;
    popupName.textContent = card.querySelector("h3").textContent;
    popupRole.textContent = card.querySelector("p").textContent;

    popup.style.display = "flex";
  });
});

// Close popup (X)
popupClose.addEventListener("click", () => {
  popup.style.display = "none";
});

// Close when clicking background
popup.addEventListener("click", (e) => {
  if (e.target === popup) popup.style.display = "none";
});


/* ==========================
   STAFF POPUP FUNCTIONALITY
=========================== */

const staffPopup = document.getElementById("staff-popup");
const popupCard = document.querySelector(".staff-popup-card");
const staffPopupClose = document.getElementById("staff-popup-close");

// Close when clicking X
staffPopupClose.addEventListener("click", () => {
    staffPopup.style.display = "none";
});

// Close when clicking outside popup card
staffPopup.addEventListener("click", (e) => {
    if (!popupCard.contains(e.target)) {
        staffPopup.style.display = "none";
    }
});

// OPEN POPUP FOR EACH STAFF MEMBER
document.querySelectorAll(".staff-member").forEach((member) => {
    member.addEventListener("click", () => {
        const img = member.querySelector("img").src;
        const name = member.querySelector("h3").textContent;
        const role = member.querySelector("p").textContent;

        // Fill popup info
        document.getElementById("popup-img").src = img;
        document.getElementById("popup-name").textContent = name;
        document.getElementById("popup-role").textContent = role;

        // Show popup
        staffPopup.style.display = "flex";
    });
});


document.querySelectorAll('.staff-member').forEach(member => {
    member.addEventListener('click', () => {
        const name = member.getAttribute('data-name');
        const role = member.getAttribute('data-role');
        const img  = member.getAttribute('data-img');

        document.getElementById('popup-name').textContent = name;
        document.getElementById('popup-role').textContent = role;
        document.getElementById('popup-img').src = img;

        document.getElementById('staff-popup').style.display = 'flex';
    });
});

// Close popup
document.getElementById('staff-popup-close').addEventListener('click', () => {
    document.getElementById('staff-popup').style.display = 'none';
});

// Close when clicking outside the card
document.getElementById('staff-popup').addEventListener('click', (e) => {
    if(e.target === document.getElementById('staff-popup')){
        document.getElementById('staff-popup').style.display = 'none';
    }
});




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

    document.getElementById('logout-portal')
      .addEventListener('click', () => location.reload());

    document.getElementById('pay-demo')
      .addEventListener('click', () => alert('Demo payment flow'));
  }
}
