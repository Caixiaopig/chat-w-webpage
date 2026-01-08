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
