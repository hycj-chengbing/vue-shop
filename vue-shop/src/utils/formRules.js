import { checkEmail, checkMobile } from "./reg";
export const loginFormRules = {
    // 验证用户名是否合法
    username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        {
            min: 3,
            max: 10,
            message: "用户名长度在 3~10 个字符",
            trigger: ["blur", "change"],
        },
    ],
    // 验证密码是否合法
    password: [
        { required: true, message: "请输入登录密码", trigger: "blur" },
        {
            min: 3,
            max: 10,
            message: "密码长度在 6 ~ 15 个字符",
            trigger: ["blur", "change"],
        },
    ],
}
export const addUserFormRules = {
    username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        {
            min: 3,
            max: 10,
            message: "用户名称的长度在3~10个字符之间",
            trigger: "blur",
        },
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        {
            min: 6,
            max: 15,
            message: "密码的长度在6~15个字符之间",
            trigger: "blur",
        },
    ],
    email: [
        { required: true, message: "请输入邮箱地址", trigger: "blur" },
        { validator: checkEmail, trigger: "blur" },
    ],
    mobile: [
        { required: true, message: "请输入手机号", trigger: "blur" },
        { validator: checkMobile, trigger: ["blur", "change"] },
    ],
}
export const editUserFormRules = {
    email: [
        { required: true, message: "请输入用户邮箱", trigger: "blur" },
        { validator: checkEmail, trigger: "blur" },
    ],
    mobile: [
        { required: true, message: "请输入用户手机", trigger: "blur" },
        { validator: checkMobile, trigger: ["blur", "change"] },
    ],
}

export const addRoleFormRules = {
    roleName: [
        { required: true, message: "请输入角色名称", trigger: "blur" },
    ],
    roleDesc: [
        { required: true, message: "请输入角色描述", trigger: "blur" },
    ],
}
export const addCateFormRules = {
    cat_name: [
        { required: true, message: "请输入分类名称", trigger: "blur" },
    ],
}
export const addParamFormRules = {
    attr_name: [
        { required: true, message: "请输入参数名称", trigger: "blur" },
    ],
}
export const editParamFormRules = {
    attr_name: [
        { required: true, message: "请输入参数名称", trigger: "blur" },
    ],
}

export const goodFormRules = {
    goods_name: [
        { required: true, message: "请输入商品名称", trigger: "blur" },
    ],
    goods_price: [
        { required: true, message: "请输入商品价格", trigger: "blur" },
    ],
    goods_weight: [
        { required: true, message: "请输入商品重量", trigger: "blur" },
    ],
    goods_number: [
        { required: true, message: "请输入商品数量", trigger: "blur" },
    ],
    goods_cat: [
        { required: true, message: "请选择商品分类", trigger: "blur" },
    ],
}