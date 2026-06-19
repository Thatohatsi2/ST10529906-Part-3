/* ============================================================
   THE NEW MAHLALELA NPO - Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {

    /* ============================================================
       1. MOBILE NAVIGATION TOGGLE (Hamburger Menu)
       ============================================================ */
    function initMobileNav() {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        if (!header || !nav) return;

        // Create hamburger button
        const hamburger = document.createElement('button');
        hamburger.className = 'nav-toggle';
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.innerHTML = '☰';
        
        // Insert hamburger into header
        header.appendChild(hamburger);

        // Toggle nav on click
        hamburger.addEventListener('click', function() {
            const isOpen = nav.classList.toggle('nav-open');
            hamburger.setAttribute('aria-expanded', isOpen);
            hamburger.innerHTML = isOpen ? '✕' : '☰';
            hamburger.style.transform = isOpen ? 'rotate(90deg)' : 'rotate(0deg)';
        });

        // Close nav when clicking a link
        nav.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                nav.classList.remove('nav-open');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.innerHTML = '☰';
                hamburger.style.transform = 'rotate(0deg)';
            });
        });
    }

    /* ============================================================
       2. BACK TO TOP BUTTON
       ============================================================ */
    function initBackToTop() {
        // Create button if it doesn't exist
        let backToTop = document.getElementById('backToTopBtn');
        if (!backToTop) {
            backToTop = document.createElement('button');
            backToTop.id = 'backToTopBtn';
            backToTop.innerHTML = '↑ Top';
            backToTop.setAttribute('aria-label', 'Back to top');
            document.body.appendChild(backToTop);
        }

        // Show/hide based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                backToTop.style.display = 'block';
                backToTop.style.opacity = '1';
            } else {
                backToTop.style.opacity = '0';
                setTimeout(function() {
                    if (window.scrollY <= 400) {
                        backToTop.style.display = 'none';
                    }
                }, 300);
            }
        });

        // Smooth scroll to top
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ============================================================
       3. FORM HANDLING WITH THANK YOU MESSAGE
       ============================================================ */
    function initForms() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(function(form) {
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                
                // Get form data
                const formData = new FormData(form);
                const inputs = form.querySelectorAll('input[type="text"], input[type="email"], textarea');
                let isValid = true;
                let firstInvalid = null;

                // Validate required fields
                inputs.forEach(function(input) {
                    if (input.hasAttribute('required') && !input.value.trim()) {
                        isValid = false;
                        input.style.borderColor = '#e74c3c';
                        input.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.2)';
                        if (!firstInvalid) firstInvalid = input;
                    } else {
                        input.style.borderColor = '';
                        input.style.boxShadow = '';
                    }
                });

                if (!isValid) {
                    if (firstInvalid) firstInvalid.focus();
                    return;
                }

                // Show thank you message
                showThankYou(form);
            });
        });
    }

    function showThankYou(form) {
        // Create thank you overlay
        const overlay = document.createElement('div');
        overlay.className = 'thank-you-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(13, 43, 30, 0.85);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.4s ease;
        `;

        const messageBox = document.createElement('div');
        messageBox.style.cssText = `
            background: linear-gradient(135deg, #ffffff 0%, #f4f8f5 100%);
            border-radius: 20px;
            padding: 2.5rem 2rem;
            max-width: 420px;
            width: 90%;
            text-align: center;
            box-shadow: 0 16px 48px rgba(27, 67, 50, 0.3);
            transform: translateY(30px) scale(0.95);
            transition: transform 0.5s ease;
            border: 2px solid #52b788;
        `;

        // Determine message based on page context
        const pageTitle = document.title.toLowerCase();
        let titleText = 'Thank You!';
        let bodyText = 'Your message has been sent successfully. We will get back to you soon.';
        let iconText = '✓';

        if (pageTitle.includes('contact')) {
            titleText = 'Message Sent!';
            bodyText = 'Thank you for reaching out to The New Mahlalela. We have received your message and will respond within 24-48 hours.';
        } else if (pageTitle.includes('support') || pageTitle.includes('pathway')) {
            titleText = 'Application Received!';
            bodyText = 'Thank you for joining our programme! We will contact you with workshop details and next steps.';
            iconText = '🎓';
        } else if (pageTitle.includes('involved') || pageTitle.includes('get')) {
            titleText = 'Welcome Aboard!';
            bodyText = 'Thank you for your interest in becoming a mentor! Our team will review your application and contact you for an orientation session.';
            iconText = '🤝';
        }

        messageBox.innerHTML = `
            <div style="
                width: 70px; height: 70px;
                background: linear-gradient(135deg, #2d6a4f 0%, #52b788 100%);
                border-radius: 50%;
                display: flex; align-items: center; justify-content: center;
                margin: 0 auto 1.2rem;
                font-size: 2rem;
                color: white;
                box-shadow: 0 4px 14px rgba(45, 106, 79, 0.3);
            ">${iconText}</div>
            <h2 style="
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                color: #1b4332;
                font-size: 1.6rem;
                margin-bottom: 0.8rem;
                letter-spacing: -0.3px;
            ">${titleText}</h2>
            <p style="
                color: #444444;
                font-size: 1rem;
                line-height: 1.7;
                margin-bottom: 1.5rem;
            ">${bodyText}</p>
            <button class="close-thank-you" style="
                background: linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%);
                color: white;
                border: none;
                padding: 0.8rem 2.2rem;
                border-radius: 12px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                letter-spacing: 0.5px;
                transition: all 0.3s ease;
                box-shadow: 0 4px 14px rgba(27, 67, 50, 0.25);
            ">Close</button>
        `;

        overlay.appendChild(messageBox);
        document.body.appendChild(overlay);

        // Animate in
        requestAnimationFrame(function() {
            overlay.style.opacity = '1';
            messageBox.style.transform = 'translateY(0) scale(1)';
        });

        // Close button handler
        const closeBtn = messageBox.querySelector('.close-thank-you');
        closeBtn.addEventListener('click', function() {
            overlay.style.opacity = '0';
            messageBox.style.transform = 'translateY(-20px) scale(0.95)';
            setTimeout(function() {
                overlay.remove();
            }, 400);
        });

        // Also close on overlay click
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeBtn.click();
            }
        });

        // Auto-close after 6 seconds
        setTimeout(function() {
            if (document.body.contains(overlay)) {
                closeBtn.click();
            }
        }, 6000);

        // Reset form
        form.reset();
    }

    /* ============================================================
       4. SMOOTH SCROLL FOR ANCHOR LINKS
       ============================================================ */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /* ============================================================
       5. ACTIVE NAV LINK HIGHLIGHTING
       ============================================================ */
    function initActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        document.querySelectorAll('nav a').forEach(function(link) {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
                link.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                link.style.color = '#f0d080';
            }
        });
    }

    /* ============================================================
       6. TABLE ROW INTERACTIONS
       ============================================================ */
    function initTableEffects() {
        document.querySelectorAll('table tr').forEach(function(row) {
            row.addEventListener('mouseenter', function() {
                this.style.cursor = 'default';
            });
        });
    }

    /* ============================================================
       7. IMAGE LAZY LOADING & ERROR HANDLING
       ============================================================ */
    function initImageHandling() {
        document.querySelectorAll('img').forEach(function(img) {
            // Add loading="lazy" for performance
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }

            // Handle broken images
            img.addEventListener('error', function() {
                this.style.display = 'none';
                const placeholder = document.createElement('div');
                placeholder.style.cssText = `
                    background: linear-gradient(135deg, #d8f3dc 0%, #f0faf3 100%);
                    border: 2px dashed #52b788;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 150px;
                    color: #2d6a4f;
                    font-style: italic;
                    font-size: 0.9rem;
                `;
                placeholder.textContent = '🖼️ Image: ' + (img.alt || 'Loading...');
                
                if (img.parentNode) {
                    img.parentNode.insertBefore(placeholder, img);
                }
            });
        });
    }

    /* ============================================================
       8. PRINT FRIENDLY FEATURES
       ============================================================ */
    function initPrintFeatures() {
        // Add print button to contact page
        if (document.title.toLowerCase().includes('contact')) {
            const main = document.querySelector('main');
            if (main) {
                const printBtn = document.createElement('button');
                printBtn.textContent = '🖨️ Print Contact Info';
                printBtn.style.cssText = `
                    background: linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%);
                    color: white;
                    border: none;
                    padding: 0.6rem 1.2rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                    font-size: 0.9rem;
                    margin-bottom: 1rem;
                    transition: all 0.3s ease;
                `;
                printBtn.addEventListener('click', function() {
                    window.print();
                });
                main.insertBefore(printBtn, main.firstChild);
            }
        }
    }

    /* ============================================================
       9. EXTERNAL LINK WARNINGS
       ============================================================ */
    function initExternalLinks() {
        document.querySelectorAll('a[href^="http"]').forEach(function(link) {
            if (!link.href.includes(window.location.hostname)) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
                
                // Add external link indicator
                const indicator = document.createElement('span');
                indicator.textContent = ' ↗';
                indicator.style.cssText = 'font-size: 0.75em; opacity: 0.6;';
                link.appendChild(indicator);
            }
        });
    }

    /* ============================================================
       10. SCROLL REVEAL ANIMATIONS
       ============================================================ */
    function initScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Apply to main content elements
        document.querySelectorAll('main > h2, main > h3, main > p, main > ul, main > table, main > form').forEach(function(el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    /* ============================================================
       11. KEYBOARD NAVIGATION ENHANCEMENTS
       ============================================================ */
    function initKeyboardNav() {
        // Skip to main content link for accessibility
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: #1b4332;
            color: white;
            padding: 8px 16px;
            z-index: 10000;
            transition: top 0.3s;
            text-decoration: none;
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        `;
        skipLink.addEventListener('focus', function() {
            this.style.top = '0';
        });
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add id to main if not present
        const main = document.querySelector('main');
        if (main && !main.id) {
            main.id = 'main-content';
        }
    }

    /* ============================================================
       12. FOOTER YEAR AUTO-UPDATE
       ============================================================ */
    function initFooterYear() {
        const year = new Date().getFullYear();
        document.querySelectorAll('footer p').forEach(function(p) {
            if (p.textContent.includes('©')) {
                p.innerHTML = p.innerHTML.replace(/©\s*\d{4}/, '© ' + year);
            }
        });
    }

    /* ============================================================
       INITIALIZE ALL FEATURES
       ============================================================ */
    initMobileNav();
    initBackToTop();
    initForms();
    initSmoothScroll();
    initActiveNav();
    initTableEffects();
    initImageHandling();
    initPrintFeatures();
    initExternalLinks();
    initScrollReveal();
    initKeyboardNav();
    initFooterYear();

    console.log('🌿 The New Mahlalela website loaded successfully!');
});
