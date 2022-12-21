Feature: Get offsets

  @demo @nobrowser
  Scenario: verify that a valid GET request to offsets returns a 200 and the correct limit
    Given make a GET request for "/offsets/unlisted?limit=17&order=desc&page=1"
    Then Verify the response status code is 200
    And I verify that 17 offsets are returned

  @demo @nobrowser
  Scenario: verify that a invalid GET request to offsets returns a 400 and the correct limit
    Given make a GET request for "/offsets/unlisted?limit=abc"
    Then Verify the response status code is 400
    And I verify that API error code is 1003 with the message of "Invalid data: limit"

    When make a GET request for "/offsets/unlisted?page=abc"
    Then Verify the response status code is 400
    And I verify that API error code is 1003 with the message of "Invalid data: page"

    When make a GET request for "/offsets/unlisted?order=abc"
    Then Verify the response status code is 400
    And I verify that API error code is 1003 with the message of "Invalid data: order"

    Given make a GET request for "/offsets/unlisted?limit=0"
    Then Verify the response status code is 400
    And I verify that API error code is 1003 with the message of "Invalid data"

    When make a GET request for "/offsets/unlisted?page=-5"
    Then Verify the response status code is 400
    And I verify that API error code is 1003 with the message of "Invalid data"

