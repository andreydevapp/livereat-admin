import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabChatPage } from './tab-chat.page';

describe('TabChatPage', () => {
  let component: TabChatPage;
  let fixture: ComponentFixture<TabChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabChatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
