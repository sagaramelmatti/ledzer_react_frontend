import http from "../http-common";

  const getAll = () => {
    return http.get("/masters/categories/");
  };
  const get = id => {
    return http.get(`/masters/categories/${id}`);
  };
  const create = data => {
    return http.post("/masters/categories/", data);
  };
  const update = (id, data) => {
    return http.put(`/masters/categories/${id}`, data);
  };
  const remove = id => {
    return http.delete(`/masters/categories/${id}`);
  };

  const getAllTaxes = () => {
    return http.get("/masters/taxes/");
  };

const CategoryDataService =  {
      getAll,
      get,
      create,
      update,
      remove,
      getAllTaxes
};

export default CategoryDataService;