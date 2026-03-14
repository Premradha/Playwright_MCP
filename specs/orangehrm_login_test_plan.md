# OrangeHRM Login Page Test Plan

## Application Overview

The OrangeHRM login page is the primary entry point for user authentication. This test plan covers comprehensive scenarios including positive login flows, negative validation scenarios, edge cases, error handling, and validation of all UI elements including form fields, buttons, links, and informational content. The page includes username/password input fields, login button, forgot password link, credential hints, social media links, and footer information.

## Test Scenarios

### 1. Positive Login Scenarios

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful login with valid credentials

**File:** `tests/login/positive/successful_login.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Verify login page is loaded with all elements visible
  3. Click on Username input field
  4. Enter 'Admin' in the Username field
  5. Click on Password input field
  6. Enter 'admin123' in the Password field
  7. Click the Login button
  8. Wait for page navigation to complete

**Expected Results:**
  - Login page loads successfully
  - Username field is active and accepts input
  - Password field accepts input
  - Login button is clickable
  - User is redirected to dashboard (URL contains /dashboard/index)
  - Dashboard page displays with sidebar menu and main content
  - User profile is visible showing 'manda user' or similar

#### 1.2. Successful login with username in different cases

**File:** `tests/login/positive/case_sensitive_login.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Enter 'admin' (lowercase) in Username field
  3. Enter 'admin123' in Password field
  4. Click Login button
  5. Wait for response

**Expected Results:**
  - System accepts lowercase username variant
  - User is either logged in successfully or receives appropriate error message
  - Page behavior is consistent

#### 1.3. Login with spaces in credentials

**File:** `tests/login/positive/spaces_in_credentials.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Enter ' Admin ' (with leading and trailing spaces) in Username field
  3. Enter ' admin123 ' (with leading and trailing spaces) in Password field
  4. Click Login button
  5. Wait for response

**Expected Results:**
  - System either trims spaces automatically and logs in successfully
  - Or displays validation error about spaces
  - Behavior is consistent and secure

#### 1.4. Login and verify session establishment

**File:** `tests/login/positive/session_verification.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Enter 'Admin' in Username field
  3. Enter 'admin123' in Password field
  4. Click Login button
  5. Wait for dashboard to load
  6. Verify browser cookies or session storage contains session token
  7. Navigate to another module (e.g., Admin)
  8. Verify user remains logged in

**Expected Results:**
  - User successfully logs in
  - Session is established and maintained
  - User can navigate to other modules without re-authentication
  - Session token is securely stored

### 2. Negative Login Scenarios - Empty Fields

**Seed:** `tests/seed.spec.ts`

#### 2.1. Login with empty username field

**File:** `tests/login/negative/empty_username.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Leave Username field empty
  3. Enter 'admin123' in Password field
  4. Click Login button
  5. Wait for validation message

**Expected Results:**
  - Validation error message 'Required' appears below Username field
  - User is not logged in
  - User remains on login page
  - Password field value is retained

#### 2.2. Login with empty password field

**File:** `tests/login/negative/empty_password.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Enter 'Admin' in Username field
  3. Leave Password field empty
  4. Click Login button
  5. Wait for validation message

**Expected Results:**
  - Validation error message 'Required' appears below Password field
  - User is not logged in
  - User remains on login page
  - Username field value is retained

#### 2.3. Login with both fields empty

**File:** `tests/login/negative/empty_both_fields.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Leave both Username and Password fields empty
  3. Click Login button
  4. Wait for validation messages

**Expected Results:**
  - Validation error 'Required' appears below Username field
  - Validation error 'Required' appears below Password field
  - User is not logged in
  - User remains on login page

#### 2.4. Login with only whitespace in fields

**File:** `tests/login/negative/whitespace_only.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Enter only spaces '   ' in Username field
  3. Enter only spaces '   ' in Password field
  4. Click Login button
  5. Wait for response

**Expected Results:**
  - System treats whitespace as empty or invalid input
  - Either validation error or invalid credentials message appears
  - User is not logged in
  - User remains on login page

### 3. Negative Login Scenarios - Invalid Credentials

**Seed:** `tests/seed.spec.ts`

