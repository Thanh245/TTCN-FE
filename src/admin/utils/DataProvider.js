import { stringify } from "query-string";
import { fetchUtils, DataProvider } from "ra-core";

function mapPrimaryKey(name) {
  var primaryKey = "";
  switch (name) {
    case "mat_hang":
      primaryKey = "maMatHang";
      break;
    case "loai_mat_hang":
      primaryKey = "maLoaiMatHang";
      break;
    default:
      primaryKey = "id";
      break;
  }
  return primaryKey;
}

export default (apiUrl, httpClient = fetchUtils.fetchJson): DataProvider => ({
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      ...fetchUtils.flattenObject(params.filter),
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const targetApi = `${resource}`;
    console.log(targetApi);
    return httpClient(url).then(({ headers, json }) => {
      if (!headers.has("x-total-count")) {
        throw new Error(
          "The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?"
        );
      }
      return {
        data: json.map((resource) => ({
          ...resource,
          id: resource[mapPrimaryKey(targetApi)]
        })),
        total: parseInt(headers.get("x-total-count").split("/").pop(), 10)
      };
    });
  },

  getOne: (resource, params) => {
    const targetApi = `${resource}`;
    return httpClient(`${apiUrl}/${resource}/${params.id}`).then(
      ({ json }) => ({
        data: json.map((resource) => ({
          ...json,
          id: json[mapPrimaryKey(targetApi)]
        }))
      })
    );
  },

  getMany: (resource, params) => {
    const query = {
      id: params.ids
    };
    const targetApi = `${resource}`;
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({
      data: json.map((resource) => ({
        ...resource,
        id: resource[mapPrimaryKey(targetApi)]
      }))
    }));
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      ...fetchUtils.flattenObject(params.filter),
      [params.target]: params.id,
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const targetApi = `${resource}`;

    return httpClient(url).then(({ headers, json }) => {
      if (!headers.has("x-total-count")) {
        throw new Error(
          "The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?"
        );
      }
      return {
        data: json.map((resource) => ({
          ...resource,
          id: resource[mapPrimaryKey(targetApi)]
        })),
        total: parseInt(headers.get("x-total-count").split("/").pop(), 10)
      };
    });
  },

  update: (resource, params) => {
    const targetApi = `${resource}`;

    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data)
    }).then(({ json }) => ({ ...json, id: json[mapPrimaryKey(targetApi)] }));
  },

  // json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
  updateMany: (resource, params) =>
    Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: "PUT",
          body: JSON.stringify(params.data)
        })
      )
    ).then((responses) => ({ data: responses.map(({ json }) => json.id) })),

  create: (resource, params) => {
    const targetApi = `${resource}`;

    return httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data)
    }).then(({ json }) => ({
      data: { ...params.data, id: json[mapPrimaryKey(targetApi)] }
    }));
  },

  delete: (resource, params) => {
    const targetApi = `${resource}`;

    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE"
    }).then(({ json }) => ({
      ...json,
      id: json[mapPrimaryKey(targetApi)]
    }));
  },

  // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
  deleteMany: (resource, params) =>
    Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: "DELETE"
        })
      )
    ).then((responses) => ({ data: responses.map(({ json }) => json.id) }))
});
