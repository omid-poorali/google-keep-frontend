export const numberWithCommas = (x: string | number) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const numberWithoutCommas = (x: string | number) => {
	return x.toString().replaceAll(',', '');
};
