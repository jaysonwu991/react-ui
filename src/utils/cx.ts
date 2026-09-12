export type ClassValue =
	| string
	| number
	| false
	| null
	| undefined
	| Record<string, boolean>;

/**
 * Tiny class name combiner. Accepts strings, falsy values, and
 * `{ className: condition }` records. Keeps the public API dependency-free.
 *
 * @example
 * cx('card', `card--${variant}`, interactive && 'card--interactive');
 */
export function cx(...values: ClassValue[]): string {
	const classes: string[] = [];

	for (const value of values) {
		if (!value) continue;

		if (typeof value === 'string' || typeof value === 'number') {
			classes.push(String(value));
			continue;
		}

		for (const key of Object.keys(value)) {
			if (value[key]) classes.push(key);
		}
	}

	return classes.join(' ');
}

export default cx;
