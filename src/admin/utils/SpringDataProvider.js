import { SystemUpdate } from "@material-ui/icons";
import { stringify } from "query-string";
import {
  fetchUtils,
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY
} from "react-admin";

/**
 * Maps react-admin queries to a REST API implemented using Java Spring Boot and Swagger
 *
 * @example
 * GET_LIST     => GET http://my.api.url/posts?page=0&pageSize=10
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts?id=1234&id=5678
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts
 * DELETE       => DELETE http://my.api.url/posts/123
 */

function mapPrimaryKey(name) {
  var primaryKey = "";
  switch (name) {
    case "mat-hang":
      primaryKey = "maMatHang";
      break;
    case "loai-mat-hang":
      primaryKey = "maLoaiMatHang";
      break;
    case "nguoi-dung":
      primaryKey = "maNguoiDung";
      break;
    case "don-hang":
      primaryKey = "maDonHang"
      break;
    case "danh-gia":
      primaryKey = "maDanhGia";
      break;
    case "gioi-tinh":
      primaryKey = "maGioiTinh";
      break;
    case "trang-thai-don-hang":
      primaryKey = "maTrangThai";
      break;
    default:
      primaryKey = "id";
      break;
  }
  return primaryKey;
}

function mapPath(name, method) {
  if (name === "danh-gia" || name === "don-hang" || name === "nguoi-dung")
    return `${name}-management/authorized`
  else if (name === "trang-thai-don-hang")
    return `don-hang-management/authorized/don-hang`
  else if ((name === "mat-hang" || name === "loai-mat-hang") && (method === 'DELETE' || method === 'UPDATE' || method === 'CREATE'))
    return `${name}-management/authorized`;
  return `${name}-management`;
}

const convertFileToBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file.rawFile);

  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

