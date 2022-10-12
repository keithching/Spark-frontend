import {
    ref,
    uploadBytesResumable,
    getDownloadURL
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid'; // https://www.npmjs.com/package/uuid
import { storage } from '../firebase';

export async function uploadImageAsync(uri: string) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    try {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });
        const fileRef = ref(storage, `testing/${uuidv4()}`); // uuid for the photo object's name
        await uploadBytesResumable(fileRef, blob);
    
        const url = await getDownloadURL(fileRef);
        return url;
    } catch (err) {
        console.error(err);
    }
}
