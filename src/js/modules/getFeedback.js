import axios from 'axios';

function getFeedback(service) {
	return new Promise((fulfill, reject) => {
		axios.get('/feedback_list.json')
			.then(function (response) {

				if(response.status !== 200){
					reject(response.statusText)
				} else {
					const data = response.data;
					debugger;
					const data_sort = quickSortArrOjb(data, 'date');

					const users_id_list = getArrListForObjKeys(data, 'user_id');

				}
			});
	})
}

module.exports = {getFeedback};


/**
 * Получение
 * @param arr_obj
 * @param key
 */
function getArrListForObjKeys(arr_obj, key) {

}



/**
 * Сортировка массива объектов arr_obj по ключу key
 * @param arr_obj
 * @param key
 * @return {*}
 */
function quickSortArrObj(arr_obj, key) {

	if(arr_obj.length < 2){
		return arr_obj;
	}

	const reference_index = Math.ceil(arr_obj.length / 2) - 1;
	const reference_value = arr_obj[reference_index][key];

	let previous = [];
	arr_obj.forEach(function (value, index) {
		if(index === reference_index){
			return;
		}

		if(value[key] < reference_value){
			previous.push(value);
		}
	});

	let next = [];
	arr_obj.forEach(function (value, index) {
		if(index === reference_index){
			return;
		}

		if(value[key] >= reference_value){
			next.push(value);
		}
	});

	return quickSortArrOjb(previous, key).concat(arr_obj[reference_index], quickSortArrOjb(next, key));
}