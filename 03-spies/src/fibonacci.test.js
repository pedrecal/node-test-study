const Fibonacci = require("./fibonacci");
const sinon = require("sinon");
const assert = require("assert");

(async () => {
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    // generator returns iterators (.next)

    // You can return the data by:
    // 1. .next, for await and rest/spread
    for await (const i of fibonacci.execute(3)) {
    }

    const expectedCallCount = 4;

    assert.deepStrictEqual(spy.callCount, expectedCallCount);
  }
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    const [...results] = fibonacci.execute(5);
    // input | current | next
    //   5   |    0    |  1
    //   4   |    1    |  1
    //   3   |    1    |  2
    //   2   |    2    |  3
    //   1   |    3    |  5
    //   0
    //           END

    const { args } = spy.getCall(2);
    const expectedResultForParamCurrent = [0, 1, 1, 2, 3];
    const expectedParamsForThirdIteration = Object.values({
      input: 3,
      current: 1,
      next: 2,
    });

    assert.deepStrictEqual(args, expectedParamsForThirdIteration);
    assert.deepStrictEqual(results, expectedResultForParamCurrent);
  }
})();
