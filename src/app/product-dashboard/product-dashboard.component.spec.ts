// src/app/product-dashboard/product-dashboard.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';

// 1. Asegúrate de importar estos módulos
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductDashboardComponent } from './product-dashboard.component';

describe('ProductDashboardComponent', () => {
  let component: ProductDashboardComponent;
  let fixture: ComponentFixture<ProductDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // 2. Añade los módulos que tu componente necesita para funcionar en las pruebas
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
