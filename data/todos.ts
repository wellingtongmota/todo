import { faker } from "@faker-js/faker"

export interface Todo {
  id: string
  title: string
  description: string
  completed: boolean
  dueDate: Date
}

export const todos: Todo[] = Array.from({ length: 10 }).map(() => {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence({ min: 3, max: 7 }),
    description: faker.lorem.paragraph(),
    completed: faker.datatype.boolean(),
    dueDate: faker.date.soon({ days: 14 })
  }
})
