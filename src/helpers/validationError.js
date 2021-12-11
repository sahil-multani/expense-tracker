const validate = (error) => {
	if (error.errors) {
		return Object.keys(error.errors).map((key) => {
			return {
				[error.errors[key].path]:
					error.errors[key].path + ' is ' + error.errors[key].kind,
			};
		});
	} else {
		return [];
	}
};

module.exports = validate;
