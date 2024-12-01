Feature: Get all student submitted assignments

  As a teacher
  I want to get all student submitted assignments
  So that I can grade them

  Scenario: Successfully get all student submitted assignments
    Given I am a student
    And I want to get all my submitted assignments
    When I send a request to get all student submitted assignments
    Then I should see all the student submitted assignments

  Scenario: Fail to get all student submitted assignments for non existent student
    Given I want to get all submitted assignments, but the student does not exist
    When I send a request to get all student submitted assignments for a non existent student
    Then I should not see any student submitted assignments