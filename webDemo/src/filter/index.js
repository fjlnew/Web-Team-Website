export default {
    timeFormat: (time)=>{
        var date = new Date(time*1000);
        return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    }
}