// 验证邮箱的规则
export var checkEmail = (rule, value, callback) => {
    // 验证邮箱的正则表达式
    const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;

    if (regEmail.test(value)) {
        // 合法的邮箱
        return callback();
    }
    callback(new Error("请输入正确的邮箱"));
};
// 验证手机号的规则
export var checkMobile = (rule, value, callback) => {
    // 验证手机号的正则表达式
    const regMobile =
        /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

    if (regMobile.test(value)) {
        return callback();
    }
    callback(new Error("请输入正确的手机号"));
};