import { BasePage } from './base_page.js';

export class DemoWebShopPage extends BasePage {

    constructor(page) {
        super(page); // 🔥 very important
    }

    get booksLink() {
        return this.getElement('Demo Web Shop', 'BooksLinkXPATH');
    }

    get computersLink() {
        return this.getElement('Demo Web Shop', 'ComputersLinkXPATH');
    }

    get electronicsLink() {
        return this.getElement('Demo Web Shop', 'ElectronicsLinkXPATH');
    }

    get apparelShoesLink() {
        return this.getElement('Demo Web Shop', 'ApparelShoesLinkXPATH');
    }

    get digitalDownloadsLink() {
        return this.getElement('Demo Web Shop', 'DigitaldownloadsLinkXPATH');
    }

    get jewelryLink() {
        return this.getElement('Demo Web Shop', 'JewelryLinkXPATH');
    }

    get giftCardsLink() {
        return this.getElement('Demo Web Shop', 'GiftCardsLinkXPATH');
    }
}
