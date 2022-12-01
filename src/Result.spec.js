import {Test} from "debris";
import Result from "./Result.js";

const test = new Test();

test.case("constructor", assert => {
  assert(() => new Result()).throws("`undefined` must be function");
  assert(() => new Result(() => [])).not_throws();
});

test.case("expect", assert => {
  assert(new Result(() => 1).expect()).equals(1);
  assert(() => new Result(() => {
    throw new Error("test");
  }).expect("to throw")).throws("to throw");
});

export default test;
