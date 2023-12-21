
Feature: Todos

   Scenario: I can add a todo
      When I submit a todo "Adopter de bonnes pratiques de test"
      Then a new todo 1 should be created being "Adopter de bonnes pratiques de test"

   Scenario: I can complete one of several todos
      Given an existing todo 1 being "Adopter de bonnes pratiques de test"
      And an existing todo 2 being "Comprendre le Keyword-Driven Testing"
      And an existing todo 3 being "Automatiser des cas de test avec Robot Framework"
      When I complete the todo 2
      Then the todo 2 should be completed
      And the todo 1 should be uncompleted
      And the todo 3 should be uncompleted

   Scenario: I can remove a todo
      Given an existing todo 1 being "Choisir le bon type de framework de test"
      When I remove a todo 1
      Then the todo 1 should be deleted

   Scenario: I can categorize some todos
      When I submit a todo "Choisir un livre intéressant"
      Then the todo 1 should not be categorized
      When I submit a "private" todo "Marcher et faire du vélo avec mon chien"
      Then the todo 2 should be "private"
      When I submit a todo "Faire un câlin avec mon chat"
      Then the todo 3 should be "private"
      When I submit a "professional" todo "Automatiser un cas de test de plus"
      Then the todo 4 should be "professional"

   Scenario: I can read only one category of todos
      Given an existing todo 1 being "Écrire un livre"
      Given an existing "professional" todo 2 being "Réaliser un spike de test"
      Given an existing "private" todo 3 being "Tapisser le mur du salon"
      Given an existing "professional" todo 4 being "Évaluer un framework de développement de test"
      Given I must see 4 todos
      When I check the private category
      Then I should see 1 being "private" todos
      When I check the professional category
      Then I should see 4 being "professional" todos
      When I check all categories
      Then I must see 4 todos   