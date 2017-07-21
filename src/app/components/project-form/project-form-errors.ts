export const formErrors = {
  buyerInfo: {
    companyName: '',
    firstName: '',
    lastName: '',
    city: '',
    companyPosition: '',
    contactEmail: '',
    contactPhone: '',
    addressLine1: '',
    addressLine2: '',
    whatCompanyDoes: ''
  },
  projectInfo: {
    projectName: '',
    basicDesc: '',
    fullDesc: '',
    techReqs: '',
    developerReqs: ''
  },
  design: {
    logoSlogan: '',
    designIdeas: '',
    designOutline: '',
  },
  milestones: {
    arr: [
      // Maximum allowed number of items must be declared
      {name: '', timespan: '', desc: ''},
      {name: '', timespan: '', desc: ''},
      {name: '', timespan: '', desc: ''},
      {name: '', timespan: '', desc: ''},
      {name: '', timespan: '', desc: ''}
    ]
  },
  final: {

  }
};

export const validationMessages = {
  buyerInfo: {
    firstName: {
      required: 'First name is required'
    },
    lastName: {
      required: 'Last name is required'
    },
    city: {
      required: 'City is required'
    },
    contactEmail: {
      required: 'Contact email is required',
      email: 'Contact email is not a valid email address'
    },
    contactPhone: {
      required: 'Contact phone is required'
    },
    addressLine1: {
      required: 'Address line 1 is required'
    },
    whatCompanyDoes: {
      required: 'Please describe what your company does'
    }
  },
  projectInfo: {
    projectName: {
      required: 'Project name is required',
      minlength: 'Project name must be at least 4 characters long'
    },
    basicDesc: {
      required: 'Basic description is required',
    },
    fullDesc: {
      required: 'Full description is required',
    },
    techReqs: {
      required: 'Technology requirements are required',
    },
    developerReqs: {
      required: 'Software developer requirements are required',
    }
  },
  design: {
    designOutline: {
      required: 'Design outline is required'
    }
  },
  milestones: {
    arr: {
      name: {
        required: 'Milestone name is required'
      },
      timespan: {
        required: 'Time is required',
        min: 'Time must be at least 1 week',
        max: 'Time cannot be longer than 5 weeks'
      },
      desc: {
        required: 'Milestone description is required'
      }
    }
  }
};
