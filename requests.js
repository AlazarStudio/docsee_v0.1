import axios from "axios";

export const GET_DATA = async (filename, functionState) => {
    try {
        const response = await axios.get(`http://31.128.44.173:80/db/${filename}`);

        if (response.data && Array.isArray(response.data)) {
            response.data = response.data.reverse().map((item, index) => {
                if (item.data && item.data.stoimostNumber) {
                    item.data.stoimostNumber = item.data.stoimostNumber.replace(/\s+/g, '');
                    item.porNumber = index + 1
                }
                return item;
            });
        }

        functionState(response.data);
    } catch (error) {
        console.error("Ошибка запроса", error);
    }
};

export const CREATE_DATA = async (data, endpoint, functionState) => {
    try {
        const response = await axios.post(`http://31.128.44.173:80/${endpoint}`, { data });
        const filename = response.data;

        functionState(prevDocuments => [...prevDocuments, { filename, ...data }]);
    } catch (error) {
        console.error("Ошибка запроса", error);
    }
};
