Feature: Login page

  @demo
  Scenario: Unlisted offsets page loads by default unsorted and user is able sort the offset id column
    When I login as user 'test@test.com'
    Then I verify on the unlisted offsets page sorting on the offset id column is 'none'

    When on the unlisted page I click to sort the offset id column
    Then I verify on the unlisted offsets page sorting on the offset id column is "ascending"

    When on the unlisted page I click to sort the offset id column
    Then I verify on the unlisted offsets page sorting on the offset id column is "descending"

  @demo
  Scenario: I can page through the unlisted offsets
    When I login as user 'test@test.com'
    Then I verify on the unlisted page that the unlisted offset previous page button is disabled

    When on the unlisted page I click the unlisted offset next page button
    Then I verify on the unlisted page that the unlisted offset previous page button is enabled
