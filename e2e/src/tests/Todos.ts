import { browser, by, element } from 'protractor';
export class Todos {

    /* Variables  */
    categories = {
        private: "Personnel",
        professional: "Professionnel"
    };

    /* Methods */
    async remove(todoNumber: number) {
        let removeButtonElement = await element(by.xpath("//*[@data-id='todo-" + todoNumber + "']")).element(by.xpath("//button[@data-id='button.removetodo']"));
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
        return await element(by.xpath("//*[@data-id='category-" + todoNumber + "']")).getText();
    }

    async hasCategory(todoNumber: number) { 
        let todo = await element(by.xpath("//*[@data-id='category-" + todoNumber + "']"));
        return await todo.isPresent();
    }

    async hasRemoveButton(todoNumber: number) {
        let removeButtonElement = await element(by.xpath("//li[@data-id='todo-" + todoNumber + "']")).element(by.xpath("//button[@data-id='button.removetodo']"));
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
}