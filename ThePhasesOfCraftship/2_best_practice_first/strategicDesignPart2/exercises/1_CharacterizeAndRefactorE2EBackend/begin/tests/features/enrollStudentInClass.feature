Feature: Enroll Student In Class

  Scenario: Enroll student in class
    Given there is a student
    And there is a class
    When the student enrolls in the class
    Then the student is enrolled in the class

  Scenario: Fail to enroll non existent student
    Given there is a class
    When a non existent student enrolls in the class
    Then the enrollment should fail

  Scenario: Fail to enroll student in class with an already enrolled student
    Given there is a student
    And there is a class
    And the student is already enrolled in the class
    When the student enrolls in the class
    Then the enrollment should fail
    And the student should still be enrolled in the class