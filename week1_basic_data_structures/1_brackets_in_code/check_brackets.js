class Stack {
    constructor() {
        this.list = [];
    }
    push(ele) {
        return this.list.push(ele)
    }
    pop() {
        return this.list.pop()
    }
    isEmpty() {
        return this.list.length === 0
    }
    print() {
      return this.list
    }

}


class check_brackets {
    main(data) {
      const str = data.split('')
        const stack = new Stack()

        for(let i = 0; i < str.length; i ++) {
            const char = str[i]
            if(char === '{' || char === '[' || char === '(') {
              stack.push(char)
            }
            else {
                if (stack.isEmpty()) {
                    return i + 1
                }
                const top = stack.pop()
                if(
                  (top === '[' && char !== ']') || 
                  (top === '(' && char !== ')') || 
                  (top === '{' && char !== '}') 
                  ) {
                    return i + 1
                }
            }
        }

        return 'Success'
    }
}
var readline = require('readline');

/*
 * We need to create a readline interface.
 * The interface takes 2 streams.
 * The input field points to the readable input stream
 * and the output field to the writable output stream. 
 */
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const hub = new check_brackets

const result = hub.main(process.argv[1])
console.log(result)

console.log(rl)

console.log(process.argv)
