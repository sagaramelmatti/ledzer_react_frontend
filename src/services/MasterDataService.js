import http from "../http-common";

/* Methods for Business Details Start*/

  
  const getBusinessDetails = id => {
    return http.get(`masters/business/${id}`);
  };

/* Methods for Business Details End*/  


const MasterDataService =  {
    getBusinessDetails
};

export default MasterDataService;