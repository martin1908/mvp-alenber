import React from 'react';

const getPagination = (page, pages) => {
  const current = page;
  const last = pages;
  const delta = 1;
  const left = current - delta;
  const right = current + delta + 1;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= last; i++) {
    if (i == 1 || i == last || i >= left && i < right) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }
  return rangeWithDots;
}

export const Pagination = (props) => {
  const rangeWithDots = getPagination(props.page, props.pages)
  return (<div className="col-xs-12">
    <div className="row">
      <div className="paginations">
        <nav aria-label='...'>
          <ul className="pagination">
            <li className="page-item.disabled" onClick={props.previousPage}>
              <a className="page-link">&lt;</a>
            </li>
            {
              rangeWithDots.map((r,k) => {
                return (<li className="page-item" onClick={props.goPage} data-page={r} key={k}>
                  <a className="page-link">{r}</a>
                </li>)
              })
            }
            <li className="page-item" onClick={props.nextPage}>
              <a className="page-link">&gt;</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <br/>
    <br/>
  </div>)
}