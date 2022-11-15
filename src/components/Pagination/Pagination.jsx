import Paginate from 'react-paginate';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import styles from './Pagination.module.css';

export default function Pagination({ pageCount, currentPage, onPageChange }) {
  return (
    <Paginate
      previousLabel={<BsChevronLeft />}
      nextLabel={<BsChevronRight />}
      breakLabel={'...'}
      marginPagesDisplayed={1}
      pageRangeDisplayed={5}
      containerClassName={styles.container}
      pageLinkClassName={styles.page}
      activeLinkClassName={styles.active}
      breakClassName={styles.break}
      previousClassName={styles.prev}
      nextClassName={styles.next}
      disabledClassName={styles.disabled}
      pageCount={pageCount}
      forcePage={currentPage}
      onPageChange={onPageChange}
    />
  );
}
