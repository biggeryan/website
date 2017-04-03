import {Component} from 'react'
import {Carousel} from 'antd'
import Cookies from 'js-cookie'
import {user_login} from '../../components/user/index'
import { Row, Col } from 'antd'
import styles from './index.scss'

class Index extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    // 判断cookie md5
    let auto_login = Cookies.get('auto_login')
    if(auto_login) {
      let [username, password] = auto_login.split('_q_y_y_')
      user_login({username, password})
    }
  }
  render() {
    return (
      <div className={styles.wrap}>
        <Carousel autoplay className={styles.carousel}>
          <div style={{height: '300px'}}><h3>1</h3></div>
          <div style={{height: '300px'}}><h3>2</h3></div>
          <div style={{height: '300px'}}><h3>3</h3></div>
          <div style={{height: '300px'}}><h3>4</h3></div>
        </Carousel>
        <div className={styles.section}>
          <h1 className={styles.section_title}>为什么选择我们?</h1>
          <Row type="flex" justify="space-around">
            <Col span={8}>
              <div className={styles.reason_item}>
                <div className={styles.reason_img}>
                  <img src="https://zos.alipayobjects.com/rmsportal/ApLJgITwRrlHwIu.png" alt=""/>
                </div>
                <div className={styles.reason_title}>技术</div>
                <div className={styles.reason_description}>技术来自BAT团队，快速交付、零停机维护；高并发、移动化、海量数据处理能力</div>
              </div>
            </Col>
            <Col span={8}>
              <div className={styles.reason_item}>
                <div className={styles.reason_img}>
                  <img src="https://zos.alipayobjects.com/rmsportal/MPukHoQscXbpDFy.png" alt=""/>
                </div>
                <div className={styles.reason_title}>融合</div>
                <div className={styles.reason_description}>快速与行业内的各项开放业务进行融合，共同探索全新业态</div>
              </div>
            </Col>
            <Col span={8}>
              <div className={styles.reason_item}>
                <div className={styles.reason_img}>
                  <img src="https://zos.alipayobjects.com/rmsportal/aDtfnOQTpcwsVrO.png" alt=""/>
                </div>
                <div className={styles.reason_title}>开放</div>
                <div className={styles.reason_description}>SaaS开放技术接入标准，为合作伙伴提供自由创新的空间</div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
export default Index
