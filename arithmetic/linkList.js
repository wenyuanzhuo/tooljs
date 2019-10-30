

class Node {
  constructor(element) {
    this.element = element
    this.next = null
  }
}
class LinkList {
  constructor() {
    // this.sentry = new Node('header sentry') 哨兵
    this.head = new Node('header sentry')
  }

  findByValue (element) {
    let nextNode = this.head.next
    // if (!nextNode) { // 抛去哨兵节点
    //   return
    // }
    while(nextNode && nextNode.element) {
      if (nextNode.element === element) {
        return nextNode
      }
      nextNode = nextNode.next
    }
    return nextNode
  }

  findByIndex (element) {
    let currentElement = this.head
    while(currentElement.next && currentElement.next.element) {
      if (currentElement.next.element === element) {
        return currentElement
      }
      currentElement = currentElement.next
    }
    return currentElement
  } 
  append (element) {
    // 找到链尾 next = null
    let currentNode = this.head
    while(currentNode.next) {
      currentNode = currentNode.next
    }
    currentNode.next = new Node(element)
  }
  insert (newElement, prevELement) {
    // 找到 prevELement
    const findNode = this.findByValue(prevELement)
    if (findNode) {
      const newElementNode = new Node(newElement)
      newElementNode.next = findNode.next
      findNode.next = newElementNode
    }

  }
  remove (element) {
     // 找到 当前节点  prev 节点
    const findNode = this.findByValue(element)
    console.log(findNode)
    if (findNode) {
      // 找到  prevELement

      const findPrevELement = this.findByIndex(element)
      if (findPrevELement) {
        findPrevELement.next = findNode.next
      }
    }

  }
  showListElement () {
    let currentNode = this.head
    while(currentNode.next) {
      console.log(currentNode.element)
      currentNode = currentNode.next
    }
  }
}

const linkList = new LinkList()
linkList.append('a')
linkList.append('c')
linkList.insert('d', 'c') // a c d
linkList.insert('e', 'd') // a c d e 
linkList.insert('f', 'e') // a c d e f
linkList.remove('e') // a c d f
linkList.remove('f') // a c d
linkList.insert('g', 'e') // a c d
linkList.insert('h', 'd') // a c d h
linkList.showListElement()