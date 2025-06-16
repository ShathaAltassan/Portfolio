// Loading Screen Handler
document.addEventListener('DOMContentLoaded', () => {
    // Show loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    const particles = document.querySelectorAll('.particle');
    
    // Randomly reposition particles
    function repositionParticle(particle) {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 3;
        
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.animationDelay = `${delay}s`;
    }
    
    // Initialize particles
    particles.forEach(particle => {
        repositionParticle(particle);
        
        // Reposition particle when animation ends
        particle.addEventListener('animationend', () => {
            repositionParticle(particle);
        });
    });
    
    // Hide loading screen when everything is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            // Remove from DOM after animation
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 800);
        }, 2500); // Show loading screen for at least 2.5 seconds
    });
});

function sendMail(params){
    var tempParams = {
        from_name: document.getElementById("fromName").value,
        email_sender: document.getElementById("emailSender").value,
        subject_sender: document.getElementById("subjectSender").value,
        message_sender: document.getElementById("message").value,
    };
    emailjs.send('{{SERVICE ID}}','{{TEMPLATE ID}}',tempParams)
     .then(function(res){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Mail Sent Successfully!',
            showConfirmButton: false,
            timer: 1500,
          });
     });
}

$(document).ready(function () {
    $(window).scroll(function () {
        if (this.scrollY > 20) {
            $(".navbar").addClass("sticky");
        } else {
            $(".navbar").removeClass("sticky");
        }
    });
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

             
    // typing animation script
    var typed = new Typed(".typing",{
        strings: ["Full Stack Developer" ],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true,
        fadeOut: true,
        
    });
    var typed = new Typed(".typing-2",{
        strings: ["Shatha Altasan"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true,
    });
});

     // Scroll to top button script
      const btnScrollToTop = document.querySelector("#btnScrollToTop");

      btnScrollToTop.addEventListener("click", function(){
        window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    });

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check if user has a theme preference stored
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply the stored theme or default to dark
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        
        // Update footer logo on page load
        const footerLogo = document.querySelector('footer img[src="images/LOGO00.png"]');
        if (footerLogo) {
            footerLogo.src = "images/LOGO01.png";
        }
    }
    
    // Toggle theme when button is clicked
    themeToggleBtn.addEventListener('click', () => {
        // Check current theme
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Update the theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update the icon
        if (newTheme === 'light') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            
            // Update footer logo
            const footerLogo = document.querySelector('footer img[src="images/LOGO00.png"]');
            if (footerLogo) {
                footerLogo.src = "images/LOGO01.png";
            }
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            
            // Update footer logo
            const footerLogo = document.querySelector('footer img[src="images/LOGO01.png"]');
            if (footerLogo) {
                footerLogo.src = "images/LOGO00.png";
            }
        }
    });
});