declare module "stylis" {
  export function prefixer(property: string, value: string): string;

  const stylis: {
    (context: number, content: string): string;
    use(
      plugin: (
        context: number,
        content: string,
        selectors: string[],
        parent: string[],
        line: number,
        column: number
      ) => void
    ): void;
  };

  export default stylis;
}
