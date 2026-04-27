export interface Submission {
  examId: string
  answers: Answers[]
  startedAt: string
}

export interface Answers {
  questionId: string
  answerId: string
}
