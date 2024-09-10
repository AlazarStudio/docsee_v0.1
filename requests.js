import axios from "axios";

export const GET_DATA = async (filename, functionState) => {
    try {
        const response = await axios.get(`https://backend.demoalazar.ru/db/${filename}`);

        // Конвертируем дату в объект Date для корректной сортировки
        const convertDate = (dateString) => {
            const [day, month, year] = dateString.split('.');
            return new Date(`${year}-${month}-${day}`);
        };

        if (response.data && Array.isArray(response.data)) {
            response.data.sort((a, b) => {
                if (a.data && b.data && a.data.numberDate && b.data.numberDate) {
                    // Сравниваем объекты Date
                    return convertDate(a.data.numberDate) - convertDate(b.data.numberDate);
                }
                return 0; // Если дата отсутствует, пропустить сортировку для этого элемента
            });
        }

        // Устанавливаем отсортированные данные в state
        functionState(response.data.reverse());
    } catch (error) {
        console.error("Ошибка запроса", error);
    }
};

export const CREATE_DATA = async (data, endpoint, functionState) => {
    try {
        const response = await axios.post(`https://backend.demoalazar.ru/${endpoint}`, { data });
        const filename = response.data;

        functionState(prevDocuments => [...prevDocuments, { filename, ...data }]);
    } catch (error) {
        console.error("Ошибка запроса", error);
    }
};
