import {Test} from "debris";

const test = new Test();
test.for = ({Either}) => Either;

test.case("right", (assert, Either) => {
  assert(Either.right(true)).instanceof(Either);
});

test.case("left", (assert, Either) => {
  assert(Either.left(true)).instanceof(Either);
});

test.case("try", (assert, Either) => {
  const tryRight = Either.try(() => true);
  assert(tryRight).instanceof(Either);
  assert(tryRight.get()).true();

  const tryLeft = Either.try(() => {
    throw new Error();
  });
  assert(tryLeft).instanceof(Either);
  assert(tryLeft.get()).instanceof(Error);
});

test.case("#isRight", (assert, Either) => {
  assert(Either.right(true).isRight()).true();
});

test.case("#isLeft", (assert, Either) => {
  assert(Either.left(true).isLeft()).true();
});

test.case("#get", (assert, Either) => {
  assert(Either.right(true).get()).true();
  assert(Either.left(true).get()).true();
});

test.case("#map", (assert, Either) => {
  assert(Either.right(true).map(v => !v).get()).false();
  assert(Either.left(true).map(v => !v).get()).false();
});

test.case("#flat", (assert, Either) => {
  assert(Either.right(Either.right(true)).flat().get()).equals(true);
});

test.case("#flatMap", (assert, Either) => {
  assert(Either.right(0).flatMap(v => Either.right(v + 1)).get()).equals(1);
  assert(Either.left(0).flatMap(v => Either.left(v + 1)).get()).equals(1);
});

test.case("#match", (assert, Either) => {
  assert(Either.right(true).match({right: v => !v}).get()).equals(false);
  assert(Either.left(true).match({left: v => !v}).get()).equals(false);
  // default to identity
  assert(Either.right(true).match().get()).equals(true);
  assert(Either.left(true).match().get()).equals(true);
});

test.case("try+match+get", (assert, Either) => {
  const result = Either.try(() => 1 / e)
    .match({left: ({message}) => message})
    .get();
  assert(result).equals("e is not defined");
});

export default test;