#### 3.1. Login with invalid username

**File:** `tests/login/negative/invalid_username.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Enter 'InvalidUser' in Username field
  3. Enter 'admin123' in Password field
  4. Click Login button
  5. Wait for error message

**Expected Results:**
  - Error message 'Invalid credentials' is displayed in alert box
  - User is not logged in
  - User remains on login page
  - Both field values are cleared or retained (check application behavior)
  - Alert message is dismissible

#### 3.2. Login with invalid password

**File:** `tests/login/negative/invalid_password.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Enter 'Admin' in Username field
  3. Enter 'wrongpassword' in Password field
  4. Click Login button
  5. Wait for error message

**Expected Results:**
  - Error message 'Invalid credentials' is displayed
  - User is not logged in
  - User remains on login page
  - Username and password combination is rejected

#### 3.3. Login with both fields containing invalid data

**File:** `tests/login/negative/invalid_both_fields.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Enter 'WrongUser' in Username field
  3. Enter 'wrongpass' in Password field
  4. Click Login button
  5. Wait for error message

**Expected Results:**
  - Error message 'Invalid credentials' is displayed
  - User is not logged in
  - User remains on login page

#### 3.4. Login with correct username but incorrect password

**File:** `tests/login/negative/correct_username_wrong_password.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Enter 'Admin' in Username field
  3. Enter 'admin124' in Password field (one character off)
  4. Click Login button
  5. Wait for error message

**Expected Results:**
  - Generic error message 'Invalid credentials' is displayed (not username specific)
  - User is not logged in
  - No indication of which field is incorrect
  - Security best practice is maintained

#### 3.5. Login with multiple failed attempts

**File:** `tests/login/negative/multiple_failed_attempts.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Attempt login with invalid credentials
  3. Click Login button
  4. Verify error message appears
  5. Repeat invalid login attempt 2-3 times consecutively
  6. Observe page behavior after multiple failures

**Expected Results:**
  - Application accepts multiple login attempts
  - Error message displays consistently
  - Check if account lockout or rate limiting is implemented
  - Check if CAPTCHA or additional verification appears after multiple attempts
  - Application remains responsive

### 4. Negative Login Scenarios - Special Characters and Injection Attacks

**Seed:** `tests/seed.spec.ts`

#### 4.1. Login with SQL injection in username field

**File:** `tests/login/negative/sql_injection_username.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Enter "' OR '1'='1" in Username field
  3. Enter 'admin123' in Password field
  4. Click Login button
  5. Wait for response

**Expected Results:**
  - SQL injection payload is not executed
  - Error message 'Invalid credentials' appears
  - User is not logged in despite potential SQL injection
  - Application properly sanitizes input

#### 4.2. Login with SQL injection in password field

**File:** `tests/login/negative/sql_injection_password.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Enter 'Admin' in Username field
  3. Enter "' OR '1'='1" in Password field
  4. Click Login button
  5. Wait for response

**Expected Results:**
  - SQL injection payload is not executed
  - Error message 'Invalid credentials' appears
  - User is not logged in
  - Application properly handles dangerous input

#### 4.3. Login with XSS payload in username field

**File:** `tests/login/negative/xss_payload_username.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Enter '<script>alert("XSS")</script>' in Username field
  3. Enter 'admin123' in Password field
  4. Click Login button
  5. Wait for response and check for JavaScript execution

**Expected Results:**
  - No JavaScript alert appears (XSS is prevented)
  - Payload is treated as literal string
  - Error message 'Invalid credentials' appears
  - User is not logged in
  - Application properly escapes potentially harmful input

#### 4.4. Login with special characters in credentials

**File:** `tests/login/negative/special_characters.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Enter '!@#$%^&*()' in Username field
  3. Enter '!@#$%^&*()' in Password field
  4. Click Login button
  5. Wait for response

**Expected Results:**
  - Special characters are accepted in input fields
  - Error message 'Invalid credentials' appears
  - User is not logged in
  - Application handles special characters safely

#### 4.5. Login with LDAP injection attempt

**File:** `tests/login/negative/ldap_injection.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Enter 'Admin*' in Username field
  3. Enter 'admin123' in Password field
  4. Click Login button
  5. Wait for response

