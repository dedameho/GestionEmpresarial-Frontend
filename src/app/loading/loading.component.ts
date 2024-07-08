import { Component } from '@angular/core';
import { LoadingService } from '../services/loading.service'

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  isLoading = false;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadingService.loading$.subscribe((isLoading) => {
        this.isLoading = isLoading;
      });
    }, 100);
  }
}
