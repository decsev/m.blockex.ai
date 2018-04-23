import React, { Component }  from 'react';
import { routerRedux } from 'dva/router';
import Hammer from 'react-hammerjs';
import { config } from '../../utils';
import './index.scss';

const { defaultCategoryId, pcHost } = config;
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div className="my_header">
                <Hammer onTap={() => { this.props.dispatch(routerRedux.push(`/article?type=news&id=${sessionStorage.getItem('currentCategoryId') || defaultCategoryId}`)); }}>
                    <div className="logo">
                        <img src="./static/img/logo.png"  alt="" />
                    </div>
                </Hammer>
                <a href={pcHost} className="go_pc"><i className="iconfont">&#xe671;</i></a>

                { /* <Hammer onTap={() => { this.props.dispatch(routerRedux.push(`/article/${sessionStorage.getItem('currentCategoryId') || defaultCategoryId}?type=news&id=${sessionStorage.getItem('currentCategoryId') || defaultCategoryId}`)); }}>
                <div className="header_banner">
                    <img src="./static/img/top21.png" alt="" />
                </div>
                </Hammer> */ }
            </div>
        );
    }
}

Index.propTypes = {
};

export default Index;
