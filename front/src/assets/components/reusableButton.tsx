type Props = {
  styles?: string;
  image?: string;
  text?: string;
  openFunction: () => void;
};

function ReusableButton(props: Props) {
  const { image, styles, text, openFunction } = props;

  return (
    <button onClick={openFunction} className={`${styles}`}>
      {image && <img src={image} alt="" />}
      {text}
    </button>
  );
}

export default ReusableButton;
