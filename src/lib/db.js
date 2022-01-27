import shortid from "short-uuid"
import { doc, getDocs, getDoc, collection, addDoc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

import { db, auth, storage } from "./firebase"

const response = (message, success) => ({ message, success })

const newFileName = (type) => `${shortid.generate()}.${type.split("/")[1]}`

export async function createNominated(data) {
  const user = await auth.currentUser

  try {
    if (!user) {
      return response("No hay usuario autenticado", false)
    }

    return await addDoc(collection(db, "nominateds"), data)
  } catch (error) {
    console.error("Create nominated ->", error)
  }
}

export async function uploadFile(image, name, cb) {
  if (!image) return
  try {
    // Upload file and metadata to the object 'images/mountains.jpg'
    const uploadTask = uploadBytesResumable(
      ref(storage, `${name}/${newFileName(image.type)}`),
      image,
      { contentType: image.type }
    )

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log("Upload is " + progress + "% done")
      },
      function (error) {
        console.error("Upload file ->", error)
      },
      function () {
        // Upload completed successfully, now we can get the download URL
        if (cb) getDownloadURL(uploadTask.snapshot.ref).then(cb)
      }
    )
  } catch (error) {
    console.error("Upload file ->", error)
  }
}

export const getCollectionsFirebase = async (collectionProp, setState) => {
  const docs = await getDocs(collection(db, collectionProp))
  const data = []
  await docs.forEach((doc) =>
    data.push({
      id: doc.id,
      ...doc.data(),
    })
  )

  setState(data)
}
export const getNominatedFirebase = async (id) => {
  const nominated = await getDoc(doc(db, "nominateds", id)).get()
  return nominated
}

export const updateProductFirebase = async (id, data) => {
  return await db.collection("nominateds").doc(id).update(data)
}

export const deleteProductFirebase = async (id) => {
  return await db.collection("nominateds").doc(id).delete()
}
