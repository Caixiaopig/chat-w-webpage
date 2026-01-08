import { test, expect } from '@playwright/test';

test.describe('Theme Toggle Functionality', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should toggle theme on click (desktop only)', async ({ page, isMobile }) => {
        // Skip on mobile - toggle is hidden in collapsed nav
        if (isMobile) test.skip();

        const isLightInitial = await page.locator('html').getAttribute('class');

        // Click toggle
        await page.locator('.theme-toggle').click();

        const isLightAfter = await page.locator('html').getAttribute('class');
        expect(isLightAfter).not.toBe(isLightInitial); // Should change
    });

    test('should persist theme preference (desktop only)', async ({ page, isMobile }) => {
        // Skip on mobile - toggle is hidden in collapsed nav
        if (isMobile) test.skip();

        // Force light mode
        const isLight = await page.locator('html').getAttribute('class');
        if (!isLight?.includes('light')) {
            await page.locator('.theme-toggle').click();
        }

        // Check valid light
        expect(await page.locator('html')).toHaveClass(/light/);

        // Reload
        await page.reload();

        // Should still be light
        expect(await page.locator('html')).toHaveClass(/light/);
    });
});
