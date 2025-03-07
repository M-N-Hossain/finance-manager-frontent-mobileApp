import { CategopryEntity } from "./CategoriesEntity";

export class CategoriesAPI {

    // Accesing the app through pysicall andriod device so the IP is 192.168.0.101
    static baseUrl = "http://192.168.0.101:3000/api/categories"


    static async getCategories() {
        try {
            const response = await fetch(this.baseUrl);
            console.log(response);
            return response.json();
        } catch (error) {
            console.error("Error while fetching categories:", error);
            throw error;
        }
    }

    static async createCategory(category: CategopryEntity) {
        try {
            const response = await fetch(this.baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ category }),
            });
            return response.json();
        } catch (error) {
            console.error("Error while creating category:", error);
            throw error;
        }
    }

}