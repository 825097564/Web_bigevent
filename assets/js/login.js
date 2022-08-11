$(function() {
    //点击去注册账号的连接
    $('#link_reg').on("click", function() {
            $('.login-box').hide();
            $('.reg-box').show();
        })
        //点击去登录账号的连接
    $('#link_login').on("click", function() {
            $('.reg-box').hide();
            $('.login-box').show();
        })
        //从layui中过去form对象
    var form = layui.form
    var layer = layui.layer
    var url =
        //通过form.varify()函数自定义校验规则
        form.verify({
            //自定义一个pwd校验规则
            'pwd': [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            //校验两个密码是否一致
            'repwd': function(value) {
                //通过形参获取确认密码框的内容
                var pwd = $('.reg-box [name=password]').val();
                if (value !== pwd) {
                    return layer.msg('两次输入密码不一致');
                }
            }
        })
        //监听注册表单提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        $.post('/api/reguser', { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() },
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录');
                $('#link_login').click();
            });
    })
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('用户名或密码不正确')
                }
                layer.msg('登陆成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})