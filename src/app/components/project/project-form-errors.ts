export const formErrors = {
  buyerInfo: {
    companyName: '',
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