const nameText = document.getElementById("name-text");
const typingText = document.getElementById("typing-text");

const roles = [
    "Web Developer",
    "Python Developer",
    "Frontend Developer",
    "Programmer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;



function typeRole() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex++);
    } else {
        typingText.textContent = currentRole.substring(0, charIndex--);
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex > currentRole.length) {
        isDeleting = true;
        speed = 1500;
    }

    if (isDeleting && charIndex < 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 300;
    }

    setTimeout(typeRole, speed);
}

typeRole();

// Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach((el) => {
    observer.observe(el);
});

// Mobile Menu Toggle
const menuIcon = document.getElementById('menu-icon');
const navItems = document.querySelector('.navItems');

menuIcon.addEventListener('click', () => {
    navItems.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.navItems li a').forEach(link => {
    link.addEventListener('click', () => {
        navItems.classList.remove('active');
    });
});

// Scroll Spy
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current) && current !== '') {
            link.classList.add('active');
        }
    });
});

// Contact Form Async Submit
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert("Message sent successfully!");
                formStatus.style.display = 'block';
                formStatus.style.color = 'var(--primary)';
                formStatus.textContent = "Thanks for your message! I'll get back to you soon.";
                contactForm.reset();

                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            } else {
                formStatus.style.display = 'block';
                formStatus.style.color = 'red';
                formStatus.textContent = "Oops! There was a problem submitting your form.";
            }
        } catch (error) {
            formStatus.style.display = 'block';
            formStatus.style.color = 'red';
            formStatus.textContent = "Oops! There was a problem submitting your form.";
        }
    });
}