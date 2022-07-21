# Polyad: Monads for JavaScript

Monads are a pattern in functional programming for encapsulating values in types
with additional operations. This is a collection of such monads for JavaScript.

## Using

```js
import {Maybe, Either} from "polyad";

const m1 = new Maybe(1);
console.log(m1.isJust(), m1.isNothing(), m1.get());
// -> true false 1

const e1 = Either.right("success");
console.log(e1, e1.get(), e1.map(v => v.length).get());
// -> Either {} "success" 7
```

## Monads

### Maybe

Reason about empty values.

```js
const maybeN = new Maybe();
console.log(maybeN.isJust(), maybeN.isNothing(), maybeN.get());
// -> false, true, undefined
```

### Either

Select between two values.

```js
const e2 = Either
  .right("Hello, world")
  .map(v => v.toUpperCase())
  .match({right: v => v.slice(0, 5)})
console.log(e2, e2.get());
// -> Either {} HELLO
```

`Either.try` is great for replacing `try ... catch` blocks.

Turn

```js
const showError = error => console.log(error.message);
try {
  1 / f;
} catch (error) {
  showError(error);
}
```

into

```js
Either.try(() => 1 / f).match({left: showError});
// -> f is not defined
```

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

### EagerEither

An async Either; the same `try ... catch` replacement from before with async
code:

Turn

```js
const showError = error => console.log(error.message);
try {
  await 1 / f;
} catch (error) {
  showError(error);
}
```

into

```js
await EagerEither.try(async () => await 1 / f).match({left: showError});
// -> f is not defined
```

## License

BSD-3-Clause
