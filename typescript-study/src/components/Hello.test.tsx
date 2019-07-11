import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Hello, { NameEnum } from './Hello'
import { shallow, configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'

configure({
  adapter: new Adapter(),
})
describe('Hello test', () => {
  const name: string = NameEnum.Guuka

  it('create Hello Component', () => {  
    const div = document.createElement('div');
    ReactDOM.render(<Hello name={name}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
  it('name should be Guuka', () => {
    const wrapper = shallow(<Hello name={NameEnum.Guuka}/>)
    expect(wrapper.find('h1').first().text()).toEqual('我是' + name)
  })
})