export interface ICustomStorage<T> {
  get(defaultValue: T): T;
  reset(): void;
  set(value: T): void;
}
