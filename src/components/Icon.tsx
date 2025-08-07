type IconProps = {
    size?: number;
    color?: string;
}
export const IconArrowLineRight = ({ size = 20, color = 'currentColor' }: IconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M41.9999 24H5.99994" stroke={color} stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 12L42 24L30 36" stroke={color} stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
  )
}
