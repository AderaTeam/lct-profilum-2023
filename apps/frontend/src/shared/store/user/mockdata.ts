import { IUser } from "shared/models/IUser";

export const data: IUser = {
  username: "Test User",
  isAnalyzed: false,
  id: 0,
  email: "",
  rank: "Незнайка",
  role: "",
  rating: 1,
  points: 20,
  path: [
    {
      id: 0,
      name: "Frontend - разработка",
      steps: [
        {
          step: 1,
          title:
            "Посмотрите видео “Что такое клиент-серверное взаимодействие?”",
          status: "Завершено",
          points: 20,
          tags: ["#КЛИЕНТ-СЕРВЕРНОЕ ВЗАИМОДЕЙСТВИЕ", "#WEB"],
          content: {
            link: "123",
            questionsCount: 2,
          },
        },
        {
          step: 2,
          title:
            "Посмотрите видео “Что такое клиент-серверное взаимодействие?”",
          status: "В процессе",
          points: 20,
          tags: ["#КЛИЕНТ-СЕРВЕРНОЕ ВЗАИМОДЕЙСТВИЕ", "#WEB"],
          content: {
            link: "123",
            questionsCount: 2,
          },
        },
        {
          step: 3,
          title: "test",
          status: "Не начато",
          points: 20,
          tags: ["#КЛИЕНТ-СЕРВЕРНОЕ ВЗАИМОДЕЙСТВИЕ", "#WEB"],
          content: {
            link: "123",
            questionsCount: 2,
          },
        },
        {
          step: 4,
          title:
            "Посмотрите видео “Что такое клиент-серверное взаимодействие?”",
          status: "Не начато",
          points: 20,
          tags: ["#КЛИЕНТ-СЕРВЕРНОЕ ВЗАИМОДЕЙСТВИЕ", "#WEB"],
          content: {
            link: "123",
            questionsCount: 2,
          },
        },
        {
          step: 5,
          title: "test",
          status: "Не начато",
          points: 20,
          tags: ["#КЛИЕНТ-СЕРВЕРНОЕ ВЗАИМОДЕЙСТВИЕ", "#WEB"],
          content: {
            link: "123",
            questionsCount: 2,
          },
        },
      ],
    },
    {
      id: 1,
      name: "Программная инженерия",
      steps: [
        {
          step: 1,
          title: "test",
          status: "Завершено",
          points: 20,
          tags: ["#WEB", "#WEB1"],
          content: {
            link: "123",
            questionsCount: 2,
          },
        },
        {
          step: 2,
          title:
            "Посмотрите видео “Что такое клиент-серверное взаимодействие?”",
          status: "Завершено",
          points: 20,
          tags: ["#WEB2", "#WEB"],
          content: {
            link: "123",
            questionsCount: 2,
          },
        },
        {
          step: 3,
          title: "test",
          status: "В процессе",
          points: 20,
          tags: ["#WEB", "#WEB3"],
          content: {
            link: "123",
            questionsCount: 2,
          },
        },
      ],
    },
  ],
};
