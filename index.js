const version="6.1.3"
import qs from "qs";
import Cookies from "js-cookie";
import uniqid from "uniqid";
import { v4 as uuidv4 } from "uuid";


import generateID from "generate-unique-id";
import cleanDeep from "clean-deep";
import consola from "consola";
import _ from "lodash"


import moment from "moment"; 
import numeral from "numeral"; //http://numeraljs.com/
import { request, gql, GraphQLClient } from "graphql-request";
import { cleanDoubleSlashes, normalizeURL } from "ufo";
try {
    if (!fetch) {
        console.log("Is running on back-end")
        const fetch = require("node-fetch");
    }
} catch (err) {


}



class Iota {
  constructor(
    config = {
      key: "key",
      baseURLgraphql: "", // GraphQL Base URL
      baseURL: "http://127.0.0.1:1337", // Strapi EndPoint URL
      credit: { identifier: "", password: "" }, // Identifier information
      debug: true, // Debug console
    }
  ) {
    if (config.baseURL !== "") {
      config.baseURL = normalizeURL(cleanDoubleSlashes(config.baseURL));
      if (config.baseURL.slice(-1) !== "/") {
        config.baseURL = config.baseURL + "/";
      }
    }

    this.key = config.key || "key";
    this.ls = Cookies;
    this.credit = config.credit;
    this.jwt = this.ls.get(config.key) || null;
    this.baseURL = config.baseURL;
    this.baseURLgraphql = config.baseURLgraphql;
    this.user =
      this.jwt && this.ls.get("user") ? JSON.parse(this.ls.get("user")) : null;
    this.debug = config.debug;

    // utils
    this.moment = moment;
    this._ = _;
    this.uuid = uuidv4;
    this.generateID = generateID;
    this.cleanDeep = cleanDeep;
    this.numeral = numeral;
    return this._init();
  }

  _init() {
    // Initialisation status
    return this.debug ? consola.success(` Iota running ¬  ${version}`) : "";
  }


  raw(raw = {}) {
       //{
        //name:'allcommandes',
        //model: 'commandes',
       // action:'find',
       // filter: {},
      //  payload:{},
       // fields: [],
      //  populate: []
     // },

     return new Promise(async (resolve, reject) => {
       try {
         var response = await fetch(
           cleanDoubleSlashes(this.baseURL + "/drivers/_rawQuery"),
           {
             method: "POST",
             headers: {
               "content-type": "application/json",
               ...this._authorization(),
             },
             body: JSON.stringify({
               raw:raw
             }),
           }
         );

         var details = (await response.json()) || (await response.text());
         if (!response.ok) {
           return reject(details || null);
         }
         this.debug ? consola.success(details) : "";
         resolve(details);
       } catch (err) {
         this.debug ? consola.error(err) : "";
         reject(err);
       }
     });


  }

