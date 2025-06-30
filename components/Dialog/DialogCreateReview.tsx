import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setDialogCreateReviewClose } from "@/lib/features/dialog/dialogSlice";
import { Button } from "../ui/button";
import FormInputField from "../FormInput/FormInputField";
import RatingStars from "../RatingStars";
import { useState } from "react";
import { useCreateReview } from "@/services/reviewServices";
import { Bounce, toast } from "react-toastify";
import { reviewUserDTO } from "@/types";

const formSchema = z.object({
  comment: z.string().min(1, { message: "comment is required." }),
});

type DialogCreateReviewProps = {
  id: number;
  userId: number;
};

const DialogCreateReview = ({ id, userId }: DialogCreateReviewProps) => {
  const { createReviewToggle, productName, productID } = useAppSelector(
    (state) => state.dialog
  );

  const [rating, setRating] = useState<number>(0);
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      comment: "",
    },
  });

  const { mutateAsync: createReviewMutate } = useCreateReview(id, userId);
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    if (rating < 1) {
      return toast.warning("Rating more than 1", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }

    try {
      const payload: reviewUserDTO = {
        productId: Number(productID),
        rating: rating,
        comment: data.comment,
      };
      await createReviewMutate(payload).then(() => {
        toast.success("Review Success", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        dispatch(setDialogCreateReviewClose());
        form.reset();
      });
    } catch (error) {
      toast.error("Review  Failed", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  return (
    <Dialog
      open={createReviewToggle}
      onOpenChange={(open) => {
        if (!open) dispatch(setDialogCreateReviewClose());
      }}
    >
      <DialogContent>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            <DialogHeader>
              <DialogTitle>Review Product ({productName}) </DialogTitle>
            </DialogHeader>

            {/* NOTE - Rating */}
            <div className="flex items-center gap-2 mt-4">
              <RatingStars setRating={setRating} rating={rating} />
            </div>

            {/* NOTE -Comment */}
            <FormInputField
              control={form.control}
              name="comment"
              label="Comment"
              placeholder="you@example.com"
            />

            <DialogFooter className="mt-6">
              <Button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-white hover:cursor-pointer "
              >
                Send Review
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
export default DialogCreateReview;
