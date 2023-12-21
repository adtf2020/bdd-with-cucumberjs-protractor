import { Given, Then, When } from "cucumber";
import { Todos } from "../tests/Todos";
import { expect } from 'chai';

const todos = new Todos;

When('I submit a todo {string}', async (todo: string) => {
  await todos.submit(todo);
});

When('I remove a todo {int}', async (todoNumber: number) => {
  let isPresent = await todos.hasRemoveButton(todoNumber);
  expect(isPresent).equal(true);
  await todos.remove(todoNumber);
});

Then('a new todo {int} should be created being {string}', async (todoNumber: number, expectedDescription: string) => { 
  let actualDescription = await todos.getDescription(todoNumber);
  expect(actualDescription).contain(expectedDescription);
  let isSelected = await todos.isCompleted(todoNumber);
  expect(isSelected).equal(false);
});

Given('an existing todo {int} being {string}', async (todoNumber: number, description: string) => {
  await todos.submit(description);
  let actualDescription = await todos.getDescription(todoNumber);
  expect(actualDescription).contain(description);
});

When('I complete the todo {int}', async (todoNumber: number) => {
  await todos.complete(todoNumber);
});

Then('the todo {int} should be completed', async (todoNumber: number) => {
  let isSelected = await todos.isCompleted(todoNumber);
  expect(isSelected).equal(true);
});

Then('the todo {int} should be uncompleted', async (todoNumber: number) => {
  let isSelected = await todos.isCompleted(todoNumber);
  expect(isSelected).equal(false);
});

Then('the todo {int} should be deleted', async (todoNumber: number) => {
  const isPresent = await todos.hasTodo(todoNumber)
  expect(isPresent).equal(false);
});

Then('the todo {int} should not be categorized', async (todoNumber: number) => {
  const isPresent = await todos.hasCategory(todoNumber)
  expect(isPresent).equal(false);
});

When('I submit a {string} todo {string}', async (category: string, description: string) => {
  await todos.selectCatagory(category);
  await todos.submit(description);
});

Then('the todo {int} should be {string}', async (todoNumber: number, expectedCategory: string) => {
  let actualCategory = await todos.getCategory(todoNumber);
  expect(actualCategory).contain(todos.categories[expectedCategory]);
});

Given('an existing {string} todo {int} being {string}', async (category: string, todoNumber: number, description: string) => {
  await todos.selectCatagory(category);
  await todos.submit(description);
  let actualDescription = await todos.getDescription(todoNumber);
  expect(actualDescription).contain(description);
});

Given('I must see {int} todos', async (todoNumber: number) => {
 let result =  todos.shouldSeeFourTodos(todoNumber);
  expect(todoNumber).contain(result);
});



Then('I should see {int} being {string} todos', async (todoNumber: number, category: string) =>  {
  let result = todos.shouldSeeTodosNumber(todoNumber);
  expect(todoNumber).contain(result);
  let result1 = todos.shouldSeeTodosCategory();
});

When('I check the private category', async () => {
  await todos.selectPrivate();
});

When('I check the professional category', async () => {
  await todos.selectProfasional();

});


When('I check all categories', async () =>  {
  todos.selectTout();
  
});
