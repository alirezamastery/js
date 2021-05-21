import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import ImageInserterUI from './inserterui'

export default class ImageInserter extends Plugin {
  static get pluginName() {
    return 'ImageInserter';
  }
  static get requires() {
    return [ImageUpload,ImageInserterUI];
  }
}