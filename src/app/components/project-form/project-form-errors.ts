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
    logoSlogan: ''
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
    logoSlogan: {
      required: 'Logo & slogan are required'
    }
  }
};
