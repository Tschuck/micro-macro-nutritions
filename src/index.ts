import db from '@/db';
import plans from '@/plans';
import { log } from './helper';

(async () => {
  await db.initialize();

  // log(db.foods);

  plans.forEach((plan) => {
    log(`# ${plan.name}`);

    plan.meals.forEach((meal) => {
      log(`\n## ${meal.name}`);

      const mealNutrition = {};
      meal.foods.forEach((food) => {
        const nutritions = db.getMeal(food.name);

        if (!nutritions) {
          console.log(`----${food.name} not found`);
          return;
        }

        Object.keys(nutritions).forEach((key) => {
          if (typeof nutritions[key] !== 'number' && !Number.isNaN(nutritions[key] as number)) {
            return;
          }

          const nutritionValue = nutritions[key] as number;
          const percValue = parseFloat(Number((nutritionValue / 100) * food.amount).toFixed(2));

          if (!mealNutrition[key]) {
            mealNutrition[key] = percValue || 0;
          } else {
            mealNutrition[key] += percValue;
          }
        });
      });

      console.table(mealNutrition);
    });
  });
})();
