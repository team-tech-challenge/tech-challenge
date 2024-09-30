const defaultReturnStatement = (
	response: any,
	responseName: string,
	value: any
) => {
	return response.json({ [responseName]: value });
};

const formatObjectResponse = (includedObject, objectName: string) => {
	let result = [];
	includedObject.map((object) => { result.push(object[objectName][0]); });
	return result;
};

export { defaultReturnStatement, formatObjectResponse };
