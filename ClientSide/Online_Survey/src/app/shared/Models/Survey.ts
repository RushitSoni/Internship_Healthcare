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

export interface template_detail{
    surveyorid : string;
    surveyid : number;
    surveyname : string;
    questions : QuestionOption[]
}

export interface Post_OptionList
{
    optionId : number;
    optionText : string;
    surveyId : number;
}

export interface Post_Question{
    questionId : number;
    surveyId : number;
    questionText : string;
    questionOptionType : number;
    options : Option_List[];
}

export interface Survey{
    surveyid : number;
}

export interface SurveyTable{
   
    SurveyId :number
   
    SurveyName : string;
    surveyorId : string;
    Description : string;
    dateCreated:string;
    StartDate : string;
    EndDate : string;
    startTime : string;
    endTime : string;
    deptId : number;
    Count : number;
}

export interface Respondent{
    id:number
    Email: string;
}

export interface Respondent_Record{
    RespondentId : number;
    SurveyId : number;
}

export interface Answer{
    Id : number;
    QuestionId : number;
    OptionId : number[];
    AnswerText : string;
}

export interface TemplateOption{
    optionText : string;
}

export interface GetTemplate{
    questionText : string;
    optionType : number;
    options : TemplateOption[];
}