
import server from "../server";

interface loginForm {
    username: string,
    password: string
}



export const getLogin = (loginForm: loginForm) => {
    return server({
        url: '/adminapi/user/login',
        method: 'POST',
        data: loginForm,
    })
}

export const uploadUserInfo = (path: string, params: object) => {

    return server({
        url: path,
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data"
        },
        data: params
    })
}

export const register = (registerForm: loginForm) => {
    return server({
        url: '/adminapi/user/register',
        method: 'POST',
        data: registerForm
    })

}

export const sendsms = (form:loginForm) => {
    return server({
        url:'/adminapi/user/sendsms',
        method: 'POST',
        data:form
    })
}

export const changePassword = (form:loginForm) => {
    // /adminapi/user/changepassword
    return server({
        url: '/adminapi/user/changepassword',
        method:'POST',
        data:form
    })
}