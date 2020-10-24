const { Before, AfterAll } = require('cucumber');
import { browser } from 'protractor';
import { config } from '../../protractor.conf.js';

Before({ timeout: 100 * 1000 }, async () => {
   browser.get(config.baseUrl);
});

AfterAll({ timeout: 600 * 1000 }, async () => {
   browser.driver.quit();
});