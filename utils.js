import productList from "./data";
export const findMatchingProducts = async (searchString) => {
    const words = searchString.toLowerCase().match(/\b\w+\b/g);
    if (!words) return [];

    return productList.filter(item => {
        const title = item.title.toLowerCase();
        words.every((word) => {
            console.log(word, title);
            return title.includes(word)
        })
        // return words.every(word => {title.includes(word)});
    });
}

export const get_prods = (respons) => {
    const foundProducts = [];

    for (const item of productList) {
        if (respons.toLowerCase().includes(item.title.toLowerCase())) {
            foundProducts.push(item);
        }
    }
    console.log("found products : =========== ", foundProducts);
    return foundProducts;
};


export const clampString = (string, maxLength) => {
    if (string.length <= maxLength) {
        return string;
    } else {
        return string.slice(0, maxLength - 3) + '...';
    }
}