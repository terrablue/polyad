import {Test} from "debris";

const test = new Test();

test.case("`get`s left if Just", (assert, {Either}) =>
  assert(new Either(true).get()).true()
);

test.case("`get`s right if left Nothing", (assert, {Either}) =>
  assert(new Either(undefined, true).get()).true()
);

test.case("`map`s left if no exception", (assert, {Either}) =>
  assert(new Either(true).map(v => v).get()).true()
);

test.case("`map`s right if exception", (assert, {Either}) =>
  assert(new Either(0, 1).map(v => {
    if (v === 0) throw new Error();
    return v;
  }).get()).equals(1)
);

test.case("`flatmap`s left if no exception", (assert, {Either}) =>
  assert(new Either(true).flatMap(v => v)).true()
);

test.case("`flatmap`s right if exception", (assert, {Either}) =>
  assert(new Either(0, 1).flatMap(v => {
    if (v === 0) throw new Error();
    return v;
  })).equals(1)
);

export default test;
