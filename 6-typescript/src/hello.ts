export function main(args: {name:string}): {} {
    let name: string = args['name'] || 'stranger'
    let greeting: string = 'Hello ' + name + '!'
    console.log(greeting)
    return { body: greeting }
  }