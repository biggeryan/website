import {Component} from 'react'
import ReactDom from 'react-dom'
import {Router, Route, Link, hashHistory, IndexRoute} from 'react-router'

import App from './components/layout'
import Index from './pages/index'
import Products from './components/products/index'
import Product from './components/products/product'
import * as User from './components/user'

import './index.scss'


// const ACTIVE = { color: 'red' }
// class App extends Component {
//   constructor(props) {
//     super(props)
//   }
//   render() {
//     return (
//       <div>
//         <h1>这是主页</h1>
//         <ul>
//           <li><Link to="/" activeStyle={ACTIVE}>App</Link></li>
//           <li><Link to="/Button" activeStyle={ACTIVE}>Button</Link></li>
//           <li><Link to="/Button/Btn/10" activeStyle={ACTIVE}>Btn-10</Link></li>
//           <li><Link to={{pathname: '/Button/Btn/10', query: {name: 'qyy'}}} activeStyle={ACTIVE}>Btn-10?name=qyy</Link></li>
//           <li><Link to="/Txt" activeStyle={ACTIVE}>Txt</Link></li>
//         </ul>
//         {this.props.children}
//       </div>
//     )
//   }
// }

ReactDom.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index}></IndexRoute>
      <Route path="index" component={Index}></Route>
      <Route path="products" component={Products}></Route>
      <Route path="product/:id" component={Product}></Route>
      {/*<Route path="solution" component={Solution}></Route>*/}
      {/*<Route path="help" component={Help}></Route>*/}
      <Route path="user/login" component={User.LoginForm}></Route>
      <Route path="user/register" component={User.RegisterForm}></Route>
      <Route path="user/manage" component={User.Manage}></Route>
    </Route>
  </Router>
), document.getElementById('app'))
