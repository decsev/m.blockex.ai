import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import _ from 'lodash';
import { WhiteSpace, Toast, ListView, Card, Grid, Modal, Flex, ActivityIndicator } from 'antd-mobile';
import Hammer from 'react-hammerjs';
import Menu from '../../components/Menu';
import shortid from 'shortid';


import './index.scss';
/**
 * 列表页
 * @class Community
 * @extends {Component}
 */
class Article extends Component {
    constructor(props) {
        super(props);
        // const sectionId = this.props.match.params.sectionId;
        this.state = {
            isLoading: false,
        };
        this.dispatch = this.props.dispatch;
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    /**
     * 下拉刷新
     *
     * @memberof Forum
     */
    onRefresh = () => {
        const { sectionId } = this.props.state;
        if (!sectionId) {
            return;
        }
        this.dispatch({
            type: 'article/reload',
            payload: {
                sectionId,
                pageIndex: 1,
                isPageChange: false,
            },
        });
    };

    /**
     * ListView滚动到底部
     *
     * @memberof Forum
     */
    onEndReached = () => {
        const { hasMore, pageIndex } = this.props.state.forumList;
        if (this.state.isLoading || !hasMore) {
            return;
        }
        this.pageIndex = pageIndex + 1;
        this.setState({
            isLoading: true,
        }, () => {
            this.getData(this.pageIndex, this.props.state.replyType);
        });
    }

    /**
     * 获取列表数据
     *
     * @param page {int} 页码
     * @memberof Forum
     */
    getData = (page) => {
        this.pageIndex = page;
        const { sectionId } = this.props.state;
        this.dispatch({
            type: 'forum/getForumList',
            payload: {
                sectionId,
                pageIndex: this.pageIndex,
            },
        }).then((res) => {
            if (res.ok) {
                this.setState({
                    isLoading: false,
                });
            } else {
                Toast.fail('网络请求失败');
            }
        });
    }


    render() {
        const { history } = this.props;
        return (
            <div className="article-box">
                <Menu cur={history.location.pathname} />
                <div className="bobox">
                    {history.location.pathname}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        article: state.article
     };
}

export default connect(mapStateToProps)(Article);
