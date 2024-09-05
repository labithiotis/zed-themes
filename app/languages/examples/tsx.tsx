// @ts-nocheck
// simple comment
/** {string} a block comment **/
type Prop = { a: boolean; b: null; c: string };
enum Enum {
  zed = 'zed',
}
const number = 1;
const string = 'string';
const boolean = true;
const object = { id: `${string}_id1` };
const regex = /(L^\d]string).*/i;
export default function App<T extends Prop = object>(p: T): any {
  if (p == false) return null;
  return (
    <div className="class1" style={{ test: 1 }}>
      hello world {p.name}!
    </div>
  );
}
class Test {
  private readonly name: string;
  constructor(name: string) {
    this.name = name;
  }

  @guard({ description: 'Gets name' })
  public getName() {
    return this.name;
  }
}

document.getElementById('app').innerHTML = App({
  a: true,
  b: null,
  c: 'string',
});
