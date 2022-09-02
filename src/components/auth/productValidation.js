export const validateCreateProduct=(formData) =>{

    const messages ={
       PRODUCT_NAME :"Invalid product details. Try Again...",
     
    };

 
       const regdata = {
            category:formData.category ,
            productName:formData.productName ,
            productPrice:formData.productPrice ,
            expireDate:formData.expireDate ,
            quantity:formData.quantity 

        }

    const output ={
            status : false,
            message : null
    };

    if(regdata.productName.length <= 3 )
    {
        output.message = messages.PRODUCT_NAME;
        output.status = false;
        return output;
    
    }
   
    else
    {
        output.status = true;
        return output;
    }
 
};

