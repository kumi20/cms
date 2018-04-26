import { Component, OnInit, Injector, Input, ViewChild, forwardRef, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CKEditorModule } from 'ng2-ckeditor';
import { CKEditorComponent } from 'ng2-ckeditor';
import { CmsService } from '../cms.service';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EdytorComponent),
    multi: true
};


@Component({
  selector: 'app-edytor',
  templateUrl: './edytor.component.html',
  styleUrls: ['./edytor.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class EdytorComponent implements OnInit, OnDestroy {

  @Input() heightEditor; 
  @ViewChild('edytor') edytor: CKEditorComponent; 
  textValue: string = '';
  url;
  configCKE;
  constructor(sanitizer: DomSanitizer, private CmsService: CmsService) { 
    this.url = sanitizer.bypassSecurityTrustResourceUrl(this.CmsService.domaine + 'api/filemanager/dialog.php');
  }

  ngOnInit() {
      if (this.heightEditor == null) this.heightEditor = 500;
      this.configCKE = {
        allowedContent: true,
        filebrowserBrowseUrl : this.CmsService.domaine + 'api/filemanager/dialog.php?type=2&editor=ckeditor&fldr=',
        filebrowserImageBrowseUrl : this.CmsService.domaine + 'api/filemanager/dialog.php?type=1&editor=ckeditor&fldr=',
        height:this.heightEditor,
        extraPlugins: 'divarea'
        }
  }

  ngOnDestroy(){
      //this.edytor.ngOnDestroy();
  }

 //Placeholders for the callbacks which are later providesd
//by the Control Value Accessor
private onTouchedCallback: () => void = noop;
private onChangeCallback: (_: any) => void = noop;

//get accessor
get text(): any {
    return this.textValue;
};

//set accessor including call the onchange callback
set text(v: any) {
    this.textValue = v;
    this.onChangeCallback(this.textValue);
}


//Set touched on blur
onBlur() {
    this.onTouchedCallback();
}

//From ControlValueAccessor interface
writeValue(value: any) {
    this.textValue = value;
}

//From ControlValueAccessor interface
registerOnChange(fn: any) {
    this.onChangeCallback = fn;

}

//From ControlValueAccessor interface
registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
}

}
