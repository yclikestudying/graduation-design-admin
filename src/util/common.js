/**
 * 计算当前时间
 */
export const formatDate = (time) => {
	let date = new Date(time);
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	month = month < 10 ? '0' + month : month;
	day = day < 10 ? '0' + day : day;

	return `${year}-${month}-${day}`;
};