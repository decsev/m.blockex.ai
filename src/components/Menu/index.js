import React, { Component } from 'react';
import { connect } from 'dva';
import { NavLink, Link } from 'dva/router';
import './index.scss';
import { debug } from 'util';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cur: this.props.cur
        };
    }
    componentDidMount() {
        this.lv.scrollLeft = this.getScrollWidth();
    }
    componentDidUpdate() {
        this.lv.scrollLeft = this.getScrollWidth();
    }
    getArrayIndex(arrs,o) {
        let wz = 0;
        for(let i=0; i<arrs.length; i++){
            if(arrs[i] === o){
                wz = i;
            }
        }
        return wz;
    }
    getScrollWidth(){
        let visible_w,can_scroll_width,whole_width,piece_width,active_ele,eles,active_index,need_scroll_width;
        eles = this.lv.querySelectorAll('a');
        active_ele = this.lv.querySelector('.active');
        active_index = this.getArrayIndex(eles, active_ele);
        whole_width = this.lv.scrollWidth;
        visible_w = this.lv.clientWidth;
        piece_width = active_ele.clientWidth;
        can_scroll_width = whole_width - visible_w;
        need_scroll_width = active_index * piece_width-(visible_w/2 - piece_width/2);
        if(need_scroll_width<0) return 0;
        if(need_scroll_width>=0 && need_scroll_width<=can_scroll_width) return need_scroll_width;
        if(need_scroll_width>can_scroll_width) return can_scroll_width;
    }
    render() {
        const { menus } = this.props;
        return (
            <div className="header">
                <div className="header_banner">
                    <img src="http://m.huoxing24.com/img/top-3ad7f237bc.jpg" />
                </div>
                <div className="top_menu_bar">
                    <div className="top_menu_list" ref={el => this.lv = el}>
                        { menus.map((item, index) => <NavLink to={item.route + item.id} key={index}>{item.name}</NavLink>)}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { menus: state.menu.menus };
}

export default connect(mapStateToProps)(Menu);
