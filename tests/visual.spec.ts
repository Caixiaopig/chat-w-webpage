import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {
    test('landing page visual check (desktop only)', async ({ page, isMobile }) => {
        // Skip on mobile - toggle is hidden in collapsed nav
        if (isMobile) test.skip();

        await page.goto('/');

        // Force Dark Mode for consistent baseline
        await page.evaluate(() => {
            localStorage.setItem('chat-w-webpage-theme', 'dark');
            document.documentElement.classList.remove('light');
        });
        await page.reload(); // Reload to apply cleanly

        await expect(page).toHaveScreenshot('landing-dark.png', { fullPage: true });

        // Force Light Mode via JS (not click) for reliability
        await page.evaluate(() => {
            localStorage.setItem('chat-w-webpage-theme', 'light');
            document.documentElement.classList.add('light');
        });
        // Wait for transition if any (css says 0.3s)
        await page.waitForTimeout(500);

        await expect(page).toHaveScreenshot('landing-light.png', { fullPage: true });
    });

    test('mobile bento grid visual', async ({ page, isMobile }) => {
        if (!isMobile) test.skip();

        await page.goto('/');
        await page.evaluate(() => {
            localStorage.setItem('chat-w-webpage-theme', 'dark');
            document.documentElement.classList.remove('light');
        });
        await page.reload();

        const bentoHandles = page.locator('.bento-grid');
        await expect(bentoHandles).toBeVisible();
        await expect(bentoHandles).toHaveScreenshot('bento-grid-mobile-dark.png');
    });

    test('mobile landing page light mode visual', async ({ page, isMobile }) => {
        if (!isMobile) test.skip();

        await page.goto('/');
        await page.evaluate(() => {
            localStorage.setItem('chat-w-webpage-theme', 'light');
            document.documentElement.classList.add('light');
        });
        await page.reload();
        await page.waitForTimeout(500);

        await expect(page).toHaveScreenshot('landing-mobile-light.png', { fullPage: true });
    });
});
