
export function isObject(variable: unknown): boolean {
    return typeof variable === 'object' && variable !== null && !Array.isArray(variable);
}

export function isArray(variable: unknown): boolean {
    return Array.isArray(variable);
}