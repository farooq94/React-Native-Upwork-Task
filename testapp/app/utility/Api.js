import { baseUrl } from '../constant';

class Api {
  static headers(header, token) {
    
    if(header){
      return {
        'AUTHORIZATION': `${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'dataType': 'json',
      }
    }    
    else{
      return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'dataType': 'json',
      }
    }
  }

  static get(route, header, token) {
    return this.xhr(route, null, header, 'GET', token);
  }

  static put(route, params, header, token) {
    return this.xhr(route, params, header, 'PUT', token)
  }

  static post(route, params, header, token) {
    return this.xhr(route, params, header, 'POST', token)
  }

  static delete(route, params) {
    return this.xhr(route, params, false, 'DELETE')
  }

  static xhr(route, params, header, verb, token) {
    const host = baseUrl
    const url = `${host}${route}`
    let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null );
    options.headers = Api.headers(header, token)
    
    console.log('url', url);
    console.log('Header',options.headers);
    console.log('body',params);

    return fetch(url, options).then((resp, error) => {
      console.log("status", resp.status);
      
      if (!resp.ok) {
        //Some error
      }
      return resp;
      
    })
    .then( resp => {
      // Examine the text in the response
      let json = resp.json();

      console.log('response', json);

      return json;

    })
    .catch((e) => {
      return Promise.reject();
    });//.then( json => json.results );
  }
}
export default Api
