import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.scss';

class ArticleDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.dispatch = this.props.dispatch;
    }

    render() {
        const { data } = this.props.articleDetail;
        return (
            <div style={{ padding: '10px' }}>
                <h2>({data.id}): {data.title}</h2>
                <p>{data.content}</p>
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
