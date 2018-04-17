import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Hammer from 'react-hammerjs';
import shortid from 'shortid';
import queryString from 'query-string';
import { List } from 'antd-mobile';
import './index.scss';
import '../../assets/font/iconfont.css';


class IndexPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            online: String(sessionStorage.getItem('_token')),
        };
        this.dispatch = this.props.dispatch;
    }

    goPage = (url) => {
        this.dispatch(routerRedux.push(url));
    }
    render() {
        const { location } = this.props;
        const pathName = this.props.location.pathname;
        const query = queryString.parse(this.props.location.search);
        let userInfo = null;
        if (this.state.online !== 'null') {
            userInfo = (
                <Hammer onTap={() => { sessionStorage.setItem('_token', null); this.setState({ online: 'null' });  }} key={shortid.generate()}>
                    <p><span>已登陆，退出登陆</span></p>
                </Hammer>
            );
        } else {
            userInfo = (
                <div>
                    <Hammer onTap={() => { this.goPage('/login?type=user&returl=/#/user?type=user'); }} key={shortid.generate()}>
                        <p><b>未登录</b></p>
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
                    <img src="https://avatars1.githubusercontent.com/u/6941888?s=460&v=4" alt="" />
                    {userInfo}
                </div>
                <div>
                    <List className="user-list">
                        <List.Item
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
                        <List.Item
                            thumb={<i className="iconfont">&#xe64f;</i>}
                            onClick={() => {
                                console.log('推荐数字财经');
                            }}
                            arrow="horizontal"
                        >
                        推荐数字财经
                        </List.Item>
                        <List.Item
                            thumb={<i className="iconfont">&#xe61e;</i>}
                            onClick={() => {
                                console.log('关于我们');
                            }}
                            arrow="horizontal"
                        >
                        关于我们
                        </List.Item>
                    </List>
                </div>
            </div>
        );
    }
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
