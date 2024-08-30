export const itemtimeStrFun = function (num) {
    let time = new Date(num * 1000)
    // 返回的结果

    // console.log(new Date(time).toDateString() == new Date().toDateString());
    let res = ''
    // 判断是否属于今天
    if (time.toDateString() === new Date().toDateString()) {
        // timeDiff = 时间戳差值
        let timeDiff = Date.parse(new Date()) - (num * 1000)

        if (timeDiff / (3600 * 1000) >= 1) {
            res = Math.floor(timeDiff / (3600 * 1000)) + '小时前'
        } else {
            res = Math.floor(timeDiff / (60 * 1000)) + '分钟前'
        }
    } else {
        // 年
        let y = time.getFullYear()
        // 月
        let m = ('00' + (time.getMonth() + 1)).slice(-2)
        // 日
        let d = ('00' + time.getDate()).slice(-2)

        let h = ('00' + time.getHours()).slice(-2);
        let s = ('00' + time.getMinutes()).slice(-2);

        res = `${y}年${m}月${d}日 ${h}:${s}`
    }


    return res
}

