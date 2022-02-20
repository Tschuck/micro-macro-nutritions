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
          if (typeof nutritions[key] !== 'number') {
            return;
          }

          if (!mealNutrition[key]) {
            mealNutrition[key] = nutritions[key] || 0;
          } else {
            mealNutrition[key] += nutritions[key];
          }
        });
      });

      Object.keys(mealNutrition).forEach((key) => {
        console.log(`${key}: ${mealNutrition[key]}`);
      });
    });
  });
})();
