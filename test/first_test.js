describe('my first test', function () {
    this.slow(300);
    it('should take less than 500ms', function(done){
        setTimeout(done, 500)
      });
    
      it('should take less than 500ms as well', function(done){
        setTimeout(done, 250);
      });
    
      it('should take less than 500ms as well', function(done){
        setTimeout(done, 2);
      });
});

describe('what does this do?', function () {
    it('does nothing yet');
});