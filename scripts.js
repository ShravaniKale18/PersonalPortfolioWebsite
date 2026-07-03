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