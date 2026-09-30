@zincbank
Feature: zinc bank login and dashboard

    @smoke @positive
    Scenario: Login successfully with valid credentials shows to user
        Given I am on the zinc bank login page
        When I login to zinc bank with valid credentials
        Then I should see the zinc bank dashboard

    @negative
    Scenario: Login unsuccessfully with invalid credentials shows error to user
        Given I am on the zinc bank login page
        When I login to zinc bank with invalid credentials
        Then I should see an error message indicating invalid login