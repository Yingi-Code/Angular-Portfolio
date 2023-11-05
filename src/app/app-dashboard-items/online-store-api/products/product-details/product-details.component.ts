import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LightboxConfig, Lightbox } from 'ngx-lightbox';
import { catchError, map } from 'rxjs';
import { fadeInPageTitle } from 'src/app/app-shared/animations/animations';
import { ProductService } from 'src/app/app-shared/services/online-store-services/products/products.service';

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
  
  //http response error message
  _errorMessage: string = '';

  //product image viwer
  private _albums: any = [];
  private _images = [
    {
      src: "",
      caption: ""
    }
  ];

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
    //retrieve the selected item id
    this._activatedroute.params.subscribe(params => {
      this._productId = params['id'];
    });

    this.productDetails();
  }

  productDetails() {
     this._productDetailsLoading = true;
    this._productService.getProduct(this._productId).pipe(
      map((_httpResponseData: any) => {

        //no http response data found - error
        if (!_httpResponseData) {
          throw 'The details for product with id [ ' + this._productId + ' ] were not found ';
        }
        setTimeout(() => {
          this._productDetailsLoading = false
        }, 10);
        return _httpResponseData;
      }),
      //catch http response error
      catchError(_httpResponseError => {
        this._productDetailsLoading = false
        throw _httpResponseError;
      })
    )  
      .subscribe({
       //http response data param
        next: (_httpResponseData) => {
          this._productDetails = _httpResponseData  
        }  
      ,
        //http response error param
        error: (_httpResponseError) => {
          this._errorMessage = _httpResponseError;
          this._productDetailsLoading = false
        }
      });  
    return this._productDetails;
   }
  
  allProducts() {
    this._router.navigate(['/app/online-store']); 
  }

  usDollarToRandConvention(_usDollar: number) {
    return _usDollar * 18;
  }

  //Open selected image in lightBox view
  open(_index: number): void {

    //get selected image details
    const src = this._productDetails.image;
    const caption = this._productDetails.title;
    const thumb = this._productDetails.image;

    //create an instance of image
    const productImageDetails = {
      src: src,
      caption: caption,
      thumb: thumb
    };

    //this._albums.push(productImageDetails);
    this._albums[0] = productImageDetails;
    // open lightbox
    this._lightbox.open(this._albums, _index);
  }

  //close lightbox programmatically
  close(): void {
 
    this._lightbox.close();
  }

}
