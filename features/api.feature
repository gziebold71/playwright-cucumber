Feature: Get offsets

#  @demo
  Scenario: verify that a valid GET request to offsets returns a 200 and the correct account and list type for UNLISTED offsets
    Given make a GET request for "offsets?account_id=0.0.47879120&list_state=UNLISTED"
    Then Verify the response status code is '200'
    And I verify that all returned offsets are of type "UNLISTED"
