const getRandomRgbaColor = (a:number): string => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    // const a = Math.random().toFixed(2); // 生成 0 到 1 之间的随机数，并保留两位小数
    return `rgba(${r}, ${g}, ${b}, ${a})`;
};
export default getRandomRgbaColor;
