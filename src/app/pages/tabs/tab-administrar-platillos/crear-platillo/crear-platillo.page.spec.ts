import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearPlatilloPage } from './crear-platillo.page';

describe('CrearPlatilloPage', () => {
  let component: CrearPlatilloPage;
  let fixture: ComponentFixture<CrearPlatilloPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearPlatilloPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearPlatilloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
