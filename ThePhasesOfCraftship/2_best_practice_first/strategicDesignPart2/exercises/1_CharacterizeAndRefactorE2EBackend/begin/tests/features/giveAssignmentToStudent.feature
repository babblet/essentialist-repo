Feature: Give assignment to student

  As a teacher
  I want to give an assignment to a student
  So that the student has work to do

  Scenario: Give assignment to student
    Given there is a student
    And there is a class
    And there is an assignment
    And the student is enrolled in the class
    When the teacher gives an assignment to the student
    Then the assignment is created successfully

  Scenario: Student does not exist
    Given there is a class
    And there is an assignment
    And there is an inexistent student
    When the teacher gives an assignment to a non-existent student
    Then the assignment creation fails

  Scenario: Assignment does not exist
    Given there is a student
    And there is a class
    And the student is enrolled in the class
    And there is a non-existent assignment
    When the teacher gives a non-existent assignment to the student
    Then the assignment creation fails

  Scenario: Student is not enrolled
    Given there is a student
    And there is a class
    And there is an assignment
    And the student is not enrolled in the class
    When the teacher gives an assignment to the student
    Then the assignment creation fails

  Scenario: Give already assigned assignment to student
    Given there is a student
    And there is a class
    And there is an assignment
    And the student is enrolled in the class
    And the teacher gives an assignment to the student
    When the teacher gives the same assignment to the student
    Then the assignment creation fails