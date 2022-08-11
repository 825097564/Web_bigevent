//每次调用$.ajax都会先调用这个
$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url)
})