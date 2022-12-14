$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6~12位,且不能出现空格'],
        samePwd: function(value) {
            if (value === $('[name = oldPwd]').val()) {
                return '新密码不能与旧密码一致！'
            }
        }
    })
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新失败')
                }
                layer.msg('更新密码成功')
                $('.layui-form')[0].reset();
            }
        })
    })
})