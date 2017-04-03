import {Component} from 'react'
import {Link} from 'react-router'
import {Form, Icon, Tooltip, Input, Cascader, Select, Row, Col,  Button, Checkbox} from 'antd'
import request from 'request'
import selfCodeHandle from 'selfcodehandle'
import eventProxy from 'eventproxy'
import styles from './index.scss'
import Cookies from 'js-cookie'
import md5 from 'md5'

const FormItem = Form.Item
const domain = 'http://202.75.218.137'

/**
 * 两个组件(没有嵌套关系)登录状态的改变如何得到：
 * 目前使用发布-订阅模式（观察者模式）
 */
class Head extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,
      username: ''
    }
    this.handleLogout = this.handleLogout.bind(this)
  }
  handleLogout() {
    this.setState({
      isLogin: false,
      username: ''
    })
    // 清一下cookie
    Cookies.remove('auto_login')
  }
  componentDidMount() {
    eventProxy.on('changeState', (bool, name) => {
      this.setState({
        isLogin: bool,
        username: name
      })
    })
  }
  render() {
    return (
      <div className={styles.user_wrap}>
        <div className={this.state.isLogin ? styles.hidden : ''}>
          <Link to="/user/login">登录</Link>
          /
          <Link to="/user/register">注册</Link>
        </div>
        <div className={this.state.isLogin ? '' : styles.hidden}>
          <Link to="/user/manage">{this.state.username}</Link>
          /
          <a href="javascript: void(0);" onClick={this.handleLogout}>登出</a>
        </div>
      </div>
    )
  }
}

let user_login = user => {
  let url = '/oms-web/company/login',
    username = user.username,
    password = user.password

  // 写入cookie
  let auto_login = `${username}_q_y_y_${password}`
  Cookies.set('auto_login', auto_login, {
    expires: 7
  })
  request(url, {
    method: 'POST',
    body: JSON.stringify({
      'companyPassword': password,
      'companyAccount': username
    })
  })
    .then(result => {
      if(result) {
        if(result.retcode == 1) {
          // 设置登入状态，然后跳转到首页
          eventProxy.trigger('changeState', true, username)
          location.href = '#/index'
        } else {
          // 提示错误信息
          let detail = selfCodeHandle(result.retcode, result.text)
          console.log(detail)
        }
      }
    })
}

/**
 * 注册组建
 */
class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      passwordDirty: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePasswordBlur = this.handlePasswordBlur.bind(this)
    this.checkPassword = this.checkPassword.bind(this)
    this.checkConfirm = this.checkConfirm.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // 验证通过
        const url = '/oms-web/company/register'
        values.password = md5(values.password)
        request(url, {
          method: 'POST',
          body: JSON.stringify({
            'companyName': values.companyname,
            'companyPassword': values.password,
            'companyAccount': values.username,
            'memo': ''
          })
        })
          .then(result => {
            if(result) {
              if(result.retcode == 1) {
                // 注册成功，自动登录一下
                user_login(values)
              } else {
                // 提示错误信息
                let detail = selfCodeHandle(result.retcode, result.text)
                console.log(detail)
              }
            }
          })
      }
    });
  }
  handlePasswordBlur(e) {
    const value = e.target.value;
    this.setState({ passwordDirty: this.state.passwordDirty || !!value });
  }
  checkPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.passwordDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 6,
      }
    }
    return (
      <div className={styles.register_wrap}>
        <h1>注册账号</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="公司名"
            hasFeedback
          >
            {getFieldDecorator('companyname', {
              rules: [{
                required: true, message: 'Please input your company name!',
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="用户名"
            hasFeedback
          >
            {getFieldDecorator('username', {
              rules: [{
                required: true, message: 'Please input your user name!',
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="密码"
            hasFeedback
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                validator: this.checkConfirm,
              }],
            })(
              <Input type="password" onBlur={this.handlePasswordBlur} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="确认密码"
            hasFeedback
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.checkPassword,
              }],
            })(
              <Input type="password" />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox>I had read the <a>agreement</a></Checkbox>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" size="large">Register</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
const RegisterForm = Form.create()(Register)

/**
 * 登入
 */
class Login extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.password = md5(values.password)
        user_login(values)
      }
    })
  }
  componentDidMount() {

    // 记住密码。。。
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles.login_wrap}>
        <h1>用户登入</h1>
        <Form onSubmit={this.handleSubmit} className={styles.login_form}>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input addonBefore={<Icon type="user" />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: false,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className={styles.login_form_forgot}>Forgot password</a>
            <Button type="primary" htmlType="submit" className={styles.login_form_button}>
              Log in
            </Button>
            Or <Link to="/user/register">register now!</Link>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const LoginForm = Form.create()(Login)

// const RegisterForm = Form.create(Register)

/**
 * 用户管理
 */
class Manage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <span>这是管理</span>
      </div>
    )
  }
}

export {Head, LoginForm, RegisterForm, Manage, user_login}

