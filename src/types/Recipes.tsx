export type Recipe = {
            "id": number,
            name: "Classic Margherita Pizza",
            ingredients:  string[],
            instructions: string [],
            difficulty: string,
            image: string,
            rating: number,
};

type Difficulty = "Easy" | "Medium" | "Hard";