export const apiConfig = {
    // base_api_host:"../",         //(../)为相对与dist目录     SuperviseSystem/
    // openLink:'http://58.221.243.90:7080/HFSystem/dist/index.html#/',     //http://58.221.243.90:7080/HFSystem/dist/index.html#/
    base_api_host:"HFSystem/",         //(../)为相对与dist目录     SuperviseSystem/
    openLink:'http://localhost:3000/#/',     //http://58.221.243.90:7080/HFSystem/dist/index.html#/
    ak:'uIKRrjtf9CHyGzqQfy6NxAYK9e1AUDKZ',  //百度地图秘钥
    allowUrls : "login",        //不需要添加token请求的接口
    noAppToken:"\/examinationLogin|\/examination|\/examinationSuccess|\/examinationResult",     //访问指定页面时不需要token验证
    noJsonTypeUrls:"\/selDomitoryScoreList|\/getSealRecord|\/getDisciplinary|\/getShopBiddingList|\/getCostRemarkList"+
                    "|\/getDisciplinaryReport|\/getEventList|\/getApplyCarDetail|analysis|selectSignList",         //不需要json传参的接口
    SEAL_ID:5,    //印章保管人id
    file_ip:'http://58.221.243.90:6205/',  //文件ip
    default_avator:'HFSystem/admin/printAvator.png'
} 