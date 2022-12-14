$(function() {
        //调用函数获取基本信息
        getUserInfo();
        $('#btnlogout').on('click', function() {
            layer.confirm('是否确定退出？', { icon: 3, title: '提示' }, function(index) {
                //do something
                localStorage.removeItem('token');
                location.href = '/login.html';
                layer.close(index);
            });
        })
    })
    //获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                renderAvater(res.data);
            }
            //无论成功还是失败都会执行
            // complete: function(res) {
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //         localStorage.removeItem('token');
            //         location.href = '/login.html';
            //     }
            // }
    })
}
//渲染用户头像
function renderAvater(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}