import axios from "axios";

const runCode = (data) => {
  return axios.post(`${process.env.COMPILE_BASE_URL}/run`, data);
};

const submitCode = (data) => {
  return axios.post(`${process.env.COMPILE_BASE_URL}/submit`, data);
};

export { runCode, submitCode };
