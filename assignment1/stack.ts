export class Stack {
  
  private size = 0; // Keeps track of the length of the array
  private stack = []; // Stack itself
  private max = [] // Max value stack
  private mode : 'string' | 'number'
  
  getMax() {
    if (this.mode === 'string') {
      throw new Error('Stack is in string mode and does not support MAX operation')
    }
    const max = this.max[this.getSize() - 1]
    return max
  }
  
  getSize() {
    return this.size
  }
  
  getStack () {
    return this.stack
  }
  
  print() {
    console.log(this.stack.join('->'))
  }
  
  push(i: number | string) {
    if (this.size === 0) {
      this.mode = typeof i === 'string' ? 'string' : 'number'
    }
    this.stack.push(i)
    if (this.mode === 'string') {
      console.log('Pushed ' + i)
      this.size++
      return;
    }
    const max = this.getMax()
    if (i > max || this.size === 0) {
      this.max.push(i)
    } else {
      this.max.push(max)
    }
    console.log('Pushed ' + i)
    this.size++
  }
  
  pop() {
    const popped = this.stack.pop() // Noice
    if (!popped) {
      return undefined // Stop here if stack is empty
    }
    if (this.mode === 'number') {
      this.max.pop()
    }
    this.size--
    console.log('Popped ' + popped)
    return popped
  }
  
  peek() {
    const peeked = this.stack[this.size - 1]
    if (!peeked) {
      return null
    }
    //console.log('Top of stack -> ' + peeked)
    return peeked
  }
}


// const items = [1, 1, 5, 2, 65, 5, 5, 100, 22]
// const stack = new Stack()
// items.forEach((item) => {
//   stack.push(item)
// })

// stack.pop()
// stack.pop()
// stack.pop()
// stack.pop()
// stack.pop()

// items.forEach((item) => {
//   stack.push(item)
// })

// stack.pop()
// stack.pop()
// stack.pop()
// stack.pop()
// stack.pop()
// stack.pop()
// stack.pop()
// stack.pop()
// stack.pop()
// stack.pop()
// stack.pop()
// stack.pop()
// stack.pop()
// stack.pop()
// stack.pop()
// stack.pop()
// stack.pop()
// stack.pop()
// stack.pop()
// stack.pop()
