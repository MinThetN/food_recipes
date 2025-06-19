export type Recipe = {
            "id": number,
            name: "Classic Margherita Pizza",
            ingredients:  string[],
            instructions: string [],
            difficulty: string,
            image: string,
            rating: number,
            description: string,
            prepTimeMinutes: number,
            servings: number,
            caloriesPerServing: number
            cookTimeMinutes: number,
            tags: string[],
            mealType: string[],
};

export type Difficulty = "Easy" | "Medium" | "Hard";