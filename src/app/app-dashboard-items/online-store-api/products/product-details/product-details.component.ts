import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LightboxConfig, Lightbox } from 'ngx-lightbox';
import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';
import { ProductService } from 'src/app/app-shared/services/online-store-services/products/products.service';
import { RouteExtraParamsService } from 'src/app/app-shared/services/router-params-services/route-extra-params.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  animations: [
    fadeInPageTitle
  ]
})
  
export class ProductDetailsComponent {
  //[ ngSwitch tag]
  viewMode = 'defaultTab';

  private _productId: number = -0;
  _productDetailsLoading?: boolean;

  //ti be declare appropriately
   _productDetails?: any;

  //Image Viwer
  albums: any = [];
  private _images = [
    {
      src: "",
      caption: ""
    }
  ];

  i: number = 0;
  selectedImageIndex: number = 0;

  constructor(
    private _productService: ProductService,
    private _activatedroute: ActivatedRoute,
    private _router: Router,   
    // private _routeExtraParams: RouteExtraParamsService,
    
    private _lightboxConfig: LightboxConfig,
    private _lightbox: Lightbox
  ) {

    _lightboxConfig.fadeDuration = 0.7;
    _lightboxConfig.resizeDuration = 0.5;
    _lightboxConfig.fitImageInViewPort = true;
    // _lightboxConfig.positionFromTop = 350;
    _lightboxConfig.showImageNumberLabel = true;
    _lightboxConfig.alwaysShowNavOnTouchDevices = false;
    _lightboxConfig.wrapAround = true;
    _lightboxConfig.disableKeyboardNav = false;
    _lightboxConfig.disableScrolling = false;
    _lightboxConfig.centerVertically = true;
    _lightboxConfig.albumLabel = "Image %1 of %2";
    _lightboxConfig.enableTransition = true;
    _lightboxConfig.showZoom = true;
    _lightboxConfig.showRotate = false;
    _lightboxConfig.showDownloadButton = true;
    _lightboxConfig.containerElementResolver = () => document.body;
  }

  ngOnInit(): void {
    
    // this._productId = this.routeExtraParams.getProductId;
    this._activatedroute.params.subscribe(params => {
      this._productId = params['id'];
    });

    this.productDetails();
  }

   productDetails() {
    this._productDetailsLoading = true;
    this._productService.getProduct(this._productId)
      .subscribe((data: any) => {
        this._productDetails = data;
        setTimeout(() => {
          this._productDetailsLoading = false
        }, 10);
      });
   }
  
  allProducts() {
    this._router.navigate(['/app/online-store']); 
  }

  usDollarToRandConvention(usDollar: number) {
    return usDollar * 18;
  }

  //Imgage viewer
  open(index: number): void {

    const src = this._productDetails.image;
    const caption = this._productDetails.title;
    const thumb = this._productDetails.image;

    const productImageDetails = {
      src: src,
      caption: caption,
      thumb: thumb
    };

    this.albums.push(productImageDetails);

    // open lightbox
    this._lightbox.open(this.albums, 0);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

}
