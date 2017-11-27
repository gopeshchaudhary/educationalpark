import { Injectable } from '@angular/core';

@Injectable()
export class UrlManagerService {
  private urlSet: any;
  private loginSet: UrlSet;
  private apiserver;
  private ssl;

  constructor() {
    this.ssl = false;
    // Server1 APIS
    this.apiserver = '172.20.3.21:4000';
    this.apiserver = (this.ssl) ? 'https' : 'http' + '://' + this.apiserver;
    // Initialization of URLs methods
    this.initializeExamUrl();
    this.urlSet = {
      login: this.loginSet
    };
  }

  private initializeExamUrl() {
    this.loginSet = {
      get: {
      getExamData: '/exam/getexam'
    },
      post: {},
      put: {},
      delete: {}
    };
  }

  // TYPE : (L,R,I,p,C) , METHOD : (G,PO,PU,D) , NAME : array 
  public resolveUrl(type, method, indexName) {
    let error;
    error = (typeof type == undefined || type.trim() == "" ? '[ url Service ] TYPE is undefined ' : (typeof method == undefined || method.trim() == "" ? '[ url Service ] METHOD is undefined ' : (typeof indexName == undefined || indexName.trim() == "" ? '[ url Service ] INDEXNAME is undefined ' : 'pass')));
    if (error !== "pass") {
      return error;
    }
  return this.typeResolve(type, method, indexName);

  }

  private typeResolve(type, method, indexName) {
    switch (type) {
      case 'E': return this.methodResolve(this.urlSet.login, method, indexName);
      default:
        console.log('[ urlservice ]INVALID TYPE SUPPLIED ... ' + type);
        return 'Invalid Type ' + type;
    }
  }
  private methodResolve(urlObj, method, indexName) {
    switch (method) {
      case 'G': return this.indexNameResolve(urlObj.get, indexName);
      case 'PO': return this.indexNameResolve(urlObj.post, indexName);
      case 'PU': return this.indexNameResolve(urlObj.put, indexName);
      case 'D': return this.indexNameResolve(urlObj.delete, indexName);
      default:
        console.log('[ urlservice ]INVALID METHOD SUPPLIED ... ' + method);
        return 'Invalid Type ' + method;
    }
  }

  private indexNameResolve(urlObj, indexName) {
    return (indexName in urlObj ? this.apiserver + urlObj[indexName] : ' NO SUCH URL DEFINED IN URL MANAGER ');
    // return (indexName in urlObj ? urlObj[indexName] : ' NO SUCH URL DEFINED IN URL MANAGER ');
  }
}

interface UrlSet {
  get: Object;
  post: Object;
  put: Object;
  delete: Object;
}

