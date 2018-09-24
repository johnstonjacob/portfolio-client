import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const getAllProjects = async () => {
  const options = {
    method: 'GET',
    url: `${publicRuntimeConfig.API_URL}/projects`,
  };

  try {
    const { data } = await axios(options);
    return { data, ok: true };
  } catch (error) {
    return { ok: false };
  }
};

export default getAllProjects;
