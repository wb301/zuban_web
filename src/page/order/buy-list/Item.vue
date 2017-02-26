<template>
    <div>
        <div class="item-entry">
            <div class="wapper">
                <div class="head-wapper">
                    <span class="img-head"><img :src="item.seller.head_img"></span>
                    <span class="name">{{item.seller.nick_name}}</span>
                    <span class="status">{{item.status_name}}</span>
                </div>

                <!-- <div class="img-wapper"><img :src="item.seller.head_img"></div>
                <div class="info-wapper">
                    <div>
                        <div class="info-top">
                            <div>
                                <span class="title">{{item.nick_name}}</span>
                                <span class="status">{{item.status_name}}</span>
                            </div>
                            <div>
                                <span class="region">{{item.create_time}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="info-bottom">
                        <div class="price">
                            <span>￥</span>
                            <span>{{item.total_price}}</span>
                            <span>{{item.productList[0].num}}</span>
                            <span>{{item.price}}</span>
                        </div>
                        <div class="content">{{item.create_time}}</div>
                    </div>
                </div>-->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        item: {}
    },
    data() {
        return {
        }
    },
    created: function() {
        // console.log(this.item);
        // alert(JSON.stringify(this.item));
        // this.item.danwei = "小时";
        // if (this.item.price_type == 2) {
        //     this.item.danwei = "天";
        // }else if(this.item.price_type == 3){
        //     this.item.danwei = "次";
        // }
        // var map = {
        //     "0": "已下架",
        //     "1": "已上架",
        //     "2": "出售中"
        // };
        // this.item.statusName = map[this.item.status];



//         {
//     "id":"1778",
//     "product_user":"0bd37ad9-097c-ed50-9e4a-6e1ce4e7647a",
//     "user_id":"0bd37ad9-097c-ed50-9e4a-6e1ce4e7647a",
//     "order_no":"14878559411001000005",
//     "total_price":"1.000000",
//     "from_source":"36",
//     "price":"1.000000",
//     "return_price":"0.000000",
//     "status":"0",
//     "remark":"",
//     "memo":"",
//     "notice_trade_no":"",
//     "create_time":"2017-02-23 21:19:01",
//     "update_time":"2017-02-23 21:19:01",
//     "receiver":"",
//     "phone":"",
//     "member_code":"",
//     "order_type":"1",
//     "check_code":"",
//     "is_delete":"0",
//     "status_name":"待付款",
//     "paymentList":[
//         {
//             "id":"323",
//             "order_no":"14878559411001000005",
//             "payment":"ON_LINE",
//             "pay_type":"wx",
//             "pay_price":"1.000000",
//             "update_time":"0000-00-00 00:00:00",
//             "create_time":"2017-02-23 21:19:19",
//             "status":"1"
//         }
//     ],
//     "buyers":{
//         "user_id":"0bd37ad9-097c-ed50-9e4a-6e1ce4e7647a",
//         "head_img":"http://c.hiphotos.baidu.com/image/pic/item/0dd7912397dda1449fad6f63b6b7d0a20df486be.jpg",
//         "nick_name":"李铁锋"
//     },
//     "seller":{
//         "user_id":"0bd37ad9-097c-ed50-9e4a-6e1ce4e7647a",
//         "head_img":"http://c.hiphotos.baidu.com/image/pic/item/0dd7912397dda1449fad6f63b6b7d0a20df486be.jpg",
//         "nick_name":"李铁锋"
//     },
//     "productList":[
//         {
//             "id":"1556",
//             "order_no":"14878559411001000005",
//             "price":"1.000000",
//             "num":"1",
//             "dec_price":"0.000000",
//             "total_price":"1.000000",
//             "status":"1",
//             "create_time":"2017-02-23 21:19:01",
//             "product_sys_code":"1",
//             "product":{
//                 "price_type":"1",
//                 "product_sys_code":"1",
//                 "price":"1.000000",
//                 "status":"1",
//                 "look_price":"0.000000",
//                 "product_image":"http://c.hiphotos.baidu.com/image/pic/item/0dd7912397dda1449fad6f63b6b7d0a20df486be.jpg",
//                 "region_name":"北京-北京市-东城区2",
//                 "region_code":"425",
//                 "product_info":"小姐一头1",
//                 "category_name":"休闲租人"
//             }
//         }
//     ]
// }
    },
    methods: {},
    destroyed() {}
}
</script>
<style lang="less" scoped>
.item-entry {
    height: 226px;
    position: relative;
    bottom: 1;
    .wapper {
        border-bottom: 1px solid #e2e2e2;
        position: absolute;
        right: 0;
        left: 15px;
        top: 0;
        bottom: 0;
        padding-top: 12.5px;
        /*.img-wapper {
            width: 90px;
            height: 90px;
            img {
                width: 90px;
                height: 90px;
            }
        }*/
        .head-wapper {
            position: relative;
            top: 0;
            height: 48px;
            border-bottom: 1px solid #e2e2e2;
            .img-head {
                width: 27px;
                height: 27px;
                img {
                    width: 27px;
                    height: 27px;
                }
            }
            .name {
                    font-size: 15px;
                    color: #333333;
                }
            .status {
                    font-size: 15px;
                    color: #4990E2;
                    position: absolute;
                    right: 5px;
                }
        }
        /*.info-wapper {
            position: absolute;
            left: 100px;
            right: 0;
            top: 12.5px;
            bottom: 15px;
            >div {
                height: 45px;
            }
            .info-top {
                >div {
                    line-height: 15px;
                }
                .title {
                    font-size: 13px;
                    color: #333;
                }
                .region {
                    font-size: 10px;
                    color: #999;
                }
                .status {
                    font-size: 10px;
                    color: #999;
                    position: absolute;
                    right: 10px;
                }
            }
            .info-bottom {
                >div {
                    line-height: 15px;
                }
                .price {
                    color: #A878E5;
                    span:nth-child(1) {
                        font-size: 12px;
                    }
                    span:nth-child(2) {
                        font-size: 17px;
                    }
                    span:nth-child(3) {
                        font-size: 10px;
                    }
                }
                .content {
                    font-size: 10px;
                    color: #999;
                }
            }*/
        /*}*/
    }
}
</style>
