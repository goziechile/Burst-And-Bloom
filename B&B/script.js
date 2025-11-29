/* -------------------------------------------------------------
    CLEANED & CONSOLIDATED JAVASCRIPT
------------------------------------------------------------- */

/* ------------------------------
    MOBILE MENU
------------------------------ */
const menuOpen = document.getElementById("menu-open");     // ☰ hamburger
const menuClose = document.getElementById("menu-close");  // × close button
const mobileMenu = document.getElementById("mobile-menu");

if (menuOpen && menuClose && mobileMenu) {
    // Function to show the menu
    const openMenu = () => {
        mobileMenu.classList.add("open");
        menuOpen.style.display = "none"; // Hide hamburger when menu is open
    };

    // Function to hide the menu
    const closeMenu = () => {
        mobileMenu.classList.remove("open");
        // Only show hamburger if we are still on mobile view (CSS handles desktop visibility)
        if (window.innerWidth <= 900) {
          menuOpen.style.display = "block"; 
        }
    };

    // Open menu on hamburger click
    menuOpen.addEventListener("click", openMenu);

    // Close menu on close button (×) click
    menuClose.addEventListener("click", closeMenu);

    // Close when clicking outside menu
    document.addEventListener("click", (e) => {
        const insideMenu = mobileMenu.contains(e.target);
        const isHamburger = menuOpen.contains(e.target);

        // Only close if click is outside both the menu and the hamburger button
        if (!insideMenu && !isHamburger && mobileMenu.classList.contains("open")) {
            closeMenu();
        }
    });

    /* FIX: Adjust visibility on resize (especially for state cleanup) */
    window.addEventListener("resize", () => {
        // If wider than 900px (Desktop view)
        if (window.innerWidth > 900) {
            mobileMenu.classList.remove("open");
            // Ensure JS hasn't force-set the display property on the hamburger
            menuOpen.style.display = ''; 
        } 
        // NOTE: The CSS media query now correctly handles showing/hiding the menus
        // based on width, removing the need for most JS style manipulation here.
    });
}
// ... the rest of your script.js code remains unchanged ...

/* ------------------------------
    SLIDESHOW
    (Simplified logic for your global functions)
------------------------------ */
let slideIndex = 1; // Start at 1 for consistency with slide number
showSlides(slideIndex);

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Check if elements exist before trying to access them
    if (slides.length > 0 && dots.length > 0) {
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }
}

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Auto slideshow functionality (uses your original method)
function autoShowSlides() {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (slides.length === 0) return; // Stop if no slides exist

    for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";

    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;

    for (let i = 0; i < dots.length; i++)
        dots[i].className = dots[i].className.replace(" active", "");

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    setTimeout(autoShowSlides, 4000);
}

// Start auto slideshow only if the elements exist
if (document.getElementsByClassName("mySlides").length > 0) {
    autoShowSlides();
}


/* ------------------------------
    STAFF POPUP
------------------------------ */

// 1. Get the main elements
const staffPopup = document.getElementById("staff-popup");
const staffPopupClose = document.getElementById("staff-popup-close");
const staffCards = document.querySelectorAll(".staff-member");

// 2. OPEN POPUP: Use the efficient data-attribute method
staffCards.forEach(member => {
    member.addEventListener('click', () => {
        // Retrieve data from HTML data-attributes (from your HTML fix)
        const name = member.getAttribute('data-name');
        const role = member.getAttribute('data-role');
        const img  = member.getAttribute('data-img');

        // Populate the popup with staff data
        // Use consistent variable names (staffPopup, staffPopupClose) for clarity
        document.getElementById('popup-name').textContent = name;
        document.getElementById('popup-role').textContent = role;
        document.getElementById('popup-img').src = img;

        // Display the popup
        if (staffPopup) staffPopup.style.display = 'flex';
    });
});

// 3. CLOSE POPUP (X button)
if (staffPopupClose && staffPopup) {
    staffPopupClose.addEventListener("click", () => {
        staffPopup.style.display = "none";
    });
}

// 4. CLOSE POPUP (Clicking background)
if (staffPopup) {
    staffPopup.addEventListener("click", (e) => {
        // Only close if the click target is the modal backdrop, not the card itself
        if (e.target === staffPopup) { 
            staffPopup.style.display = "none";
        }
    });
}


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

        const portalWrapper = document.querySelector('.portal-wrapper');
        if (portalWrapper) portalWrapper.appendChild(dash);

        const logoutButton = document.getElementById('logout-portal');
        if (logoutButton) logoutButton.addEventListener('click', () => location.reload());

        const payDemoButton = document.getElementById('pay-demo');
        if (payDemoButton) payDemoButton.addEventListener('click', () => alert('Demo payment flow'));
    }
}