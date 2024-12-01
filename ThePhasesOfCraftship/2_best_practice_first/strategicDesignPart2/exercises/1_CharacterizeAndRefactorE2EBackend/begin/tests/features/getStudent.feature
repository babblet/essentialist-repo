Feature: Get student

  As an administrator
  I want to get a student's information
  So that I can view the student

  Scenario: Successfully get a student
    Given a student exists
    When I try to get the student
    Then the response should be successful

  Scenario: Fail to get a student that does not exist
    Given a student does not exist
    When I try to get the student
    Then the response should be unsuccessful