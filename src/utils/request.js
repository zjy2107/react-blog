import { message } from 'antd'
export const request = (config) => {
	const {
		url,
		data,
		type,
		contentType
	} = config
	return new Promise((resolve, reject) => {
		let options = {}
		if (type.toLowerCase() === 'get') {
			options = {
				method: type,
				headers: new Headers({
					'Content-Type': contentType || 'application/x-www-form-urlencoded'
				})
			}
		} else {
			options = {
				method: type,
				body: data,
				headers: new Headers({
					'Content-Type': contentType || 'application/x-www-form-urlencoded'
				})
			}
		}
		fetch(url, options).then(response => {
			if (response.ok) {
				return response.json()
			}
		}).then(json => {
			console.log()
			if (json.code === '00') { //成功
				resolve(json)
			} else {
				message.error(json.msg)
				reject('error')
			}
		}).catch(error => {
			message.error(error.message)
			reject(error)
		})
	})
}

export default request
