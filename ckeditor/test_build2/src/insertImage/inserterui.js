import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import ImageInsertPanelView from '@ckeditor/ckeditor5-image/src/imageinsert/ui/imageinsertpanelview';
import { prepareIntegrations } from '@ckeditor/ckeditor5-image/src/imageinsert/utils';

import { isImage } from '@ckeditor/ckeditor5-image/src/image/utils';

export default class ImageInserterUI extends Plugin {

  static get pluginName() {
    return 'ImageInsertUI';
  }


  init() {
    const editor = this.editor;
    const componentCreator = locale => {
      return this._createDropdownView(locale);
    };

    // Register `insertImage` dropdown and add `imageInsert` dropdown as an alias for backward compatibility.
    editor.ui.componentFactory.add('insertImage', componentCreator);
    editor.ui.componentFactory.add('imageInsert', componentCreator);
  }


  _createDropdownView(locale) {
    const editor = this.editor;
    const imageInsertView = new ImageInsertPanelView(locale, prepareIntegrations(editor));
    const command = editor.commands.get('uploadImage');

    const dropdownView = imageInsertView.dropdownView;
    const splitButtonView = dropdownView.buttonView;

    splitButtonView.actionView = editor.ui.componentFactory.create('uploadImage');
    // After we replaced action button with `uploadImage` component,
    // we have lost a proper styling and some minor visual quirks have appeared.
    // Brining back original split button classes helps fix the button styling
    // See https://github.com/ckeditor/ckeditor5/issues/7986.
    splitButtonView.actionView.extendTemplate({
      attributes: {
        class: 'ck ck-button ck-splitbutton__action'
      }
    });

    return this._setUpDropdown(dropdownView, imageInsertView, command);
  }

  _setUpDropdown(dropdownView, imageInsertView, command) {
    const editor = this.editor;
    const t = editor.t;
    const insertButtonView = imageInsertView.insertButtonView;
    const insertImageViaUrlForm = imageInsertView.getIntegration('insertImageViaUrl');
    const panelView = dropdownView.panelView;

    dropdownView.bind('isEnabled').to(command);

    // Defer the children injection to improve initial performance.
    // See https://github.com/ckeditor/ckeditor5/pull/8019#discussion_r484069652.
    dropdownView.buttonView.once('open', () => {
      panelView.children.add(imageInsertView);
    });

    dropdownView.on('change:isOpen', () => {
      const selectedElement = editor.model.document.selection.getSelectedElement();

      if (dropdownView.isOpen) {
        imageInsertView.focus();

        if (isImage(selectedElement)) {
          imageInsertView.imageURLInputValue = selectedElement.getAttribute('src');
          insertButtonView.label = t('Update');
          insertImageViaUrlForm.label = t('Update image URL');
        } else {
          imageInsertView.imageURLInputValue = '';
          insertButtonView.label = t('Insert');
          console.log(insertImageViaUrlForm)
          insertImageViaUrlForm.label = t('Insert image via URL');
          insertImageViaUrlForm.placeholder = t('Insert image via URL');
        }
      }
      // Note: Use the low priority to make sure the following listener starts working after the
      // default action of the drop-down is executed (i.e. the panel showed up). Otherwise, the
      // invisible form/input cannot be focused/selected.
    }, { priority: 'low' });

    imageInsertView.delegate('submit', 'cancel').to(dropdownView);
    this.delegate('cancel').to(dropdownView);

    dropdownView.on('change', () => {
      console.log('change', imageInsertView.imageURLInputValue)
    })

    dropdownView.on('submit', () => {
      closePanel();
      onSubmit();
    });

    dropdownView.on('cancel', () => {
      closePanel();
    });

    function onSubmit() {
      const selectedElement = editor.model.document.selection.getSelectedElement();
      console.log('------------------------------------------')
      console.log(selectedElement)
      console.log(imageInsertView.imageURLInputValue)
      console.log('------------------------------------------')
      if (!checkUrl(imageInsertView.imageURLInputValue)) {
        // alert('no')
        return
      }

      if (isImage(selectedElement)) {
        editor.model.change(writer => {
          writer.setAttribute('src', imageInsertView.imageURLInputValue, selectedElement);
          writer.removeAttribute('srcset', selectedElement);
          writer.removeAttribute('sizes', selectedElement);
        });
      } else {
        editor.execute('insertImage', { source: imageInsertView.imageURLInputValue });
      }
    }

    function checkUrl(url) {
      return (
        url.startsWith('wallpaperswide.com') ||
        url.startsWith('http://hd.wallpaperswide.com') ||
        url.startsWith('https://hd.wallpaperswide.com')
      )
    }

    function closePanel() {
      editor.editing.view.focus();
      dropdownView.isOpen = false;
    }

    return dropdownView;
  }
}
