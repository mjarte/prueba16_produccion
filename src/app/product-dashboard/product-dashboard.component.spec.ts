import { ComponentFixture, TestBed } from '@angular/core/testing';


import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductDashboardComponent } from './product-dashboard.component';

describe('ProductDashboardComponent', () => {
  let component: ProductDashboardComponent;
  let fixture: ComponentFixture<ProductDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule
      ],
      declarations: [
        ProductDashboardComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
