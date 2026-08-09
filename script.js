document.addEventListener('DOMContentLoaded', () => {
    // Mobile Drawer Logic
    const openMenuBtn = document.getElementById('open-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-sections a');

    if (openMenuBtn && closeMenuBtn && mobileDrawer) {
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
    }
});


