Feature: Get offsets

  @demo @nobrowser
  Scenario: verify that a valid GET request to offsets returns a 200 and the correct limit
    Given make a GET request for "/api/offsets/unlisted?limit=17"
    Then Verify the response status code is '200'
    And I verify that "17" offsets are returned
