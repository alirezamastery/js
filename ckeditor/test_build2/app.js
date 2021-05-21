// app.js

// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import List from '@ckeditor/ckeditor5-list/src/list';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
// import SimpleBox from './simplebox/simplebox';                          
// import TesterBox from './tester/tester'
import ImageInserter from './src/insertImage/inserter'
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';

// ClassicEditor
//   .create(document.querySelector('#editor'), {
//     plugins: [
//       Essentials, Paragraph, Heading, List, Bold, Italic, SimpleBox , TesterBox
//     ],
//     toolbar: ['heading', 'bold', 'italic', 'numberedList', 'bulletedList', 'simpleBox' , 'testerBox']
//   })
//   .then(editor => {
//     console.log('Editor was initialized', editor);

//     CKEditorInspector.attach('editor', editor);

//     window.editor = editor;
//   })
//   .catch(error => {
//     console.error(error.stack);
//   });

export default class ClassicEditor extends ClassicEditorBase { }

ClassicEditor.builtinPlugins = [
  Essentials, Paragraph, Heading, List, Bold, Italic,
  Image,
  //  ImageInsert, // default image insert
  ImageInserter, // our custom image insert
  ImageResize,
  SimpleUploadAdapter
  //  SimpleBox, TesterBox
]

ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      'heading', 'bold', 'italic', 'numberedList', 'bulletedList',
      'insertImage',
      // 'ImageInserter'
      //  'simpleBox', 'testerBox'
    ]
  },
  // language: 'fa'
}
window.ClassicEditor = ClassicEditor;
window.CKEditorInspector = CKEditorInspector;
