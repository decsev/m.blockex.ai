import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Hammer from 'react-hammerjs';
import { Func } from '../../utils';
import Header from '../../components/Header';
import styles from './index.scss';

const { formatDateTime, dateStr, getQueryString } = Func;

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.dispatch = this.props.dispatch;
    }
    componentDidMount() {
        Func.changeTitle('数字财经 - 关于我们');
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
            title: '关于我们',
        };
        return (
            <div style={{ height: '100%' }}>
                <Header {...opt} />
                <div className="bodyWp">
                    <div className="logo">
                        <img src="./static/img/logo.png" alt="" />
                    </div>
                    <div className="introAboutUs">
                        <p>数字财经，国内领先的24小时区块链财经资讯门户，全天候不间断报道全球区块链新闻，并致力于让最广大民众参与到区块链重构世界的过程中去。</p>
                        <p>继互联网之后，区块链正成为人类社会的第四次科技革命，它不仅在颠覆交易、社交、通信等现代社会基础行业的技术构成，还在重塑着人类的一切生产关系。</p>
                        <p>区块链不仅把一切信息互联，还把价值互联互通，使之保持真实、高效流动。未来，将是一个区块链无处不在，重塑每个人的时代，一场国民性的区块链启蒙运动正在兴起。在这一剧烈变动期，区块链领域信息极度不对称，项目良莠混杂。</p>
                        <p>数字财经生逢其时，我们的股东与团队中无任何区块链直接利益方，我们将始终秉承独立客观的媒体立场，为广大投资者提供真实、有用的专业区块链资讯。</p>
                        <p>数字财经将与全球最具好奇心，最具向上动力和最具活力的人群始终站在一起。</p>
                    </div>
                    <div className="intro">
                        <p>商务微信：18502058600</p>
                        <p>商务邮箱：bd@phix.cn</p>
                        <p>投稿邮箱：ci@phix.cn</p>
                    </div>
                </div>
            </div>
        );
    }
}

About.propTypes = {

};

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps)(About);
