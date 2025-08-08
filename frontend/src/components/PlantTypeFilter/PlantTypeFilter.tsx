import classNames from "classnames";
import styles from "./PlantTypeFilter.module.scss";

type Props = {
  number: number;
  filterName: string;
  setActiveFilter: React.Dispatch<React.SetStateAction<string>>;
  isActive: boolean;
};

export const PlantTypeFilter = ({
  number,
  filterName,
  setActiveFilter,
  isActive,
}: Props) => {
  const handleClick = () => {
    setActiveFilter(filterName);
  };

  return (
    <div onClick={handleClick}>
      <div
        className={classNames([styles.filterAmount, isActive && styles.active])}
      >
        {number}
      </div>
      <div
        className={classNames([styles.filterName, isActive && styles.active])}
      >
        {filterName}
      </div>
    </div>
  );
};
