import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Violation } from '../../../../mock-data/violations.mock';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ICellRendererParams, GridReadyEvent, GridApi } from 'ag-grid-community';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-violation-table',
  standalone: true,
  imports: [AgGridAngular, FormsModule],
  templateUrl: './violation-table.component.html',
  styleUrl: './violation-table.component.scss'
})
export class ViolationTableComponent {
  @Input() items: Violation[] = [];
  @Output() evidenceClick = new EventEmitter<string>();
  pageSize = 5;
  gridApi?: GridApi;

  columnDefs: ColDef<Violation>[] = [
    { headerName: 'Date & Time', field: 'date', width: 200, minWidth: 160, sortable: false, resizable: false, cellStyle: { 'text-align': 'left', 'white-space': 'nowrap' } },
    { headerName: 'Camera Name', field: 'camera', width: 160, minWidth: 140, sortable: false, resizable: false, cellStyle: { 'text-align': 'left', 'white-space': 'nowrap', 'overflow': 'hidden', 'text-overflow': 'ellipsis' } },
    {
      headerName: 'Type',
      field: 'type',
      width: 160,
      minWidth: 140,
      sortable: false,
      resizable: false,
      cellStyle: { 'text-align': 'center' },
      cellRenderer: (params: ICellRendererParams<Violation>) => {
        const span = document.createElement('span');
        const map: Record<string, string> = {
          Overstayed: 'overstayed',
          'Over Speeding': 'speeding',
          'Double Parking': 'double'
        };
        const cls = map[String(params.value as any)] || '';
        span.className = `pill type ${cls}`;
        span.textContent = String((params.value as any) ?? '');
        return span;
      }
    },
    { headerName: 'Plate Number', field: 'plateNumber', width: 120, minWidth: 100, sortable: false, resizable: false, cellStyle: { 'text-align': 'left', 'white-space': 'nowrap' } },
    { headerName: 'Vehicle Type', field: 'vehicleType', width: 180, minWidth: 140, sortable: false, resizable: false, cellStyle: { 'text-align': 'left' } },
    { headerName: 'Duration/rate', field: 'duration', width: 140, minWidth: 120, sortable: false, resizable: false, cellStyle: { 'text-align': 'right', 'white-space': 'nowrap' } },
    {
      headerName: 'Evidence',
      field: 'evidence',
      width: 160,
      minWidth: 140,
      sortable: false,
      resizable: false,
      cellStyle: { 'text-align': 'center' },
      cellRenderer: (params: ICellRendererParams<Violation>) => {
        const wrap = document.createElement('div');
        wrap.className = 'evidence';
        const arr = Array.isArray(params.value as any) ? (params.value as any) : [];
        arr.forEach((src: string) => {
          const img = document.createElement('img');
          img.src = src;
          img.alt = 'evidence';
          img.addEventListener('click', () => {
            const comp = params.context && (params.context as any).component as ViolationTableComponent | undefined;
            if (comp) comp.evidenceClick.emit(src);
          });
          wrap.appendChild(img);
        });
        return wrap;
      }
    }
  ];

  defaultColDef: ColDef = {
    sortable: false,
    resizable: false,
    suppressHeaderMenuButton: true,
    filter: true,
    floatingFilter: true
  };

  onGridReady(e: GridReadyEvent) {
    this.gridApi = e.api;
    this.gridApi.setGridOption('pagination', true);
    this.gridApi.setGridOption('paginationPageSize', this.pageSize);
    this.gridApi.sizeColumnsToFit();
  }
  onFirstDataRendered() {
    if (this.gridApi) this.gridApi.sizeColumnsToFit();
  }
  onPageSizeChange(v: string) {
    const n = Number(v);
    this.pageSize = Number.isFinite(n) && n > 0 ? n : 5;
    if (this.gridApi) this.gridApi.setGridOption('paginationPageSize', this.pageSize);
  }
  pagerText() {
    if (!this.gridApi) return '';
    const current = this.gridApi.paginationGetCurrentPage();
    const size = this.gridApi.paginationGetPageSize();
    const totalRows = this.items.length;
    const start = current * size + 1;
    const end = Math.min((current + 1) * size, totalRows);
    return `${start} to ${end} of ${totalRows}`;
  }
}
