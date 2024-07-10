import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() columns: { key: string, title: string, isHTML?: boolean, isDate?: boolean }[] = [];
  @Input() data: any[] = [];
  @Input() contextMenuItems: { label: string, action: (row: any) => void, icon?: string, visible: (row: any) => boolean }[] = [];
  @Input() itemsPerPage: number = 10;
  @Input() maxPageButtons: number = 5;

  currentPage: number = 1;
  paginatedData: any[] = [];
  totalPages: number = 0;
  pages: number[] = [];
  activeRowIndex: number | null = null;

  constructor(private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
    this.updatePaginatedData();
    this.updatePages();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
    this.updatePaginatedData();
    this.updatePages();
  }

  updatePaginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedData = this.data.slice(start, end);
  }

  updatePages() {
    const half = Math.floor(this.maxPageButtons / 2);
    let startPage = Math.max(1, this.currentPage - half);
    let endPage = Math.min(this.totalPages, startPage + this.maxPageButtons - 1);

    if (endPage - startPage + 1 < this.maxPageButtons) {
      startPage = Math.max(1, endPage - this.maxPageButtons + 1);
    }

    this.pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedData();
      this.updatePages();
    }
  }

  onContextMenuClick(action: (row: any) => void, row: any) {
    action(row);
  }

  toggleContextMenu(index: number) {
    if (this.activeRowIndex === index) {
      this.activeRowIndex = null;
    } else {
      this.activeRowIndex = index;
    }
  }

  hideProductsContextMenu() {
    this.activeRowIndex = null;
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getEndIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.data.length);
  }

  getSanitizedHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
