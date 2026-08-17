import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { NewsArticle } from '@/types'

const COL = 'news'

export async function getNews(): Promise<NewsArticle[]> {
  const q = query(collection(db, COL), orderBy('publishedAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as NewsArticle)
}

export async function getNewsById(id: string): Promise<NewsArticle | null> {
  const snap = await getDoc(doc(db, COL, id))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() } as NewsArticle
}

export async function createNews(data: Omit<NewsArticle, 'id'>) {
  const ref = await addDoc(collection(db, COL), {
    ...data,
    createdAt: serverTimestamp(),
  })
  return ref.id
}

export async function updateNews(id: string, data: Partial<NewsArticle>) {
  await updateDoc(doc(db, COL, id), data)
}

export async function deleteNews(id: string) {
  await deleteDoc(doc(db, COL, id))
}
