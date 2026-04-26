export interface Question {
  id: string
  text: string
  examId: string
  immutable: boolean
  createdAt: string
  updatedAt: string
  answers: AnswersItem[]
}

export interface AnswersItem {
  id: string
  text: string
}
