export const addMenuRules = {
    name:{
        required:{
            value:true,
            message:"Required field"
        },
        pattern:{
            value:/[^0-9]/,
            message:"Must be only characters"
        }
    },
    price:{
        required:{
            value:true,
            message:"Required field"
        },
        pattern:{
            value:/[0-9]/,
            message:"Must be only characters"
        }
    },
    cuisine:{
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

}