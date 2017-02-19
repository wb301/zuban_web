import Vue from 'vue';

// 把数字四舍五入为指定小数位数的数字。
// num:保留小数位数,可传Int类型，string类型，值为非负数;不穿参数默认为2
Vue.filter('toFixed', function(value, num) {
    if (num !== 0 || num === '0') {
        num = (num && (num % 1 == 0) && num > 0) ? parseInt(num) : 2
    }
    if (isNaN(value)) {
        return value;
    }
    return Number(value).toFixed(num);
});


//乘法:value*multiplier
Vue.filter('multiply', function(value, multiplier) {
    if (isNaN(value) || isNaN(multiplier)) {
        return value;
    }
    var m = 0,
        s1 = value.toString(),
        s2 = multiplier.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {}
    try {
        m += s2.split(".")[1].length
    } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(
        10, m);
})
