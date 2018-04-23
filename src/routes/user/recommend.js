import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Hammer from 'react-hammerjs';
import shortid from 'shortid';
import Clipboard from 'clipboard';
import { Func } from '../../utils';
import Header from '../../components/Header';
import styles from './index.scss';
import Success from '../../assets/success.png';

const { formatDateTime, dateStr, getQueryString } = Func;

class Recommend extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.dispatch = this.props.dispatch;
    }
    componentDidMount() {
        Func.changeTitle('数字财经 - 推荐数字财经');
        const clipboard = new Clipboard('.copyBtn');
        clipboard.on('success', (e) => {
            // console.info('Action:', e.action);
            // console.info('Text:', e.text);
            // console.info('Trigger:', e.trigger);
            if (window.$('.dialog-open').length === 0) {
                window.$(document).dialog({
                    type: 'toast',
                    infoIcon: Success,
                    infoText: '复制成功',
                    autoClose: 2500,
                });
                e.clearSelection();
            }
        });
        clipboard.on('error', (e) => {
            // console.error('Action:', e.action);
            // console.error('Trigger:', e.trigger);
        });
    }
    componentWillUnmount() {
        Func.changeTitle('');
    }
    render() {
        const opt = {
            goback: () => {
                if (this.props.history.action === 'POP') {
                    this.props.dispatch(routerRedux.push('/'));
                } else {
                    this.props.history.goBack(-1);
                }
            },
            title: '推荐数字财经',
        };
        return (
            <div className="recommend">
                <Header {...opt} />
                <div className="bodyWp">
                    <div className="share-tpl">
                        <div className="share-header">
                            <img src="http://www.phix.cn/www/Public/img/logo.png" alt="" />
                            <p>除了行情，更有资金/代码等深度挖掘</p>
                        </div>
                        <div className="share-content">
                            <div className="share-content-top">
                                <p className="share-name"><b>您的邀请码</b><br />自动识别邀请码，无需填写</p>
                                <p className="share-code"><b id="bar">BX3ON</b></p>
                                <p>
                                    <button
                                        className="copyBtn"
                                        data-clipboard-action="copy"
                                        data-clipboard-target="#bar"
                                    >
                                            复制
                                    </button>
                                </p>
                                <p className="chance">您还剩5次邀请机会</p>
                                <div className="tips">总共可邀请5位好友加入数字财经领ETH，每邀请一位好友注册后，您将获得<span>0.0001</span>ETH的奖励</div>
                            </div>
                            <div className="share-content-bottom">
                                <img src="http://www.phix.cn/Public/v1/img/df/code.jpeg?v=6" alt="" /><br />
                                <span>数字财经核心用户微信群</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Recommend.propTypes = {

};

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps)(Recommend);
