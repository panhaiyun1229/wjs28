$(function () {

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })


    // 需求：
    // 1.动态请求数据，实现结构的动态生成--动态渲染
    // 2.在渲染的时候要根据当前屏幕的宽度进行相应的动态结构生成
    $.ajax({
        type: 'get',
        // js文件最终是被引入到html文件中，也就意味着它所引入的外部资源的路径应该参照html文件
        url: './data/imgdata.json',
        // 如果读取json文件，那么会自动的转换为js对象或数组：[] >> 数组  {} >> 对象
        dataType: 'json',
        success: function (res) {
            // console.log(res)
            var isMobile
            if ($(window).width() > 768) {
                isMobile = false
            } else {
                isMobile = true
            }
            var imgHTML = template('imgTemp', { list: res, isMobile: isMobile })
            $('.carousel-inner').html(imgHTML)

            var indHTML = template('indicatorTemp', { list: res })
            $('.carousel-indicators').html(indHTML)
        }
    })


    // 实现滑动操作
    var carousel_inner = $('.carousel-inner')[0]
    var startX, endX
    // 添加滑动事件
    carousel_inner.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].clientX
    })
    carousel_inner.addEventListener('touchend', function (e) {
        endX = e.changedTouches[0].clientX
        // 获取滑动距离
        var distanceX = endX - startX
        // 判断滑动的距离是否满足条件
        if (Math.abs(distanceX) > 50) {
            if (distanceX > 0) {
                // 上一张
                $('.carousel').carousel('prev')
            } else {
                // 下一张
                $('.carousel').carousel('next')
            }
        }
    })


    // 动态计算产品块标签页导航项的总宽度
    var proUl = $('.wjs_product .nav-tabs')
    var allLi = proUl.find('li')
    var totalWidth = 0
    allLi.each(function(index,value){
        // width():只能获取内容宽度
        // innerWidth():可以获取  内容 + padding 的总宽度
        // outerWidth():可以获取  内容 + padding + border 的总宽度
        // outerWidth(true):可以获取  内容 + padding + border + margin 的总宽度
        // console.log($(value).innerWidth())
        totalWidth += $(value).innerWidth()
    })
    // console.log(totalWidth)
    proUl.width(totalWidth)
    // 使用iscroll实现滑动操作
    var myScroll = new IScroll('.wjs_tabsParent',{
        // 实现水平滑动
        scrollX:true,
        scrollY:false
    });
})