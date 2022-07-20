import Maybe from "./Maybe.js";

export default class Either {
  #left; #right;

  constructor(left, right) {
    this.#left = new Maybe(left);
    this.#right = new Maybe(right);
  }

  get() {
    return (this.#right.isJust() ? this.#right : this.#left).get();
  }

  map(mapper) {
    const mapped = this.#right.map(mapper);
    return mapped.isJust() ? mapped : this.#left.map(mapper);
  }

  flatMap(mapper) {
    return this.map(mapper).get();
  }
}
