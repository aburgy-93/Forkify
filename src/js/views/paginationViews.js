import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      this.generateMarkupBtnRight(currentPage);
    }
    // last page
    if (currentPage === numPages && numPages > 1) {
      this.generateMarkupBtnLeft(currentPage);
    }
    // other page
    if (currentPage < numPages) {
      return (
        this.generateMarkupBtnLeft(currentPage) +
        this.generateMarkupBtnRight(currentPage)
      );
    }
    // Page 1, no other pages
    return '';
  }
  // Lets refactor this into a ternairy statement later
  // also page 0 shows up when on page 1
  // When we get to end of results, prev page button goes away
  generateMarkupBtnRight(currentPage) {
    return `
      <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
        <span> Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
      </button>
    `;
  }

  generateMarkupBtnLeft(currentPage) {
    return `
      <button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>
    `;
  }
}

export default new PaginationView();
