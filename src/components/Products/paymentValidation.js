export const validateAddPayment = (formData) => {

    const messages = {
        NAME: "Invalid data",

    };


    const regdata = {
        name: formData.name,
        address: formData.address,
        method: formData.method

    }

    const output = {
        status: false,
        message: null
    };

    if (regdata.name.length <= 5) {
        output.message = messages.NAME;
        output.status = false;
        return output;

    }

    else {
        output.status = true;
        return output;
    }

};

