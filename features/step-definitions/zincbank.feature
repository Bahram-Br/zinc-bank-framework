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

    @ztm1 @known-bug
    Scenario: Transfer above available balance is rejected with INSUFFICIENT_FUNDS
        Given I am on the zinc bank login page
        When I login to zinc bank with my sandbox credentials
        And I note the checking account balance and the savings account balance
        And I submit a transfer of the checking account balance plus $0.01 to the savings account
        Then I should see insufficient funds error message
        And I should see the checking account balance and the savings account balance remain unchanged

    @ztm8
    Scenario: Listed owned accounts are correct
        Given I am on the zinc bank login page
        When I login to zinc bank with the Casey test account
        And I open the accounts page
        Then I should see the accounts listed below
            | Account Type | Account Number | Balance     |
            | Checking     | ••2439         | <any>       |
            | Savings      | ••2440         | <any>       |

    @ztm4
    Scenario: Signing up with an already-registered email is rejected
        Given I am on the zinc bank sign-up page
        When I sign up as "Casey" "Zinc" with the registered Casey email and password "NewPassw0rd!"
        Then I should see an error message indicating the email is already registered
        And I should still be on the sign-up page

    @ztm9
    Scenario: Dashboard "Move Money" shortcut opens the Move Money page
        Given I am on the zinc bank login page
        When I login to zinc bank with valid credentials
        And I click Move Money button on dashboard
        Then I should see Move Money page

    @ztm10
    Scenario: Dashboard total balance equals the sum of all account balances
        Given I am on the zinc bank login page
        When I login to zinc bank with valid credentials
        Then the total balance should equal the sum of all account balances

    @ztm24
    Scenario: Credit card shows on dashboard
        Given I am on the zinc bank login page
        When I login to zinc bank with valid credentials
        Then I should see a credit card listed on the dashboard

    @ztm7
    Scenario: Account detail shows payment details
        Given I am on the zinc bank login page
        When I login to zinc bank with valid credentials
        And I open the account detail page for the checking account
        Then I should see the payment details for the checking account
    
    @ztm26
    Scenario: Dashboard Recent Activity shows the signed-in user's recent transactions
        Given I am on the zinc bank login page
        When I login to zinc bank with valid credentials
        Then I should see at least one recent activity listed on the dashboard

    @ztm2 
    Scenario: Sign up with valid details creates a ready-to-use account
        Given I am on the zinc bank sign-up page
        When I sign up with a unique email and valid user details
        Then I should see the zinc bank dashboard
        And I should see a Checking account and a Savings account are visible, each with a $0.00 balance.
        