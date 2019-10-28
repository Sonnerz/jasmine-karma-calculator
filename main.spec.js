describe('main.js', function () {
  describe('calculate()', function () {
    it('validates expression when first number is invalid', function () {
      // spy for updateResult().
      // first param is object that contains the method we want to spy upon
      // the window object has the method updateResult
      // the real updateResult() will not be called
      spyOn(window, 'updateResult').and.stub(); // and stub means it returns nothing, is the default
      calculate('a + 3'); // run calculate so that spy is called

      expect(window.updateResult).toHaveBeenCalled(); // evaluates if spy called at least once
      expect(window.updateResult).toHaveBeenCalledWith('Expression not recognised'); //param is the actual argument that is expected to be received by the real updateResult()
      expect(window.updateResult).toHaveBeenCalledTimes(1); // number of times it's called
    });

    // main.js has 3 possible cases to test: numberA, numberB & operation
    // (Number.isNaN(numberA) || Number.isNaN(numberB) || operation === null)

    it('validates expression when second number is invalid', function () {
      spyOn(window, 'updateResult'); //.and.stub() is the default
      calculate('3 + a');
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('Expression not recognised');
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    });

    it('validates expression when operation is invalid', function () {
      spyOn(window, 'updateResult');
      calculate('1 $ 3');
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('Expression not recognised');
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    });

    // we can't test calculator in main.js (line 13) because it's an instance of the class Calculator
    // so if we create a spy of calculator it's a different calculator
    // we have to test the class Calculator

    it('calls add', function () {
      const spy = spyOn(Calculator.prototype, 'add');
      calculate('3+4');

      expect(spy).toHaveBeenCalledTimes(2); //line 14 & 19
      expect(spy).toHaveBeenCalledWith(3); // 3+4 the first 3
      expect(spy).toHaveBeenCalledWith(4); // 3+4 the second 4
    });

    it('calls subtract', function () {
      const spy = spyOn(Calculator.prototype, 'subtract');
      calculate('6-4');

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(4); // the numberB
    });

    it('calls multiply', function () {
      const spy = spyOn(Calculator.prototype, 'multiply');
      calculate('6*4');

      expect(spy).toHaveBeenCalled();
      expect(spy).not.toHaveBeenCalledWith(6);
      expect(spy).toHaveBeenCalledWith(4); // the numberB
    });

    it('calls divide', function () {
      const spy = spyOn(Calculator.prototype, 'divide');
      calculate('12/2');

      expect(spy).toHaveBeenCalled();
      expect(spy).not.toHaveBeenCalledWith(12);
      expect(spy).toHaveBeenCalledWith(2); // the numberB
    });

    // final call to updateResult() line 31
    it('calls updateResult (example using and callThrough)', function () {
      spyOn(window, 'updateResult');
      spyOn(Calculator.prototype, 'multiply').and.callThrough(); // spy on actual real multiply function. Using it to test updateResult
      calculate('5*5')
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith(25);
    });


    it('calls updateResult (example using and callFake)', function () {
      spyOn(window, 'updateResult');
      spyOn(Calculator.prototype, 'multiply').and.callFake(function (number) {
        return 'it works'
      });
      calculate('5*5')
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('it works');
    });


    it('calls updateResult (example using and returnValue)', function () {
      spyOn(window, 'updateResult');
      spyOn(Calculator.prototype, 'multiply').and.returnValue('whatever multiply returns');
      calculate('5*5')
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('whatever multiply returns');
    });


    it('calls updateResult (example using and returnValues)', function () {
      spyOn(window, 'updateResult');
      // spyOn(Calculator.prototype, 'add').and.returnValues('first call Line 14', 'second call line 19 because it returns something set to var result');
      // if you had a forloop with 10 args then you would pass 10 args to the spy and get back 10 results
      // we don't care to test for line 14 so use null for that arg

      spyOn(Calculator.prototype, 'add').and.returnValues(null, 'whatever add returns');
      calculate('5+5')

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('whatever add returns');
    });

    //multiply does not have a try/catch
    it('does not handle errors', function () {
      spyOn(Calculator.prototype, 'multiply').and.throwError('some error');

      expect(function () { calculate('5 * 5') }).toThrowError('some error');
    });


  })

  describe('updateResult()', function () {
    beforeAll(function () {
      const element = document.createElement('div');
      element.setAttribute('id', 'result');
      document.body.appendChild(element);
      this.element = element;
    });
    afterAll(function () {
      document.body.removeChild(this.element);
    });
    it('adds results to dom element', function () {
      updateResult('5');
      expect(this.element.innerText).toBe('5');
    });
  })

  describe('showVersion()', function () {
    // tests that version is read in main.js line 50
    it('calls calculator.version', function () {
      // this is instead of creating a dom element like in describe - 'updateResult() line 129'
      // instead we just spyOn the document directly
      // set innerText to null
      spyOn(document, 'getElementById').and.returnValue({
        innerText: null
      });

      //spyOnProperty(Calculator.prototype, 'version', 'get'); //default is get
      const spy = spyOnProperty(Calculator.prototype, 'version', 'get').and.returnValue(
        Promise.resolve()
      )

      showVersion();

      // will not work - version undefined
      //expect(Calculator.prototype.version).toHaveBeenCalled();

      // will work
      //expect(Object.getOwnPropertyDescriptor(Calculator.prototype, 'version').get).toHaveBeenCalled();

      // OR
      expect(spy).toHaveBeenCalled();


    })


  });
});