Feature: Enroll Student In Class

  Scenario: Enroll student in class
    Given there is a student
    And there is a class
    When the student enrolls in the class
    Then the student is enrolled in the class