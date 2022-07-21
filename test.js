import Either from "./src/Either.js";
import Maybe from "./src/Maybe.js";
const m1 = new Maybe(1);
console.log(m1.isJust(), m1.isNothing(), m1.get());
const e1 = Either.right("success");
console.log(e1, e1.get(), e1.map(v => v.length).get());
const e2 = Either
  .right("Hello, world")
  .map(v => v.toUpperCase())
  .match({right: v => v.slice(0, 5)})
console.log(e2, e2.get());
const showError = e => console.log(e.message);
Either.try(() => 1 / f).match({left: showError});
