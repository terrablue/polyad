import Nothing from "./Nothing.js";
import Just from "./Just.js";

export default class Maybe {
  #value;

  static nothing() {
    return new Maybe();
  }

  static just(value) {
    return new Maybe(value);
  }

  // the `return` operator, bringing a value into the monad
  constructor(value) {
    this.#value = value;
  }

  // the `>>=` (`fmap` or `bind`) operator
  map(mapper) {
    return this.isNothing() ? this : new Maybe(mapper(this.#value));
  }

  // join
  flatMap(mapper) {
    return this.map(mapper).get();
  }

  get() {
    return this.#value;
  }

  isNothing() {
    return Nothing.is(this.#value);
  }

  isJust() {
    return Just.is(this.#value);
  }
}
