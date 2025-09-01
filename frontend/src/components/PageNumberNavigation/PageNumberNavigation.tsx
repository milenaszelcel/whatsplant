import { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import styles from "./PageNumberNavigation.module.scss";

type Props = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageCount: number;
};

export const PageNumberNavigation = ({
  currentPage,
  setCurrentPage,
  pageCount,
}: Props) => {
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    const handlePageChange = () => {
      if (pageCount <= 0) {
        setPages([]);
        return;
      }
      const pagesToShow = 5;
      let startPage = Math.max(1, currentPage - 2);

      if (startPage + pagesToShow - 1 > pageCount) {
        startPage = Math.max(1, pageCount - pagesToShow + 1);
      }
      const generatedPages = Array.from(
        { length: Math.min(pagesToShow, pageCount - startPage + 1) },
        (_, i) => startPage + i
      );
      setPages(generatedPages);
    };

    handlePageChange();
  }, [currentPage, pageCount]);

  const changePage = (change: number) => {
    setCurrentPage((prevPage: number) => {
      const newPage = prevPage + change;
      // Check both lower and upper boundaries
      if (newPage >= 1 && newPage <= pageCount) {
        return newPage;
      }
      return prevPage;
    });
  };

  if (pageCount <= 1) {
    return null;
  }

  return (
    <div className={styles.pagesNavigator}>
      {/* Add a disabled state for better UX and safety */}
      <span
        onClick={() => currentPage > 1 && changePage(-1)}
        className={
          currentPage > 1 ? styles.navigationArrow : styles.disabledArrow
        }
      >
        <ArrowBackIosIcon className={styles.controlArrow} />
      </span>

      {pages.map((page) => (
        <span
          key={page}
          onClick={() => setCurrentPage(page)}
          className={
            page === currentPage ? styles.activePage : styles.pageNumber
          }
        >
          {page}
        </span>
      ))}

      <span
        onClick={() => currentPage < pageCount && changePage(1)}
        className={
          currentPage < pageCount
            ? styles.navigationArrow
            : styles.disabledArrow
        }
      >
        <ArrowForwardIosIcon className={styles.controlArrow} />
      </span>
    </div>
  );
};
