type props = {
  styles: string;
  placeHolder?: string;
};

function ReusableInput(props: props) {
  const { styles, placeHolder } = props;
  return <input className={`${styles}`} placeholder={placeHolder}></input>;
}

export default ReusableInput;
