import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import queryString from 'query-string';
import { List, InputItem, WingBlank, Button, WhiteSpace, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import Hammer from 'react-hammerjs';
import shortid from 'shortid';
import Btn from '../../components/Btn';
import { config, Func } from '../../utils';
import './index.scss';
import '../../assets/font/iconfont.css';

const { pcHost } = config;
const { phoneReg, passwordReg } = config.reg;
const { getQueryString } = Func;

if (sessionStorage.getItem('_token') !== null) {
    if (getQueryString('returl')) {
        window.location.replace(getQueryString('returl'));
    } else {
        window.location.replace('/#/user?type=user');
    }
}

class Myform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: null,
            phonehasError: true,
            password: null,
            passwordhasError: true,
            // phone: 13719171472,
            // phonehasError: false,
            // password: 123456,
            // passwordhasError: false,
        };
        this.dispatch = this.props.dispatch;
    }
    componentWillMount() {
        // 自动跳转致pc
        if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            window.location.href = `${pcHost}/login`;
        }
    }
    componentDidMount() {
        Func.changeTitle('数字财经 - 用户登录');
    }
    componentWillUnmount() {
        Func.changeTitle('');
    }
    onSubmit = () => {
        this.dispatch({
            type: 'user/login',
            payload: {
                phone: this.state.phone,
                password: this.state.password,
            },
        }).then((data) => {
            if (data.success) {
                sessionStorage.setItem('_token', data.payload.data.token);
                if (getQueryString('returl')) {
                    window.location.replace(getQueryString('returl'));
                } else {
                    window.location.replace('/#/user?type=user');
                }
            }
        });
    }
    onErrorClick = (msg) => {
        Toast.info(msg);
    }
    goPage = (url) => {
        this.dispatch(routerRedux.push(url));
    }

    handlePhoneChange = (v) => {
        let phonehasErrorVal;
        if (v && phoneReg.test(v)) { // 校验规则
            phonehasErrorVal = false;
        } else {
            phonehasErrorVal = true;
        }
        this.setState({
            phone: v,
            phonehasError: phonehasErrorVal,
        });
    }

    handlePasswordChange = (v) => {
        let passwordhasErrorVal;
        if (v && passwordReg.test(v)) { // 校验规则
            passwordhasErrorVal = false;
        } else {
            passwordhasErrorVal = true;
        }
        this.setState({
            password: v,
            passwordhasError: passwordhasErrorVal,
        });
    }

    render() {
        const { location } = this.props;
        const pathName = this.props.location.pathname;
        const query = queryString.parse(this.props.location.search);
        const { getFieldProps, getFieldError } = this.props.form;
        let ctrBtn = null;
        if (!this.state.phonehasError && !this.state.passwordhasError && !this.state.codehasError) {
            ctrBtn = <Button className="mt20" type="primary" onClick={() => { this.onSubmit(); }} >登录</Button>;
        } else {
            ctrBtn = <Button className="mt20" type="primary" disabled >登录</Button>;
        }

        return (
            <form className="userWp">
                <div className="myForm">
                    <List
                        renderHeader={() => '登录'}
                    >
                        <InputItem
                            {...getFieldProps('phone')}
                            clear
                            value={this.state.phone}
                            error={this.state.phonehasError}
                            onErrorClick={() => (this.onErrorClick('请输入手机号'))}
                            placeholder="手机号码"
                            onChange={(v) => { this.handlePhoneChange(v); }}
                        >
                            <i className="iconfont">&#xe65a;</i>
                        </InputItem>
                        <InputItem
                            {...getFieldProps('password')}
                            clear
                            value={this.state.password}
                            error={this.state.passwordhasError}
                            onErrorClick={() => (this.onErrorClick('请设置密码'))}
                            onChange={(v) => { this.handlePasswordChange(v); }}
                            placeholder="密码"
                            type="passWord"
                        >
                            <i className="iconfont">&#xe622;</i>
                        </InputItem>
                        <WingBlank>
                            {ctrBtn}
                            <WhiteSpace size="xl" />
                            <Hammer
                                onTap={() => {
                                    const url = '/register?type=user';
                                    this.goPage(url);
                                }}
                                key={shortid.generate()}
                            >
                                <div><Btn type="default">还没账号？立即<b>注册</b></Btn></div>
                            </Hammer>
                        </WingBlank>
                    </List>
                </div>
            </form>
        );
    }
}


Myform.propTypes = {
};

function mapStateToProps(state, ownProps) {
    return {};
}
export default connect(mapStateToProps)(createForm()(Myform));

