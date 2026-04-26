import axios from "axios";

const getProblemById = async (id) => {
  try {
    const res = await axios(`${process.env.SERVER_URL}/${id}`, {
      withCredentials: true,
    });

    if (!res.data.success) {
      throw new Error(data.message);
    }

    return res.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export { getProblemById };
