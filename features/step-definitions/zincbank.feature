@zincbank
Feature: zinc bank login and dashboard

    @smoke @positive
    Scenario: Login successfully with valid credentials shows to user
        Given I am on the zinc bank login page
        When I login to zinc bank with username "casey@zinc.test" and password "Passw0rd!"
        Then I should see the zinc bank dashboard

    @negative
    Scenario: Login unsuccessfully with invalid credentials shows error to user
        Given I am on the zinc bank login page
        When I login to zinc bank with invalid credentials
        Then I should see an error message indicating invalid login

    @ztm1
    Scenario: Transfer above available balance is rejected with INSUFFICIENT_FUNDS
        Given I am on the zinc bank login page
        When I login to zinc bank with username "casey@zinc.test" and password "Passw0rd!"
        And I note the checking account balance and the savings account balance
        And I submit a transfer of the checking account balance plus $0.01 to the savings account
        Then I should see insufficient funds error message
        And I should see the checking account balance and the savings account balance remain unchanged

    @ztm6
    Scenario: Listed owned accounts are correct
        Given I am on the zinc bank login page
        When I login to zinc bank with username "casey@zinc.test" and password "Passw0rd!"
        And I open the accounts page
        Then I should see the accounts listed below
            | Account Type | Account Number | Balance     |
            | Checking     | ••0001         | $8,992.44   |
            | Savings      | ••0002         | $25,000.00  |