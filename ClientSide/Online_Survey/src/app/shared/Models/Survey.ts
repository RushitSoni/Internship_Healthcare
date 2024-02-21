export interface SurveyTable {
    SurveyorId : String ;
}

export interface Question {
    QuestionText :String;
    QuestionOptionType:String;
    SurveyId : number;
}

export interface Options {
    OptionText : String;
    QuestionId : number;
    SurveyId : number;
}

export interface Option_List
{
    optionId : number;
    optionText : string;
}

export interface QuestionOption{
    questionId : number;
    quesionText : string;
    questionOptionType : number;
    optionList : Option_List[];
}

export interface Survey{
    surveyid : number;
}