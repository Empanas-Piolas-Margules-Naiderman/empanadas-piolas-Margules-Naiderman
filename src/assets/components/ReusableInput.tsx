type props = React.InputHTMLAttributes<HTMLButtonElement> & {
  placeHolder?: string;
};

function ReusableInput(props: props) {
  const { className, placeHolder } = props;
  return <input className={className} placeholder={placeHolder}></input>;
}

export default ReusableInput;
