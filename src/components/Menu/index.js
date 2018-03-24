import React, { Component } from 'react';
import { connect } from 'dva';
import { NavLink, Link } from 'dva/router';
import shortid from 'shortid';
import HeaderBanner from '../HeaderBanner';

import './index.scss';


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.getScrollWidth = this.getScrollWidth.bind(this);
    }
    componentDidMount() {
        this.getScrollWidth();
    }
    componentDidUpdate() {
        this.getScrollWidth();
    }
    getArrayIndex(arrs, o) {
        let wz = 0;
        for (let i = 0; i < arrs.length; i++) {
            if (arrs[i] === o) {
                wz = i;
            }
        }
        return wz;
    }
    getScrollWidth() {
        if (this.props.menus === null) return;
        const eles = this.lv.querySelectorAll('a');
        const activeEle = this.lv.querySelector('.active');
        const activeIndex = this.getArrayIndex(eles, activeEle);
        const wholeWidth = this.lv.scrollWidth;
        const visibleWidth = this.lv.clientWidth;
        const pieceWidth = activeEle.clientWidth;
        const canScrollWidth = wholeWidth - visibleWidth;
        const needScrollWidth = activeIndex * pieceWidth - (visibleWidth / 2 - pieceWidth / 2);
        if (needScrollWidth < 0) {
            this.lv.scrollLeft = 0;
        }
        if (needScrollWidth >= 0 && needScrollWidth <= canScrollWidth) {
            this.lv.scrollLeft = needScrollWidth;
        }
        if (needScrollWidth > canScrollWidth) {
            this.lv.scrollLeft = canScrollWidth;
        }
    }
    render() {
        const { menus } = this.props;
        return (
            <div className="header">
                <HeaderBanner />
                <div className="top_menu_bar">
                    <div className="top_menu_list" ref={(el) => { this.lv = el; }}>
                        { menus && menus.map((item, index) => <NavLink to={{ pathname: item.route + item.id, search: '?type=news' }} key={shortid.generate()}>{item.name}</NavLink>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Menu;
