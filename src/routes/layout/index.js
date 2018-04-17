import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { TabBar } from 'antd-mobile';
import queryString from 'query-string';
import { config } from '../../utils';
import HeaderBanner from '../../components/HeaderBanner';
import styles from './index.scss';
import '../../assets/font/iconfont.css';

const { defaultCategoryId } = config;

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        return (
            <div className="layoutWp">
                <HeaderBanner />
                <div className="layoutTabBarWp">
                    <TabBar
                        unselectedTintColor="#949494"
                        tintColor="#33A3F4"
                        barTintColor="white"
                        hidden={this.state.hidden}
                    >
                        <TabBar.Item
                            title="新闻"
                            key="news"
                            icon={<i className="iconfont">&#xe612;</i>}
                            selectedIcon={<i className="iconfont selected">&#xe612;</i>}
                            selected={query.type === 'news'}
                            onPress={() => {
                                this.goPage(`/article/${sessionStorage.getItem('currentCategoryId') || defaultCategoryId}?type=news&id=${sessionStorage.getItem('currentCategoryId') || defaultCategoryId}`);
                            }}
                            data-seed="news"
                        >
                            {query.type === 'news' ? this.props.children : null}
                        </TabBar.Item>
                        <TabBar.Item
                            icon={<i className="iconfont">&#xe625;</i>}
                            selectedIcon={<i className="iconfont selected">&#xe625;</i>}
                            title="快讯"
                            key="live"
                            selected={query.type === 'live'}
                            onPress={() => {
                                this.goPage('/live?type=live&cat=1');
                            }}
                            data-seed="live"
                        >
                            {query.type === 'live' ? this.props.children : null}
                        </TabBar.Item>
                        <TabBar.Item
                            icon={<i className="iconfont">&#xe609;</i>}
                            selectedIcon={<i className="iconfont selected">&#xe609;</i>}
                            title="我的"
                            key="user"
                            selected={query.type === 'user'}
                            onPress={() => {
                                this.goPage('/user?type=user');
                            }}
                            data-seed="user"
                        >
                            {query.type === 'user' ? this.props.children : null}
                        </TabBar.Item>
                    </TabBar>
                </div>
            </div>
        );
    }
}

Layout.propTypes = {

};

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps)(Layout);
