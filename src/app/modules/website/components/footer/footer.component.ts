import { Component } from '@angular/core';
import { faFacebookF, faInstagram, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  faFacebookF = faFacebookF;
  faTwitter = faTwitter;
  faLinkedinIn = faLinkedinIn;
  faInstagram = faInstagram;

}