**Expected Results:**
  - LDAP injection payload is not executed
  - Error message 'Invalid credentials' appears
  - User is not logged in
  - Input validation prevents wildcard bypass

### 5. Negative Login Scenarios - Input Validation

**Seed:** `tests/seed.spec.ts`

#### 5.1. Login with extremely long username

**File:** `tests/login/negative/long_username.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Enter a 500+ character string in Username field
  3. Enter 'admin123' in Password field
  4. Click Login button
  5. Observe page behavior

**Expected Results:**
  - Application either truncates or rejects input gracefully
  - Error message 'Invalid credentials' appears
  - User is not logged in
  - No page crash or performance degradation

#### 5.2. Login with extremely long password

**File:** `tests/login/negative/long_password.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Enter 'Admin' in Username field
  3. Enter a 1000+ character string in Password field
  4. Click Login button
  5. Observe page behavior

**Expected Results:**
  - Application either truncates or processes input gracefully
  - Error message 'Invalid credentials' appears
  - User is not logged in
  - Application remains responsive

#### 5.3. Login with numeric values in username field

**File:** `tests/login/negative/numeric_username.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Enter '12345' in Username field
  3. Enter 'admin123' in Password field
  4. Click Login button
  5. Wait for response

**Expected Results:**
  - Numeric input is accepted in username field
  - Error message 'Invalid credentials' appears
  - User is not logged in

#### 5.4. Login with Unicode characters in credentials

**File:** `tests/login/negative/unicode_characters.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Enter '你好世界' (Chinese characters) in Username field
  3. Enter '🔐🔒🔑' (emoji) in Password field
  4. Click Login button
  5. Wait for response

**Expected Results:**
  - Unicode and special characters are accepted in input
  - Error message 'Invalid credentials' appears
  - User is not logged in
  - Application handles non-ASCII characters properly

### 6. UI Elements and Navigation Validation

**Seed:** `tests/seed.spec.ts`

#### 6.1. Verify login page layout and all elements present

**File:** `tests/login/ui/page_layout_verification.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Verify company branding image is visible
  3. Verify 'Login' heading is displayed as level 5 heading
  4. Verify credential hint text displays 'Username : Admin'
  5. Verify credential hint text displays 'Password : admin123'
  6. Verify Username input field is visible with placeholder 'Username'
  7. Verify Password input field is visible with placeholder 'Password'
  8. Verify Login button is visible and clickable
  9. Verify 'Forgot your password?' link is visible
  10. Verify footer content is visible

**Expected Results:**
  - All visual elements are present on the page
  - Layout is clean and organized
  - Branding image loads correctly
  - Headings use proper semantic HTML
  - Input fields have appropriate placeholders
  - Login button is prominently displayed
  - Footer information is visible

#### 6.2. Verify social media links are functional

**File:** `tests/login/ui/social_media_links.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Verify LinkedIn link is present and has correct href
  3. Verify Facebook link is present and has correct href
  4. Verify Twitter link is present and has correct href
  5. Verify YouTube link is present and has correct href
  6. Hover over each social media link
  7. Verify link styling changes on hover

**Expected Results:**
  - All four social media links are present
  - LinkedIn URL is correct: https://www.linkedin.com/company/orangehrm/mycompany/
  - Facebook URL is correct: https://www.facebook.com/OrangeHRM/
  - Twitter URL is correct: https://twitter.com/orangehrm?lang=en
  - YouTube URL is correct: https://www.youtube.com/c/OrangeHRMInc
  - Links have proper cursor pointer styling
  - Links are hoverable and responsive

#### 6.3. Verify footer information display

**File:** `tests/login/ui/footer_information.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Verify version number 'OrangeHRM OS 5.8' is displayed
  3. Verify copyright year range '© 2005 - 2026' is visible
  4. Verify 'OrangeHRM, Inc' link is present with correct href
  5. Verify copyright text 'All rights reserved.' is visible
  6. Click on OrangeHRM, Inc link
  7. Verify link opens correctly

**Expected Results:**
  - Version information is accurately displayed
  - Copyright notice includes correct year range
  - OrangeHRM company link is present with href: http://www.orangehrm.com
  - All legal/footer text is visible and properly formatted
  - Link opens in browser without errors

#### 6.4. Verify Forgot Password link

**File:** `tests/login/ui/forgot_password_link.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Locate 'Forgot your password?' link
  3. Verify link is clickable
  4. Click on 'Forgot your password?' link
  5. Observe page navigation

