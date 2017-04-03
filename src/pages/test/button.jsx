import {Component} from 'react'
import styles from './index.scss'
import {DatePicker} from 'antd'

function timer(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(reject, ms)
  })
}

async function async_test(ms) {
  try {
    await timer(ms)
    return 123
  } catch (err) {
    console.log(err, '2323')
  }
  // await timer(ms)  和上面的方式一样
  //   .catch(err => console.log(err))
  console.log('lalalla')
}
async_test(3000)
  .then(data => console.log('ok', data))
  .then(data => console.log(data))
const url = 'http://area.sinaapp.com/bingImg/'
// console.log('---------------')
// fetch('http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US', {
//   'mode': 'no-cors'
// })
//   .then(response => response.json())
//   .then(data => console.log('++++++'))
//   .catch(err => console.log(err))
class Button extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <DatePicker />
        <button className={styles.btn}><span>i am btn</span></button>
        <h3>这是子元素</h3>
        {this.props.children || '暂时没有子元素'}
      </div>
    )
  }
}

class Txt extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <h1>路由一下</h1>
    )
  }
}

export { Button, Txt }
