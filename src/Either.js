import Maybe from "./Maybe.js";

export default class Either {
  #left; #right;

  constructor(left, right) {
    this.#left = new Maybe(left);
    this.#right = new Maybe(right);
  }

  get() {
    return (this.#left.isJust() ? this.#left : this.#right).get();
  }

  map(mapper) {
    const mapped = this.#left.map(mapper);
    return mapped.isJust() ? mapped : this.#right.map(mapper);
  }

  flatMap(mapper) {
    return this.map(mapper).get();
  }
}
