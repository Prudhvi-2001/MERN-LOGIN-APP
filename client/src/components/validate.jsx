import { toast } from "react-hot-toast";

export async function registerValidate(values){
    const errors=firstNameVerify({},values)
    lastNameVerify(errors,values)
    emailVerify(errors,values)
    usernameverify(errors,values)
    return errors
}

export async function loginValidate(values){
    let errors=usernameverify({},values)
    emailVerify(errors,values)
    return errors

}
function firstNameVerify(error={},values){
    if(!values.fname) error.fname=toast.error("First Name is required")
    else if(values.fname.includes(" ")) error.fname=toast.error("Invalid First Name")
    return error
}
function lastNameVerify(error={},values){
    if(!values.lname) error.lname=toast.error("Last name is required")
    else if(values.lname.includes(" ")) error.lname=toast.error("Last name is Invalid")
    return error
}
function emailVerify(error={},values){
    const specialChar=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if(!values.email) error.email=toast.error("Email is required")
    else if(values.email.includes(" ")) error.email=toast.error("Email is not valid")
    else if(!specialChar.test(values.email)) error.email=toast.error("Invalid mail")
    return error
}
function usernameverify(error={},values){
    const specialChar=/^[A-Za-z0-9]*$/
    if(!values.username) error.username=toast.error("Username is required")
    else if(values.username.includes(" ")) error.username=toast.error("Invalid username")
    else if(!specialChar.test(values.username)) error.username=toast.error('Username is not proper')
    else if (values.username.length<=4) error.username=toast.error("Username must be more than 4 characters")
    return error
}