import api from '../api'

export interface Category {
  id: string
  name: string
  icon?: string
}

export const getCategories = () => api.get<Category[]>('/categories').then(r => r.data)
export const createCategory = (name: string, icon?: string) => api.post<Category>('/categories', { name, icon }).then(r => r.data)
export const deleteCategory = (id: string) => api.delete(`/categories/${id}`)