**Expected Results:**
  - Link is visible and clearly identifiable
  - Link text displays as 'Forgot your password?'
  - Link has cursor pointer styling
  - Clicking the link navigates to password recovery page or similar
  - Link is functional and not broken

#### 6.5. Verify OrangeHRM logo presence

**File:** `tests/login/ui/orangehrm_logo.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Verify OrangeHRM logo image is present
  3. Verify logo has alt text 'orangehrm-logo'
  4. Verify logo is positioned correctly on the page

**Expected Results:**
  - Logo image is visible
  - Logo has proper alt text for accessibility
  - Logo is positioned in appropriate location
  - Logo maintains proper aspect ratio

### 7. Form Behavior and User Interaction

**Seed:** `tests/seed.spec.ts`

#### 7.1. Test input field focus and tab navigation

**File:** `tests/login/behavior/tab_navigation.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Verify initial focus state
  3. Tab to Username field
  4. Verify Username field is focused (active state visible)
  5. Tab to Password field
  6. Verify Password field is focused
  7. Tab to Login button
  8. Verify Login button is focused
  9. Verify Shift+Tab navigates backwards through fields

**Expected Results:**
  - Tab navigation works in logical order
  - Username field is first focusable element
  - Password field is second focusable element
  - Login button is third focusable element
  - Focus states are clearly visible
  - Backward tab navigation works correctly
  - All focusable elements are accessible via keyboard

#### 7.2. Test password field masking

**File:** `tests/login/behavior/password_masking.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Click on Password input field
  3. Enter password 'admin123'
  4. Verify password characters are masked with dots or asterisks
  5. Observe that actual password text is not visible
  6. Check if password reveal toggle button exists
  7. If toggle exists, click to reveal password

**Expected Results:**
  - Password field masks input characters
  - Masked characters are displayed instead of actual text
  - Security best practice is maintained
  - If password reveal toggle exists, it functions correctly
  - Password can be toggled between masked and visible state

#### 7.3. Test Login button disable/enable state

**File:** `tests/login/behavior/button_state.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Observe Login button initial state
  3. Click Login button without entering credentials
  4. Observe button behavior and response time
  5. Enter valid credentials
  6. Verify button remains enabled and clickable
  7. Click Login button to submit form

**Expected Results:**
  - Login button is always enabled (or only disabled during submission)
  - Button has proper hover and active states
  - Button cursor changes to pointer on hover
  - Button provides visual feedback on interaction
  - Button submission works correctly

#### 7.4. Test form submission with Enter key

**File:** `tests/login/behavior/enter_key_submission.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Enter 'Admin' in Username field
  3. Enter 'admin123' in Password field
  4. Press Enter/Return key instead of clicking Login button
  5. Wait for form submission

**Expected Results:**
  - Form submission is triggered by Enter key
  - User is logged in successfully
  - Page redirects to dashboard
  - Enter key submission works same as button click

#### 7.5. Test field value retention on validation error

**File:** `tests/login/behavior/value_retention.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Enter 'InvalidUser' in Username field
  3. Enter 'wrongpass' in Password field
  4. Click Login button
  5. Observe error message appearance
  6. Check if username and password values are retained in fields

**Expected Results:**
  - Error message appears on invalid login attempt
  - Username field retains entered value
  - Password field retains entered value (masked)
  - User can easily correct the mistake and retry
  - Form does not clear on error (improves user experience)

#### 7.6. Test clearing fields and re-entering credentials

