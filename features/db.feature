Feature: Get offsets

  @demo
  Scenario: I run a query to return listed offsets from Exchange db
    Given I select "*" from "listed_offsets" table where "token_id" "=" "'0.0.48243577'" and "serial_number" "=" "'3'"
    Then I verify that the "retail_price" from the database is "214"

