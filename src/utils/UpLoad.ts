import { isValidKey } from '@/typing';
import { uploadUserInfo } from '@/request/Login/index';
import type { UserInfoMete } from '@/typing';



// '/adminapi/user/upload'


const upload = async (path:string,userForm:UserInfoMete)  => {
    const formData = new FormData() 

    console.log(path,userForm);
    
    for (let key in userForm) {
        if (isValidKey(key, userForm)) {
            formData.append(key, userForm[key])
        }
    }
    let res = await uploadUserInfo(path,formData)
    return res
}

export default upload
