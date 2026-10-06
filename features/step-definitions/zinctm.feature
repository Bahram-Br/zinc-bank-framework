@zinctm
Feature: zincTM login and dashboard

    @smoke @positive
    Scenario: Login successfully and show the dashboard
        Given I am on the login zincTM page
        When I am logging with valid credentials
        Then I should see zincTM dashboard
