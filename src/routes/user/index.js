import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Hammer from 'react-hammerjs';
import shortid from 'shortid';
import queryString from 'query-string';
import { List, WhiteSpace, Button, WingBlank } from 'antd-mobile';
import { config, Func } from '../../utils';
import './index.scss';
import '../../assets/font/iconfont.css';


const { pcHost } = config;
class IndexPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            online: !!sessionStorage.getItem('_token'),
        };
        this.dispatch = this.props.dispatch;
    }
    componentWillMount() {
        // 自动跳转致pc
        if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            window.location.href = `${pcHost}/user`;
        }
    }
    componentDidMount() {
        Func.changeTitle('数字财经 - 用户中心');
    }
    componentWillUnmount() {
        Func.changeTitle('');
    }
    goPage = (url) => {
        this.dispatch(routerRedux.push(url));
    }
    render() {
        const { location } = this.props;
        const pathName = this.props.location.pathname;
        const query = queryString.parse(this.props.location.search);
        let userInfo = null;
        if (this.state.online) {
            userInfo = (
                <p><span>尊敬的用户，您好！</span></p>
            );
        } else {
            userInfo = (
                <div>
                    <Hammer onTap={() => { this.goPage('/login?type=user&returl=/#/user?type=user'); }} key={shortid.generate()}>
                        <p><b>登 录</b></p>
                    </Hammer>
                    <p><span>还没有数字财经账号</span></p>
                    <Hammer onTap={() => { this.goPage('/register?type=user'); }} key={shortid.generate()}>
                        <p><b>快速注册</b></p>
                    </Hammer>
                </div>
            );
        }
        return (
            <div>
                <div
                    className="user-info"
                >
                    <img src="./static/img/man.png" alt="" />
                    {userInfo}
                </div>
                <div>
                    <List className="user-list">
                        {/* <List.Item
                            thumb={<i className="iconfont">&#xe60d;</i>}
                            arrow="horizontal"
                            onClick={() => {
                                console.log('我的收藏');
                            }}
                        >
                        我的收藏
                        </List.Item>
                        <List.Item
                            thumb={<i className="iconfont">&#xe638;</i>}
                            onClick={() => {
                                console.log('设置');
                            }}
                            arrow="horizontal"
                        >
                        设置
                        </List.Item>
                         */}
                        <List.Item
                            thumb={<i className="iconfont">&#xe64f;</i>}
                            onClick={() => {
                                this.goPage('recommend');
                            }}
                            arrow="horizontal"
                        >
                        推荐数字财经
                        </List.Item>
                        <List.Item
                            thumb={<i className="iconfont">&#xe63c;</i>}
                            onClick={() => {
                                this.goPage('wechat');
                            }}
                            arrow="horizontal"
                        >
                        核心用户群
                        </List.Item>
                        <List.Item
                            thumb={<i className="iconfont">&#xe61e;</i>}
                            onClick={() => {
                                this.goPage('about');
                            }}
                            arrow="horizontal"
                        >
                        关于我们
                        </List.Item>
                    </List>
                    <WhiteSpace />
                    {this.state.online &&
                    <Hammer onTap={() => { sessionStorage.removeItem('_token'); this.setState({ online: false });  }} key={shortid.generate()}>
                        <div className="loginOutWp"><WingBlank><Button  type="ghost">退出登录</Button></WingBlank></div>
                    </Hammer>
                    }
                </div>
            </div>
        );
    }
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
