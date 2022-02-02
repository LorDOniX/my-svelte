export function test(value: number): number {
	return value * value;
}

export function getRandomArbitrary(min: number, max: number): number {
	return (Math.random() * (max - min)) + min;
}
