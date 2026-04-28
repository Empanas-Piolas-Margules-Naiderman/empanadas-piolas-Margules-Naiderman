type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  image?: string;
  text?: string;
  openFunction: () => void;
};

function ReusableButton(props: Props) {
  const { image, text, openFunction } = props;

  return (
    <button onClick={openFunction} className="bg-gradient-to-r from-orange-600 to-red-500 rounded-lg">
      <img src={image} />
      {text}
    </button>
  );
}

export default ReusableButton;
