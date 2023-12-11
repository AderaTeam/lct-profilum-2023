export const endingFormater = (steps: number, q?: boolean) => {
  if (steps === 1) {
    return q ? "вопрос" : "шаг";
  } else if (steps <= 4) {
    return q ? "вопроса" : "шага";
  } else {
    return q ? "вопросов" : "шагов";
  }
};
