import React, { Component } from 'react';
import { connect } from 'dva';
import { Func } from '../../utils';
import styles from './index.scss';

const { formatDateTime, dateStr, getQueryString } = Func;

class ArticleDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.dispatch = this.props.dispatch;
    }

    render() {
        const data = this.props.articleDetail;
        if (JSON.stringify(data) === '{}' || !data) {
            return null;
        }
        return (
            <div className="articleDetailWp">
                <div className="title">{data.title}</div>
                <div className="subTitle">{formatDateTime(new Date(data.create_time  * 1000), 'yyyy-MM-dd hh:mm:ss')}</div>
                <div className="description" dangerouslySetInnerHTML={{ __html: data.description }} />
                <div className="content"  dangerouslySetInnerHTML={{ __html: data.content }} />
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
