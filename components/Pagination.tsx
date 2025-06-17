import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";

const items = [
  {
    id: 1,
    title: "Back End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 2,
    title: "Front End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 3,
    title: "User Interface Designer",
    department: "Design",
    type: "Full-time",
    location: "Remote",
  },
];

type PaginationProps = {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPage: number | undefined;
  currentPage: number;
};

const Pagination = ({
  setCurrentPage,
  totalPage,
  currentPage,
}: PaginationProps) => {
  const handlerPage = (index: number) => {
    setCurrentPage(index);
  };
  const pages = Array.from({ length: totalPage ?? 1 }, (_, i) => i + 1);

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white mt-4 px-4 py-3 sm:px-6 ">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div></div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-xs"
          >
            <Button
              onClick={() => handlePrevious()}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 bg-white text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              disabled={currentPage == 1}
            >
              <p className="sr-only">Previous</p>
              <ChevronLeftIcon aria-hidden="true" className="size-5 " />
            </Button>
            {pages?.map((item) => (
              <div key={item}>
                <p
                  aria-current="page"
                  className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 hover:cursor-pointer
                    ${
                      currentPage == item
                        ? " z-10  bg-amber-400 text-white  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                        : "text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50  focus:outline-offset-0"
                    }  
                  `}
                  onClick={() => handlerPage(item)}
                >
                  {item}
                </p>
              </div>
            ))}

            <Button
              onClick={() => handleNext()}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 bg-white text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              disabled={currentPage == totalPage}
            >
              <p className="sr-only">Next</p>
              <ChevronRightIcon aria-hidden="true" className="size-5 " />
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default Pagination;
