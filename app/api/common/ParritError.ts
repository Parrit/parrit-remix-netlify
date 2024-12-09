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

  toResponse(status = 400): Response {
    return new Response(JSON.stringify(this.data), { status });
  }

  static obscured() {
    return new ParritError({ server: "Server error" });
  }

  static fromString<T>(str?: string) {
    if (!str) {
      return undefined;
    }
    const obj = JSON.parse(str) as IParritError<T>;
    if (this.isParritError<T>) {
      return new ParritError(obj);
    }
    return undefined;
  }

  private static isParritError<T>(obj: object): obj is ParritError<T> {
    const cast = obj as ParritError<T>;
    return !!cast.data.server || !!cast.data.fields;
  }
}
