
import { browser, by, element } from 'protractor';


describe('/dresses without logging in', () => {
    browser.driver.get('http://localhost:8100/dresses');
    //paste correct url
    it('exploring dresses is not available without logging in',function(){
      var currentUrl=browser.driver.getCurrentUrl();
      expect(currentUrl).toMatch('/auth');
  
  
    });
});