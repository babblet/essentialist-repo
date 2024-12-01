Feature: Get Assignment

  As an administrator
  I want to get an assignment's information
  So that I can view the assignment

  Scenario: Successfully get an assignment
    Given an assignment exists
    When I try to get the assignment
    Then the response should be successful

  Scenario: Fail to get an assignment that does not exist
    Given an assignment does not exist
    When I try to get the assignment
    Then the response should be unsuccessful