
export const ValidateAddNewMembership=(formData) =>{

    const messages ={
    name :"Name is Required..!",
    price : "Price is Required..!",
    duration : "Duration is Required..!",
    description : "Description is Required..!",

    };

    const output ={
            status : false,
            message : null
    };

    if(formData.name.length <= 0 )
    {
        output.message = messages.name;
        output.status = false;
        return output;
    
    }
    if(formData.price.length <= 0)
    {
        output.message = messages.price;
        output.status = false;
        return output;
    } 
    if((formData.duration.length < 0))
    {
        output.message = messages.duration;
        output.status = false;
        return output;
    }
    if(formData.description.length <= 0)
    {
        output.message = messages.description;
        output.status = false;
        return output;
    }
    else
    {
        output.status = true;
        return output;
    }
 
};