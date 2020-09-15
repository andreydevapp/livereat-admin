import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabAdministrarPlatillosPage } from './tab-administrar-platillos.page';

describe('TabAdministrarPlatillosPage', () => {
  let component: TabAdministrarPlatillosPage;
  let fixture: ComponentFixture<TabAdministrarPlatillosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabAdministrarPlatillosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabAdministrarPlatillosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
