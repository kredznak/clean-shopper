import { test, expect } from '@playwright/test'

test('home page loads without errors', async ({ page }) => {
  const consoleErrors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })

  await page.goto('/')

  // App renders — root div is populated
  await expect(page.locator('#root')).not.toBeEmpty()

  // Unauthenticated users land on the sign-in page
  await expect(page.getByText('Sign in to your account')).toBeVisible()
  await expect(page.getByText('Clean Shopper')).toBeVisible()
  await expect(page.getByPlaceholder('you@example.com')).toBeVisible()
  await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible()

  // No console errors during load
  expect(consoleErrors).toHaveLength(0)
})
