Feature: Get offsets

  @demo
  Scenario: I run a query to return listed offsets from Exchange db
    Given I select "*" from "public.offset" table where "token_id" "=" "'0.0.49080034'" and "serial_number" "=" "'3'"
    Then I verify that the "owner_id" from the database is "0.0.49080808"

