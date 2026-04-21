type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  image?: string;
  text?: string;
  openFunction: () => void;
};

function ReusableButton(props: Props) {
  const { image, className = "", text, openFunction } = props;

  return (
    <button onClick={openFunction} className={className} >
      <img src={image} />
      {text}
    </button>
  );
}

export default ReusableButton;
