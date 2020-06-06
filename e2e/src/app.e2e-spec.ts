import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';
import { url } from 'inspector';

describe('When the user starts the app', () => {
  browser.driver.get('http://localhost:8100/auth');
  //paste correct url
  it('automatically the auth page starts',function(){
    var currentUrl=browser.driver.getCurrentUrl();
    expect(currentUrl).toMatch('/auth');


  });
  // it('should sign in',function(){
  //   var userNameFiled=browser.driver.findElement(by.html('email'));
  //   var userPassFiled=browser.driver.findElement(by.name('password'));
  //   var continueField=browser.driver.findElement(by.id('submit'));
  //   userNameFiled.sendKeys('aztest@gmail.com');
  //   userPassFiled.sendKeys('test1234');
  //   continueField.click();
  //    var currentUrl=browser.driver.getCurrentUrl();
  //   expect(currentUrl).toMatch('/dresses/tabs/discover');
     

  // });

  // beforeEach(() => {
  //   page = new AppPage();
  // });

  // it('should display authorization page', () => {
  //   page.navigateTo();
  //   expect(page.getParagraphText()).toContain('E-Mail');
  // });
});
describe('Elements',() =>{
  browser.driver.get('http://localhost:8100/auth');

it('should contain email field',() =>{
  expect(element(by.name('email')).isPresent()).toBe(true);
});
it('should contain password field',() =>{
  expect(element(by.name('password')).isPresent()).toBe(true);
});
it('should contain switch field',() =>{
  expect(element(by.name('switch')).isPresent()).toBe(true);
});
it('should contain continue field',() =>{
  expect(element(by.name('submit')).isPresent()).toBe(true);
});

});