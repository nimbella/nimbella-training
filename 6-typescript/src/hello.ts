export function main(args: { name: string }): { body: string } {
  let name: string = args.name || 'world'
  let greeting: string = 'Hello ' + name + '!'
  console.log(greeting)
  return { body: greeting }
}