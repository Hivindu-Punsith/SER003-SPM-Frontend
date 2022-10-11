export const validateCreateProduct=(formData) =>{

    const messages ={
       PRODUCT_NAME :"Required product name with should at least be 3 letters",
       PRODUCT_PRICE :"Required product price",
       EXPIRE_DATE :"Required stock-expired date",
       QUANTITY :"Required product quantity",
     
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

    if(regdata.productName.length <= 2 )
    {
        output.message = messages.PRODUCT_NAME;
        output.status = false;
        return output;
    
    }
    if(regdata.productPrice.length <= 0 )
    {
        output.message = messages.PRODUCT_PRICE;
        output.status = false;
        return output;
    
    }
    if(regdata.expireDate.length <= 0 )
    {
        output.message = messages.EXPIRE_DATE;
        output.status = false;
        return output;
    
    }
    if(regdata.quantity.length <= 0 )
    {
        output.message = messages.QUANTITY;
        output.status = false;
        return output;
    
    }
   
    else
    {
        output.status = true;
        return output;
    }
 
};

