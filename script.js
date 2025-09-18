const heroBackgroundWrapper = document.getElementById('hero-background-wrapper');
        const gradientLayers = [
            document.getElementById('gradient-layer-1'),
            document.getElementById('gradient-layer-2'),
            document.getElementById('gradient-layer-3'),
            document.getElementById('gradient-layer-4'),
        ];
        const blobSvgPath = document.querySelector('#blob-svg path');
        const heroTitle = document.getElementById('hero-title');
        const heroP = document.getElementById('hero-p');
        const ctaButton1 = document.getElementById('cta-button-1');
        const ctaButton2 = document.getElementById('cta-button-2');
        const aboutSection = document.getElementById('about-us-section');
        const counters = document.querySelectorAll('.counter-number');
        const counterSection = document.getElementById('counter-section');
        
        // Navigation bar elements
        const navbar = document.getElementById('navbar');
        const desktopLinks = document.querySelectorAll('#navbar .hidden.md\\:flex a');
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');


        const states = [
            // Making this the first state for perfect initial sync
            {
                blobColor: '#FF6F61',
                titleHTML: 'OSM Transport<br> Road <br><span id="hero-span" class="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-200 transition-all duration-1000">Logistics</span>',
                pText: 'Delivering your goods with speed, security, and global reach. We\'re committed to optimizing logistics and streamlining supply chains.',
                btn1Classes: 'bg-red-600 hover:bg-red-700 transition-colors duration-1000',
                btn2Classes: 'text-red-400 border-red-400 rounded-lg hover:bg-red-900 transition-colors duration-1000',
            },
            {
                blobColor: '#f7d300',
                titleHTML: 'OSM Transport<br> Milk <br><span id="hero-span" class="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-100">Operations</span>',
                pText: 'Streamlining your supply chain with efficient, circular routes. We collect multiple loads in a single trip to reduce costs and environmental impact.',
                btn1Classes: 'bg-orange-600 hover:bg-orange-700 transition-colors duration-1000',
                btn2Classes: 'text-yellow-300 border-yellow-300 hover:bg-orange-900 transition-colors duration-1000',
            },
            {
                blobColor: '#B3E5FC',
                titleHTML: 'OSM Transport<br> Packing & <br><span id="hero-span" class="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">Moving</span>',
                pText: 'Our expert teams handle every detail of your move, from packing to secure transport, ensuring your belongings arrive safely and on time.',
                btn1Classes: 'bg-blue-600 hover:bg-blue-700 transition-colors duration-1000',
                btn2Classes: 'text-blue-300 border-blue-300 hover:bg-blue-900 transition-colors duration-1000',
            },
            {
                blobColor: '#E0B0FF',
                titleHTML: 'OSM Transport<br> Inplant <br><span id="hero-span" class="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-purple-100">Equipment</span>',
                pText: 'We specialize in the safe and precise relocation of industrial equipment within your facility, minimizing downtime and maximizing efficiency.',
                btn1Classes: 'bg-purple-600 hover:bg-purple-700 transition-colors duration-1000',
                btn2Classes: 'text-purple-400 border-purple-400 hover:bg-purple-900 transition-colors duration-1000',
            },
        ];

        let currentState = 0;

        function updateContent() {
            const state = states[currentState];

            // Update text content
            heroTitle.innerHTML = state.titleHTML;
            heroP.textContent = state.pText;
            
            // Toggle opacity to crossfade the gradients
            gradientLayers.forEach((layer, index) => {
                layer.style.opacity = index === currentState ? '1' : '0';
            });

            // Change blob color
            blobSvgPath.setAttribute('fill', state.blobColor);

            // Update button styles
            const allButtonClasses = ['bg-red-600', 'hover:bg-red-700', 'bg-orange-600', 'hover:bg-orange-700', 'text-red-400', 'border-red-400', 'hover:bg-red-900', 'text-yellow-300', 'border-yellow-300', 'hover:bg-orange-900', 'bg-blue-600', 'hover:bg-blue-700', 'text-blue-300', 'border-blue-300', 'hover:bg-blue-900', 'bg-purple-600', 'hover:bg-purple-700', 'text-purple-400', 'border-purple-400', 'hover:bg-purple-900'];
            ctaButton1.classList.remove(...allButtonClasses);
            ctaButton2.classList.remove(...allButtonClasses);

            ctaButton1.classList.add(...state.btn1Classes.split(' '));
            ctaButton2.classList.add(...state.btn2Classes.split(' '));

            currentState = (currentState + 1) % states.length;
        }

        function hexToRgb(hex) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return {r, g, b};
        }

        function lerp(start, end, t) {
            return start * (1 - t) + end * t;
        }

        // About section background color and text color transition
        const aboutSectionStartBg1 = hexToRgb('#1f012b'); // Violet gradient start
        const aboutSectionStartBg2 = hexToRgb('#43036e'); // Violet gradient end
        const aboutSectionEndBg1 = hexToRgb('#6b0000');
        const aboutSectionEndBg2 = hexToRgb('#2e0033');


        const textColorStart = hexToRgb('#FFFFFF'); // White
        const textColorEnd = hexToRgb('#FFFFFF'); // White


        window.addEventListener('scroll', () => {
            const aboutRect = aboutSection.getBoundingClientRect();
            let aboutScrollProgress = (window.innerHeight - aboutRect.top) / (window.innerHeight);
            aboutScrollProgress = Math.min(Math.max(aboutScrollProgress, 0), 1);

            // About section Background transition
            const aboutR1 = lerp(aboutSectionStartBg1.r, aboutSectionEndBg1.r, aboutScrollProgress);
            const aboutG1 = lerp(aboutSectionStartBg1.g, aboutSectionEndBg1.g, aboutScrollProgress);
            const aboutB1 = lerp(aboutSectionStartBg1.b, aboutSectionEndBg1.b, aboutScrollProgress);

            const aboutR2 = lerp(aboutSectionStartBg2.r, aboutSectionEndBg2.r, aboutScrollProgress);
            const aboutG2 = lerp(aboutSectionStartBg2.g, aboutSectionEndBg2.g, aboutScrollProgress);
            const aboutB2 = lerp(aboutSectionStartBg2.b, aboutSectionEndBg2.b, aboutScrollProgress);

            aboutSection.style.background = `linear-gradient(135deg, rgb(${aboutR1}, ${aboutG1}, ${aboutB1}), rgb(${aboutR2}, ${aboutG2}, ${aboutB2}))`;
            
            // Text color transition for p tags
            const rText = lerp(textColorStart.r, textColorEnd.r, aboutScrollProgress);
            const gText = lerp(textColorStart.g, textColorEnd.g, aboutScrollProgress);
            const bText = lerp(textColorStart.b, textColorEnd.b, aboutScrollProgress);

            aboutSection.style.color = `rgb(${rText}, ${gText}, ${bText})`;

            // Navbar scroll logic
            if (window.scrollY > 50) {
                navbar.classList.remove('navbar-transparent');
                navbar.classList.add('navbar-gunmetal');
            } else {
                navbar.classList.remove('navbar-gunmetal');
                navbar.classList.add('navbar-transparent');
            }
        });

        // IntersectionObserver for the about section
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scrolled');
                } else {
                    entry.target.classList.remove('scrolled');
                }
            });
        }, {
            root: null, // relative to the viewport
            rootMargin: '0px',
            threshold: 0.5 // trigger when 50% of the element is visible
        });

        // Start observing the about section
        observer.observe(aboutSection);

        // --- Counter Animation Logic ---
        function startCounterAnimation(entry) {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.dataset.target, 10);
                    const duration = 2000; // milliseconds
                    const startTime = performance.now();
                    
                    const updateCounter = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const value = Math.floor(progress * target);
                        counter.textContent = value;
                        if (target === 12) {
                             counter.textContent += '+';
                        }
                        if (target === 10) {
                            counter.textContent += '+';
                        }
                        if (target === 225) {
                            counter.textContent += '+';
                        }
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        }
                    };
                    requestAnimationFrame(updateCounter);
                });
                // Unobserve after the animation has started
                counterObserver.unobserve(entry.target);
            }
        }
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(startCounterAnimation);
        }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

        // Mobile menu logic
        mobileMenuButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevents the document click listener from firing immediately
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when a link is clicked
        const mobileLinks = document.querySelectorAll('#mobile-menu a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        // Close mobile menu when clicking outside of the menu and button
        document.addEventListener('click', (event) => {
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnButton = mobileMenuButton.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnButton) {
                mobileMenu.classList.add('hidden');
            }
        });

        // Accordion logic
        document.addEventListener('DOMContentLoaded', () => {
            const accordionItems = document.querySelectorAll('.accordion-item');

            accordionItems.forEach(item => {
                const header = item.querySelector('.accordion-header');
                const content = item.querySelector('.accordion-content');
                const icon = item.querySelector('.accordion-icon');

                header.addEventListener('click', () => {
                    // Close all other open accordion items
                    accordionItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                            otherItem.querySelector('.accordion-content').style.maxHeight = null;
                            otherItem.querySelector('.accordion-icon').style.transform = 'rotate(0deg)';
                        }
                    });

                    // Toggle the clicked item
                    item.classList.toggle('active');
                    if (item.classList.contains('active')) {
                        content.style.maxHeight = content.scrollHeight + 'px';
                        icon.style.transform = 'rotate(180deg)';
                    } else {
                        content.style.maxHeight = null;
                        icon.style.transform = 'rotate(0deg)';
                    }
                });
            });
        });


        window.onload = function() {
            updateContent();
            setInterval(updateContent, 3000);
            
            // Observe the counter section to start its animation
            counterObserver.observe(counterSection);
        };