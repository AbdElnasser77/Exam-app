export interface Analytics {
    questionId: string
    questionText: string
    selectedAnswer: SelectedAnswer
    isCorrect: boolean
    correctAnswer: CorrectAnswer
}
export interface SelectedAnswer {
    id: string
    text: string
}

export interface CorrectAnswer {
    id: string
    text: string
}
