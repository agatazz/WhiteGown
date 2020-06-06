
import { browser, by, element } from 'protractor';


describe('/bookings without logging in', () => {
    browser.driver.get('http://localhost:8100/bookings');
    //paste correct url
    it('bookings is not available without logging in',function(){
      var currentUrl=browser.driver.getCurrentUrl();
      expect(currentUrl).toMatch('/auth');
  
  
    });
});