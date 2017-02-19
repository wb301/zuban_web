var ImageHelper = {};

//处理‘vframe’类型图片
ImageHelper.compressImage = function(p_img, p_width) {
    if (!p_width) {
        p_width = 375;
    }
    var imgUrl = p_img;
    if (p_img.indexOf('vframe') == -1) {
        imgUrl = p_img + "?imageMogr/v2/auto-orient/thumbnail/" + p_width + "x/quality/60/format/jpg";
    }
    return imgUrl;
};
//锚点在正中（Center），生成a x b裁剪图
ImageHelper.cutPicUrlInMiddle = function(p_url, p_width, p_heigth) {
    if (p_url.indexOf('qiniucdn') != -1 || p_url.indexOf('qnssl') != -1) {
        var imgUrl = p_url;
        //if (p_url.indexOf('vframe') == -1) {
        //    imgUrl = p_url + '?imageMogr2/gravity/Center/crop/' + p_width + 'x' + p_heigth;
        //}
        imgUrl = p_url + '?imageMogr2/gravity/Center/crop/' + p_width + 'x' + p_heigth;
        return imgUrl;
    } else {
        return p_url;
    }
};
//裁剪七牛图片
ImageHelper.reducePicUrl = function(p_url, p_width, p_heigth) {
    if (p_url.indexOf('qiniucdn') != -1) {
        var imgUrl = p_url;
        if (p_url.indexOf('vframe') == -1) {
            imgUrl = p_url + '?imageView2/1/w/' + p_width + '/h/' + p_heigth;
        }
        return imgUrl;
    } else {
        return p_url;
    }
};

//http://img8.ibanggo.com/sources/images/goods/TP/816136/816136_01--w_430_h_430.jpg。
ImageHelper.getSoaThumUrl = function(p_url, p_width, p_height) {
    if (p_url == null) return "";
    if (p_url.indexOf('qiniucdn') != -1) {
        return ImageHelper.reducePicUrl(p_url, p_width, p_height);
    }
    // if (p_url.indexOf(".mixme.cn/sources") < 0) return p_url;
    if ((p_url.endsWith(".jpg")) || (p_url.endsWith(".png")) || (p_url.endsWith(".jpeg"))) {
        if (p_url.indexOf("ibanggo") != -1) {
            p_url = p_url.substring(0, p_url.lastIndexOf(".")) + "--w_" + p_width + "_h_" + p_height + ".jpg";
        } else {
            p_url = p_url.substring(0, p_url.lastIndexOf(".")) + "--" + p_width + "x" + p_height + ".jpg";
        }

    } else {
        p_url = p_url + "--" + p_width + "x" + p_height + ".jpg";
    }

    return p_url;
};
/**
 * soa图片压缩处理
 */

ImageHelper.getSoaThumUrlPng = function(p_url, p_width, p_heigth) {
    if (p_url == null) return "";
    // if (p_url.indexOf(".mixme.cn/sources") < 0) return p_url;
    if ((p_url.endsWith(".jpg")) || (p_url.endsWith(".png")) || (p_url.endsWith(".jpeg"))) {
        if (p_url.indexOf("ibanggo") != -1) {
            p_url = p_url.substring(0, p_url.lastIndexOf(".")) + "--w_" + p_width + "_h_" + p_heigth + ".png";
        } else {
            p_url = p_url.substring(0, p_url.lastIndexOf(".")) + "--" + p_width + "x" + p_heigth + ".png";
        }
    } else {
        p_url = p_url + "--" + p_width + "x" + p_heigth + ".png";
    }
    return p_url;
};
//预先加载图片 针对弹出的页面
ImageHelper.preloadImg = function(p_url) {
    var img1 = new Image();
    img1.src = p_url;
};

/*
 * 范背景的图片
 * */
ImageHelper.lazyBgImgInit = function(p_ob, isFan) {
    //灰色背景图
    var bgUrl = 'https://odu358hnp.qnssl.com/grey.gif';
    if (isFan) {
        //范背景的图片
        bgUrl = 'https://odu358hnp.qnssl.com/empty_m-0115.jpg';
    }


    p_ob.each(function() {
        var par = $(this).attr('bg-size');
        var size;
        if (par && par.length > 0) {
            size = par.split('x');
            if (size.length === 2) {
                $(this).attr('src', bgUrl + '?imageView2/1/w/' + size[0] + '/h/' + size[1]);
            }
        } else {
            $(this).attr('src', bgUrl);
        }
    });

};
//获取价值商品铺款背景图
/*https://odu358hnp.qnssl.com/empty_m-0115.jpg?imageView2/1/w/335/h/455/
 *直接使用
 * */
ImageHelper.getLazyBgImg = function(p_width, p_height, p_url) {
    if (!p_url) {
        p_url = 'https://odu358hnp.qnssl.com/empty_m-0115.jpg';
    }
    return ImageHelper.reducePicUrl(p_url, p_width, p_height);
};



module.exports = ImageHelper;
