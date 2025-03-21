document.addEventListener('DOMContentLoaded', function() {
   
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        
        setTimeout(() => {
            heroContent.classList.add('animated');
        }, 100);
    }

    function animateCounters() {
        const counters = document.querySelectorAll('.counter-number');
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const steps = 50; 
            const stepTime = duration / steps;
            const increment = target / steps;
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if(current > target) current = target;
                
                counter.textContent = Math.round(current);
                
                if(current < target) {
                    setTimeout(updateCounter, stepTime);
                }
            };
            
            updateCounter();
        });
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-counter');
    if(statsSection) {
        counterObserver.observe(statsSection);
    }

    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelector('.about-text').classList.add('animate');
                entry.target.querySelector('.about-description').classList.add('animate');
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const aboutSection = document.querySelector('.about-us');
    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }

    const createScrollAnimation = (elements, threshold = 0.1) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: threshold });

        elements.forEach(el => observer.observe(el));
    };

    const serviceCards = document.querySelectorAll('.service-card');
    createScrollAnimation(serviceCards);

    const servicesHeader = document.querySelector('.services-header');
    createScrollAnimation([servicesHeader]);

    const serviceItems = document.querySelectorAll('.service-item');
    createScrollAnimation(serviceItems);
});