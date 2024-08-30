import moment from 'moment';
moment.locale("zh-cn")
const formatTime = {
    getTime: (date:string)=> {
        // npm i moment --save
        return moment(date).format("YYYY/MM/DD")
    }
}

export default formatTime