  async _aggregate(model = "", pipeline = []) {
    return new Promise(async (resolve, reject) => {
      try {
        var response = await fetch(
          cleanDoubleSlashes(this.baseURL + "/drivers/_aggregate"),
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              ...this._authorization(),
            },
            body: JSON.stringify({
              model: model,
              pipeline: pipeline,
            }),
          }
        );

        var details = (await response.json()) || (await response.text());
        if (!response.ok) {
          return reject(details || null);
        }
        this.debug ? consola.success(details) : "";
        resolve(details);
      } catch (err) {
        this.debug ? consola.error(err) : "";
        reject(err);
      }
    });
  }

  async _insert(model = "", pipeline = null) {
    return new Promise(async (resolve, reject) => {
      try {
        var response = await fetch(
          cleanDoubleSlashes(this.baseURL + "/drivers/_insert"),
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              ...this._authorization(),
            },
            body: JSON.stringify({
              model: model,
              pipeline: pipeline,
            }),
          }
        );

        var details = (await response.json()) || (await response.text());
        if (!response.ok) {
          return reject(details || null);
        }
        this.debug ? consola.success(details) : "";
        resolve(details);
      } catch (err) {
        this.debug ? consola.error(err) : "";
        reject(err);
      }
    });
  }



  async _find(model = "", pipeline = null) {
    return new Promise(async (resolve, reject) => {
      try {
        var response = await fetch(
          cleanDoubleSlashes(this.baseURL + "/drivers/_find"),
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              ...this._authorization(),
            },
            body: JSON.stringify({
              model: model,
              pipeline: pipeline,
            }),
          }
        );

        var details = (await response.json()) || (await response.text());
        if (!response.ok) {
          return reject(details || null);
        }
        this.debug ? consola.success(details) : "";
        resolve(details);
      } catch (err) {
        this.debug ? consola.error(err) : "";
        reject(err);
      }
    });
  }

  async _findOne(model = "", pipeline = null) {
    return new Promise(async (resolve, reject) => {
      try {
        var response = await fetch(
          cleanDoubleSlashes(this.baseURL + "/drivers/_findOne"),
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              ...this._authorization(),
            },
            body: JSON.stringify({
              model: model,
              pipeline: pipeline,
            }),
          }
        );

        var details = (await response.json()) || (await response.text());
        if (!response.ok) {
          return reject(details || null);
        }
        this.debug ? consola.success(details) : "";
        resolve(details);
      } catch (err) {
        this.debug ? consola.error(err) : "";
        reject(err);
      }
    });
  }

  async _update(model = "", pipeline = null) {
    return new Promise(async (resolve, reject) => {
      try {
        var response = await fetch(
          cleanDoubleSlashes(this.baseURL + "/drivers/_update"),
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              ...this._authorization(),
            },
            body: JSON.stringify({
              model: model,
              pipeline: pipeline,
            }),
          }
        );

        var details = (await response.json()) || (await response.text());
        if (!response.ok) {
          return reject(details || null);
        }
        this.debug ? consola.success(details) : "";
        resolve(details);
      } catch (err) {
        this.debug ? consola.error(err) : "";
        reject(err);
      }
    });
  }

  async aggregate(model = "", pipeline = []) {
    return new Promise(async (resolve, reject) => {
      try {
        var response = await fetch(
          cleanDoubleSlashes(this.baseURL + "/drivers/aggregate"),
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              ...this._authorization(),
            },
            body: JSON.stringify({
              model: model,
              pipeline: pipeline,
            }),
          }
        );

        var details = (await response.json()) || (await response.text());
        if (!response.ok) {
          return reject(details || null);
        }
        this.debug ? consola.success(details) : "";
        resolve(details);
      } catch (err) {
        this.debug ? consola.error(err) : "";
        reject(err);
      }
    });
  }

  _authorization() {
    // Authorization token header
    const requestWithToken = {
      authorization: "Bearer " + this.jwt,
    };

    return this.jwt ? requestWithToken : null;
  }

  async setToken(token) {
    this.ls.set(this.key, token);
    this.jwt = token;
    if (this.debug) consola.log("Token is set with key ", this.key);
  }

  async clearToken() {
    this.ls.remove(this.key);
    this.jwt = null;
    if (this.debug) consola.log("Token removed  ", this.key);
  }

  async logout() {
    this.jwt = null;
    this.user = null;
    this.ls.remove("user");
    this.ls.remove(this.key);
  }

  async login(params = { identifier: null, password: null }) {
    if (!params.identifier && !params.password) {
      return consola.info("Credidentials are missing");
    }

    var AUTH = this.baseURL + "auth/local";
    return new Promise(async (resolve, reject) => {
      try {
        var response = await fetch(AUTH, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(params),
        });

        var data = (await response.json()) || (await response.text());
        if (!response.ok) {
          return reject(details || null);
        }

        if (data.jwt) {
          this.user = data;
          this.ls.set("user", JSON.stringify(data));
          this.ls.set("jwt", data.jwt);

          this.debug ? consola.success("Login successfully ") : "";
        }

        return resolve(data);
      } catch (err) {
        this.debug ? consola.error(err) : "";
        return reject(err);
      }
    });
  }

  async find(entry = "", params = {}) {
    // Fidn all entry
    entry = entry + "?";
    var query = qs.stringify(params);
    return new Promise(async (resolve, reject) => {
      try {
        var response = await fetch(this.baseURL + entry + query, {
          headers: {
            ...this._authorization(),
          },
        });
        var details = (await response.json()) || response.text();

        if (!response.ok) {
          return reject(details || null);
        }

        this.debug ? consola.success(details) : "";
        resolve(details);
      } catch (err) {
        return reject(err);
      }
    });
  }

  //** */

  async findOne(entry = "", id = "") {
    // Find entry by id
    entry = entry + "/";
    return new Promise(async (resolve, reject) => {
      try {
        var response = await fetch(this.baseURL + entry + id, {
          headers: {
            ...this._authorization(),
          },
        });
        var details = (await response.json()) || (await response.text());

        if (!response.ok) {
          return reject(details || null);
        }
        this.debug ? consola.success(details) : "";
        resolve(details);
      } catch (err) {
        this.debug ? consola.error(err) : "";
        return reject(err);
      }
    });
  }

  //**** */

  async count(entry = "", params = {}) {
    // count entry
    // Fidn all entry

    entry = entry + "?";

    var query = qs.stringify(params);

    return new Promise(async (resolve, reject) => {
      try {
        var response = await fetch(this.baseURL + entry + query, {
          headers: {
            ...this._authorization(),
          },
        });

        var details = (await response.json()) || (await response.text());
        if (!response.ok) {
          return reject(details || null);
        }
        this.debug ? consola.success(details.length || 0) : "";
        resolve(details.length || 0);
      } catch (err) {
        this.debug ? consola.error(err) : "";
        reject(err);
      }
    });
  }

  //*** */

  async exec(entry = "", params = {}) {
    // create Entry
    // create entry
    entry = entry + "/";

    return new Promise(async (resolve, reject) => {
      try {
        var response = await fetch(this.baseURL + entry, {
          method: "POST",
          headers: {
            ...this._authorization(),
            "content-type": "application/json",
          },
          body: JSON.stringify(params),
        });
        var details = (await response.json()) || (await response.text());
        if (!response.ok) {
          return reject(details || null);
        }
        this.debug ? consola.success(details) : "";
        resolve(details);
      } catch (err) {
        this.debug ? consola.error(err) : "";
        reject(err);
      }
    });
  }

  async create(entry = "", params = {}, config = { withMedia: false ,media:null,medias:[] ,mediasField:null }) {
    // create Entry
    // create entry
    entry = entry + "/";

    return new Promise(async (resolve, reject) => {

      if (config.withMedia && config.medias) {
        var formdata = new FormData();
        for await (let media of medias) {
          formdata.append(`files.${config.mediasField}`,media.file,media.file.name)
        }
        config.media = formdata
      }


      try {
        if (this.debug)
          config.withMedia ? consola.info("Send width media") : "";
        if (this.debug)
          config.withMedia && !config.media ?  consola.error("Please set media blob") : "";
      
        if (!config.withMedia) {
          var response = await fetch(this.baseURL + entry, {
            method: "POST",
            headers: {
              ...this._authorization(),
              "content-type": "application/json",
            },
            body: JSON.stringify(params),
          });
        } else {
          config.media.append("data", JSON.stringify(params)) 
          var response = await fetch(this.baseURL + entry, {
            method: "POST",
            headers: {
              ...this._authorization(),
            },
            body: config.media,
          });
        }

        var details = (await response.json()) || (await response.text());

        if (!response.ok) {
          return reject(details || null);
        }
        this.debug ? consola.success(details) : "";
        resolve(details);
      } catch (err) {
        this.debug ? consola.error(err) : "";
        reject(err);
      }
    });
  }

  //** */

  async update(
    entry = "",
    id = "",
    params = {},
    config = { withMedia: false ,media:null , medias:[],mediasField:null }
  ) {
    // update entry

    entry = entry + "/" + id;

    return new Promise(async (resolve, reject) => {
      try {

        if (config.withMedia && config.medias) {
          var formdata = new FormData();
          for await (let media of medias) {
            formdata.append(
              `files.${config.mediasField}`,
              media.file,
              media.file.name
            );
          }
          config.media = formdata;
        }

        if (this.debug)
          config.withMedia ? consola.info("Send width media") : "";
         if (this.debug)
          config.withMedia && !config.media ?  consola.error("Please set media blob") : "";
        if (!config.withMedia) {
          var response = await fetch(this.baseURL + entry, {
            method: "PUT",
            headers: {
              ...this._authorization(),
              "content-type": "application/json",
            },
            body: JSON.stringify(params),
          });
        } else {

          config.media.append("data", JSON.stringify(params)) ;
          var response = await fetch(this.baseURL + entry, {
            method: "PUT",
            headers: {
              ...this._authorization(),
            },
            body: config.media,
          });
        }

        var details = (await response.json()) || (await response.text());
        if (!response.ok) {
          return reject(details || null);
        }
        this.debug ? consola.success(details) : "";
        resolve(details);
      } catch (err) {
        this.debug ? consola.error(err) : "";
        reject(err);
      }
    });
  }

  //*** */

  async deleteEntry(entry = "", id = "") {
    // delete entry

    entry = entry + "/" + id;

    return new Promise(async (resolve, reject) => {
      try {
        var response = await fetch(this.baseURL + entry, {
          method: "DELETE",
          headers: {
            ...this._authorization(),
          },
        });

        var details = (await response.json()) || (await response.text());
        if (!response.ok) {
          return reject(details || null);
        }
        this.debug ? consola.success(details) : "";
        resolve(details);
      } catch (err) {
        this.debug ? consola.error(err) : "";
        reject(err);
      }
    });
  }

  async aggregate(model = "", pipeline = []) {
    return new Promise(async (resolve, reject) => {
      try {
        var response = await fetch(
          cleanDoubleSlashes(this.baseURL + "/aggregates/exec"),
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              ...this._authorization(),
            },
            body: JSON.stringify({
              model: model,
              pipeline: pipeline,
            }),
          }
        );

        var details = (await response.json()) || (await response.text());
        if (!response.ok) {
          return reject(details || null);
        }
        this.debug ? consola.success(details) : "";
        resolve(details);
      } catch (err) {
        this.debug ? consola.error(err) : "";
        reject(err);
      }
    });
  }

  async graphql(req = { query: null, variables: {} }) {
    const client = new GraphQLClient(this.baseURLgraphql, {
      headers: { ...this._authorization() },
    });

    return new Promise(async (resolve, reject) => {
      await client
        .request(req.query, req.variables)
        .then((data) => {
          this.debug ? consola.success(data) : "";
          resolve(data);
        })
        .catch((err) => {
          this.debug ? consola.error(err) : "";
          reject(err);
        });
    });
  }

   assets(path) {
    return cleanDoubleSlashes(this.baseURL + "/" + path);
  }

  // Format assets
}


