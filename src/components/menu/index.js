import {Component} from 'react'
import { Menu, Icon } from 'antd'
import {Link} from 'react-router'
import './index.scss'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

const menu_style = {
  height: '100%',
}
class M extends Component {
  constructor(props) {
    super(props)
    // init state
    this.state = {
      current: 'index'
    }
    this.handleClick = this.handleClick.bind(this)
  }
  // 这种写法也可以，推荐在constructor中写
  // state = {
  //   current: 'mail'
  // }
  handleClick(e) {
    console.log('click ', e)
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        id="nav"
      >
        <Menu.Item key="index">
          <Icon type="home" />
          <Link className="link" to="/index">首页</Link>
        </Menu.Item>
        <Menu.Item key="products">
          <Icon type="appstore" />
          <Link className="link" to="/products">产品</Link>
        </Menu.Item>
        <Menu.Item key="solution">
          <Icon type="solution" />
          <Link className="link" to="/solution">解决方案</Link>
        </Menu.Item>
        <Menu.Item key="help">
          <Icon type="book" />
          <Link className="link" to="/book">帮助文档</Link>
        </Menu.Item>
      </Menu>
    )
  }
}

export default M
