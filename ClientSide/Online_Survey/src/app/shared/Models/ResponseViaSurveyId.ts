export interface OptionDTO {
    optionText: string;
  }
  
  export interface QuestionDTO {
    questionText: string;
    questionType: string;
    answerTexts: string[]; // List of answer texts
    options: OptionDTO[];
  }
  
  export interface ResponseViaSurveyId {
    responseId: number;
    respondentId: number;
    surveyId: number;
    questionList: QuestionDTO[];
  }
  