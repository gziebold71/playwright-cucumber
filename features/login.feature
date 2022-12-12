Feature: Login page

#  @demo
  Scenario: When users enters a valid formatted email address and clicks the Sell Offsets button they don't see helper text
    Given on the login page I enter the email address of 'test@example.com'
    When on the login page I tap the Sell Offsets button
    Then on the login page I do not see the helper error message

#  @demo
  Scenario: When users enters an invalid formatted email address and clicks the Sell Offsets button they see helper text
    Given on the login page I enter the email address of 'test'
    When on the login page I tap the Sell Offsets button
    Then on the login page I see the helper error message
