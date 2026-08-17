import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/lib/firebase'

export async function uploadImage(file: File, path: string): Promise<string> {
  const storageRef = ref(storage, path)
  await uploadBytes(storageRef, file)
  return getDownloadURL(storageRef)
}

export function buildStoragePath(folder: string, fileName: string) {
  const timestamp = Date.now()
  const safeName = fileName.replace(/\s+/g, '-').toLowerCase()
  return `${folder}/${timestamp}-${safeName}`
}
