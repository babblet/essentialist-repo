Feature: Create Student

  As an administrator
  I want to create a student
  So that they can be enrolled in a class

  Scenario: Successfully create a student
    Given I want to add a student
    When I send a request to create a student
    Then the student should be created successfully

  Scenario: Fail to create a student with an already existing email
    Given There is a student with an already existing email
    When I send a request to create a student with the existing email
    Then the student should not be created successfully


