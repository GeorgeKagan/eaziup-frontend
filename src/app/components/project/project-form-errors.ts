export const formErrors = {
  buyerInfo: {
    companyName: '',
    firstName: '',
    lastName: '',
    country: ''
  },
  projectInfo: {
    projectName: ''
  }
};

export const validationMessages = {
  buyerInfo: {
    companyName: {
      required: 'Company name is required.',
      minlength: 'Company name must be at least 4 characters long.'
    },
    firstName: {
      required: 'First name is required.'
    },
    lastName: {
      required: 'Last name is required.'
    },
    country: {
      required: 'Country is required.'
    }
  },
  projectInfo: {
    projectName: {
      required: 'Project name is required.',
      minlength: 'Project name must be at least 4 characters long.'
    }
  }
};
