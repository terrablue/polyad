# Polyad: Monads for JavaScript

Monads are a pattern in functional programming for encapsulating values in types
with additional operations. This is a collection of such monads for JavaScript.

## Using

```js
import {Maybe, Either} from "polyad";

const maybe1 = new Maybe(1);
console.log(maybe1.isJust(), maybe1.isNothing(), maybe1.get());
// -> true, false, 1

const either = new Either(true, undefined);
console.log(either.get(), either.map(v => !v), either.flatMap(v => !v)):
// -> true, Maybe {}, undefined
```

## Monads

### Eager

Wrap your value in an eager promise, allowing you to chain operations on the
value the promise resolves to.

```js
const promise = Promise.resolve(" Test ");
const te = Eager.resolve(promise).trim().toLowerCase().slice(0, 2);
console.log(await te);
// -> te
```

Use `then` or `catch` to exit out of the `Eager` chain.

### Either

Select between two values.

```js
const either = new Either("test", "slice");
console.log(either.map(v => ""[v]));
// -> Maybe {}
console.log(either.flatMap(v => ""[v]));
// -> "slice"
```

`Either` is great for replacing `try ... catch` blocks.

Turn

```js
const showErrorToUser = () => console.log("there was an error!");
try {
  someFileOperation();
} catch (error) {
  showErrorToUser();
}
```

into

```js
new Either(someFileOperation, showErrorToUser).map(v => v());
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
