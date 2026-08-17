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
import type { Tournament } from '@/types'

const COL = 'tournaments'

export async function getTournaments(): Promise<Tournament[]> {
  const q = query(collection(db, COL), orderBy('startDate', 'asc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Tournament)
}

export async function getTournamentById(id: string): Promise<Tournament | null> {
  const ref = doc(db, COL, id)
  const snap = await getDoc(ref)
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() } as Tournament
}

export async function createTournament(data: Omit<Tournament, 'id'>) {
  const ref = await addDoc(collection(db, COL), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

export async function updateTournament(id: string, data: Partial<Tournament>) {
  await updateDoc(doc(db, COL, id), { ...data, updatedAt: serverTimestamp() })
}

export async function deleteTournament(id: string) {
  await deleteDoc(doc(db, COL, id))
}
