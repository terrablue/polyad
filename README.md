# Polyad: Monads for JavaScript

Monads are a pattern in functional programming for encapsulating values in types
with additional operations. This is a collection of such monads for JavaScript.

## Using

```js
import {Maybe, Either} from "polyad";

const m1 = new Maybe(1);
console.log(m1.isJust(), m1.isNothing(), m1.get());
// -> true, false, 1

const e1 = new Either("failure", "success");
console.log(e1.get(), e1.map(v => v.length), e1.flatMap(v => v.length)):
// -> "success", Maybe {}, 7
```

## Monads

### Eager

Wrap your value in an eager promise, allowing you to chain operations on the
value the promise resolves to.

```js
const promise = Promise.resolve(" Test ");
const te = Eager.resolve(promise).trim().toLowerCase().slice(0, 2);
console.log(await te);
// -> "te"
```

Use `then` or `catch` to exit out of the `Eager` chain.

### Either

Select between two values.

```js
const testOrSlice = new Either("slice", "test");
console.log(testOrSlice.map(v => ""[v]));
// -> Maybe {}
console.log(testOrSlice.flatMap(v => ""[v]));
// -> "slice"
```

`Either` is great for replacing `try ... catch` blocks.

Turn

```js
const showError = () => console.log("error reading file!");
try {
  readFile();
} catch (error) {
  showError();
}
```

into

```js
new Either(showError, readFile).map(v => v());
```

### Maybe

Reason about empty values.

```js
const maybeN = new Maybe();
console.log(maybeN.isJust(), maybeN.isNothing(), maybeN.get());
// -> false, true, undefined
```

## License

BSD-3-Clause
