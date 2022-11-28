export const signupRules = {
    firstName:{
        required:{
            value:true,
            message:"Required field"
        },
    },
    lastName:{
        required:{
            value:true,
            message:"Required field"
        },
    },
    email:{
        required:{
            value:true,
            message:"Required field"
        },
    },
    password:{
        required:{
            value:true,
            message:"Required field"
        },
        minLength:{
            value:8,
            message:"Password should be atleast 8 characters"
        },
        pattern:{
            value:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            message:"Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
        }
    },
    phNo:{
        required:{
            value:true,
            message:"Required field"
        },
        pattern:{
            value:/[0-9]/,
            message:"Must be only numbers"
        },
        maxLength:{
            value:10,
            message:"maximum length:10"
        }
    },
} 