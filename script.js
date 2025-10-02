document.addEventListener('DOMContentLoaded', () => {

    // --- MOBILE MENU TOGGLE ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu-button') ? document.getElementById('mobile-menu') : null;

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- SMOOTH SCROLLING ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetEl = document.querySelector(this.getAttribute('href'));
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
            // Close mobile menu after click
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // --- SCROLL REVEAL ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // --- COUNTER ANIMATION ---
    const counters = document.querySelectorAll('[data-target]');
    const counterSpeed = 200; // lower = slower

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace('%','');
        const increment = target / counterSpeed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment) + (counter.innerText.includes('%') ? '%' : '');
            setTimeout(() => animateCounter(counter), 10);
        } else {
            counter.innerText = target + (counter.innerText.includes('%') ? '%' : '');
        }
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => animateCounter(counter));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const impactSection = document.getElementById('impact');
i18next.init({
  lng: navigator.language, // inagundua lugha ya browser
  resources: {
    en: { translation: { "welcome": "Welcome" } },
    sw: { translation: { "welcome": "Karibu" } },
    fr: { translation: { "welcome": "Bienvenue" } },
    es: { translation: { "welcome": "Bienvenido" } },
    ar: { translation: { "welcome": "مرحبا" } },
    zh: { translation: { "welcome": "欢迎" } }, // Chinese (Simplified)
    hi: { translation: { "welcome": "स्वागत है" } }, // Hindi
    pt: { translation: { "welcome": "Bem-vindo" } },
    de: { translation: { "welcome": "Willkommen" } }
  }
}, function(err, t) {
  document.getElementById("welcomeText").innerHTML = i18next.t('welcome');
});
if (impactSection) counterObserver.observe(impactSection);

    // --- APPLICATION FORM SUBMISSION ---
    const form = document.getElementById('application-form');
    const successMessage = document.getElementById('form-success-message');

    if (form && successMessage) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.style.display = 'none';
            successMessage.classList.remove('hidden');
        });
    }

    // --- DYNAMIC YEAR IN FOOTER ---
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

    // --- MARQUEE LOOP (DOUBLE CONTENT) ---
    const marquee = document.querySelector('.marquee-content');
    if (marquee) {
        marquee.innerHTML += marquee.innerHTML; // duplicate for smooth loop
    }
});
// --- Initialize i18next ---
i18next.init({
    lng: 'en',
    resources: {
        en: {
            translation: {
                menu_about: "About Us",
                menu_solution: "Our Solution",
                menu_impact: "Impact",
                menu_apply: "Apply Now",
                hero_title: "Sowing Innovation, Reaping Prosperity",
                hero_intro: "Empowering Tanzania's smallholder farmers through accessible technology, tailored financing, and expert knowledge.",
                apply_button: "Request Funding or Equipment",
                form_fullName: "Full Name",
                form_fullName_placeholder: "Enter your full name",
                form_phone: "Phone Number",
                form_phone_placeholder: "Enter your phone number",
                form_location: "Your Region/Location",
                form_farmSize: "Farm Size (in Acres)",
                form_service: "Service Required",
                form_message: "Brief Message (Optional)",
                form_submit: "Submit Application",
                success_msg: "Thank you! Your application has been submitted successfully. We will contact you shortly.",
                footer_connect: "Connect With Us",
                footer_quickLinks: "Quick Links"
            }
        },
        sw: {
            translation: {
                menu_about: "Kuhusu Sisi",
                menu_solution: "Suluhisho Yetu",
                menu_impact: "Athari",
                menu_apply: "Omba Sasa",
                hero_title: "Kupanda Ubunifu, Kuvuna Ufanisi",
                hero_intro: "Tunawezesha wakulima wadogo wa Tanzania kupitia teknolojia rahisi na ufadhili unaofaa.",
                apply_button: "Omba Fedha au Vifaa",
                form_fullName: "Jina Kamili",
                form_fullName_placeholder: "Weka jina lako kamili",
                form_phone: "Nambari ya Simu",
                form_phone_placeholder: "Weka nambari yako ya simu",
                form_location: "Eneo Lako",
                form_farmSize: "Ukubwa wa Shamba (Akares)",
                form_service: "Huduma Inayohitajika",
                form_message: "Ujumbe Mfupi (Hiari)",
                form_submit: "Tuma Maombi",
                success_msg: "Asante! Ombi lako limewasilishwa. Tutawasiliana nawe hivi karibuni.",
                footer_connect: "Ungana Nasi",
                footer_quickLinks: "Viungo vya Haraka"
            }
        },
        fr: { translation: { /* French translations */ } },
        es: { translation: { /* Spanish translations */ } },
        ar: { translation: { /* Arabic translations */ } }
    }
}, function(err, t) {
    updateContent();
});

// --- Update content function ---
function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.innerHTML = i18next.t(key);
        if(el.placeholder !== undefined){
            el.placeholder = i18next.t(key);
        }
    });
}

// --- Language switcher buttons ---
document.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        i18next.changeLanguage(lang, updateContent);
    });
});
