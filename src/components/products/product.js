import { Component } from 'react'
import {Button, Row, Col, Carousel, Icon} from 'antd'
import styles from './product.scss'

class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product_info: {
        basic: {
          name: '会员管理系统',
          icon: '',
          desc: '销存、在线商城、客户管理、协同办公4大功能版块集于一身；自动处理各个维度数据交叉问题，一处变动，全域匹配',
          // id或者链接都可以
          buyLink: ''
        },
        overview: [
          {
            title: '服务全通道',
            desc: '支持热线、在线、自助'
          },
          {
            title: '服务全通道',
            desc: '支持热线、在线、自助'
          },
          {
            title: '服务全通道',
            desc: '支持热线、在线、自助'
          },
          {
            title: '服务全通道',
            desc: '支持热线、在线、自助'
          }
        ]
      }
    }
  }
  componentDidMount() {
    // 请求数据
    console.log(this.props.params.id)
  }
  render() {
    const cols_overview = this.state.product_info.overview.map((col, index) => {
      return <Col className={styles.section_col} lg={12} xs={24} key={index}>
        <h3 className={styles.section_subtitle}>{col.title}</h3>
        <div className={styles.section_desc}>{col.desc}</div>
      </Col>
    })
    const arrow = {
      left: {
        [styles.carousel_arrow]: true,
        [styles.carousel_arrow_left]: true
      },
      right: {
        [styles.carousel_arrow]: true,
        [styles.carousel_arrow_right]: true
      }
    }
    return (
      <div className={styles.wrap}>
        <div className={styles.banner}>
          <div className={styles.banner_content}>
            <div className={styles.pdt_title}>
              <i className={styles.iconfont}>&#xe616;</i>
              <span className={styles.pdt_name}>{this.state.product_info.basic.name}</span>
            </div>
            <div className={styles.pdt_desc}>{this.state.product_info.basic.desc}</div>
            <Button type="primary" size="large">立即购买</Button>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.section_main}>
            <h1 className={styles.section_title}>产品概述</h1>
            <Row className={styles.section_row}>
              {cols_overview}
            </Row>
          </div>
        </div>
        <div className={styles.section} style={{'backgroundColor': '#ECECEC'}}>
          <div className={styles.section_main}>
            <h1 className={styles.section_title}>功能介绍</h1>
            <div className={styles.carousel_wrap}>
              <div className={styles.carousel_arrow + " " + styles.carousel_arrow_left}><Icon type="left"></Icon></div>
              <Carousel className={styles.section_carousel}>
                <div><h3>1</h3></div>
              </Carousel>
              <div className={styles.carousel_arrow + " " + styles.carousel_arrow_right}><Icon type="right"></Icon></div>
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.section_main}>
            <h1 className={styles.section_title}>应用场景</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Product
