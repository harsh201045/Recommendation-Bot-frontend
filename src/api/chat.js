import { get_prods } from "../../utils";

const uri = import.meta.env.VITE_APP_SERVER_URI;
export const ask = async (query) => {
    const response = await fetch(`${uri}/ask?user_query=${query}`, {
        method: "POST"
    });
    const data = await response.json();
    const products = get_prods(data.response);

    return {success: true, data: {message: data.response, products: products}};
}