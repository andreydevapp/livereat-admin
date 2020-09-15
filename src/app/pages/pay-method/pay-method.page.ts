import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pay-method',
  templateUrl: './pay-method.page.html',
  styleUrls: ['./pay-method.page.scss'],
})
export class PayMethodPage implements OnInit {

  constructor() { }

  

  ngOnInit() {
    
  }

  numCard:string = "";

  changeValuesCard($event){
    if (this.numCard[0] === "4") {
      console.log("es visa");
      const visa = document.getElementById("img-visa");
      const masterCard = document.getElementById("img-mastercard");
      visa.classList.remove("difuminar");
      masterCard.classList.add("difuminar");
    }
    else if (this.numCard[0] === "5") {
      if (this.numCard[1] === "1" || this.numCard[1] === "2" || this.numCard[1] === "3" ||this.numCard[1] === "4") 
      {
        console.log("es mastercard");
        const visa = document.getElementById("img-visa");
        const masterCard = document.getElementById("img-mastercard");
        visa.classList.add("difuminar");
        masterCard.classList.remove("difuminar");
      }else{
        const visa = document.getElementById("img-visa");
        const masterCard = document.getElementById("img-mastercard");
        visa.classList.remove("difuminar");
        masterCard.classList.remove("difuminar");
        }  
    }
    else{
      const visa = document.getElementById("img-visa");
      const masterCard = document.getElementById("img-mastercard");
      visa.classList.remove("difuminar");
      masterCard.classList.remove("difuminar");
    }
    console.log($event);
  }

}
