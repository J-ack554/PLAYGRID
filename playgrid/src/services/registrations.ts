import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Registration } from '@/types'

const COL = 'registrations'

export async function getAllRegistrations(): Promise<Registration[]> {
  const q = query(collection(db, COL), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Registration)
}

export async function getUserRegistrations(userId: string): Promise<Registration[]> {
  const q = query(collection(db, COL), where('userId', '==', userId))
  const snap = await getDocs(q)
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }) as Registration)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
}

export async function createRegistration(data: Omit<Registration, 'id' | 'createdAt' | 'status'>) {
  const ref = await addDoc(collection(db, COL), {
    ...data,
    status: 'Pending',
    createdAt: serverTimestamp(),
  })
  return ref.id
}

export async function updateRegistrationStatus(id: string, status: Registration['status']) {
  await updateDoc(doc(db, COL, id), { status })
}

export async function deleteRegistration(id: string) {
  await deleteDoc(doc(db, COL, id))
}
