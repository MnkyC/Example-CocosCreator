// 工具类

export class MnUtil {

	public static injectProp(target: Object, data: Object = null, callback: Function = null, ignoreMethod: boolean = true, ignoreNull: boolean = true): boolean {
		if (!data) {
			return false;
		}

		let result = true;
		for (let key in data) {
			let value: any = data[key];
			if ((!ignoreMethod || typeof value != 'function') && (!ignoreNull || value != null)) {
				if (callback) {
					callback(target, key, value);
				} else {
					target[key] = value;
				}
			}
		}

		return result;
	}
}