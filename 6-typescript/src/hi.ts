export function main(args: { name: string }): { body: string } {
  let name: string = args.name || 'world'
  let greeting: string = 'Hi ' + name + '!'
  console.log(greeting)
  return { body: greeting }
}