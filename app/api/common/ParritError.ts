export interface IParritError<T> {
  server?: string;
  fields?: Record<keyof T, string | null>;
}

export class ParritError<T> extends Error {
  public readonly data: IParritError<T>;

  constructor(arg: IParritError<T>) {
    super(JSON.stringify(arg));
    this.data = arg;
  }

  static obscured() {
    return new ParritError({ server: "Server error" });
  }

  static fromString<T>(str?: string) {
    if (!str) {
      return undefined;
    }
    const obj = JSON.parse(str) as IParritError<T>;
    return new ParritError(obj);
  }
}
