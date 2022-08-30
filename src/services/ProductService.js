import axios from 'axios';
import StartUrl from "../configs/Url.json";

const getAllProductsURL = StartUrl?.StartUrl + "/product/getproducts";
const CreateProductURL = StartUrl?.StartUrl + "/product/createproducts";
const UpdateProductURL = StartUrl?.StartUrl + "/product/updateproducts/";
const DeleteProductURL = StartUrl?.StartUrl + "/product/deleteproducts/";
const GetProductByIDURL = StartUrl?.StartUrl + "/product/products/";


export async function getAllProducts() {
    return axios.get(getAllProductsURL)
    
}

export async function getProductByID(id) {
    return axios.get(GetProductByIDURL + id);
}

export async function createNewProduct(formData) {
    const alldata = {

        // productName: data.productName,
        // productPrice: data.productPrice,
        // expireDate: data.expireDate,
        // quantity: data.quantity,
        // productImage: data.productImage

        category:formData.get("category") ,
        productName:formData.get("productName") ,
        productPrice:formData.get("productPrice") ,
        expireDate:formData.get("expireDate") ,
        quantity:formData.get("quantity") ,
        productImage:formData.get("productImage"),
    }

    console.log("alldata",alldata)

    return await axios.post(CreateProductURL, alldata);
    
}


export async function updateProduct(id, data) {
    const alldata = {
        productName: data.productName,
        productPrice: data.productPrice,
        expireDate: data.expireDate,
        quantity: data.quantity,
        productImage: data.productImage
    }

    return await axios.put(UpdateProductURL + id, alldata);
}

export async function deleteProduct(id) {
    return await axios.delete(DeleteProductURL + id);
}


