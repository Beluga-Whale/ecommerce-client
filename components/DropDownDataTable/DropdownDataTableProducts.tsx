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
  setDialogDeleteProductOpen,
  setProductID,
  setProductName,
} from "@/lib/features/dialog/dialogSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";

type DropdownDataTableProductsProps = {
  idProduct: number;
  nameProduct: string;
};

const DropdownDataTableProducts = ({
  idProduct,
  nameProduct,
}: DropdownDataTableProductsProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleEdit = () => {
    router.push(`/admin/products/editProduct/${idProduct}`);
  };
  const handleDelete = () => {
    dispatch(setDialogDeleteProductOpen());
    dispatch(setProductID(idProduct));
    dispatch(setProductName(nameProduct));
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
export default DropdownDataTableProducts;
