import axios from "@/axios.js";
/* eslint-disable */

export default {
  apiGetByParameter() {
    return new Promise((resolve, reject) => {
      axios
        .get(`api?page=1`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  apiGetByObject(obj) {
    return new Promise((resolve, reject) => {
      axios
        .get(`api` + obj)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  apiPost(payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("api", payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  apiUpdate(payload) {
    return new Promise((resolve, reject) => {
      axios
        .put("api", payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  apiDelete(payload) {
    return new Promise((resolve, reject) => {
      axios
        .delete("api", payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
