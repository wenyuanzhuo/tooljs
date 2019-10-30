

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

    while(nextNode && nextNode.element) {
      if (nextNode.element === element) {
        return nextNode
      }
      nextNode = nextNode.next
    }
  }

  findPrev (element) {
    let currentElement = this.head
    while(currentElement.next && currentElement.next.element) {
      if (currentElement.next.element === element) {
        return currentElement
      }
      currentElement = currentElement.next
    }
    return currentElement
  } 

  findByIndex (num) {

  }
  append (element) {
    // 找到链尾 next = null
    let currentNode = this.head
    while(currentNode.next) {
      currentNode = currentNode.next
    }
    currentNode.next = new Node(element)
  }
  insert (newElement, currentELement) {
    // 找到 currentELement , newElement插到currentELement之后
    const findNode = this.findByValue(currentELement)
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

      const findPrevELement = this.findPrev(element)
      if (findPrevELement) {
        findPrevELement.next = findNode.next
      }
    }

  }
  showListElement (revelList) {
    let currentNode = revelList || this.head

    while(currentNode.next) {
      console.log(currentNode.element)
      currentNode = currentNode.next
    }
  }

  revel() {
    let next = null
    let pre = null
    while(this.head) {
      next = this.head.next
      this.head.next = pre // 第一次将指针指向pre（哨兵）
      pre = this.head // 把当前的指针 保存 作为反转的后的 next的指向
      this.head = next
    }
    return pre
  }
}

const linkList = new LinkList()
linkList.append('a')
linkList.append('c')
linkList.insert('d', 'a') // a c d
// linkList.insert('e', 'd') // a c d e
// linkList.insert('f', 'e') // a c d e f
// linkList.remove('e') // a c d f
// linkList.remove('f') // a c d
// linkList.insert('g', 'e') // a c d
// linkList.insert('h', 'd') // a c d h
const revel = linkList.revel()
linkList.showListElement(revel)