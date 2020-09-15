import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdministrarPlatillosPage } from './administrar-platillos.page';

describe('AdministrarPlatillosPage', () => {
  let component: AdministrarPlatillosPage;
  let fixture: ComponentFixture<AdministrarPlatillosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarPlatillosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrarPlatillosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
