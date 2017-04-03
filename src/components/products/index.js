import {Component} from 'react'
import {Link} from 'react-router'
import request from 'request'
import selfCodeHandle from 'selfcodehandle'
import { Row, Col } from 'antd'
import { Spin, Alert } from 'antd'

import styles from './index.scss'

class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [1, 2, 3],
      loading: true
    }
  }
  componentDidMount() {
    // 请求数据 loading效果到时候统一加
    let url = '/oms-web/good/getGoodList?typeId=1'
    request(url, {
      method: 'GET'
    })
      .then(result => {
        if(result.retcode == 1) {
          this.setState({
            products: result.value.data,
            loading: false
          })
        } else {
          // 提示错误信息, 300ms的弹窗提示
          let detail = selfCodeHandle(result.retcode, result.text)
          console.log(detail)
        }
      })
  }
  render() {
    const products = this.state.products.map((product, index) =>
      <Col className={styles.product} span={6} key={index}>
        <div className={styles.mask}></div>
        <div className={styles.tip}>
          <h4 className={styles.product_name}>会员管理平台</h4>
          <div className={styles.operate}>
            <Link className={styles.btn} to="/buy/1">立即订购</Link>
            <Link className={styles.btn} to="/product/1">产品详情</Link>
          </div>
        </div>
      </Col>
    )
    return (
      <div className={styles.wrap}>
        <h4 className={styles.title}>产品列表</h4>
        <Row type="flex" justify="space-around">
          {products}
        </Row>
        <Spin className={this.state.loading ? '' : styles.loading_hidden} tip="Loading..." size="large">
        </Spin>
      </div>
    )
  }
}

export default Products


