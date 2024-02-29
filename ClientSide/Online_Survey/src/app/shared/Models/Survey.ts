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
    questionText : string;
    questionOptionType : number;
    options : Option_List[];
}

export interface Survey{
    surveyid : number;
}

export interface SurveyTable{
    SurveyorId : String;
    Description : string;
}

export interface Respondent{
    Name : string;
    Email: string;
    PhoneNumber: string;
}

export interface Respondent_Record{
    RespondentId : number;
    SurveyId : number;
}

export interface Answer{
    Id : number;
    QuestionId : number;
    OptionId : number;
    AnswerText : string;
}