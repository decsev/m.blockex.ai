import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import _ from 'lodash';
import { WhiteSpace, Toast, ListView, PullToRefresh, Card, Grid, Modal, Flex, ActivityIndicator } from 'antd-mobile';
import Hammer from 'react-hammerjs';
import shortid from 'shortid';
import Menu from '../../components/Menu';
import './index.scss';

const findDomNode = ReactDOM.findDOMNode;
/**
 * @description 列表页
 * @author fengzl
 * @memberof Article
 */
class Article extends Component {
    constructor(props) {
        super(props);
        // const sectionId = this.props.match.params.sectionId;
        this.state = {
            isLoading: false,
            height: document.documentElement.clientHeight * 3 / 4,
        };
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        this.dataSource = ds.cloneWithRows([]);
        this.dispatch = this.props.dispatch;
        console.log(this.props.params);
    }

    componentDidMount() {
        // const hei = document.documentElement.clientHeight - findDomNode(this.lv).parentNode.offsetTop;
        const hei = findDomNode(this.lv).parentNode.offsetHeight;
        console.log('hei:', hei);
        setTimeout(() => {
            this.setState({
                height: hei,
            });
        }, 600);

        const scrollY = sessionStorage.getItem('articleListScroll');
        if (scrollY) {
            this.lv.scrollTo(0, scrollY);
            // setTimeout(() => this.lv.scrollTo(0, scrollY), 800);
        }
    }

    componentWillReceiveProps(nextProps) {

    }


    /**
     * @description 下拉刷新
     * @returns
     */
    onRefresh = () => {
        this.dispatch({
            type: 'article/getList',
            payload: {},
        });
    };
    /**
     * @description 滚动到底部
     * @returns
     */
    onEndReached = () => {
        this.setState({
            isLoading: true,
        });
        this.getData();
    }

    /**
     * @description 获取列表数据
     * @param {any} page
     */
    getData = (page) => {
        this.dispatch({
            type: 'article/getList',
            payload: {},
        }).then(() => {
            this.setState({
                isLoading: false,
            });
        });
    }

    handleScroll = () => {
        const scrollY = findDomNode(this.lv).scrollTop || findDomNode(this.lv).scrollTop || findDomNode(this.lv).pageYOffset || 0;
        sessionStorage.setItem('articleListScroll', scrollY);
        console.log('滑动距离：', scrollY);
    }
    goToDetail = (data) => {
        const articleId = data.id;
        console.log('articleId', articleId);
        this.dispatch(routerRedux.push(`/articleDetail/${articleId}`));
    }

    /**
     * 渲染列表
     *
     * @memberof
     */
    renderRow = (rowData) => {
        return (
            <Hammer onTap={() => { this.goToDetail(rowData); }} key={shortid.generate()}>
                <div>
                    <Card full>
                        <Card.Header
                            title={<div className="nick-name">{rowData.id + rowData.title}</div>}
                            thumb={<div><img src={rowData.img} alt="" /></div>}
                            extra={<span>{rowData.title}</span>}
                        />
                        <Card.Body>
                            <div>
                                <h4>{rowData.title}</h4>
                                <p>{rowData.des}</p>
                            </div>
                        </Card.Body>
                        <Card.Footer
                            content={<div><span><i className="pyicon icon-view" /> {rowData.readCount || 0}</span> <span> <i className="pyicon icon-comments" /> {rowData.commentCount || 0}</span></div>}
                        />
                    </Card>
                </div>
            </Hammer>
        );
    };

    render() {
        const { history, menus, article } = this.props;
        const { lists } = article;
        this.dataSource = this.dataSource.cloneWithRows(lists);
        console.log('isLoading', this.state.isLoading);
        return (
            <div className="article-box">
                <Menu cur={history.location.pathname} menus={menus} />
                <div className="bobox">
                    {/* history.location.pathname */}
                    <ListView
                        key={this.state.useBodyScroll ? '0' : '1'}
                        ref={(el) => { this.lv = el; }}
                        dataSource={this.dataSource}
                        renderFooter={() => (
                            <div className="loadingTips">
                                {this.state.isLoading ? '已完成加载' : '加载中...'}
                            </div>
                        )}
                        renderRow={this.renderRow}
                        useBodyScroll={false}
                        style={this.state.useBodyScroll ? {} : {
                            height: this.state.height,
                            margin: '0px 0',
                        }}
                        pullToRefresh={<PullToRefresh
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />}
                        onEndReached={this.onEndReached}
                        pageSize={5}
                        onScroll={this.handleScroll}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        article: state.article,
        menus: state.menu.menus,
    };
}

export default connect(mapStateToProps)(Article);
