import "./Tooltip.css";

type TooltipProps = {
  text: string;
  value: string;
};
const Tooltip = ({ text, value }: TooltipProps) => {
  return (
    <div className="info">
      {text}:{value}
    </div>
  );
};
export default Tooltip;
