export function throwError(value:any){
    if (typeof value === 'object') {
        return value;
    }
    throw new Error('Output is not a object');
}