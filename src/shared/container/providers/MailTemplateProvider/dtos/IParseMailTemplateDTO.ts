interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailTemplateDTO {
  file: string; //receber conteudo da template (html)
  variables: ITemplateVariables;
}