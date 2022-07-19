import {Test} from "debris";

const test = new Test();

test.case("constructor wraps Just", (assert, {Maybe}) =>
  assert(new Maybe(1).isJust()).true()
);

test.case("constructor wraps Nothing", (assert, {Maybe}) =>
  assert(new Maybe().isNothing()).true()
);

test.case("`just` returns Just", (assert, {Maybe}) =>
  assert(Maybe.just(1).isJust()).true()
);

test.case("`nothing` returns Nothing", (assert, {Maybe}) =>
  assert(Maybe.nothing().isNothing()).true()
);

test.case("`map`s Just", (assert, {Maybe}) => {
  const mapped = Maybe.just(1).map(v => v + 1);
  assert(mapped.isJust()).true();
  assert(mapped.get()).equals(2);
});

test.case("`map`s Nothing", (assert, {Maybe}) => {
  const mapped = Maybe.nothing().map(v => v + 1);
  assert(mapped.isNothing()).true();
  assert(mapped.get()).undefined();
});

test.case("`flatmap`s Just", (assert, {Maybe}) => {
  const mapped = Maybe.just(1).flatMap(v => v + 1);
  assert(mapped).equals(2);
});

test.case("`flatmap`s Nothing", (assert, {Maybe}) => {
  const mapped = Maybe.nothing().flatMap(v => v + 1);
  assert(mapped).undefined();
});

test.case("`get`s Just", (assert, {Maybe}) => {
  const maybe = Maybe.just(true);
  assert(maybe.get()).true();
});

test.case("`get`s Nothing", (assert, {Maybe}) => {
  const maybe = Maybe.nothing();
  assert(maybe.get()).undefined();
});

test.case("`isJust` correct", (assert, {Maybe}) => {
  assert(Maybe.just(true).isJust()).true();
  assert(Maybe.just(true).isNothing()).false();
})

test.case("`isNothing` correct", (assert, {Maybe}) => {
  assert(Maybe.nothing().isNothing()).true();
  assert(Maybe.nothing().isJust()).false();
})

export default test;
