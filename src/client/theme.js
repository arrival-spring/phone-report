document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    /**
     * Sets the initial theme (dark or light) based on localStorage preference
     * or the user's OS-level preference. It also updates the toggle icon visibility.
     */
    const setInitialTheme = () => {
        const isDark = localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

        if (isDark) {
            document.documentElement.classList.add('dark');
            if (themeToggleLightIcon) themeToggleLightIcon.classList.remove('hidden');
            if (themeToggleDarkIcon) themeToggleDarkIcon.classList.add('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            if (themeToggleDarkIcon) themeToggleDarkIcon.classList.remove('hidden');
            if (themeToggleLightIcon) themeToggleLightIcon.classList.add('hidden');
        }
        updateButtonAccessibility(isDark);
    };

    /**
     * Updates the aria-label and title of the theme toggle button.
     * @param {boolean} isDark - True if the current theme is dark.
     */
    const updateButtonAccessibility = (isDark) => {
        if (!themeToggleBtn || typeof translate !== 'function') return;
        const label = isDark ? translate('themeToggleLight') : translate('themeToggleDark');
        themeToggleBtn.setAttribute('aria-label', label);
        themeToggleBtn.setAttribute('title', label);
    };

    setInitialTheme();

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            // Toggle the theme
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            localStorage.setItem('color-theme', isDark ? 'dark' : 'light');

            // Toggle the icons
            if (themeToggleDarkIcon) themeToggleDarkIcon.classList.toggle('hidden');
            if (themeToggleLightIcon) themeToggleLightIcon.classList.toggle('hidden');

            updateButtonAccessibility(isDark);

            // Dispatch a custom event to notify other scripts of the theme change
            window.dispatchEvent(new Event('themeChanged'));
        });
    }
});