//import './scss/bootstrap/bootstrap.scss'
//import './scss/style.scss'
import {getFeedback} from './js/modules/getFeedback'

getFeedback()
	.then(function (feedbacks) {
		console.log(feedbacks);
	});