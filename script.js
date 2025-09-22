document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggling Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    const mobileThemeToggleIcon = document.getElementById('mobile-theme-toggle-icon');
    const counterNumbers = document.querySelectorAll('.counter-number');
    const counterLabels = document.querySelectorAll('#counter-section p');

    // === Helper: Generic Section Styling ===
    function applySectionStyles(config) {
        const section = document.getElementById(config.sectionId);
        if (!section) return;

        const isDarkMode = document.documentElement.classList.contains('dark');
        const theme = isDarkMode ? config.dark : config.light;

        // Background
        if (theme.background) section.style.background = theme.background;

        // Heading
        if (theme.heading && config.headingId) {
            const heading = document.getElementById(config.headingId);
            if (heading) heading.style.color = theme.heading;
        }

        // Spans
        if (theme.spans && config.spanIds) {
            config.spanIds.forEach(id => {
                const span = document.getElementById(id);
                if (span) {
                    span.style.backgroundImage = theme.spans;
                    span.style.backgroundClip = "text";
                    span.style.webkitBackgroundClip = "text";
                    span.style.color = "transparent";
                }
            });
        }

        // Paragraphs
        if (theme.paragraph && config.paragraphClass) {
            const paragraphs = section.querySelectorAll(config.paragraphClass);
            paragraphs.forEach(p => p.style.color = theme.paragraph);
        }

        // Cards
        if (theme.cardBg && config.cardClass) {
            const cards = section.querySelectorAll(config.cardClass);
            cards.forEach(c => c.style.background = theme.cardBg);
        }

        if (theme.cardTitle && config.cardTitleClass) {
            const titles = section.querySelectorAll(config.cardTitleClass);
            titles.forEach(t => t.style.color = theme.cardTitle);
        }

        if (theme.cardSpan && config.cardSpanIds) {
            config.cardSpanIds.forEach(id => {
                const span = document.getElementById(id);
                if (span) {
                    span.style.backgroundImage = theme.cardSpan;
                    span.style.backgroundClip = "text";
                    span.style.webkitBackgroundClip = "text";
                    span.style.color = "transparent";
                }
            });
        }

        if (theme.cardText && config.cardTextClass) {
            const texts = section.querySelectorAll(config.cardTextClass);
            texts.forEach(t => t.style.color = theme.cardText);
        }

        // Cards (if card map is provided)
        if (config.cards && config.cardClass) {
            const cards = section.querySelectorAll(config.cardClass);
            cards.forEach((card, index) => {
                const cardTheme = isDarkMode ? config.cards[index].dark : config.cards[index].light;
                card.style.background = cardTheme.bg;

                const texts = card.querySelectorAll(config.cardTextClass);
                texts.forEach(t => t.style.color = cardTheme.text);

                const titles = card.querySelectorAll(config.cardTitleClass);
                titles.forEach(t => t.style.color = cardTheme.text);
            });
        }

        // Inputs
        if (theme.inputBg && config.inputClass) {
            const inputs = section.querySelectorAll(config.inputClass);
            inputs.forEach(inp => {
                inp.style.background = theme.inputBg;
                inp.style.color = theme.inputText;
                inp.style.border = "none";
                inp.style.outline = "none";
                inp.style.padding = "0.75rem";   // same as p-3
                inp.style.borderRadius = "0.5rem"; // rounded-lg
                inp.style.width = "100%";
                inp.style.fontSize = "1rem";
                inp.style.transition = "all 0.3s ease";

                // Focus state
                inp.onfocus = () => {
                    inp.style.boxShadow = `0 0 0 2px ${theme.buttonBg}`;
                };
                inp.onblur = () => {
                    inp.style.boxShadow = "none";
                };
            });
        }

        if (config.buttonId) {
            const button = document.getElementById(config.buttonId);
            if (button) {
                button.style.padding = "0.5rem 1.5rem";
                button.style.fontSize = "1rem";
                button.style.fontWeight = "600";
                button.style.borderRadius = "0.5rem";
                button.style.transition = "all 0.3s ease";
                button.style.background = theme.buttonBg;
                button.style.color = theme.buttonText;
                button.style.cursor = "pointer";
                button.onmouseover = () => button.style.background = theme.buttonHover;
                button.onmouseout = () => button.style.background = theme.buttonBg;
            }
        }

         // Links
        const links = section.querySelectorAll(config.linkClass);
        links.forEach(link => {
            link.style.color = theme.link;
            link.onmouseover = () => link.style.color = theme.linkHover;
            link.onmouseout = () => link.style.color = theme.link;
        });

        // Icons
        const icons = section.querySelectorAll(config.iconWrapper);
        icons.forEach(icon => {
            icon.style.color = theme.icon;
            icon.onmouseover = () => icon.style.color = theme.iconHover;
            icon.onmouseout = () => icon.style.color = theme.icon;
        });

        // Footer bottom
        const bottom = document.getElementById(config.bottomId);
        if (bottom) {
            bottom.style.color = theme.bottomText;
            bottom.style.borderTop = `1px solid ${theme.border}`;
        }

        // Heart + credit
        const heart = document.getElementById(config.heartId);
        if (heart) heart.style.color = theme.heart;

        const credit = document.getElementById(config.creditId);
        if (credit) {
            credit.style.color = theme.credit;
            credit.onmouseover = () => credit.style.textDecoration = "underline";
            credit.onmouseout = () => credit.style.textDecoration = "none";
        }



    }

    // --- Section Theme Configs ---
    const aboutConfig = {
        sectionId: "about-us-section",
        headingId: "about-heading",
        spanIds: ["about-span"],
        paragraphClass: ".about-para",
        light: {
            background: "linear-gradient(135deg, #fecaca, #f3e8ff)",
            heading: "#1e293b", // slate-800
            spans: "linear-gradient(to right, #b91c1c, #ef4444)", // red-700 → red-500
            paragraph: "#475569" // slate-600
        },
        dark: {
            background: "linear-gradient(135deg, #6b0000, #2e0033)",
            heading: "#ffffff",
            spans: "linear-gradient(to right, #f87171, #fecaca)", // red-400 → red-200
            paragraph: "#d1d5db" // gray-300
        }
    };

    const visionMissionConfig = {
        sectionId: "vision-mission",
        headingId: "vision-mission-heading",
        spanIds: ["vision-span", "mission-span"],
        paragraphClass: ".vision-mission-card-text",
        cardClass: ".vision-mission-card",
        cardTitleClass: ".vision-mission-card-title",
        cardSpanIds: ["vision-card-span", "mission-card-span"],
        light: {
            background: "linear-gradient(135deg, #e9d5ff, #f3e8ff)", // purple-200 → purple-100
            heading: "#1e293b", // slate-800
            spans: "linear-gradient(to right, #7e22ce, #a855f7)", // purple-700 → purple-500
            paragraph: "#475569", // slate-600
            cardBg: "#ffffff",
            cardTitle: "#334155", // slate-700
            cardSpan: "linear-gradient(to right, #7e22ce, #a855f7)", 
            cardText: "#475569"
        },
        dark: {
            background: "linear-gradient(135deg, #1f012b, #43036e)",
            heading: "#ffffff",
            spans: "linear-gradient(to right, #c084fc, #e9d5ff)", // purple-300 → purple-100
            paragraph: "#d1d5db", // gray-300
            cardBg: "rgba(255,255,255,0.1)",
            cardTitle: "#ffffff",
            cardSpan: "linear-gradient(to right, #c084fc, #e9d5ff)",
            cardText: "#d1d5db"
        }
    };

    //Regular services config object
    const regularServicesConfig = {
        sectionId: "regular-services-section",
        paragraphClass: ".text-regular-service",
        cardClass: ".service-card",
        cardTitleClass: ".service-text h3",
        cardTextClass: ".service-text p",
        // Map each card to its gradient + text colors
        cards: [
            { light: { bg: "linear-gradient(135deg, #fecaca, #f3e8ff)", text: "#991b1b" }, // red
            dark:  { bg: "linear-gradient(135deg, #6b0000, #2e0033)", text: "#ffffff" } },
            { light: { bg: "linear-gradient(135deg, #bfdbfe, #dbeafe)", text: "#1e40af" }, // blue
            dark:  { bg: "linear-gradient(135deg, #1A237E, #311B92)", text: "#ffffff" } },
            { light: { bg: "linear-gradient(135deg, #e9d5ff, #f3e8ff)", text: "#6b21a8" }, // purple
            dark:  { bg: "linear-gradient(135deg, #1f012b, #43036e)", text: "#ffffff" } },
            { light: { bg: "linear-gradient(135deg, #fed7aa, #ffedd5)", text: "#9a3412" }, // orange
            dark:  { bg: "linear-gradient(135deg, #8b3a00, #4f1a00)", text: "#ffffff" } },
            { light: { bg: "linear-gradient(135deg, #bbf7d0, #dcfce7)", text: "#166534" }, // green
            dark:  { bg: "linear-gradient(135deg, #064e3b, #022c22)", text: "#ffffff" } },
            { light: { bg: "linear-gradient(135deg, #fef9c3, #fef08a)", text: "#854d0e" }, // yellow
            dark:  { bg: "linear-gradient(135deg, #713f12, #422006)", text: "#ffffff" } },
        ],
        light: {
            background: "linear-gradient(135deg, #bfdbfe, #dbeafe)", // section bg
            paragraph: "#475569", // slate-600
        },
        dark: {
            background: "linear-gradient(135deg, #1A237E, #311B92)",
            paragraph: "#d1d5db", // gray-300
        }
    };

    //Contact us config object
    const contactConfig = {
        sectionId: "contact-us-section",
        headingId: "contact-heading",
        spanIds: ["contact-span"],
        inputClass: ".contact-input",
        buttonId: "contact-submit",
        light: {
            background: "linear-gradient(135deg, #fed7aa, #ffedd5)", // orange-200 → orange-100
            heading: "#1e293b", // slate-800
            spans: "linear-gradient(to right, #b45309, #f97316)", // orange-700 → orange-500
            inputBg: "#f3f4f6", // gray-100
            inputText: "#1e293b", // slate-800
            buttonBg: "#f97316", // orange-500
            buttonHover: "#ea580c", // orange-600
            buttonText: "#ffffff"
        },
        dark: {
            background: "linear-gradient(135deg, #8b3a00, #4f1a00)", // dark orange
            heading: "#ffffff",
            spans: "linear-gradient(to right, #fdba74, #fed7aa)", // orange-300 → orange-200
            inputBg: "#1f2937", // gray-800
            inputText: "#ffffff",
            buttonBg: "#ea580c", // orange-600
            buttonHover: "#9a3412", // deeper orange
            buttonText: "#ffffff"
        }
    };

    // Footer config object
    const footerConfig = {
        sectionId: "footer-section",
        headingClass: ".footer-heading",
        textClass: ".footer-text",
        linkClass: ".footer-link",
        iconWrapper: ".footer-icons a",
        bottomId: "footer-bottom",
        heartId: "footer-heart",
        creditId: "footer-credit",
        light: {
            background: "#e2e8f0", // slate-200
            heading: "#1e293b", // slate-800
            text: "#475569", // slate-600
            link: "#475569",
            linkHover: "#0f172a", // slate-900
            icon: "#475569",
            iconHover: "#0f172a",
            border: "#d1d5db", // gray-300
            bottomText: "#64748b", // slate-500
            heart: "#dc2626", // red-600
            credit: "#dc2626"
        },
        dark: {
            background: "#0f172a", // slate-900
            heading: "#ffffff",
            text: "#9ca3af", // gray-400
            link: "#9ca3af",
            linkHover: "#ffffff",
            icon: "#9ca3af",
            iconHover: "#ffffff",
            border: "#374151", // gray-700
            bottomText: "#6b7280", // gray-500
            heart: "#f87171", // red-400
            credit: "#f87171"
        }
    };




    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            if (themeToggleIcon) themeToggleIcon.className = 'fas fa-sun';
            if (mobileThemeToggleIcon) mobileThemeToggleIcon.className = 'fas fa-sun mr-2';
        } else {
            document.documentElement.classList.remove('dark');
            if (themeToggleIcon) themeToggleIcon.className = 'fas fa-moon';
            if (mobileThemeToggleIcon) mobileThemeToggleIcon.className = 'fas fa-moon mr-2';
        }

        // Apply unified section styles
        applySectionStyles(aboutConfig);
        applySectionStyles(visionMissionConfig);
        applySectionStyles(regularServicesConfig);
        applySectionStyles(contactConfig);
        applySectionStyles(footerConfig);

    };

    const toggleTheme = () => {
        const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        // localStorage.setItem('theme', newTheme);

        applyTheme(newTheme);
        updateContent(true);
        applyNavLinkStyles();
        applyCounterStyles();
        applySectionStyles(aboutConfig);
        applySectionStyles(visionMissionConfig);
        applySectionStyles(regularServicesConfig);
        applySectionStyles(contactConfig);
        applySectionStyles(footerConfig);


        if (mobileMenuButton) {
            if (newTheme === 'dark') {
                mobileMenuButton.classList.remove('text-slate-800');
                mobileMenuButton.classList.add('text-white');
            } else {
                mobileMenuButton.classList.remove('text-white');
                mobileMenuButton.classList.add('text-slate-800');
            }
        }

        if (!mobileMenu.classList.contains('hidden')) {
            const isDarkModeNow = document.documentElement.classList.contains('dark');
            const menuItems = mobileMenu.querySelectorAll('a, button');
            const textColor = isDarkModeNow ? '#FFFFFF' : '#1e293b';
            menuItems.forEach(item => {
                item.style.color = textColor;
            });
        }
    };

    const counterStyles = {
        light: {
            sectionBg: "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 239, 239, 1))",
            labelColor: '#334155',
            numberGradients: [
                'linear-gradient(to right, rgb(185, 28, 28), rgb(239, 68, 68))',
                'linear-gradient(to right, rgb(161, 98, 7), rgb(202, 138, 4))',
                'linear-gradient(to right, rgb(29, 78, 216), rgb(59, 130, 246))'
            ]
        },
        dark: {
            sectionBg: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/assets/pattern.webp')",
            labelColor: '#e2e8f0',
            numberGradients: [
                'linear-gradient(to right, rgb(248, 113, 113), rgb(252, 165, 165))',
                'linear-gradient(to right, rgb(252, 211, 77), rgb(254, 240, 138))',
                'linear-gradient(to right, rgb(96, 165, 250), rgb(191, 219, 254))'
            ]
        }
    };

    function applyCounterStyles() {
        if (!counterSection) return;
        const isDarkMode = document.documentElement.classList.contains('dark');
        const theme = isDarkMode ? counterStyles.dark : counterStyles.light;
        Object.assign(counterSection.style, {
            background: theme.sectionBg,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
        });
        counterLabels.forEach(label => {
            label.style.color = theme.labelColor;
        });
        counterNumbers.forEach((number, index) => {
            Object.assign(number.style, {
                backgroundImage: theme.numberGradients[index],
                backgroundClip: 'text',
                webkitBackgroundClip: 'text'
            });
        });
    }

    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
    if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleTheme);
    
    const desktopLinks = document.querySelectorAll('.hidden.md\\:flex a.text-link');
    const navLinkThemes = [
        { light: 'linear-gradient(to right, rgb(185, 28, 28), rgb(239, 68, 68))', dark: 'linear-gradient(to right, rgb(248, 113, 113), rgb(252, 165, 165))' },
        { light: 'linear-gradient(to right, rgb(126, 34, 206), rgb(168, 85, 247))', dark: 'linear-gradient(to right, rgb(192, 132, 252), rgb(233, 213, 255))' },
        { light: 'linear-gradient(to right, rgb(29, 78, 216), rgb(59, 130, 246))', dark: 'linear-gradient(to right, rgb(96, 165, 250), rgb(191, 219, 254))' },
        { light: 'linear-gradient(to right, rgb(185, 28, 28), rgb(239, 68, 68))', dark: 'linear-gradient(to right, rgb(248, 113, 113), rgb(252, 165, 165))' }
    ];

    function applyNavLinkStyles() {
        const isDarkMode = document.documentElement.classList.contains('dark');
        const baseColor = isDarkMode ? '#FFFFFF' : '#334155';
        desktopLinks.forEach((link, index) => {
            link.style.color = baseColor;
            link.style.backgroundImage = 'none';
            link.style.webkitBackgroundClip = 'initial';
            link.style.backgroundClip = 'initial';
            link.onmouseover = () => {
                const currentIsDarkMode = document.documentElement.classList.contains('dark');
                const gradient = currentIsDarkMode ? navLinkThemes[index].dark : navLinkThemes[index].light;
                link.style.backgroundImage = gradient;
                link.style.webkitBackgroundClip = 'text';
                link.style.backgroundClip = 'text';
                link.style.color = 'transparent';
            };
            link.onmouseout = () => {
                const currentIsDarkMode = document.documentElement.classList.contains('dark');
                link.style.backgroundImage = 'none';
                link.style.color = currentIsDarkMode ? '#FFFFFF' : '#334155';
            };
        });
    }

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
    const counterSection = document.getElementById('counter-section');
    const navbar = document.getElementById('navbar');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // === SECTION 1: POPULATED 'states' ARRAY ===
    const states = [
        {
            pText: 'Delivering your goods with speed, security, and global reach. We\'re committed to optimizing logistics and streamlining supply chains.',
            dark: {
                titleHTML: 'OSM Transport<br> Road <br><span class="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-200">Logistics</span>',
                blobColor: '#FF6F61',
                btn1Classes: 'bg-red-600 hover:bg-red-700',
                btn2Classes: 'text-red-400 border-red-400 hover:bg-red-900',
            },
            light: {
                titleHTML: '<span class="text-slate-800">OSM Transport<br> Road</span> <br><span class="bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-red-500">Logistics</span>',
                blobColor: '#DC2626',
                btn1Classes: 'bg-red-500 hover:bg-red-600',
                btn2Classes: 'text-red-600 border-red-600 hover:bg-red-100',
            }
        },
        {
            pText: 'Streamlining your supply chain with efficient, circular routes. We collect multiple loads in a single trip to reduce costs and environmental impact.',
            dark: {
                titleHTML: 'OSM Transport<br> Milk <br><span class="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-100">Operations</span>',
                blobColor: '#f7d300',
                btn1Classes: 'bg-orange-600 hover:bg-orange-700',
                btn2Classes: 'text-yellow-300 border-yellow-300 hover:bg-orange-900',
            },
            light: {
                titleHTML: '<span class="text-slate-800">OSM Transport<br> Milk</span> <br><span class="bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-amber-500">Operations</span>',
                blobColor: '#F59E0B',
                btn1Classes: 'bg-amber-500 hover:bg-amber-600',
                btn2Classes: 'text-amber-600 border-amber-600 hover:bg-amber-100',
            }
        },
        {
            pText: 'Our expert teams handle every detail of your move, from packing to secure transport, ensuring your belongings arrive safely and on time.',
            dark: {
                titleHTML: 'OSM Transport<br> Packing & <br><span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">Moving</span>',
                blobColor: '#B3E5FC',
                btn1Classes: 'bg-blue-600 hover:bg-blue-700',
                btn2Classes: 'text-blue-300 border-blue-300 hover:bg-blue-900',
            },
            light: {
                titleHTML: '<span class="text-slate-800">OSM Transport<br> Packing &</span> <br><span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">Moving</span>',
                blobColor: '#2563EB',
                btn1Classes: 'bg-blue-600 hover:bg-blue-700',
                btn2Classes: 'text-blue-600 border-blue-600 hover:bg-blue-100',
            }
        },
        {
            pText: 'We specialize in the safe and precise relocation of industrial equipment within your facility, minimizing downtime and maximizing efficiency.',
            dark: {
                titleHTML: 'OSM Transport<br> Inplant <br><span class="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-purple-100">Equipment</span>',
                blobColor: '#E0B0FF',
                btn1Classes: 'bg-purple-600 hover:bg-purple-700',
                btn2Classes: 'text-purple-400 border-purple-400 hover:bg-purple-900',
            },
            light: {
                titleHTML: '<span class="text-slate-800">OSM Transport<br> Inplant</span> <br><span class="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-purple-500">Equipment</span>',
                blobColor: '#7C3AED',
                btn1Classes: 'bg-purple-600 hover:bg-purple-700',
                btn2Classes: 'text-purple-600 border-purple-600 hover:bg-purple-100',
            }
        },
    ];

    let currentState = 0;

    function updateContent(forceUpdate = false) {
        if (!forceUpdate) {
            currentState = (currentState + 1) % states.length;
        }
        const state = states[currentState];
        if (!state) return; // Safeguard against empty array
        const isDarkMode = document.documentElement.classList.contains('dark');
        const themeState = isDarkMode ? state.dark : state.light;
        heroTitle.innerHTML = themeState.titleHTML;
        heroTitle.style.color = isDarkMode ? '#e2e8f0' : '#475569';
        heroP.textContent = state.pText;
        heroP.style.color = isDarkMode ? '#e2e8f0' : '#475569';
        gradientLayers.forEach((layer, index) => {
            layer.style.opacity = index === currentState ? '1' : '0';
        });
        if (blobSvgPath) blobSvgPath.setAttribute('fill', themeState.blobColor);
        ctaButton1.className = 'w-1/2 md:w-auto inline-block px-6 py-2 text-base font-semibold text-white rounded-lg shadow-md transition-colors duration-1000';
        ctaButton2.className = 'w-1/2 md:w-auto inline-block px-6 py-2 text-base font-semibold border rounded-lg transition-colors duration-1000';
        ctaButton1.classList.add(...themeState.btn1Classes.split(' '));
        ctaButton2.classList.add(...themeState.btn2Classes.split(' '));
    }

    // === SECTION 2: SCROLL LOGIC ===
    window.addEventListener('scroll', () => {
        
        if(window.scrollY < 50 && mobileMenu.getAttribute("aria-expanded") === "false") {            
            navbar.classList.add('navbar-transparent');
            navbar.classList.remove('navbar-scrolled');
        } else if(window.scrollY < 50 && mobileMenu.getAttribute("aria-expanded") === "true") {
            navbar.classList.remove('navbar-transparent');
            navbar.classList.add('navbar-scrolled');
        } else if(window.scrollY > 50) {
            navbar.classList.remove('navbar-transparent');
            navbar.classList.add('navbar-scrolled');
        }
    });
    // Mobile menu listener
    const mobileMenuBtn = document.getElementById("mobile-menu-button"); 
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener("click", () => {            
            mobileMenu.getAttribute("aria-expanded") === "false" ? mobileMenu.setAttribute("aria-expanded", "true") : mobileMenu.setAttribute("aria-expanded", "false");
            if(mobileMenu.getAttribute("aria-expanded") === "true") {
                navbar.classList.remove('navbar-transparent');
                navbar.classList.add('navbar-scrolled');
            }
            if(window.scrollY < 50 && mobileMenu.getAttribute("aria-expanded") === "false") {
                navbar.classList.add('navbar-transparent');
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scrolled');
            } else {
                entry.target.classList.remove('scrolled');
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.5 });
    if (aboutSection) observer.observe(aboutSection);

    // === SECTION 3: COUNTER ANIMATION ===
    function startCounterAnimation(entry) {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter-number');
            counters.forEach(counter => {
                if (counter.dataset.animated) return;
                counter.dataset.animated = 'true';
                const target = parseInt(counter.dataset.target, 10);
                const duration = 2000;
                let startTime = null;
                const updateCounter = (currentTime) => {
                    if (!startTime) startTime = currentTime;
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const value = Math.floor(progress * target);
                    counter.textContent = value;
                    if (target === 25 || target === 10 || target === 103) {
                        if (progress === 1) counter.textContent += '+';
                    }
                    if (progress < 1) requestAnimationFrame(updateCounter);
                };
                requestAnimationFrame(updateCounter);
            });
            counterObserver.unobserve(entry.target);
        }
    }
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(startCounterAnimation);
    }, { threshold: 0.5 });

    // === SECTION 4: MOBILE MENU ===
    function toggleMobileMenu() {
        const isHidden = mobileMenu.classList.contains('hidden');
        const isDarkMode = document.documentElement.classList.contains('dark');
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            const menuItems = mobileMenu.querySelectorAll('a, button');
            const textColor = isDarkMode ? '#FFFFFF' : '#1e293b';
            menuItems.forEach(item => { item.style.color = textColor; });
        } else {
            mobileMenu.classList.add('hidden');
        }
    }
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleMobileMenu();
        });
    }
    const mobileLinks = document.querySelectorAll('#mobile-menu a, #mobile-menu button');
    mobileLinks.forEach(link => {
        if (link.id !== 'mobile-theme-toggle') {
            link.addEventListener('click', toggleMobileMenu);
        }
    });

    // --- Listen and apply system theme always ---
    if (window.matchMedia) {
        const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const applySystemTheme = (e) => {
            const newTheme = e.matches ? 'dark' : 'light';
            applyTheme(newTheme);
            applyCounterStyles();
            applyNavLinkStyles();
            updateContent(true);
            applySectionStyles(aboutConfig);
            applySectionStyles(visionMissionConfig);
            applySectionStyles(regularServicesConfig);
            applySectionStyles(contactConfig);
            applySectionStyles(footerConfig);
        };

        // Apply immediately based on current system setting
        applySystemTheme(darkMediaQuery);

        // Watch for changes
        darkMediaQuery.addEventListener('change', applySystemTheme);
    }


    // === SECTION 5: ACCORDION ===
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const icon = header.querySelector('.accordion-icon');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            accordionItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-content').style.maxHeight = null;
                i.querySelector('.accordion-icon').style.transform = 'rotate(0deg)';
            });
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // --- INITIAL THEME SETUP ON PAGE LOAD ---
    (() => {
        // const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        // const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        const initialTheme = systemPrefersDark ? 'dark' : 'light';
        applyTheme(initialTheme);
        applyCounterStyles();
        applyNavLinkStyles();
        updateContent(true);
        applySectionStyles(aboutConfig);
        applySectionStyles(visionMissionConfig);
        applySectionStyles(regularServicesConfig);
        applySectionStyles(contactConfig);
        applySectionStyles(footerConfig);


        if (mobileMenuButton) {
            if (initialTheme === 'dark') {
                mobileMenuButton.classList.remove('text-slate-800');
                mobileMenuButton.classList.add('text-white');
            } else {
                mobileMenuButton.classList.remove('text-white');
                mobileMenuButton.classList.add('text-slate-800');
            }
        }
    })();

   
    
    // --- Start intervals and observers ---
    setInterval(() => updateContent(false), 4000); 
    if (counterSection) counterObserver.observe(counterSection);
});
