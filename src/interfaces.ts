export interface Food {
  name: string;
  amount: number;
}

export interface Meal {
  name: string;
  foods: Food[];
}

export interface MealPlan {
  name: string;
  meals: Meal[];
}
