export class Queue {
  private head: ListNode;
  private tail: ListNode;
  private size = 0;
  
  // Elongate the tail
  push(value: number) {
    if (typeof value !== "number") {
      throw new Error(`Expected a number to push into the Queue, yet type "${typeof value}" was provided.`)
    }
    // Create node
    const newNode = new ListNode(value)
    // Handle first node
    if (this.size === 0) {
      this.head = newNode
      this.tail = newNode
      // Handle second node
    } else if (this.size === 1) {
      newNode.setNext(this.head)
      this.head.setPrevious(newNode)
      this.tail = newNode
      // Everything else
    } else {
      newNode.setNext(this.tail)
      this.tail.setPrevious(newNode)
      this.tail = newNode
    }
    this.size++
    //console.log("Tail value -> " + this.tail.getValue())
  }
  
  // Chop the head off
  pop() {
    if (this.size === 0) {
      throw new Error(`Queue is empty`)
    } else if (this.size === 1) {
      const node = this.head
      this.head = undefined;
      this.tail = undefined
      this.size--
      return node.getValue()
    } else {
      const {current, previous} = this.head.detachNode()
      this.head = previous
      this.size--
      //console.log(`Popped '${current.getValue()}'. Head now is ${previous.getValue()}`)
      return current.getValue()
    }
  }
  
  // Check the value in the head
  peekHead():number {
    console.log(this.head.getValue())
    return this.head.getValue()
  }
  
  // Check the value in the tail
  peekTail():number {
    console.log(this.tail.getValue())
    return this.tail.getValue()
  }
  
  getSize():number {
    return this.size
  }
  
  getMax(): number {
    const maxReducer = (acc: number, curr: number) => {
      if (curr > acc) return curr
      if (acc >= curr) return acc
      throw new Error('Something went wrong with max reducer, all cases should have been handled above')
    }
    const max = this.reduce(maxReducer)
    console.log("Max value is -> " + max)
    return max
  }
  
  getMin(): number {
    const minReducer = (acc: number, curr: number) => {
      if (curr < acc) return curr
      if (acc <= curr) return acc
      throw new Error('Something went wrong with min reducer, all cases should have been handled above')
    }
    const min = this.reduce(minReducer)
    console.log("Min value is -> " + min)
    return min
  }
  
  // Finder
  // Traverse the queue and return a list with nodes that satisfy the input function
  find(callback: (n: number) => boolean): ListNode[] {
    const found: ListNode[] = []
    let current = this.tail
    while (current) {
      if (callback(current.getValue()) === true) {
        found.push(current)
      }
      current = current.getNext()
    }
    return found
  }
  
  // Reduces
  // Reduces linked list to a single number based on the operation given in the callback param
  reduce(callback: (acc: number, current: number) => number): number {
    let current = this.tail
    let accumulator = current.getValue()
    while (current) {
      accumulator = callback(accumulator, current.getValue())
      current = current.getNext()
    }
    return accumulator
  }
  
  // Prints out the full linked list in a nice to read way
  print() {
    // Pass function that returns true to finder to get all of the items in the list.
    const values = this.find(()=>true).map(node => node.getValue())
    console.log(values.join('->'))
  }
}

class ListNode {
  private next = null;
  private previous = null;
  private value: number;
  constructor(value: number) {
    this.value = value
  }
  
  getValue() {
    return this.value
  }
  getNext() {
    return this.next
  }
  getPrevious() {
    return this.previous
  }
  setNext(node: ListNode) {
    this.next = node
  }
  setPrevious(node: ListNode) {
    this.previous = node
  }
  detachNode(): {previous: ListNode, current: ListNode} {
    const previous = this.getPrevious()
    this.setPrevious(null)
    previous.setNext(null)
    return {
      current: this,
      previous
    }
  }
}

const queue = new Queue()

queue.push(2)
queue.pop()
queue.push(4)
queue.push(23)
queue.push(2)
queue.push(3)
queue.push(98)
queue.push(2)
for (let i=0;i<10000000; i++) {
  queue.push(Math.floor(Math.random() * 10000000))
}
queue.print()
queue.getMax()
queue.getMin()
queue.push(4)
queue.push(5)
queue.pop()
queue.pop()
queue.pop()
queue.push(9)
queue.push(2)
queue.push(3)
queue.print()
queue.getMax()
queue.getMin()
queue.peekHead()
queue.peekTail()