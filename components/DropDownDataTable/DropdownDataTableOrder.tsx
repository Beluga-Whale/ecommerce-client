import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  orderStatusState,
  setDialogDeleteProductOpen,
  setDialogEditStatusOpen,
  setProductID,
  setProductName,
  setStatusOrder,
} from "@/lib/features/dialog/dialogSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";

type DropdownDataTableOrderProps = {
  orderId?: number;
  status?: string;
};

const DropdownDataTableOrder = ({
  orderId,
  status,
}: DropdownDataTableOrderProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleEdit = () => {
    dispatch(setDialogEditStatusOpen());
    const payload: orderStatusState = {
      orderId: orderId ?? 0,
      status: status ?? "",
    };
    dispatch(setStatusOrder(payload));
    // router.push(`/admin/products/editProduct/${orderId}`);
  };
  const handleDelete = () => {
    dispatch(setDialogDeleteProductOpen());
    dispatch(setProductID(orderId ?? 0));
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
            // onClick={() => handleDelete()}
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