**File:** `tests/login/behavior/field_clearing.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Enter 'InvalidUser' in Username field
  3. Enter 'wrongpass' in Password field
  4. Clear Username field using Ctrl+A and Delete
  5. Enter 'Admin' in Username field
  6. Clear Password field
  7. Enter 'admin123' in Password field
  8. Click Login button

**Expected Results:**
  - Fields can be easily cleared of text
  - New values can be entered after clearing
  - Form submission works after field modifications
  - User can successfully log in after correcting mistakes

### 8. Browser Compatibility and Responsive Design

**Seed:** `tests/seed.spec.ts`

#### 8.1. Test responsive design on mobile viewport

**File:** `tests/login/responsive/mobile_viewport.spec.ts`

**Steps:**
  1. Set viewport to mobile size (375x667)
  2. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  3. Verify all elements are visible without horizontal scrolling
  4. Verify input fields are appropriately sized for touch input
  5. Verify Login button is easily clickable on mobile
  6. Test login functionality on mobile viewport
  7. Enter valid credentials and submit

**Expected Results:**
  - Layout is responsive and adapts to mobile viewport
  - All elements fit within mobile screen without horizontal scroll
  - Input fields are large enough for touch interaction
  - Button is appropriately sized for touch targets (minimum 44x44px)
  - Form is fully functional on mobile
  - Login succeeds on mobile viewport

#### 8.2. Test responsive design on tablet viewport

**File:** `tests/login/responsive/tablet_viewport.spec.ts`

**Steps:**
  1. Set viewport to tablet size (768x1024)
  2. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  3. Verify all elements are visible and properly aligned
  4. Test input field interactions
  5. Test Login button functionality
  6. Verify spacing and layout on tablet size

**Expected Results:**
  - Layout is appropriate for tablet size
  - Elements are properly aligned and spaced
  - Form remains fully functional
  - All elements are easily interactive on tablet

#### 8.3. Test page zoom functionality

**File:** `tests/login/responsive/zoom_functionality.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Set page zoom to 150%
  3. Verify all elements are still visible
  4. Set page zoom to 200%
  5. Verify form remains usable with horizontal scroll if needed
  6. Enter credentials and test login functionality
  7. Reset zoom to 100%

**Expected Results:**
  - Page is accessible at different zoom levels
  - Elements scale proportionally
  - Form remains functional when zoomed
  - No critical elements are cut off or hidden

### 9. Security and Privacy Validation

**Seed:** `tests/seed.spec.ts`

#### 9.1. Verify HTTPS protocol usage

**File:** `tests/login/security/https_protocol.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Verify page URL starts with 'https://'
  3. Check browser security indicator (lock icon)
  4. Verify no mixed content warnings appear
  5. Open browser console and check for security errors

**Expected Results:**
  - Page uses HTTPS protocol for secure communication
  - Browser displays security lock icon
  - No mixed content (HTTP resources loaded over HTTPS) is present
  - Console shows no security-related errors or warnings

#### 9.2. Verify no sensitive information in URL parameters

**File:** `tests/login/security/url_parameters.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Enter 'Admin' in Username field
  3. Enter 'admin123' in Password field
  4. Click Login button
  5. Observe URL in address bar after submission
  6. Verify credentials are not visible in URL

**Expected Results:**
  - URL does not contain username or password parameters
  - Credentials are not exposed in query string
  - Form uses POST method for secure credential transmission
  - No sensitive data leakage through URL

#### 9.3. Verify password is not stored in browser history

**File:** `tests/login/security/browser_history.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Enter 'Admin' in Username field
  3. Enter 'admin123' in Password field
  4. Submit login form
  5. Return to login page using browser back button
  6. Observe if password field contains previous password value

**Expected Results:**
  - Password field is empty when returning to login page
  - Password is not stored in browser history or autocomplete
  - Security best practice is maintained
  - Sensitive credentials are properly cleared

#### 9.4. Verify no password in page source or console

**File:** `tests/login/security/page_source.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Enter 'admin123' in Password field
  3. Right-click on page and view page source
  4. Search for 'admin123' in source code
  5. Open browser console
  6. Verify password is not logged in console messages

**Expected Results:**
  - Password is not visible in page source code
  - Password is not hardcoded anywhere in HTML
  - Browser console does not contain password values
  - No password data leakage through browser developer tools

### 10. Error Handling and Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 10.1. Test page behavior with network disconnection

