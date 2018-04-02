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

const { formatDateTime, dateStr } = Func;
const { pageSize } = config;
const findDomNode = ReactDOM.findDOMNode;
let dayDate;
/**
 * @description 列表页
 * @author fengzl
 * @memberof Live
 */
class Live extends Component {
    constructor(props) {
        super(props);
        // const sectionId = this.props.match.params.sectionId;
        this.state = {
            isLoading: false,
            height: document.documentElement.clientHeight * 3 / 4,
            newLiveTips: null,
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

        const scrollY = sessionStorage.getItem('liveListScroll');
        if (scrollY) {
            this.lv.scrollTo(0, scrollY);
        }
    }


    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
        this.handleScroll();
    }
    /**
     * @description 下拉刷新
     * @returns
     */
    onRefresh = () => {
        const { live } = this.props;
        const lastTimsTamp = !!live.lists[0] ? live.lists[0].update_time : null;
        if (lastTimsTamp === null) return;
        this.dispatch({
            type: 'live/getList',
            payload: {
                timestamp: lastTimsTamp,
                last: 1,
            },
        }).then((result) => {
            let msg = '出现末知错误';
            if (result === 0) {
                msg = '暂时没有新的快讯';
            } else if (result > 0) {
                msg = `${result}条新快讯`;
            }
            setTimeout(() => {
                this.setState({ newLiveTips: msg });
                setTimeout(() => {
                    this.setState({ newLiveTips: null });
                }, 2000);
            }, 1000);
        });
    };
    /**
     * @description 滚动到底部
     * @returns
     */
    onEndReached = () => {
        const { live } = this.props;
        const { ajaxState, lists } = live;
        const { hasMoreOld } = ajaxState;
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
        const { live } = this.props;
        const { ajaxState, lists } = live;
        const { hasMoreOld } = ajaxState;
        const lastTimsTamp = lists[lists.length - 1].update_time;
        this.dispatch({
            type: 'live/getList',
            payload: {
                timestamp: lastTimsTamp,
            },
        }).then(() => {
            this.setState({
                isLoading: false,
            });
        });
    }

    handleScroll = () => {
        const scrollY = findDomNode(this.lv).scrollTop || findDomNode(this.lv).scrollTop || findDomNode(this.lv).pageYOffset || 0;
        sessionStorage.setItem('liveListScroll', scrollY);
    }
    goToDetail = (data) => {
        const articleId = data.id;
        this.dispatch(routerRedux.push(`/articleDetail/${articleId}`));
    }

    /**
     * 渲染列表
     *
     * @memberof
     */
    renderRow = (rowData) => {
        // let showDayTime;
        // const dateTime = formatDateTime(new Date(rowData.update_time * 1000), 'yyyy-MM-dd');
        const minTime = formatDateTime(new Date(rowData.update_time * 1000), 'MM月dd日 hh:mm');
        // if (dateTime !== dayDate) {
        //     dayDate = dateTime;
        //     showDayTime = true;
        // } else {
        //     showDayTime = false;
        // }
        return (
            <Hammer onTap={() => { this.goToDetail(rowData); }} key={shortid.generate()}>
                <div className="liveRow">
                    <div className="liveRowHeader"><i className="dataTimeIcon" /><span className="dataTime">{minTime}</span></div>
                    <div className="liveRowBody">
                        <p>{rowData.description}</p>
                    </div>
                    <div className="liveRowFooter">
                        <span className="goodBadWp good">
                            看多{rowData.good}
                        </span>
                        <span className="goodBadWp bad">
                            看空{rowData.bad}
                        </span>
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
        const { live } = this.props;
        const { ajaxState, lists } = live;
        const { hasMoreOld } = ajaxState;
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

    render() {
        dayDate = null;
        const { history, live } = this.props;
        const { lists } = live;
        this.dataSource = this.dataSource.cloneWithRows(lists);
        return (
            <div className="live-box">
                <div className="bobox">
                    {!!this.state.newLiveTips && <div className="newLiveTips">{this.state.newLiveTips}</div>}
                    {/* history.location.pathname */}
                    <ListView
                        key={this.state.useBodyScroll ? '0' : '1'}
                        ref={(el) => { this.lv = el; }}
                        dataSource={this.dataSource}
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
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        live: state.live,
    };
}

export default connect(mapStateToProps)(Live);
