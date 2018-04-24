import React, { Component } from 'react';
import { connect } from 'dva';
import Hammer from 'react-hammerjs';
import { Func } from '../../utils';
import styles from './index.scss';

const { formatDateTime, dateStr, getQueryString } = Func;

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const { goback, title } = this.props;
        return (
            <div>
                <div className="navBar">
                    <Hammer onTap={() => { goback(); }}>
                        <i className="iconfont">&#xe61f;</i>
                    </Hammer>
                    <span className="mtitle">{title}</span>
                </div>
            </div>
        );
    }
}

export default Index;
