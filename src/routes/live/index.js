import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import _ from 'lodash';
import { WhiteSpace, Toast, ListView, PullToRefresh, Card, Grid, Modal, Flex, ActivityIndicator } from 'antd-mobile';
import Hammer from 'react-hammerjs';
import shortid from 'shortid';
import { Func } from '../../utils';
import Menu from '../../components/Menu';
import './index.scss';
import '../../assets/font/iconfont.css';

const { formatDateTime, dateStr } = Func;
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
            type: 'live/getList',
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
    getData = () => {
        const { live } = this.props;
        const lastTimsTamp = live.lists[live.lists.length - 1].update_time;
        console.log(lastTimsTamp);
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
                        <h4>{minTime}</h4>
                        {rowData.content}
                    </div>
                    <div className="liveRowFooter">
                        <span className="good">
                            <i className="iconfont">&#xe668;</i>
                            看涨（{rowData.good}）
                        </span>
                        <span className="bad">
                            <i className="iconfont">&#xe608;</i>
                            看跌（{rowData.bad}）
                        </span>
                    </div>
                </div>
            </Hammer>
        );
    };

    render() {
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
        live: state.live,
    };
}

export default connect(mapStateToProps)(Live);
