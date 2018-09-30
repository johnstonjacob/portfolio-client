import axios from 'axios';

const getAllProjects = async () => {
  const options = {
    method: 'GET',
    url: `${process.env.REACT_APP_API_URL}/projects`,
  };

  try {
    const { data } = await axios(options);
    return { data, ok: true };
  } catch (error) {
    return { ok: false };
  }
};

export default getAllProjects;
