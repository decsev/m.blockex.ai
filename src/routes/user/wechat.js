import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Hammer from 'react-hammerjs';
import { Func } from '../../utils';
import Header from '../../components/Header';
import styles from './index.scss';

const { formatDateTime, dateStr, getQueryString } = Func;

class Recommend extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.dispatch = this.props.dispatch;
    }
    componentDidMount() {
        Func.changeTitle('数字财经 - 核心用户群');
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
            title: '数字财经核心用户群',
        };
        return (
            <div style={{ height: '100%' }}>
                <Header {...opt} />
                <div className="bodyWp">
                    <div className="wechat">
                        <div className="recommend">
                        数字财经，不只是区块链。<br />
                        2018，与数字财经一起，这里有行业大咖，密码学者，技术精英，区块链行业先行者，证券和金融业者…… <br />
                        在这里把握区块链和数字货币脉搏，掘金数字资产，提前进入未来。
                        </div>
                        <div className="codeImg">
                            <img src="http://www.phix.cn/www/Public/v1/img/df/code.jpeg?v=6" alt="" />
                            <p>数字财经核心用户微信群</p>
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
