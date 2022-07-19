import {Test} from "debris";

const test = new Test();

test.case("constructor resolves like promise", async (assert, {Eager}) => {
  assert(await new Eager(resolve => resolve(1))).equals(1);
});

test.case("constructor rejects like promise", (assert, {Eager}) => {
  assert(() => new Eager((_, reject) => reject({message: 1}))).throws(1);
});

test.case("constructor depth 2", async (assert, {Eager}) => {
  const object = Promise.resolve({test: "test2"});
  const eager = Eager.resolve(object);
  assert(await eager.test).equals("test2");
});

test.case("constructor depth 3", async (assert, {Eager}) => {
  const object2 = Promise.resolve({test2: "test3"});
  const object = Promise.resolve({test: object2});
  const eager = Eager.resolve(object);
  assert(await eager.test.test2).equals("test3");
});

test.case("constructor with function", async (assert, {Eager}) => {
  const func = () => ({});
  func.test = "test2";
  const object = Promise.resolve(func);
  const eager = Eager.resolve(object);
  assert(await eager.test).equals("test2");
});

test.case("constructor with promised function", async (assert, {Eager}) => {
  const object = Promise.resolve(() => ({test: "test2"}));
  const eager = Eager.resolve(object);
  assert(await eager().test).equals("test2");
});

test.case("constructor with promised non-function", async (assert, {Eager}) => {
  const object = Promise.resolve({test: "test2"});
  const eager = Eager.resolve(object);
  assert(await eager().test).equals("test2");
});

test.case("`reject`s like normal promise", (assert, {Eager}) => {
  assert(() => Eager.reject({message: 1})).throws(1);
});

test.case("`resolve`s like normal promise", async (assert, {Eager}) => {
  assert(await Eager.resolve(1)).equals(1);
});

test.case("works like a normal tag function", async (assert, {Eager: {tag}}) => 
{
  const name = "Mowgli";
  assert(await tag`${name}`).equals(`${name}`);
});

test.case("works with promises", async (assert, {Eager: {tag}}) => {
  const name = Promise.resolve("Mowgli");
  assert(await tag`${name}`).equals("Mowgli");
});

export default test;
