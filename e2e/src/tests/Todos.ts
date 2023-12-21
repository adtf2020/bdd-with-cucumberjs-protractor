import { expect } from 'chai';
import { browser, by, element } from 'protractor';
export class Todos {

    /* Variables  */
    categories = {
        private: "Personnel",
        professional: "Professionnel"
    };

    /* Methods */
    async remove(todoNumber: number) {
        let removeButtonElement = element(by.xpath("//*[@data-id='todo-" + todoNumber + "']")).element(by.xpath("//button[@data-id='button.remove_todo-1']"));
        return removeButtonElement.click();
    }

    async submit(todo: string) {
        browser.manage().timeouts().implicitlyWait(300);
        await element(by.xpath("//input[@data-id='input.text.description']")).sendKeys(todo);
        await element(by.xpath("//button[@type='submit']")).click();
    }

    async getDescription(todoNumber: number) {
        return await element(by.xpath("//*[@data-id='todo-" + todoNumber + "']")).getText();
    }

    async getCategory(todoNumber: number) {
        return await element(by.xpath("//*[@data-id='text.todo_category-" + todoNumber + "']")).getText();
    }

    async hasCategory(todoNumber: number) { 
        let todo = element(by.xpath("//*[@data-id='text.todo_category-" + todoNumber + "']"));
        return await todo.isPresent();
    }

    async hasRemoveButton(todoNumber: number) {
        let removeButtonElement = element(by.xpath("//li[@data-id='todo-" + todoNumber + "']")).element(by.xpath("//button[@data-id='button.remove_todo-1']"));
        return await removeButtonElement.isPresent();
    }

    async hasTodo(todoNumber: number) { 
        let todo = element(by.xpath("//li[@data-id='todo-" + todoNumber + "']"));
        return await todo.isPresent();
    }

    async isCompleted(todoNumber: number) {
        return await element(by.xpath("//input[@data-id='input.checkbox.done-" + todoNumber + "']")).isSelected();
    }

    async complete(todoNumber: number) {
        await element(by.xpath("//input[@data-id='input.checkbox.done-" + todoNumber + "']")).click();
    }

    async selectCatagory(catagory: string) {
        await element(by.xpath("//select[@data-id='select.category']")).click();
        await element(by.css('option[value=' + this.categories[catagory] + ']')).click();
    }
    
    
    async shouldSeeFourTodos(todoNumber: number) {
    let result = 0;
    for (let pas = 1; pas < todoNumber+1; pas++) {
        await element(by.xpath('//li[@data-id="todo-' + pas + '"]')).findElement;
        result++;
    }
    return result;
    }

    async shouldSeeTodosNumber(todoNumber: number) {
        const elements = element.all(by.css(`input[type='checkbox']`));
        const count = await elements.count();
        return count;       
    }
    
    async shouldSeeTodosCategory() {
        let elements = element(by.xpath(`//span[contains(@data-id, 'text.todo_category')]`)).getText();
        return elements;       
    }

    async selectPrivate(){
        element(by.xpath("//input[@data-id='input.radio.category_Personnel']")).click();
    } 

    async selectProfasional(){
        element(by.xpath("//input[@data-id='input.radio.category_Professionnel']")).click();
    }

    async selectTout(){
        element(by.xpath("//input[@data-id='input.radio.category_Tout']")).click();
    }
    

}