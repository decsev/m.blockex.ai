import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import _ from 'lodash';
import { WhiteSpace, Toast, ListView, PullToRefresh, Card, Grid, Modal, Flex, ActivityIndicator } from 'antd-mobile';
import Hammer from 'react-hammerjs';
import shortid from 'shortid';
import { Func, config } from '../../utils';
import Menu from '../../components/Menu';
import './index.scss';
import '../../assets/font/iconfont.css';

const { formatDateTime, dateStr, getQueryString } = Func;
const { pageSize } = config;
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
            newArticleTips: null,
        };
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        this.dataSource = ds.cloneWithRows([]);
        this.dispatch = this.props.dispatch;
    }
    componentDidMount() {
        const hei = findDomNode(this.lv).parentNode.offsetHeight;
        setTimeout(() => {
            this.setState({
                height: hei,
            });
        }, 600);

        const acId = getQueryString('id');
        const scrollY = sessionStorage.getItem(`articleListScroll_${acId}`);
        if (scrollY) {
            setTimeout(() => {
                this.lv.scrollTo(0, scrollY);
            }, 100);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.channel !== this.props.match.params.channel) {
            const acId = getQueryString('id');
            const scrollY = sessionStorage.getItem(`articleListScroll_${acId}`);
            if (scrollY) {
                setTimeout(() => {
                    this.lv.scrollTo(0, scrollY);
                }, 100);
            }
        }
    }
    componentDidUpdate() {
        const channel = this.props.match.params.channel || null;
        if (channel !== null) {
            sessionStorage.setItem('currentCategoryId', channel);
        }
    }
    componentWillUnmount() {

    }


    /**
     * @description 下拉刷新
     * @returns
     */
    onRefresh = () => {
        const { article } = this.props;
        const acId = getQueryString('id');
        this.dispatch({
            type: 'article/getList',
            payload: {
                cat_id: acId,
                size: pageSize,
                p: 1,
            },
        }).then((result) => {
            let msg = '出现末知错误';
            if (result.code === 0) {
                msg = '刷新成功';
            }
            if (result.payload.data.length === 0) {
                msg = '暂无数据';
            }
            setTimeout(() => {
                this.setState({ newArticleTips: msg });
                setTimeout(() => {
                    this.setState({ newArticleTips: null });
                }, 2000);
            }, 1000);
        });
    };
    /**
     * @description 滚动到底部
     * @returns
     */
    onEndReached = () => {
        const acId = getQueryString('id');
        const { article } = this.props;
        const hasMoreOld = article[`hasMoreOld_${acId}`] || true;
        if (!hasMoreOld || this.state.isLoading) {
            return;
        }
        this.setState({
            isLoading: true,
        });
        this.getData();
    }

    /**
     * @description 获取列表数据
     * @param {any} page
     */
    getData = () => {
        const { article } = this.props;
        const acId = getQueryString('id');
        this.dispatch({
            type: 'article/getList',
            payload: {
                cat_id: acId,
                size: pageSize,
            },
        }).then(() => {
            this.setState({
                isLoading: false,
            });
        });
    }

    handleScroll = () => {
        const acId = getQueryString('id');
        const scrollY = findDomNode(this.lv).scrollTop || findDomNode(this.lv).scrollTop || findDomNode(this.lv).pageYOffset || 0;
        sessionStorage.setItem(`articleListScroll_${acId}`, scrollY);
    }
    goToDetail = (data) => {
        const articleId = data.id;
        this.dispatch(routerRedux.push(`/articleDetail/${articleId}`));
    }

    goToRecorded = () => {
        // debugger;
        const { menus } = this.props.article;
        let recordedUrl = null;
        if (sessionStorage.getItem('currentCategoryId')) {
            recordedUrl = `/article/${sessionStorage.getItem('currentCategoryId')}?type=news`;
        } else {
            recordedUrl = (menus !== null ? `/article/${menus[0].id}?type=news` : null);
        }
        recordedUrl !== null && this.dispatch(routerRedux.push(recordedUrl));
    }

    /**
     * 渲染列表
     *
     * @memberof
     */
    renderRow = (rowData) => {
        // const dateTime = formatDateTime(new Date(rowData.update_time * 1000), 'yyyy-MM-dd');
        const minTime = formatDateTime(new Date(rowData.update_time * 1000), 'yyyy-MM-dd hh:mm');
        return (
            <Hammer onTap={() => { this.goToDetail(rowData); }} key={shortid.generate()}>
                <div className="articleRow">
                    <div className="articleRowHeader">{rowData.title}</div>
                    <div className="articleRowBody">
                        <div className="des">
                            <p>{rowData.description}</p>
                        </div>
                        <img src={rowData.path} alt="" />
                    </div>
                    <div className="articleRowFooter">
                        {minTime}{rowData.source ? ` · ${rowData.source}` : null}
                    </div>
                </div>
            </Hammer>
        );
    };

    /**
     * 渲染ListView底部
     *
     * @memberof Forum
     */
    renderFooter = () => {
        const { article } = this.props;
        const acId = getQueryString('id');
        const hasMoreOld = !!article[`hasMoreOld_${acId}`];
        return (
            <div className="footerTips">
                {this.state.isLoading ?
                    <Flex justify="center" className="loading-box">
                        <ActivityIndicator
                            text="加载中..."
                        />
                    </Flex> :
                    hasMoreOld ? '上拉加载更多' : '没有更多数据了'}
            </div>
        );
    }

    renderHeader = () => {
        return null;
        // if (!!this.state.newArticleTips) {
        //     return (<div className="newArticleTips">{this.state.newArticleTips}</div>);
        // } else {
        //     return null;
        // }
    }

    render() {
        const { history, article } = this.props;
        const { menus } = article;
        const lists = article[`lists_${getQueryString('id')}`] || [];
        this.dataSource = this.dataSource.cloneWithRows(lists);
        return (
            <div className="article-box">
                <Menu menus={menus} />
                <div className="bobox">
                    {!!this.state.newArticleTips && <div className="newArticleTips">{this.state.newArticleTips}</div>}
                    {/* history.location.pathname */}
                    <ListView
                        key={this.state.useBodyScroll ? '0' : '1'}
                        ref={(el) => { this.lv = el; }}
                        dataSource={this.dataSource}
                        renderHeader={this.renderHeader}
                        renderFooter={this.renderFooter}
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
                        pageSize={pageSize}
                        initialListSize={pageSize * 100}
                        scrollRenderAheadDistance={10}
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
        // menus: state.menu.menus,
    };
}

export default connect(mapStateToProps)(Article);
