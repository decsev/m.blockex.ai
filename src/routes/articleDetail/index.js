import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Hammer from 'react-hammerjs';
import { Func, config } from '../../utils';
import Header from '../../components/Header';
import styles from './index.scss';

const { name, pcHost } = config;
const { formatDateTime, dateStr, getQueryString } = Func;

class ArticleDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.dispatch = this.props.dispatch;
    }

    componentWillMount() {
        const currentArticleId = this.props.match.params.articleId;
        // 自动跳转致pc
        if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            window.location.href = `${pcHost}/news/${currentArticleId}.html`;
        }
    }
    componentDidMount() {

    }
    componentWillUnmount() {
        Func.changeTitle('');
    }
    render() {
        const data = this.props.articleDetail;
        Func.changeTitle(`数字财经 - ${this.props.articleDetail.title}`);
        if (JSON.stringify(data) === '{}' || !data) {
            return null;
        }
        const opt = {
            goback: () => {
                if (this.props.history.action === 'POP') {
                    this.props.dispatch(routerRedux.push('/'));
                } else {
                    this.props.history.goBack(-1);
                }
            },
            title: name,
        };
        return (
            <div>
                <Header {...opt} />
                <div className="articleDetailWp">
                    <div className="title">{data.title}</div>
                    <div className="subTitle">{formatDateTime(new Date(data.create_time  * 1000), 'yyyy-MM-dd hh:mm:ss')}</div>
                    <div className="description" dangerouslySetInnerHTML={{ __html: data.description }} />
                    <div className="content"  dangerouslySetInnerHTML={{ __html: data.content }} />
                </div>
            </div>
        );
    }
}

ArticleDetail.propTypes = {

};

function mapStateToProps(state) {
    return {
        articleDetail: state.articleDetail,
    };
}

export default connect(mapStateToProps)(ArticleDetail);
