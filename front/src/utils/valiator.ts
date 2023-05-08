
export function validateEmail(email: string){

}

export function validatePassword(password: string){
    return /(?=.*[0-9])(?=.*[\.!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,30}/.test(password)
}

export function validateLogin(login: string){
    return /^[a-z0-9_-]{3,15}$/.test(login)
}
