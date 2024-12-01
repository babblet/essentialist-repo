Feature: Submit student assignment

  As a student
  I want to submit an assignment
  So that the teacher can grade it

  Scenario: Submit assignment
    Given there is a student
    And there is a class
    And there is an assignment
    And the student is enrolled in the class
    And the student has been given the assignment
    When the student submits the assignment
    Then the assignment is submitted successfully

  Scenario: Submit assignment that has already been submitted
    Given there is a student
    And there is a class
    And there is an assignment
    And the student is enrolled in the class
    And the student has been given the assignment
    And the student submits the assignment
    When the student submits the assignment again
    Then the assignment submission fails

  Scenario: Fail to submit assignment when students assignment does not exist
    Given there is a student
    And there is a class
    And there is an assignment
    And the student is enrolled in the class
    When the student submits the assignment
    Then the assignment submission fails


