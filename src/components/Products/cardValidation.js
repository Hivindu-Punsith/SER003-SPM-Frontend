
export const ValidateAddNewCard=(formData) =>{

    const messages ={
     
       HOLDER :"Holder name is Required",
       CARD_NUM :"Card number is Required",
       YEAR :"Expire year is Required",
       MONTH :"Expira month is Required",
       CVV :"CVV is Required",
       

    };

    const output ={
            status : false,
            message : null
    };

   
    if(formData.holder.length <= 0 )
    {
        output.message = messages.HOLDER;
        output.status = false;
        return output;
    
    }

    if(formData.cardNum.length <= 0 )
    {
        output.message = messages.CARD_NUM;
        output.status = false;
        return output;
    
    }

    if(formData.year.length <= 0 )
    {
        output.message = messages.YEAR;
        output.status = false;
        return output;
    
    }

    if(formData.month.length <= 0 )
    {
        output.message = messages.MONTH;
        output.status = false;
        return output;
    
    }

    if(formData.cvv.length <= 0 )
    {
        output.message = messages.CVV;
        output.status = false;
        return output;
    
    }
    else
    {
        output.status = true;
        return output;
    }
 
};