import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  orderStatusState,
  setDialogDeleteOrderOpen,
  setDialogEditStatusOpen,
  setOrderIdDelete,
  setStatusOrder,
} from "@/lib/features/dialog/dialogSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Ellipsis } from "lucide-react";

type DropdownDataTableOrderProps = {
  orderId?: number;
  status?: string;
};

const DropdownDataTableOrder = ({
  orderId,
  status,
}: DropdownDataTableOrderProps) => {
  const dispatch = useAppDispatch();

  const handleEdit = () => {
    dispatch(setDialogEditStatusOpen());
    const payload: orderStatusState = {
      orderId: orderId ?? 0,
      status: status ?? "",
    };
    dispatch(setStatusOrder(payload));
  };

  const handleDelete = () => {
    console.log("orderId", orderId);
    dispatch(setDialogDeleteOrderOpen());
    dispatch(setOrderIdDelete(Number(orderId)));
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis className="cursor-pointer hover:bg-gray-200 " />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="hover:text-amber-400 cursor-pointer"
            onClick={() => handleEdit()}
          >
            <p>Edit</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="hover:text-red-600 cursor-pointer"
            onClick={() => handleDelete()}
          >
            <p>Delete</p>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default DropdownDataTableOrder;