export default (apiUrl, httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem("token");
  options.headers.set('Authorization', `${token}`);
  return fetchUtils.fetchJson(url, options);
}) => {
  /**
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The data request params, depending on the type
   * @returns {Object} { url, options } The HTTP request parameters
   */
  const convertDataRequestToHTTP = (type, resource, params) => {
    let url = "";
    const options = {};
    console.log(type);
    if(resource === "nguoi-dung-x"){
      resource = "nguoi-dung";
    }
    switch (type) {
      case GET_LIST:
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
          ...fetchUtils.flattenObject(params.filter),
          page: page - 1,
          size: perPage,
          sort: order
        }
        //url = `${apiUrl}/${resource}?page=${page-1}&size=${perPage}&sort=${order}`;
        url = `${apiUrl}/${mapPath(resource, 'GET')}/${resource}?${stringify(query)}`;
        break;

      case GET_ONE:
        url = `${apiUrl}/${mapPath(resource, 'GET')}/${resource}/${params.id}`;
        break;
      case GET_MANY:
        url = `${apiUrl}/${mapPath(resource, 'GET')}/${resource}?size=${1000}`;

        break;
      case GET_MANY_REFERENCE: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        url = `${apiUrl}/${mapPath(resource, 'GET')}/${resource}?page=${page - 1}&size=${40}&sort=${order}`;
        console.log("This is error in get reference, take a look: " + url);
        break;
      }
      case UPDATE:
        if (resource === "don-hang") {
          options.method = "PUT";
          url = `${apiUrl}/${mapPath(resource, 'UPDATE')}/${resource}/${params.id}/trang-thai-don-hang/${params.data.maTrangThai}`;
        } else {
          url = `${apiUrl}/${mapPath(resource, 'UPDATE')}/${resource}/${params.id}`;
          options.method = "PUT";
          options.body = JSON.stringify(params.data);
        }
        break;
      case CREATE:
        url = `${apiUrl}/${mapPath(resource, 'CREATE')}/${resource}`;
        options.method = "POST";
        options.body = JSON.stringify(params.data);
        break;
      case DELETE:
        url = `${apiUrl}/${mapPath(resource, 'DELETE')}/${resource}/${params.id}`;
        options.method = "DELETE";
        break;
      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { url, options };
  };

  /**
   * @param {Object} response HTTP response from fetch()
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The data request params, depending on the type
   * @returns {Object} Data response
   */
  const convertHTTPResponse = (response, type, resource, params) => {
    const { headers, json } = response;
    const targetApi = `${resource}`;

    switch (type) {
      case GET_LIST:
      case GET_MANY:
      case GET_MANY_REFERENCE:
        if (!json.hasOwnProperty("totalItems")) {
          return {
            data: json.map((resource) => ({
              ...resource,
              id: resource[mapPrimaryKey(targetApi)]
            })),
            total: parseInt(json.length, 10)
          };
        };
        if (resource === "nguoi-dung") {
          return {
            data: json.data.map((resource) => ({
              ...resource,
              id: resource[mapPrimaryKey(targetApi)],
              maTaiKhoan: resource.taiKhoan.maTaiKhoan
            })),
            total: parseInt(json.totalItems*json.totalPages, 10)
          };
        }
        if (resource === "don-hang") {
          return {
            data: json.data.map((resource) => ({
              ...resource,
              id: resource[mapPrimaryKey(targetApi)],
              maTaiKhoan: resource["createdBy"]
            })),
            total: parseInt(json.totalItems*json.totalPages, 10)
          };
        }
        if (resource === "mat-hang") {
          return {
            data: json.data.map((resource) => ({
              ...resource,
              id: resource[mapPrimaryKey(targetApi)],
              danhSachHinhAnhNew: resource.danhSachHinhAnh.map((item) => ({
                maAnhMatHang: item.maAnhMatHang,
                anh: `data:image/jpeg;base64,${item.anh}`
              }))
            })),
            total: parseInt(json.totalItems*json.totalPages, 10)
          };
        }
        return {
          data: json.data.map((resource) => ({
            ...resource,
            id: resource[mapPrimaryKey(targetApi)]
          })),
          total: parseInt(json.totalItems*json.totalPages, 10)
        };
      case CREATE:
        return { data: { ...params.data, id: 1 } };
      default:
        let key = mapPrimaryKey(targetApi);

        if (json === undefined) {
          if (params.data === undefined) {
            return { data: { ...params, key: params.id } }
          }
          return { data: { ...params.data, id: params.data[key] } }
        }
        if (resource === "mat-hang") {
          return {
            data: {
              ...json,
              id: json[key],
              danhSachHinhAnhNew: json.danhSachHinhAnh.map((item) => ({
                maAnhMatHang: item.maAnhMatHang,
                anh: `data:image/jpeg;base64,${item.anh}`
              })),
            }
          }
        }
        return { data: { ...json, id: json[key] } };
    }
  };

  /**
   * @param {string} type Request type, e.g GET_LIST
   * @param {string} resource Resource name, e.g. "posts"
   * @param {Object} payload Request parameters. Depends on the request type
   * @returns {Promise} the Promise for a data response
   */
  return (type, resource, params) => {

    //Handle Revenue 

    if(resource === "doanh-thu"){
      return httpClient(`${apiUrl}/don-hang-management/authorized/don-hang/doanh-thu`, {
        method: "GET"      
      }).then((response) => ({
        data: response.json
      }))
    }

    //Handle Order Infomation 
    if(resource === "don-hang" && type=='GET_ONE'){
      const arrayType = ["don-hang", "thong-tin-don-hang"];
      return Promise.all(arrayType.map((_type)=>{
        if(_type==="don-hang"){
          return httpClient(`${apiUrl}/don-hang-management/authorized/don-hang/${params.id}`, {
            method: "GET"      
          })
        }else{
          return httpClient(`${apiUrl}/don-hang-management/authorized/don-hang/${params.id}/nguoi-dung`, {
            method: "GET"      
          })
        }
      })
      ).then((response) => {
        const orderData = response[0].json;
        const userData = response[1].json;

        return ({
          data: {
            id: orderData.maDonHang,
            ...orderData,
            userData: userData
          }
        })
      })
      
    }
        
      


    //Handle Uploading fi(le
    try {
      if (!(params.data.type === undefined)) {
        if (params.data.type === "CREATE") {
          if (!(params.data.newImages === undefined)) {
            return Promise.all(
              params.data.newImages.map((image) => {
                let formData = new FormData();
                formData.append("image", image.rawFile);
                console.log(formData);
                return httpClient(`${apiUrl}/mat-hang-management/authorized/mat-hang/${params.id}/anh-mat-hang`, {
                  method: "POST",
                  body: formData
                })
              })
            ).then((response) => ({
              data: { id: params.id }
            }))
          }
        }
        if (params.data.type === "DELETE") {
          return Promise.all(
            params.data.imagesIdTobeDeleted.map((imageId) => {
              return httpClient(`${apiUrl}/mat-hang-management/authorized/mat-hang/anh-mat-hang/${imageId}`, {
                method: "DELETE"
              })
            })
          ).then((response) => ({
            data: { id: params.id }
          }))
        }
      }
    } catch {
    } finally {
      
    }
    if (type === UPDATE_MANY) {
      return Promise.all(
        params.ids.map((id) =>
          httpClient(`${apiUrl}/${mapPath(resource, 'UPDATE')}/${resource}/${id}`, {
            method: "PUT",
            body: JSON.stringify(params.data)
          })
        )
      ).then((responses) => ({
        data: responses.map((response) => response.json)
      }));
    }
    // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
    if (type === DELETE_MANY) {
      return Promise.all(
        params.ids.map((id) =>
          httpClient(`${apiUrl}/${mapPath(resource, 'DELETE')}/${resource}/${id}`, {
            method: "DELETE"
          })
        )
      ).then((responses) => ({
        data: responses.map((response) => response.json)
      }));
    }

    const { url, options } = convertDataRequestToHTTP(type, resource, params);
    return httpClient(url, options).then((response) =>
      convertHTTPResponse(response, type, resource, params)
    );
  }

  // simple-rest doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead

};
