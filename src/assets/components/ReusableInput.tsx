type props = {
  styles: string;
  text?: string;
  image?: string;
};

function ReusableInput(props: props) {
  const { styles, text, image } = props;
  return (
    <input className={`${styles}`}>
      <img src={image} />
      {text}
    </input>
  );
}

export default ReusableInput;