**File:** `tests/login/edge_cases/network_error.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Enter 'Admin' in Username field
  3. Enter 'admin123' in Password field
  4. Simulate network disconnection in browser developer tools
  5. Click Login button
  6. Observe error handling and user feedback

**Expected Results:**
  - Application gracefully handles network error
  - User receives appropriate error message
  - Form remains usable and user can retry
  - No page crash or unexpected behavior occurs

#### 10.2. Test page behavior after session timeout

**File:** `tests/login/edge_cases/session_timeout.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Enter 'Admin' in Username field
  3. Enter 'admin123' in Password field
  4. Wait for significant time (simulate session expiry)
  5. Click Login button
  6. Observe page response

**Expected Results:**
  - Application handles session timeout appropriately
  - User receives feedback about timeout
  - Form can be resubmitted
  - No data loss or security vulnerabilities

#### 10.3. Test back button behavior on login page

**File:** `tests/login/edge_cases/back_button.spec.ts`

**Steps:**
  1. Visit another website first (e.g., google.com)
  2. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  3. Click browser back button
  4. Verify page behavior

**Expected Results:**
  - Back button navigates to previous website
  - Login page functionality is not affected by back navigation
  - No unintended side effects from back button action

#### 10.4. Test browser refresh on login page

**File:** `tests/login/edge_cases/page_refresh.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Enter 'Admin' in Username field
  3. Enter 'admin123' in Password field
  4. Press F5 or Ctrl+R to refresh page
  5. Observe if form data persists

**Expected Results:**
  - Page reloads successfully
  - Form retains or clears entered values (check normal behavior)
  - Page functionality is not affected by refresh
  - All elements reload properly

### 11. Accessibility Testing

**Seed:** `tests/seed.spec.ts`

#### 11.1. Test form labels and accessibility

**File:** `tests/login/accessibility/form_labels.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Verify Username field has associated label
  3. Verify Password field has associated label
  4. Use screen reader (NVDA/JAWS) to read form elements
  5. Verify all form elements are properly labeled and announced

**Expected Results:**
  - Form fields have proper labels
  - Labels are correctly associated with input fields
  - Screen reader announces field names clearly
  - Accessibility standards (WCAG) are met

#### 11.2. Test keyboard-only navigation and form usage

**File:** `tests/login/accessibility/keyboard_navigation.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Use only keyboard (Tab, Shift+Tab, Arrow keys) to navigate form
  3. Tab through all interactive elements
  4. Use Tab to navigate to Username field
  5. Type username using keyboard
  6. Tab to Password field and enter password
  7. Tab to Login button
  8. Press Space or Enter to activate Login button
  9. Complete login using only keyboard

**Expected Results:**
  - All form elements are keyboard accessible
  - Tab order is logical and sequential
  - All buttons and links are activatable via keyboard
  - Form can be completely filled and submitted via keyboard
  - No keyboard traps exist
  - User can successfully log in without mouse

#### 11.3. Test color contrast for readability

**File:** `tests/login/accessibility/color_contrast.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Use color contrast analyzer tool
  3. Check contrast ratio of text labels against background
  4. Check contrast ratio of link text ('Forgot your password?') against background
  5. Check contrast ratio of button text against button background
  6. Verify all contrast ratios meet WCAG AA standard (minimum 4.5:1 for text)

**Expected Results:**
  - All text has sufficient color contrast
  - Contrast ratios meet WCAG AA minimum standards
  - Text is readable by users with color blindness or low vision
  - Form labels and instructions are clearly visible

#### 11.4. Test error messages accessibility

**File:** `tests/login/accessibility/error_messages_accessible.spec.ts`

**Steps:**
  1. Navigate to https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  2. Click Login with empty fields
  3. Verify 'Required' validation messages appear
  4. Use screen reader to read validation messages
  5. Verify messages are properly announced and associated with fields
  6. Enter invalid credentials and submit
  7. Verify 'Invalid credentials' error is announced by screen reader

**Expected Results:**
  - Validation error messages are announced by screen readers
  - Error messages are logically associated with form fields
  - Users with assistive technology receive error feedback
  - Error messages are clearly visible on the page
