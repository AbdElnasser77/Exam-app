export interface Submission {
  id: string
  examId: string
  examTitle: string
  score: number
  totalQuestions: number
  correctAnswers: number
  wrongAnswers: number
  submittedAt: string
}
