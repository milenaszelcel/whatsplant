import { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import classNames from "classnames";
import styles from "./PageNumberNavigation.module.scss";
type Props = {
  currentPage: number;
  setCurrentPage: (prevPage: any) => void;
};

export const PageNumberNavigation = ({
  currentPage,
  setCurrentPage,
}: Props) => {
  const [pages, setPages] = useState<number[]>([]);

  const changePage = (change: number) => {
    setCurrentPage((prevPage: number) => {
      const newCount = prevPage + change;
      return newCount >= 1 ? newCount : prevPage;
    });
  };

  const handlePageChange = () => {
    if (
      !pages.length ||
      pages[pages.length - 1] - currentPage < 1 ||
      pages[1] > currentPage
    ) {
      const startPage = Math.max(1, currentPage - 2);
      const generatedPages = Array.from({ length: 5 }, (_, i) => startPage + i);
      setPages(generatedPages);
    }
  };

  useEffect(() => {
    handlePageChange();
  }, [currentPage]);

  return (
    <div className={styles.pagesNavigator}>
      <span onClick={() => changePage(-1)} className={styles.navigationArrow}>
        <ArrowBackIosIcon />
      </span>
      {pages.map((page) => (
        <span
          onClick={() => setCurrentPage(page)}
          className={
            page === currentPage ? styles.activePage : styles.pageNumber
          }
        >
          {page}
        </span>
      ))}
      <span onClick={() => changePage(1)} className={styles.navigationArrow}>
        <ArrowForwardIosIcon />
      </span>
    </div>
  );
};
