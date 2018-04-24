import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Hammer from 'react-hammerjs';
import { Func, config } from '../../utils';
import Header from '../../components/Header';
import styles from './index.scss';
import favourite from '../../models/favourite';

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
    ctrFavourite = () => {
        console.log(this.props);
        const { params } = this.props.match;
        const p = {
            type: 1,
            object_id: params.articleId,
        };
        this.dispatch({
            type: 'favourite/ctrFavourite',
            payload: {
                ...p,
            },
        });
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
        // 判断文章是否已经加入收藏
        const { favourites } = this.props.favourite;
        const { params } = this.props.match;
        let collectedClass = '';

        if (favourites.indexOf(params.articleId) > -1) {
            collectedClass = 'collected';
        }
        return (
            <div>
                <Header {...opt} />
                <div className="articleDetailWp">
                    <div className="title">{data.title}</div>
                    <div className="subTitle">{formatDateTime(new Date(data.create_time  * 1000), 'yyyy-MM-dd hh:mm:ss')}</div>
                    <div className="description" dangerouslySetInnerHTML={{ __html: data.description }} />
                    <div className="content"  dangerouslySetInnerHTML={{ __html: data.content }} />
                </div>
                <div className="article-detail-bottom">
                    <Hammer onTap={() => { this.ctrFavourite(); }}>
                        <span className={collectedClass}><i className="icon iconfont">&#xe60d;</i> 收藏</span>
                    </Hammer>
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
        favourite: state.favourite,
    };
}

export default connect(mapStateToProps)(ArticleDetail);
