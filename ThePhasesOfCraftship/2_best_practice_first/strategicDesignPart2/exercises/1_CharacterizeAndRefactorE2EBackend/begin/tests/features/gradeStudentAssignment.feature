Feature: Grade Student Assignment

  As a teacher
  I want to grade a student's assignment
  So that the student can see their grade

  Scenario: Grade assignment
    Given there is a student
    And there is a class
    And the student is enrolled in the class
    And the there is an assignment
    And the student has been assigned the assignment
    And the student has submitted the assignment
    When the teacher grades the assignment
    Then the grading is successful

  Scenario: Grade assignment when assignment already graded
    Given there is a student
    And there is a class
    And the student is enrolled in the class
    And the there is an assignment
    And the student has been assigned the assignment
    And the student has submitted the assignment
    And the assignment has already been graded
    When the teacher grades the assignment
    Then the grading is unsuccessful

  Scenario: Grade assignment with invalid grade
    Given there is a student
    And there is a class
    And the student is enrolled in the class
    And the there is an assignment
    And the student has been assigned the assignment
    And the student has submitted the assignment
    When the teacher grades the assignment with an invalid grade
    Then the grading is unsuccessful

  Scenario: Grade non submitted assignment
    Given there is a student
    And there is a class
    And the student is enrolled in the class
    And the there is an assignment
    And the student has been assigned the assignment
    And the student has not submitted the assignment
    When the teacher grades the assignment
    Then the grading is unsuccessful

  Scenario: Grade assignment with non existent student
    Given there is not a student
    And there is a class
    And the there is an assignment
    When the teacher grades the assignment for a non existent student
    Then the grading is unsuccessful

  Scenario: Grade assignment with non existent Assignment
    Given there is a student
    And there is a class
    And the student is enrolled in the class
    And the there is not an assignment
    When the teacher grades the assignment for a non existing assignment
    Then the grading is unsuccessful



