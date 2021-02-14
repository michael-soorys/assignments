import { Stack } from './stack'

export const bracketier = (string: string): boolean => {
  // Map of accepted brackets
  const brackets = {
    "[" : true,
    "]" : true,
    "(" : true,
    ")" : true,
    "{" : true,
    "}" : true
  }
  // Map of what the key value can close
  const closes = {
    "]" : "[",
    ")" : "(",
    "}" : "{",
  }
  // Map of openers
  const isOpener = {
    "[" : true,
    "(" : true,
    "{" : true,
  }
  const stack = new Stack()
  
  for (let i = 0; i < string.length; i++) {
    const char = string[i]
    // Accept only characters from the brackets map. Any other text is ignored
    if (!brackets[char]) {
      continue
    }
    // Push any opening bracket onto stack
    if (isOpener[char]) {
      stack.push(char)
      continue
    }
    // When encountering a closing bracket check it it closes the top of the stack
    if (!isOpener[char] && closes[char] === stack.peek()) {
      // Pop if closes
      stack.pop()
    } else {
      // String invalid
      return false
    }
  }
  // Stack should be empty only if every opened bracket was closed correctly and stack should be empty
  if (stack.peek() === null) {
    return true
  } else {
    return false
  }
}

console.log(bracketier('[a]as{d}as(gdtgsehsttjy)gk(fy{lk[uyfk]ty}kft)ygkj{fgyu}k[tfygk]'))