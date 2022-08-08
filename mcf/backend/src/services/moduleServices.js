
const Module = require('../models/modules');

const createModule = async (moduleBody) => {
    return Module.create(moduleBody);
  };

