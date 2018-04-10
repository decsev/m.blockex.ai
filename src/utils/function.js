/* eslint-disable */
/**
 * Created by lisp on 2016/4/28.
 */
import { request, requestJsonp } from '../utils';

const Func = {
    changeTitle(title) {
        const $body = $('body');
        document.title = title;
        const $iframe = $("<iframe src=''></iframe>");
        $iframe.on('load', () => {
            setTimeout(() => {
                $iframe.off('load').remove();
            }, 0);
        }).appendTo($body);
    },
    // 数组比较
    arrDifference(arr1, arr2, type) {
        const a = new Set(arr1);
        const b = new Set(arr2);

        switch (type) {
            case 'difference':
                const differenceABSet = new Set([...a].filter(x => !b.has(x)));
                return [...differenceABSet];
            case 'unionSet':
                const unionSet = new Set([...a, ...b]);
                return [...unionSet];
            case 'intersection':
                const intersection = new Set([...a].filter(x => b.has(x)));
                return [...intersection];
            default:
                return [];
        }
    },
    // HTML TO UBB
    pattern(str) {
        // str = str.replace(/(\r\n|\n|\r)/ig, '');
        str = str.replace(/<br[^>]*>/ig, '\n');
        str = str.replace(/<p[^>\/]*\/>/ig, '\n');
        // str = str.replace(/\[code\](.+?)\[\/code\]/ig, function($1, $2) {return phpcode($2);});
        str = str.replace(/\son[\w]{3,16}\s?=\s*([\'\"]).+?\1/ig, '');

        str = str.replace(/<hr[^>]*>/ig, '[hr]');
        str = str.replace(/<(sub|sup|u|strike|b|i|pre)>/ig, '[$1]');
        str = str.replace(/<\/(sub|sup|u|strike|b|i|pre)>/ig, '[/$1]');
        str = str.replace(/<(\/)?strong>/ig, '[$1b]');
        str = str.replace(/<(\/)?em>/ig, '[$1i]');
        str = str.replace(/<(\/)?blockquote([^>]*)>/ig, '[$1blockquote]');

        str = str.replace(/<img[^>]*smile=\"(\d+)\"[^>]*>/ig, '[s:$1]');
        str = str.replace(/<img[^>]*src=[\'\"\s]*([^\s\'\"]+)[^>]*>/ig, '[img]$1[/img]');
        str = str.replace(/<a[^>]*href=[\'\"\s]*([^\s\'\"]*)[^>]*>(.+?)<\/a>/ig, '[url=$1]$2[/url]');
        // str = str.replace(/<h([1-6]+)([^>]*)>(.*?)<\/h\1>/ig,function($1,$2,$3,$4){return h($3,$4,$2);});

        str = str.replace(/<[^>]*?>/ig, '');
        // str = str.replace(/&amp;/ig, '&');
        str = str.replace(/&lt;/ig, '<');
        str = str.replace(/&gt;/ig, '>');
        str = str.replace(/&nbsp;/ig, ' ');
        return str;
    },
    // UBB TO HTML
    up(str) {
        str = str.replace(/</ig, '&lt;');
        str = str.replace(/>/ig, '&gt;');
        str = str.replace(/\n/ig, '<br />');
        str = str.replace(/&amp;/ig, '&');
        str = str.replace(/\[code\](.+?)\[\/code\]/ig, ($1, $2) => phpcode($2));

        str = str.replace(/\[hr\]/ig, '<hr />');
        str = str.replace(/\[\/(size|color|font|backcolor)\]/ig, '</font>');
        str = str.replace(/\[(sub|sup|u|i|strike|b|blockquote|li)\]/ig, '<$1>');
        str = str.replace(/\[\/(sub|sup|u|i|strike|b|blockquote|li)\]/ig, '</$1>');
        str = str.replace(/\[\/align\]/ig, '</p>');
        str = str.replace(/\[(\/)?h([1-6])\]/ig, '<$1h$2>');

        str = str.replace(/\[align=(left|center|right|justify)\]/ig, '<p align="$1">');
        str = str.replace(/\[size=(\d+?)\]/ig, '<font size="$1">');
        str = str.replace(/\[color=([^\[\<]+?)\]/ig, '<font color="$1">');
        str = str.replace(/\[backcolor=([^\[\<]+?)\]/ig, '<font style="background-color:$1">');
        str = str.replace(/\[font=([^\[\<]+?)\]/ig, '<font face="$1">');
        str = str.replace(/\[list=(a|A|1)\](.+?)\[\/list\]/ig, '<ol type="$1">$2</ol>');
        str = str.replace(/\[(\/)?list\]/ig, '<$1ul>');

        str = str.replace(/\[s:(\d+)\]/ig, ($1, $2) => smilepath($2));
        str = str.replace(/\[img\]([^\[]*)\[\/img\]/ig, '<img src="$1" border="0" />');
        str = str.replace(/\[url=([^\]]+)\]([^\[]+)\[\/url\]/ig, '<a href="$1">$2</a>');
        str = str.replace(/\[url\]([^\[]+)\[\/url\]/ig, '<a href="$1">$1</a>');
        return str;
    },

    //格式化日期时间 formatDateTime(date,fmt)
    formatDateTime(date, fmt) {
        if (typeof(date) == "string")
            date = new Date(parseInt(date.replace("/Date(", "").replace(")/", ""), 10));

        if (fmt == null || fmt == undefined)
            fmt = "yyyy-MM-dd hh:mm";

        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };

        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));

        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

        return fmt;
    },
    /**
     * 毫秒转换友好的显示格式
     * 输出格式：21小时前
     * @param  {[type]} time [description]
     * @return {[type]}      [description]
     */
    dateStr(date){
        //获取js 时间戳
        var time=new Date().getTime();
        //去掉 js 时间戳后三位，与php 时间戳保持一致
        time=parseInt((time-date*1000)/1000);
    
        //存储转换值 
        var s;
        if(time<60*10){//十分钟内
            return '刚刚';
        }else if((time<60*60)&&(time>=60*10)){
            //超过十分钟少于1小时
            s = Math.floor(time/60);
            return  s+"分钟前";
        }else if((time<60*60*24)&&(time>=60*60)){ 
            //超过1小时少于24小时
            s = Math.floor(time/60/60);
            return  s+"小时前";
        }else if((time<60*60*24*3)&&(time>=60*60*24)){ 
            //超过1天少于3天内
            s = Math.floor(time/60/60/24);
            return s+"天前";
        }else{ 
            //超过3天
            var date= new Date(parseInt(date) * 1000);
            return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
        }
    },
    /**
     * 对象转url search
     * 
     * @param {any} o {key:val,key1:val1}
     * @returns 
     */
    obj2search(o){
        let str = '';
        if(JSON.stringify(o) === '{}'){
            return str;
        } else {
            for(let key in o){
                str += (str===''? `${key}=${o[key]}` : `&${key}=${o[key]}`);
            }
            return str;
        }
    },
    /**
     * 获取hash中指定的某个参数值
     * 
     * @param {any} o {key:val,key1:val1}
     * @returns 
     */
    getQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.hash.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    },
    /**
     * 通过数组对象属性值获取该对象在数组中的index
     * @param 
     * @returns 
     */
    getObjIndexInArrary(Arr, key, val){
        let index = -1;
        if(Arr.length === 0) return index;
        for(let i=0; i < Arr.length; i++){
            if(Arr[i][key] === val){
                index = i;
            }
        }
        return index;        
    },
};
(function () {
    window.Func = Func;
}());
export default Func;
