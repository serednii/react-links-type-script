
import { TGetData, TOutDataServer, IRequestOptions } from '../components/types/data';
export const getData: TGetData = async (url, setIsLoading) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(String(error));
    } finally {
        setIsLoading(false);
    }
}



export const outDataServer: TOutDataServer = (url, method, newData) => {
    const requestOptions: IRequestOptions = {
        method: method,
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            // Дополнительные заголовки, если необходимо
        },
        body: JSON.stringify(newData),
    };

    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data updated successfully:', data);
            // Обработка успешного обновления данных
        })
        .catch(error => {
            console.error('There was an error updating data:', error);
            // Обработка ошибки
        });
}
