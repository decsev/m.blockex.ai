import React, { Component } from 'react';
import { connect } from 'dva';
import Hammer from 'react-hammerjs';
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
    goback = () => {
        // const datas = {
        //     cat_name: '',
        //     cat_title: '',
        //     category_id: '',
        //     content: '',
        //     create_time: '',
        //     description: '',
        //     id: '',
        //     nickname: '',
        //     source: '',
        //     title: '',
        //     update_time: '',
        //     view: '',
        // };
        // this.dispatch({ type: 'articleDetail/updataDetail', payload: datas });
        this.props.history.goBack(-1);
    }
    render() {
        const data = this.props.articleDetail;
        if (JSON.stringify(data) === '{}' || !data) {
            return null;
        }
        return (
            <div>
                <div className="navBar">
                    <Hammer onTap={() => { this.goback(); }}>
                        <i className="iconfont">&#xe61f;返回</i>
                    </Hammer>
                </div>
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
