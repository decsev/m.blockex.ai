import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import queryString from 'query-string';
import { List, InputItem, WingBlank, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import { config, Func } from '../../utils';
import './index.scss';
import '../../assets/font/iconfont.css';


const { phoneReg, passwordReg } = config.reg;
const { getQueryString } = Func;

if (sessionStorage.getItem('_token') === null) {
    if (getQueryString('returl')) {
        window.location.replace(getQueryString('returl'));
    } else {
        window.location.replace('/');
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
        };
        this.dispatch = this.props.dispatch;
    }
    onSubmit = () => {
        // window.location.replace('http://www.baidu.com');
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
            <form>
                <div className="myForm">
                    <List
                        renderHeader={() => '登录'}
                        renderFooter={() => getFieldError('userName') && getFieldError('userName').join(',')}
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
                            <Button
                                className="mt20"
                                onClick={() => {
                                    const url = '/register?type=user';
                                    this.goPage(url);
                                }}
                            >
                              还没账号？立即注册
                            </Button>
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

