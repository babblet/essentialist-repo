Feature: Get all assignments for class

  As an teacher
  I want to get all assignments for a class
  So that I can view the assignments

  Scenario: Successfully get all assignments for a class
    Given I have a class
    And there are assignments for the class
    When I get all assignments for the class
    Then the response should be successful

  Scenario: Fail to get all assignments for a non existing class
    Given I have a non existing class
    When I get all assignments for the class
    Then the response should be unsuccessful