// frontend/components/blog/Pagination.tsx

export default function Pagination({
  prev,
  currentPage,
  getPaginationGroup,
  next,
  pages,
  handleActive,
  canPrev = true,
  canNext = true,
}: any) {
  return (
    <>
      <ul className="pagination justify-content-center">
        {getPaginationGroup.length <= 0 ? null : (
          <li onClick={canPrev ? prev : undefined} className="next_link page-item">
            {!canPrev ? null : (
              <a>
                <i className="fa fa-arrow-left" />
              </a>
            )}
          </li>
        )}

        {getPaginationGroup.map((item: any, index: any) => {
          return (
            <li
              onClick={() => handleActive(item)}
              key={index}
              className={currentPage === item ? 'page-item active' : 'page-item'}
            >
              <a className="page-link">{item}</a>
            </li>
          );
        })}

        {getPaginationGroup.length <= 0 ? null : (
          <li onClick={canNext ? next : undefined} className="next_link page-item">
            {!canNext ? null : (
              <a>
                <i className="fa fa-arrow-right" />
              </a>
            )}
          </li>
        )}
      </ul>
    </>
  );
}
