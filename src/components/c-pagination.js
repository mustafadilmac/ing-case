import { LitElement, html, css } from 'lit';

export class CPagination extends LitElement {
  static properties = {
    currentPage: { type: Number, reflect: true, attribute: 'current-page' },
    pageSize: { type: Number, attribute: 'page-size' },
    totalItems: { type: Number, attribute: 'total-items' },
    siblingCount: { type: Number, attribute: 'sibling-count' }
  };

  constructor() {
    super();
    this.currentPage = 1;
    this.pageSize = 10;
    this.totalItems = 0;
    this.siblingCount = 1;
  }

  static styles = css`
    :host { display: block; }
    
    .pager { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
    
    .page, .pager button {
      border: none;
      background: transparent;
      color: #3F3F3F;
      width: 30px;
      height: 30px;
      aspect-ratio: 1/1;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
      cursor: pointer;
      font-size: 14px;
    }
    .pager button[disabled] { opacity: .5; cursor: not-allowed; }
    .pager .active { background-color: var(--color-primary); color: #FFFFFF; }
    .dots { padding: 6px 8px; opacity: .7; }
  `;

  get totalPages() {
    return Math.max(1, Math.ceil(this.totalItems / this.pageSize || 1));
  }

  #emit(page) {
    const p = Math.min(Math.max(1, page), this.totalPages);
    if (p !== this.currentPage) {
      this.dispatchEvent(new CustomEvent('page-change', { detail: { page: p } }));
    }
  }

  #range() {
    const total = this.totalPages;
    const cur = this.currentPage;
    const sib = this.siblingCount;
    const res = [];
    const left = Math.max(2, cur - sib);
    const right = Math.min(total - 1, cur + sib);

    res.push(1);
    if (left > 2) res.push('dots-left');
    for (let i = left; i <= right; i++) res.push(i);
    if (right < total - 1) res.push('dots-right');
    if (total > 1) res.push(total);
    return res;
  }

  render() {
    const totalPages = this.totalPages;
    return html`
      <div class="pager" role="navigation" aria-label="Pagination">
        
        <button @click=${() => this.#emit(this.currentPage - 1)} ?disabled=${this.currentPage === 1} aria-label="Prev">
          <c-icon name="chevron-left" size="14"></c-icon>
        </button>

        ${this.#range().map((it) => it === 'dots-left' || it === 'dots-right'
      ? html`<span class="dots">…</span>`
      : html`<button class="page ${this.currentPage === it ? 'active' : ''}"
                    @click=${() => this.#emit(it)} aria-current=${this.currentPage === it ? 'page' : 'false'}>
                    ${it}
                 </button>`
    )}

        <button @click=${() => this.#emit(this.currentPage + 1)} ?disabled=${this.currentPage === totalPages} aria-label="Next">
          <c-icon name="chevron-right" size="14"></c-icon>
        </button>
        
      </div>
    `;
  }
}

customElements.define('c-pagination', CPagination);
