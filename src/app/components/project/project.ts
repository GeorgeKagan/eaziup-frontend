export class Project {
  constructor(
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public phone?: string,
    public country?: string,
    public address1?: string,
    public address2?: string,
    public address3?: string,
    public companyDesc?: string,
    public projectName?: string,
    public projectCategory?: string,
    public projectSubCategory?: string,
    public softwareProjectType?: string,
    public projectDesc?: string,
    public projectFullDesc?: string,
    public techRequirements?: string,
    public developerRequirements?: string,
    public osRequirements?: string,
    public developerCount?: number,
    public developerWorkedTogether?: string,
    public similarProjectScreenshots?: Array<string>,
    public logoSlogan?: Array<string>,
    public colorSchemeLayoutScreenshots?: Array<string>,
    public projectLayoutDesc?: string,
    public isBreakProjectIntoStages?: boolean,
    public stages?: Array<object>,
    public startDate?: string,
    public communication?: Communication,
    public commFrequency?: string,
    public priceGroup?: number,
    public isProjectPublic?: boolean,
    public isAllSignNDA?: boolean,
    public isPayOnStageComplete?: boolean,
    public projectStages?: number,
    public companyName?: string,
    public position?: string
  ) {

  }
}

enum Communication {
  VideoSkype = 1,
  Facetime = 2,
  Email = 3,
  WebChat = 4
}
