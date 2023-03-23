import firebase from 'firebase/app';
import 'firebase/storage';
import * as Expo from 'expo';

const firebaseConfig = {
	apiKey: 'AIzaSyAP3EmZSGQq7iZieAoXlHUcYw1LsTkWbTA',
	authDomain: 'firbase-sample-85e8e.firebaseapp.com',
	databaseURL: 'https://firbase-sample-85e8e-default-rtdb.firebaseio.com',
	projectId: 'firbase-sample-85e8e',
	storageBucket: 'firbase-sample-85e8e.appspot.com',
	messagingSenderId: '744381209571',
	appId: '1:744381209571:web:6ec94e38f589480ac09ed6',
	measurementId: 'G-CNBC8K39KC',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage };
