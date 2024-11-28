Feature: Create an Assignment

  As an teacher
  I want to create an assignment
  So that I can assign it to students

  Scenario: Successfully create an assignment
    Given I have a class
    When I create an assignment
    Then I should see the assignment in the class