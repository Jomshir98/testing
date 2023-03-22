import { castDraft, Draft } from 'immer';
import { cloneDeep } from 'lodash';

/**
 * Shuffles an array in-place
 * @param array The array to shuffle
 */
export function ShuffleArray<T extends unknown[]>(array: T): T {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

/**
 * Returns longest preffix all input strings have in common (case sensitive)
 */
export function LongestCommonPrefix(strings: string[]): string {
	if (strings.length === 0) return '';

	strings = strings.slice().sort();
	let i = 0;
	while (i < strings[0].length && strings[0][i] === strings[strings.length - 1][i]) {
		i++;
	}
	return strings[0].substring(0, i);
}

/** Formats time in ms into days, hours minutes and seconds - also has a short mode that only shows the largest unit, e.g. 17h */
export function FormatTimeInterval(time: number, mode: 'full' | 'short' = 'full') {
	let res = '';
	if (time < 0) {
		res = '-';
		time *= -1;
	}
	const seconds = Math.floor(time / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	if (mode === 'full') {
		const parts: string[] = [];
		if (days > 0) {
			parts.push(`${days} day${days > 1 ? 's' : ''}`);
		}
		if (hours % 60 > 0) {
			parts.push(`${hours % 24} hour${hours > 1 ? 's' : ''}`);
		}
		if (minutes % 60 > 0) {
			parts.push(`${minutes % 60} minute${minutes > 1 ? 's' : ''}`);
		}
		if (seconds % 60 > 0 || parts.length === 0) {
			parts.push(`${seconds % 60} second${seconds > 1 ? 's' : ''}`);
		}
		res += parts.join(', ');
	} else if (mode === 'short') {
		if (days > 1) {
			res += `${days}d`;
		} else if (hours > 1) {
			res += `${hours}h`;
		} else if (minutes > 1) {
			res += `${minutes}m`;
		} else {
			res += `${seconds}s`;
		}
	}
	return res;
}

export function MessageSubstitute(originalMessage: string, substitutions: Readonly<Record<string, string>>): string {
	let message = originalMessage;
	for (const [key, value] of Object
		.entries(substitutions)
		// Do the longest substitutions first to avoid small one replacing part of large one
		.sort(([a], [b]) => b.length - a.length)
	) {
		message = message.replaceAll(key, value);
	}
	return message;
}

/**
 * Create a deep copy of the data, marking it as mutable if it was originally immutable
 * @param data - Data to clone
 * @returns New, mutable copy of data
 * @note The `Draft` type on return is used as it means making data mutable, it comes from the `immer` library
 */
export function CloneDeepMutable<T>(data: T): Draft<T> {
	return castDraft(cloneDeep(data));
}
