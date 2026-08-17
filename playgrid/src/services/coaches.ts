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
import type { Coach } from '@/types'

const COL = 'coaches'

export async function getCoaches(): Promise<Coach[]> {
  const q = query(collection(db, COL), orderBy('name', 'asc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Coach)
}

export async function getCoachById(id: string): Promise<Coach | null> {
  const snap = await getDoc(doc(db, COL, id))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() } as Coach
}

export async function createCoach(data: Omit<Coach, 'id'>) {
  const ref = await addDoc(collection(db, COL), {
    ...data,
    createdAt: serverTimestamp(),
  })
  return ref.id
}

export async function updateCoach(id: string, data: Partial<Coach>) {
  await updateDoc(doc(db, COL, id), data)
}

export async function deleteCoach(id: string) {
  await deleteDoc(doc(db, COL, id))
}
