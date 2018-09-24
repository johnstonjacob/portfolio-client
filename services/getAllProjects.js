import axios from 'axios'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()


const getAllProjects = async () => {
    const options = {
        method: "GET",
        url: publicRuntimeConfig.API_URL
    }

    const { data } = await axios(options)
    return data;
}

export default getAllProjects;