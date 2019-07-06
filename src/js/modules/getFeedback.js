import axios from 'axios';

function getFeedback(service) {
	return new Promise((fulfill, reject) => {
		axios.get('/feedback_list.json',{ data: {service}})
			.then(function (response) {

				if(response.status !== 200){
					reject(response.statusText)
				} else {
					const feedback_list = response.data;

					// сортируем данные
					const feedback_list_sort = quickSortArrObj(feedback_list, 'date');
					// получаем список пользователей
					const users_id_list = getArrListForObjKeys(feedback_list, 'user_id');
					// получаем объект с пользователями
					axios.get('/users_list.json',{ data: {users_id_list}})
						.then(function (response) {
							if(response.status !== 200){
								reject(response.statusText)
							} else {
								const users_list = response.data;

								const feedbacks = buildFeedback(feedback_list_sort, users_list)

								fulfill(feedbacks);
							}
						});
				}
			});
	})
}

module.exports = {getFeedback};

/**
 *
 * @param feedback_list
 * @param users_list
 */
function buildFeedback(feedback_list, users_list) {
	let result_feedback = [];
	// клонируем массив пользователей

	const clone_user_list = JSON.parse(JSON.stringify(users_list));
	const cache_users = {};


	for(let index = 0; index < feedback_list.length; index++){
		const feedback = feedback_list[index];
		const id = feedback.id;
		const text = feedback.text;
		const name = getUserName(feedback.user_id);
		const date = function () {
			const number_date = parseInt(feedback.date, 10);
			const date = new Date(number_date);
			return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
		}();

		result_feedback.push({id, name, text, date});
	}

	return result_feedback;


	/**
	 *
	 * @param user_id
	 * @return {*}
	 */
	function getUserName(user_id) {
		if(cache_users[user_id]){
			return cache_users[user_id];
		}
		let length = clone_user_list.length;
		for (let index = 0; index < length; index++){
			const obj_user = clone_user_list[index];
			const test_user_id = obj_user["user_id"];
			const name = obj_user["name"];

			clone_user_list.splice(index, 1);
			--length;
			--index;

			cache_users[test_user_id] = name;

			if(test_user_id ===  user_id){
				return name
			}
		}
	}
}


/**
 * Получение массива ключей из объектов в переданном массиве по ключу
 * @param arr_obj {array} - массив объектов
 * @param key {string} - ключ, по которому извлекаются данный из массива объектов
 */
function getArrListForObjKeys(arr_obj, key) {
	const obj_key = {};
	for(const value of arr_obj){
		obj_key[value[key]] = ''
	}
	return Object.keys(obj_key)
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

	return quickSortArrObj(previous, key).concat(arr_obj[reference_index], quickSortArrObj(next, key));
}