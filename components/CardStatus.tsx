type CardStatusProps = {
  statusTitle: string;
  order: number;
};

const CardStatus = ({ order, statusTitle }: CardStatusProps) => {
  return (
    <div className="bg-white w-full h-36 p-6 flex flex-col items-center justify-center rounded-lg shadow-sm">
      <p className="text-4xl font-bold text-amber-500">{order}</p>
      <p className="text-gray-600 mt-2">{statusTitle}</p>
    </div>
  );
};
export default CardStatus;
