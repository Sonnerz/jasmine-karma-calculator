
describe('calculator.js', function () {

  describe('Calculator', function () {

    let calculator;
    let calculator2;

    beforeEach(function () {
      calculator = new Calculator();
      calculator2 = new Calculator();
      /*
      Or
      this.calculator = calculator;
      this.calculator2 = calculator2;
      */
    });

    afterEach(function () {

    });

    it('should initialise the total', function () {
      expect(calculator.total).toBe(0);
      expect(calculator.total).toBeFalsy();
    });

    it('can be instantiated', function () {
      jasmine.addMatchers(customMatchers)
      expect(calculator).toBeCalculator(); // custom
      expect(2).not.toBeCalculator(); // custom
      expect(calculator).toBeTruthy();
      expect(calculator2).toBeTruthy();
      expect(calculator).toEqual(calculator2);
      expect(calculator.constructor.name).toContain("Calc"); //actually Constructor
    });

    it('instantiates unique object', function () {
      expect(calculator).not.toBe(calculator2);
    });

    it('has common operations', function () {
      expect(calculator.add).toBeDefined()//.not.toBeUndefined();
      expect(calculator.subtract).toBeDefined()//.not.toBeUndefined();
      expect(calculator.multiply).toBeDefined()//.not.toBeUndefined();
      expect(calculator.divide).toBeDefined()//.not.toBeUndefined();
    });

    it('can overwrite total', function () {
      calculator.total = null;

      expect(calculator.total).toBeNull();
    });

    describe('add()', function () {
      it('should add numbers to total', function () {
        calculator.add(5);
        expect(calculator.total).toBe(5);
      });

      it('returns total', function () {
        calculator.total = 50;

        expect(calculator.add(20)).toBe(70);
        expect(calculator.total).toMatch(/-?\d+/);
        expect(typeof calculator.total).toMatch('number');
        expect(calculator.total).toBeNumber(); // 3rd party matcher https://github.com/JamieMason/Jasmine-Matchers

        // asymmetric matchers
        // not equal in each side
        expect(calculator.total).toEqual(jasmine.anything()) // not for null or undefined

      });
    });

    describe('subtract()', function () {
      it('should subtract numbers from total', function () {
        calculator.total = 30;
        calculator.subtract(5);

        expect(calculator.total).toBe(25);
      });
    });

    describe('multiply()', function () {
      it('should multiply total by number', function () {
        calculator.total = 10;
        calculator.multiply(5);

        expect(calculator.total).toBe(50);
      });

      it('does not handle NaN', function () {
        calculator.total = 20;
        calculator.multiply('a')

        expect(calculator.total).toBeNaN();
      });
    });

    describe('divide()', function () {
      it('should divide total by number', function () {
        calculator.total = 12;
        calculator.divide(6);

        expect(calculator.total).toBe(2);
      });

      it('handles divide by zero', function () {
        // calculator.divide(0) on its own will show 'Cannot divide by zero'
        // wrap in a function to not break the test
        expect(function () { calculator.divide(0) }).toThrow();
        expect(function () { calculator.divide(0) }).toThrowError(Error);
        expect(function () { calculator.divide(0) }).toThrowError(Error, 'Cannot divide by zero');
      });
    });

    describe('get version', function () {

      it('fetches version from external source', async function (done) {
        //to test the actual fetch - test resolve, can also test rejected
        spyOn(window, 'fetch').and.returnValue(Promise.resolve(
          new Response('{"version":"0.1"}')
        ));
        const version = await calculator.version
        expect(version).toBe('0.1');
        done();
      });

    });









  })
})