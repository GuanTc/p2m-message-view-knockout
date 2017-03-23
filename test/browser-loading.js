/**
 * Created by colinhan on 22/03/2017.
 */

var assert = chai.assert;


describe('load browser module', ()=>{
  it('should has the module', ()=> {
    assert.isDefined(p2m.message.view.knockout);
  });
});
