Feature: Get student grades

  As a teacher
  I want to get student grades
  So that I can see how they are doing

  Scenario: Successfully get student grades
    Given there is a student
    And the student has grades
    When I send a request to get student grades
    Then I should see the student grades

  Scenario: Fail to get student grades for a student that does not exist
    Given there is no student
    When I send a request to get student grades
    Then I should not see the student grades