class Strapi {
  constructor(
    config = {
      key: "key",
      baseURLgraphql: "", // GraphQL Base URL
      baseURL: "http://127.0.0.1:1337", // Strapi EndPoint URL
      credit: { identifier: "", password: "" }, // Identifier information
      debug: true, // Debug console
    }
  ) {
    if (config.baseURL !== "") {
      config.baseURL = normalizeURL(cleanDoubleSlashes(config.baseURL));
      if (config.baseURL.slice(-1) !== "/") {
        config.baseURL = config.baseURL + "/";
      }
    }

    this.key = config.key || "key";
    this.ls = Cookies;
    this.credit = config.credit;
    this.jwt = this.ls.get(config.key) || null;
    this.baseURL = config.baseURL;
    this.baseURLgraphql = config.baseURLgraphql;
    this.user =
      this.jwt && this.ls.get("user") ? JSON.parse(this.ls.get("user")) : null;
    this.debug = config.debug;

    return this._init();
  }

  async _updateMany() {}

  _init() {
    // Initialisation status
    return this.debug
      ? consola.success("Init successfully with JWT => " + this.jwt, this.key)
      : "";
  }

  _authorization() {
    // Authorization token header
    const requestWithToken = {
      authorization: "Bearer " + this.jwt,
    };

    return this.jwt ? requestWithToken : null;
  }

