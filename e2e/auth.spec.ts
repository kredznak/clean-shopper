import { test, expect } from '@playwright/test'

// Unique email per run — avoids sign-up conflicts across test runs.
// Uses mailinator.com which Supabase accepts; example.com is rejected.
// Note: test users accumulate since the anon key cannot call the admin delete API.
const testEmail = `testuser${Date.now()}@mailinator.com`
const testPassword = 'testpassword123'

// PREREQUISITES — two Supabase dashboard settings must be changed before this test passes:
//
// 1. Disable email confirmation
//    Dashboard → Authentication → Providers → Email → turn off "Confirm email"
//    Without this, sign-up shows "Check your email" instead of auto-logging in,
//    and the browse-page assertions in steps 4 and 7 will fail.
//
// 2. Raise the sign-up rate limit
//    Dashboard → Authentication → Rate Limits → set "Sign ups per hour" to at least 10
//    The default (3/hour) is exceeded quickly during local test runs.

test.describe('Authentication flow', () => {
  test('sign up, sign out, and sign in', async ({ page }) => {
    // 1. Open app — sign-in page loads
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible()
    await expect(page.getByPlaceholder('you@example.com')).toBeVisible()
    await expect(page.getByRole('button', { name: /^sign in$/i })).toBeVisible()

    // 2. Navigate to sign-up
    await page.getByRole('button', { name: /sign up/i }).click()
    await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible()

    // 3. Fill in credentials and submit
    await page.getByPlaceholder('you@example.com').fill(testEmail)
    await page.getByPlaceholder('Create a password').fill(testPassword)
    await page.getByRole('button', { name: /create account/i }).click()

    // 4. After sign-up the session is created immediately (requires "Confirm email" off)
    //    and the app renders the authenticated browse page
    await expect(page.getByRole('button', { name: /sign out/i })).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('A healthy home can change your life.')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Browse' })).toBeVisible()

    // 5. Sign out — returns to sign-in page
    await page.getByRole('button', { name: /sign out/i }).click()
    await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible()

    // 6. Sign in with the same credentials
    await page.getByPlaceholder('you@example.com').fill(testEmail)
    await page.getByPlaceholder('Your password').fill(testPassword)
    await page.getByRole('button', { name: /^sign in$/i }).click()

    // 7. After sign-in, user lands on the browse page
    await expect(page.getByRole('button', { name: /sign out/i })).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('A healthy home can change your life.')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Browse' })).toBeVisible()
  })
})
