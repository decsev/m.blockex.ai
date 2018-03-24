import React from 'react';
import { connect } from 'dva';
import './index.css';

function IndexPage() {
    return (
        <div>
            <p>这里是用户中心</p>
        </div>
    );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
