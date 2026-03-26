import cn from 'classnames';
interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function isPrevDisables(current: number) {
  return current === 1;
}

function isNextDisables(current: number, pagesNumber: number) {
  return current === pagesNumber;
}

export const Pagination = ({
  total,
  perPage = 5,
  currentPage = 1,
  onPageChange,
}: PaginationProps) => {
  const pagesToShow = Array.from(
    { length: Math.ceil(total / perPage) + 1 },
    (_, i) => i,
  ).filter(el => el !== 0);

  return (
    <ul className="pagination">
      <li
        className={cn('page-item ', isPrevDisables(currentPage) && 'disabled')}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isPrevDisables(currentPage) && 'true'}
          onClick={() =>
            !isPrevDisables(currentPage) && onPageChange(currentPage - 1)
          }
        >
          «
        </a>
      </li>
      {pagesToShow.map(page => (
        <li
          key={page}
          className={cn('page-item', currentPage === page && 'active')}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => page !== currentPage && onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={cn(
          'page-item ',
          isNextDisables(currentPage, pagesToShow.length) && 'disabled',
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={
            isNextDisables(currentPage, pagesToShow.length) && 'true'
          }
          onClick={() =>
            !isNextDisables(currentPage, pagesToShow.length) &&
            onPageChange(currentPage + 1)
          }
        >
          »
        </a>
      </li>
    </ul>
  );
};
