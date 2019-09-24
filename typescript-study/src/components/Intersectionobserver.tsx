import React, { useState, useEffect, useRef, ReactNode } from 'react'

const THRESHOLD = 5
const list = [{
  value: 1
}]
interface GenericNumber {
  height: number;
  children?: ReactNode;
}
export const Intersectionobserver: React.FC = (props: GenericNumber) => {
  // const [start, setStart] = useState(0)
  const [end, setEnd] = useState(THRESHOLD)
  const $bottomEleRef = useRef(null)
  useEffect(() => {
    intiateScrollObserver()
    // return () => {}
  }, [end])
  const intiateScrollObserver = () => {
    const options = {
      threshold: 0.1,
    }
    const callback = (entries: [], observer: any) => {
      entries.forEach((item: IntersectionObserverEntry) => {
        if (item.intersectionRatio > 0 && item.target.id === 'bottom') {
          setEnd(end + THRESHOLD)
        }
      });
    }
    const Observer = new IntersectionObserver(callback, options)
    if ($bottomEleRef.current) {
      Observer.observe($bottomEleRef.current);
    }
  }
  const { height } = props;
  const renderList = list.slice(0, end)
  const lastIndex = renderList.length - 1
  return (
    <ul style={{position: 'relative'}}>
      {renderList.map((item: any, index: number) => {
        const top = (height * index) + 'px'
        const bottomId = index === lastIndex ? 'bottom' : ''
        const bottomRef = index === lastIndex ? $bottomEleRef : ''
        return (<li className="scrollerFooter li-card" key={index} style={{top}} id={bottomId} ref={bottomRef}>{item.value}</li>)
      })}
    </ul>
  )
}