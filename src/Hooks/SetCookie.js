import Cookie from 'js-cookie'

const SetCookie =(cookieName,value)=>{
 Cookie.set(cookieName,value,{
    expires:1,
    secure:true,
    sameSite:'Strict',
    path:'/'
 })
}

export default SetCookie;