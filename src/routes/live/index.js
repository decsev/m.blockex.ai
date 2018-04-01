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
        };
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        this.dataSource = ds.cloneWithRows([]);
        this.dispatch = this.props.dispatch;
        console.log(this.props.params);
    }

    componentDidMount() {
        const hei = findDomNode(this.lv).parentNode.offsetHeight;
        setTimeout(() => {
            this.setState({
                height: hei,
            });
        }, 600);

        const scrollY = sessionStorage.getItem('articleListScroll');
        if (scrollY) {
            // this.lv.scrollTo(0, scrollY);
            console.log('scrollY', scrollY);
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
        const { live } = this.props;
        const lastTimsTamp = live.lists[0].update_time;
        this.dispatch({
            type: 'live/getList',
            payload: {
                timestamp: lastTimsTamp,
                last: 1,
            },
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
        sessionStorage.setItem('articleListScroll', scrollY);
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
        let showDayTime;
        const dateTime = formatDateTime(new Date(rowData.update_time * 1000), 'yyyy-MM-dd');
        const minTime = formatDateTime(new Date(rowData.update_time * 1000), 'yyyy-MM-dd hh:mm');
        if (dateTime !== dayDate) {
            dayDate = dateTime;
            showDayTime = true;
        } else {
            showDayTime = false;
        }
        return (
            <Hammer onTap={() => { this.goToDetail(rowData); }} key={shortid.generate()}>
                <div className="liveRow">
                    {showDayTime && <div className="liveRowHeader"><i className="iconfont dataTime">&#xe808;</i>{dateTime}</div>}
                    <div className="liveRowBody">
                        <h4>({rowData.id}){minTime} {rowData.title}</h4>
                        {rowData.content}
                    </div>
                    <div className="liveRowFooter">
                        <span className="good">
                            <i className="iconfont">&#xe668;</i>
                            看多（{rowData.good}）
                        </span>
                        <span className="bad">
                            <i className="iconfont">&#xe608;</i>
                            看空（{rowData.bad}）
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
            <div style={{ padding: 10, fontSize: '12px', textAlign: 'center' }}>
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
        console.log('rending');
        dayDate = null;
        const { history, live } = this.props;
        const { lists } = live;
        this.dataSource = this.dataSource.cloneWithRows(lists);
        return (
            <div className="article-box">
                <div className="bobox">
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
                        onScroll={this.handleScroll}
                        initialListSize={pageSize * 2}
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
