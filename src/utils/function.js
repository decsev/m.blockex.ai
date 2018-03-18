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
};
(function () {
    window.Func = Func;
}());
export default Func;
