
export const ValidateAddNewEquipment=(formData) =>{
    const messages ={
       FULL_NAME :"Name is Required..!",
       QUANTITY : "Quantity is Required..!",
       VALUE : " Value is Required..!",
       COMPANY_NAME : "Company name is Required..!",
       DATE_OF_PURCHASE : "Date of purchaced is Required..!",
       CATEGORY:"Category is Required..!"

    };

    const output ={
            status : false,
            message : null
    };

    if(formData.name.length <= 0 )
    {
        output.message = messages.FULL_NAME;
        output.status = false;
        return output;
    
    }
    if(formData.quantity.length <= 0)
    {
        output.message = messages.QUANTITY;
        output.status = false;
        return output;
    } 
    if((formData.value.length < 0))
    {
        output.message = messages.VALUE;
        output.status = false;
        return output;
    }
    if(formData.company_name.length <= 0)
    {
        output.message = messages.COMPANY_NAME;
        output.status = false;
        return output;
    }
    if(formData.date_of_purchaced.length <= 0)
    {
        output.message = messages.DATE_OF_PURCHASE;
        output.status = false;
        return output;
    }
    if(formData.category.value.length <= 0)
    {
        output.message = messages.CATEGORY;
        output.status = false;
        return output;
    }
    else
    {
        output.status = true;
        return output;
    }
 
};