import { TestBed } from '@angular/core/testing';
import { CompanyService } from './company.service';
import { HttpClientModule } from '@angular/common/http';

describe('CompanyService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [
      { useValue: 'https://mock-cdb.firebaseio.com/companies' },
      CompanyService
    ]
  }));

  it('should be created', () => {
    const service: CompanyService = TestBed.get(CompanyService);
    expect(service).toBeTruthy();
  });
});
