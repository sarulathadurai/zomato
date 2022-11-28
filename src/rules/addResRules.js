export const addResRules = {
    resName:{
        required:{
            value:true,
            message:"Required field"
        },
        pattern:{
            value:/[^0-9]/,
            message:"Must be only characters"
        }
    },
    desc:{
        required:{
            value:true,
            message:"Required field"
        },
        pattern:{
            value:/[^0-9]/,
            message:"Must be only characters"
        }
    },
    address:{
        required:{
            value:true,
            message:"Required field"
        },
        pattern:{
            value:/[^0-9]/,
            message:"Must be only characters"
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