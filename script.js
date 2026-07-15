document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    
    // Moon icon path
    const moonPath = "M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z";
    // Sun icon path
    const sunPath = "M12 7a5 5 0 100 10 5 5 0 000-10zM2 13h2a1 1 0 000-2H2a1 1 0 000 2zm18 0h2a1 1 0 000-2h-2a1 1 0 000 2zM11 2v2a1 1 0 002 0V2a1 1 0 00-2 0zm0 18v2a1 1 0 002 0v-2a1 1 0 00-2 0zM5.99 4.58a1 1 0 10-1.41 1.41l1.42 1.42a1 1 0 101.41-1.41L5.99 4.58zm12.02 12.02a1 1 0 10-1.41 1.41l1.42 1.42a1 1 0 101.41-1.41l-1.42-1.42zM19.42 5.99a1 1 0 10-1.41-1.41l-1.42 1.42a1 1 0 101.41 1.41l1.42-1.42zM4.58 18.01a1 1 0 101.41 1.41l1.42-1.42a1 1 0 10-1.41-1.41l-1.42 1.42z";

    // Set initial icon based on theme
    if(htmlElement.getAttribute('data-theme') === 'light') {
        themeIcon.innerHTML = `<path d="${moonPath}"/>`;
    } else {
        themeIcon.innerHTML = `<path d="${sunPath}"/>`;
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        
        // Update Icon
        if (newTheme === 'dark') {
            themeIcon.innerHTML = `<path d="${sunPath}"/>`;
        } else {
            themeIcon.innerHTML = `<path d="${moonPath}"/>`;
        }
    });

    // Mobile Drawer Logic
    const openMenuBtn = document.getElementById('open-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    openMenuBtn.addEventListener('click', () => {
        mobileDrawer.classList.add('open');
    });

    closeMenuBtn.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
    });

    // Close drawer when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileDrawer.classList.remove('open');
        });
    });

    // Language Toggle Logic
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    const langText = document.getElementById('lang-text');
    const i18nElements = document.querySelectorAll('.i18n');

    langToggleBtn.addEventListener('click', () => {
        const currentLang = htmlElement.getAttribute('dir') === 'ltr' ? 'en' : 'ar';
        const newLang = currentLang === 'en' ? 'ar' : 'en';
        
        // Switch Direction and text of the button
        if (newLang === 'ar') {
            htmlElement.setAttribute('dir', 'rtl');
            langText.innerText = 'EN';
        } else {
            htmlElement.setAttribute('dir', 'ltr');
            langText.innerText = 'AR';
        }

        // Update all translation strings
        i18nElements.forEach(el => {
            if (newLang === 'ar') {
                el.innerHTML = el.getAttribute('data-ar');
            } else {
                el.innerHTML = el.getAttribute('data-en');
            }
        });

        // Update placeholders
        const i18nPlaceholders = document.querySelectorAll('.i18n-placeholder');
        i18nPlaceholders.forEach(el => {
            if (newLang === 'ar') {
                el.setAttribute('placeholder', el.getAttribute('data-ar'));
            } else {
                el.setAttribute('placeholder', el.getAttribute('data-en'));
            }
        });
    });
});


