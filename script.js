// Typing Animation
const typingText = document.querySelector(".typing");
const careers = ["Web Developer", "Designer", "Freelancer", "Professional"];
let careerIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Add this to your existing script.js
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}
function type() {
    const currentCareer = careers[careerIndex];
    
    if (isDeleting) {
        typingText.textContent = currentCareer.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentCareer.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentCareer.length) {
        isDeleting = true;
        setTimeout(type, 1500); // Wait before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        careerIndex = (careerIndex + 1) % careers.length;
        setTimeout(type, 500); // Wait before typing next career
    } else {
        const typingSpeed = isDeleting ? 80 : 150;
        setTimeout(type, typingSpeed);
    }
}

// Start typing animation when page loads
window.onload = () => {
    type();
    
    // Highlight active nav item when scrolling
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");
    
    window.addEventListener("scroll", () => {
        let current = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove("current");
            if (link.getAttribute("href").substring(1) === current) {
                link.classList.add("current");
            }
        });
    });
};

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact form submission handling
const contactForm = document.querySelector("#contact form");
if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        // Here you would typically send the form data to a server
        // For now, we'll just show an alert
        alert("Thanks for your message! This is a demo, so no message was actually sent.");
        this.reset();
    });
}
