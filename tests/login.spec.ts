import { test, expect } from '@playwright/test';

test('Verify login and homepage file listing', async ({ page }) => {
  // Step 1: Navigate to the URL
  await page.goto('https:/');
  
  // Step 2: Verify it has Login window with Email & Password fields
  await expect(page).toHaveTitle('VHL | Central');
  
  // Verify login form elements exist
  const emailInput = page.getByRole('textbox', { name: 'Email' });
  const passwordInput = page.getByRole('textbox', { name: 'Password' });
  const loginButton = page.getByRole('button', { name: 'Login' });
  
  await expect(emailInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
  await expect(loginButton).toBeVisible();
  
  // Step 3: Login using credentials
  await emailInput.fill('saanav@yopmail.com');
  await passwordInput.fill('test@123');
  await loginButton.click();
  
  // Wait for navigation after login
  await page.waitForTimeout(3000);
  
  // Step 4: Verify the homepage listing the list of File names
  // Verify we have the "Uploaded Files" section
  const uploadedFilesHeading = page.locator('text=Uploaded Files');
  await expect(uploadedFilesHeading).toBeVisible();
  
  // Verify the table with file names exists
  const fileTable = page.getByRole('table');
  await expect(fileTable).toBeVisible();
  
  // Verify the table has column headers
  const slNoHeader = page.getByRole('columnheader', { name: 'Sl.No' });
  const fileNameHeader = page.getByRole('columnheader', { name: 'File Name' });
  await expect(slNoHeader).toBeVisible();
  await expect(fileNameHeader).toBeVisible();
  
  // Verify we have file entries in the table
  const fileRows = page.locator('table tbody tr');
  const rowCount = await fileRows.count();
  
  // Assert that we have at least some files listed
  expect(rowCount).toBeGreaterThan(0);
  
  // Verify specific file names are visible in the table
  const engineeringTestingFile = page.locator('text=Engineering Testing for (Espirales Theme)');
  const epubTestFile = page.locator('text=epub_test_600_mb');
  
  await expect(engineeringTestingFile).toBeVisible();
  await expect(epubTestFile).toBeVisible();
});
