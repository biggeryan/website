import {Layout} from 'antd'
import M from '../menu'
import {Component} from 'react'
import * as User from '../user'
import styles from './index.scss'
const {Header, Content, Footer} = Layout

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,
      username: ''
    }
    this.changeLoginState = this.changeLoginState.bind(this)
  }
  changeLoginState(bool, username) {
    this.setState({
      isLogin: bool,
      username: username 
    })
  }
  render() {
    return (
      <Layout style={{height: '100%'}}>
        <Header>
          <div className={styles.logo}></div>
          <M />
          <User.Head />
        </Header>
        <Content>{this.props.children}</Content>
        <Footer className={styles.footer}>Copyright © 2017 杭州艾禾网络有限公司 版权所有</Footer>
      </Layout>
    )
  }
}
export default App
