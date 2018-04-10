from layout/index.js:


<TabBar.Item
icon={<i className="iconfont">&#xe648;</i>}
selectedIcon={<i className="iconfont selected">&#xe648;</i>}
title="行情"
key="quotation"
selected={query.type === 'quotation'}
onPress={() => {
  this.goPage('/quotation?type=quotation');
}}
data-seed="quotation"
>
{query.type === 'quotation' ? this.props.children : null}
</TabBar.Item>
