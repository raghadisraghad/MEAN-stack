import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  newAsset: any = { asset: '', quantity: 0, value: 0 }; // Initialize newAsset object with empty values
  portfolioItems: any[] = [];

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.loadPortfolio(); // Load portfolio data when component initializes
  }

  loadPortfolio(): void {
    this.portfolioService.getPortfolio().subscribe(
      data => this.portfolioItems = data as any[],
      error => console.log(error)
    );
  }

  addAsset(newAsset: any): void {
    if (newAsset.asset && newAsset.quantity && newAsset.value) { // Check if all fields are filled
      this.portfolioService.addAsset(newAsset).subscribe(
        () => {
          this.loadPortfolio(); // Refresh portfolio after adding asset
          this.newAsset = { asset: '', quantity: 0, value: 0 }; // Reset newAsset object
        },
        error => console.log(error)
      );
    } else {
      console.log('Please fill in all fields');
    }
  }

}
