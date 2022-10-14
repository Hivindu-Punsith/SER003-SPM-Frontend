export const validateAddPayment = (formData) => {

    const messages = {
        NAME: "The name should at least be 3 letters",
        EMAIL: "Email must contain @ and at least 3 letter before for the prefix",
        ADDRESS: "The address should at least be 5 letters",
        MOBILE: "Mobile number must contain 10 numbers",
        TOTAL:"Total is not set",
        ITEM:"items not set"

    };


    const regdata = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        address: formData.address,
       item:formData.Items,
       total:formData.total

    }

    const output = {
        status: false,
        message: null
    };
    if (regdata.item.length == 0) {
        output.message = messages.ITEM;
        output.status = false;
        return output;

    }
    if (regdata.total <= 0) {
        output.message = messages.TOTAL;
        output.status = false;
        return output;

    }

    if (regdata.name.length <= 2) {
        output.message = messages.NAME;
        output.status = false;
        return output;

    }

    if(regdata.email.length <= 2)
    {
        output.message = messages.EMAIL;
        output.status = false;
        return output;
    } 

    if (regdata.mobile.length <= 11) {
        output.message = messages.MOBILE;
        output.status = false;
        return output;

    }
    if (regdata.address.length <= 5) {
        output.message = messages.ADDRESS;
        output.status = false;
        return output;

    }
   
    else {
        output.status = true;
        return output;
    }

};

