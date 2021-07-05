import qs from "qs";
import Cookies from "js-cookie";
import consola from "consola";
import { request, gql, GraphQLClient } from "graphql-request";
try {
  if (!fetch) {
    const fetch = require("node-fetch");
  }
} catch (err) {}

class Strapi {
  constructor(
    config = {
      baseURLgraphql: "",
      baseURL: "http://127.0.0.1:1337",
      credit: { identifier: "", password: "" },
      debug: true,
    }
  ) {
    if (config.baseURL !== "") {
      if (config.baseURL.slice(-1) !== "/") {
        config.baseURL = config.baseURL + "/";
      }
    }

    this.ls = Cookies;
    this.credit = config.credit;
    this.jwt = this.ls.get("jwt") || null;
    this.baseURL = config.baseURL;
    this.baseURLgraphql = config.baseURLgraphql;
    this.user = this.jwt ? JSON.parse(this.ls.get("user")) : null;
    this.debug = config.debug;

    this.graphQLClient = new GraphQLClient(this.baseURLgraphql, {
      headers: { ...this.authorization() },
    });
    return this._init();
  }

  _init() {
    // Initialisation status
    return this.debug
      ? consola.success("Init successfully with JWT => " + this.jwt)
      : "";
  }

  _authorization() {
    // Authorization token header
    const requestWithToken = {
      authorization: "Bearer " + this.jwt,
    };

    return this.jwt ? requestWithToken : null;
  }

  async logout() {
    this.jwt = null;
    this.user = null;
    this.ls.remove("user");
    this.ls.remove("jwt");
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
}

export default Strapi;
