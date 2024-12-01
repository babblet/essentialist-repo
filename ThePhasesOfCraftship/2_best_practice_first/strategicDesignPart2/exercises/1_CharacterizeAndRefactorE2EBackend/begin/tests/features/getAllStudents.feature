Feature: Get all students

  As an Administator
  I want to see all students in the system
  So that I know what students there are in the system

  Scenario: Look up all users
    Given there are students in the system
    When I get all students
    Then I should see all students in the system
