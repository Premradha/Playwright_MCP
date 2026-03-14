Feature: OrangeHRM Login Page

  Background:
    Given I navigate to OrangeHRM login page

  @LOGIN_POSITIVE
  Scenario: Successful login with valid credentials
    When I enter "Admin" in the Username field
    And I enter "admin123" in the Password field
    And I click the Login button
    Then I should be redirected to the dashboard
    And the dashboard page should display
