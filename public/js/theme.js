/**
 * Theme Management Script
 * Handles Light/Dark/System mode switching with 3-state toggle.
 * Theme modes: 'dark' | 'light' | 'system' (default)
 * Should be loaded in <head> to prevent FOUC.
 */

(function () {
    const THEME_KEY = 'chat-w-webpage-theme';

    // Theme modes: 'dark', 'light', 'system'
    const savedTheme = localStorage.getItem(THEME_KEY);
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    // Apply the visual theme based on mode
    function applyTheme(mode) {
        let isLight;

        if (mode === 'system') {
            isLight = systemPrefersLight;
        } else {
            isLight = mode === 'light';
        }

        if (isLight) {
            document.documentElement.classList.add('light');
        } else {
            document.documentElement.classList.remove('light');
        }

        return isLight;
    }

    // Get current effective theme mode
    function getCurrentMode() {
        return localStorage.getItem(THEME_KEY) || 'system';
    }

    // Initial theme application
    const initialMode = savedTheme || 'system';
    applyTheme(initialMode);

    // Toggle function: dark -> light -> system -> dark...
    window.toggleTheme = function () {
        const currentMode = getCurrentMode();
        let newMode;

        // Cycle: dark -> light -> system -> dark
        if (currentMode === 'dark') {
            newMode = 'light';
        } else if (currentMode === 'light') {
            newMode = 'system';
        } else {
            newMode = 'dark';
        }

        if (newMode === 'system') {
            localStorage.removeItem(THEME_KEY);
        } else {
            localStorage.setItem(THEME_KEY, newMode);
        }

        const isLight = applyTheme(newMode);
        updateToggleIcons(newMode, isLight);
    };

    // Update icon visibility based on current mode
    // Icon represents CURRENT state: sun=light, moon=dark, monitor=system
    function updateToggleIcons(mode, isLight) {
        const moonIcons = document.querySelectorAll('.icon-moon');
        const sunIcons = document.querySelectorAll('.icon-sun');
        const systemIcons = document.querySelectorAll('.icon-system');

        // Hide all first
        moonIcons.forEach(el => el.style.display = 'none');
        sunIcons.forEach(el => el.style.display = 'none');
        systemIcons.forEach(el => el.style.display = 'none');

        // Show appropriate icon based on current state
        if (mode === 'system') {
            systemIcons.forEach(el => el.style.display = 'block');
        } else if (isLight) {
            // Light mode: show sun
            sunIcons.forEach(el => el.style.display = 'block');
        } else {
            // Dark mode: show moon
            moonIcons.forEach(el => el.style.display = 'block');
        }
    }

    // Wait for DOM to update icons
    window.addEventListener('DOMContentLoaded', () => {
        const mode = getCurrentMode();
        const isLight = document.documentElement.classList.contains('light');
        updateToggleIcons(mode, isLight);
    });

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        const mode = getCurrentMode();
        // Only auto-switch if in system mode
        if (mode === 'system') {
            if (e.matches) {
                document.documentElement.classList.add('light');
            } else {
                document.documentElement.classList.remove('light');
            }
            updateToggleIcons('system', e.matches);
        }
    });

})();

/**
 * FAQ Accordion Enhancement
 * Makes the entire card clickable to toggle the details element
 */
document.addEventListener('DOMContentLoaded', function () {
    const faqCards = document.querySelectorAll('details.card');

    faqCards.forEach(function (details) {
        details.addEventListener('click', function (e) {
            // If clicking on the summary, let the browser handle it
            if (e.target.closest('summary')) {
                return;
            }
            // Toggle the details open/close state
            details.open = !details.open;
        });
    });
});

/**
 * Mobile Menu Toggle
 * Toggles the mobile navigation menu visibility
 */
window.toggleMobileMenu = function () {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.mobile-menu-toggle');

    if (navMenu) {
        navMenu.classList.toggle('active');

        // Update hamburger icon to X when open
        if (navMenu.classList.contains('active')) {
            menuToggle.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            `;
        } else {
            menuToggle.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            `;
        }
    }
};

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (menuToggle) {
                    menuToggle.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    `;
                }
            }
        });
    });
});
