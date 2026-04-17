type Props = {
  image?: string;
  styles?: string;
  text?: string;
  openFunction: () => void;
};

function reusableButton(props: Props) {
  const { image, styles, text, openFunction } = props;

  return (
    <button onClick={openFunction} className={`${styles}`}>
      <img src={image} />
      {text}
    </button>
  );
}

export default reusableButton;
