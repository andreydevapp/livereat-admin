import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PagoPlanPage } from './pago-plan.page';

describe('PagoPlanPage', () => {
  let component: PagoPlanPage;
  let fixture: ComponentFixture<PagoPlanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoPlanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PagoPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
