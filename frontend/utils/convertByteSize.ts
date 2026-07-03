export const convertByteSize: (size: number) => string = (size) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (size === 0) return '0'
    const i = Math.floor(Math.log(size) / Math.log(1024))
    if (i === 0) return `${size} ${sizes[i]})`
    return `${(size / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}