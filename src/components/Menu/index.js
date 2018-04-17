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
    oddEvent(match, location) {
        if (!match) {
            return false;
        }
        const reg = /^\/article\/(\d*)$/g;
        const channelId = location.pathname.replace(reg, '$1');
        sessionStorage.setItem('currentCategoryId', channelId);
        return true;
    }
    render() {
        const { menus } = this.props;
        const itemRoute = '/article/';
        return (
            <div className="header">
                <div className="top_menu_bar">
                    <div className="top_menu_list" ref={(el) => { this.lv = el; }}>
                        { menus && menus.map((item, index) => <NavLink to={{ pathname: itemRoute + item.id, search: `?type=news&id=${item.id}` }} key={shortid.generate()} isActive={this.oddEvent}>{item.title}</NavLink>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Menu;