  async setToken(token) {
    this.ls.set(this.key, token);
    this.jwt = token;
    if (this.debug) consola.log("Token is set with key ", this.key);
  }

  async clearToken() {
    this.ls.remove(this.key);
    this.jwt = null;
    if (this.debug) consola.log("Token removed  ", this.key);
  }

  async logout() {
    this.jwt = null;
    this.user = null;
    this.ls.remove("user");
    this.ls.remove(this.key);
  }

  async login(params = { identifier: null, password: null }) {
    if (!params.identifier && !params.password) {
      return consola.info("Credidentials are missing");
    }

    var AUTH = this.baseURL + "auth/local";
    return new Promise(async (resolve, reject) => {
      try {
        var response = await fetch(AUTH, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(params),
        });

        var data = (await response.json()) || (await response.text());
        if (!response.ok) {
          return reject(details || null);
        }

        if (data.jwt) {
          this.user = data;
          this.ls.set("user", JSON.stringify(data));
          this.ls.set("jwt", data.jwt);

          this.debug ? consola.success("Login successfully ") : "";
        }

        return resolve(data);
      } catch (err) {
        this.debug ? consola.error(err) : "";
        return reject(err);
      }
    });
  }

  async find(entry = "", params = {}) {
    // Fidn all entry
    entry = entry + "?";
    var query = qs.stringify(params);
    return new Promise(async (resolve, reject) => {
      try {
        var response = await fetch(this.baseURL + entry + query, {
          headers: {
            ...this._authorization(),
          },
        });
        var details = (await response.json()) || response.text();

        if (!response.ok) {
          return reject(details || null);
        }

        this.debug ? consola.success(details) : "";
        resolve(details);
      } catch (err) {
        return reject(err);
      }
    });
  }

  //** */

  async findOne(entry = "", id = "") {
    // Find entry by id
    entry = entry + "/";
    return new Promise(async (resolve, reject) => {
      try {
        var response = await fetch(this.baseURL + entry + id, {
          headers: {
            ...this._authorization(),
          },
        });
        var details = (await response.json()) || (await response.text());

        if (!response.ok) {
          return reject(details || null);
        }
        this.debug ? consola.success(details) : "";
        resolve(details);
      } catch (err) {
        this.debug ? consola.error(err) : "";
        return reject(err);
      }
    });
  }

  //**** */

  async count(entry = "", params = {}) {
    // count entry
    // Fidn all entry

    entry = entry + "?";

    var query = qs.stringify(params);

    return new Promise(async (resolve, reject) => {
      try {
        var response = await fetch(this.baseURL + entry + query, {
          headers: {
            ...this._authorization(),
          },
        });

        var details = (await response.json()) || (await response.text());
        if (!response.ok) {
          return reject(details || null);
        }
        this.debug ? consola.success(details.length || 0) : "";
        resolve(details.length || 0);
      } catch (err) {
        this.debug ? consola.error(err) : "";
        reject(err);
      }
    });
  }

  //*** */

  async exec(entry = "", params = {}) {
    // create Entry
    // create entry
    entry = entry + "/";

    return new Promise(async (resolve, reject) => {
      try {
        var response = await fetch(this.baseURL + entry, {
          method: "POST",
          headers: {
            ...this._authorization(),
            "content-type": "application/json",
          },
          body: JSON.stringify(params),
        });
        var details = (await response.json()) || (await response.text());
        if (!response.ok) {
          return reject(details || null);
        }
        this.debug ? consola.success(details) : "";
        resolve(details);
      } catch (err) {
        this.debug ? consola.error(err) : "";
        reject(err);
      }
    });
  }

  async create(entry = "", params = {}, config = { withMedia: false }) {
    // create Entry
    // create entry
    entry = entry + "/";

    return new Promise(async (resolve, reject) => {
      try {
        if (this.debug)
          config.withMedia ? consola.info("Send width media") : "";
        if (!config.withMedia) {
          var response = await fetch(this.baseURL + entry, {
            method: "POST",
            headers: {
              ...this._authorization(),
              "content-type": "application/json",
            },
            body: JSON.stringify(params),
          });
        } else {
          !params.has("data")
            ? params.append("data", JSON.stringify({}))
            : null;
          var response = await fetch(this.baseURL + entry, {
            method: "POST",
            headers: {
              ...this._authorization(),
            },
            body: params,
          });
        }

        var details = (await response.json()) || (await response.text());

        if (!response.ok) {
          return reject(details || null);
        }
        this.debug ? consola.success(details) : "";
        resolve(details);
      } catch (err) {
        this.debug ? consola.error(err) : "";
        reject(err);
      }
    });
  }

  //** */

  async update(
    entry = "",
    id = "",
    params = {},
    config = { withMedia: false }
  ) {
    // update entry

    entry = entry + "/" + id;

    return new Promise(async (resolve, reject) => {
      try {
        if (this.debug)
          config.withMedia ? consola.info("Send width media") : "";
        if (!config.withMedia) {
          var response = await fetch(this.baseURL + entry, {
            method: "PUT",
            headers: {
              ...this._authorization(),
              "content-type": "application/json",
            },
            body: JSON.stringify(params),
          });
        } else {
          !params.has("data")
            ? params.append("data", JSON.stringify({}))
            : null;
          var response = await fetch(this.baseURL + entry, {
            method: "PUT",
            headers: {
              ...this._authorization(),
            },
            body: params,
          });
        }

        var details = (await response.json()) || (await response.text());
        if (!response.ok) {
          return reject(details || null);
        }
        this.debug ? consola.success(details) : "";
        resolve(details);
      } catch (err) {
        this.debug ? consola.error(err) : "";
        reject(err);
      }
    });
  }

  //*** */

  async deleteEntry(entry = "", id = "") {
    // delete entry

    entry = entry + "/" + id;

    return new Promise(async (resolve, reject) => {
      try {
        var response = await fetch(this.baseURL + entry, {
          method: "DELETE",
          headers: {
            ...this._authorization(),
          },
        });

        var details = (await response.json()) || (await response.text());
        if (!response.ok) {
          return reject(details || null);
        }
        this.debug ? consola.success(details) : "";
        resolve(details);
      } catch (err) {
        this.debug ? consola.error(err) : "";
        reject(err);
      }
    });
  }

  async aggregate(model = "", pipeline = []) {
    return new Promise(async (resolve, reject) => {
      try {
        var response = await fetch(
          cleanDoubleSlashes(this.baseURL + "/aggregates/exec"),
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              ...this._authorization(),
            },
            body: JSON.stringify({
              model: model,
              pipeline: pipeline,
            }),
          }
        );

        var details = (await response.json()) || (await response.text());
        if (!response.ok) {
          return reject(details || null);
        }
        this.debug ? consola.success(details) : "";
        resolve(details);
      } catch (err) {
        this.debug ? consola.error(err) : "";
        reject(err);
      }
    });
  }

  async graphql(req = { query: null, variables: {} }) {
    const client = new GraphQLClient(this.baseURLgraphql, {
      headers: { ...this._authorization() },
    });

    return new Promise(async (resolve, reject) => {
      await client
        .request(req.query, req.variables)
        .then((data) => {
          this.debug ? consola.success(data) : "";
          resolve(data);
        })
        .catch((err) => {
          this.debug ? consola.error(err) : "";
          reject(err);
        });
    });
  }
}

export {
  Iota,
  Strapi
 
}