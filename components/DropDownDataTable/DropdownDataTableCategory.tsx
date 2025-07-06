import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CategoryState,
  setCategory,
  setDialogDeleteCategoryOpen,
  setDialogEditCategoryOpen,
} from "@/lib/features/dialog/dialogSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Ellipsis } from "lucide-react";

type DropdownDataTableCategoryProps = {
  categoryId?: number;
  categoryname?: string;
};

const DropdownDataTableCategory = ({
  categoryId,
  categoryname,
}: DropdownDataTableCategoryProps) => {
  const dispatch = useAppDispatch();
  const handleEdit = () => {
    dispatch(setDialogEditCategoryOpen());
    const payload: CategoryState = {
      categoryId: categoryId ?? 0,
      categoryName: categoryname ?? "",
    };
    dispatch(setCategory(payload));
  };

  const handleDelete = () => {
    dispatch(setDialogDeleteCategoryOpen());
    const payload: CategoryState = {
      categoryId: categoryId ?? 0,
      categoryName: categoryname ?? "",
    };
    dispatch(setCategory(payload));
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
export default DropdownDataTableCategory;
